"use client";

import * as React from "react";
import Link from "next/link";
import { Search, BookOpen, Play, Headphones, FileText } from "lucide-react";
import type { Book, Teaching } from "@/data/types";
import type { Locale } from "@/i18n/config";

type Result =
  | { kind: "book"; slug: string; title: string; meta: string; snippet: string }
  | { kind: "teaching"; slug: string; title: string; meta: string; snippet: string; format: Teaching["format"] };

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-gold-400/40 px-0.5 text-ink-900">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

const fmtIcon = { video: Play, audio: Headphones, article: FileText };

export function VaultSearch({
  books,
  teachings,
  locale,
}: {
  books: Book[];
  teachings: Teaching[];
  locale: Locale;
}) {
  const [q, setQ] = React.useState("");

  const results: Result[] = React.useMemo(() => {
    if (q.trim().length < 2) return [];
    const needle = q.toLowerCase();
    const bookHits: Result[] = books
      .filter((b) => (b.title + b.synopsis + b.category).toLowerCase().includes(needle))
      .map((b) => ({ kind: "book", slug: b.slug, title: b.title, meta: b.category, snippet: b.synopsis }));
    const teachingHits: Result[] = teachings
      .filter((t) => (t.title + t.description + t.tags.join(" ")).toLowerCase().includes(needle))
      .map((t) => ({
        kind: "teaching",
        slug: t.slug,
        title: t.title,
        meta: t.series ?? t.format,
        snippet: t.description,
        format: t.format,
      }));
    return [...bookHits, ...teachingHits].slice(0, 8);
  }, [q, books, teachings]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex items-center gap-3 rounded-full border border-ink-100 bg-paper-0 px-5 py-4 shadow-elev-2 focus-within:border-gold-600">
        <Search className="h-5 w-5 shrink-0 text-ink-300" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the vault — books, teachings, principles…"
          aria-label="Search the vault"
          className="w-full bg-transparent text-body-m text-ink-900 placeholder:text-ink-300 focus:outline-none"
        />
      </div>

      {q.trim().length >= 2 && (
        <div className="mt-4 overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 text-start shadow-elev-2">
          {results.length === 0 ? (
            <p className="px-5 py-6 text-body-s text-ink-500">No results for “{q}”. Try another term.</p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {results.map((r) => {
                const href =
                  r.kind === "book" ? `/${locale}/library/books/${r.slug}` : `/${locale}/teachings/${r.slug}`;
                const Icon = r.kind === "book" ? BookOpen : fmtIcon[(r as { format: Teaching["format"] }).format];
                return (
                  <li key={`${r.kind}-${r.slug}`}>
                    <Link href={href} className="flex gap-3 px-5 py-4 hover:bg-paper-50">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-hover" />
                      <span className="min-w-0">
                        <span className="block text-body-m font-semibold text-ink-900">{highlight(r.title, q)}</span>
                        <span className="mb-1 block text-caption uppercase tracking-wider text-ink-500">{r.meta}</span>
                        <span className="line-clamp-2 block text-body-s text-ink-500">{highlight(r.snippet, q)}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
