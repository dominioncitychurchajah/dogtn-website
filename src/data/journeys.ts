import type { Journey } from "@/data/types";

export const journeys: Journey[] = [
  {
    slug: "discover-purpose",
    title: "Discover Your Purpose",
    promise: "Move from confusion to clarity about why you exist.",
    icon: "compass",
    description:
      "A guided path for the seeker. Uncover the divine assignment on your life, name your gifts, and take the first decisive steps toward a life that counts.",
    accent: "gold",
    modules: [
      { id: "dp-1", title: "The Question of Purpose", durationMin: 18, type: "video" },
      { id: "dp-2", title: "Reading the Signs of Your Design", durationMin: 22, type: "reading" },
      { id: "dp-3", title: "Gifts, Talents & Grace", durationMin: 26, type: "audio" },
      { id: "dp-4", title: "Naming Your Assignment", durationMin: 20, type: "video" },
      { id: "dp-5", title: "First Steps of Obedience", durationMin: 15, type: "reading" },
    ],
  },
  {
    slug: "become-a-leader",
    title: "Become a Leader",
    promise: "Grow from follower to trusted, influential leader.",
    icon: "graduation-cap",
    description:
      "The foundational leadership track of the Dominion Leadership Institute. Build character, competence, and the capacity to carry responsibility for others.",
    accent: "flame",
    modules: [
      { id: "bl-1", title: "Leadership Begins Within", durationMin: 24, type: "video" },
      { id: "bl-2", title: "The Anatomy of Character", durationMin: 28, type: "reading" },
      { id: "bl-3", title: "Vision & the Power of a Preferred Future", durationMin: 30, type: "video" },
      { id: "bl-4", title: "Building Teams That Last", durationMin: 26, type: "audio" },
      { id: "bl-5", title: "Decision-Making Under Pressure", durationMin: 22, type: "video" },
      { id: "bl-6", title: "Your First 90 Days of Leading", durationMin: 19, type: "reading" },
    ],
  },
  {
    slug: "grow-spiritually",
    title: "Grow Spiritually",
    promise: "Deepen intimacy with God and mature in the faith.",
    icon: "sprout",
    description:
      "For the disciple who wants roots that go deep. Cultivate prayer, the Word, and the disciplines that produce lasting spiritual fruit.",
    accent: "verd",
    modules: [
      { id: "gs-1", title: "The Interior Life", durationMin: 20, type: "audio" },
      { id: "gs-2", title: "Prayer as Partnership", durationMin: 25, type: "video" },
      { id: "gs-3", title: "Feeding on the Word", durationMin: 23, type: "reading" },
      { id: "gs-4", title: "The Fruit of Endurance", durationMin: 21, type: "audio" },
      { id: "gs-5", title: "Living from Rest", durationMin: 18, type: "video" },
    ],
  },
  {
    slug: "build-a-ministry",
    title: "Build a Ministry",
    promise: "Turn calling into a structured, thriving work.",
    icon: "church",
    description:
      "For the emerging minister and church planter. Learn to steward people, build systems, and lead a work that endures beyond you.",
    accent: "info",
    modules: [
      { id: "bm-1", title: "From Calling to Commission", durationMin: 27, type: "video" },
      { id: "bm-2", title: "Structures That Serve People", durationMin: 24, type: "reading" },
      { id: "bm-3", title: "Raising & Releasing Leaders", durationMin: 29, type: "video" },
      { id: "bm-4", title: "Stewarding Resources with Integrity", durationMin: 22, type: "audio" },
      { id: "bm-5", title: "Sustaining a Healthy Culture", durationMin: 25, type: "reading" },
      { id: "bm-6", title: "Multiplying Beyond Yourself", durationMin: 20, type: "video" },
    ],
  },
  {
    slug: "transform-society",
    title: "Transform Society",
    promise: "Carry kingdom influence into every sphere of nations.",
    icon: "landmark",
    description:
      "The Nation Builder path. Take principled leadership into business, government, media, and culture — and raise leaders who transform society.",
    accent: "gold",
    modules: [
      { id: "ts-1", title: "The Mandate to Disciple Nations", durationMin: 26, type: "video" },
      { id: "ts-2", title: "Kingdom Principles in the Marketplace", durationMin: 28, type: "reading" },
      { id: "ts-3", title: "Governance, Justice & Righteousness", durationMin: 31, type: "video" },
      { id: "ts-4", title: "Shaping Culture & Media", durationMin: 24, type: "audio" },
      { id: "ts-5", title: "Building Institutions That Outlast You", durationMin: 27, type: "reading" },
    ],
  },
];

export function getJourney(slug: string): Journey | undefined {
  return journeys.find((j) => j.slug === slug);
}

export default journeys;
