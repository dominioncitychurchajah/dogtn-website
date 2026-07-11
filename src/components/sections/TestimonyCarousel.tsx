"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { HomeCopy } from "@/i18n/pages/home";
import { Section, Container, SectionHeading } from "@/components/layout/Section";
import { testimonies } from "@/data/testimonies";
import { cn } from "@/lib/utils";

/** Split testimonial: full-bleed photo on one side, overlapping quote card on
 *  the other, with outlined pill arrows and dot indicators inside the card. */
export function TestimonyCarousel({ copy }: { copy: HomeCopy["testimonies"] }) {
  const [index, setIndex] = React.useState(0);
  const count = testimonies.length;
  const t = testimonies[index];

  const go = React.useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  return (
    <Section surface="dark" id="testimonies">
      <Container>
        <SectionHeading
          align="center"
          dark
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />

        <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
          {/* Photo — full height on desktop, banner on mobile */}
          <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:end-0 lg:h-auto lg:w-[58%]">
            <Image
              key={t.id}
              src={t.portrait}
              alt={t.name}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="animate-fade-up object-cover"
            />
            {/* Blend the photo into the ink frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-ink-900/0 lg:bg-gradient-to-r lg:from-ink-900/50 lg:via-ink-900/0 lg:to-ink-900/0" aria-hidden />
          </div>

          {/* Quote card — overlaps the photo edge */}
          <div className="relative z-10 mx-4 -mt-20 pb-2 sm:mx-8 lg:mx-0 lg:my-14 lg:ms-6 lg:w-[46%] lg:pb-0 xl:ms-12">
            <figure
              key={t.id}
              className="animate-fade-up rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 p-6 shadow-elev-4 sm:p-10"
            >
              <figcaption className="flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-600/30">
                  <Image src={t.portrait} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span>
                  <span className="block text-heading-3 text-ink-900">{t.name}</span>
                  <span className="mt-0.5 block text-body-s text-ink-500">
                    {t.role} · {t.stage}
                  </span>
                </span>
              </figcaption>

              <blockquote className="mt-6 text-body-l leading-relaxed text-ink-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label={copy.prev}
                  className="flex h-11 w-16 shrink-0 items-center justify-center rounded-full border border-gold-600 text-gold-hover transition-colors hover:bg-gold-600/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
                >
                  <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
                </button>

                <div className="flex items-center gap-2">
                  {testimonies.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Go to testimony ${i + 1}`}
                      aria-current={i === index}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        i === index ? "w-6 bg-gold-600" : "w-2.5 bg-ink-100 hover:bg-ink-300",
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label={copy.next}
                  className="flex h-11 w-16 shrink-0 items-center justify-center rounded-full border border-gold-600 text-gold-hover transition-colors hover:bg-gold-600/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
                >
                  <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                </button>
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </Section>
  );
}
