/* Shared domain types — mock data is typed to real DB-schema shapes. */

export type Stage =
  | "Visitor"
  | "Learner"
  | "Disciple"
  | "Leader"
  | "Mentor"
  | "Nation Builder";

export interface Journey {
  slug: string;
  title: string;
  promise: string;
  icon: string; // lucide icon name
  description: string;
  modules: JourneyModule[];
  accent: "gold" | "flame" | "verd" | "info";
}

export interface JourneyModule {
  id: string;
  title: string;
  durationMin: number;
  type: "video" | "audio" | "reading";
  completed?: boolean;
}

export type MediaFormat = "video" | "audio" | "article";

export interface Teaching {
  slug: string;
  title: string;
  series?: string;
  speaker: string;
  format: MediaFormat;
  durationMin: number;
  thumbnail: string;
  tags: string[];
  publishedAt: string; // ISO date
  description: string;
  transcript?: string;
  journeySlug?: string; // journey bridge
  featured?: boolean;
}

export interface Institution {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  mandate: string;
  icon: string;
  heroImage: string;
  stats: { label: string; value: string }[];
  programs: { title: string; description: string }[];
  ctaLabel: string;
  ctaHref: string; // relative, prefixed with locale at render time
  /** If set, this institution links out to an external site instead of an internal detail page. */
  externalUrl?: string;
}

export interface EventItem {
  slug: string;
  title: string;
  type: "Conference" | "Leadership" | "Academy" | "Community" | "Online";
  institution: string;
  date: string; // ISO
  endDate?: string;
  location: string;
  online: boolean;
  image: string;
  summary: string;
  description: string;
  tiers: { name: string; price: number; currency: "NGN" | "USD" }[];
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  cover: string;
  category: string;
  formats: ("ebook" | "paperback" | "audiobook")[];
  price: { amount: number; currency: "NGN" | "USD" };
  synopsis: string;
  sample: string;
  relatedTeachings: string[]; // teaching slugs
  featured?: boolean;
}

export interface Chapter {
  id: string;
  name: string;
  area: string;
  city: string;
  country: string;
  serviceTimes: string[];
  contact: string;
  lat: number;
  lng: number;
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  cohortDate: string; // ISO
  durationWeeks: number;
  level: "Basic" | "Advanced" | "Certification";
  description: string;
}

export interface MentorshipTrack {
  slug: string;
  name: string;
  audience: string;
  hero: string;
  image: string;
  outcomes: string[];
  expectations: { item: string; detail: string }[];
  mentorStructure: string;
  cohortDates: string[];
  eligibility: string[];
  faqs: { q: string; a: string }[];
}

export interface Testimony {
  id: string;
  quote: string;
  name: string;
  role: string;
  stage: Stage;
  portrait: string;
}
