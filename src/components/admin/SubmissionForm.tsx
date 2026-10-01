"use client";

import * as React from "react";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { events } from "@/data/events";
import { tracks } from "@/data/mentorship";

export type Kind = "registration" | "waitlist";

/** The stored row fields the form edits (null for "add"). */
export interface EditableRow {
  id: number;
  ref: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  seats: number | null;
  volunteer: string | null;
  volunteer_areas: string | null;
  current_role: string | null;
}

/**
 * Add / edit one sign-up. Posts to /api/admin/submissions (add) or PATCHes
 * /api/admin/submissions/:id (edit); the server validates exactly like the
 * public form. Calls onDone() after a successful save.
 */
export function SubmissionForm({ kind, row, onDone }: { kind: Kind; row: EditableRow | null; onDone: () => void }) {
  const [error, setError] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const body: Record<string, unknown> = { ...d, type: kind, sendEmail: d.sendEmail === "on" };
    if (kind === "registration") body.eventTitle = events.find((ev) => ev.slug === d.eventSlug)?.title ?? d.eventSlug;
    else body.trackName = tracks.find((t) => t.slug === d.track)?.name ?? "No preference";

    setSaving(true);
    setError("");
    try {
      const res = await fetch(row ? `/api/admin/submissions/${row.id}` : "/api/admin/submissions", {
        method: row ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || `Error ${res.status}`);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  // Keep past events selectable only if this row already uses one.
  const eventOptions = events.filter((ev) => new Date(ev.endDate ?? ev.date) >= new Date() || ev.slug === row?.ref);

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Full name" name="fullName" defaultValue={row?.full_name} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email" name="email" type="email" defaultValue={row?.email} required />
        <Input label="Phone" name="phone" type="tel" defaultValue={row?.phone} required />
      </div>
      <Input label="Country" name="country" defaultValue={row?.country ?? "Nigeria"} required />

      {kind === "registration" ? (
        <>
          <Select label="Event" name="eventSlug" defaultValue={row?.ref ?? eventOptions[0]?.slug} required>
            {eventOptions.map((ev) => (
              <option key={ev.slug} value={ev.slug}>{ev.title}</option>
            ))}
          </Select>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Seats" name="seats" type="number" min={1} max={20} defaultValue={row?.seats ?? 1} />
            <Select label="Workforce" name="volunteer" defaultValue={row?.volunteer ?? "no"}>
              <option value="no">Not this time</option>
              <option value="maybe">Maybe</option>
              <option value="yes">Yes</option>
            </Select>
          </div>
          <Input label="Where they'd like to serve" name="volunteerAreas" defaultValue={row?.volunteer_areas ?? ""} />
        </>
      ) : (
        <>
          <Select label="Track" name="track" defaultValue={row?.ref ?? tracks[0]?.slug}>
            {tracks.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
            <option value="">No preference</option>
          </Select>
          <Input label="Current role" name="currentRole" defaultValue={row?.current_role ?? ""} />
        </>
      )}

      {!row && (
        <label className="flex items-center gap-2 text-body-s text-ink-700">
          <input type="checkbox" name="sendEmail" defaultChecked className="h-4 w-4 accent-[#C9A227]" />
          Send them the confirmation email
        </label>
      )}

      {error && <p role="alert" className="text-body-s text-flame-600">{error}</p>}
      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? "Saving…" : row ? "Save changes" : "Add sign-up"}
      </Button>
    </form>
  );
}
