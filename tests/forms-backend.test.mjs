// Checks for the forms backend (functions/ + server/). Built-in runner, no deps:
//   npm test
// D1 is stood in for by node:sqlite running the real migration.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { normalize, saveSubmission } from "../server/forms.js";
import { verifyAccess } from "../server/access.js";
import { onRequestPost as retryEmails } from "../functions/api/admin/retry-emails.js";
import { onRequestGet as listSubmissions } from "../functions/api/admin/submissions.js";

function fakeD1() {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("../migrations/0001_submissions.sql", import.meta.url), "utf8"));
  return {
    raw: db,
    prepare(sql) {
      let args = [];
      const stmt = {
        bind: (...a) => ((args = a), stmt),
        first: async () => db.prepare(sql).get(...args) ?? null,
        all: async () => ({ results: db.prepare(sql).all(...args) }),
        run: async () => (db.prepare(sql).run(...args), { success: true }),
      };
      return stmt;
    },
  };
}

const reg = (over = {}) =>
  normalize({ fullName: "Ada", email: "Ada@Example.com", phone: "+234", country: "NG", seats: "2", eventSlug: "nl", eventTitle: "Next Level", ...over });

test("normalize validates and cleans input", () => {
  assert.equal(normalize({ fullName: "A", email: "a@b.co", country: "NG", eventSlug: "x" }).error, "Missing required fields");
  assert.equal(normalize({ fullName: "A", email: "nope", phone: "1", country: "NG", eventSlug: "x" }).error, "Invalid email address");
  const s = reg({ seats: "99" });
  assert.equal(s.email, "ada@example.com");
  assert.equal(s.seats, 1);
});

test("the same person submitting twice updates one row", async () => {
  const DB = fakeD1();
  await saveSubmission(DB, reg());
  await saveSubmission(DB, reg({ email: "ada@example.com", seats: "3" }));
  const rows = DB.raw.prepare("SELECT seats FROM submissions").all();
  assert.deepEqual(rows.map((r) => r.seats), [3]);
});

test("retry resends failed emails as resend (no second Sheet row)", async (t) => {
  const DB = fakeD1();
  const id = await saveSubmission(DB, reg());
  DB.raw.prepare("UPDATE submissions SET email_status = 'failed' WHERE id = ?").run(id);
  const sent = [];
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    sent.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ ok: true }));
  });
  const out = await (await retryEmails({ env: { DB, APPS_SCRIPT_URL: "https://script.test/exec" } })).json();
  assert.deepEqual(out, { tried: 1, sent: 1, failed: 0, remaining: 0 });
  assert.equal(sent[0].resend, true);
  assert.equal(sent[0].eventTitle, "Next Level");
  assert.equal(DB.raw.prepare("SELECT email_status FROM submissions").get().email_status, "sent");
});

test("CSV export neutralises spreadsheet formulas", async () => {
  const DB = fakeD1();
  await saveSubmission(DB, reg({ fullName: "=HYPERLINK(\"http://x\")" }));
  const res = await listSubmissions({ request: new Request("https://s/api/admin/submissions?format=csv"), env: { DB } });
  const body = await res.text();
  assert.match(body, /"'=HYPERLINK\(""http:\/\/x""\)"/);
});

test("admin access requires a valid Cloudflare Access token", async (t) => {
  const team = "church.cloudflareaccess.com";
  const aud = "aud-123";
  const { publicKey, privateKey } = await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true, ["sign", "verify"],
  );
  const jwk = { ...(await crypto.subtle.exportKey("jwk", publicKey)), kid: "k1" };
  t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ keys: [jwk] })));

  const b64 = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  async function token(claims, header = { alg: "RS256", kid: "k1" }) {
    const unsigned = `${b64(header)}.${b64({ iss: `https://${team}`, aud: [aud], exp: now + 60, email: "pastor@church.org", ...claims })}`;
    const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, new TextEncoder().encode(unsigned));
    return `${unsigned}.${Buffer.from(sig).toString("base64url")}`;
  }
  const env = { ACCESS_TEAM_DOMAIN: team, ACCESS_AUD: aud };
  const check = async (tok, e = env) =>
    verifyAccess(new Request("https://s/api/admin/x", { headers: tok ? { "Cf-Access-Jwt-Assertion": tok } : {} }), e);

  assert.equal(await check(await token({})), "pastor@church.org");
  assert.equal(await check(await token({ aud: ["someone-else"] })), null);
  assert.equal(await check(await token({ exp: now - 1 })), null);
  assert.equal(await check(await token({ iss: "https://evil.cloudflareaccess.com" })), null);
  assert.equal(await check((await token({})).replace(/\.[^.]+\./, `.${b64({ email: "x", aud: [aud], exp: now + 60, iss: `https://${team}` })}.`)), null);
  assert.equal(await check(await token({}, { alg: "none", kid: "k1" })), null);
  assert.equal(await check(null), null);
  assert.equal(await check(await token({}), { ACCESS_TEAM_DOMAIN: "", ACCESS_AUD: "" }), null);
});

test("admin password gate: Basic login, session cookie, and refusals", async () => {
  const { adminGate, adminCookie } = await import("../server/access.js");
  const env = { ADMIN_PASSWORD: "correct horse" };
  const req = (headers = {}) => new Request("https://s/en/admin/", { headers });
  const basic = (p) => ({ Authorization: `Basic ${btoa(`admin:${p}`)}` });

  assert.equal(await adminGate(req(basic("correct horse")), env), null);
  assert.equal((await adminGate(req(basic("wrong")), env)).status, 401);
  assert.match((await adminGate(req(), env)).headers.get("WWW-Authenticate"), /Basic/);

  const cookie = (await adminCookie(env)).split(";")[0];
  assert.equal(await adminGate(req({ Cookie: cookie }), env), null);
  assert.equal((await adminGate(req({ Cookie: cookie }), { ADMIN_PASSWORD: "rotated" })).status, 401);
  assert.equal((await adminGate(req({ Cookie: cookie.replace(/=\d+/, "=9999999999999") }), env)).status, 401);
  assert.equal((await adminGate(req(basic("x")), {})).status, 503);
});
