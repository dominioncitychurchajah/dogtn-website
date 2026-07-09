import type { Institution } from "@/data/types";

export const institutions: Institution[] = [
  {
    slug: "dominion-leadership-institute",
    name: "Dominion Leadership Institute",
    shortName: "DLI",
    tagline: "Forming leaders who transform society.",
    mandate:
      "To raise a generation of principled, competent leaders equipped to bring transformation into every sphere of life — through structured training in character, vision, and capacity.",
    icon: "graduation-cap",
    heroImage: "/images/pastor/dli-conference-whiteboard.jpg",
    stats: [
      { label: "Leaders trained", value: "18,000+" },
      { label: "Nations reached", value: "24" },
      { label: "Active cohorts", value: "36" },
    ],
    programs: [
      { title: "DLI Basic", description: "The foundational eight-week leadership formation track." },
      { title: "DLI Advanced", description: "Deeper study in strategy, governance, and organisational leadership." },
      { title: "Executive Certification", description: "Capstone certification for seasoned leaders and executives." },
    ],
    ctaLabel: "Explore Leadership Training",
    ctaHref: "/leadership",
  },
  {
    slug: "dominion-city",
    name: "Dominion City",
    shortName: "Dominion City",
    tagline: "A community raising world-changers.",
    mandate:
      "To build a global family of disciples committed to spiritual growth, authentic relationship, and the practical demonstration of kingdom principles in daily life.",
    icon: "users",
    heroImage: "/images/pastor/community-vestments-auditorium.jpg",
    stats: [
      { label: "Chapters worldwide", value: "60+" },
      { label: "Cities", value: "40" },
      { label: "Weekly gatherings", value: "180+" },
    ],
    programs: [
      { title: "Weekly Gatherings", description: "Vibrant worship and teaching across our global chapters." },
      { title: "Life Groups", description: "Small-group community for discipleship and belonging." },
      { title: "Discipleship Track", description: "A structured path from new believer to established disciple." },
    ],
    ctaLabel: "Visit Dominion City",
    ctaHref: "/community",
    externalUrl: "https://www.dominioncity.cc",
  },
  {
    slug: "global-leadership-forum",
    name: "Global Leadership Forum",
    shortName: "GLF",
    tagline: "Where leaders convene to shape the future.",
    mandate:
      "To convene leaders across sectors and nations for high-level conversation, equipping, and collaboration on the transformation of society.",
    icon: "presentation",
    heroImage: "/images/pastor/hero-stadium-arms-wide.jpg",
    stats: [
      { label: "Annual delegates", value: "12,000+" },
      { label: "Summits held", value: "48" },
      { label: "Speaker nations", value: "19" },
    ],
    programs: [
      { title: "Strategic Leadership Summit", description: "Our flagship annual gathering of leaders." },
      { title: "Sector Roundtables", description: "Focused sessions for business, government, and media leaders." },
      { title: "Global Broadcasts", description: "Livestreamed forums reaching leaders in every timezone." },
    ],
    ctaLabel: "See Upcoming Events",
    ctaHref: "/events",
  },
  {
    slug: "golden-heart-foundation",
    name: "Golden Heart Foundation",
    shortName: "Golden Heart",
    tagline: "Compassion that restores dignity.",
    mandate:
      "To meet human need with practical compassion — through relief, education, healthcare, and empowerment initiatives that restore dignity and unlock potential.",
    icon: "heart-handshake",
    heroImage: "/images/pastor/prayer-hands-raised.jpg",
    stats: [
      { label: "Lives touched", value: "250,000+" },
      { label: "Scholarships", value: "3,400" },
      { label: "Outreach projects", value: "120" },
    ],
    programs: [
      { title: "Scholarship Fund", description: "Educational support for underserved students." },
      { title: "Medical Outreaches", description: "Free healthcare missions across communities." },
      { title: "Empowerment Grants", description: "Seed capital and skills for micro-entrepreneurs." },
    ],
    ctaLabel: "Give & Get Involved",
    ctaHref: "/give",
  },
  {
    slug: "priesthood-institute",
    name: "Priesthood Institute",
    shortName: "Priesthood",
    tagline: "Mentoring ministers for a lifetime of service.",
    mandate:
      "To mentor ministers and ministry leaders in the disciplines of the priestly calling — depth, integrity, and the stewardship of a sacred trust.",
    icon: "flame",
    heroImage: "/images/pastor/preaching-purple-lit.jpg",
    stats: [
      { label: "Ministers mentored", value: "5,600+" },
      { label: "Ordination classes", value: "22" },
      { label: "Mentor faculty", value: "40" },
    ],
    programs: [
      { title: "Ministry Leaders Mentorship", description: "Cohort mentorship for practising ministers." },
      { title: "Ordination Track", description: "Formation and accreditation for the ordained ministry." },
      { title: "Restoration Retreats", description: "Renewal for leaders carrying long-term responsibility." },
    ],
    ctaLabel: "Apply for Mentorship",
    ctaHref: "/mentorship",
  },
  {
    slug: "global-missions-network",
    name: "Global Missions Network",
    shortName: "GMN",
    tagline: "Taking transformation to the unreached.",
    mandate:
      "To mobilise, resource, and deploy missionaries and church planters to unreached communities, establishing enduring works that disciple nations.",
    icon: "globe",
    heroImage: "/images/pastor/hero-night-of-glory.jpg",
    stats: [
      { label: "Missionaries sent", value: "1,200+" },
      { label: "Church plants", value: "480" },
      { label: "Fields active", value: "31" },
    ],
    programs: [
      { title: "Church Planting", description: "Establishing new works in unreached regions." },
      { title: "Missionary Care", description: "Support and resourcing for those on the field." },
      { title: "Regional Hubs", description: "Training and sending centres across the continents." },
    ],
    ctaLabel: "Support the Mission",
    ctaHref: "/give",
  },
  {
    slug: "publishing-ecosystem",
    name: "Publishing Ecosystem",
    shortName: "Publishing",
    tagline: "Words that build leaders and nations.",
    mandate:
      "To capture, produce, and distribute the teachings that form leaders — through books, study resources, and digital media that outlast the moment.",
    icon: "book-open",
    heroImage: "/images/pastor/ecosystem-side-profile.jpg",
    stats: [
      { label: "Titles published", value: "45" },
      { label: "Copies in circulation", value: "600,000+" },
      { label: "Languages", value: "8" },
    ],
    programs: [
      { title: "Book Publishing", description: "Flagship titles on wisdom, wealth, and leadership." },
      { title: "Study Resources", description: "Companion guides and curricula for the teachings." },
      { title: "Digital Library", description: "On-demand access to the full teaching archive." },
    ],
    ctaLabel: "Visit the Library",
    ctaHref: "/library",
  },
];

export function getInstitution(slug: string): Institution | undefined {
  return institutions.find((i) => i.slug === slug);
}

export default institutions;
