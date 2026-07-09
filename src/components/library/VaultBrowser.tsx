"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { History, Bookmark, ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { Book } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const FORMAT_LABEL: Record<string, string> = {
  ebook: "Digital Book",
  paperback: "Paperback",
  audiobook: "Audiobook",
};

const FORMAT_OPTIONS = [
  { value: "ebook", label: "Digital Books" },
  { value: "paperback", label: "Paperbacks" },
  { value: "audiobook", label: "Audiobooks" },
];

// Deterministic display flavour (avoids hydration mismatches).
const VIEWS = ["12.5k", "28k", "18.2k", "15.7k", "9.4k", "6.1k"];

function ArchiveCard({ book, index, locale }: { book: Book; index: number; locale: Locale }) {
  const primaryFormat = book.formats[0] ?? "ebook";
  const edition = book.featured ? "Premium Edition" : "Legacy Series";
  const code = `GLF-20${24 - (index % 6)}-${String.fromCharCode(65 + (index % 3))}`;
  const cta = book.formats.includes("ebook") ? "Read Now" : "Get Your Copy";

  return (
    <article className="archive-card group flex h-full flex-col overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 shadow-elev-1 transition-shadow duration-500 hover:shadow-elev-3">
      <div className="relative h-72 overflow-hidden bg-ink-900">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-5 top-5 flex gap-2">
          <span className="rounded-full bg-paper-0/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-900 backdrop-blur">
            {FORMAT_LABEL[primaryFormat] ?? "Book"}
          </span>
          <span className="rounded-full bg-gold-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-900">
            {edition}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-hover">
            {book.category} Series
          </span>
          <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">{code}</span>
        </div>
        <h3 className="text-heading-3 leading-tight text-ink-900 transition-colors group-hover:text-gold-hover">
          {book.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-body-s leading-relaxed text-ink-500">
          {book.synopsis}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-6">
          <div className="flex gap-4 text-ink-300">
            <span className="flex items-center gap-1 text-[11px] font-bold">
              <History className="h-4 w-4" aria-hidden /> {VIEWS[index % VIEWS.length]}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold">
              <Bookmark className="h-4 w-4" aria-hidden /> Savable
            </span>
          </div>
          <Link
            href={`/${locale}/library/books/${book.slug}`}
            className="group/link flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink-900"
          >
            {cta}
            <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover/link:translate-x-1 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VaultBrowser({ books, locale }: { books: Book[]; locale: Locale }) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const [formats, setFormats] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState("relevant");

  function toggleFormat(value: string) {
    setFormats((prev) => (prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]));
  }

  const results = React.useMemo(() => {
    let list = books.filter((b) => {
      if (formats.length && !b.formats.some((f) => formats.includes(f))) return false;
      if (query && !`${b.title} ${b.synopsis} ${b.category}`.toLowerCase().includes(query)) return false;
      return true;
    });
    if (sort === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [books, formats, query, sort]);

  return (
    <div id="archive" className="flex scroll-mt-28 flex-col gap-12 lg:flex-row lg:gap-16">
      {/* Filter sidebar */}
      <aside className="w-full shrink-0 lg:w-72">
        <div className="lg:sticky lg:top-28">
          <h4 className="mb-8 flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-ink-900">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-600" aria-hidden /> Content Filter
          </h4>

          <div className="mb-10">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-widest text-ink-300">Format</span>
            <div className="space-y-3">
              {FORMAT_OPTIONS.map((f) => (
                <label key={f.value} className="group flex cursor-pointer items-center gap-3 text-body-m">
                  <input
                    type="checkbox"
                    checked={formats.includes(f.value)}
                    onChange={() => toggleFormat(f.value)}
                    className="h-5 w-5 rounded-[4px] border-ink-100 text-gold-600 focus:ring-gold-600"
                  />
                  <span className="font-medium text-ink-700 transition-colors group-hover:text-gold-hover">{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-widest text-ink-300">Institutional Era</span>
            <div className="space-y-3">
              {["1990 – 2000 Era", "Current Decades"].map((era, i) => (
                <label key={era} className="group flex cursor-pointer items-center gap-3 text-body-m">
                  <input type="radio" name="era" defaultChecked={i === 1} className="h-5 w-5 border-ink-100 text-gold-600 focus:ring-gold-600" />
                  <span className="font-medium text-ink-700 transition-colors group-hover:text-gold-hover">{era}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-widest text-ink-300">Affiliate Institution</span>
            <div className="relative">
              <select className="w-full appearance-none rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-4 py-3 text-body-m focus:border-gold-600 focus:outline-none">
                <option>Global Leadership Foundation</option>
                <option>Dominion City Global</option>
                <option>DLI Academy</option>
              </select>
              <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" aria-hidden />
            </div>
          </div>
        </div>
      </aside>

      {/* Archive grid */}
      <div className="flex-1">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink-100 pb-8 md:flex-row md:items-baseline">
          <div>
            <h2 className="text-heading-2 text-ink-900">Archive Explorer</h2>
            <p className="mt-2 text-body-m text-ink-500">
              {query ? (
                <>
                  Curated results for <span className="font-bold text-ink-900">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                <>Showing the full collection — {results.length} works</>
              )}
            </p>
          </div>
          <label className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">Chronology</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer border-none bg-transparent text-label-md font-bold uppercase text-ink-900 focus:outline-none"
            >
              <option value="relevant">Most Relevant</option>
              <option value="title">A–Z Title</option>
            </select>
          </label>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {results.map((book, i) => (
              <ArchiveCard key={book.slug} book={book} index={i} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-body-l text-ink-500">No works match your filters yet.</p>
        )}

        {/* Pagination (visual) */}
        <div className="mt-20 flex items-center justify-center gap-8">
          <button className="grid h-12 w-12 place-items-center rounded-[var(--radius-m)] border border-ink-100 text-ink-900 transition-colors hover:border-gold-600 hover:text-gold-hover" aria-label="Previous page">
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>
          <div className="flex items-center gap-3 text-body-s">
            <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-s)] bg-ink-900 text-[11px] font-bold text-paper-0">01</span>
            <span className="text-ink-300">of</span>
            <span className="font-bold text-ink-900">42</span>
          </div>
          <button className="grid h-12 w-12 place-items-center rounded-[var(--radius-m)] border border-ink-100 text-ink-900 transition-colors hover:border-gold-600 hover:text-gold-hover" aria-label="Next page">
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
