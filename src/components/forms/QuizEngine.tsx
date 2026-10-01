"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { useQuizStore } from "@/lib/quiz-store";
import { questions } from "@/data/assessment";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
  // false on the server and during hydration, true afterwards.
  const mounted = React.useSyncExternalStore(noop, () => true, () => false);

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
      router.push(`/${locale}/leadership/assessment/results`);
      return;
    }
    next();
  }

  function scheduleAdvance() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    // Long enough to see the choice land, short enough to keep momentum.
    advanceTimer.current = setTimeout(goNext, 450);
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

  // Progress = questions actually answered, not the one on screen.
  const answeredCount = mounted ? questions.filter((qq) => answers[qq.id] !== undefined).length : 0;
  const progressText = `Question ${idx + 1} of ${TOTAL}`;

  // Keyboard: 1–4 pick an answer, Enter continues.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" && (e.target as HTMLInputElement).type !== "radio") return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= options.length) {
        e.preventDefault();
        onSelect(options[n - 1].value);
      } else if (e.key === "Enter" && selected !== undefined && tag !== "BUTTON") {
        e.preventDefault();
        goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress: one segment per question; filled = answered, ringed = on screen */}
      <div className="mb-8">
        <div className="mb-3 flex items-end justify-between gap-4">
          <p className="text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
            {mounted ? topic : "\u00a0"}
          </p>
          <p aria-live="polite" className="shrink-0 text-body-s font-semibold tabular-nums text-ink-500">
            {mounted ? progressText : "\u00a0"}
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={answeredCount}
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-label={`${answeredCount} of ${TOTAL} questions answered`}
          className="flex gap-1.5"
        >
          {questions.map((qq, i) => {
            const done = mounted && answers[qq.id] !== undefined;
            return (
              <span
                key={qq.id}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  done ? "bg-gold-600" : "bg-ink-100",
                  mounted && i === idx && "ring-2 ring-gold-600/40 ring-offset-2 ring-offset-paper-50",
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Question card. The legend is floated so it sits inside the card instead
          of cutting through the fieldset's top border (the browser default). */}
      <fieldset
        key={q.id}
        className="animate-fade-up rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 p-5 shadow-elev-1 sm:p-10"
      >
        <legend
          id={legendId}
          className="float-left mb-6 w-full font-display text-heading-3 leading-snug text-ink-900 sm:mb-8 sm:text-heading-2"
        >
          {prompt}
        </legend>

        <div role="radiogroup" aria-labelledby={legendId} className="clear-left grid gap-3">
          {options.map((opt, i) => {
            const isSelected = mounted && selected === opt.value;
            return (
              <label
                key={String(opt.value)}
                className={cn(
                  "group relative flex min-h-[64px] cursor-pointer items-center gap-4 rounded-[var(--radius-l)] border-2 px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 sm:px-5",
                  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-600",
                  isSelected
                    ? "border-gold-600 bg-gold-600/10 shadow-elev-1"
                    : "border-ink-100 bg-paper-0 hover:border-gold-600/50 hover:bg-paper-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-body-s font-bold tabular-nums transition-colors",
                    isSelected
                      ? "border-gold-600 bg-gold-600 text-ink-900"
                      : "border-ink-100 text-ink-500 group-hover:border-gold-600/50 group-hover:text-ink-700",
                  )}
                  aria-hidden
                >
                  {isSelected ? <Check className="h-4.5 w-4.5" strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn("flex-1 text-body-m leading-snug", isSelected ? "font-semibold text-ink-900" : "text-ink-700")}>
                  {opt.label}
                </span>
                <input
                  type="radio"
                  name={legendId}
                  value={String(opt.value)}
                  checked={isSelected}
                  onChange={() => onSelect(opt.value)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
        <p className="mt-5 hidden text-caption text-ink-500 sm:block">
          Tip: press 1–{options.length} to choose{selected !== undefined ? ", Enter to continue" : ""}.
        </p>
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
        {mounted && selected === undefined && (
          <p className="hidden flex-1 text-end text-body-s text-ink-500 sm:block">Choose an answer to continue</p>
        )}
        <Button
          onClick={goNext}
          disabled={mounted && selected === undefined}
          size="m"
          className="disabled:cursor-not-allowed"
        >
          {isLast ? "See my results" : "Continue"}
          <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

const noop = () => () => {};

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
