/**
 * Shared by the Pages Functions under functions/api. Lives outside functions/
 * so Pages does not publish it as a route.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

const str = (v, max = 200) => String(v ?? "").trim().slice(0, max);

/** Returns a clean submission, or { error } when the payload is not acceptable. */
export function normalize(d) {
  if (!d || typeof d !== "object") return { error: "Invalid request body" };
  const type = d.type === "waitlist" ? "waitlist" : "registration";
  const s = {
    type,
    fullName: str(d.fullName),
    email: str(d.email).toLowerCase(),
    phone: str(d.phone, 40),
    country: str(d.country, 80),
  };
  if (!s.fullName || !s.phone || !s.country) return { error: "Missing required fields" };
  if (!EMAIL.test(s.email)) return { error: "Invalid email address" };

  if (type === "registration") {
    const seats = Number.parseInt(d.seats, 10);
    Object.assign(s, {
      ref: str(d.eventSlug, 120),
      refTitle: str(d.eventTitle),
      seats: seats >= 1 && seats <= 20 ? seats : 1,
      volunteer: ["yes", "maybe"].includes(d.volunteer) ? d.volunteer : "no",
      volunteerAreas: str(d.volunteerAreas, 500),
    });
    if (!s.ref) return { error: "Missing event" };
  } else {
    Object.assign(s, {
      ref: str(d.track, 120),
      refTitle: str(d.trackName) || "No preference",
      currentRole: str(d.currentRole),
    });
  }
  return s;
}

/**
 * Insert, or update the existing row when the same person submits the same
 * form again (so a double-click or a retry never creates a duplicate).
 */
export async function saveSubmission(db, s) {
  const row = await db
    .prepare(
      `INSERT INTO submissions
         (type, ref, ref_title, full_name, email, phone, country, seats, volunteer, volunteer_areas, current_role)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
       ON CONFLICT (type, ref, email) DO UPDATE SET
         ref_title = excluded.ref_title, full_name = excluded.full_name, phone = excluded.phone,
         country = excluded.country, seats = excluded.seats, volunteer = excluded.volunteer,
         volunteer_areas = excluded.volunteer_areas, current_role = excluded.current_role,
         email_status = 'pending', email_error = NULL,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
       RETURNING id`,
    )
    .bind(
      s.type, s.ref, s.refTitle, s.fullName, s.email, s.phone, s.country,
      s.seats ?? null, s.volunteer ?? null, s.volunteerAreas ?? null, s.currentRole ?? null,
    )
    .first();
  return row.id;
}

/** The payload Apps Script expects, from a normalized submission. */
export function toPayload(s) {
  const base = { type: s.type, fullName: s.fullName, email: s.email, phone: s.phone, country: s.country };
  return s.type === "waitlist"
    ? { ...base, track: s.ref, trackName: s.refTitle, currentRole: s.currentRole ?? "" }
    : { ...base, eventSlug: s.ref, eventTitle: s.refTitle, seats: s.seats,
        volunteer: s.volunteer, volunteerAreas: s.volunteerAreas ?? "" };
}

/** Same payload, from a stored D1 row (used when retrying emails). */
export function rowToPayload(r) {
  return toPayload({
    type: r.type, fullName: r.full_name, email: r.email, phone: r.phone, country: r.country,
    ref: r.ref, refTitle: r.ref_title, seats: r.seats, volunteer: r.volunteer,
    volunteerAreas: r.volunteer_areas, currentRole: r.current_role,
  });
}

/**
 * Hand a saved submission to Apps Script, which sends the confirmation email
 * and mirrors the row into the Google Sheet. `resend` tells it to skip the
 * Sheet (the row is already there) and only send the email.
 * Records the outcome on the row; never throws.
 */
export async function sendConfirmation(env, id, payload, { resend = false } = {}) {
  let status = "failed";
  let error = null;
  try {
    if (!env.APPS_SCRIPT_URL) throw new Error("APPS_SCRIPT_URL is not set");
    // text/plain matches what the browser used to send; Apps Script answers a
    // POST with a redirect to the result, which fetch follows.
    const res = await fetch(env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, resend }),
    });
    const out = await res.json().catch(() => null);
    if (out?.ok) status = "sent";
    else error = str(out?.error || `Apps Script HTTP ${res.status}`, 500);
  } catch (err) {
    error = str(err?.message || err, 500);
  }
  await env.DB.prepare(
    `UPDATE submissions SET email_status = ?1, email_error = ?2,
       updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?3`,
  ).bind(status, error, id).run();
  return status;
}
