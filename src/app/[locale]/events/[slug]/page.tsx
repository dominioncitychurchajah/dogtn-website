import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Globe, CalendarDays, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { events, getEvent } from "@/data/events";
import { Container } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";
import { EventRegistration } from "@/components/forms/EventRegistration";
import { formatDate, dateParts } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const event = getEvent(slug);
  if (!event) notFound();

  const { day, monthLong, year } = dateParts(event.date);

  const schedule = [
    { id: "s1", question: "Opening & Worship", answer: "Doors open, pre-service worship and welcome." },
    { id: "s2", question: "Main Session", answer: `Keynote teaching and ministration — ${event.institution}.` },
    { id: "s3", question: "Breakout & Networking", answer: "Facilitated cohorts, Q&A, and connection." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-900 text-paper-0">
        <div className="absolute inset-0">
          <Image src={event.image} alt="" fill sizes="100vw" className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/30" />
        </div>
        <Container className="relative py-20 lg:py-28">
          <Breadcrumb
            items={[
              { label: "Events", href: `/${loc}/events` },
              { label: event.title },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="gold">{event.type}</Badge>
            <span className="inline-flex items-center gap-1.5 text-body-s text-ink-300">
              {event.online ? <Globe className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              {event.online ? "Online" : event.location}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-display-l">{event.title}</h1>
          <p className="mt-4 inline-flex items-center gap-2 text-body-l text-ink-300">
            <CalendarDays className="h-5 w-5 text-gold-400" /> {formatDate(event.date)}
          </p>
        </Container>
      </section>

      {/* Body + ticket panel */}
      <Container className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-heading-2 text-ink-900">About this gathering</h2>
          <p className="mt-4 measure text-body-l text-ink-500">{event.description}</p>

          <h2 className="mt-12 text-heading-2 text-ink-900">Schedule</h2>
          <div className="mt-4">
            <Accordion items={schedule} />
          </div>
        </div>

        {/* Sticky ticket panel */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 shadow-elev-2">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-[var(--radius-s)] bg-paper-50 px-4 py-3 text-center">
                <span className="block font-display text-display-l leading-none text-ink-900">{day}</span>
                <span className="text-caption font-bold uppercase text-ink-500">{monthLong.slice(0, 3)} {year}</span>
              </div>
              <div>
                <p className="text-body-s font-semibold text-ink-900">Free RSVP</p>
                <p className="inline-flex items-center gap-1 text-caption text-ink-500">
                  <Clock className="h-3.5 w-3.5" /> {event.online ? "Online" : event.location}
                </p>
              </div>
            </div>

            {event.tiers.length > 0 && (
              <ul className="mb-5 divide-y divide-ink-100 border-y border-ink-100">
                {event.tiers.map((t) => (
                  <li key={t.name} className="flex items-center justify-between py-3">
                    <span className="text-body-s text-ink-700">{t.name}</span>
                    <span className="text-body-s font-semibold text-ink-900">Free</span>
                  </li>
                ))}
              </ul>
            )}

            <EventRegistration
              event={event}
              trigger={<Button className="w-full">Reserve free spot</Button>}
            />
            <p className="mt-3 text-center text-caption uppercase tracking-[0.2em] text-ink-500">
              Secure institutional registration
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
