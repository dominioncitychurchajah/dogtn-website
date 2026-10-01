/**
 * GET  /api/admin/submissions?type=registration|waitlist[&trash=1][&format=csv]
 *      Newest first. JSON for the admin page; CSV opens in Excel / Google Sheets.
 * POST /api/admin/submissions  { ...form fields, sendEmail: boolean }
 *      Add someone by hand (phone / walk-in registrations).
 */
import { createSubmission, json, normalize, sendConfirmation, toPayload } from "../../../../server/forms.js";

const COLUMNS = {
  registration: [
    ["created_at", "Submitted at"], ["ref_title", "Event"], ["full_name", "Full name"], ["email", "Email"],
    ["phone", "Phone"], ["country", "Country"], ["seats", "Seats"], ["volunteer", "Volunteer"],
    ["volunteer_areas", "Volunteer areas"], ["email_status", "Email"],
  ],
  waitlist: [
    ["created_at", "Submitted at"], ["ref_title", "Track"], ["full_name", "Full name"], ["email", "Email"],
    ["phone", "Phone"], ["country", "Country"], ["current_role", "Current role"], ["email_status", "Email"],
  ],
};

// Spreadsheet apps run cells starting with these as formulas; neutralise them.
const cell = (v) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") === "waitlist" ? "waitlist" : "registration";
  const trash = url.searchParams.get("trash") === "1";

  // ponytail: returns the newest 5,000; add paging if a single form ever passes that.
  const { results } = await env.DB.prepare(
    `SELECT * FROM submissions WHERE type = ?1 AND deleted_at IS ${trash ? "NOT NULL" : "NULL"}
      ORDER BY created_at DESC LIMIT 5000`,
  ).bind(type).all();

  if (url.searchParams.get("format") !== "csv") return json({ type, rows: results });

  const cols = COLUMNS[type];
  const csv = [cols.map(([, label]) => cell(label)).join(","), ...results.map((r) => cols.map(([k]) => cell(r[k])).join(","))].join("\r\n");
  const day = new Date().toISOString().slice(0, 10);
  // BOM so Excel reads names with accents correctly.
  return new Response(`﻿${csv}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type === "waitlist" ? "mentorship-waitlist" : "registrations"}-${day}.csv"`,
    },
  });
}

export async function onRequestPost({ request, env, waitUntil }) {
  const body = await request.json().catch(() => null);
  const s = normalize(body);
  if (s.error) return json({ ok: false, error: s.error }, 400);

  const id = await createSubmission(env.DB, s, body.sendEmail ? "pending" : "skipped");
  if (!id) {
    return json({ ok: false, error: "This person is already signed up for that. Search for them (or check Trash) and edit instead." }, 409);
  }
  if (body.sendEmail) waitUntil(sendConfirmation(env, id, toPayload(s)));
  return json({ ok: true, id });
}
