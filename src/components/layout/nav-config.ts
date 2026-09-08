import type { LucideIcon } from "lucide-react";
import { Feather, Globe, GraduationCap, Landmark } from "lucide-react";
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
  /** Rendered in the icon tile. Ignored when `image` is set. */
  icon?: LucideIcon;
  /** Book cover / portrait thumbnail, shown instead of the icon tile. */
  image?: string;
}

export interface MegaColumn {
  title: string;
  links: MegaLink[];
}

/** Dark promo card that anchors the right side of a mega panel. */
export interface MegaFeature {
  eyebrow: string;
  title: string;
  desc: string;
  meta?: string;
  cta: string;
  href: string;
  /** Single photo, bled to the right edge behind a gradient scrim. */
  image?: string;
  /** Fanned book covers, front-most first. Takes precedence over `image`. */
  stack?: string[];
}

export interface MegaPanel {
  title: string;
  links: MegaLink[];
  feature?: MegaFeature;
  columns?: MegaColumn[];
}

export interface NavGroup {
  label: string;
  href: string;
  panel?: MegaPanel;
}

export function buildNav(locale: Locale, s: NavStrings): NavGroup[] {
  const p = (path: string) => `/${locale}${path}`;
  return [
    { label: s.startHere, href: p("/start-here") },
    {
      label: "About",
      href: p("/his-story"),
      panel: {
        title: "The Ministry",
        links: [
          { label: "His Story", href: p("/his-story"), desc: "The man, the mandate, the mission", icon: Feather },
          { label: "The Ministries", href: p("/ministry"), desc: "One vision carried by many arms", icon: Landmark },
          { label: "Dominion Leadership Institute", href: p("/institutions/dli"), desc: "Character and Kingdom influence, trained", icon: GraduationCap },
          { label: "Global Missions Network", href: p("/institutions/global-missions-network"), desc: "Churches and planters across nations", icon: Globe },
        ],
        feature: {
          eyebrow: "Start here",
          title: "The Leadership Assessment",
          desc: "Ten questions that place you on the right track before you commit to a program.",
          meta: "10 questions · free",
          cta: "Take the assessment",
          href: p("/leadership/assessment"),
          image: "/images/pastor/leadership-hand-raised.jpg",
        },
        columns: [
          {
            title: "Engage",
            links: [
              { label: "Mentorship", href: p("/mentorship") },
              { label: "Partnership", href: p("/partnership") },
              { label: "Contact", href: p("/contact") },
            ],
          },
          {
            title: "Explore",
            links: [
              { label: "Start Here", href: p("/start-here") },
              { label: "Media Center", href: p("/media") },
              { label: "Books", href: p("/books") },
            ],
          },
        ],
      },
    },
    { label: s.mentorship, href: p("/mentorship") },
    {
      label: "Books",
      href: p("/books"),
      panel: {
        title: "Featured titles",
        links: [
          { label: "The Pillars of Solomon's Wealth", href: p("/books/the-pillars-of-solomons-wealth"), desc: "Timeless secrets of generational abundance", image: "/images/books/the-pillars-of-solomons-wealth.webp" },
          { label: "The Jewish Secrets of Wealth Creation", href: p("/books/the-jewish-secrets-of-wealth-creation"), desc: "Covenant principles for generational increase", image: "/images/books/the-jewish-secrets-of-wealth-creation.webp" },
          { label: "The Laws of Proper Speech", href: p("/books/the-laws-of-proper-speech"), desc: "How disciplined language builds a leader's future", image: "/images/books/the-laws-of-proper-speech.webp" },
          { label: "Discipleship Codes", href: p("/books/discipleship-codes"), desc: "Raising transformational leaders", image: "/images/books/discipleship-codes.webp" },
        ],
        feature: {
          eyebrow: "Flagship titles",
          title: "Where most readers begin",
          desc: "Wealth, covenant, and the discipline of words — the three books that carry the core of the teaching.",
          meta: "Three books · one foundation",
          cta: "Browse the library",
          href: p("/books"),
          stack: [
            "/images/books/the-pillars-of-solomons-wealth.webp",
            "/images/books/the-jewish-secrets-of-wealth-creation.webp",
            "/images/books/the-laws-of-proper-speech.webp",
          ],
        },
        columns: [
          {
            title: "The library",
            links: [
              { label: "All Books", href: p("/books") },
              { label: "Praying Through the Gates of Time", href: p("/books/praying-through-the-gates-of-time") },
              { label: "The Love Revolution", href: p("/books/the-love-revolution") },
            ],
          },
          {
            title: "Go further",
            links: [
              { label: "Mentorship tracks", href: p("/mentorship") },
              { label: "Media Center", href: p("/media") },
              { label: "Start Here", href: p("/start-here") },
            ],
          },
        ],
      },
    },
    { label: s.media, href: p("/media") },
    { label: s.partnership, href: p("/partnership") },
    { label: "Contact", href: p("/contact") },
  ];
}
