"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, Star, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { Teaching, MediaFormat } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { teachingsCopy } from "@/i18n/pages/teachings";
import { TeachingGravityCard } from "@/components/cards/TeachingGravityCard";
import { DataSaverToggle } from "@/components/media/DataSaverToggle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormatFilter = "all" | MediaFormat;

interface DropdownProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  active: boolean;
}

function FilterDropdown<T extends string>({ label, value, options, onChange, active }: DropdownProps<T>) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = options.find((o) => o.value === value)?.label ?? label;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-body-s font-semibold transition-colors",
          active ? "bg-ink-900 text-paper-0" : "border border-ink-100 text-ink-700 hover:bg-paper-50",
        )}
      >
        {active ? current : label}
        <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute start-0 z-40 mt-2 w-56 overflow-hidden rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 py-1 shadow-elev-3"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-start text-body-s hover:bg-paper-50",
                  o.value === value && "font-semibold text-gold-hover",
                )}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TeachingsBrowser({ teachings, locale }: { teachings: Teaching[]; locale: Locale }) {
  const c = teachingsCopy[locale];
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const [format, setFormat] = React.useState<FormatFilter>("all");
  const [series, setSeries] = React.useState<string>("all");
  const [topic, setTopic] = React.useState<string>("all");
  const [year, setYear] = React.useState<string>("all");

  const seriesOptions = React.useMemo(() => {
    const set = new Set<string>();
    for (const t of teachings) if (t.series) set.add(t.series);
    return Array.from(set).sort();
  }, [teachings]);

  const topicOptions = React.useMemo(() => {
    const set = new Set<string>();
    for (const t of teachings) for (const tag of t.tags) set.add(tag);
    return Array.from(set).sort();
  }, [teachings]);

  const yearOptions = React.useMemo(() => {
    const set = new Set<string>();
    for (const t of teachings) set.add(t.publishedAt.slice(0, 4));
    return Array.from(set).sort().reverse();
  }, [teachings]);

  const results = React.useMemo(
    () =>
      teachings.filter((t) => {
        if (format !== "all" && t.format !== format) return false;
        if (series !== "all" && t.series !== series) return false;
        if (topic !== "all" && !t.tags.includes(topic)) return false;
        if (year !== "all" && !t.publishedAt.startsWith(year)) return false;
        if (query && !`${t.title} ${t.description}`.toLowerCase().includes(query)) return false;
        return true;
      }),
    [teachings, format, series, topic, year, query],
  );

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-20 z-30 -mx-5 mb-12 border-y border-ink-100/70 bg-paper-0/95 px-5 py-4 backdrop-blur-sm lg:-mx-16 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <FilterDropdown
              label={c.filterTopic}
              value={topic}
              active={topic !== "all"}
              onChange={setTopic}
              options={[{ value: "all", label: c.allTopics }, ...topicOptions.map((t) => ({ value: t, label: t }))]}
            />
            <FilterDropdown
              label={c.filterFormat}
              value={format}
              active={format !== "all"}
              onChange={setFormat}
              options={[
                { value: "all", label: c.allFormats },
                { value: "video", label: c.formatVideo },
                { value: "audio", label: c.formatAudio },
                { value: "article", label: c.formatArticle },
              ]}
            />
            <FilterDropdown
              label={c.filterSeries}
              value={series}
              active={series !== "all"}
              onChange={setSeries}
              options={[{ value: "all", label: c.allSeries }, ...seriesOptions.map((s) => ({ value: s, label: s }))]}
            />
            <FilterDropdown
              label={c.filterYear}
              value={year}
              active={year !== "all"}
              onChange={setYear}
              options={[{ value: "all", label: c.allYears }, ...yearOptions.map((y) => ({ value: y, label: y }))]}
            />
          </div>

          <div className="flex items-center gap-6">
            <DataSaverToggle label={c.dataSaver} />
            <div className="h-6 w-px bg-ink-100" aria-hidden />
            <span className="whitespace-nowrap text-caption text-ink-500">
              {c.showingLabel} {results.length} {results.length === 1 ? c.resultSingular : c.resultPlural}
            </span>
          </div>
        </div>
      </div>

      {/* Featured curriculum series banner */}
      <div className="relative mb-12 h-[480px] overflow-hidden rounded-[var(--radius-xl)] bg-ink-900 shadow-elev-3">
        <Image
          src="/images/pastor/community-vestments-auditorium.jpg"
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/40 to-transparent" />
        <div className="relative flex h-full max-w-2xl flex-col justify-end p-8 lg:p-16">
          <Badge tone="gold" className="mb-6 w-fit">
            <Star className="h-3 w-3 fill-gold-hover" /> {c.featuredBadge}
          </Badge>
          <h2 className="text-heading-1 text-paper-0">{c.featuredTitle}</h2>
          <p className="mt-4 text-body-l text-ink-300">
            {c.featuredBlurb}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={`/${locale}/journeys/become-a-leader`} size="l">
              {c.startJourney}
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </Button>
            <Button
              href={`/${locale}/leadership`}
              size="l"
              variant="secondary"
              className="border-paper-0/30 bg-transparent text-paper-0 hover:bg-paper-0/10"
            >
              {c.viewCurriculum}
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {results.map((teaching) => (
            <TeachingGravityCard key={teaching.slug} teaching={teaching} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-body-l text-ink-500">{c.noResults}</p>
      )}
    </div>
  );
}
