import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Users, Clock, CalendarDays } from "lucide-react";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mentorshipCopy } from "@/i18n/pages/mentorship";
import { tracksByLevel, gleLabel } from "@/data/mentorship";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const c = mentorshipCopy[loc];
  return buildMetadata({ locale: loc, path: "mentorship", title: c.metaTitle, description: c.metaDescription });
}

export default async function MentorshipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = mentorshipCopy[loc];

  return (
    <>
      {/* Hero — deep navy, centered (consistent with the track page) */}
      <section className="bg-ink-900 px-5 py-28 text-paper-0 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-600">
            {c.eyebrow}
          </span>
          <h1 className="text-display-l leading-tight text-paper-0">{c.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl text-body-l text-ink-300">{c.subtitle}</p>
          <div className="mt-12 flex justify-center">
            <Button href="#tracks" size="l" className="uppercase tracking-wider">
              {c.exploreTracksCta}
            </Button>
          </div>
        </div>
      </section>

      {/* The progression: one programme, three levels */}
      <Section surface="alt" id="tracks">
        <Container>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="text-heading-1 text-ink-900">{c.progressionTitle}</h2>
            <p className="mt-5 text-body-l leading-relaxed text-ink-500">{c.progressionBody}</p>
          </div>

          {/* Level rail — makes the I -> II -> III order explicit before the cards */}
          <ol className="mx-auto mb-14 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            {tracksByLevel.map((track, i) => (
              <li key={track.slug} className="flex items-center gap-2 sm:flex-1">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-600 text-body-s font-bold text-ink-900">
                    {track.level}
                  </span>
                  <span className="text-caption font-semibold uppercase tracking-wider text-ink-700">
                    {track.name}
                  </span>
                </span>
                {i < tracksByLevel.length - 1 && (
                  <span className="hidden h-px flex-1 bg-ink-100 sm:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>

          <div className="mb-10 text-center">
            <h3 className="text-heading-2 text-ink-900">{c.gridTitle}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-body-m text-ink-500">{c.gridSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tracksByLevel.map((track) => (
              <Link
                key={track.slug}
                href={`/${locale}/mentorship/${track.slug}`}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 shadow-elev-1 transition-all duration-500 hover:border-gold-600 hover:shadow-elev-3"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-900">
                  <Image
                    src={track.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-600 px-2.5 py-1 text-caption font-bold uppercase tracking-wider text-ink-900">
                    {gleLabel(track)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h4 className="text-heading-3 text-ink-900 transition-colors group-hover:text-gold-hover">
                    {track.name}
                  </h4>
                  <p className="mt-2 flex items-start gap-2 text-body-s text-ink-500">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-hover" aria-hidden />
                    {track.audience}
                  </p>

                  {/* Course facts removed: duration, weekly hours and cohort
                      dates described a programme shape that is not published.
                      What a track involves is shared on joining. */}

                  <ul className="mt-6 space-y-2.5">
                    {track.outcomes.slice(0, 3).map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-body-s text-ink-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden />
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  {/* "Global Leadership Executive I" in a pill beside an
                      uppercase, wide-tracked CTA left both wrapping in a
                      narrow card. The label now sits on its own line as an
                      eyebrow, and the CTA keeps one line. */}
                  <div className="mt-auto pt-8">
                    <span className="block text-caption font-semibold uppercase tracking-[0.14em] text-ink-500">
                      {gleLabel(track)}
                    </span>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap text-body-s font-bold text-gold-hover">
                      {c.exploreTrackCta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <section className="bg-ink-900 px-5 py-24 text-center text-paper-0 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-xl">
          <h2 className="text-heading-1 text-paper-0">{c.closingTitle}</h2>
          <p className="mx-auto mt-4 text-body-l text-ink-300">{c.closingBody}</p>
          <div className="mt-10 flex justify-center">
            <Button href={`/${locale}/leadership/assessment`} size="l" className="uppercase tracking-wider">
              {c.takeAssessmentCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
