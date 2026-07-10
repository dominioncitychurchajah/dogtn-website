import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Globe2, Heart, Landmark, Sparkles, Users } from "lucide-react";
import { Container, Section } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the story, vision, and leadership mandate behind the David Ogbueli Transformation Network.",
};

const values = [
  {
    title: "Centered on Jesus",
    body: "The life-changing message of Jesus Christ is at the heart of our worship, teaching, and outreach.",
    icon: Heart,
  },
  {
    title: "Rooted in Scripture",
    body: "The Word of God remains our foundation for faith, doctrine, leadership, and daily living.",
    icon: Sparkles,
  },
  {
    title: "Driven by Transformation",
    body: "We are committed to seeing people, institutions, communities, and nations transformed.",
    icon: Globe2,
  },
];

const initiatives = [
  "Dominion Leadership Institute: equipping principled, capable leaders.",
  "Golden Heart Foundation: empowering youth and developing future leaders.",
  "Global Missions Network: carrying the gospel and practical help to communities worldwide.",
  "Priesthood Institute: forming ministers for global impact and revival.",
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 text-paper-0">
        <Image
          src="/images/pastor/leadership-hand-raised.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" aria-hidden />
        <Container className="relative py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
              <Landmark className="h-4 w-4" aria-hidden />
              About the Network
            </span>
            <h1 className="text-display-l text-paper-0">One Family, One Purpose: Your Story Starts Here.</h1>
            <p className="mt-6 max-w-2xl text-body-l text-ink-300">
              Discover the journey of Dominion City and the David Ogbueli Transformation Network,
              from a humble beginning to a global family committed to transforming lives.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="paper">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
                Our Story
              </span>
              <h2 className="text-heading-1 text-ink-900">A Hunger for God Became a Movement</h2>
            </div>
            <div className="space-y-5 text-body-m leading-relaxed text-ink-600">
              <p>
                Dominion City began with a simple, profound hunger for God. What started in the
                early 1990s as a small campus fellowship led by David Ogbueli became a church in
                1996. From those modest beginnings, a
                movement began to grow.
              </p>
              <p>
                Today, the work has grown into a global family with chapters, institutions, and
                leadership platforms serving people across Africa, Europe, Asia, and North America.
                The heart remains the same: to share the transforming message of Jesus Christ and
                see lives and nations changed.
              </p>
              <p>
                We believe every person carries a God-given assignment. Our passion is to help you
                discover it, develop it, and live out the abundant life God designed for you.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="alt">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              What Shapes Us
            </span>
            <h2 className="text-heading-1 text-ink-900">A diverse family united by Jesus.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8">
                  <Icon className="mb-5 h-8 w-8 text-gold-hover" aria-hidden />
                  <h3 className="text-heading-3 text-ink-900">{value.title}</h3>
                  <p className="mt-3 text-body-s leading-relaxed text-ink-500">{value.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section surface="dark">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Users className="mb-5 h-10 w-10 text-gold-400" aria-hidden />
              <h2 className="text-heading-1 text-paper-0">Beyond Sunday, a family of initiatives.</h2>
              <p className="mt-4 text-body-m leading-relaxed text-ink-300">
                The mission extends into education, leadership, missions, governance, and social impact.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {initiatives.map((item) => (
                <li key={item} className="rounded-[var(--radius-l)] border border-paper-0/10 bg-paper-0/5 p-5 text-body-s text-ink-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section surface="paper">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-l)] border border-ink-100 bg-paper-50 p-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-heading-2 text-ink-900">You belong here.</h2>
              <p className="mt-2 max-w-2xl text-body-m text-ink-500">
                Whether you are exploring faith, returning to church, or seeking a spiritual family to grow with,
                there is a next step for you.
              </p>
            </div>
            <Link href={`/${loc}/community`} className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-6 text-body-m font-semibold text-ink-900 hover:bg-gold-hover">
              Connect With Us
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
