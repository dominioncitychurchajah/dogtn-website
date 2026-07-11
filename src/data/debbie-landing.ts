import { type DebbieChip } from "@/data/debbie-flows";

/** Kodee-style landing screen — the very first thing shown, before any conversation starts. */

export const LANDING_PRIMARY_CHIP: DebbieChip = {
  kind: "link",
  label: "Start a guided journey",
  href: "/start-here",
  confirm: "Wonderful. Let's find your first step.",
  event: "journey_selected_via_chat",
};

export type LandingIconKey = "chapter" | "assessment" | "teachings" | "giving";

export const LANDING_SECONDARY: { icon: LandingIconKey; label: string; chip: DebbieChip }[] = [
  {
    icon: "chapter",
    label: "Find a chapter",
    chip: { kind: "advance", label: "I'm a member looking for my chapter", to: "chapter" },
  },
  {
    icon: "assessment",
    label: "Take the assessment",
    chip: {
      kind: "link",
      label: "Take the assessment",
      href: "/leadership/assessment",
      confirm: "Let's begin. Opening your Leadership Assessment now.",
      event: "assessment_started_via_chat",
    },
  },
  {
    icon: "teachings",
    label: "Explore teachings",
    chip: {
      kind: "link",
      label: "Explore teachings",
      href: "/teachings",
      confirm: "Opening the Teachings library.",
    },
  },
  {
    icon: "giving",
    label: "Partner or give",
    chip: { kind: "advance", label: "I want to give or partner", to: "giving" },
  },
];
