/**
 * Verifies the Cloudflare Access token that Access adds to every request it lets
 * through (Cf-Access-Jwt-Assertion). Access blocks outsiders at the edge; this
 * check makes sure the admin API is never reachable by skipping Access, e.g.
 * via a preview URL that the Access application does not cover.
 */

let certsCache = { url: "", at: 0, keys: [] };

const b64urlToBytes = (s) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), (c) =>
    c.charCodeAt(0),
  );
const decodePart = (s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));

async function signingKeys(teamDomain) {
  const url = `https://${teamDomain}/cdn-cgi/access/certs`;
  // Access rotates keys rarely; an hour's cache avoids a fetch per request.
  if (certsCache.url === url && Date.now() - certsCache.at < 3_600_000) return certsCache.keys;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Access certs HTTP ${res.status}`);
  const { keys } = await res.json();
  certsCache = { url, at: Date.now(), keys };
  return keys;
}

/** Returns the signed-in email, or null if the request is not from Access. */
export async function verifyAccess(request, env) {
  const teamDomain = (env.ACCESS_TEAM_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!teamDomain || !env.ACCESS_AUD) return null; // not configured: fail closed

  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const header = decodePart(parts[0]);
    const payload = decodePart(parts[1]);
    if (header.alg !== "RS256") return null;

    const jwk = (await signingKeys(teamDomain)).find((k) => k.kid === header.kid);
    if (!jwk) return null;
    const key = await crypto.subtle.importKey(
      "jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"],
    );
    const ok = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    );
    if (!ok) return null;

    const now = Math.floor(Date.now() / 1000);
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(env.ACCESS_AUD)) return null;
    if (payload.iss !== `https://${teamDomain}`) return null;
    if (!payload.exp || payload.exp < now) return null;
    return payload.email || payload.sub || "unknown";
  } catch {
    return null;
  }
}

/*
 * Password login (HTTP Basic, user "admin", password = ADMIN_PASSWORD secret).
 * A successful login also sets a signed 12-hour cookie so the admin page's own
 * fetches to /api/admin/* work without a second prompt.
 */
const COOKIE = "dogtn_admin";
const enc = new TextEncoder();

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)))));
}

// Compare digests, not the strings, so timing does not leak the password.
async function sameSecret(a, b) {
  const [x, y] = await Promise.all([a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(s))));
  const u = new Uint8Array(x), v = new Uint8Array(y);
  return u.every((n, i) => n === v[i]);
}

/** True for a valid admin cookie or a correct Basic password. */
export async function verifyPassword(request, env) {
  const secret = env.ADMIN_PASSWORD;
  if (!secret) return false;

  const cookie = (request.headers.get("Cookie") || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))?.[1];
  if (cookie) {
    const [exp, sig] = decodeURIComponent(cookie).split(".");
    if (Number(exp) > Date.now() && (await sameSecret(sig ?? "", await hmac(secret, exp)))) return true;
  }

  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Basic ")) return false;
  let decoded = "";
  try { decoded = atob(auth.slice(6)); } catch { return false; }
  const pass = decoded.slice(decoded.indexOf(":") + 1);
  return sameSecret(pass, secret);
}

export async function adminCookie(env) {
  const exp = String(Date.now() + 12 * 3600 * 1000);
  const value = encodeURIComponent(`${exp}.${await hmac(env.ADMIN_PASSWORD, exp)}`);
  return `${COOKIE}=${value}; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict`;
}

/**
 * Shared gate for admin pages and the admin API: Cloudflare Access login or the
 * password. Returns null when allowed, otherwise the response to send.
 */
export async function adminGate(request, env) {
  if ((await verifyAccess(request, env)) || (await verifyPassword(request, env))) return null;
  const ready = env.ADMIN_PASSWORD || (env.ACCESS_TEAM_DOMAIN && env.ACCESS_AUD);
  return new Response(ready ? "Sign in required" : "Admin login is not set up yet", {
    status: ready ? 401 : 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      ...(env.ADMIN_PASSWORD ? { "WWW-Authenticate": 'Basic realm="David Ogbueli admin", charset="UTF-8"' } : {}),
    },
  });
}

/** Run the next handler; on a password login, hand out the session cookie. */
export async function nextWithSession(context) {
  const out = await context.next();
  const res = new Response(out.body, out); // headers from next() can be immutable
  res.headers.set("Cache-Control", "no-store");
  if (context.env.ADMIN_PASSWORD && context.request.headers.get("Authorization")?.startsWith("Basic ")) {
    res.headers.append("Set-Cookie", await adminCookie(context.env));
  }
  return res;
}
