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
