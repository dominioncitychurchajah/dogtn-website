import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarPlus,
  Car,
  Check,
  ExternalLink,
  Clock,
  Crown,
  HandHeart,
  Landmark,
  MapPin,
  Shield,
  Ticket,
  Users,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { EventItem } from "@/data/types";
import { Section, Container, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { EventHeroVideo } from "@/components/events/EventHeroVideo";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";

// ponytail: English-only copy, like the rest of the register page.
// Rendered by /register while Next Level is the next upcoming event.
export const NEXT_LEVEL_SLUG = "next-level-conference";
const PROMO_YOUTUBE_ID = "-YrEweSNqFQ";
const MAP_QUERY = "Dominion City Lagos HQ, Lagos Business School, Ajah, Lagos";

const PILLARS = [
  { icon: Crown, title: "Reigning as Priests & Kings", body: "Your authority as a believer, and what it asks of you." },
  { icon: Landmark, title: "Financial & Marketplace Dominion", body: "Money, work and business, handled God's way." },
  { icon: Users, title: "Joseph & Esther Revolution", body: "Faithful people in high places, and how they got there." },
  { icon: BookOpen, title: "Excellence in Leadership", body: "For anyone who leads a team, a church or a home." },
  { icon: Briefcase, title: "Advancement in Business & Career", body: "Moving forward in your job or your business." },
  { icon: Shield, title: "Capacity to Thrive in Adversity", body: "How to keep going when things get hard." },
];

const SCHEDULE = [
  { date: "Wed · Sep 30", title: "Exclusive Men's Session", body: "8AM & 5PM. Men only." },
  { date: "Thu · Oct 1", title: "Opening Session", body: "5PM. The first session of the main conference." },
  { date: "Fri–Sat · Oct 2–3", title: "Main Sessions", body: "8AM & 5PM each day." },
  { date: "Sun · Oct 4", title: "Closing Day", body: "8AM & 5PM. The last two sessions." },
];

const LINEUP = [
  { name: "Bishop Titus Masika", role: "Guest speaker", image: "titus-masika" },
  { name: "Dr. Chiefo Ejioforbiri", role: "Guest speaker", image: "chiefo-ejioforbiri" },
  { name: "Dr. Niyi Adesanya", role: "Guest speaker", image: "niyi-adesanya" },
  { name: "Rev. Tony Akinyemi", role: "Guest speaker", image: "tony-akinyemi" },
  { name: "Dr. David Sseppuuya", role: "Guest speaker", image: "david-sseppuuya" },
  { name: "Apostle Charles Osazuwa", role: "Guest speaker", image: "charles-osazuwa" },
  { name: "Min. Rhema Onuoha", role: "Music minister", image: "rhema-onuoha" },
  { name: "Anthony Kani", role: "Music minister", image: "anthony-kani" },
  { name: "Min. Yinka Okeleye", role: "Music minister", image: "yinka-okeleye" },
  { name: "David Nkennor", role: "Music minister", image: "david-nkennor" },
];

// All-day block Wed 30 Sep – Sun 4 Oct; session times live in the description.
const CALENDAR_ICS =
  "data:text/calendar;charset=utf-8," +
  encodeURIComponent(
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//DavidOgbueli//Next Level 2026//EN",
      "BEGIN:VEVENT",
      "UID:next-level-conference-2026@davidogbueli.org",
      "DTSTAMP:20260927T000000Z",
      "DTSTART;VALUE=DATE:20260930",
      "DTEND;VALUE=DATE:20261005",
      "SUMMARY:Next Level Conference 2026",
      "LOCATION:Dominion City Lagos HQ\\, beside Lagos Business School\\, Ajah\\, Lagos",
      "DESCRIPTION:Men's session Wed 30 Sep 8AM & 5PM. Conference 1–4 Oct\\, 8AM & 5PM daily. Opening session Thu 1 Oct 5PM.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n"),
  );

const SUBNAV = [
  ["About", "about"],
  ["Schedule", "schedule"],
  ["Lineup", "lineup"],
  ["Location", "location"],
  ["Give", "give"],
] as const;

export function NextLevelConference({ event, loc }: { event: EventItem; loc: Locale }) {
  // External registration (Dominion City's form) when the event has one; otherwise our own form below.
  const registerUrl = event.registrationUrl ?? "#register";
  const regLink = event.registrationUrl ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <>
      {/* Hero: the 2025 recap leads, the details follow */}
      <header className="bg-ink-900 pb-16 pt-28 text-paper-0 lg:pb-20 lg:pt-32">
        <Container>
          <EventHeroVideo youtubeId={PROMO_YOUTUBE_ID} title="Watch: Next Level Conference 2026" />
          <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-caption font-semibold uppercase tracking-[0.25em] text-gold-600">
                Empowerment for All Round Dominion
              </span>
              <h1 className="mt-3 text-display-l leading-tight text-paper-0">
                Next Level <span className="text-gold-600">Conference</span> 2026
              </h1>
              <p className="mt-4 text-body-l text-ink-300">
                1–4 October at Dominion City Lagos HQ, Ajah. 8AM & 5PM daily, with an exclusive
                men&rsquo;s session on Wednesday 30 September.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href={registerUrl} {...regLink} size="l" className="font-bold">
                Register free <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </Button>
              <Button
                href="#schedule"
                size="l"
                variant="secondary"
                className="border-paper-0/30 bg-transparent text-paper-0 hover:bg-paper-0/10"
              >
                See the schedule
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* In-page nav, parked under the fixed site header */}
      <nav aria-label="On this page" className="sticky top-20 z-40 border-b border-ink-100 bg-paper-0/95 backdrop-blur">
        <Container className="flex items-center gap-6 overflow-x-auto py-3 text-body-s font-semibold text-ink-500">
          {SUBNAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="shrink-0 hover:text-ink-900">
              {label}
            </a>
          ))}
          <Link
            href={registerUrl}
            {...regLink}
            className="ms-auto shrink-0 rounded-full bg-gold-600 px-4 py-1.5 text-ink-900 hover:bg-gold-hover"
          >
            Register
          </Link>
        </Container>
      </nav>

      <Section surface="alt" id="about" className="scroll-mt-32">
        <Container>
          <SectionHeading
            eyebrow="What to expect"
            title="What the five days cover."
            intro="This year's theme is Empowerment for All Round Dominion. The teaching falls under six headings."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-m)] bg-ink-900 text-gold-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-body-l font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-body-m text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="schedule" className="scroll-mt-32">
        <Container>
          <SectionHeading eyebrow="Schedule" title="Mark your calendar." />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:border-t-2 lg:border-gold-600/30 lg:pt-8">
            {SCHEDULE.map((s) => (
              <li key={s.title} className="relative">
                <span className="absolute -top-[41px] start-0 hidden h-4 w-4 lg:block rounded-full border-4 border-paper-0 bg-gold-600" aria-hidden />
                <span className="text-caption font-bold uppercase tracking-[0.2em] text-gold-hover">{s.date}</span>
                <h3 className="mt-2 font-display text-heading-3 text-ink-900">{s.title}</h3>
                <p className="mt-1 text-body-m text-ink-500">{s.body}</p>
              </li>
            ))}
          </ol>
          {/* Give before asking: the calendar entry needs no sign-up. */}
          <a
            href={CALENDAR_ICS}
            download="next-level-conference-2026.ics"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink-900 px-5 py-2.5 text-body-s font-semibold text-ink-900 hover:bg-ink-900 hover:text-paper-0"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden /> Add to my calendar
          </a>
        </Container>
      </Section>

      <Section surface="alt">
        <Container>
          <SectionHeading eyebrow="Your host" title="Hosted by." />
          <div className="grid overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 shadow-elev-2 md:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[4/5] bg-ink-900 md:aspect-auto md:min-h-[440px]">
              <Image
                src="/images/ministers/david-ogbueli.webp"
                alt="Dr. David Ogbueli"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8 lg:p-12">
              <span className="rounded-full bg-gold-600 px-3 py-1 text-caption font-bold uppercase tracking-wider text-ink-900">
                Host
              </span>
              <h3 className="mt-5 font-display text-heading-2 text-ink-900">Dr. David Ogbueli</h3>
              <p className="mt-4 text-body-l text-ink-500">
                Dr. David Ogbueli founded Dominion City in Enugu in 1991 and has spent the years since
                training leaders in the church and in the marketplace. He hosts Next Level at the
                Lagos HQ.
              </p>
              <Link
                href={`/${loc}/his-story`}
                className="mt-6 inline-flex items-center gap-2 text-body-m font-semibold text-ink-900 hover:text-gold-hover"
              >
                Read his story <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="lineup" className="scroll-mt-32">
        <Container>
          <SectionHeading
            eyebrow="The lineup"
            title="Ministering this time."
            intro="Six guest speakers and four music ministers join Dr. Ogbueli this year."
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {LINEUP.map((sp) => (
              <li key={sp.name} className="overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0">
                <div className="relative aspect-[4/5] bg-paper-50">
                  <Image
                    src={`/images/ministers/${sp.image}.webp`}
                    alt={sp.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-body-m font-semibold text-ink-900">{sp.name}</h3>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-hover">{sp.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="alt" id="location" className="scroll-mt-32">
        <Container>
          <SectionHeading eyebrow="Plan your visit" title="Find us in Ajah." />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8">
              <h3 className="font-display text-heading-3 text-ink-900">Dominion City Lagos HQ</h3>
              <ul className="mt-6 space-y-4 text-body-m text-ink-500">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  {event.location}
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  Sessions at 8AM & 5PM daily. Opening session Thursday 1 October, 5PM.
                </li>
                <li className="flex gap-3">
                  <Car className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  Free and secure parking on site.
                </li>
                <li className="flex gap-3">
                  <Ticket className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  Admission is free. Register so we can plan seating.
                </li>
              </ul>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-900 px-5 py-2.5 text-body-s font-semibold text-ink-900 hover:bg-ink-900 hover:text-paper-0"
              >
                Get directions <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </a>
            </div>
            <iframe
              title="Map to Dominion City Lagos HQ"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[360px] w-full rounded-[var(--radius-l)] border border-ink-100"
            />
          </div>
        </Container>
      </Section>

      <Section surface="dark" id="give" className="scroll-mt-32">
        <Container className="text-center">
          <SectionHeading
            align="center"
            dark
            eyebrow="Support"
            title="Help make Next Level Conference 2026 happen."
            intro="Next Level is free for everyone who walks in. Giving is how it stays that way."
          />
          <Button href={`/${loc}/partnership#giving-engine`} size="l" className="font-bold">
            <HandHeart className="h-5 w-5" aria-hidden /> Give toward the conference
          </Button>
        </Container>
      </Section>

      <Section id="register" className="scroll-mt-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Register · Serve"
            title="Reserve your seat at Next Level Conference 2026."
            intro={
              event.registrationUrl
                ? "It's free. Registration is on the Dominion City website and takes about a minute; you can offer to serve on the workforce there too."
                : "It's free. Registering tells us how many seats to set out. If you'd like to serve on the workforce, say so on the form."
            }
          />
          {event.registrationUrl ? (
            <div className="text-center">
              <a
                href={event.registrationUrl}
                {...regLink}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-8 text-body-l font-semibold text-ink-900 hover:bg-gold-hover"
              >
                Register on dominioncity.cc <ExternalLink className="h-5 w-5" aria-hidden />
              </a>
              <p className="mt-3 text-body-s text-ink-500">Opens the official Dominion City registration form.</p>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 shadow-elev-2 sm:p-8">
              {/* Start people past zero: choosing the event is step one, already done. */}
              <ol className="mb-8 flex items-center gap-2 text-caption font-semibold text-ink-500">
                {["Event chosen", "Your details", "Seat reserved"].map((step, i) => (
                  <li key={step} className="flex flex-1 items-center gap-2">
                    <span
                      className={
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] " +
                        (i === 0 ? "bg-gold-600 text-ink-900" : i === 1 ? "border-2 border-gold-600 text-ink-900" : "border border-ink-100")
                      }
                    >
                      {i === 0 ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                    </span>
                    <span className={i < 2 ? "text-ink-900" : undefined}>{step}</span>
                    {i < 2 && <span className="h-px flex-1 bg-ink-100" aria-hidden />}
                  </li>
                ))}
              </ol>
              <EventRegistrationForm event={event} />
            </div>
          )}
        </Container>
      </Section>

      <section className="bg-gold-600 py-16 text-center text-ink-900 lg:py-20">
        <Container>
          <h2 className="font-display text-heading-1">Don&rsquo;t miss the opening session.</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-l text-ink-900/80">
            Thursday 1 October, 5PM, at Dominion City Lagos HQ. Entry is free.
          </p>
          <Link
            href={registerUrl}
            {...regLink}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-body-m font-semibold text-paper-0 hover:bg-ink-700"
          >
            Register now, it&rsquo;s free <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </Container>
      </section>
    </>
  );
}
