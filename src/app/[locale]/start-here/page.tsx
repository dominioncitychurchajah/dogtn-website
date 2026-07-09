import type { Metadata } from "next";
import Image from "next/image";
import { Compass, ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { startHereCopy } from "@/i18n/pages/start-here";
import { journeys } from "@/data/journeys";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { JourneyCard } from "@/components/cards/JourneyCard";
import { Button } from "@/components/ui/Button";
import { JourneyLadder } from "@/components/ladder/JourneyLadder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = startHereCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle };
}

export default async function StartHerePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = startHereCopy[loc];

  return (
    <>
      {/* Hero */}
      <Section surface="dark" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pastor/prayer-hands-raised.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/60 to-ink-900" />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
              {c.heroEyebrow}
            </span>
            <h1 className="gravity-text text-display-l text-paper-0">
              {c.heroTitle}
            </h1>
            <p className="mt-5 text-body-l text-ink-300">
              {c.heroBody}
            </p>
          </div>
          <div className="mt-12">
            <JourneyLadder current="Visitor" orientation="horizontal" />
          </div>
        </Container>
      </Section>

      {/* Journey selector */}
      <Section surface="paper">
        <Container>
          <SectionHeading
            eyebrow={c.journeysEyebrow}
            title={c.journeysTitle}
            intro={c.journeysIntro}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {journeys.map((journey) => (
              <JourneyCard key={journey.slug} journey={journey} locale={loc} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Orientation band */}
      <Section surface="alt">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1 md:flex-row md:items-center lg:p-12">
            <div className="max-w-xl">
              <span className="mb-3 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
                <Compass className="h-4 w-4" /> {c.orientationEyebrow}
              </span>
              <h2 className="text-heading-2 text-ink-900">{c.orientationTitle}</h2>
              <p className="mt-3 text-body-l text-ink-500">
                {c.orientationBody}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="l" href={`/${loc}/leadership/assessment`}>
                {c.ctaTakeOrientation}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
              <Button variant="secondary" size="l" href={`/${loc}/mentorship`}>
                {c.ctaTalkMentor}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
