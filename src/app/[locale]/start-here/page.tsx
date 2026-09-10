import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { startHereCopy } from "@/i18n/pages/start-here";
import { Section, Container } from "@/components/layout/Section";
import { JourneyStrip } from "@/components/sections/JourneyStrip";
import { OrientationBand } from "@/components/sections/OrientationBand";
import { tracks } from "@/data/mentorship";
import { waitlistCopy } from "@/i18n/pages/waitlist";
import { WaitlistForm } from "@/components/mentorship/WaitlistForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const c = startHereCopy[loc];
  const w = waitlistCopy[loc];
  return buildMetadata({ locale: loc, path: "start-here", title: c.metaTitle });
}

export default async function StartHerePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = startHereCopy[loc];
  const w = waitlistCopy[loc];

  return (
    <>
      {/* Hero: solid ground, no ghost photo behind the type. */}
      <section className="bg-[#0A192F] pt-32 pb-20 text-center">
        <Container>
          <span className="mb-6 inline-flex items-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
            {c.heroEyebrow}
          </span>
          <h1 className="mx-auto max-w-3xl font-serif text-[32px] leading-tight text-white sm:text-[44px] md:text-[56px]">
            {c.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-relaxed text-[#CBD5E1]">
            {c.heroBody}
          </p>
        </Container>
      </section>

      {/* The three mentorship tracks and the waitlist. The site does not
          deliver the mentorship: the app does, and this is the way in. */}
      <Section className="bg-[#F5F1E8]">
        <Container>
          <div className="mb-10 text-center">
            <span className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
              {w.eyebrow}
            </span>
            <h2 className="font-serif text-[28px] leading-tight text-[#0A192F] sm:text-[36px]">
              {w.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[60ch] text-[16px] leading-relaxed text-[#6B7280]">
              {w.body}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="space-y-4">
              {tracks.map((t) => (
                <div key={t.slug} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
                    Level {t.level}
                  </span>
                  <h3 className="mt-2 font-serif text-[20px] leading-tight text-[#0A192F]">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B7280]">{t.audience}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
              <WaitlistForm c={w} tracks={tracks.map((t) => ({ slug: t.slug, name: t.name }))} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick routes for visitors who know what they want. */}
      <JourneyStrip locale={loc} exclude={["growSpiritually", "becomeLeader"]} />

      <OrientationBand
        locale={loc}
        title={c.orientationTitle}
        body={c.orientationBody}
        ctaPrimary={c.ctaTakeOrientation}
        ctaSecondary={w.speakToSomeone}
      />
    </>
  );
}
