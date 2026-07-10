import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Landmark, Compass, Users, Sparkles, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { books } from "@/data/books";
import { Section, Container } from "@/components/layout/Section";
import { VaultSearchConsole } from "@/components/library/VaultSearchConsole";
import { VaultBrowser } from "@/components/library/VaultBrowser";

export const metadata: Metadata = {
  title: "Legacy Vault",
  description:
    "A digital archive for global leaders. Access transcripts, manuscripts, and multimedia sessions across three decades of teaching.",
};

const PILLARS = [
  { label: "Leadership", icon: Landmark, desc: "Build your capacity for governance and institutional influence." },
  { label: "Purpose", icon: Compass, desc: "Discover your identity and know who you are." },
  { label: "Family", icon: Users, desc: "Build a lasting legacy and strengthen your home." },
  { label: "Ministry", icon: Sparkles, desc: "Grow in ministry depth and apostolic vision." },
];

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-900 text-paper-0">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
          aria-hidden
        />
        <Container className="relative py-24 text-center">
          <span className="mb-6 block text-caption font-semibold uppercase tracking-[0.4em] text-gold-600">
            Legacy Archive
          </span>
          <h1 className="mx-auto max-w-4xl text-display-l leading-[1.1] text-paper-0">
            Search Three Decades of Teaching
          </h1>
          <p className="mx-auto mb-14 mt-8 max-w-2xl text-body-l leading-relaxed text-ink-300">
            A digital archive for global leaders. Access transcripts, manuscripts, and multimedia
            sessions across 30 years of teaching.
          </p>
          <Suspense>
            <VaultSearchConsole />
          </Suspense>
        </Container>
      </section>

      {/* Browse by Institutional Pillar */}
      <Section surface="paper">
        <Container>
          <div className="mb-14 text-center">
            <h2 className="text-heading-1 text-ink-900">Browse by Institutional Pillar</h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold-600" />
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {PILLARS.map(({ label, icon: Icon, desc }) => (
              <Link
                key={label}
                href="#archive"
                className="card-lift group flex flex-col items-center rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-10 text-center"
              >
                <Icon className="mb-6 h-10 w-10 text-gold-600 transition-transform duration-500 group-hover:scale-110" aria-hidden />
                <h3 className="text-heading-3 text-ink-900">{label}</h3>
                <p className="mt-3 text-body-s leading-relaxed text-ink-500">{desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-caption font-bold uppercase tracking-widest text-gold-hover opacity-0 transition-opacity group-hover:opacity-100">
                  Open Portal <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Archive explorer */}
      <Section surface="alt">
        <Container>
          <Suspense>
            <VaultBrowser books={books} locale={loc} />
          </Suspense>
        </Container>
      </Section>

      {/* Live status band */}
      <section className="border-t border-ink-100 bg-paper-0 py-14">
        <Container className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-600 opacity-30" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-flame-600" />
            </span>
            <span className="text-caption font-bold uppercase tracking-[0.3em] text-ink-900">
              Legacy Archive:{" "}
              <span className="font-medium text-ink-500">Resources available for study now</span>
            </span>
          </div>
          <div className="flex gap-12">
            <div className="text-center">
              <span className="block font-display text-heading-2 text-ink-900">30k+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-500">Resources</span>
            </div>
            <div className="text-center">
              <span className="block font-display text-heading-2 text-ink-900">150+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-500">Nations</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
