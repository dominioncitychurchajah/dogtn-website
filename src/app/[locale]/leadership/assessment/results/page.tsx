"use client";

import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  RotateCcw,
  Sparkles,
  FileText,
  Share2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useQuizStore } from "@/lib/quiz-store";
import { computeResults } from "@/lib/assessment-engine";
import { dimensions } from "@/data/assessment";
import { getTrack, gleLabel } from "@/data/mentorship";
import { formatDate } from "@/lib/utils";

// Short display labels for the dimension bars.
const SHORT_LABEL: Record<string, string> = {
  character: "Character",
  vision: "Vision",
  competence: "Competence",
  influence: "Influence",
  kingdom: "Service",
};

export default function ResultsPage() {
  const params = useParams();
  const locale = (params?.locale as string | undefined) ?? "en";
  const loc = locale as Locale;
  const { toast } = useToast();

  const answers = useQuizStore((s) => s.answers);
  const reset = useQuizStore((s) => s.reset);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const hasAnswers = mounted && Object.keys(answers).length > 0;

  const results = React.useMemo(() => {
    if (!hasAnswers) return null;
    return computeResults(answers);
  }, [hasAnswers, answers]);

  if (!mounted) {
    return (
      <Section surface="alt">
        <Container>
          <div className="mx-auto h-40 max-w-3xl" aria-hidden />
        </Container>
      </Section>
    );
  }

  if (!results) {
    return (
      <Section surface="alt">
        <Container>
          <div className="mx-auto max-w-lg rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-10 text-center shadow-elev-1">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-600/10 text-gold-hover">
              <Sparkles className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="text-heading-1 text-ink-900">No results just yet</h1>
            <p className="mt-3 text-body-m text-ink-500">
              You haven&apos;t taken the assessment yet. Ten quick questions reveal which
              Global Leadership Executive track fits where you are right now.
            </p>
            <Button href={`/${loc}/leadership/assessment`} size="l" className="mt-8">
              Start the Assessment
              <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  const { dimensionScores, result } = results;
  const characterScore = dimensionScores.character;
  const track = getTrack(result.trackSlug);
  const trackLabel = track ? gleLabel(track) : `Global Leadership Executive ${result.level}`;

  return (
    <>
      {/* Results + recommended track */}
      <Section surface="alt">
        <Container>
          {/* Honour narrative header */}
          <header className="max-w-4xl">
            <span className="mb-6 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              <span className="h-px w-12 bg-gold-600" aria-hidden />
              Leadership Assessment Results
            </span>
            <h1 className="text-display-l leading-tight text-ink-900">{result.headline}</h1>
            <p className="mt-8 max-w-2xl text-body-l leading-relaxed text-ink-500">{result.body}</p>
          </header>

          <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Core dimensions */}
            <section className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1 md:p-12 lg:col-span-7">
              <div className="mb-10 flex items-end justify-between">
                <h2 className="text-heading-2 text-ink-900">Core Dimensions</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => toast("Your results PDF is being prepared", "info")}
                    className="flex items-center gap-2 text-body-s font-semibold text-ink-500 transition-colors hover:text-ink-900"
                  >
                    <FileText className="h-5 w-5" aria-hidden /> PDF
                  </button>
                  <button
                    onClick={() => toast("Shareable link copied", "success")}
                    className="flex items-center gap-2 text-body-s font-semibold text-ink-500 transition-colors hover:text-ink-900"
                  >
                    <Share2 className="h-5 w-5" aria-hidden /> Share
                  </button>
                </div>
              </div>

              <div className="space-y-9">
                {dimensions.map((d) => {
                  const score = dimensionScores[d.key];
                  return (
                    <div key={d.key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-label-md font-semibold uppercase tracking-wider text-ink-500">
                          {SHORT_LABEL[d.key] ?? d.label}
                        </span>
                        <span className="text-body-m font-bold text-ink-900">{score}%</span>
                      </div>
                      <div
                        className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100"
                        role="progressbar"
                        aria-valuenow={score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${d.label}: ${score} percent`}
                      >
                        <div className="h-full rounded-full bg-gold-600" style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Recommended track */}
            <aside className="space-y-6 lg:col-span-5">
              {/* Gravity card */}
              <div className="relative overflow-hidden rounded-[var(--radius-l)] bg-ink-900 p-8 text-paper-0 shadow-elev-3 md:p-10">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold-600/20 blur-3xl"
                  aria-hidden
                />
                <div className="relative">
                  <span className="mb-8 flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-flame-600" aria-hidden />
                    Your Recommended Track
                  </span>
                  <p className="text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
                    {trackLabel}
                  </p>
                  <h3 className="mt-2 text-heading-2 text-paper-0">{track?.name ?? trackLabel}</h3>
                  <p className="mt-4 text-body-m leading-relaxed text-ink-300">{result.why}</p>

                  <div className="mt-8 rounded-[var(--radius-m)] border border-paper-0/15 bg-paper-0/5 p-5">
                    <span className="mb-2 block text-caption font-semibold uppercase tracking-wider text-gold-400">
                      Your next step
                    </span>
                    <p className="text-body-s leading-relaxed text-paper-0">{result.nextStep}</p>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-body-s">
                      <CalendarDays className="h-5 w-5 text-gold-400" aria-hidden />
                      <span>Next cohort: {formatDate(result.cohortDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-body-s">
                      <Clock className="h-5 w-5 text-gold-400" aria-hidden />
                      <span>Saturdays, 9:00 AM — 12:00 PM</span>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-4">
                    {/* Primary: routes dynamically to the recommended GLE track. */}
                    <Button
                      href={`/${loc}/mentorship/${result.trackSlug}`}
                      size="l"
                      className="w-full whitespace-normal h-auto min-h-14 px-6 py-4 text-center text-body-m leading-snug uppercase tracking-wider"
                    >
                      Explore Global Leadership Executive Track
                      <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
                    </Button>
                    {/* Secondary: the Dominion Leadership Institute page. */}
                    <Button
                      href={`/${loc}/institutions/dli`}
                      size="l"
                      variant="secondary"
                      className="w-full whitespace-normal h-auto min-h-14 px-6 py-4 text-center text-body-m leading-snug uppercase tracking-wider border-paper-0/30 bg-transparent text-paper-0 hover:bg-paper-0/5"
                    >
                      Explore the Dominion Leadership Institute
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button variant="ghost" size="s" onClick={() => reset()}>
                  <RotateCcw className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                  Retake the assessment
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Detailed analysis */}
      <Section surface="dark">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="relative aspect-video">
              <div
                className="pointer-events-none absolute -inset-6 -z-10 border-[16px] border-gold-600/10"
                aria-hidden
              />
              <Image
                src="/images/pastor/sermon-blue-backdrop.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-heading-1 text-paper-0">Unlocking Your Leadership Signature</h2>
              <p className="mt-6 text-body-l leading-relaxed text-ink-300">
                {trackLabel} is a deliberate inflection point in the DOGTN ecosystem. It is where
                raw talent is forged into institutional authority through the acquisition of the
                Three Pillars: Visionary Clarity, Tactical Competence, and Ethical Fortitude.
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  <div>
                    <h5 className="font-semibold text-paper-0">Character-First Foundation</h5>
                    <p className="mt-1 text-body-s text-ink-300">
                      Maintain your {characterScore}% character score by engaging in the monthly
                      Mentorship Circle.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  <div>
                    <h5 className="font-semibold text-paper-0">Competence Acceleration</h5>
                    <p className="mt-1 text-body-s text-ink-300">
                      Targeted workshops in project management and strategic communication are
                      recommended.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
