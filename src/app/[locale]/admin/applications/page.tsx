import type { Metadata } from "next";
import { KanbanBoard } from "@/components/admin/KanbanBoard";

export const metadata: Metadata = { title: "Admin · Applications" };

export default async function AdminApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <div className="mb-6">
        <p className="text-body-m text-ink-500">
          Drag-free board of every application across the mentorship pipeline. Select a card to open the full review.
        </p>
      </div>
      <KanbanBoard locale={locale} />
    </div>
  );
}
