"use client";

import * as React from "react";
import {
  ArrowUp,
  BookOpen,
  Check,
  ClipboardCheck,
  Compass,
  Flame,
  Globe2,
  MapPin,
  Network,
  Send,
  Sparkles,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type IntentKey = "purpose" | "spiritual" | "leadership" | "ministry" | "society" | "chapter" | "assessment";
type Response = {
  message: string;
  detail: string;
  card: { title: string; meta: string; label: string; href: string };
  secondary?: { label: string; href: string }[];
};

const intents: { key: IntentKey; label: string; fill: string; icon: typeof Compass }[] = [
  { key: "purpose", label: "Discover Purpose", fill: "I want to discover my purpose", icon: Compass },
  { key: "spiritual", label: "Grow Spiritually", fill: "I want to grow spiritually", icon: Flame },
  { key: "leadership", label: "Become a Leader", fill: "I want to become a leader", icon: Sparkles },
  { key: "ministry", label: "Build a Ministry", fill: "I want to build a ministry", icon: Network },
  { key: "society", label: "Transform Society", fill: "I want to transform my society", icon: Globe2 },
  { key: "chapter", label: "Find a Chapter", fill: "Find a chapter near me", icon: MapPin },
  { key: "assessment", label: "Take Free Assessment", fill: "Take the leadership assessment", icon: ClipboardCheck },
];

const responses: Record<IntentKey, Response> = {
  purpose: {
    message: "Purpose is not a feeling. It is an assignment.",
    detail: "Begin a guided path through the ideas and teachings that help you name your calling and take your first faithful step.",
    card: { title: "Discover Purpose", meta: "Guided journey • Audio-first", label: "Begin the Journey", href: "/journeys/discover-purpose" },
    secondary: [{ label: "Explore teachings", href: "/media" }],
  },
  spiritual: {
    message: "A strong life is built from a strong foundation.",
    detail: "Grow through systematic Kingdom teaching, prayer, and practical disciplines that can be lived out every day.",
    card: { title: "Deepen Your Faith", meta: "Faith Foundations • Prayer Dynamics", label: "Begin the Journey", href: "/journeys/grow-spiritually" },
    secondary: [{ label: "Browse the books", href: "/books" }],
  },
  leadership: {
    message: "Leadership is not a title. It is a track.",
    detail: "In about seven minutes, the free diagnostic will show you where to begin and point you to an honest next step.",
    card: { title: "Leadership Assessment", meta: "20 questions • 7 minutes • Personalized result", label: "Start Free Assessment", href: "/leadership/assessment" },
    secondary: [{ label: "Browse leadership", href: "/leadership" }],
  },
  ministry: {
    message: "A ministry becomes sustainable when its leader is equipped to build systems and people.",
    detail: "Find practical support for building a ministry that can serve faithfully, grow wisely, and carry lasting influence.",
    card: { title: "Ministry Leaders", meta: "Mentorship • Governance • Accountability", label: "Explore Mentorship", href: "/mentorship/ministry-leaders" },
    secondary: [{ label: "Take Free Assessment", href: "/leadership/assessment" }],
  },
  society: {
    message: "Nations are transformed one prepared leader and one strong institution at a time.",
    detail: "Learn how the network develops people and institutions that carry transformation into culture, business, governance, and society.",
    card: { title: "Transform Society", meta: "Ministry • Governance • Global impact", label: "Explore Ministry", href: "/ministry" },
    secondary: [{ label: "View the leadership path", href: "/leadership" }],
  },
  chapter: {
    message: "You are not meant to grow alone.",
    detail: "Find a Dominion City community near you, or connect with the wider network online as you take your next step.",
    card: { title: "Find Your Chapter", meta: "Global directory • Local community", label: "Find a Chapter", href: "https://dcglobal-gules.vercel.app/en/locations" },
    secondary: [{ label: "Join the online community", href: "/ministry" }],
  },
  assessment: {
    message: "There are no wrong answers here, only honest ones.",
    detail: "The free leadership assessment measures five dimensions of growth and gives you one clear place to begin.",
    card: { title: "Leadership Assessment", meta: "20 questions • 7 minutes • Personalized result", label: "Start Free Assessment", href: "/leadership/assessment" },
    secondary: [{ label: "What is DLI?", href: "/leadership" }],
  },
};

function classify(text: string): IntentKey | null {
  const value = text.trim().toLowerCase();
  if (!value) return null;
  if (value.includes("purpose") || value.includes("calling") || value.includes("assignment")) return "purpose";
  if (value.includes("spiritual") || value.includes("faith") || value.includes("prayer")) return "spiritual";
  if (value.includes("leader") || value.includes("leadership") || value.includes("dli") || value.includes("assessment")) return "assessment";
  if (value.includes("ministry") || value.includes("mentor") || value.includes("pastor")) return "ministry";
  if (value.includes("chapter") || value.includes("church") || value.includes("near me") || value.includes("location")) return "chapter";
  if (value.includes("society") || value.includes("nation") || value.includes("institution") || value.includes("governance")) return "society";
  return null;
}

function NodeMark() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-100 bg-paper-0 text-ink-900" aria-label="Your Guide">
      <span className="relative block h-4 w-4">
        <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-ink-900" />
        <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-gold-600" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink-900" />
        <span className="absolute left-1 top-1.5 h-px w-2.5 rotate-[-25deg] bg-ink-900" />
        <span className="absolute left-2.5 top-1.5 h-2.5 w-px rotate-[35deg] bg-ink-900" />
      </span>
    </span>
  );
}

export function StartHereExperience({ locale }: { locale: Locale }) {
  const [draft, setDraft] = React.useState("");
  const [activeIntent, setActiveIntent] = React.useState<IntentKey | null>(null);
  const [messages, setMessages] = React.useState<{ role: "user" | "guide"; text: string }[]>([]);
  const responseRef = React.useRef<HTMLDivElement>(null);
  const path = (href: string) => "/" + locale + href;
  const response = activeIntent ? responses[activeIntent] : null;

  React.useEffect(() => {
    trackEvent("start_here_opened", { page_path: "/" + locale + "/start-here" });
  }, [locale]);

  React.useEffect(() => {
    if (response) responseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [response]);

  function submit(text: string) {
    const value = text.trim();
    if (!value) return;
    const key = classify(value);
    setMessages((current) => [...current, { role: "user", text: value }]);
    setDraft("");
    if (!key) {
      setActiveIntent(null);
      setMessages((current) => [...current, { role: "guide", text: "I want to guide you well. Try one of the paths below." }]);
      return;
    }
    setActiveIntent(key);
    setMessages((current) => [...current, { role: "guide", text: responses[key].message }]);
    trackEvent("start_here_intent_selected", { intent: key, source: "chat" });
  }

  return (
    <section className="relative isolate flex min-h-[min(900px,100svh)] items-center overflow-hidden bg-ink-900 px-5 py-24 text-paper-0 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_38%,rgba(35,48,74,0.72),transparent_56%)]" aria-hidden />
      <div className="mx-auto w-full max-w-content">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.45em] text-gold-400">Your guide to the network</span>
          <h1 className="font-serif text-[2.25rem] font-semibold leading-tight sm:text-5xl lg:text-6xl">You are not here by accident.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-l leading-relaxed text-ink-300">What brought you to the network today?</p>
          <form onSubmit={(event) => { event.preventDefault(); submit(draft); }} className="mx-auto mt-10 flex min-h-[120px] max-w-3xl flex-col gap-4 rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 p-5 text-start shadow-elev-2 transition-colors focus-within:border-gold-600 sm:p-6">
            <label htmlFor="start-here-message" className="sr-only">Tell us what you are seeking</label>
            <textarea id="start-here-message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Tell me what you are seeking — purpose, growth, leadership, or community..." rows={2} className="min-h-12 w-full resize-none border-0 bg-transparent text-base leading-relaxed text-ink-900 outline-none placeholder:text-ink-300" />
            <button type="submit" aria-label="Send message" disabled={!draft.trim()} className="grid h-12 w-12 shrink-0 self-end place-items-center rounded-full bg-gold-600 text-ink-900 transition hover:-translate-y-0.5 hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-40">
              <ArrowUp className="h-5 w-5" aria-hidden />
            </button>
          </form>
          <div className="mt-6 flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {intents.map(({ key, label, fill, icon: Icon }) => (
              <button key={key} type="button" onClick={() => submit(fill)} className={cn("inline-flex h-10 shrink-0 snap-center items-center gap-2 rounded-full border px-4 text-sm font-medium transition hover:-translate-y-0.5 hover:border-gold-600 hover:bg-gold-600/10", activeIntent === key ? "border-gold-600 bg-gold-600 text-ink-900" : "border-ink-100 bg-paper-0 text-ink-900")}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>
        {messages.length > 0 && (
          <div ref={responseRef} className="mx-auto mt-12 max-w-3xl space-y-4 rounded-[var(--radius-l)] border border-paper-0/10 bg-ink-700/40 p-4 sm:p-6">
            {messages.map((message, index) => (
              <div key={message.role + "-" + index} className={cn("flex items-start gap-3", message.role === "user" && "justify-end")}>
                {message.role === "guide" && <NodeMark />}
                <p className={cn("max-w-[min(90%,42rem)] rounded-[var(--radius-l)] px-4 py-3 text-body-s leading-relaxed", message.role === "user" ? "bg-ink-700 text-paper-0" : "bg-paper-0 text-ink-900")}>{message.text}</p>
              </div>
            ))}
            {response && (
              <div className="ml-12 overflow-hidden rounded-[var(--radius-l)] border border-paper-0/10 bg-paper-0 text-ink-900 shadow-elev-2">
                <div className="p-5 sm:p-6">
                  <p className="max-w-2xl text-body-s leading-relaxed text-ink-500">{response.detail}</p>
                </div>
                <div className="border-t border-ink-100 bg-paper-50 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-m)] bg-gold-600/15 text-gold-hover"><BookOpen className="h-5 w-5" aria-hidden /></span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-heading-3">{response.card.title}</h2>
                      <p className="mt-1 text-body-s text-ink-500">{response.card.meta}</p>
                    </div>
                  </div>
                  <a href={path(response.card.href)} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-5 text-sm font-semibold text-ink-900 transition hover:bg-gold-hover">
                    {response.card.label}<ArrowUp className="h-4 w-4" aria-hidden />
                  </a>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {response.secondary?.map((item) => <a key={item.label} href={path(item.href)} className="text-sm font-semibold text-ink-500 underline decoration-ink-300 underline-offset-4 hover:text-gold-hover">{item.label}</a>)}
                    {activeIntent === "purpose" && <a href={"https://wa.me/?text=" + encodeURIComponent("I just started my journey on the David Ogbueli Global Transformation Network. Start here: " + (typeof window !== "undefined" ? window.location.href : "https://dogtn-website.pages.dev/en/start-here"))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 underline decoration-ink-300 underline-offset-4 hover:text-gold-hover"><Send className="h-3.5 w-3.5" aria-hidden />Send to WhatsApp</a>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-ink-300">
          <Check className="h-4 w-4 text-gold-400" aria-hidden />
          <span>Choose a path, then take your next step.</span>
        </div>
      </div>
    </section>
  );
}
