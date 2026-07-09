"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomeCopy } from "@/i18n/pages/home";
import { Section, Container, SectionHeading } from "@/components/layout/Section";
import { TestimonyCard } from "@/components/cards/TestimonyCard";
import { testimonies } from "@/data/testimonies";
import { cn } from "@/lib/utils";

export function TestimonyCarousel({ copy }: { copy: HomeCopy["testimonies"] }) {
  const [index, setIndex] = React.useState(0);
  const count = testimonies.length;

  const go = React.useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  return (
    <Section surface="paper">
      <Container>
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />

        <div className="mx-auto max-w-3xl">
          <div className="rounded-[var(--radius-xl)] border border-ink-100 bg-paper-50 p-8 shadow-elev-1 sm:p-12">
            <TestimonyCard testimony={testimonies[index]} />
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={copy.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 bg-paper-0 text-ink-700 transition-colors hover:bg-paper-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>

            <div className="flex items-center gap-2">
              {testimonies.map((t, i) => (
                <button
                  key={t.id}
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 bg-paper-0 text-ink-700 transition-colors hover:bg-paper-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
