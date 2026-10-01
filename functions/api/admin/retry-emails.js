/**
 * POST /api/admin/retry-emails — re-sends confirmation emails that failed
 * (usually Gmail's daily cap) or never finished. Apps Script is told it is a
 * resend, so it sends the email without adding a second Sheet row.
 */
import { json, rowToPayload, sendConfirmation } from "../../../server/forms.js";

// Small batches: each one is a round trip to Apps Script, and a batch that
// runs into the Gmail cap just leaves the rest marked failed for next time.
const BATCH = 25;

export async function onRequestPost({ env }) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM submissions
      WHERE deleted_at IS NULL AND (email_status = 'failed'
         OR (email_status = 'pending' AND updated_at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-5 minutes')))
      ORDER BY created_at LIMIT ?1`,
  ).bind(BATCH).all();

  let sent = 0;
  for (const r of results) {
    if ((await sendConfirmation(env, r.id, rowToPayload(r), { resend: true })) === "sent") sent++;
  }
  const { remaining } = await env.DB.prepare(
    `SELECT COUNT(*) AS remaining FROM submissions
      WHERE deleted_at IS NULL AND email_status IN ('failed', 'pending')`,
  ).first();
  return json({ tried: results.length, sent, failed: results.length - sent, remaining });
}
