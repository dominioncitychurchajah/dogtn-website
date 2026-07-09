"use client";

import * as React from "react";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import type { Chapter } from "@/data/types";
import { ChapterCard } from "@/components/cards/ChapterCard";
import { Button } from "@/components/ui/Button";

/**
 * Stylized (non-tile) map panel: an ink-900 canvas with chapter pins plotted
 * from normalized lat/lng, beside a scrollable list of ChapterCards.
 * Not a real map provider — a tasteful placeholder.
 */
export function ChapterMap({
  chapters,
  locale,
}: {
  chapters: Chapter[];
  locale: string;
}) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Normalize lat/lng of the *current* set into 0..100 % coordinates,
  // padded so pins never sit on the very edge.
  const pins = React.useMemo(() => {
    if (chapters.length === 0) return [];
    const lats = chapters.map((c) => c.lat);
    const lngs = chapters.map((c) => c.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const spanLat = maxLat - minLat || 1;
    const spanLng = maxLng - minLng || 1;
    return chapters.map((c) => ({
      chapter: c,
      // x from longitude (west→east), y inverted from latitude (north→top)
      x: 8 + ((c.lng - minLng) / spanLng) * 84,
      y: 8 + ((maxLat - c.lat) / spanLat) * 84,
    }));
  }, [chapters]);

  if (chapters.length === 0) {
    return <EmptyState locale={locale} />;
  }

  return (
    <div className="grid overflow-hidden rounded-[var(--radius-l)] border border-ink-100 shadow-elev-1 lg:grid-cols-[1fr_420px]">
      {/* Map canvas */}
      <div className="relative min-h-[320px] overflow-hidden bg-ink-900 lg:min-h-[640px]">
        {/* Decorative grid + glow */}
        <div
          className="absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold-600/10 blur-3xl"
          aria-hidden
        />
        <div className="absolute left-6 top-6 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-0/10 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-paper-0 backdrop-blur-sm">
            <Globe className="h-3.5 w-3.5" aria-hidden /> Global network
          </span>
        </div>

        {/* Pins */}
        {pins.map(({ chapter, x, y }) => {
          const active = activeId === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => setActiveId(active ? null : chapter.id)}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ insetInlineStart: `${x}%`, top: `${y}%` }}
              aria-label={`${chapter.name}, ${chapter.city}`}
            >
              <span
                className={
                  "block h-3.5 w-3.5 rounded-full border-2 border-paper-0 shadow-elev-2 transition-all " +
                  (active
                    ? "scale-150 bg-gold-600 ring-4 ring-gold-600/30"
                    : "bg-gold-400 group-hover:scale-125")
                }
              />
              <span
                className={
                  "pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-s)] bg-paper-0 px-3 py-1.5 text-caption shadow-elev-3 transition-opacity " +
                  (active ? "opacity-100" : "opacity-0 group-hover:opacity-100")
                }
              >
                <span className="block font-semibold text-ink-900">{chapter.name}</span>
                <span className="block text-ink-500">{chapter.city}, {chapter.country}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Scrollable list */}
      <aside className="flex max-h-[640px] flex-col border-t border-ink-100 bg-paper-50 lg:border-s lg:border-t-0">
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
          <p className="text-body-s font-semibold text-ink-900">
            {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}
          </p>
          <span className="inline-flex items-center gap-1.5 text-caption text-ink-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> Tap a pin
          </span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              onMouseEnter={() => setActiveId(chapter.id)}
              onMouseLeave={() => setActiveId((id) => (id === chapter.id ? null : id))}
              className={
                "rounded-[var(--radius-l)] transition-shadow " +
                (activeId === chapter.id ? "ring-2 ring-gold-600/40" : "")
              }
            >
              <ChapterCard chapter={chapter} />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function EmptyState({ locale }: { locale: string }) {
  return (
    <div className="rounded-[var(--radius-l)] border border-ink-100 bg-ink-900 p-10 text-center text-paper-0 shadow-elev-1 lg:p-16">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-600/15 text-gold-400">
        <Globe className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="mt-6 text-heading-2 text-paper-0">No chapter near you — yet</h3>
      <p className="mx-auto mt-3 max-w-md text-body-l text-ink-300">
        We&apos;re raising new chapters across the nations. Until one opens near you, our online
        community gathers every week — worship, the Word, and real fellowship, wherever you are.
      </p>
      <div className="mt-8">
        <Button href={`/${locale}/community`} variant="primary">
          Join the online community
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
