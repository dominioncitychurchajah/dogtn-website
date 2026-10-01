/**
 * PATCH  /api/admin/submissions/:id  edit (same validation as the public form)
 * DELETE /api/admin/submissions/:id  move to Trash (restorable)
 */
import { getSubmission, json, normalize, rowToInput, setDeleted, updateSubmission } from "../../../../server/forms.js";

export async function onRequestPatch({ request, env, params }) {
  const row = await getSubmission(env.DB, params.id);
  if (!row) return json({ ok: false, error: "Not found" }, 404);

  const body = await request.json().catch(() => null);
  // Type never changes; every other field may.
  const s = normalize({ ...rowToInput(row), ...body, type: row.type });
  if (s.error) return json({ ok: false, error: s.error }, 400);

  if (!(await updateSubmission(env.DB, row.id, s))) {
    return json({ ok: false, error: "Another sign-up already uses that email for that event/track." }, 409);
  }
  return json({ ok: true });
}

export async function onRequestDelete({ env, params }) {
  if (!(await getSubmission(env.DB, params.id))) return json({ ok: false, error: "Not found" }, 404);
  await setDeleted(env.DB, params.id, true);
  return json({ ok: true });
}
