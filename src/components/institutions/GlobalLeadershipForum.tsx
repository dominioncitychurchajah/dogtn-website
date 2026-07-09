import Image from "next/image";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ForumCountdown } from "./ForumCountdown";
import { ForumRegistration } from "./ForumRegistration";

const SPEAKERS = [
  { name: "Dr. David Ogbueli", role: "Founder & Host, DOGTN", image: "/images/pastor/leadership-hand-raised.jpg" },
  { name: "Pastor Nobert Onaga", role: "Global Policy Advisor", image: "/images/pastor/nobert-onaga.jpg" },
];

const DAY_ONE = [
  { time: "08:00 AM", title: "Registration & Morning Reception", desc: "Arrival of delegates and institutional networking.", accent: false },
  { time: "10:00 AM", title: "Opening Keynote: Institutional Legacy", desc: "Delivered by Dr. David Ogbueli. Exploring the spiritual weight of leadership.", accent: true },
  { time: "02:00 PM", title: "Breakout: Economic Reformation", desc: "Strategic workshop on kingdom finance systems.", accent: false },
];

const FAQS = [
  {
    id: "faq-group",
    question: "Is there a group discount?",
    answer: "Yes, groups of 10 or more receive a 15% discount automatically applied during checkout.",
  },
  {
    id: "faq-visa",
    question: "Are international visas supported?",
    answer: "Upon successful registration, a formal invitation letter for visa processing will be sent to your email.",
  },
];

export function GlobalLeadershipForum({ locale }: { locale: Locale }) {
  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink-900 text-paper-0">
        <Image
          src="/images/pastor/hero-night-of-glory.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 to-ink-900/90" aria-hidden />
        <Container className="relative z-10 pb-20 pt-40">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="flex items-center gap-3 text-caption font-semibold uppercase tracking-widest text-gold-600">
              <span className="h-px w-12 bg-gold-600" aria-hidden /> Institutional Event
            </span>
            <h1 className="text-display-l leading-tight text-paper-0">Global Leadership Forum 2026</h1>
            <p className="max-w-xl text-body-l text-ink-300">
              Join world-class visionaries and institutional architects for a transformative
              three-day summit on defining the future of global governance and spiritual leadership.
            </p>
            <div className="mt-6 flex flex-wrap gap-8">
              <div>
                <span className="mb-1 block text-caption uppercase tracking-widest text-ink-300">Date</span>
                <span className="font-display text-heading-3">Oct 12–14, 2026</span>
              </div>
              <div className="border-s border-paper-0/20 ps-8">
                <span className="mb-1 block text-caption uppercase tracking-widest text-ink-300">Location</span>
                <span className="font-display text-heading-3">The Citadel, London</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Content + sticky registration */}
      <Container className="py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column */}
          <div className="flex flex-col gap-24 lg:col-span-8">
            {/* Countdown + vision */}
            <section>
              <ForumCountdown />
              <div className="mt-16">
                <h2 className="text-heading-1 text-ink-900">The Vision of Transformation</h2>
                <div className="mt-6 space-y-6 text-body-l text-ink-500">
                  <p>
                    The Global Leadership Forum is more than a conference; it is a strategic gathering
                    of architects of change. In 2026, we convene under the theme &ldquo;Institutional
                    Gravity,&rdquo; exploring how spiritual foundations can anchor global systems of
                    governance, economics, and social reform.
                  </p>
                  <p>
                    Participants will engage in deep-immersion sessions designed to strip away the
                    superficial and engage with the core principles of legacy-building and world-class
                    leadership.
                  </p>
                </div>
              </div>
            </section>

            {/* Program itinerary */}
            <section>
              <h2 className="mb-10 text-heading-1 text-ink-900">Program Itinerary</h2>
              <div className="border-t border-ink-100">
                {/* Day 1 (open) */}
                <details open className="group border-b border-ink-100 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between">
                    <span className="flex items-center gap-8">
                      <span className="font-display text-heading-2 text-gold-600">01</span>
                      <span className="flex flex-col">
                        <span className="font-display text-heading-3 text-ink-900">Day One: Foundations of Gravity</span>
                        <span className="text-caption font-semibold uppercase tracking-wide text-ink-500">October 12, 2026</span>
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 rotate-90 text-ink-500 transition-transform group-open:-rotate-90" aria-hidden />
                  </summary>
                  <div className="mt-8 space-y-6 ps-8 sm:ps-20">
                    {DAY_ONE.map((s, i) => (
                      <div key={s.title} className={i < DAY_ONE.length - 1 ? "flex flex-col gap-1 border-b border-ink-100 pb-6 sm:flex-row sm:gap-12" : "flex flex-col gap-1 sm:flex-row sm:gap-12"}>
                        <span className="w-24 shrink-0 text-body-s font-semibold text-ink-700">{s.time}</span>
                        <div>
                          <h4 className={s.accent ? "text-body-l font-semibold text-gold-hover" : "text-body-l font-semibold text-ink-900"}>{s.title}</h4>
                          <p className="mt-1 text-body-m text-ink-500">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
                {/* Day 2 (collapsed) */}
                <details className="group border-b border-ink-100 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between">
                    <span className="flex items-center gap-8">
                      <span className="font-display text-heading-2 text-ink-300">02</span>
                      <span className="flex flex-col">
                        <span className="font-display text-heading-3 text-ink-900">Day Two: The Living Light</span>
                        <span className="text-caption font-semibold uppercase tracking-wide text-ink-500">October 13, 2026</span>
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 rotate-90 text-ink-500 transition-transform group-open:-rotate-90" aria-hidden />
                  </summary>
                  <div className="mt-8 ps-8 text-body-m italic text-ink-500 sm:ps-20">
                    Full agenda for Day Two is being finalised — check back soon.
                  </div>
                </details>
              </div>
            </section>

            {/* Speakers */}
            <section>
              <h2 className="mb-10 text-heading-1 text-ink-900">Distinguished Speakers</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {SPEAKERS.map((sp) => (
                  <div key={sp.name} className="group overflow-hidden border border-ink-100 bg-paper-0">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
                      <Image src={sp.image} alt={sp.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-heading-3 text-ink-900">{sp.name}</h3>
                      <p className="mt-1 text-caption font-semibold uppercase tracking-wider text-ink-500">{sp.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Venue */}
            <section>
              <h2 className="mb-10 text-heading-1 text-ink-900">The Venue</h2>
              <div className="relative mb-8 h-[360px] overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-50">
                {/* Stylised map placeholder */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(#c7c6cc 1px, transparent 1px), linear-gradient(90deg, #c7c6cc 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(115deg, transparent 40%, #c7c6cc 40%, #c7c6cc 42%, transparent 42%), linear-gradient(200deg, transparent 55%, #c7c6cc 55%, #c7c6cc 56%, transparent 56%)",
                  }}
                  aria-hidden
                />
                <span className="absolute left-6 top-6 text-body-s font-semibold text-ink-500">The City</span>
                <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <span className="absolute h-10 w-10 animate-ping rounded-full bg-gold-600/30" aria-hidden />
                  <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gold-600 text-ink-900 shadow-elev-2">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                </span>
              </div>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div>
                  <h3 className="font-display text-heading-3 text-ink-900">The Citadel Centre</h3>
                  <p className="mt-1 text-body-m text-ink-500">Royal Victoria Dock, 1 Western Gateway, London E16 1XL</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Royal+Victoria+Dock+London"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 border border-ink-900 px-6 py-3 text-caption font-semibold uppercase tracking-widest text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-0"
                >
                  <Navigation className="h-4 w-4" aria-hidden /> Get Directions
                </a>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="mb-10 text-heading-1 text-ink-900">Frequently Asked Questions</h2>
              <Accordion items={FAQS} type="multiple" />
            </section>
          </div>

          {/* Right column: registration */}
          <div className="lg:col-span-4">
            <ForumRegistration />
          </div>
        </div>
      </Container>
    </>
  );
}
