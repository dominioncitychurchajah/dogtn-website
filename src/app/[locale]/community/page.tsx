import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, HeartHandshake, MapPin, MessageCircle, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { communityCopy } from "@/i18n/pages/community";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = communityCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = communityCopy[loc];
  const p = (path: string) => `/${loc}${path}`;
  const cards = c.cards.length
    ? c.cards
    : communityCopy.en.cards.map((card) => ({ ...card, href: card.href }));
  const cardIcons = [CalendarDays, MapPin, HeartHandshake];

  return (
    <>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-ink-900 text-paper-0">
        <Image
          src="/images/pastor/community-vestments-auditorium.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-24"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/65 via-ink-900/82 to-ink-900" aria-hidden />
        <Container className="relative py-24 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-600/15 text-gold-400">
              <Users className="h-8 w-8" aria-hidden />
            </span>
            <p className="mt-6 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
              <Sparkles className="h-4 w-4" aria-hidden />
              {c.badge}
            </p>
            <h1 className="mt-4 text-display-l text-paper-0">{c.title}</h1>
            <p className="mt-4 text-body-l text-ink-300">{c.subtitle}</p>
            <p className="mt-6 measure text-body-m text-ink-300">{c.body}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:support@davidogbueli.org?subject=WhatsApp%20Broadcast%20Request"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-8 text-body-l font-semibold text-ink-900 shadow-elev-1 hover:bg-gold-hover"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {c.primaryCta}
              </a>
              <Link
                href={p("/events")}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-m)] border border-paper-0/30 px-8 text-body-l font-semibold text-paper-0 hover:bg-paper-0/10"
              >
                {c.secondaryCta}
                <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-0 py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cards.map((card, i) => {
              const Icon = cardIcons[i] ?? Users;
              const isExternal = card.href.startsWith("mailto:") || card.href.startsWith("http");
              const href = isExternal ? card.href : p(card.href);
              const content = (
                <>
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-gold-600/10 text-gold-hover">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="text-heading-3 text-ink-900">{card.title}</h2>
                  <p className="mt-3 flex-1 text-body-s leading-relaxed text-ink-500">{card.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-body-s font-semibold text-gold-hover">
                    {card.cta}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                  </span>
                </>
              );
              return isExternal ? (
                <a key={card.title} href={href} className="card-lift flex min-h-[260px] flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8">
                  {content}
                </a>
              ) : (
                <Link key={card.title} href={href} className="card-lift flex min-h-[260px] flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8">
                  {content}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
