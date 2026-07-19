"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { useCountUp } from "@/lib/use-count-up";
import { testimonies } from "@/data/testimonies";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { NextGathering } from "@/components/sections/NextGathering";
import { JourneyStrip } from "@/components/sections/JourneyStrip";
import { AssessmentBand } from "@/components/sections/AssessmentBand";
import { BooksCarousel } from "@/components/sections/BooksCarousel";

const fadeUpVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 },
};

const STATS = [
  { value: 2000, suffix: "+", label: "Churches" },
  { value: 50, suffix: "+", label: "Nations Reached" },
  { value: 1.2, suffix: "M+", label: "Lives Transformed", decimals: 1 },
  { value: 30, suffix: "+", label: "Years of Ministry" },
];

function StatCounter({ value, suffix, label, decimals = 0 }: { value: number; suffix: string; label: string; decimals?: number }) {
  const scale = 10 ** decimals;
  const { ref, value: display } = useCountUp(Math.round(value * scale));
  const shown = decimals > 0 ? (display / scale).toFixed(decimals) : display;
  return (
    <div ref={ref}>
      <div className="font-serif text-[64px] lg:text-[72px] text-[#C9A227] leading-none mb-2">
        {shown}
        {suffix}
      </div>
      <div className="text-white/60 text-base uppercase tracking-wider font-semibold">{label}</div>
    </div>
  );
}

type NavigatorConnection = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

/** Desktop-only, respects Save-Data/slow connections — mirrors the site's existing HeroMedia policy. */
function useHeroVideoEnabled() {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
    const slowNetwork = connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";

    function update() {
      setEnabled(mediaQuery.matches && !slowNetwork);
    }

    update();
    mediaQuery.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      mediaQuery.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return enabled;
}

const HOMEPAGE_TESTIMONIALS = [
  {
    id: "spec-1",
    quote:
      "Dr. Ogbueli's teaching on kingdom governance completely changed how I lead my company and serve my community. His voice is a prophetic compass for our generation.",
    attribution: "Business Leader, Lagos, Nigeria",
  },
  ...testimonies.map((t) => ({ id: t.id, quote: t.quote, attribution: `${t.name}, ${t.role}` })),
];

export function HomepageClient({ locale }: { locale: string }) {
  const heroVideoEnabled = useHeroVideoEnabled();
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const gatheringCopy = homeCopy[loc].nextGathering;
  const assessmentCopy = homeCopy[loc].assessment;

  return (
    <main className="w-full flex flex-col min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="relative w-full h-screen bg-[#0A192F] overflow-hidden flex items-center">
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%] z-0">
          <Image
            src="/images/pastor/hero-stadium-arms-wide.jpg"
            alt="Dr. David Ogbueli"
            fill
            className="object-cover opacity-30"
            unoptimized
            priority
          />
          {heroVideoEnabled && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            >
              <source src="/video/home-hero.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/80 to-transparent" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="max-w-[480px] w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227] mb-4 font-semibold">
                Apostolic Leader · Social Reformer · Global Voice
              </div>
              <h1 className="font-serif text-[56px] sm:text-[72px] lg:text-[96px] font-bold leading-none text-white mb-6">
                Dr. David Ogbueli
              </h1>
              <p className="font-sans text-[20px] text-white/70 mb-10 leading-relaxed">
                For over three decades, one man&apos;s voice has called a generation to transform society through the power of kingdom principles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/start-here`}
                  className="inline-flex items-center justify-center bg-[#C9A227] text-[#0A192F] px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#e0b430] transition-colors"
                >
                  Start Here
                </Link>
                <Link
                  href={`/${locale}/leadership/assessment`}
                  className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 text-sm font-semibold rounded-sm hover:bg-white/5 transition-colors gap-2"
                >
                  <ClipboardCheck className="w-4 h-4" /> Take Free Assessment
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>

      </section>

      {/* SECTION 1.5 — NEXT GATHERING (overlaps hero) + JOURNEY STRIP */}
      <NextGathering copy={gatheringCopy} locale={loc} />
      <JourneyStrip locale={loc} />


      {/* SECTION 3 — GLOBAL IMPACT */}
      <section className="bg-[#0A192F] py-24">
        <Container>
          <motion.div className="text-center mb-16" {...fadeUpVariant}>
            <span className="text-[#C9A227] uppercase tracking-widest text-sm font-bold mb-4 block">
              Global Impact
            </span>
            <h2 className="font-serif text-[48px] lg:text-[56px] text-white">
              From One Room to 50+ Nations
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center mb-16" {...fadeUpVariant}>
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </motion.div>

          <motion.div className="text-center max-w-4xl mx-auto" {...fadeUpVariant}>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Today, Dominion City Global spans Nigeria, Africa, Europe, Asia, and the Americas. Dr. Ogbueli has been honoured by the Mayor of Brampton, Canada, for his community impact, and his voice has reached the United Nations and global leadership platforms.
            </p>
            <Link
              href={`/${locale}/ministry`}
              className="text-[#C9A227] font-semibold flex items-center justify-center gap-2 hover:text-[#b38f22] transition-colors"
            >
              Explore the Ministry <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 4 — THE TEACHINGS (Books carousel) */}
      <BooksCarousel locale={loc} />

      {/* SECTION 5 — THE INVITATION (Assessment band) */}
      <AssessmentBand copy={assessmentCopy} locale={loc} />

      {/* SECTION 6 — TESTIMONIAL */}
      <TestimonialSection />
    </main>
  );
}

function TestimonialSection() {
  const [index, setIndex] = React.useState(0);
  const count = HOMEPAGE_TESTIMONIALS.length;
  const t = HOMEPAGE_TESTIMONIALS[index];

  const go = React.useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  return (
    <section className="bg-[#0A192F] py-24">
      <Container>
        <motion.div className="text-center" {...fadeUpVariant}>
          <div className="font-serif text-[96px] text-[#C9A227] leading-none mb-0 opacity-80">
            &ldquo;
          </div>
          <p key={t.id} className="font-serif italic text-[28px] lg:text-[32px] text-white max-w-[800px] mx-auto leading-snug">
            {t.quote}
          </p>
          <div className="text-[#C9A227] text-base mt-8 font-medium">— {t.attribution}</div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {HOMEPAGE_TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to testimony ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#C9A227]" : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
