"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Star, ShieldCheck, Heart, ArrowRight, HelpCircle, ChevronDown, ChevronLeft, ChevronRight, BookOpen, Quote, Shield, Play, X } from "lucide-react";
import { Container, Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PartnershipEngine } from "@/components/forms/PartnershipEngine";

interface PartnershipClientProps {
  locale: string;
}

const TESTIMONIALS = [
  {
    quote: "Before joining the network, my leadership felt isolated. Through the mentorship hubs, I gained strategic alignment that helped scale our community initiatives tenfold.",
    name: "Dr. Emmanuel Mensah",
    location: "Accra, Ghana",
    tier: "Kingdom Partner",
    image: "/images/pastor/whiteboard-5-laws-bw.jpg"
  },
  {
    quote: "Sponsoring teachings vault digitizations felt like preserving spiritual infrastructure. Knowing thousands of young leaders access these daily is my favorite return on investment.",
    name: "Sarah Lin",
    location: "Singapore",
    tier: "Harvest Partner",
    image: "/images/pastor/ecosystem-side-profile.jpg"
  },
  {
    quote: "Even as a Seed Partner, the monthly updates and prayer digests make me feel deeply connected to the global transformation. I see exactly where my seeds are growing.",
    name: "David K. Vance",
    location: "Houston, Texas",
    tier: "Seed Partner",
    image: "/images/pastor/leadership-hand-raised.jpg"
  }
];

const FAQS = [
  {
    q: "Is my partnership gift tax-deductible?",
    a: "Yes. All contributions to the David Ogbueli Global Transformation Network are tax-deductible to the fullest extent permitted by law under our registered 501(c)(3) nonprofit status."
  },
  {
    q: "How are the partnership funds allocated?",
    a: "We operate with strict financial stewardship. 87% of all donations directly fund front-line leadership hubs, curriculum translations, global missions, and vault digitization. Only 13% is allocated to general administration and resource development."
  },
  {
    q: "Can I change or cancel my recurring partnership at any time?",
    a: "Absolutely. You can modify, pause, or cancel your monthly giving at any time through our online giving portal, or by contacting our partnership care team directly at partners@ogbueli.org."
  },
  {
    q: "Do you accept non-cash or corporate donations?",
    a: "Yes. We accept corporate matches, securities, real estate, and legacy estate planning. Please request a conversation through the strategic briefing portal at the bottom of the page to coordinate details."
  },
  {
    q: "How will I stay updated on the impact of my giving?",
    a: "All partners receive quarterly digital impact reports detailing metrics, program growth, and personal stories of leaders raised. Harvest and Kingdom partners also receive invitations to exclusive briefings with Dr. Ogbueli."
  }
];

export function PartnershipClient(_props: PartnershipClientProps) {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const [videoOpen, setVideoOpen] = React.useState(false);

  // Close the video lightbox on Escape and lock body scroll while it's open.
  React.useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  const selectTier = (tier: "seed" | "harvest" | "kingdom") => {
    // Update URL query parameters so PartnershipEngine picks it up
    const url = new URL(window.location.href);
    url.searchParams.set("tier", tier);
    window.history.pushState({}, "", url.toString());

    // Scroll smoothly to giving engine
    const engineEl = document.getElementById("giving-engine");
    if (engineEl) {
      engineEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .tab-slide {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />

      {/* WHY PARTNER (THE CASE & VIDEO PLACEHOLDER) */}
      <Section surface="dark">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400">
                The Movement
              </span>
              <h2 className="text-heading-1 text-paper-0">
                Why Partner with the <span className="text-gold-600">Transformation Network</span>?
              </h2>
              <p className="mt-6 text-body-l leading-relaxed text-ink-300">
                Partnership is not an ordinary donation. It is an intentional covenant to raise leaders, digitize foundational teachings, and reform cultural spheres. Together, we move beyond local walls to implement systemic Kingdom transformation globally.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/5 border border-white/10 rounded-[12px] p-5">
                  <div className="text-gold-400 text-heading-2 font-display mb-1">01</div>
                  <div className="text-body-s font-semibold text-paper-0 mb-1">Plant Seeds</div>
                  <p className="text-caption text-ink-300">Launch emerging leaders with systematic curriculum templates.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[12px] p-5">
                  <div className="text-gold-400 text-heading-2 font-display mb-1">02</div>
                  <div className="text-body-s font-semibold text-paper-0 mb-1">Multiply Impact</div>
                  <p className="text-caption text-ink-300">Establish physical mentorship hubs for localized discipling.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[12px] p-5">
                  <div className="text-gold-400 text-heading-2 font-display mb-1">03</div>
                  <div className="text-body-s font-semibold text-paper-0 mb-1">Transform Spheres</div>
                  <p className="text-caption text-ink-300">Carry reforms directly into business, media, and governance.</p>
                </div>
              </div>
            </div>

            {/* Video Thumbnail — opens lightbox */}
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-label="Play our mission video"
              className="lg:col-span-5 relative aspect-video lg:aspect-square w-full overflow-hidden rounded-[12px] border border-white/10 bg-white/5 shadow-elev-3 flex items-center justify-center group cursor-pointer"
            >
              <Image
                src="/images/partnership/mission-video-thumb.jpg"
                alt="Partnership Solves All Problems — Dr. David Ogbueli"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink-900/50 z-10 transition-colors group-hover:bg-ink-900/35" />
              <div className="relative z-20 text-center px-6">
                <div className="w-14 h-14 rounded-full bg-gold-600 text-ink-900 flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-105 shadow-lg">
                  <Play className="w-6 h-6 fill-current pl-0.5" />
                </div>
                <h4 className="text-body-m font-bold text-paper-0">Watch Our Mission Video</h4>
                <p className="text-caption text-white/60 mt-1 max-w-[240px] mx-auto">Discover the global footprint of your partnership (90s)</p>
              </div>
            </button>
          </div>
        </Container>
      </Section>

      {/* PARTNERSHIP LEVELS & GIVING ENGINE */}
      <Section surface="paper" id="giving-engine">
        <Container>
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.45em] text-gold-hover">
              Join the Movement
            </span>
            <h2 className="text-heading-1 text-ink-900">Choose Your Partnership Level</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-l text-ink-500">
              Select a tier below. Your selection will instantly configure your giving setup in the engine.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16">
            {/* Seed Card */}
            <div className="flex flex-col border border-ink-100 bg-paper-0 p-8 rounded-[12px] shadow-sm hover:shadow-md hover:border-gold-600/30 hover:-translate-y-1 transition-all group">
              <div className="mb-6">
                <span className="w-12 h-12 rounded-[8px] bg-gold-600/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-gold-hover" />
                </span>
                <h3 className="text-heading-3 text-ink-900 mb-1">Seed Partner</h3>
                <span className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-4">Foundation Level</span>
                <div className="text-display-l text-ink-900 font-display font-bold mb-1">
                  $50<span className="text-body-m text-ink-500 font-sans font-normal">/mo</span>
                </div>
                <p className="text-body-s italic text-ink-500 mt-2 leading-relaxed">
                  "Plants leadership in one community."
                </p>
              </div>

              <div className="h-px bg-ink-100 w-full mb-6" />

              <ul className="space-y-3.5 mb-8 flex-1 text-body-s text-ink-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Trains 1 leader/month
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Quarterly impact updates
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Monthly prayer digest
                </li>
              </ul>

              <button
                onClick={() => selectTier("seed")}
                className="w-full py-4 text-center rounded-[var(--radius-s)] border-2 border-ink-900 text-caption font-bold uppercase tracking-wider text-ink-900 hover:bg-ink-900 hover:text-paper-0 transition-all cursor-pointer"
              >
                Select Seed Level
              </button>
            </div>

            {/* Harvest Card [Featured] */}
            <div className="relative flex flex-col border border-gold-600 bg-ink-900 p-8 rounded-[12px] shadow-lg hover:-translate-y-1 transition-all">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-900 shadow-md">
                Most Popular
              </span>
              <div className="mb-6">
                <span className="w-12 h-12 rounded-[8px] bg-gold-600/20 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-gold-400" />
                </span>
                <h3 className="text-heading-3 text-paper-0 mb-1">Harvest Partner</h3>
                <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider block mb-4">Regional Multiplication</span>
                <div className="text-display-l text-paper-0 font-display font-bold mb-1">
                  $150<span className="text-body-m text-white/50 font-sans font-normal">/mo</span>
                </div>
                <p className="text-body-s italic text-white/60 mt-2 leading-relaxed">
                  "Multiplies leaders across a region."
                </p>
              </div>

              <div className="h-px bg-white/10 w-full mb-6" />

              <ul className="space-y-3.5 mb-8 flex-1 text-body-s text-white/80">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Funds 1 hub/quarter
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  VIP access to Teachings Vault
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Quarterly briefing updates
                </li>
              </ul>

              <button
                onClick={() => selectTier("harvest")}
                className="w-full py-4 text-center rounded-[var(--radius-s)] bg-gold-600 text-caption font-bold uppercase tracking-wider text-ink-900 hover:bg-gold-hover transition-all cursor-pointer shadow-md"
              >
                Select Harvest Level
              </button>
            </div>

            {/* Kingdom Card */}
            <div className="flex flex-col border border-ink-100 bg-paper-0 p-8 rounded-[12px] shadow-sm hover:shadow-md hover:border-gold-600/30 hover:-translate-y-1 transition-all group">
              <div className="mb-6">
                <span className="w-12 h-12 rounded-[8px] bg-gold-600/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-gold-hover" />
                </span>
                <h3 className="text-heading-3 text-ink-900 mb-1">Kingdom Partner</h3>
                <span className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-4">Strategic Transformation</span>
                <div className="text-display-l text-ink-900 font-display font-bold mb-1">
                  $500<span className="text-body-m text-ink-500 font-sans font-normal">/mo</span>
                </div>
                <p className="text-body-s italic text-ink-500 mt-2 leading-relaxed">
                  "Transforms nations through investment."
                </p>
              </div>

              <div className="h-px bg-ink-100 w-full mb-6" />

              <ul className="space-y-3.5 mb-8 flex-1 text-body-s text-ink-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Sponsors national conferences
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Direct briefs with Dr. Ogbueli
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  Legacy naming opportunities
                </li>
              </ul>

              <button
                onClick={() => selectTier("kingdom")}
                className="w-full py-4 text-center rounded-[var(--radius-s)] border-2 border-ink-900 text-caption font-bold uppercase tracking-wider text-ink-900 hover:bg-ink-900 hover:text-paper-0 transition-all cursor-pointer"
              >
                Select Kingdom Level
              </button>
            </div>
          </div>

          <div className="text-center text-body-s text-ink-500 mt-4">
            Not sure which partnership level is right for you?{" "}
            <a href="#stewardship-briefing" className="text-gold-hover hover:underline font-bold">
              Let's request a briefing instead
            </a>
          </div>

          {/* Redesigned Form Container Grid */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 text-left lg:sticky lg:top-24">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-gold-hover">
                Commitment
              </span>
              <h2 className="text-heading-1 text-ink-900">Raise Leaders with Us</h2>
              <p className="mt-4 text-body-m leading-relaxed text-ink-500">
                Your seeds empower us to plant training programs, multiply accountability hubs, and digitize world-class lessons. Set up your giving securely in under 2 minutes.
              </p>
              
              <div className="mt-8 space-y-4 border-t border-ink-100 pt-6">
                <div className="flex gap-3 items-start text-body-s text-ink-700">
                  <div className="w-6 h-6 rounded-full bg-gold-600/10 flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5 text-gold-hover" />
                  </div>
                  <span>Fully PCI-compliant checkout integrations.</span>
                </div>
                <div className="flex gap-3 items-start text-body-s text-ink-700">
                  <div className="w-6 h-6 rounded-full bg-gold-600/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-gold-hover" />
                  </div>
                  <span>Access all preserved digital vault archives.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-ink-900 rounded-[12px] p-1 overflow-hidden shadow-xl border border-white/5">
              <React.Suspense fallback={
                <div className="p-8 text-center text-white/50 flex flex-col items-center justify-center min-h-[300px]">
                  <svg className="animate-spin h-8 w-8 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading secure payment wizard...</span>
                </div>
              }>
                <PartnershipEngine />
              </React.Suspense>
            </div>
          </div>
        </Container>
      </Section>



      {/* TRANSFORMATION STORIES (SOCIAL PROOF CAROUSEL) */}
      <Section surface="dark">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400">
              Social Proof
            </span>
            <h2 className="text-heading-1 text-paper-0">Stories of Covenant Transformation</h2>
            <p className="mt-4 text-body-l text-white/60">
              Read how covenant partnership is actively raising leaders and driving systemic change worldwide.
            </p>
          </div>

          {/* Testimonial slider */}
          <div className="relative max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[12px] p-8 lg:p-12 shadow-xl">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-white/5" />
            
            <div className="min-h-[140px] flex flex-col justify-center">
              <p className="text-body-l italic text-paper-0 leading-relaxed text-center mb-6">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
              
              <div className="text-center">
                <div className="text-body-m font-bold text-gold-400">
                  {TESTIMONIALS[activeTestimonial].name}
                </div>
                <div className="text-caption text-white/50 mt-1">
                  {TESTIMONIALS[activeTestimonial].location} · <span className="text-white/70">{TESTIMONIALS[activeTestimonial].tier}</span>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={handlePrevTestimonial}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ACCORDION FAQ SECTION */}
      <Section surface="paper">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-gold-hover">
              Questions
            </span>
            <h2 className="text-heading-1 text-ink-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-body-m text-ink-500">
              Everything you need to know about partnership, tax benefits, and stewardship.
            </p>
          </div>

          <div className="divide-y divide-ink-100 border-t border-b border-ink-100">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-4.5">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 font-semibold text-body-m text-ink-900 hover:text-gold-hover transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-ink-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[200px] mt-3 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-body-s text-ink-500 leading-relaxed pb-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* VIDEO LIGHTBOX */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mission video"
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-paper-0 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[12px] shadow-2xl"
            style={{ aspectRatio: "16 / 9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/6ODrqCfl_b4?autoplay=1&rel=0"
              title="Partnership Solves All Problems — Dr. David Ogbueli"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
