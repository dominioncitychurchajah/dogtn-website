"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { useQuizStore } from "@/lib/quiz-store";
import { questions } from "@/data/assessment";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";

// The flow is exactly the 10 assessment questions — nothing else is presented.
const TOTAL = questions.length;

export function QuizEngine({ locale }: { locale: Locale }) {
  const router = useRouter();
  const currentIndex = useQuizStore((s) => s.currentIndex);
  const answers = useQuizStore((s) => s.answers);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const next = useQuizStore((s) => s.next);
  const prev = useQuizStore((s) => s.prev);

  // Avoid hydration mismatch: only trust persisted store after mount.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const advanceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  // Clamp index into range.
  const idx = Math.min(Math.max(0, currentIndex), TOTAL - 1);
  const isLast = idx === TOTAL - 1;

  function goNext() {
    if (isLast) {
      router.push(`/${locale}/leadership/assessment/email-gate`);
      return;
    }
    next();
  }

  function scheduleAdvance() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(goNext, 250);
  }

  function selectQuestion(qid: string, value: number) {
    setAnswer(qid, value);
    scheduleAdvance();
  }

  // Build the current view model.
  const q = questions[idx];
  const topic = dimensionLabel(q.dimension);
  const prompt = q.prompt;
  const options: { label: string; value: number }[] = q.options;
  const selected: number | undefined = answers[q.id];
  const onSelect = (v: number) => selectQuestion(q.id, v);
  const legendId = `q-${q.id}`;

  const answered = idx + 1;
  const pct = Math.round((answered / TOTAL) * 100);
  const progressText = `Question ${answered} of ${TOTAL}, ${pct}% complete`;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2 flex items-end justify-between">
          <p className="text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
            {mounted ? topic : " "}
          </p>
          <p aria-live="polite" className="text-body-s font-semibold text-ink-500">
            {mounted ? progressText : " "}
          </p>
        </div>
        <ProgressBar
          value={mounted ? answered : 0}
          max={TOTAL}
          label={progressText}
        />
      </div>

      {/* Question card */}
      <fieldset className="rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 p-6 shadow-elev-1 sm:p-10">
        <legend
          id={legendId}
          className="mb-8 block text-heading-2 leading-tight text-ink-900"
        >
          {prompt}
        </legend>

        <div role="radiogroup" aria-labelledby={legendId} className="grid gap-3">
          {options.map((opt, i) => {
            const isSelected = mounted && selected === opt.value;
            return (
              <label
                key={String(opt.value)}
                className={
                  "group relative flex cursor-pointer items-center justify-between gap-4 rounded-[var(--radius-l)] border px-5 py-4 transition-all " +
                  (isSelected
                    ? "border-gold-600 bg-gold-600/5 shadow-elev-1"
                    : "border-ink-100 bg-paper-0 hover:border-gold-400")
                }
              >
                <span className="flex items-center gap-4">
                  <span
                    className={
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-body-s font-semibold transition-colors " +
                      (isSelected
                        ? "border-gold-600 bg-gold-600 text-ink-900"
                        : "border-ink-100 text-ink-500 group-hover:border-gold-400")
                    }
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span
                    className={
                      "text-body-m " +
                      (isSelected
                        ? "font-semibold text-ink-900"
                        : "text-ink-700")
                    }
                  >
                    {opt.label}
                  </span>
                </span>
                <input
                  type="radio"
                  name={legendId}
                  value={String(opt.value)}
                  checked={isSelected}
                  onChange={() => onSelect(opt.value)}
                  className="sr-only"
                />
                <Check
                  className={
                    "h-5 w-5 shrink-0 text-gold-600 transition-opacity " +
                    (isSelected ? "opacity-100" : "opacity-0")
                  }
                  aria-hidden
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="secondary"
          onClick={prev}
          disabled={idx === 0}
          size="m"
        >
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" aria-hidden />
          Back
        </Button>
        <Button
          onClick={goNext}
          disabled={mounted && selected === undefined}
          size="m"
        >
          {isLast ? "See my results" : "Continue"}
          <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function dimensionLabel(key: string): string {
  switch (key) {
    case "character":
      return "Character & Integrity";
    case "vision":
      return "Vision & Purpose";
    case "competence":
      return "Competence & Capacity";
    case "influence":
      return "Influence & Relationships";
    case "kingdom":
      return "Kingdom Orientation";
    default:
      return "Leadership";
  }
}

export default QuizEngine;
