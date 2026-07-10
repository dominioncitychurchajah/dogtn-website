import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Baby, Briefcase, HeartHandshake, Mic2, ShieldCheck, Users } from "lucide-react";
import { Container, Section } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Ministries",
  description: "Find your place to grow, serve, and belong in the Dominion City family.",
};

const pathway = [
  {
    step: "01",
    title: "Belong: Find Your Foundation",
    body: "Your journey begins with belonging. Our membership and foundation pathways ground you in salvation, prayer, Scripture, and the Holy Spirit.",
  },
  {
    step: "02",
    title: "Grow: Deepen Your Roots",
    body: "Go deeper in faith, clarity of purpose, and spiritual gifts as you move from believer to thriving disciple.",
  },
  {
    step: "03",
    title: "Lead: Step Into Your Calling",
    body: "The Dominion Leadership Institute equips you with the character and practical skills to lead in church, marketplace, and nation.",
  },
  {
    step: "04",
    title: "Deploy: Make a Global Impact",
    body: "Be empowered and sent to serve, plant, lead, and bring lasting transformation wherever you are called.",
  },
];

const ministries = [
  {
    title: "DC Kidz",
    group: "Children",
    body: "A safe, joyful environment where children encounter Jesus through worship, stories, and creative play.",
    icon: Baby,
  },
  {
    title: "Youth & Singles",
    group: "Young Adults",
    body: "A Christ-centered community for students and young professionals passionately pursuing purpose.",
    icon: Users,
  },
  {
    title: "Royal Men's Club",
    group: "Men",
    body: "Monthly gatherings that equip fathers, husbands, and leaders to stand strong and make an impact.",
    icon: ShieldCheck,
  },
  {
    title: "New Eve",
    group: "Women",
    body: "A vibrant sisterhood empowering women to thrive in faith, family, calling, and influence.",
    icon: HeartHandshake,
  },
  {
    title: "Worship & Creative",
    group: "Creative",
    body: "Teams that lead worship, tell stories, and carry the message beyond the walls through media and production.",
    icon: Mic2,
  },
  {
    title: "Missions & Outreach",
    group: "Missions",
    body: "Faith in action: reaching communities, caring for the needy, and serving cities with the love of Christ.",
    icon: Briefcase,
  },
];

export default async function MinistriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <section className="bg-ink-900 text-paper-0">
        <Container className="py-24 text-center lg:py-32">
          <span className="mb-4 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
            Ministries
          </span>
          <h1 className="mx-auto max-w-4xl text-display-l text-paper-0">Find Your Place: Grow, Serve, and Belong.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-300">
            Dominion City is a place designed to help you grow from your first step in faith all
            the way to fulfilling your God-given calling.
          </p>
        </Container>
      </section>

      <Section surface="paper">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              The Dominion Pathway
            </span>
            <h2 className="text-heading-1 text-ink-900">Your Journey: From Discovery to Global Impact</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pathway.map((item) => (
              <div key={item.step} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
                <span className="text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">{item.step}</span>
                <h3 className="mt-4 text-heading-3 text-ink-900">{item.title}</h3>
                <p className="mt-3 text-body-s leading-relaxed text-ink-500">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="alt">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              Find Your People
            </span>
            <h2 className="text-heading-1 text-ink-900">A community for every season of life.</h2>
            <p className="mt-3 text-body-l text-ink-500">
              From childhood wonder to raising a family, there is a vibrant community here that understands and supports you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry) => {
              const Icon = ministry.icon;
              return (
                <div key={ministry.title} className="card-lift rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8">
                  <Icon className="mb-5 h-8 w-8 text-gold-hover" aria-hidden />
                  <p className="text-caption font-semibold uppercase tracking-[0.2em] text-ink-500">{ministry.group}</p>
                  <h3 className="mt-2 text-heading-3 text-ink-900">{ministry.title}</h3>
                  <p className="mt-3 text-body-s leading-relaxed text-ink-500">{ministry.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section surface="dark">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
                Take the First Step
              </span>
              <h2 className="text-heading-1 text-paper-0">Your place in our family awaits.</h2>
              <p className="mt-4 max-w-2xl text-body-l text-ink-300">
                Find a chapter, join a community, and step into a transformative journey. The best way to grow is to show up and engage.
              </p>
            </div>
            <Link href={`/${loc}/community`} className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-8 text-body-l font-semibold text-ink-900 hover:bg-gold-hover">
              Connect With Community
              <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
