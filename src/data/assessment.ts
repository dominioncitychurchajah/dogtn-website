/* Leadership Assessment specification: dimensions, questions, routing, and the
 * recommendation matrix (band × self-placement). */

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
  type: "likert" | "scenario";
  prompt: string;
  reverse?: boolean;
  options?: { label: string; value: number }[];
}

export const questions: AssessmentQuestion[] = [
  // Character & Integrity — 3 Likert + 1 Scenario
  {
    id: "char-1",
    dimension: "character",
    type: "likert",
    prompt: "I keep my commitments even when it is costly or inconvenient.",
  },
  {
    id: "char-2",
    dimension: "character",
    type: "likert",
    prompt: "My private conduct matches my public reputation.",
  },
  {
    id: "char-3",
    dimension: "character",
    type: "likert",
    prompt: "I tend to bend the rules when I am confident no one will find out.",
    reverse: true,
  },
  {
    id: "char-4",
    dimension: "character",
    type: "scenario",
    prompt:
      "You discover a reporting error that inflated your team's results. The quarter is already closed. What do you do?",
    options: [
      { label: "Say nothing — the quarter is closed and it helps morale.", value: 1 },
      { label: "Quietly fix it going forward without mentioning the past.", value: 2 },
      { label: "Tell my manager privately and correct the record.", value: 3 },
      { label: "Disclose it openly, correct the record, and review our controls.", value: 4 },
    ],
  },

  // Vision & Purpose Clarity — 4 Likert
  {
    id: "vis-1",
    dimension: "vision",
    type: "likert",
    prompt: "I can clearly articulate the purpose and direction of my life.",
  },
  {
    id: "vis-2",
    dimension: "vision",
    type: "likert",
    prompt: "I set specific goals and regularly review my progress toward them.",
  },
  {
    id: "vis-3",
    dimension: "vision",
    type: "likert",
    prompt: "I often feel unsure about where I am heading in the long term.",
    reverse: true,
  },
  {
    id: "vis-4",
    dimension: "vision",
    type: "likert",
    prompt: "I can paint a compelling picture of the future that others want to join.",
  },

  // Competence & Capacity — 3 Likert + 1 Scenario
  {
    id: "comp-1",
    dimension: "competence",
    type: "likert",
    prompt: "I consistently deliver work to a high standard and on time.",
  },
  {
    id: "comp-2",
    dimension: "competence",
    type: "likert",
    prompt: "I actively pursue new skills relevant to my calling.",
  },
  {
    id: "comp-3",
    dimension: "competence",
    type: "likert",
    prompt: "I take on responsibility and handle increasing complexity well.",
  },
  {
    id: "comp-4",
    dimension: "competence",
    type: "scenario",
    prompt:
      "You are handed a project that stretches beyond your current skill. How do you respond?",
    options: [
      { label: "Decline it — it is outside my ability.", value: 1 },
      { label: "Accept it but hope no one notices the gaps.", value: 2 },
      { label: "Accept it and quickly build the skills I lack.", value: 3 },
      { label: "Accept it, build the skills, and bring others up with me.", value: 4 },
    ],
  },

  // Influence & Relationships — 4 Likert
  {
    id: "infl-1",
    dimension: "influence",
    type: "likert",
    prompt: "People readily trust me and follow my lead.",
  },
  {
    id: "infl-2",
    dimension: "influence",
    type: "likert",
    prompt: "I listen well and genuinely value others' perspectives.",
  },
  {
    id: "infl-3",
    dimension: "influence",
    type: "likert",
    prompt: "I invest in developing and empowering other people.",
  },
  {
    id: "infl-4",
    dimension: "influence",
    type: "likert",
    prompt: "I handle conflict constructively rather than avoiding it.",
  },

  // Kingdom/Service Orientation — 3 Likert + 1 Scenario
  {
    id: "king-1",
    dimension: "kingdom",
    type: "likert",
    prompt: "I lead primarily to serve others rather than to advance myself.",
  },
  {
    id: "king-2",
    dimension: "kingdom",
    type: "likert",
    prompt: "I see my work as part of a larger purpose to transform society.",
  },
  {
    id: "king-3",
    dimension: "kingdom",
    type: "likert",
    prompt: "I give generously of my time and resources to others.",
  },
  {
    id: "king-4",
    dimension: "kingdom",
    type: "scenario",
    prompt:
      "You are offered a promotion that increases your status but reduces your impact on the people you serve. What guides your decision?",
    options: [
      { label: "Take it — status and advancement come first.", value: 1 },
      { label: "Take it, but feel conflicted about the trade-off.", value: 2 },
      { label: "Weigh it carefully, prioritising service over status.", value: 3 },
      { label: "Decline or reshape it so service and impact stay central.", value: 4 },
    ],
  },
];

export const selfPlacementQuestions: {
  key: string;
  prompt: string;
  options: { label: string; value: string }[];
}[] = [
  {
    key: "currentRole",
    prompt: "Which best describes your current role?",
    options: [
      { label: "Student or early-career", value: "student" },
      { label: "Working professional", value: "professional" },
      { label: "Team or organisational leader", value: "leader" },
      { label: "Minister or ministry leader", value: "minister" },
      { label: "Senior / executive leader", value: "executive" },
    ],
  },
  {
    key: "priorDli",
    prompt: "What is your prior experience with our training?",
    options: [
      { label: "None yet — this is my starting point", value: "none" },
      { label: "I have completed DLI Basic", value: "basic-alum" },
      { label: "I am an active ministry leader", value: "ministry-leader" },
    ],
  },
  {
    key: "journeySource",
    prompt: "What brought you to this assessment?",
    options: [
      { label: "Seeking direction and purpose", value: "purpose" },
      { label: "Wanting to grow as a leader", value: "leadership" },
      { label: "Deepening spiritually", value: "spiritual" },
      { label: "Building a ministry or institution", value: "ministry" },
    ],
  },
];

export type Band = "Emerging" | "Developing" | "Established" | "Advanced";
export type Placement = "none" | "basic-alum" | "ministry-leader";

export interface Recommendation {
  title: string;
  body: string;
  cta: { label: string; href: string };
  cohortDate: string;
}

export const recommendationMatrix: Record<
  Band,
  Record<Placement, Recommendation>
> = {
  Emerging: {
    none: {
      title: "Start with the Become a Leader journey",
      body: "You are at the beginning of a powerful path. The Become a Leader journey will lay the character and vision foundations you need to grow.",
      cta: { label: "Begin the journey", href: "/journeys/become-a-leader" },
      cohortDate: "2026-08-01",
    },
    "basic-alum": {
      title: "Revisit the fundamentals with a DLI Basic refresher",
      body: "You have DLI Basic behind you — a refresher will help you re-establish the foundations before advancing further.",
      cta: { label: "Explore DLI Basic", href: "/leadership" },
      cohortDate: "2026-09-07",
    },
    "ministry-leader": {
      title: "Join the Ministry Leaders mentorship",
      body: "As a ministry leader, the Ministry Leaders mentorship will give you the depth and support to lead well as you grow.",
      cta: { label: "Apply for mentorship", href: "/mentorship/ministry-leaders" },
      cohortDate: "2026-08-17",
    },
  },
  Developing: {
    none: {
      title: "Enrol in DLI Basic",
      body: "You are developing steadily. DLI Basic will consolidate your growth and equip you with the core disciplines of leadership.",
      cta: { label: "Enrol in DLI Basic", href: "/leadership" },
      cohortDate: "2026-09-07",
    },
    "basic-alum": {
      title: "Step up to DLI Advanced",
      body: "With DLI Basic complete and clear momentum, you are ready for the deeper study of strategy and governance in DLI Advanced.",
      cta: { label: "Explore DLI Advanced", href: "/leadership" },
      cohortDate: "2026-10-19",
    },
    "ministry-leader": {
      title: "Deepen through the Priesthood Institute",
      body: "The Priesthood Institute will help you steward your calling with greater depth, integrity, and sustainability.",
      cta: { label: "Apply for mentorship", href: "/mentorship/ministry-leaders" },
      cohortDate: "2026-08-17",
    },
  },
  Established: {
    none: {
      title: "Take the DLI Basic fast-track",
      body: "You are already an established leader. A DLI Basic fast-track will formalise your foundations and connect you to the wider network quickly.",
      cta: { label: "Explore the fast-track", href: "/leadership" },
      cohortDate: "2026-09-07",
    },
    "basic-alum": {
      title: "Advance with DLI Advanced and a mentorship track",
      body: "You have the foundations and the results. Pair DLI Advanced with a mentorship track to accelerate your impact.",
      cta: { label: "Explore DLI Advanced", href: "/leadership" },
      cohortDate: "2026-10-19",
    },
    "ministry-leader": {
      title: "Join the Ministry Leaders mentorship",
      body: "As an established ministry leader, the Ministry Leaders mentorship offers the peer depth and accountability to sustain you for the long haul.",
      cta: { label: "Apply for mentorship", href: "/mentorship/ministry-leaders" },
      cohortDate: "2026-08-17",
    },
  },
  Advanced: {
    none: {
      title: "Enter DLI Advanced with an interview",
      body: "Your results place you among advanced leaders. We recommend entering DLI Advanced directly via an interview to match your level.",
      cta: { label: "Explore DLI Advanced", href: "/leadership" },
      cohortDate: "2026-10-19",
    },
    "basic-alum": {
      title: "Pursue Certification and senior mentorship",
      body: "You are ready for the capstone. Executive Certification alongside the Nation Builders mentorship will position you to build what outlasts you.",
      cta: { label: "Explore Nation Builders", href: "/mentorship/nation-builders" },
      cohortDate: "2026-11-30",
    },
    "ministry-leader": {
      title: "Join the Nation Builders track",
      body: "As an advanced ministry leader, the Nation Builders track invites you to shape institutions, sectors, and nations.",
      cta: { label: "Apply for Nation Builders", href: "/mentorship/nation-builders" },
      cohortDate: "2026-10-01",
    },
  },
};

export default questions;
