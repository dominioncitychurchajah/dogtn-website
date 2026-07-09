import type { Metadata } from "next";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { chapters } from "@/data/chapters";

export const metadata: Metadata = { title: "Admin · Chapters" };

interface ChapterRow extends Record<string, unknown> {
  name: string;
  area: string;
  city: string;
  country: string;
  contact: string;
}

const rows: ChapterRow[] = chapters.map((c) => ({
  name: c.name,
  area: c.area,
  city: c.city,
  country: c.country,
  contact: c.contact,
}));

const columns: Column<ChapterRow>[] = [
  { key: "name", header: "Chapter" },
  { key: "area", header: "Area" },
  { key: "city", header: "City" },
  { key: "country", header: "Country" },
  { key: "contact", header: "Contact", sortable: false },
];

export default function AdminChaptersPage() {
  return (
    <div>
      <p className="mb-6 text-body-m text-ink-500">Global chapter directory and service details.</p>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
