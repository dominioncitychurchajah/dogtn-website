"use client";

import * as React from "react";
import { Filter } from "lucide-react";
import type { EventItem } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { EventCard } from "@/components/cards/EventCard";
import { Select } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { dateParts } from "@/lib/utils";

/**
 * Filter bar (institution / type / online-in-person) + Calendar/List tabs
 * over the events dataset. Calendar tab = month-grouped list, List = flat grid.
 */
export function EventsBrowser({
  events,
  locale,
}: {
  events: EventItem[];
  locale: Locale;
}) {
  const [institution, setInstitution] = React.useState("");
  const [type, setType] = React.useState("");
  const [mode, setMode] = React.useState(""); // "" | "online" | "in-person"

  const institutions = React.useMemo(
    () => Array.from(new Set(events.map((e) => e.institution))).sort(),
    [events],
  );
  const types = React.useMemo(
    () => Array.from(new Set(events.map((e) => e.type))).sort(),
    [events],
  );

  const filtered = React.useMemo(() => {
    return events
      .filter((e) => {
        if (institution && e.institution !== institution) return false;
        if (type && e.type !== type) return false;
        if (mode === "online" && !e.online) return false;
        if (mode === "in-person" && e.online) return false;
        return true;
      })
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, institution, type, mode]);

  const grid = (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((e) => (
        <EventCard key={e.slug} event={e} locale={locale} />
      ))}
    </div>
  );

  // Group by "Month Year" for the Calendar tab, preserving date order.
  const monthGroups = React.useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of filtered) {
      const { monthLong, year } = dateParts(e.date);
      const key = `${monthLong} ${year}`;
      const arr = map.get(key);
      if (arr) arr.push(e);
      else map.set(key, [e]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const calendar = (
    <div className="space-y-12">
      {monthGroups.map(([month, items]) => (
        <div key={month}>
          <div className="mb-6 flex items-center gap-4">
            <h3 className="text-heading-3 text-ink-900">{month}</h3>
            <span className="h-px flex-1 bg-ink-100" aria-hidden />
            <span className="text-body-s text-ink-500">
              {items.length} {items.length === 1 ? "event" : "events"}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const empty = (
    <div className="rounded-[var(--radius-l)] border border-dashed border-ink-100 bg-paper-50 p-12 text-center">
      <p className="text-body-l text-ink-500">No gatherings match your filters.</p>
    </div>
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-4 shadow-elev-1 sm:flex-row sm:items-end">
        <span className="hidden items-center gap-1.5 pb-3 text-body-s font-semibold text-ink-500 sm:inline-flex">
          <Filter className="h-4 w-4 text-gold-hover" aria-hidden /> Filter
        </span>
        <div className="flex-1">
          <Select
            label="Institution"
            name="event-institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          >
            <option value="">All institutions</option>
            {institutions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <Select
            label="Type"
            name="event-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <Select
            label="Format"
            name="event-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="">Online &amp; in-person</option>
            <option value="in-person">In-person</option>
            <option value="online">Online</option>
          </Select>
        </div>
      </div>

      <Tabs
        items={[
          {
            value: "calendar",
            label: "Calendar",
            content: filtered.length ? calendar : empty,
          },
          {
            value: "list",
            label: "List",
            content: filtered.length ? grid : empty,
          },
        ]}
      />
    </div>
  );
}
