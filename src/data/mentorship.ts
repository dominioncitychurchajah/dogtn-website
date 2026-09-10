import type { MentorshipTrack } from "@/data/types";

export const tracks: MentorshipTrack[] = [
  {
    slug: "emerging-leaders",
    level: 1,
    name: "Emerging Leaders",
    audience: "Students and early-career leaders discovering their calling.",
    hero: "Find your footing. Discover the leader you were made to be.",
    image: "/images/pastor/leadership-hand-raised.webp",
    outcomes: [
      "Clarity about your gifts, calling, and next step",
      "Foundational habits of character and self-leadership",
      "Mentorship from Dr. David Ogbueli",
      "A first leadership project delivered under guidance",
    ],
    eligibility: [
      "Aged 16–25",
      "A teachable, committed posture",
    ],
    faqs: [
      { q: "Who leads the mentorship?", a: "Dr. David Ogbueli." },
      { q: "When does it start?", a: "The mentorship runs in a dedicated app. Join the waitlist and we will send your invitation when it opens." },
      { q: "What does the track involve?", a: "The shape of each track is shared with you when you join." },
      { q: "Do I need prior leadership experience?", a: "No. This track is designed for those just beginning." },
    ],
  },
  {
    slug: "ministry-leaders",
    level: 2,
    name: "Global Leaders",
    audience: "Ministers and ministry leaders stewarding a work.",
    hero: "Go deeper. Steward your calling for the long haul.",
    image: "/images/pastor/preaching-purple-lit.webp",
    outcomes: [
      "Renewed depth in the interior life and devotion",
      "Practical wisdom for leading people and building healthy culture",
      "Accountability and covering for the season ahead",
      "A sustainable rhythm to avoid burnout",
    ],
    eligibility: [
      "Currently serving in ministry leadership",
      "Currently carrying responsibility for others",
      "A teachable, committed posture",
    ],
    faqs: [
      { q: "Who leads the mentorship?", a: "Dr. David Ogbueli." },
      { q: "When does it start?", a: "The mentorship runs in a dedicated app. Join the waitlist and we will send your invitation when it opens." },
      { q: "What does the track involve?", a: "The shape of each track is shared with you when you join." },
      { q: "How does this differ from Level 1?", a: "Level 2 assumes you already carry responsibility for others, so the work centres on sustaining and multiplying it." },
    ],
  },
  {
    slug: "nation-builders",
    level: 3,
    name: "Nation Builders",
    audience: "Senior leaders shaping institutions, sectors, and nations.",
    hero: "Build what outlasts you. Carry transformation to nations.",
    image: "/images/pastor/dli-conference-whiteboard.webp",
    outcomes: [
      "A strategy to disciple your sphere: business, government, media, or culture",
      "Relationships with other senior leaders and nation builders",
      "Mentorship from Dr. David Ogbueli",
      "A legacy plan for multiplying leaders beyond yourself",
    ],
    eligibility: [
      "Senior leadership role in your sector",
      "Demonstrated track record of building or leading",
      "A demonstrated commitment to raising other leaders",
    ],
    faqs: [
      { q: "Who leads the mentorship?", a: "Dr. David Ogbueli." },
      { q: "When does it start?", a: "The mentorship runs in a dedicated app. Join the waitlist and we will send your invitation when it opens." },
      { q: "What does the track involve?", a: "The shape of each track is shared with you when you join." },
      { q: "Is this only for ministers?", a: "No. It is for leaders across business, government, media, and culture." },
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
