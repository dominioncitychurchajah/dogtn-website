"use client";

import * as React from "react";
import { Download, Mail, Pencil, Plus, RefreshCw, RotateCcw, Search, Trash2 } from "lucide-react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { SubmissionForm, type EditableRow, type Kind } from "@/components/admin/SubmissionForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate, cn } from "@/lib/utils";

// Live data from D1 via /api/admin/* (Cloudflare Pages Functions behind the
// admin login). Nothing here is baked into the static build.

interface Row extends EditableRow, Record<string, unknown> {
  ref_title: string;
  email_status: "pending" | "sent" | "failed" | "skipped";
  email_error: string | null;
  created_at: string;
}

const EMAIL_TONE = { sent: "verd", failed: "flame", pending: "neutral", skipped: "neutral" } as const;
const EMAIL_LABEL = { sent: "sent", failed: "failed", pending: "sending", skipped: "not sent" } as const;

const TABS: { kind: Kind; label: string }[] = [
  { kind: "registration", label: "Event registrations" },
  { kind: "waitlist", label: "Mentorship waitlist" },
];

const iconBtn =
  "grid h-8 w-8 place-items-center rounded-[var(--radius-m)] text-ink-500 hover:bg-paper-50 hover:text-ink-900 disabled:opacity-40";

export default function AdminSubmissionsPage() {
  const [kind, setKind] = React.useState<Kind>("registration");
  const [trash, setTrash] = React.useState(false);
  const [rows, setRows] = React.useState<Row[] | null>(null);
  const [error, setError] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [busy, setBusy] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState("");
  const [editing, setEditing] = React.useState<Row | "new" | null>(null);
  const [reloadKey, setReloadKey] = React.useState(0);
  const reload = () => setReloadKey((n) => n + 1);

  React.useEffect(() => {
    let alive = true;
    fetch(`/api/admin/submissions?type=${kind}${trash ? "&trash=1" : ""}`, { cache: "no-store" })
      .then(async (res) => {
        const out = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(out.error || `Error ${res.status}`);
        if (alive) setRows(out.rows);
      })
      .catch((err) => alive && setError(err instanceof Error ? err.message : "Could not load submissions"));
    return () => {
      alive = false;
    };
  }, [kind, trash, reloadKey]);

  function show(k: Kind, inTrash: boolean) {
    setKind(k);
    setTrash(inTrash);
    setRows(null);
    setError("");
    setNotice("");
  }

  /** One request for a row action; reports the outcome above the table. */
  async function act(key: string, url: string, method: string, done: string) {
    setBusy(key);
    setNotice("");
    try {
      const res = await fetch(url, { method });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || (out.status === "failed" ? "The email could not be sent (Gmail's daily limit may be used up). Try again later." : `Error ${res.status}`));
      setNotice(done);
      reload();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  async function retryAll() {
    setBusy("retry");
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
      reload();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Retry failed");
    } finally {
      setBusy(null);
    }
  }

  const columns = React.useMemo<Column<Row>[]>(() => {
    const base: Column<Row>[] = [
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
    const specific: Column<Row>[] =
      kind === "registration"
        ? [
            { key: "ref_title", header: "Event" },
            { key: "seats", header: "Seats", sortValue: (r) => r.seats ?? 0 },
            {
              key: "volunteer",
              header: "Volunteer",
              render: (r) => (r.volunteer === "yes" || r.volunteer === "maybe" ? `${r.volunteer === "yes" ? "Yes" : "Maybe"}${r.volunteer_areas ? `: ${r.volunteer_areas}` : ""}` : "No"),
            },
          ]
        : [{ key: "ref_title", header: "Track" }, { key: "current_role", header: "Role" }];
    const tail: Column<Row>[] = [
      {
        key: "email_status",
        header: "Email",
        render: (r) => (
          <span title={r.email_error ?? undefined}>
            <Badge tone={EMAIL_TONE[r.email_status] ?? "neutral"}>{EMAIL_LABEL[r.email_status] ?? r.email_status}</Badge>
          </span>
        ),
      },
      {
        key: "id",
        header: "",
        sortable: false,
        render: (r) =>
          trash ? (
            <button type="button" className={iconBtn} title="Restore" aria-label={`Restore ${r.full_name}`} disabled={busy !== null}
              onClick={() => act(`restore-${r.id}`, `/api/admin/submissions/${r.id}/restore`, "POST", `${r.full_name} restored.`)}>
              <RotateCcw className="h-4 w-4" />
            </button>
          ) : (
            <span className="flex gap-1">
              <button type="button" className={iconBtn} title="Edit" aria-label={`Edit ${r.full_name}`} onClick={() => setEditing(r)}>
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" className={iconBtn} title="Resend confirmation email" aria-label={`Resend email to ${r.full_name}`} disabled={busy !== null}
                onClick={() => act(`resend-${r.id}`, `/api/admin/submissions/${r.id}/resend`, "POST", `Confirmation email sent to ${r.email}.`)}>
                <Mail className={cn("h-4 w-4", busy === `resend-${r.id}` && "animate-pulse")} />
              </button>
              <button type="button" className={cn(iconBtn, "hover:text-flame-600")} title="Delete" aria-label={`Delete ${r.full_name}`} disabled={busy !== null}
                onClick={() => {
                  if (window.confirm(`Move ${r.full_name} to Trash? You can restore them from Trash later.`)) {
                    void act(`delete-${r.id}`, `/api/admin/submissions/${r.id}`, "DELETE", `${r.full_name} moved to Trash.`);
                  }
                }}>
                <Trash2 className="h-4 w-4" />
              </button>
            </span>
          ),
      },
    ];
    return [...base, ...specific, ...tail];
    // eslint-disable-next-line react-hooks/exhaustive-deps -- act/setEditing are stable enough; rebuild on view changes
  }, [kind, trash, busy]);

  const q = query.trim().toLowerCase();
  const shown = (rows ?? []).filter(
    (r) => !q || [r.full_name, r.email, r.phone, r.country, r.ref_title].some((v) => String(v ?? "").toLowerCase().includes(q)),
  );
  const unsent = trash ? 0 : (rows ?? []).filter((r) => r.email_status === "failed" || r.email_status === "pending").length;

  return (
    <div className="space-y-6">
      <p className="text-body-m text-ink-500">
        Everyone who registers for an event or joins the mentorship waitlist, saved the moment they submit. Add people
        who signed up by phone, fix typos, or move entries to Trash.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.kind}
            type="button"
            onClick={() => show(t.kind, false)}
            className={cn(
              "rounded-full px-4 py-2 text-body-s font-semibold",
              kind === t.kind && !trash ? "bg-ink-900 text-paper-0" : "border border-ink-100 text-ink-700 hover:bg-paper-50",
            )}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => show(kind, !trash)}
          className={cn(
            "ms-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-body-s font-semibold",
            trash ? "bg-flame-600/15 text-flame-600" : "text-ink-500 hover:bg-paper-50",
          )}
        >
          <Trash2 className="h-4 w-4" aria-hidden /> {trash ? "Leave Trash" : "Trash"}
        </button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
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
        {!trash && (
          <>
            <Button type="button" onClick={() => setEditing("new")}>
              <Plus className="h-4 w-4" aria-hidden /> Add sign-up
            </Button>
            <a
              href={`/api/admin/submissions?type=${kind}&format=csv`}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-m)] border border-ink-900 px-4 py-2.5 text-body-s font-semibold text-ink-900 hover:bg-ink-900 hover:text-paper-0"
            >
              <Download className="h-4 w-4" aria-hidden /> Download CSV
            </a>
            <Button type="button" variant="secondary" onClick={retryAll} disabled={busy !== null || unsent === 0}>
              <RefreshCw className={cn("h-4 w-4", busy === "retry" && "animate-spin")} aria-hidden />
              {busy === "retry" ? "Sending…" : `Retry unsent emails${unsent ? ` (${unsent})` : ""}`}
            </Button>
          </>
        )}
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
            {trash ? "In Trash: " : ""}
            {shown.length} of {rows.length} {kind === "waitlist" ? "on the waitlist" : "registrations"}
          </p>
          <DataTable columns={columns} rows={shown} emptyMessage={trash ? "Trash is empty." : "Nothing here yet."} />
        </>
      )}

      <Modal
        open={editing !== null}
        onOpenChange={(o) => !o && setEditing(null)}
        title={editing === "new" ? `Add ${kind === "waitlist" ? "to the mentorship waitlist" : "an event registration"}` : "Edit sign-up"}
        description={editing === "new" ? "For people who signed up by phone, WhatsApp or in person." : undefined}
      >
        {editing !== null && (
          <SubmissionForm
            key={editing === "new" ? `new-${kind}` : editing.id}
            kind={kind}
            row={editing === "new" ? null : editing}
            onDone={() => {
              setNotice(editing === "new" ? "Sign-up added." : "Changes saved.");
              setEditing(null);
              reload();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
