import type { Locale } from "@/i18n/config";

export interface NavStrings {
  startHere: string;
  teachings: string;
  media: string;
  leadership: string;
  mentorship: string;
  ministry: string;
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
      label: "About",
      href: p("/his-story"),
      mega: [
        { label: "His Story", href: p("/his-story"), desc: "The man, the mandate, the mission" },
        { label: "The Ministries", href: p("/ministry"), desc: "Global network overview" },
        { label: "Take the Leadership Assessment", href: p("/leadership/assessment"), desc: "7-minute free assessment" },
      ],
    },
    { label: s.mentorship, href: p("/mentorship") },
    {
      label: "Books",
      href: p("/books"),
      mega: [
        { label: "All Books", href: p("/books"), desc: "Complete library" },
        { label: "Pillars of Solomon's Wealth", href: p("/books/the-pillars-of-solomons-wealth"), desc: "Generational abundance" },
        { label: "Jewish Secrets of Wealth Creation", href: p("/books/the-jewish-secrets-of-wealth-creation"), desc: "Covenant increase" },
        { label: "The Laws of Proper Speech", href: p("/books/the-laws-of-proper-speech"), desc: "The power of words" },
      ],
    },
    { label: s.media, href: p("/media") },
    { label: s.partnership, href: p("/partnership") },
    { label: "Contact", href: p("/contact") },
  ];
}
