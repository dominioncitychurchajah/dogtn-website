import type { Metadata } from "next";
import { Users, HandHeart, GraduationCap, UserPlus, TrendingUp, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Admin · Dashboard" };

const KPIS = [
  { label: "Open applications", value: "48", delta: "+12 this week", icon: Users },
  { label: "Active cohorts", value: "6", delta: "2 starting soon", icon: GraduationCap },
  { label: "Giving this month", value: "₦8.4M", delta: "+18% MoM", icon: HandHeart },
  { label: "New members", value: "1,204", delta: "+9% MoM", icon: UserPlus },
];

const ACTIVITY = [
  { who: "Chidera N.", what: "submitted an application to Ministry Leaders", when: "12m ago" },
  { who: "System", what: "published “The Laws of Kingdom Governance”", when: "1h ago" },
  { who: "Ada O.", what: "moved 3 applicants to Interview", when: "2h ago" },
  { who: "Golden Heart Foundation", what: "received a ₦250,000 monthly gift", when: "5h ago" },
  { who: "Emeka U.", what: "completed DLI Basic — certificate issued", when: "Yesterday" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-m)] bg-ink-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-1 text-caption font-semibold text-verd-600">
                  <TrendingUp className="h-3.5 w-3.5" /> {k.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-heading-1 text-ink-900">{k.value}</p>
              <p className="text-body-s text-ink-500">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts placeholder + activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-heading-3 text-ink-900">Applications over time</h2>
              <span className="text-caption text-ink-500">Last 12 weeks</span>
            </div>
            {/* Faux bar chart */}
            <div className="flex h-48 items-end gap-2">
              {[40, 55, 38, 62, 70, 48, 80, 66, 90, 72, 85, 96].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gold-600/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
            <h2 className="mb-4 text-heading-3 text-ink-900">Giving by fund</h2>
            <div className="flex h-32 items-center justify-center rounded-[var(--radius-m)] bg-paper-50 text-body-s text-ink-300">
              Chart placeholder — donut by fund
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
          <h2 className="mb-4 text-heading-3 text-ink-900">Recent activity</h2>
          <ul className="space-y-4">
            {ACTIVITY.map((a, i) => (
              <li key={i} className="flex gap-3">
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-hover" />
                <p className="text-body-s text-ink-700">
                  <span className="font-semibold text-ink-900">{a.who}</span> {a.what}.
                  <span className="ms-1 text-caption text-ink-300">{a.when}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
