/** POST /api/admin/submissions/:id/restore — bring a row back from Trash. */
import { getSubmission, json, setDeleted } from "../../../../../server/forms.js";

export async function onRequestPost({ env, params }) {
  if (!(await getSubmission(env.DB, params.id))) return json({ ok: false, error: "Not found" }, 404);
  await setDeleted(env.DB, params.id, false);
  return json({ ok: true });
}
