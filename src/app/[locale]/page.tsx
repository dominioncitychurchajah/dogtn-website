import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { Section, Container } from "@/components/layout/Section";
import { EventCard } from "@/components/cards/EventCard";
import { events } from "@/data/events";
import { Hero } from "@/components/sections/Hero";
import { NextGathering } from "@/components/sections/NextGathering";
import { JourneyStrip } from "@/components/sections/JourneyStrip";
import { EcosystemTeaser } from "@/components/sections/EcosystemTeaser";
import { FeaturedTeaching } from "@/components/sections/FeaturedTeaching";
import { AssessmentBand } from "@/components/sections/AssessmentBand";
import { TestimonyCarousel } from "@/components/sections/TestimonyCarousel";
import { GiveBand } from "@/components/sections/GiveBand";
import { NewsletterCapture } from "@/components/sections/NewsletterCapture";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = homeCopy[loc];

  return (
    <>
      {/* 1 — Hero */}
      <Hero locale={loc} copy={c.hero} />

      {/* 2 — Next gathering countdown (overlaps hero) */}
      <NextGathering copy={c.nextGathering} />

      {/* 3 — Journey selector strip */}
      <JourneyStrip locale={loc} />

      {/* 3 — Ecosystem teaser (dark) */}
      <EcosystemTeaser locale={loc} copy={c.ecosystem} />

      {/* 4 — Featured teaching */}
      <FeaturedTeaching locale={loc} copy={c.featuredTeaching} />

      {/* 5 — Leadership assessment band */}
      <AssessmentBand locale={loc} copy={c.assessment} />

      {/* 6 — Upcoming events */}
      <Section surface="alt">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-md">
              <h2 className="text-heading-1 text-ink-900">{c.events.title}</h2>
              <p className="mt-3 text-body-m text-ink-500">{c.events.subtitle}</p>
            </div>
            <Link
              href={`/${loc}/events`}
              className="inline-flex shrink-0 items-center gap-1 text-body-m font-semibold text-gold-hover"
            >
              {c.events.viewAll}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.slug} event={event} locale={loc} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7 — Testimony carousel */}
      <TestimonyCarousel copy={c.testimonies} />

      {/* 8 — Give band */}
      <GiveBand locale={loc} copy={c.give} />

      {/* 9 — Newsletter capture (dark) */}
      <NewsletterCapture locale={loc} copy={c.newsletter} />
    </>
  );
}
