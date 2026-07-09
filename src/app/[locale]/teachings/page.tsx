import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { teachingsCopy } from "@/i18n/pages/teachings";
import { teachings } from "@/data/teachings";
import { Container, Section } from "@/components/layout/Section";
import { Avatar } from "@/components/ui/Avatar";
import { TeachingsSearchBar } from "@/components/teachings/TeachingsSearchBar";
import { TeachingsBrowser } from "@/components/teachings/TeachingsBrowser";
import { TeachingGravityCard } from "@/components/cards/TeachingGravityCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = teachingsCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function TeachingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = teachingsCopy[loc];

  const recentlyAdded = [...teachings]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <>
      {/* Hero search */}
      <Section surface="paper" className="pb-0 text-center">
        <Container>
          <span className="mb-4 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
            {c.eyebrow}
          </span>
          <h1 className="text-display-l text-ink-900">{c.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-500">
            {c.subtitle}
          </p>
          <div className="mt-12">
            <Suspense>
              <TeachingsSearchBar locale={loc} />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Sticky filters + featured banner + grid (renders the hero's search results) */}
      <Section surface="paper" className="pt-8">
        <Container>
          <Suspense>
            <TeachingsBrowser teachings={teachings} locale={loc} />
          </Suspense>
        </Container>
      </Section>

      {/* Bridge to guided journeys */}
      <Section surface="paper" className="pt-0">
        <Container>
          <div className="flex flex-col items-center gap-8 rounded-[var(--radius-l)] border border-ink-100 bg-paper-50 p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-heading-2 text-ink-900">{c.bridgeHeading}</h3>
              <p className="mt-3 text-body-l text-ink-500">
                {c.bridgeBody}
              </p>
              <Link
                href={`/${loc}/start-here`}
                className="mt-5 inline-flex items-center gap-2 text-body-m font-semibold text-gold-hover"
              >
                <Compass className="h-4 w-4" />
                {c.chooseJourney}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </div>
            <div className="flex -space-x-4 rtl:space-x-reverse">
              <Avatar alt="Leader" size={64} className="border-4 border-paper-50 bg-ink-900 text-paper-0" />
              <Avatar alt="Director" size={64} className="border-4 border-paper-50 bg-gold-600/20 text-gold-hover" />
              <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-paper-50 bg-ink-100 text-caption font-semibold text-ink-500">
                +4k
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Secondary grid */}
      <Section surface="paper" className="pt-0">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-heading-2 text-ink-900">{c.newInLibrary}</h2>
            <Link
              href={`/${loc}/library`}
              className="whitespace-nowrap border-b border-gold-600 text-body-s font-semibold text-gold-hover"
            >
              {c.viewAllArchive}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
            {recentlyAdded.map((teaching) => (
              <TeachingGravityCard key={teaching.slug} teaching={teaching} locale={loc} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
