/* Leadership Assessment specification.
 *
 * Purpose: place a visitor on one of the three Global Leadership Executive
 * mentorship levels. Exactly 10 questions, each a four-option choice where the
 * options ascend in scope of leadership responsibility — so every answer moves
 * the recommendation, and the scale itself is what determines the level.
 *
 * Tracks live in `@/data/mentorship`; this module only names the slug so the
 * result CTA can route to the recommended track.
 */

export type DimensionKey =
  | "character"
  | "vision"
  | "competence"
  | "influence"
  | "kingdom";

export const dimensions: { key: DimensionKey; label: string }[] = [
  { key: "character", label: "Character & Integrity" },
  { key: "vision", label: "Vision & Purpose Clarity" },
  { key: "competence", label: "Competence & Capacity" },
  { key: "influence", label: "Influence & Relationships" },
  { key: "kingdom", label: "Kingdom/Service Orientation" },
];

export interface AssessmentQuestion {
  id: string;
  dimension: DimensionKey;
  prompt: string;
  /** Four options, ascending 1 → 4 in scope of leadership responsibility. */
  options: { label: string; value: 1 | 2 | 3 | 4 }[];
}

/** Exactly 10 questions — two per dimension. */
export const questions: AssessmentQuestion[] = [
  // Character & Integrity
  {
    id: "char-1",
    dimension: "character",
    prompt: "How is your character currently tested?",
    options: [
      { label: "Mostly in private decisions no one else sees.", value: 1 },
      { label: "In keeping commitments to the people close to me.", value: 2 },
      { label: "In decisions where others carry the cost of my integrity.", value: 3 },
      { label: "In decisions that set the ethical standard for an institution.", value: 4 },
    ],
  },
  {
    id: "char-2",
    dimension: "character",
    prompt: "Who holds you accountable today?",
    options: [
      { label: "No one formally — I am still building that.", value: 1 },
      { label: "A mentor or leader I report to informally.", value: 2 },
      { label: "A team and an overseer who both depend on me.", value: 3 },
      { label: "A board or peer body of senior leaders.", value: 4 },
    ],
  },

  // Vision & Purpose Clarity
  {
    id: "vis-1",
    dimension: "vision",
    prompt: "How clear is your sense of assignment?",
    options: [
      { label: "I am still searching for what I am called to.", value: 1 },
      { label: "I know the direction, but not yet the shape of it.", value: 2 },
      { label: "I can state it clearly and I am actively building it.", value: 3 },
      { label: "It is established, and I am now planning what outlasts me.", value: 4 },
    ],
  },
  {
    id: "vis-2",
    dimension: "vision",
    prompt: "How far ahead do you actively plan?",
    options: [
      { label: "Week to week, as things come.", value: 1 },
      { label: "Across the current season or year.", value: 2 },
      { label: "Across a three-to-five year horizon for my team or work.", value: 3 },
      { label: "In generational terms — succession and legacy.", value: 4 },
    ],
  },

  // Competence & Capacity
  {
    id: "comp-1",
    dimension: "competence",
    prompt: "What scale of responsibility do you carry right now?",
    options: [
      { label: "My own work and development.", value: 1 },
      { label: "A project, or a few people, some of the time.", value: 2 },
      { label: "A team, department, or congregation I am accountable for.", value: 3 },
      { label: "An organisation, or several leaders who each lead others.", value: 4 },
    ],
  },
  {
    id: "comp-2",
    dimension: "competence",
    prompt: "When something stretches beyond your current skill, what usually happens?",
    options: [
      { label: "I hesitate, and often step back from it.", value: 1 },
      { label: "I take it on and learn as I go.", value: 2 },
      { label: "I take it on and build the capability in others too.", value: 3 },
      { label: "I design systems so the organisation can carry it without me.", value: 4 },
    ],
  },

  // Influence & Relationships
  {
    id: "infl-1",
    dimension: "influence",
    prompt: "How do people currently relate to your leadership?",
    options: [
      { label: "I am not yet seen as a leader by those around me.", value: 1 },
      { label: "A few people look to me for direction.", value: 2 },
      { label: "A defined group follows my lead and trusts my judgement.", value: 3 },
      { label: "Other leaders seek my counsel on their own work.", value: 4 },
    ],
  },
  {
    id: "infl-2",
    dimension: "influence",
    prompt: "What is your involvement in developing other leaders?",
    options: [
      { label: "None yet — I am the one being developed.", value: 1 },
      { label: "I encourage and help individuals informally.", value: 2 },
      { label: "I intentionally mentor people in a structured way.", value: 3 },
      { label: "I raise mentors who go on to raise others.", value: 4 },
    ],
  },

  // Kingdom / Service Orientation
  {
    id: "king-1",
    dimension: "kingdom",
    prompt: "Where does your sense of impact currently sit?",
    options: [
      { label: "I want to matter, but I cannot yet see where.", value: 1 },
      { label: "In my immediate circle — family, friends, workplace.", value: 2 },
      { label: "In a community or ministry that I help carry.", value: 3 },
      { label: "In a sector, city, or nation I am deliberately shaping.", value: 4 },
    ],
  },
  {
    id: "king-2",
    dimension: "kingdom",
    prompt: "What would make the next twelve months a success?",
    options: [
      { label: "Finding clarity and firm footing.", value: 1 },
      { label: "Growing in discipline and capability.", value: 2 },
      { label: "Leading my work well and sustaining it without burning out.", value: 3 },
      { label: "Multiplying leaders and institutions beyond myself.", value: 4 },
    ],
  },
];

/** The three Global Leadership Executive levels a visitor can be placed on. */
export type LevelKey = 1 | 2 | 3;

export interface LevelResult {
  level: LevelKey;
  /** Track slug in `@/data/mentorship` this level recommends. */
  trackSlug: string;
  /** Honour-framed headline — never a grade. */
  headline: string;
  /** Where the visitor currently is. */
  body: string;
  /** Why this track fits them. */
  why: string;
  /** The concrete next step to take. */
  nextStep: string;
  cohortDate: string;
}

export const levels: Record<LevelKey, LevelResult> = {
  1: {
    level: 1,
    trackSlug: "emerging-leaders",
    headline: "You are being formed — and this is exactly where great leaders begin.",
    body:
      "Your answers describe a leader whose foundations are still being laid: real hunger, real potential, and the season for depth of character before breadth of responsibility.",
    why:
      "Global Leadership Executive I is built for this moment. It pairs you with a mentor and a peer cohort to establish character, clarify your assignment, and deliver your first leadership project under guidance.",
    nextStep:
      "Begin with the Emerging Leaders cohort, where formation comes before position.",
    cohortDate: "2026-08-01",
  },
  2: {
    level: 2,
    trackSlug: "ministry-leaders",
    headline: "You already carry responsibility for others — now it needs to be sustainable.",
    body:
      "Your answers describe a leader with a defined work and people who depend on you. The task is no longer proving capability; it is deepening the interior life and building what holds.",
    why:
      "Global Leadership Executive II is built for leaders already stewarding a work. It gives you senior faculty, fortnightly one-to-one mentoring, and the accountability to lead for the long haul without burning out.",
    nextStep:
      "Join the Global Leaders cohort and build the rhythm that sustains what you carry.",
    cohortDate: "2026-08-17",
  },
  3: {
    level: 3,
    trackSlug: "nation-builders",
    headline: "You are building beyond yourself — the work now is what outlasts you.",
    body:
      "Your answers describe a leader operating at institutional scale, whose counsel other leaders already seek. The horizon in view is succession, sectors, and nations.",
    why:
      "Global Leadership Executive III convenes senior leaders mentored directly by Dr. Ogbueli and faculty, with roundtables and Global Leadership Forum access, focused on multiplying leaders and institutions.",
    nextStep:
      "Apply to the Nation Builders cohort and put a legacy plan behind the work.",
    cohortDate: "2026-10-01",
  },
};

export default questions;
