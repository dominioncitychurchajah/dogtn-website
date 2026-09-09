import type { Metadata } from "next";
import {
  Globe,
  Users,
  Church,
  Building2,
  Handshake,
  GraduationCap,
  Heart,
  PlayCircle,
  Radio,
  Calendar,
  ArrowRight,
  Phone,
} from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Section, Container, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "institutions/global-missions-network",
    title: "Global Missions Network",
    description: "A Kingdom relationship network for pastors, founders, and heads of ministries and organizations — to serve, collaborate, receive mentorship, and engage directly with Dr. David Ogbueli.",
  });
}

const APPLY_PHONE_DISPLAY = "+234 803 550 8230";
const APPLY_PHONE_TEL = "+2348035508230";
const JOIN_HREF = "#join";

const IMG = {
  hero: "/images/ministries/global-missions-network.jpg",
  about: "/images/pastor/whiteboard-5-laws-bw.jpg",
};

// Who the Network is for.
const AUDIENCE = [
  { icon: Church, title: "Pastors & Church Leaders", body: "Those shepherding congregations and carrying spiritual responsibility." },
  { icon: Users, title: "Ministry Leaders", body: "Leaders driving ministries, movements, and Kingdom initiatives." },
  { icon: Building2, title: "Founders & Heads of Organizations", body: "Those who build and govern institutions and enterprises." },
  { icon: Globe, title: "Leaders from Other Churches & Ministries", body: "Kingdom leaders beyond one network, ready to build together." },
];

// What members gain.
const GAINS = [
  { icon: GraduationCap, title: "Mentorship & Access", body: "Direct engagement and mentorship with Dr. David Ogbueli." },
  { icon: Globe, title: "Global Relationships", body: "Connect with Kingdom leaders and ministries across nations." },
  { icon: Handshake, title: "Collaboration & Service", body: "Serve, volunteer, and advance the mission together." },
  { icon: Heart, title: "Leadership Development", body: "Grow through the Global Executive Training pathway." },
];

// Hybrid, non-cohort training model.
const MODEL = [
  { icon: PlayCircle, title: "Pre-Recorded Classes", body: "Learn at your own pace from a growing library of recorded mentorship and training sessions." },
  { icon: Radio, title: "Past Live Classes", body: "Access recordings of the live sessions Dr. David has already hosted." },
  { icon: Calendar, title: "Future Live Classes", body: "Join upcoming live sessions Dr. David will host, as they are scheduled." },
];

// Three levels of one journey — NOT three cohorts.
const TRAINING = [
  { level: "I", body: "Foundations of Kingdom leadership, character, and calling." },
  { level: "II", body: "Strategy, influence, and marketplace-and-ministry effectiveness." },
  { level: "III", body: "Multiplication, legacy, and advancing the mission globally." },
];

const JOURNEY = [
  "Join the Network",
  "Mentorship Access (Waitlist)",
  "Global Executive Training I",
  "II",
  "III",
];

export default async function GlobalMissionsNetworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const p = (path: string) => `/${loc}${path}`;

  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-ink-900 text-paper-0">
        <img src={IMG.hero} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
        <Container className="relative z-10 text-center">
          <Globe className="mx-auto mb-6 h-16 w-16 text-gold-600" strokeWidth={1.25} />
          <p className="mb-4 text-caption font-semibold uppercase tracking-[0.3em] text-gold-600">The Network</p>
          <h1 className="mx-auto max-w-4xl text-display-l md:text-display-xl gravity-text">Global Missions Network</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-100">
            A Kingdom relationship network for pastors, founders, and heads of ministries and
            organizations — to serve, collaborate, receive mentorship, and engage directly with Dr.
            David Ogbueli.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={JOIN_HREF} size="l">
              Join the Global Missions Network
            </Button>
            <Button
              href="#training"
              size="l"
              variant="secondary"
              className="border-gold-600 bg-transparent text-gold-600 hover:bg-gold-600/10"
            >
              See the Training Pathway
            </Button>
          </div>
        </Container>
      </header>

      {/* What it is — positioning */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="space-y-6">
              <span className="block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
                What It Is
              </span>
              <h2 className="text-heading-1">More Than Membership — A Kingdom Relationship Network</h2>
              <div className="h-1 w-16 bg-gold-600" />
              <p className="text-body-l text-ink-500">
                The Global Missions Network is not a course to complete or a subscription to buy. It
                is a network of leaders — pastors, church and ministry leaders, founders, and heads
                of organizations — who carry Kingdom responsibility and want to build together.
              </p>
              <p className="text-body-m text-ink-500">
                Inside the Network you gain access to mentorship, global ministry relationships, and
                leadership development — and the opportunity to serve and collaborate directly with
                Dr. David Ogbueli in advancing God&rsquo;s Kingdom.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -right-4 -top-4 hidden h-full w-full border border-gold-600/20 md:block" />
              <img
                src={IMG.about}
                alt="Dr. David Ogbueli teaching at a leadership session."
                className="relative aspect-[4/5] w-full rounded-[var(--radius-l)] object-cover shadow-elev-4"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section surface="alt">
        <Container>
          <SectionHeading align="center" eyebrow="Who It's For" title="Built for Leaders Who Carry Weight" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1">
                <a.icon className="mb-4 h-9 w-9 text-gold-600" strokeWidth={1.5} />
                <h3 className="text-heading-3">{a.title}</h3>
                <p className="mt-2 text-body-m text-ink-500">{a.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What you gain */}
      <Section>
        <Container>
          <SectionHeading align="center" eyebrow="Inside the Network" title="What You Gain" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GAINS.map((g) => (
              <div key={g.title} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1">
                <g.icon className="mb-4 h-9 w-9 text-gold-600" strokeWidth={1.5} />
                <h3 className="text-heading-3">{g.title}</h3>
                <p className="mt-2 text-body-m text-ink-500">{g.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mentorship model — hybrid, NOT cohort */}
      <Section surface="dark">
        <Container>
          <SectionHeading
            align="center"
            dark
            eyebrow="How the Training Works"
            title="An Ongoing Mentorship Experience — Not a Cohort"
            intro="There is no single scheduled cohort to wait for. As part of the Network you gain access to a growing library and a living calendar of mentorship."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {MODEL.map((m) => (
              <div key={m.title} className="rounded-[var(--radius-l)] bg-paper-0 p-8 text-ink-900 shadow-elev-2 lg:p-10">
                <m.icon className="mb-4 h-9 w-9 text-gold-600" strokeWidth={1.5} />
                <h3 className="text-heading-3">{m.title}</h3>
                <p className="mt-2 text-body-m text-ink-500">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global Executive Training I / II / III */}
      <Section id="training" className="scroll-mt-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The Pathway"
            title="Global Executive Training"
            intro="The mentorship pathway unfolds in three progressive levels — not three separate cohorts, but three stages of one journey."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TRAINING.map((t) => (
              <div
                key={t.level}
                className="flex flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1 lg:p-10"
              >
                <span className="font-display text-display-l text-gold-600">{t.level}</span>
                <h3 className="mt-2 text-heading-3">Global Executive Training {t.level}</h3>
                <p className="mt-2 text-body-m text-ink-500">{t.body}</p>
              </div>
            ))}
          </div>

          {/* Journey flow */}
          <div className="mt-14">
            <p className="mb-5 text-center text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              The Journey
            </p>
            <ol className="flex flex-col flex-wrap items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              {JOURNEY.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="rounded-[var(--radius-m)] border border-ink-100 bg-paper-50 px-4 py-2 text-center text-body-s font-semibold text-ink-900">
                    {step}
                  </span>
                  {i < JOURNEY.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-gold-600 sm:block rtl:rotate-180" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Join / waitlist */}
      <Section surface="alt" id="join" className="scroll-mt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading-2">Join the Global Missions Network</h2>
            <p className="mx-auto mt-3 max-w-xl text-body-m text-ink-500">
              Add your details to be placed on the mentorship access list. We&rsquo;ll reach out with
              your next step into the Network and the Global Executive Training.
            </p>
            {/* ponytail: static export = no server action; mailto opens the visitor's mail
                client. Wire to a real endpoint if automated capture is added later. */}
            <form
              action="mailto:mail@davidogbueli.org?subject=Global%20Missions%20Network"
              method="post"
              encType="text/plain"
              className="mx-auto mt-8 max-w-lg space-y-4 text-start"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="gmn-name" className="mb-1 block text-caption uppercase text-ink-500">
                    Full Name
                  </label>
                  <input
                    id="gmn-name"
                    name="Full Name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-11 w-full rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-4 text-body-m text-ink-900 placeholder-ink-300 focus:border-gold-600 focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="gmn-email" className="mb-1 block text-caption uppercase text-ink-500">
                    Email Address
                  </label>
                  <input
                    id="gmn-email"
                    name="Email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="h-11 w-full rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-4 text-body-m text-ink-900 placeholder-ink-300 focus:border-gold-600 focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gmn-role" className="mb-1 block text-caption uppercase text-ink-500">
                  Your Role
                </label>
                <input
                  id="gmn-role"
                  name="Role / Organization"
                  type="text"
                  placeholder="e.g. Lead Pastor, Founder, Ministry Head"
                  className="h-11 w-full rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-4 text-body-m text-ink-900 placeholder-ink-300 focus:border-gold-600 focus:ring-0"
                />
              </div>
              <Button type="submit" size="l" className="w-full">
                Join the Global Missions Network
              </Button>
            </form>
            <a
              href={`tel:${APPLY_PHONE_TEL}`}
              className="mt-6 inline-flex items-center gap-2 text-body-s font-semibold text-ink-500 hover:text-gold-hover"
            >
              <Phone className="h-4 w-4 text-gold-600" /> Prefer to talk? Call {APPLY_PHONE_DISPLAY}
            </a>
            <p className="mt-8 text-body-s text-ink-500">
              Part of the wider{" "}
              <a href={p("/ministry")} className="font-semibold text-gold-hover hover:underline">
                Dominion City ministries ecosystem
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
