import { type GabeChip } from "@/data/gabe-flows";

/** Kodee-style landing screen — the very first thing shown, before any conversation starts. */

export const LANDING_PRIMARY_CHIP: GabeChip = {
  kind: "link",
  label: "Start a guided journey",
  href: "/start-here",
  confirm: "Wonderful. Let's find your first step.",
  event: "journey_selected_via_chat",
};

export type LandingIconKey = "giving" | "assessment" | "resources" | "mentorship";

/**
 * The four primary actions, in this exact order:
 * Partner or Give · Take Leadership Assessment · Access Resources · Sign up for Mentorship.
 */
export const LANDING_SECONDARY: { icon: LandingIconKey; label: string; chip: GabeChip }[] = [
  {
    icon: "giving",
    label: "Partner or Give",
    chip: { kind: "advance", label: "I want to give or partner", to: "giving" },
  },
  {
    icon: "assessment",
    label: "Take Leadership Assessment",
    chip: {
      kind: "link",
      label: "Take Leadership Assessment",
      href: "/leadership/assessment",
      confirm: "Let's begin. Opening your Leadership Assessment now.",
      event: "assessment_started_via_chat",
    },
  },
  {
    icon: "resources",
    label: "Access Resources",
    chip: {
      kind: "link",
      label: "Access Resources",
      href: "/books",
      confirm: "Opening the library.",
      event: "resources_opened_via_chat",
    },
  },
  {
    icon: "mentorship",
    label: "Sign up for Mentorship",
    chip: {
      kind: "link",
      label: "Sign up for Mentorship",
      href: "/mentorship",
      confirm: "Opening the mentorship tracks so you can apply.",
      event: "mentorship_started_via_chat",
    },
  },
];
