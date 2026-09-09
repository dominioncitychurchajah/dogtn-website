"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mediaCopy } from "@/i18n/pages/media";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 }
};

/**
 * "Listen anywhere" band. Keeps the #podcast id so the Media Center's sticky
 * category tab still scrolls here; the artwork is a supplied composite.
 */
export function ListenAnywhere({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = mediaCopy[loc];

  return (
    <section id="podcast" className="scroll-mt-32 bg-white pt-6 pb-6 sm:pt-8 sm:pb-8">
      <Container>
        <motion.div
          {...fadeUp}
          className="grid items-center gap-10 overflow-hidden rounded-[24px] bg-[#DCEAFB] px-7 pt-12 sm:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-4 lg:py-0 lg:pe-0"
        >
          <div className="min-w-0 lg:py-16">
            <p className="text-base font-bold text-[#0A192F]">{c.heroTitle}</p>
            <h2 className="mt-4 max-w-[16ch] text-[32px] font-bold leading-[1.1] tracking-tight text-[#0A192F] sm:text-[44px]">
              {c.listenHeading}
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg text-[#334155]">{c.listenBody}</p>
            <Link
              href={`/${loc}/media#library`}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#0A192F]"
            >
              {c.watchNow}
              <Play className="h-4 w-4 fill-current" aria-hidden />
            </Link>
          </div>

          <div className="relative mx-auto min-w-0 aspect-[412/531] w-full max-w-[340px] self-end lg:mx-0 lg:aspect-auto lg:min-h-[560px] lg:max-w-none">
            <Image
              src="/images/media/listen-anywhere.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
