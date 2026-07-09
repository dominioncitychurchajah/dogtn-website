/* Pure scoring engine for the Leadership Assessment. */

import {
  questions,
  recommendationMatrix,
  type Band,
  type DimensionKey,
  type Placement,
  type Recommendation,
} from "@/data/assessment";

export type Answers = Record<string, number>;

/**
 * Normalise a single raw answer value to a 0-100 contribution.
 * - Likert: raw 1-5 (reverse-coded as 6 - value), mapped so 1 -> 0, 5 -> 100.
 * - Scenario: raw 1-4 (reverse-coded as 5 - value), mapped so 1 -> 0, 4 -> 100.
 */
function normalizeAnswer(
  value: number,
  type: "likert" | "scenario",
  reverse: boolean | undefined
): number {
  if (type === "scenario") {
    const v = reverse ? 5 - value : value;
    return ((v - 1) / 3) * 100;
  }
  // likert
  const v = reverse ? 6 - value : value;
  return ((v - 1) / 4) * 100;
}

/** Score a single dimension on a 0-100 scale from the provided answers. */
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
    sum += normalizeAnswer(raw, q.type, q.reverse);
    counted += 1;
  }
  if (counted === 0) return 0;
  return Math.round(sum / counted);
}

/** Derive the overall band from the per-dimension scores. */
export function overallBand(
  dimensionScores: Record<DimensionKey, number>
): Band {
  const values = Object.values(dimensionScores);
  const overall =
    values.length === 0
      ? 0
      : Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  return bandForScore(overall);
}

/** Map a 0-100 score to a band. */
export function bandForScore(score: number): Band {
  if (score <= 39) return "Emerging";
  if (score <= 64) return "Developing";
  if (score <= 84) return "Established";
  return "Advanced";
}

/** Look up the recommendation for a band + self-placement. */
export function getRecommendation(
  band: Band,
  placement: Placement
): Recommendation {
  return recommendationMatrix[band][placement];
}

export interface AssessmentResults {
  dimensionScores: Record<DimensionKey, number>;
  overall: number;
  band: Band;
  recommendation: Recommendation;
}

/** Compute the full results from raw answers and a self-placement value. */
export function computeResults(
  answers: Answers,
  placement: Placement
): AssessmentResults {
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

  const scoreValues = Object.values(dimensionScores);
  const overall =
    scoreValues.length === 0
      ? 0
      : Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);

  const band = bandForScore(overall);
  const recommendation = getRecommendation(band, placement);

  return { dimensionScores, overall, band, recommendation };
}
