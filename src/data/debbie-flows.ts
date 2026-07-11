/** Conversation tree for "Debbie", the DOGTN chat guide. Phase 1 MVP: quick-reply chips only, no free text. */

export type DebbieChip =
  | { kind: "advance"; label: string; to: string; event?: string }
  | {
      kind: "link";
      label: string;
      href: string;
      external?: boolean;
      confirm: string;
      event?: string;
    };

export interface DebbieNode {
  id: string;
  bot: string;
  chips: DebbieChip[];
}

export const ROOT_ID = "root";

export const ROOT_GREETING =
  "Welcome to the David Ogbueli Global Transformation Network. You are not here by accident. What brought you here today?";

export const ROOT_RETURN_TEXT = "What else can I help you with?";

export const FREE_TEXT_HANDOFF_TEXT =
  "Thank you for sharing that. Questions like this deserve a real conversation, so let me connect you with someone from our team — or pick up below where you left off.";

export const TEAM_EMAIL = "support@davidogbueli.org";

const BACK_TO_MENU: DebbieChip = { kind: "advance", label: "Back to menu", to: ROOT_ID };

export const DEBBIE_NODES: Record<string, DebbieNode> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    bot: ROOT_GREETING,
    chips: [
      { kind: "advance", label: "I'm searching for purpose", to: "purpose" },
      { kind: "advance", label: "I want to grow as a leader", to: "leader" },
      { kind: "advance", label: "I lead a ministry", to: "ministry" },
      { kind: "advance", label: "I want to transform my nation", to: "nation" },
      { kind: "advance", label: "I'm a member looking for my chapter", to: "chapter" },
      { kind: "advance", label: "I want to give or partner", to: "giving" },
    ],
  },
  purpose: {
    id: "purpose",
    bot:
      "You're in the right place. Dr. Ogbueli has helped thousands find their assignment. Would you like to begin a 5-day journey, or watch one message first?",
    chips: [
      {
        kind: "link",
        label: "Start Journey (free)",
        href: "/journeys",
        confirm: "Wonderful. I'll take you to your first step now.",
        event: "journey_selected_via_chat",
      },
      {
        kind: "link",
        label: "Watch a message first",
        href: "/teachings",
        confirm: "Great choice — opening the Teachings library.",
      },
      BACK_TO_MENU,
    ],
  },
  leader: {
    id: "leader",
    bot:
      "We love to see leaders taking initiative. The best way to start is with our seven-minute Leadership Assessment. It evaluates your current strengths and helps us recommend the right training pathway for you.",
    chips: [
      {
        kind: "link",
        label: "Take the 7-min assessment",
        href: "/leadership/assessment",
        confirm: "Let's begin. Opening your Leadership Assessment now.",
        event: "assessment_started_via_chat",
      },
      {
        kind: "link",
        label: "Visit the Leadership Institute",
        href: "/leadership",
        confirm: "Opening the Leadership Institute.",
      },
      BACK_TO_MENU,
    ],
  },
  ministry: {
    id: "ministry",
    bot:
      "Ministry leaders carry a weight of their own. Our mentorship tracks and the Leadership Institute exist to strengthen you in strategy, character, and capacity.",
    chips: [
      {
        kind: "link",
        label: "Explore Mentorship",
        href: "/mentorship",
        confirm: "Opening Mentorship.",
      },
      {
        kind: "link",
        label: "Visit the Leadership Institute",
        href: "/leadership",
        confirm: "Opening the Leadership Institute.",
      },
      BACK_TO_MENU,
    ],
  },
  nation: {
    id: "nation",
    bot:
      "Nations are transformed one strong institution and one prepared leader at a time. Start Here will show you exactly where your assignment fits.",
    chips: [
      {
        kind: "link",
        label: "Start Here",
        href: "/start-here",
        confirm: "Opening Start Here.",
      },
      {
        kind: "link",
        label: "See our Institutions",
        href: "/institutions",
        confirm: "Opening our Institutions.",
      },
      BACK_TO_MENU,
    ],
  },
  chapter: {
    id: "chapter",
    bot: "Are you looking for a Dominion City chapter near you, or would you like to stay connected online?",
    chips: [
      {
        kind: "link",
        label: "Find a chapter",
        href: "https://www.dominioncity.cc",
        external: true,
        confirm: "Connecting you with Dominion City.",
      },
      {
        kind: "link",
        label: "Stay connected online",
        href: "/community",
        confirm: "Opening Community.",
      },
      BACK_TO_MENU,
    ],
  },
  giving: {
    id: "giving",
    bot:
      "Thank you for your generosity. You can make a one-time gift, set up a recurring monthly partnership, or support a mission project directly.",
    chips: [
      {
        kind: "link",
        label: "Make a one-time gift",
        href: "/give",
        confirm: "Opening secure giving.",
        event: "giving_initiated_via_chat",
      },
      {
        kind: "link",
        label: "Set up a monthly partnership",
        href: "/partnership",
        confirm: "Opening Partnership.",
        event: "giving_initiated_via_chat",
      },
      BACK_TO_MENU,
    ],
  },
};
