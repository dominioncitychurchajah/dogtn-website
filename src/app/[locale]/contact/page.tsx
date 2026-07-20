"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Users,
  Send,
  Lock,
  Star,
  MessageCircle,
  Mail,
  Phone,
  CalendarDays,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/layout/Section';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { contactCopy, type ContactCopy } from '@/i18n/pages/contact';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 }
};

const CONTACT_EMAIL = "mail@davidogbueli.org";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@DominionCity" },
  { label: "Instagram", href: "https://www.instagram.com/dominioncitylagos/" },
  { label: "Facebook", href: "https://www.facebook.com/DominionCity" },
  { label: "Podcast", href: "https://open.spotify.com/show/2JO3Nr5fVyyuLuq8DiGQDa" },
];

function buildOffices(c: ContactCopy) {
  return [
    { flag: "🇺🇸", name: c.offices.us, address: ["1127 Misty Valley Court,", "Lawrenceville GA 30045"], phones: ["+1-470-535-2006", "+1-678-622-7090"] },
    { flag: "🇬🇧", name: c.offices.uk, address: ["The Hub, 123 Star Lane,", "London E16 4PZ"], phones: ["+44-7956670069", "+44-7760919119"] },
    { flag: "🇳🇬", name: c.offices.abuja, address: ["17 Oladipo Diya Way, Gudu District,", "FCT Abuja"], phones: ["+234-8038246281", "+234-7060574969"] },
    { flag: "🇳🇬", name: c.offices.lagos, address: ["Km 22, Lekki-Epe Expressway,", "beside LBS, Ajah Lekki"], phones: ["+234-8034954566", "+234-8035508230"] },
  ];
}

function buildMessageTypes(c: ContactCopy) {
  return [
    { value: "testimony", ...c.messageTypes.testimony },
    { value: "prayer", ...c.messageTypes.prayer },
    { value: "partnership", ...c.messageTypes.partnership },
    { value: "general", ...c.messageTypes.general },
  ];
}

function buildFaqs(c: ContactCopy) {
  return [
    { q: c.faqs.q1, a: c.faqs.a1 },
    { q: c.faqs.q2, a: c.faqs.a2 },
    { q: c.faqs.q3, a: c.faqs.a3 },
    { q: c.faqs.q4, a: c.faqs.a4 },
    { q: c.faqs.q5, a: c.faqs.a5 },
  ];
}

/** No form backend exists yet, so this opens the user's email client with the message
 *  pre-filled — genuinely functional with zero new accounts, rather than faking success. */
function buildMailto(subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string | undefined) ?? "en";
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = contactCopy[loc];

  const MESSAGE_TYPES = buildMessageTypes(c);
  const OFFICES = buildOffices(c);
  const FAQS = buildFaqs(c);

  const [messageType, setMessageType] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeType = MESSAGE_TYPES.find((t) => t.value === messageType);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const typeLabel = activeType?.label || c.messageTypes.general.label;
    window.location.href = buildMailto(typeLabel, {
      Name: `${data.get("firstName") ?? ""} ${data.get("lastName") ?? ""}`.trim(),
      Email: String(data.get("email") ?? ""),
      Phone: String(data.get("phone") ?? ""),
      Message: String(data.get("message") ?? ""),
    });
    setStatus("success");
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A192F] px-6 pb-20 pt-32 text-center">
        <div className="pointer-events-none absolute -left-1/5 -top-1/2 h-[140%] w-[140%] bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,162,39,0.08)_0%,transparent_60%)]" />
        <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/25 bg-[#C9A227]/15 px-5 py-2 text-[13px] font-medium tracking-wide text-[#C9A227]">
            <ShieldCheck className="h-3.5 w-3.5" />
            {c.responsePromise}
          </span>
          <h1 className="font-serif text-[32px] leading-[1.15] text-white sm:text-[44px] lg:text-[56px]">
            {c.heroTitlePre}<span className="text-[#C9A227]">{c.heroTitleAccent}</span>{c.heroTitlePost}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            {c.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-white/50">
              <Lock className="h-4 w-4 text-[#C9A227]" />
              {c.trustSecure}
            </div>
            <div className="flex items-center gap-2 text-[13px] font-medium text-white/50">
              <Clock className="h-4 w-4 text-[#C9A227]" />
              {c.trustResponse}
            </div>
            <div className="flex items-center gap-2 text-[13px] font-medium text-white/50">
              <Users className="h-4 w-4 text-[#C9A227]" />
              {c.trustLives}
            </div>
          </div>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section id="contact-form" className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Form panel */}
        <motion.div {...fadeUp}>
          <div className="mb-7">
            <h2 className="font-serif text-2xl text-[#0A192F]">{c.getInTouch}</h2>
            <p className="mt-1.5 text-sm text-[#6B7280]">{c.getInTouchSubtitle}</p>
          </div>

          {status === "success" ? (
            <div className="rounded-xl bg-[#C9A227]/15 p-6 text-[#0A192F]">
              {c.successMessage}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#0A192F]">
                  {c.messageTypeLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="w-full appearance-none rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12"
                  >
                    <option value="">{c.selectOption}</option>
                    {MESSAGE_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" />
                </div>
                <p className="mt-1 text-xs text-[#718096]">{c.messageTypeHelper}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#0A192F]">{c.firstName} <span className="text-red-500">*</span></label>
                  <input required name="firstName" type="text" placeholder={c.firstNamePlaceholder} className="w-full rounded-xl border-[1.5px] border-[#E2E8F0] px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#0A192F]">{c.lastName} <span className="text-red-500">*</span></label>
                  <input required name="lastName" type="text" placeholder={c.lastNamePlaceholder} className="w-full rounded-xl border-[1.5px] border-[#E2E8F0] px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#0A192F]">{c.emailAddress} <span className="text-red-500">*</span></label>
                <input required name="email" type="email" placeholder="john@email.com" className="w-full rounded-xl border-[1.5px] border-[#E2E8F0] px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12" />
                <p className="mt-1 text-xs text-[#718096]">{c.emailHelper}</p>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#0A192F]">{c.phoneNumber}</label>
                <input name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full rounded-xl border-[1.5px] border-[#E2E8F0] px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12" />
                <p className="mt-1 text-xs text-[#718096]">{c.phoneHelper}</p>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#0A192F]">{c.yourMessage} <span className="text-red-500">*</span></label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder={activeType?.placeholder ?? c.defaultMessageHelper}
                  className="w-full resize-y rounded-xl border-[1.5px] border-[#E2E8F0] px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12"
                />
                <p className="mt-1 text-xs text-[#718096]">{activeType?.helper ?? c.defaultMessageHelper}</p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A227] py-4 text-[15px] font-bold text-[#0A192F] transition-all hover:-translate-y-px hover:bg-[#d4b85a] hover:shadow-[0_4px_20px_rgba(201,162,39,0.2)]"
              >
                <Send className="h-[18px] w-[18px]" />
                {c.sendMessage}
              </button>

              <div className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFC] p-3.5 text-xs leading-relaxed text-[#718096]">
                <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A227]" />
                <span>{c.privacyNote}</span>
              </div>
            </form>
          )}
        </motion.div>

        {/* Side panel */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="space-y-6">
          <div className="rounded-2xl bg-[#0A192F] p-8 text-white">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A227]/20">
                <Clock className="h-5 w-5 text-[#C9A227]" />
              </div>
              <h3 className="font-serif text-xl">{c.whatHappensNext}</h3>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/65">{c.nextStepsIntro}</p>
            <div className="space-y-3.5">
              {[
                { n: 1, title: c.steps.instantTitle, text: c.steps.instantBody },
                { n: 2, title: c.steps.reviewTitle, text: c.steps.reviewBody },
                { n: 3, title: c.steps.followupTitle, text: c.steps.followupBody },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/20 text-xs font-bold text-[#C9A227]">
                    {step.n}
                  </span>
                  <p className="text-[13px] leading-relaxed text-white/70">
                    <strong className="font-semibold text-white">{step.title}</strong> — {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NOTE: placeholder testimonial from the design file — swap in a real, attributed quote before this ships. */}
          <div className="rounded-2xl border border-[#EBE5D8] bg-[#F5F1E8] p-7">
            <div className="mb-3.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#C9A227] text-[#C9A227]" />
              ))}
            </div>
            <blockquote className="mb-4 font-serif text-base italic leading-relaxed text-[#0A192F]">
              &ldquo;{c.testimonialQuote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A192F] text-sm font-semibold text-[#C9A227]">P</div>
              <div>
                <div className="text-sm font-semibold text-[#0A192F]">{c.testimonialName}</div>
                <div className="text-xs text-[#718096]">{c.testimonialRole}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-[1.5px] border-[#E2E8F0] p-6">
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-[#718096]">{c.preferAnotherChannel}</h4>
            <div className="space-y-3">
              <a
                href={buildMailto("WhatsApp Contact Request", { Note: "Please reach out to me via WhatsApp." })}
                className="group flex items-center gap-3 rounded-xl p-3.5 transition-colors hover:bg-[#F8FAFC]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#E8F5E9] text-[#22c55e]">
                  <MessageCircle className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#0A192F]">{c.whatsapp}</span>
                  <span className="block text-xs text-[#718096]">{c.whatsappDesc}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-[#718096] transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 rounded-xl p-3.5 transition-colors hover:bg-[#F8FAFC]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFF3E0] text-[#f59e0b]">
                  <Mail className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#0A192F]">{c.email}</span>
                  <span className="block text-xs text-[#718096]">{CONTACT_EMAIL}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-[#718096] transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#offices"
                className="group flex items-center gap-3 rounded-xl p-3.5 transition-colors hover:bg-[#F8FAFC]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#E3F2FD] text-[#2196f3]">
                  <Phone className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#0A192F]">{c.phone}</span>
                  <span className="block text-xs text-[#718096]">{c.phoneDesc}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-[#718096] transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={buildMailto("Discovery Call Request", { Note: "I'd like to schedule a 15-minute discovery call." })}
                className="group flex items-center gap-3 rounded-xl p-3.5 transition-colors hover:bg-[#F8FAFC]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#F3E5F5] text-[#9c27b0]">
                  <CalendarDays className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#0A192F]">{c.bookACall}</span>
                  <span className="block text-xs text-[#718096]">{c.bookACallDesc}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-[#718096] transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* OFFICES */}
      <section id="offices" className="bg-[#0A192F] px-6 py-20">
        <Container>
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="font-serif text-[28px] text-white sm:text-4xl">{c.officesHeading}</h2>
            <p className="mx-auto mt-3 max-w-md text-white/50">{c.officesSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((office) => (
              <motion.div key={office.name} {...fadeUp} className="rounded-2xl border border-white/[0.06] bg-[#152238] p-7 transition-all hover:-translate-y-0.5 hover:border-[#C9A227]/20">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227]/10 text-base">
                  {office.flag}
                </div>
                <h3 className="mb-2 font-serif text-lg text-white">{office.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/50">
                  {office.address.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < office.address.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <div className="flex flex-col gap-1.5">
                  {office.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-sm font-medium text-[#C9A227] hover:text-[#d4b85a]">
                      {phone}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/70 underline decoration-white/30 underline-offset-4 hover:text-[#C9A227]"
              >
                {social.label}
              </a>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[800px] px-6 py-20">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <h2 className="font-serif text-[28px] text-[#0A192F] sm:text-4xl">{c.faqHeading}</h2>
          <p className="mt-3 text-base text-[#718096]">{c.faqSubtitle}</p>
        </motion.div>

        <div>
          {FAQS.map((item, i) => (
            <div key={item.q} className="border-b border-[#E2E8F0] py-6">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-[#0A192F]"
              >
                {item.q}
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-[#718096] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm leading-relaxed text-[#4A5568]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-[#F5F1E8] px-6 py-16 text-center">
        <motion.div {...fadeUp} className="mx-auto max-w-xl">
          <h2 className="font-serif text-2xl text-[#0A192F] sm:text-[32px]">{c.ctaHeading}</h2>
          <p className="mt-3 mb-7 text-base text-[#718096]">{c.ctaBody}</p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A227] px-9 py-4 text-[15px] font-bold text-[#0A192F] transition-all hover:-translate-y-px hover:bg-[#d4b85a] hover:shadow-[0_4px_20px_rgba(201,162,39,0.2)]"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            {c.ctaButton}
          </a>
        </motion.div>
      </section>
    </div>
  );
}
