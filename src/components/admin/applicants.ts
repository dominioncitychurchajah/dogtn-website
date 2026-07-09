import { tracks } from "@/data/mentorship";

export type AppStage =
  | "submitted"
  | "review"
  | "interview"
  | "accepted"
  | "waitlist"
  | "declined";

export interface Applicant {
  id: string;
  name: string;
  location: string;
  country: string;
  trackSlug: string;
  trackName: string;
  stage: AppStage;
  score: number; // 0–10 rubric composite
  cohort: string;
  submittedAgo: string;
  role: string;
  summary: string;
  vision: string;
  impact: string;
}

/** Deterministic mock applicant pool derived from mentorship tracks + names. */
const SEED: Array<{
  first: string;
  last: string;
  location: string;
  country: string;
  track: string;
  stage: AppStage;
  score: number;
  cohort: string;
  ago: string;
  role: string;
}> = [
  { first: "Elena", last: "Rossi", location: "Milan", country: "Italy", track: "emerging-leaders", stage: "submitted", score: 8.4, cohort: "Aug 2026", ago: "2h ago", role: "University Student, Politecnico" },
  { first: "Kofi", last: "Mensah", location: "Accra", country: "Ghana", track: "young-professionals", stage: "submitted", score: 9.1, cohort: "Sep 2026", ago: "5h ago", role: "Product Analyst, MTN" },
  { first: "Amara", last: "Okonkwo", location: "Lagos", country: "Nigeria", track: "emerging-leaders", stage: "submitted", score: 7.6, cohort: "Aug 2026", ago: "8h ago", role: "Graduate Trainee" },
  { first: "Sarah", last: "Jenkins", location: "Houston", country: "United States", track: "young-professionals", stage: "review", score: 7.8, cohort: "Sep 2026", ago: "1d ago", role: "Operations Lead" },
  { first: "David", last: "Mwangi", location: "Nairobi", country: "Kenya", track: "ministry-leaders", stage: "review", score: 8.9, cohort: "Aug 2026", ago: "1d ago", role: "Associate Pastor" },
  { first: "Li", last: "Wei", location: "Shanghai", country: "China", track: "nation-builders", stage: "interview", score: 9.5, cohort: "Oct 2026", ago: "2d ago", role: "Managing Director" },
  { first: "Grace", last: "Adeyemi", location: "Abuja", country: "Nigeria", track: "ministry-leaders", stage: "interview", score: 8.7, cohort: "Aug 2026", ago: "2d ago", role: "Ministry Coordinator" },
  { first: "Thabo", last: "Nkosi", location: "Johannesburg", country: "South Africa", track: "nation-builders", stage: "accepted", score: 9.3, cohort: "Oct 2026", ago: "4d ago", role: "Regional Director" },
  { first: "Fatima", last: "Bello", location: "Kano", country: "Nigeria", track: "young-professionals", stage: "accepted", score: 8.8, cohort: "Sep 2026", ago: "5d ago", role: "Civil Engineer" },
  { first: "James", last: "Carter", location: "London", country: "United Kingdom", track: "emerging-leaders", stage: "waitlist", score: 6.9, cohort: "Aug 2026", ago: "6d ago", role: "Recent Graduate" },
  { first: "Chidinma", last: "Eze", location: "Enugu", country: "Nigeria", track: "ministry-leaders", stage: "waitlist", score: 7.2, cohort: "Aug 2026", ago: "6d ago", role: "Youth Pastor" },
  { first: "Marcus", last: "Silva", location: "São Paulo", country: "Brazil", track: "nation-builders", stage: "declined", score: 5.4, cohort: "Oct 2026", ago: "1w ago", role: "Entrepreneur" },
  { first: "Aisha", last: "Diallo", location: "Dakar", country: "Senegal", track: "young-professionals", stage: "declined", score: 5.8, cohort: "Sep 2026", ago: "1w ago", role: "Marketing Officer" },
];

export const applicants: Applicant[] = SEED.map((s, i) => {
  const track = tracks.find((t) => t.slug === s.track) ?? tracks[0];
  return {
    id: `app-${String(i + 1).padStart(3, "0")}`,
    name: `${s.first} ${s.last}`,
    location: s.location,
    country: s.country,
    trackSlug: track.slug,
    trackName: track.name,
    stage: s.stage,
    score: s.score,
    cohort: s.cohort,
    submittedAgo: s.ago,
    role: s.role,
    summary: `${s.role} from ${s.location}, ${s.country}. Applying to the ${track.name} track to ${track.hero.toLowerCase()}`,
    vision: `"My aim is to ${track.outcomes[0].toLowerCase()}, and to carry what I learn back to my community as a multiplier of transformation."`,
    impact: `Led a local initiative aligned with the ${track.name} mandate, mentoring emerging leaders and delivering measurable community outcomes over the past year.`,
  };
});

export function getApplicant(id: string): Applicant | undefined {
  return applicants.find((a) => a.id === id);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const STAGES: { key: AppStage; label: string }[] = [
  { key: "submitted", label: "Submitted" },
  { key: "review", label: "In Review" },
  { key: "interview", label: "Interview" },
  { key: "accepted", label: "Accepted" },
  { key: "waitlist", label: "Waitlist" },
  { key: "declined", label: "Declined" },
];
