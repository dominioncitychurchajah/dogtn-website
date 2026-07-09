import type { Course } from "@/data/types";

export const courses: Course[] = [
  {
    id: "dli-basic-2026-q3",
    title: "DLI Basic — Leadership Foundations",
    institution: "Dominion Leadership Institute",
    cohortDate: "2026-09-07T00:00:00.000Z",
    durationWeeks: 8,
    level: "Basic",
    description:
      "The foundational eight-week track of the Dominion Leadership Institute. Build the character, vision, and core competencies every leader needs before carrying greater responsibility.",
  },
  {
    id: "dli-advanced-2026-q4",
    title: "DLI Advanced — Strategy & Governance",
    institution: "Dominion Leadership Institute",
    cohortDate: "2026-10-19T00:00:00.000Z",
    durationWeeks: 10,
    level: "Advanced",
    description:
      "A deeper, ten-week study in organisational strategy, kingdom governance, and the leadership of teams and institutions. Prerequisite: DLI Basic or equivalent experience.",
  },
  {
    id: "dli-executive-certification-2026",
    title: "Executive Leadership Certification",
    institution: "Dominion Leadership Institute",
    cohortDate: "2026-11-30T00:00:00.000Z",
    durationWeeks: 12,
    level: "Certification",
    description:
      "The capstone certification for seasoned leaders and executives. Twelve weeks of intensive study, project work, and assessment culminating in formal certification.",
  },
  {
    id: "priesthood-ministry-leaders-2026-q3",
    title: "Priesthood Institute — Ministry Leaders Formation",
    institution: "Priesthood Institute",
    cohortDate: "2026-08-17T00:00:00.000Z",
    durationWeeks: 12,
    level: "Advanced",
    description:
      "A twelve-week mentored formation for practising ministers and ministry leaders, focused on depth, integrity, and the stewardship of a sacred trust.",
  },
  {
    id: "priesthood-ordination-2026",
    title: "Priesthood Institute — Ordination Track",
    institution: "Priesthood Institute",
    cohortDate: "2026-12-07T00:00:00.000Z",
    durationWeeks: 16,
    level: "Certification",
    description:
      "The formation and accreditation pathway for those called to the ordained ministry, culminating in ordination. Prerequisite: Ministry Leaders Formation.",
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export default courses;
