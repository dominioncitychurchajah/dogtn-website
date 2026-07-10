import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Baby, CalendarDays, Car, Clock, MapPin, MessageCircle, Shirt } from "lucide-react";
import { Container, Section } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: "Service time, location, parking, and what to expect when you visit Dominion City Ajah.",
};

const details = [
  {
    title: "Service Time",
    body: "Join us this Sunday at 8:00 AM GMT+1. Arrive a little early so the welcome team can help you settle in.",
    icon: Clock,
  },
  {
    title: "Location",
    body: "Dominion City Auditorium, Lekki-Epe Expressway, Ajah, Lagos.",
    icon: MapPin,
  },
  {
    title: "Parking",
    body: "Free and secure parking is available. Our team will direct you when you arrive.",
    icon: Car,
  },
  {
    title: "Children & Family",
    body: "Families are welcome. Ask the welcome team where children and family seating support is available.",
    icon: Baby,
  },
  {
    title: "What to Wear",
    body: "Come as you are. You will see everything from smart casual to traditional attire.",
    icon: Shirt,
  },
  {
    title: "Need Help?",
    body: "Email us before you come and we will help you find the right next step.",
    icon: MessageCircle,
  },
];

export default async function VisitPage({
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
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
            <CalendarDays className="h-4 w-4" aria-hidden />
            Plan Your Visit
          </span>
          <h1 className="mx-auto max-w-4xl text-display-l text-paper-0">Your First Visit Should Feel Simple</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-300">
            We know visiting a new gathering can feel like a big step. Here is what to expect before you arrive.
          </p>
        </Container>
      </section>

      <Section surface="paper">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {details.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8">
                  <Icon className="mb-5 h-8 w-8 text-gold-hover" aria-hidden />
                  <h2 className="text-heading-3 text-ink-900">{item.title}</h2>
                  <p className="mt-3 text-body-s leading-relaxed text-ink-500">{item.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section surface="alt">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-1 text-ink-900">Tell us you are coming.</h2>
            <p className="mt-4 text-body-l text-ink-500">
              Send a quick note and we will help you with arrival, questions, and the best next step for your visit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:support@davidogbueli.org?subject=First%20Visit%20Request"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-8 text-body-l font-semibold text-ink-900 hover:bg-gold-hover"
              >
                Email the Welcome Team
                <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
              </a>
              <Link
                href={`/${loc}/community`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-8 text-body-l font-semibold text-ink-900 hover:bg-paper-50"
              >
                Explore Community
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
