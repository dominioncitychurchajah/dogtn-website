import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildMetadata, localePath } from "@/lib/seo";
import { Section, Container } from "@/components/layout/Section";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import { nextUpcomingEvent } from "@/lib/registration";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, eventSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const event = nextUpcomingEvent();
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "register",
    title: event ? `Register · ${event.title}` : "Register",
    description: event
      ? `Register to attend ${event.title} with Dr. David Ogbueli. ${event.summary}`
      : "Registration for upcoming events with Dr. David Ogbueli.",
    image: event?.image,
  });
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const event = nextUpcomingEvent();

  if (!event) {
    return (
      <Section>
        <Container>
          <h1 className="font-serif text-[32px] leading-tight text-[#0A192F]">
            No upcoming events
          </h1>
          <p className="mt-4 text-[#4B5563]">
            There is no event open for registration right now. Please check back soon.
          </p>
        </Container>
      </Section>
    );
  }

  const start = new Date(event.date);
  const end = event.endDate ? new Date(event.endDate) : null;
  const dateRange = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

  return (
    <>
      <JsonLd
        data={graph(eventSchema(event, absoluteUrl(localePath(loc, "register"))))}
      />
      <Section className="bg-[#F5F1E8]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/25 bg-[#C9A227]/15 px-5 py-2 text-[13px] font-medium tracking-wide text-[#C9A227]">
                {event.type} · {event.institution}
              </span>
              <h1 className="font-serif text-[32px] leading-tight text-[#0A192F] sm:text-[40px] md:text-[48px]">
                {event.title}
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-[#4B5563]">
                {event.description}
              </p>

              <dl className="mt-8 space-y-4 text-[15px] text-[#0A192F]">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" />
                  <dd>
                    {dateRange.format(start)}
                    {end && ` to ${dateRange.format(end)}`}
                  </dd>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" />
                  <dd>{event.location}</dd>
                </div>
              </dl>

              {/* Event artwork is a flyer, not a banner: show it whole rather
                  than cropping the speakers and dates out of a 16/9 box. */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
                <Image
                  src={event.image}
                  alt={`${event.title} flyer`}
                  width={1100}
                  height={1161}
                  unoptimized
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-serif text-2xl leading-tight text-[#0A192F]">
                Reserve your seat
              </h2>
              <p className="mt-2 mb-7 text-[15px] text-[#6B7280]">
                Free to attend. Registration helps the team plan seating and materials.
              </p>
              <EventRegistrationForm event={event} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
