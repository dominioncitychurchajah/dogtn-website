"use client";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { formatCurrency } from "@/lib/utils";

const KPIS = [
  { label: "This month", value: "₦8.4M" },
  { label: "Recurring donors", value: "312" },
  { label: "Avg. monthly gift", value: "₦12,800" },
  { label: "YTD total", value: "₦64.1M" },
];

interface GiftRow extends Record<string, unknown> {
  donor: string;
  fund: string;
  amount: number;
  currency: "NGN" | "USD";
  frequency: string;
  date: string;
}

const rows: GiftRow[] = [
  { donor: "Anonymous", fund: "Missions", amount: 250000, currency: "NGN", frequency: "Monthly", date: "2026-07-03" },
  { donor: "P. Adeyemi", fund: "Golden Heart Foundation", amount: 50000, currency: "NGN", frequency: "One-time", date: "2026-07-02" },
  { donor: "J. Carter", fund: "General", amount: 100, currency: "USD", frequency: "Monthly", date: "2026-07-01" },
  { donor: "R. Eze", fund: "Building", amount: 25000, currency: "NGN", frequency: "One-time", date: "2026-06-29" },
];

const columns: Column<GiftRow>[] = [
  { key: "donor", header: "Donor" },
  { key: "fund", header: "Fund" },
  { key: "amount", header: "Amount", render: (r) => formatCurrency(r.amount, r.currency), sortValue: (r) => r.amount },
  { key: "frequency", header: "Frequency" },
  { key: "date", header: "Date" },
];

export default function AdminGivingPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-5">
            <p className="font-display text-heading-2 text-ink-900">{k.value}</p>
            <p className="text-body-s text-ink-500">{k.label}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-4 text-heading-3 text-ink-900">Recent gifts</h2>
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}
