import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { Section, SectionHeading, Container } from "@/components/layout/Section";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Gatherings for formation, leadership, and transformation through conferences, academies, retreats, and online forums across the network.",
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
            Gatherings for Formation, Leadership, and Transformation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-500">
            Join a global movement of leaders. Engage in world-class conferences, intensives, and
            online forums designed to expand your influence.
          </p>
        </Container>
      </section>

      {/* Browser */}
      <Section surface="alt">
        <Container>
          <SectionHeading
            eyebrow="Upcoming & recent"
            title="Browse the Calendar"
            intro="Filter by institution, type, or format. Switch between calendar view and list view."
          />
          <EventsBrowser events={events} locale={loc} />
        </Container>
      </Section>
    </>
  );
}
