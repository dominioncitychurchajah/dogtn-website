"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, CalendarCheck, GraduationCap, MailWarning, UserPlus } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Real numbers only: everything here comes from the sign-ups database via the
// same admin API as the Sign-ups page.

interface Row {
  id: number;
  type: "registration" | "waitlist";
  ref_title: string;
  full_name: string;
  email_status: string;
  created_at: string;
}

async function load(type: Row["type"]): Promise<Row[]> {
  const res = await fetch(`/api/admin/submissions?type=${type}`, { cache: "no-store" });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(out.error || `Error ${res.status}`);
  return out.rows;
}

export default function AdminDashboard() {
  const { locale } = useParams<{ locale: string }>();
  const [data, setData] = React.useState<{ reg: Row[]; wait: Row[]; weekAgo: string } | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    Promise.all([load("registration"), load("waitlist")])
      .then(([reg, wait]) => setData({ reg, wait, weekAgo: new Date(Date.now() - 7 * 86_400_000).toISOString() }))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load"));
  }, []);

  if (error) return <p role="alert" className="text-body-m text-flame-600">{error}</p>;
  if (!data) return <p className="text-body-m text-ink-500">Loading…</p>;

  const all = [...data.reg, ...data.wait];
  const unsent = all.filter((r) => r.email_status === "failed" || r.email_status === "pending").length;
  const byTitle = (rows: Row[]) =>
    Object.entries(rows.reduce<Record<string, number>>((m, r) => ({ ...m, [r.ref_title]: (m[r.ref_title] ?? 0) + 1 }), {})).sort(
      (a, b) => b[1] - a[1],
    );
  const signups = `/${locale}/admin/submissions`;

  const kpis = [
    { label: "Event registrations", value: data.reg.length, icon: CalendarCheck },
    { label: "Mentorship waitlist", value: data.wait.length, icon: GraduationCap },
    { label: "New in the last 7 days", value: all.filter((r) => r.created_at >= data.weekAgo).length, icon: UserPlus },
    { label: "Emails waiting to send", value: unsent, icon: MailWarning, warn: unsent > 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Link key={k.label} href={signups} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-5 hover:border-gold-600">
            <span className={`grid h-10 w-10 place-items-center rounded-[var(--radius-m)] ${k.warn ? "bg-flame-600/15 text-flame-600" : "bg-ink-900 text-gold-400"}`}>
              <k.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-heading-1 text-ink-900">{k.value}</p>
            <p className="text-body-s text-ink-500">{k.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[
          { title: "Waitlist by track", rows: byTitle(data.wait) },
          { title: "Registrations by event", rows: byTitle(data.reg) },
        ].map((block) => (
          <section key={block.title} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
            <h2 className="text-heading-3 text-ink-900">{block.title}</h2>
            {block.rows.length === 0 ? (
              <p className="mt-4 text-body-s text-ink-500">None yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {block.rows.map(([title, n]) => (
                  <li key={title} className="flex items-center gap-3 text-body-s">
                    <span className="w-40 shrink-0 truncate text-ink-700">{title}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-paper-50">
                      <span className="block h-full rounded-full bg-gold-600" style={{ width: `${(n / block.rows[0][1]) * 100}%` }} />
                    </span>
                    <span className="w-8 text-end font-semibold text-ink-900">{n}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-3 text-ink-900">Latest sign-ups</h2>
          <Link href={signups} className="inline-flex items-center gap-1 text-body-s font-semibold text-gold-hover">
            See all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-ink-100">
          {all
            .sort((a, b) => b.created_at.localeCompare(a.created_at))
            .slice(0, 6)
            .map((r) => (
              <li key={`${r.type}-${r.id}`} className="flex items-center justify-between gap-4 py-3 text-body-s">
                <span>
                  <span className="font-semibold text-ink-900">{r.full_name}</span>{" "}
                  <span className="text-ink-500">{r.type === "waitlist" ? "joined the" : "registered for"} {r.ref_title}{r.type === "waitlist" ? " waitlist" : ""}</span>
                </span>
                <span className="shrink-0 text-ink-500">{formatDate(r.created_at)}</span>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
