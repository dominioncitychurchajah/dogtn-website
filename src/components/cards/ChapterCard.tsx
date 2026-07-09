import { MapPin, Clock, Phone } from "lucide-react";
import type { Chapter } from "@/data/types";
import { Button } from "@/components/ui/Button";

export function ChapterCard({ chapter, distanceKm }: { chapter: Chapter; distanceKm?: number }) {
  return (
    <div className="card-lift flex flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-heading-3 text-ink-900">{chapter.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-body-s text-ink-500">
            <MapPin className="h-4 w-4 shrink-0" /> {chapter.area}, {chapter.city}
          </p>
        </div>
        {distanceKm !== undefined && (
          <span className="shrink-0 rounded-full bg-paper-50 px-2.5 py-1 text-caption font-semibold text-ink-500">
            {distanceKm.toFixed(1)} km
          </span>
        )}
      </div>
      <ul className="mt-4 space-y-1.5 text-body-s text-ink-500">
        {chapter.serviceTimes.map((s) => (
          <li key={s} className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-gold-hover" /> {s}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <Phone className="h-4 w-4 shrink-0 text-gold-hover" /> {chapter.contact}
        </li>
      </ul>
      <Button href="#" variant="secondary" size="s" className="mt-5 self-start">
        Plan a Visit
      </Button>
    </div>
  );
}
