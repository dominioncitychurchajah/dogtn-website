import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { Section, SectionHeading, Container } from "@/components/layout/Section";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Gatherings for formation, leadership, and transformation — conferences, academies, retreats, and online forums across the network.",
};

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      {/* Hero */}
      <section className="bg-paper-0">
        <Container className="py-20 text-center lg:py-28">
          <span className="mb-4 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
            The Global Calendar
          </span>
          <h1 className="mx-auto max-w-3xl text-display-l text-ink-900">
            Gatherings for formation, leadership, and transformation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-500">
            Join a global movement of leaders and spiritual architects. Engage in world-class
            intensives, conferences, and forums designed to reshape your influence and impact.
          </p>
        </Container>
      </section>

      {/* Browser */}
      <Section surface="alt">
        <Container>
          <SectionHeading
            eyebrow="Upcoming & recent"
            title="Browse the calendar"
            intro="Filter by institution, type, or format — then switch between a month-grouped calendar and a flat list."
          />
          <EventsBrowser events={events} locale={loc} />
        </Container>
      </Section>
    </>
  );
}
