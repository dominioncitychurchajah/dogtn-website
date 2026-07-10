import Image from "next/image";
import { ArrowRight, ClipboardCheck, Radio, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function Hero({ locale, copy }: { locale: Locale; copy: HomeCopy["hero"] }) {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-ink-900 lg:min-h-[100svh]">
      <div className="absolute inset-0">
        <Image
          src="/images/pastor/hero-preaching-stage.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Left-to-right ink gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/75 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/30" />
      </div>

      <Container className="relative z-10 py-24">
        <div className="max-w-2xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
            <Star className="h-4 w-4" />
            {copy.badge}
          </span>

          <h1 className="gravity-text text-display-xl text-paper-0">
            {copy.titlePre}
            <span className="text-gold-400">{copy.titleAccent}</span>
            {copy.titlePost}
          </h1>

          <p className="measure mt-6 text-body-l text-ink-300">{copy.subtitle}</p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-paper-0/20 bg-paper-0/10 px-4 py-2 text-body-s font-semibold text-paper-0">
            <Radio className="h-4 w-4 text-gold-400" aria-hidden />
            Watch live Sundays, 8 AM GMT+1
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={`/${locale}/start-here`} size="l">
              {copy.ctaJourney}
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </Button>
            <Button
              href={`/${locale}/leadership/assessment`}
              size="l"
              variant="secondary"
              className="border-paper-0/30 bg-transparent text-paper-0 hover:bg-paper-0/10"
            >
              <ClipboardCheck className="h-5 w-5" />
              {copy.ctaAssessment}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
