/** POST /api/admin/submissions/:id/resend — send this person's confirmation email again. */
import { getSubmission, json, rowToPayload, sendConfirmation } from "../../../../../server/forms.js";

export async function onRequestPost({ env, params }) {
  const row = await getSubmission(env.DB, params.id);
  if (!row) return json({ ok: false, error: "Not found" }, 404);
  const status = await sendConfirmation(env, row.id, rowToPayload(row), { resend: true });
  return json({ ok: status === "sent", status }, status === "sent" ? 200 : 502);
}
