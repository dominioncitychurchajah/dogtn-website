import type { Locale } from "@/i18n/config";

export interface NavStrings {
  startHere: string;
  teachings: string;
  leadership: string;
  mentorship: string;
  institutions: string;
  community: string;
  events: string;
  library: string;
  partnership: string;
  give: string;
  myJourney: string;
  search: string;
  account: string;
  menu: string;
}

export interface MegaLink {
  label: string;
  href: string;
  desc?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  mega?: MegaLink[];
}

export function buildNav(locale: Locale, s: NavStrings): NavGroup[] {
  const p = (path: string) => `/${locale}${path}`;
  return [
    { label: s.startHere, href: p("/start-here") },
    {
      label: s.teachings,
      href: p("/teachings"),
      mega: [
        { label: "Knowledge Library", href: p("/teachings"), desc: "Video, audio & articles" },
        { label: "Legacy Vault", href: p("/library"), desc: "Books & searchable archive" },
        { label: "My Journey", href: p("/my-journey"), desc: "Continue where you left off" },
      ],
    },
    {
      label: s.leadership,
      href: p("/leadership"),
      mega: [
        { label: "Leadership Assessment", href: p("/leadership/assessment"), desc: "7-min diagnostic" },
        { label: "Leadership Hub", href: p("/leadership"), desc: "Pathways & courses" },
        { label: "Mentorship Tracks", href: p("/mentorship"), desc: "Apply to a cohort" },
      ],
    },
    {
      label: s.institutions,
      href: p("/institutions"),
      mega: [
        { label: "Ecosystem Map", href: p("/institutions"), desc: "The 7 institutions" },
        { label: "Ministries", href: p("/ministries"), desc: "Grow, serve, and belong" },
        { label: "Dominion Leadership Institute", href: p("/institutions/dominion-leadership-institute") },
        { label: "Dominion City", href: "https://www.dominioncity.cc" },
        { label: "Global Leadership Forum", href: p("/institutions/global-leadership-forum") },
      ],
    },
    { label: s.community, href: p("/community") },
    { label: s.events, href: p("/events") },
    { label: s.partnership, href: p("/partnership") },
  ];
}
