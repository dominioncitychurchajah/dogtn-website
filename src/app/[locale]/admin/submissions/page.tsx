"use client";

import * as React from "react";
import { Download, RefreshCw, Search } from "lucide-react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, cn } from "@/lib/utils";

// Live data from D1 via /api/admin/* (Cloudflare Pages Functions, behind
// Cloudflare Access). Nothing here is baked into the static build.

type Kind = "registration" | "waitlist";

interface Row extends Record<string, unknown> {
  id: number;
  ref_title: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  seats: number | null;
  volunteer: string | null;
  volunteer_areas: string | null;
  current_role: string | null;
  email_status: "pending" | "sent" | "failed";
  email_error: string | null;
  created_at: string;
}

const EMAIL_TONE = { sent: "verd", failed: "flame", pending: "neutral" } as const;

const common: Column<Row>[] = [
  { key: "created_at", header: "Submitted", render: (r) => formatDate(r.created_at), sortValue: (r) => r.created_at },
  { key: "full_name", header: "Name" },
  {
    key: "email",
    header: "Contact",
    render: (r) => (
      <span className="block">
        <a href={`mailto:${r.email}`} className="text-ink-900 hover:text-gold-hover">{r.email}</a>
        <span className="block text-caption text-ink-500">{r.phone}</span>
      </span>
    ),
  },
  { key: "country", header: "Country" },
];

const emailColumn: Column<Row> = {
  key: "email_status",
  header: "Email",
  render: (r) => (
    <span title={r.email_error ?? undefined}>
      <Badge tone={EMAIL_TONE[r.email_status] ?? "neutral"}>{r.email_status}</Badge>
    </span>
  ),
};

const COLUMNS: Record<Kind, Column<Row>[]> = {
  registration: [
    ...common,
    { key: "ref_title", header: "Event" },
    { key: "seats", header: "Seats", sortValue: (r) => r.seats ?? 0 },
    {
      key: "volunteer",
      header: "Volunteer",
      render: (r) => (r.volunteer === "no" ? "No" : `${r.volunteer === "yes" ? "Yes" : "Maybe"}${r.volunteer_areas ? `: ${r.volunteer_areas}` : ""}`),
    },
    emailColumn,
  ],
  waitlist: [...common, { key: "ref_title", header: "Track" }, { key: "current_role", header: "Role" }, emailColumn],
};

const TABS: { kind: Kind; label: string }[] = [
  { kind: "registration", label: "Event registrations" },
  { kind: "waitlist", label: "Mentorship waitlist" },
];

export default function AdminSubmissionsPage() {
  const [kind, setKind] = React.useState<Kind>("registration");
  const [rows, setRows] = React.useState<Row[] | null>(null);
  const [error, setError] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [retrying, setRetrying] = React.useState(false);
  const [notice, setNotice] = React.useState("");

  const [reloadKey, setReloadKey] = React.useState(0);

  React.useEffect(() => {
    let alive = true;
    fetch(`/api/admin/submissions?type=${kind}`, { cache: "no-store" })
      .then(async (res) => {
        const out = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(out.error || `Error ${res.status}`);
        if (alive) setRows(out.rows);
      })
      .catch((err) => alive && setError(err instanceof Error ? err.message : "Could not load submissions"));
    return () => {
      alive = false;
    };
  }, [kind, reloadKey]);

  function show(k: Kind) {
    setKind(k);
    setRows(null);
    setError("");
  }

  async function retry() {
    setRetrying(true);
    setNotice("");
    try {
      const res = await fetch("/api/admin/retry-emails", { method: "POST" });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || `Error ${res.status}`);
      setNotice(
        out.tried === 0
          ? "No emails waiting to be sent."
          : `Sent ${out.sent} of ${out.tried}.${out.remaining ? ` ${out.remaining} still waiting, try again later (Gmail allows about 100 a day).` : ""}`,
      );
      setReloadKey((n) => n + 1);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Retry failed");
    } finally {
      setRetrying(false);
    }
  }

  const q = query.trim().toLowerCase();
  const shown = (rows ?? []).filter(
    (r) => !q || [r.full_name, r.email, r.phone, r.country, r.ref_title].some((v) => String(v ?? "").toLowerCase().includes(q)),
  );
  const unsent = (rows ?? []).filter((r) => r.email_status !== "sent").length;

  return (
    <div className="space-y-6">
      <p className="text-body-m text-ink-500">
        Everyone who registers for an event or joins the mentorship waitlist. Saved the moment they submit,
        whether or not their confirmation email has gone out yet.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.kind}
            type="button"
            onClick={() => show(t.kind)}
            className={cn(
              "rounded-full px-4 py-2 text-body-s font-semibold",
              kind === t.kind ? "bg-ink-900 text-paper-0" : "border border-ink-100 text-ink-700 hover:bg-paper-50",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone, country…"
            className="w-full rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 py-2.5 ps-9 pe-3 text-body-m focus:border-gold-600 focus:outline-none"
          />
        </label>
        <a
          href={`/api/admin/submissions?type=${kind}&format=csv`}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-m)] border border-ink-900 px-4 py-2.5 text-body-s font-semibold text-ink-900 hover:bg-ink-900 hover:text-paper-0"
        >
          <Download className="h-4 w-4" aria-hidden /> Download CSV
        </a>
        <Button type="button" variant="secondary" onClick={retry} disabled={retrying || unsent === 0}>
          <RefreshCw className={cn("h-4 w-4", retrying && "animate-spin")} aria-hidden />
          {retrying ? "Sending…" : `Retry unsent emails${unsent ? ` (${unsent})` : ""}`}
        </Button>
      </div>

      {notice && <p role="status" className="rounded-[var(--radius-m)] bg-paper-50 p-3 text-body-s text-ink-700">{notice}</p>}

      {error ? (
        <p role="alert" className="rounded-[var(--radius-m)] border border-flame-600/25 bg-flame-600/10 p-4 text-body-m text-flame-600">
          {error}
        </p>
      ) : rows === null ? (
        <p className="text-body-m text-ink-500">Loading…</p>
      ) : (
        <>
          <p className="text-body-s text-ink-500">
            {shown.length} of {rows.length} {kind === "waitlist" ? "on the waitlist" : "registrations"}
          </p>
          <DataTable columns={COLUMNS[kind]} rows={shown} emptyMessage="Nothing here yet." />
        </>
      )}
    </div>
  );
}
