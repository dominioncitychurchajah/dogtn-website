import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { startHereCopy } from "@/i18n/pages/start-here";
import { Container } from "@/components/layout/Section";
import { JourneyStrip } from "@/components/sections/JourneyStrip";
import { OrientationBand } from "@/components/sections/OrientationBand";
import { waitlistCopy } from "@/i18n/pages/waitlist";
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
