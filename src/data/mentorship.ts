import type { MentorshipTrack } from "@/data/types";

export const tracks: MentorshipTrack[] = [
  {
    slug: "emerging-leaders",
    level: 1,
    durationMonths: 6,
    hoursPerWeek: 3,
    name: "Emerging Leaders",
    audience: "Students and early-career leaders discovering their calling.",
    hero: "Find your footing. Discover the leader you were made to be.",
    image: "/images/pastor/leadership-hand-raised.jpg",
    outcomes: [
      "Clarity about your gifts, calling, and next step",
      "Foundational habits of character and self-leadership",
      "A peer cohort and a personal mentor for the journey",
      "A first leadership project delivered under guidance",
    ],
    expectations: [
      { item: "Time commitment", detail: "3 hours per week for 6 months" },
      { item: "Cohort sessions", detail: "Fortnightly group calls with your mentor" },
      { item: "Personal mentoring", detail: "Monthly one-to-one check-ins" },
      { item: "Assignments", detail: "Reflection journals and a capstone project" },
    ],
    mentorStructure:
      "Small cohorts of 8–12 emerging leaders paired with a trained mentor, meeting fortnightly, with monthly one-to-one guidance.",
    cohortDates: ["2026-08-01", "2026-11-01", "2027-02-01"],
    eligibility: [
      "Aged 16–25",
      "A teachable, committed posture",
    ],
    faqs: [
      { q: "Is this free?", a: "Yes. Emerging Leaders is offered free to participants." },
      { q: "Do I need prior leadership experience?", a: "No. This track is designed for those just beginning." },
      { q: "Is it available online?", a: "Yes — cohorts run online and in-person across our chapters." },
      { q: "What if I miss a session?", a: "Sessions are recorded, and your mentor will help you catch up." },
    ],
  },
  {
    slug: "ministry-leaders",
    level: 2,
    durationMonths: 12,
    hoursPerWeek: 5,
    name: "Global Leaders",
    audience: "Ministers and ministry leaders stewarding a work.",
    hero: "Go deeper. Steward your calling for the long haul.",
    image: "/images/pastor/preaching-purple-lit.jpg",
    outcomes: [
      "Renewed depth in the interior life and devotion",
      "Practical wisdom for leading people and building healthy culture",
      "Accountability and covering for the season ahead",
      "A sustainable rhythm to avoid burnout",
    ],
    expectations: [
      { item: "Time commitment", detail: "5 hours per week for 12 months" },
      { item: "Cohort sessions", detail: "Monthly intensives with senior faculty" },
      { item: "Personal mentoring", detail: "Fortnightly one-to-one mentoring" },
      { item: "Intensives", detail: "Two residential intensives per year" },
    ],
    mentorStructure:
      "Cohorts of practising leaders under senior faculty, with fortnightly one-to-one mentoring and biannual residential intensives.",
    cohortDates: ["2026-08-17", "2027-01-11", "2027-06-07"],
    eligibility: [
      "Currently serving in ministry leadership",
      "Endorsement from your local chapter or overseer",
      "Commitment to the full twelve-month journey",
    ],
    faqs: [
      { q: "Who is this for?", a: "Pastors, church planters, and ministry leaders already carrying responsibility." },
      { q: "How does this differ from Level 1?", a: "Level 2 assumes you already carry responsibility for others, so the work centres on sustaining and multiplying it." },
      { q: "Are the intensives mandatory?", a: "Yes — the two annual intensives are a core part of the formation." },
      { q: "Can international leaders join?", a: "Yes, with a mix of online sessions and travel for the intensives." },
    ],
  },
  {
    slug: "nation-builders",
    level: 3,
    durationMonths: 12,
    hoursPerWeek: 6,
    name: "Nation Builders",
    audience: "Senior leaders shaping institutions, sectors, and nations.",
    hero: "Build what outlasts you. Carry transformation to nations.",
    image: "/images/pastor/dli-conference-whiteboard.jpg",
    outcomes: [
      "A strategy to disciple your sphere — business, government, media, or culture",
      "Peer relationships with other senior leaders and nation builders",
      "Mentorship from those who have built enduring institutions",
      "A legacy plan for multiplying leaders beyond yourself",
    ],
    expectations: [
      { item: "Time commitment", detail: "6 hours per week for 12 months" },
      { item: "Cohort sessions", detail: "Monthly high-level roundtables" },
      { item: "Personal mentoring", detail: "Direct mentorship from senior faculty" },
      { item: "Convening", detail: "Priority access to the Global Leadership Forum" },
    ],
    mentorStructure:
      "An invitation-based cohort of senior leaders mentored directly by Dr. Ogbueli and faculty, with monthly roundtables and Global Leadership Forum access.",
    cohortDates: ["2026-10-01", "2027-04-01"],
    eligibility: [
      "Senior leadership role in your sector",
      "Demonstrated track record of building or leading",
      "Referral or interview with faculty",
    ],
    faqs: [
      { q: "How do I join?", a: "By application and interview, or by referral from existing Nation Builders." },
      { q: "Is this only for ministers?", a: "No — it is for leaders across business, government, media, and culture." },
      { q: "What is expected afterwards?", a: "Nation Builders commit to mentoring the next generation of leaders." },
      { q: "Is this free?", a: "Yes. Nation Builders is offered free to participants." },
    ],
  },
];

/** Global Leadership Executive level label, e.g. "Global Leadership Executive II". */
const ROMAN = ["", "I", "II", "III"] as const;

export function gleLabel(track: Pick<MentorshipTrack, "level">): string {
  return `Global Leadership Executive ${ROMAN[track.level]}`;
}

/** Tracks ordered by level — the canonical order for the 3-track presentation. */
export const tracksByLevel = [...tracks].sort((a, b) => a.level - b.level);

export function getTrack(slug: string): MentorshipTrack | undefined {
  return tracks.find((t) => t.slug === slug);
}

export default tracks;
