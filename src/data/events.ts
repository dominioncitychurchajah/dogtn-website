import type { EventItem } from "@/data/types";

export const events: EventItem[] = [
  {
    slug: "night-of-glory-lagos",
    title: "Night of Glory: Lagos",
    type: "Conference",
    institution: "Dominion City",
    date: "2026-10-15T18:00:00.000Z",
    location: "Eko Convention Centre, Lagos, Nigeria",
    online: false,
    image: "/images/pastor/hero-night-of-glory.jpg",
    summary: "A night of intense worship, apostolic teaching, and divine transformation.",
    description:
      "Our signature evening gathering returns to Lagos. Join thousands for a night of worship, prophetic ministry, and a stirring charge from Dr. David Ogbueli. Come expectant.",
    tiers: [{ name: "General", price: 0, currency: "NGN" }],
  },
  {
    slug: "strategic-leadership-summit-2026",
    title: "Strategic Leadership Summit 2026",
    type: "Leadership",
    institution: "Global Leadership Forum",
    date: "2026-11-22T09:00:00.000Z",
    endDate: "2026-11-24T17:00:00.000Z",
    location: "Transcorp Hilton, Abuja, Nigeria",
    online: false,
    image: "/images/pastor/sermon-blue-backdrop.jpg",
    summary: "Equipping institutional heads for national and global impact.",
    description:
      "The flagship gathering of the Global Leadership Forum. Three days of keynotes, sector roundtables, and networking for leaders committed to transforming their spheres of influence.",
    tiers: [{ name: "General", price: 0, currency: "NGN" }],
  },
  {
    slug: "dli-immersion-week",
    title: "DLI Immersion Week",
    type: "Academy",
    institution: "Dominion Leadership Institute",
    date: "2026-12-05T08:00:00.000Z",
    endDate: "2026-12-09T16:00:00.000Z",
    location: "DLI Campus, Enugu, Nigeria",
    online: false,
    image: "/images/pastor/dli-conference-whiteboard.jpg",
    summary: "A deep-dive intensive into kingdom discipleship and governance.",
    description:
      "An accelerated, residential immersion in the Dominion Leadership Institute curriculum. Five days of teaching, cohort work, and mentorship designed to fast-track your formation as a leader.",
    tiers: [{ name: "General", price: 0, currency: "NGN" }],
  },
  {
    slug: "global-leaders-online-forum",
    title: "Global Leaders Online Forum",
    type: "Online",
    institution: "Global Leadership Forum",
    date: "2026-07-30T15:00:00.000Z",
    location: "Online (Worldwide)",
    online: true,
    image: "/images/pastor/sermon-blue-backdrop.jpg",
    summary: "A free livestreamed forum for leaders in every timezone.",
    description:
      "Join leaders across the world for a free, livestreamed session of teaching and dialogue on the principles of societal transformation. Register to receive the stream link.",
    tiers: [{ name: "General", price: 0, currency: "NGN" }],
  },
  {
    slug: "priesthood-restoration-retreat",
    title: "Priesthood Restoration Retreat",
    type: "Community",
    institution: "Priesthood Institute",
    date: "2026-11-13T10:00:00.000Z",
    endDate: "2026-11-16T12:00:00.000Z",
    location: "Obudu Mountain Resort, Cross River, Nigeria",
    online: false,
    image: "/images/pastor/prayer-hands-raised.jpg",
    summary: "A renewal retreat for ministers and ministry leaders.",
    description:
      "A restful, restorative retreat for ministers carrying long-term responsibility. Days of prayer, mentorship, and renewal in a serene mountain setting.",
    tiers: [{ name: "General", price: 0, currency: "NGN" }],
  },
  {
    slug: "dominion-city-london-gathering",
    title: "Dominion City London Gathering",
    type: "Community",
    institution: "Dominion City",
    date: "2026-05-24T14:00:00.000Z",
    location: "ExCeL London, United Kingdom",
    online: false,
    image: "/images/pastor/community-vestments-auditorium.jpg",
    summary: "A regional celebration for the Dominion City UK family.",
    description:
      "A past regional gathering that drew the Dominion City family across the UK for worship, teaching, and fellowship. Recordings are available in the library.",
    tiers: [{ name: "General", price: 0, currency: "USD" }],
  },
  {
    slug: "leaders-masterclass-webinar",
    title: "Leaders Masterclass Webinar",
    type: "Online",
    institution: "Dominion Leadership Institute",
    date: "2026-06-12T16:00:00.000Z",
    location: "Online (Worldwide)",
    online: true,
    image: "/images/pastor/whiteboard-5-laws-bw.jpg",
    summary: "A past masterclass on decision-making under pressure.",
    description:
      "A recorded DLI masterclass on decision-making under pressure, drawn from the Become a Leader journey. Available on demand for registered learners.",
    tiers: [{ name: "General", price: 0, currency: "USD" }],
  },
];

export function getEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export default events;
