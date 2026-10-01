"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Radio } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { events } from "@/data/events";

/** Where the conference streams. /live opens whatever is live on the channel. */
export const LIVE_URL = "https://www.youtube.com/@DominionCity/live";
const REPLAYS_URL = "https://www.youtube.com/@DominionCity/streams";
const REGISTER_URL = events.find((e) => e.slug === "next-level-conference")?.registrationUrl;

/** YouTube's own red and the filled play logo, so the button reads as YouTube at a glance. */
const YT_BUTTON = "bg-[#FF0000] text-white hover:bg-[#CC0000]";
function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden>
      <rect width="28" height="20" rx="5" fill="#fff" />
      <path d="M11 5.5v9l8-4.5z" fill="#FF0000" />
    </svg>
  );
}

// Next Level 2026 sessions (UTC; Lagos is UTC+1). day 0 = Wednesday men's session.
const SESSIONS: { start: string; day: number; part: "morning" | "evening" }[] = [
  { start: "2026-09-30T07:00:00Z", day: 0, part: "morning" },
  { start: "2026-09-30T16:00:00Z", day: 0, part: "evening" },
  { start: "2026-10-01T16:00:00Z", day: 1, part: "evening" }, // opening session
  { start: "2026-10-02T07:00:00Z", day: 2, part: "morning" },
  { start: "2026-10-02T16:00:00Z", day: 2, part: "evening" },
  { start: "2026-10-03T07:00:00Z", day: 3, part: "morning" },
  { start: "2026-10-03T16:00:00Z", day: 3, part: "evening" },
  { start: "2026-10-04T07:00:00Z", day: 4, part: "morning" },
  { start: "2026-10-04T16:00:00Z", day: 4, part: "evening" },
];
// ponytail: a session counts as "live" from 10 min before to 3 h after its start;
// adjust if sessions run longer.
const LIVE_BEFORE = 10 * 60_000;
const LIVE_AFTER = 3 * 3_600_000;
const times = SESSIONS.map((x) => Date.parse(x.start));

type Phase =
  | { kind: "before" | "between"; target: number; session: (typeof SESSIONS)[number] }
  | { kind: "live"; session: (typeof SESSIONS)[number] }
  | { kind: "after" };

function phaseAt(now: number): Phase {
  const live = SESSIONS.findIndex((_, i) => now >= times[i] - LIVE_BEFORE && now < times[i] + LIVE_AFTER);
  if (live >= 0) return { kind: "live", session: SESSIONS[live] };
  const next = times.findIndex((t) => t > now);
  if (next < 0) return { kind: "after" };
  return { kind: next === 0 ? "before" : "between", target: times[next], session: SESSIONS[next] };
}

function split(ms: number) {
  const diff = Math.max(0, ms);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    mins: Math.floor((diff / 60_000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function NextGathering({ copy, locale }: { copy: HomeCopy["nextGathering"]; locale: Locale }) {
  // Start at null so SSR and first client render match (renders the plain
  // countdown at "00"); the interval fills in the real state after mount.
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const phase: Phase | null = now === null ? null : phaseAt(now);
  const t = phase && "target" in phase ? split(phase.target - now!) : null;
  const sessionLabel = (x: (typeof SESSIONS)[number]) =>
    x.day === 0
      ? copy.mensSession
      : `${copy.dayOf.replace("{n}", String(x.day))} · ${x.part === "morning" ? copy.morning : copy.evening}`;
  const watching = phase && phase.kind !== "before" && phase.kind !== "after";

  return (
    <section className="relative z-30 -mt-16 pb-6 sm:pb-8 lg:-mt-24 lg:pb-10">
      <Container>
        <div className="flex flex-col gap-12 overflow-hidden rounded-[2rem] border border-paper-0/10 bg-ink-900 p-10 shadow-elev-4 backdrop-blur-md lg:flex-row lg:gap-16 lg:p-16">
          {/* Countdown */}
          <div className="flex-1">
            {phase?.kind === "live" && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-3 py-1 text-caption font-bold uppercase tracking-[0.2em] text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden /> {copy.liveNow}
              </span>
            )}
            {phase?.kind === "between" && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-600/15 px-3 py-1 text-caption font-bold uppercase tracking-[0.2em] text-gold-600">
                {copy.happeningNow}
              </span>
            )}
            <h2 className="font-display text-heading-2 tracking-tight text-paper-0 lg:text-heading-1">
              {copy.titlePre}
              <span className="text-gold-600">{copy.titleAccent}</span>
              {copy.titlePost}
            </h2>
            <p className="mt-3 text-body-l text-ink-300">
              {phase?.kind === "live"
                ? sessionLabel(phase.session)
                : phase?.kind === "after"
                  ? copy.endedBody
                  : phase?.kind === "between"
                    ? `${copy.nextSession}: ${sessionLabel(phase.session)}`
                    : copy.subtitle}
            </p>

            {phase?.kind === "live" || phase?.kind === "after" ? (
              <a
                href={phase.kind === "live" ? LIVE_URL : REPLAYS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-[var(--radius-m)] px-8 text-body-l font-semibold",
                  YT_BUTTON,
                )}
              >
                <YouTubeLogo className="h-6 w-8" />
                {phase.kind === "live" ? copy.watchLive : copy.watchReplays}
              </a>
            ) : (
              <div className="mt-10 flex items-start gap-6 lg:gap-10">
                {[
                  { label: copy.days, value: t?.days ?? 0 },
                  { label: copy.hours, value: t?.hours ?? 0 },
                  { label: copy.mins, value: t?.mins ?? 0 },
                  { label: copy.secs, value: t?.secs ?? 0 },
                ].map((u, i) => (
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
            )}
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
                href={watching ? LIVE_URL : `/${locale}/media`}
                {...(watching ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-m)] px-5 text-body-m font-semibold",
                  watching ? YT_BUTTON : "bg-gold-600 text-ink-900 hover:bg-gold-hover",
                )}
              >
                {watching ? <YouTubeLogo className="h-5 w-7" /> : <Radio className="h-4 w-4" aria-hidden />}
                {watching ? copy.watchOnYoutube : copy.watchOnline}
              </a>
              {/* Our own registration; hidden once the conference is over. */}
              {phase?.kind !== "after" && <Link
                href={REGISTER_URL ?? `/${locale}/register`}
                {...(REGISTER_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-m)] border border-paper-0/15 px-5 text-body-m font-semibold text-paper-0 hover:bg-paper-0/10"
              >
                {copy.planVisit}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
