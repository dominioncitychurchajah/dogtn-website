import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { dimensions, questions } from "@/data/assessment";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Admin · Assessment Manager" };

export default function AdminAssessmentPage() {
  return (
    <div className="space-y-8">
      <p className="text-body-m text-ink-500">
        Manage the leadership diagnostic — {questions.length} questions across {dimensions.length} dimensions and the
        recommendation matrix.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dimensions.map((d) => {
          const count = questions.filter((q) => q.dimension === d.key).length;
          return (
            <div key={d.key} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-5">
              <ClipboardCheck className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 text-body-m font-semibold text-ink-900">{d.label}</h3>
              <Badge tone="neutral" className="mt-2">{count} questions</Badge>
            </div>
          );
        })}
      </div>

      <p className="rounded-[var(--radius-m)] border border-dashed border-ink-100 bg-paper-50 p-4 text-body-s text-ink-500">
        Live question editing, weighting, and matrix tuning are part of the admin roadmap. The engine currently runs on
        the versioned dataset shipped with the app.
      </p>
    </div>
  );
}
