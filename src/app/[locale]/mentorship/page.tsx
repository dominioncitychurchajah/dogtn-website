import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mentorshipCopy } from "@/i18n/pages/mentorship";
import { tracksByLevel } from "@/data/mentorship";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { PortalDoors } from "@/components/mentorship/PortalDoors";

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
      {/* Hero — the two doors come before any description of the programme:
          a returning student should not have to read marketing to find the
          way in. */}
      <section id="start" className="scroll-mt-28 bg-ink-900 px-5 py-24 text-paper-0 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-600">
            {c.portalEyebrow}
          </span>
          <h1 className="text-display-l leading-tight text-paper-0">{c.portalHeading}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-300">{c.subtitle}</p>
        </div>

        <PortalDoors locale={loc} className="mx-auto mt-12 max-w-3xl text-start" />

        <div className="mt-12 text-center">
          <a
            href="#tracks"
            className="inline-flex items-center gap-2 text-body-m font-semibold text-paper-0/70 transition-colors hover:text-gold-600"
          >
            {c.exploreTracksCta}
            <ChevronDown className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>

      {/* The progression: one programme, three levels */}
      <Section surface="alt" id="tracks" className="scroll-mt-24">
        <Container>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="text-heading-1 text-ink-900">{c.progressionTitle}</h2>
            <p className="mt-5 text-body-l leading-relaxed text-ink-500">{c.progressionBody}</p>
          </div>

          {/* Level rail — the I -> II -> III order, with the detail in the app. */}
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
