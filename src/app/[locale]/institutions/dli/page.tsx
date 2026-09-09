import Link from "next/link";
import type { Metadata } from "next";
import { Shield, ArrowRight, Quote, Globe, Users, Video, Phone, Compass, BookOpen } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Section, Container, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/cards/StatCard";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "institutions/dli",
    title: "Dominion Leadership Institute",
    description: "The training and human-development arm of Dominion City — equipping Christian leaders, professionals, and youth with the character, capacity, and competence to transform society.",
  });
}

// Apply-by-phone (Nigeria line, from site footer).
const APPLY_PHONE_DISPLAY = "+234 803 550 8230";
const APPLY_PHONE_TEL = "+2348035508230";

// All page CTAs funnel to the next-cohort waitlist.
const WAITLIST_HREF = "#waitlist";

// ponytail: English-only copy for v1 — page is locale-aware for links/nav, body
// text is English for every locale. Campus images are real DLI graduation photos;
// add Pastor Oke's portrait when supplied.
const IMG = {
  hero: "/images/dli/graduation-hall.jpg",
  story: "/images/pastor/dli-conference-whiteboard.jpg",
  campusMain: "/images/dli/graduation-group.jpg",
  campusTile1: "/images/dli/graduation-hall.jpg",
  campusTile2: "/images/ministries/dominion-leadership-institute.jpg",
  president: "/images/pastor/sermon-blue-backdrop.jpg",
};

const STATS = [
  { value: "30,000+", label: "Graduates" },
  { value: "Local & Int'l", label: "Chapters" },
  { value: "Every Sphere", label: "Of Impact" },
];

// Two-course structure per DLI.
const PROGRAMS = [
  {
    tier: "Foundational",
    name: "Basic Certificate Course",
    body: "Foundational character development, personal spiritual growth, and the core values of life and success.",
    featured: false,
  },
  {
    tier: "Marketplace & Ministry",
    name: "Advanced Certificate Course",
    body: "Marketplace and ministry effectiveness — strategy for leadership, career success, wealth creation, team building, and branding.",
    featured: true,
  },
];

// Key focus areas.
const FOCUS = [
  {
    icon: Compass,
    title: "Transformational Leadership",
    body: "Equipping individuals to lead in diverse sectors — business, politics, ministry, and governance.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    body: "Tens of thousands of graduates raised across local and international Dominion City chapters.",
  },
  {
    icon: BookOpen,
    title: "Practical Curriculum",
    body: "From the authority of the believer to strategic planning, health management, and financial stewardship.",
  },
];

// ponytail: placeholder testimonies — African leaders across the continent.
// Swap names/quotes for real graduate testimonies before publishing.
const TESTIMONIES = [
  {
    quote:
      "DLI didn't just train me — it re-formed my sense of responsibility. I lead now to serve my community, not to be seen.",
    name: "Chidi Okafor",
    role: "Lead Pastor · Lagos, Nigeria",
    badge: "Leader Stage Graduate",
  },
  {
    quote:
      "I came in running a small business. I left governing it with character, clarity, and Kingdom conviction.",
    name: "Amara Mensah",
    role: "Entrepreneur · Accra, Ghana",
    badge: "Advanced Cohort",
  },
  {
    quote:
      "The Institute gave me a framework for nation-building that holds up under real pressure back home.",
    name: "Emmanuel Kato",
    role: "Public Servant · Kampala, Uganda",
    badge: "Executive Fellow",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w && !w.endsWith("."))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default async function DLIPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const p = (path: string) => `/${loc}${path}`;
  const contactHref = p("/contact");

  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-ink-900 text-paper-0">
        <img
          src={IMG.hero}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
        <Container className="relative z-10 text-center">
          <Shield className="mx-auto mb-6 h-16 w-16 text-gold-600" fill="currentColor" strokeWidth={1} />
          <p className="mb-4 text-caption font-semibold uppercase tracking-[0.3em] text-gold-600">
            Institution
          </p>
          <h1 className="mx-auto max-w-4xl text-display-l md:text-display-xl gravity-text">
            Dominion Leadership Institute
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-100">
            Equipping leaders with character, capacity, competence, and Kingdom responsibility.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={WAITLIST_HREF} size="l">
              Join the Waitlist
            </Button>
          </div>
          <a
            href={`tel:${APPLY_PHONE_TEL}`}
            className="mt-6 inline-flex items-center gap-2 text-body-s font-semibold text-ink-100 hover:text-gold-400"
          >
            <Phone className="h-4 w-4" /> Call to apply: {APPLY_PHONE_DISPLAY}
          </a>
        </Container>
      </header>

      {/* Impact stats */}
      <Section surface="alt" className="py-12 sm:py-12 lg:py-14">
        <Container>
          <div className="grid grid-cols-3 gap-y-8 md:divide-x md:divide-ink-100">
            {STATS.map((s) => (
              <div key={s.label} className="md:px-4">
                <StatCard value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* About DLI */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="space-y-6">
              <span className="block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
                About DLI
              </span>
              <h2 className="text-heading-1">A Legacy of Transformation</h2>
              <div className="h-1 w-16 bg-gold-600" />
              <p className="text-body-l text-ink-500">
                The Dominion Leadership Institute (DLI) is the training and human-development arm of
                Dominion City, the international church network founded by Rev. Dr. David Ogbueli. DLI
                trains Christian leaders, professionals, and young people to gain the practical,
                spiritual, and organizational skills to impact every sphere of society.
              </p>
              <p className="text-body-m text-ink-500">
                Through a practical curriculum — from the authority of the believer to strategic
                planning, health management, and financial stewardship — DLI has raised tens of
                thousands of graduates across local and international chapters, leaders who transform
                business, politics, ministry, and governance for the common good of nations.
              </p>
              <Link
                href={p("/his-story")}
                className="inline-flex w-fit items-center gap-2 text-body-s font-semibold uppercase tracking-wider text-gold-hover hover:text-gold-600"
              >
                Our History <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -right-4 -top-4 hidden h-full w-full border border-gold-600/20 md:block" />
              <img
                src={IMG.story}
                alt="A DLI leadership cohort session."
                className="relative aspect-[4/5] w-full rounded-[var(--radius-l)] object-cover shadow-elev-4"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Key focus areas */}
      <Section surface="alt">
        <Container>
          <SectionHeading align="center" title="Key Focus Areas" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FOCUS.map((f) => (
              <div
                key={f.title}
                className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1"
              >
                <f.icon className="mb-4 h-9 w-9 text-gold-600" strokeWidth={1.5} />
                <h3 className="text-heading-3">{f.title}</h3>
                <p className="mt-2 text-body-m text-ink-500">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section surface="dark">
        <Container>
          <SectionHeading
            align="center"
            dark
            title="Academic Programs"
            intro="Two certificate courses designed to meet leaders at every stage of their growth journey."
          />
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.name}
                className="flex flex-col rounded-[var(--radius-l)] bg-paper-0 p-8 text-ink-900 shadow-elev-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-elev-4 lg:p-10"
              >
                <p className="mb-4 text-body-s font-semibold uppercase tracking-widest text-gold-hover">
                  {prog.tier}
                </p>
                <h3 className="text-heading-2">{prog.name}</h3>
                <p className="mb-8 mt-3 flex-1 text-body-m text-ink-500">{prog.body}</p>
                <Button
                  href={WAITLIST_HREF}
                  variant={prog.featured ? "primary" : "secondary"}
                  className="mt-auto w-full"
                >
                  Join the Waitlist
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Faculty */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-heading-1">Faculty</h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-gold-600" />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              { name: "Dr. David Ogbueli", role: "President", img: IMG.president as string | null },
              { name: "Pastor Oke", role: "Principal", img: null as string | null },
            ].map((f) => (
              <div key={f.name} className="group">
                <div className="mb-5 aspect-[3/4] overflow-hidden rounded-[var(--radius-l)]">
                  {f.img ? (
                    <img
                      src={f.img}
                      alt={`${f.name}, ${f.role}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-100">
                      <span className="font-display text-display-l text-gold-hover">
                        {initials(f.name)}
                      </span>
                      <span className="text-caption uppercase tracking-widest text-ink-500">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-heading-3">{f.name}</h3>
                <p className="mt-1 text-body-s uppercase tracking-wider text-ink-500">{f.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Campus gallery */}
      <Section surface="alt">
        <Container>
          <h2 className="mb-10 text-heading-1">The Campus Experience</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6 lg:h-[600px]">
            <div className="overflow-hidden rounded-[var(--radius-l)] md:col-span-8">
              <img
                src={IMG.campusMain}
                alt="A Dominion Leadership Institute graduation."
                className="h-64 w-full object-cover transition-transform duration-1000 hover:scale-105 md:h-full"
              />
            </div>
            <div className="flex flex-col gap-4 md:col-span-4 md:gap-6">
              <div className="flex-1 overflow-hidden rounded-[var(--radius-l)]">
                <img
                  src={IMG.campusTile1}
                  alt="DLI graduates gathered for commencement."
                  className="h-48 w-full object-cover transition-transform duration-1000 hover:scale-105 md:h-full"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-[var(--radius-l)]">
                <img
                  src={IMG.campusTile2}
                  alt="The Dominion Leadership Institute."
                  className="h-48 w-full object-cover transition-transform duration-1000 hover:scale-105 md:h-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonies */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-heading-1">Testimonies</h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-gold-600" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIES.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1"
              >
                <Quote className="mb-4 h-8 w-8 text-gold-600" />
                <blockquote className="flex-1 text-body-m italic text-ink-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-ink-100 pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-600/15 font-display text-heading-3 text-gold-hover">
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="text-body-s font-semibold text-ink-900">{t.name}</p>
                    <p className="text-caption text-ink-500">{t.role}</p>
                  </div>
                </figcaption>
                <span className="mt-4 w-fit rounded-full bg-gold-600/10 px-3 py-1 text-caption font-semibold uppercase tracking-widest text-gold-hover">
                  {t.badge}
                </span>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA band */}
      <Section surface="dark" className="py-16 lg:py-20">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-start">
            <div>
              <h2 className="text-heading-1 text-paper-0">Ready to begin your journey?</h2>
              <p className="mt-2 text-body-m text-ink-300">
                Enrollment for the next DLI cohort opens soon — join the waitlist to be the first to
                know.
              </p>
            </div>
            <Button href={WAITLIST_HREF} size="l" className="whitespace-nowrap">
              Join the Waitlist
            </Button>
          </div>
        </Container>
      </Section>

      {/* Waitlist */}
      <Section surface="alt" id="waitlist" className="scroll-mt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading-2">Join the Next Cohort Waitlist</h2>
            <p className="mx-auto mt-3 max-w-xl text-body-m text-ink-500">
              Cohorts open on a rolling basis. Add your email and we&rsquo;ll notify you the moment
              enrollment for the next intake opens.
            </p>
            {/* ponytail: static export = no server action; mailto opens the visitor's
                mail client. Wire to a real endpoint for automated waitlist capture. */}
            <form
              action="mailto:mail@davidogbueli.org?subject=DLI%20Waitlist"
              method="post"
              encType="text/plain"
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="dli-waitlist" className="sr-only">
                Email address
              </label>
              <input
                id="dli-waitlist"
                name="Email"
                type="email"
                required
                placeholder="your@email.com"
                className="h-11 w-full rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-4 text-body-m text-ink-900 placeholder-ink-300 focus:border-gold-600 focus:ring-0"
              />
              <Button type="submit" className="whitespace-nowrap">
                Join Waitlist
              </Button>
            </form>
          </div>
        </Container>
      </Section>

      {/* Enrollment / contact */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-8 text-heading-2">Inquire for Enrollment</h2>
              {/* ponytail: mailto form — see waitlist note. */}
              <form
                action="mailto:mail@davidogbueli.org?subject=DLI%20Enrollment%20Inquiry"
                method="post"
                encType="text/plain"
                className="space-y-6"
              >
                <div className="border-b border-ink-300 py-2">
                  <label htmlFor="dli-name" className="block text-caption uppercase text-ink-500">
                    Full Name
                  </label>
                  <input
                    id="dli-name"
                    name="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border-none bg-transparent p-0 text-body-m text-ink-900 placeholder-ink-300 focus:ring-0"
                  />
                </div>
                <div className="border-b border-ink-300 py-2">
                  <label htmlFor="dli-email" className="block text-caption uppercase text-ink-500">
                    Email Address
                  </label>
                  <input
                    id="dli-email"
                    name="Email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border-none bg-transparent p-0 text-body-m text-ink-900 placeholder-ink-300 focus:ring-0"
                  />
                </div>
                <div className="border-b border-ink-300 py-2">
                  <label htmlFor="dli-program" className="block text-caption uppercase text-ink-500">
                    Course of Interest
                  </label>
                  <select
                    id="dli-program"
                    name="Course of Interest"
                    className="w-full border-none bg-transparent p-0 text-body-m text-ink-900 focus:ring-0"
                  >
                    <option>Basic Certificate Course</option>
                    <option>Advanced Certificate Course</option>
                  </select>
                </div>
                <Button type="submit">Submit Inquiry</Button>
              </form>
            </div>
            <div className="flex flex-col justify-center gap-10">
              <div>
                <p className="mb-2 text-body-s font-semibold uppercase tracking-[0.2em] text-gold-hover">
                  Call to Apply
                </p>
                <a
                  href={`tel:${APPLY_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 text-heading-3 text-ink-900 hover:text-gold-hover"
                >
                  <Phone className="h-5 w-5 text-gold-600" /> {APPLY_PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="mb-2 text-body-s font-semibold uppercase tracking-[0.2em] text-gold-hover">
                  Direct Contact
                </p>
                <a
                  href="mailto:mail@davidogbueli.org"
                  className="text-heading-3 text-ink-900 hover:text-gold-hover"
                >
                  mail@davidogbueli.org
                </a>
              </div>
              <div>
                <p className="mb-4 text-body-s font-semibold uppercase tracking-[0.2em] text-gold-hover">
                  Prefer to talk first?
                </p>
                <Button href={contactHref} variant="secondary">
                  Contact the Team
                </Button>
              </div>
              <div>
                <p className="mb-4 text-body-s font-semibold uppercase tracking-[0.2em] text-gold-hover">
                  Social Ecosystem
                </p>
                <div className="flex gap-4">
                  {[Globe, Users, Video].map((Icon, i) => (
                    <span
                      key={i}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-100 text-ink-500"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
