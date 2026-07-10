"use client";

import * as React from "react";
import { Search, Navigation, MapPin } from "lucide-react";
import type { Chapter } from "@/data/types";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChapterCard } from "@/components/cards/ChapterCard";
import { ChapterMap } from "@/components/map/ChapterMap";

/**
 * Search + country/city filter over chapters (client-side). Owns the filtered
 * state, renders the matching list, and drives the map split-view beside it.
 */
export function ChapterSearch({
  chapters,
  locale,
}: {
  chapters: Chapter[];
  locale: string;
}) {
  const [query, setQuery] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  // Mock "use my location" — assigns a fake distance so results feel ordered by proximity.
  const [distances, setDistances] = React.useState<Record<string, number> | null>(null);

  const countries = React.useMemo(
    () => Array.from(new Set(chapters.map((c) => c.country))).sort(),
    [chapters],
  );
  const cities = React.useMemo(
    () =>
      Array.from(
        new Set(
          chapters.filter((c) => !country || c.country === country).map((c) => c.city),
        ),
      ).sort(),
    [chapters, country],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = chapters.filter((c) => {
      if (country && c.country !== country) return false;
      if (city && c.city !== city) return false;
      if (q) {
        const hay = `${c.name} ${c.area} ${c.city} ${c.country}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (distances) {
      return [...list].sort(
        (a, b) => (distances[a.id] ?? Infinity) - (distances[b.id] ?? Infinity),
      );
    }
    return list;
  }, [chapters, query, country, city, distances]);

  function useMyLocation() {
    // Mock only — assign a stable pseudo-distance per chapter and sort by it.
    const mock: Record<string, number> = {};
    chapters.forEach((c, i) => {
      mock[c.id] = Math.round((((c.lat * 7 + c.lng * 13 + i) % 500) + 2) * 10) / 10;
    });
    setDistances(mock);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      {/* Filter + results column */}
      <div className="flex flex-col gap-6">
        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 shadow-elev-1">
          <div className="flex flex-col gap-4">
            <Input
              label="Search"
              name="chapter-search"
              placeholder="City, area, or country"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select
              label="Country"
              name="chapter-country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setCity("");
              }}
            >
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select
              label="City"
              name="chapter-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Button type="button" variant="secondary" onClick={useMyLocation} className="w-full">
              <Navigation className="h-4 w-4" aria-hidden />
              Use my location
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-3 flex items-center gap-1.5 text-body-s font-semibold text-ink-500">
            <MapPin className="h-4 w-4 text-gold-hover" aria-hidden />
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="rounded-[var(--radius-l)] border border-dashed border-ink-100 bg-paper-50 p-6 text-center">
                <p className="flex items-center justify-center gap-2 text-body-s text-ink-500">
                  <Search className="h-4 w-4" aria-hidden />
                  No chapters match your search.
                </p>
              </div>
            ) : (
              filtered.map((chapter) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  locale={locale}
                  distanceKm={distances?.[chapter.id]}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Map split-view (its own scrollable list + empty state) */}
      <ChapterMap chapters={filtered} locale={locale} />
    </div>
  );
}
