/* Pure scoring engine for the Leadership Assessment.
 *
 * Ten four-option questions, each ascending 1 → 4 in scope of leadership
 * responsibility. The mean across all ten places the visitor on one of the
 * three Global Leadership Executive levels. Per-dimension scores are kept for
 * the results readout, but the level is driven by the whole set — every
 * question moves it.
 */

import {
  questions,
  levels,
  type DimensionKey,
  type LevelKey,
  type LevelResult,
} from "@/data/assessment";

export type Answers = Record<string, number>;

/** Map a raw 1–4 answer to a 0–100 contribution. */
function normalizeAnswer(value: number): number {
  const clamped = Math.min(4, Math.max(1, value));
  return ((clamped - 1) / 3) * 100;
}

/** Score a single dimension on a 0–100 scale from the provided answers. */
export function scoreDimension(
  answers: Answers,
  dimensionKey: DimensionKey
): number {
  const items = questions.filter((q) => q.dimension === dimensionKey);
  if (items.length === 0) return 0;

  let sum = 0;
  let counted = 0;
  for (const q of items) {
    const raw = answers[q.id];
    if (raw == null || Number.isNaN(raw)) continue;
    sum += normalizeAnswer(raw);
    counted += 1;
  }
  if (counted === 0) return 0;
  return Math.round(sum / counted);
}

/**
 * Map an overall 0–100 score to a Global Leadership Executive level.
 * Thresholds split the scale into three roughly equal spans, nudged so that a
 * leader who answers mostly "carries responsibility for others" lands on 2.
 */
export function levelForScore(score: number): LevelKey {
  if (score <= 40) return 1;
  if (score <= 72) return 2;
  return 3;
}

export function getLevel(level: LevelKey): LevelResult {
  return levels[level];
}

export interface AssessmentResults {
  dimensionScores: Record<DimensionKey, number>;
  overall: number;
  level: LevelKey;
  result: LevelResult;
  /** How many of the 10 questions were actually answered. */
  answered: number;
}

/** Compute the full results from raw answers. */
export function computeResults(answers: Answers): AssessmentResults {
  const keys: DimensionKey[] = [
    "character",
    "vision",
    "competence",
    "influence",
    "kingdom",
  ];

  const dimensionScores = keys.reduce(
    (acc, key) => {
      acc[key] = scoreDimension(answers, key);
      return acc;
    },
    {} as Record<DimensionKey, number>
  );

  // Overall is the mean across answered questions, not the mean of dimension
  // means, so a partially answered dimension cannot skew the level.
  let sum = 0;
  let answered = 0;
  for (const q of questions) {
    const raw = answers[q.id];
    if (raw == null || Number.isNaN(raw)) continue;
    sum += normalizeAnswer(raw);
    answered += 1;
  }
  const overall = answered === 0 ? 0 : Math.round(sum / answered);

  const level = levelForScore(overall);

  return { dimensionScores, overall, level, result: levels[level], answered };
}
