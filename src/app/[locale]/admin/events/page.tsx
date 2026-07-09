"use client";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { events } from "@/data/events";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface EventRow extends Record<string, unknown> {
  title: string;
  type: string;
  institution: string;
  date: string;
  location: string;
}

const rows: EventRow[] = events.map((e) => ({
  title: e.title,
  type: e.type,
  institution: e.institution,
  date: e.date,
  location: e.online ? "Online" : e.location,
}));

const columns: Column<EventRow>[] = [
  { key: "title", header: "Event" },
  { key: "type", header: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
  { key: "institution", header: "Institution" },
  { key: "date", header: "Date", render: (r) => formatDate(r.date), sortValue: (r) => r.date },
  { key: "location", header: "Location" },
];

export default function AdminEventsPage() {
  return (
    <div>
      <p className="mb-6 text-body-m text-ink-500">All scheduled gatherings across the network.</p>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
