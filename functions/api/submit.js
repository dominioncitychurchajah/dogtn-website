/**
 * POST /api/submit — event registrations and the mentorship waitlist.
 *
 * The row is written to D1 before anything else, so a sign-up is never lost to
 * an email quota or a slow Apps Script. The confirmation email (and the Google
 * Sheet mirror) happen after the response, via waitUntil.
 */
import { json, normalize, saveSubmission, sendConfirmation, toPayload } from "../../server/forms.js";

export async function onRequestPost({ request, env, waitUntil }) {
  let body;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return json({ ok: false, error: "Invalid request body" }, 400);
  }

  // Honeypot: real people leave this hidden field empty. Pretend it worked.
  if (body?.website) return json({ ok: true });

  const s = normalize(body);
  if (s.error) return json({ ok: false, error: s.error }, 400);

  let id;
  try {
    id = await saveSubmission(env.DB, s);
  } catch (err) {
    console.error("submit: save failed", err);
    return json({ ok: false, error: "Could not save your details. Please try again." }, 500);
  }

  waitUntil(sendConfirmation(env, id, toPayload(s)));
  return json({ ok: true });
}

export function onRequestGet() {
  return json({ error: "Method not allowed" }, 405);
}
