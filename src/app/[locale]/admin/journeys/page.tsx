import type { Metadata } from "next";
import { Compass, Plus } from "lucide-react";
import { journeys } from "@/data/journeys";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Admin · Journeys & Curriculum" };

export default function AdminJourneysPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-body-m text-ink-500">Compose the transformation journeys and their module curriculum.</p>
        <Button size="s"><Plus className="h-4 w-4" /> New journey</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {journeys.map((j) => (
          <div key={j.slug} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-5">
            <div className="flex items-center justify-between">
              <Compass className="h-6 w-6 text-gold-600" />
              <Badge tone="neutral">{j.modules.length} modules</Badge>
            </div>
            <h3 className="mt-3 text-heading-3 text-ink-900">{j.title}</h3>
            <p className="mt-1 line-clamp-2 text-body-s text-ink-500">{j.promise}</p>
            <div className="mt-4 flex gap-2">
              <Button size="s" variant="secondary">Edit</Button>
              <Button size="s" variant="ghost">Reorder modules</Button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-[var(--radius-m)] border border-dashed border-ink-100 bg-paper-50 p-4 text-body-s text-ink-500">
        Drag-and-drop curriculum builder and versioning are part of the admin roadmap.
      </p>
    </div>
  );
}
