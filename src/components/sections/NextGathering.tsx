"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Radio } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";

/** Milliseconds until the next Sunday 08:00 (local time). */
function timeToNextGathering() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(8, 0, 0, 0);
  let daysUntil = (7 - now.getDay()) % 7; // 0 = Sunday
  if (daysUntil === 0 && now.getTime() >= target.getTime()) daysUntil = 7;
  target.setDate(now.getDate() + daysUntil);

  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    mins: Math.floor((diff / 60_000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function NextGathering({ copy, locale }: { copy: HomeCopy["nextGathering"]; locale: Locale }) {
  // Start at null so SSR and first client render match (renders "00"); the
  // interval fills in real values after mount.
  const [t, setT] = React.useState<ReturnType<typeof timeToNextGathering> | null>(null);

  React.useEffect(() => {
    const tick = () => setT(timeToNextGathering());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: copy.days, value: t?.days ?? 0 },
    { label: copy.hours, value: t?.hours ?? 0 },
    { label: copy.mins, value: t?.mins ?? 0 },
    { label: copy.secs, value: t?.secs ?? 0 },
  ];

  return (
    <section className="relative z-30 -mt-16 lg:-mt-24">
      <Container>
        <div className="flex flex-col gap-12 overflow-hidden rounded-[2rem] border border-paper-0/10 bg-ink-900 p-10 shadow-elev-4 backdrop-blur-md lg:flex-row lg:gap-16 lg:p-16">
          {/* Countdown */}
          <div className="flex-1">
            <h2 className="font-display text-heading-2 tracking-tight text-paper-0 lg:text-heading-1">
              {copy.titlePre}
              <span className="text-gold-600">{copy.titleAccent}</span>
              {copy.titlePost}
            </h2>
            <p className="mt-3 text-body-l text-ink-300">{copy.subtitle}</p>
            <div className="mt-10 flex items-start gap-6 lg:gap-10">
              {units.map((u, i) => (
                <React.Fragment key={u.label}>
                  {i > 0 && (
                    <span className="mt-2 text-4xl font-light text-paper-0/20" aria-hidden>
                      :
                    </span>
                  )}
                  <div className="text-center" suppressHydrationWarning>
                    <span className="block font-display text-5xl font-medium text-paper-0 lg:text-7xl">
                      {pad(u.value)}
                    </span>
                    <span className="mt-2 block text-caption font-bold uppercase tracking-[0.2em] text-gold-600">
                      {u.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Location & details */}
          <div className="flex w-full flex-col justify-center border-t border-paper-0/10 pt-10 lg:w-[380px] lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <div className="mb-8 flex items-start gap-4">
              <MapPin className="mt-0.5 h-7 w-7 shrink-0 text-gold-600" aria-hidden />
              <div>
                <h3 className="font-display text-heading-3 text-paper-0">{copy.auditorium}</h3>
                <p className="mt-2 text-body-m leading-relaxed text-ink-300">{copy.address}</p>
              </div>
            </div>
            <dl className="space-y-4 border-t border-paper-0/5 pt-6">
              <div className="flex items-center justify-between">
                <dt className="text-caption uppercase tracking-widest text-ink-300">{copy.phoneSupport}</dt>
                <dd className="text-body-m font-medium text-paper-0">
                  <a href="mailto:support@davidogbueli.org" className="hover:text-gold-400">
                    {copy.emailSupport}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-caption uppercase tracking-widest text-ink-300">{copy.parking}</dt>
                <dd className="text-body-m font-medium text-gold-600">{copy.parkingValue}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={`/${locale}/media`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-5 text-body-m font-semibold text-ink-900 hover:bg-gold-hover"
              >
                <Radio className="h-4 w-4" aria-hidden />
                {copy.watchOnline}
              </a>
              <Link
                href="https://dcglobal-gules.vercel.app/en/events"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-m)] border border-paper-0/15 px-5 text-body-m font-semibold text-paper-0 hover:bg-paper-0/10"
              >
                {copy.planVisit}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
