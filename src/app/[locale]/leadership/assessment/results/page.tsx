"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  RotateCcw,
  Sparkles,
  FileText,
  Share2,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useQuizStore } from "@/lib/quiz-store";
import { computeResults } from "@/lib/assessment-engine";
import { dimensions, type Band, type Placement } from "@/data/assessment";
import { formatDate } from "@/lib/utils";

const VALID_PLACEMENTS: Placement[] = ["none", "basic-alum", "ministry-leader"];

function toPlacement(priorDli: string | undefined): Placement {
  if (priorDli && (VALID_PLACEMENTS as string[]).includes(priorDli)) {
    return priorDli as Placement;
  }
  return "none";
}

// Short display labels for the dimension bars (matches the results mockup).
const SHORT_LABEL: Record<string, string> = {
  character: "Character",
  vision: "Vision",
  competence: "Competence",
  influence: "Influence",
  kingdom: "Service",
};

// Band narratives framed as honour, not a grade.
const bandNarrative: Record<Band, { headline: string; body: string }> = {
  Emerging: {
    headline: "You're an Emerging Leader — and every great leader began here.",
    body: "You carry real hunger and potential. This is the season to lay deep foundations of character and purpose, and there is a clear path forward built for exactly this moment.",
  },
  Developing: {
    headline: "You're a Developing Leader — and that's exactly where DLI Basic begins.",
    body: "Your assessment indicates a strong foundational sense of responsibility and service. You possess the raw materials of institutional gravity, yet there is a significant opportunity to refine your strategic vision and core competencies to move from potential to proven global impact.",
  },
  Established: {
    headline: "You're an Established Leader — and there's a next tier waiting for you.",
    body: "You already carry weight and deliver results. The invitation now is to sharpen your strategy, governance, and influence so your impact multiplies through others.",
  },
  Advanced: {
    headline: "You're an Advanced Leader — called to build what outlasts you.",
    body: "Your formation places you among mature leaders. The horizon ahead is institutions, sectors, and nations — and a track designed to match that scale of calling.",
  },
};

export default function ResultsPage() {
  const params = useParams();
  const locale = (params?.locale as string | undefined) ?? "en";
  const loc = locale as Locale;
  const { toast } = useToast();

  const answers = useQuizStore((s) => s.answers);
  const placementStore = useQuizStore((s) => s.placement);
  const reset = useQuizStore((s) => s.reset);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const hasAnswers = mounted && Object.keys(answers).length > 0;

  const results = React.useMemo(() => {
    if (!hasAnswers) return null;
    const placement = toPlacement(placementStore["priorDli"]);
    return computeResults(answers, placement);
  }, [hasAnswers, answers, placementStore]);

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
              You haven&apos;t taken the assessment yet. It only takes about seven minutes and
              reveals your next leadership step.
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

  const { dimensionScores, band, recommendation } = results;
  const narrative = bandNarrative[band];
  const characterScore = dimensionScores.character;

  return (
    <>
      {/* Results + recommendation */}
      <Section surface="alt">
        <Container>
          {/* Honour narrative header */}
          <header className="max-w-4xl">
            <span className="mb-6 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              <span className="h-px w-12 bg-gold-600" aria-hidden />
              Leadership Assessment Results
            </span>
            <h1 className="text-display-l leading-tight text-ink-900">{narrative.headline}</h1>
            <p className="mt-8 max-w-2xl text-body-l leading-relaxed text-ink-500">{narrative.body}</p>
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

            {/* Recommendation + resume journey */}
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
                    Recommended Next Step
                  </span>
                  <h3 className="text-heading-2 text-paper-0">{recommendation.title}</h3>
                  <p className="mt-4 text-body-m leading-relaxed text-ink-300">{recommendation.body}</p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-body-s">
                      <CalendarDays className="h-5 w-5 text-gold-400" aria-hidden />
                      <span>Next cohort: {formatDate(recommendation.cohortDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-body-s">
                      <Clock className="h-5 w-5 text-gold-400" aria-hidden />
                      <span>Saturdays, 9:00 AM — 12:00 PM</span>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-4">
                    <Button
                      href={`/${loc}${recommendation.cta.href}`}
                      size="l"
                      className="w-full uppercase tracking-widest"
                    >
                      {recommendation.cta.label}
                      <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
                    </Button>
                    <Button
                      href={`/${loc}/leadership`}
                      size="l"
                      variant="secondary"
                      className="w-full border-paper-0/30 bg-transparent uppercase tracking-widest text-paper-0 hover:bg-paper-0/5"
                    >
                      View Syllabus
                    </Button>
                  </div>
                </div>
              </div>

              {/* Resume journey */}
              <Link
                href={`/${loc}/journeys/grow-spiritually`}
                className="group flex items-center justify-between rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 transition-colors hover:border-gold-600/40"
              >
                <div>
                  <span className="mb-2 block text-caption font-semibold uppercase tracking-wider text-ink-500">
                    Resume Journey
                  </span>
                  <h4 className="text-heading-3 text-ink-900">Spiritual Maturity Assessment</h4>
                </div>
                <ChevronRight className="h-6 w-6 shrink-0 text-gold-hover transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
              </Link>

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
                The &ldquo;{band} Leader&rdquo; phase is a critical inflection point in the DOGTN
                ecosystem. It is where raw talent is forged into institutional authority through the
                acquisition of the Three Pillars: Visionary Clarity, Tactical Competence, and Ethical
                Fortitude.
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
