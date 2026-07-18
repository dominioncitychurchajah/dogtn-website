"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from "lucide-react";
import { Container, Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

const OFFICES = [
  {
    region: "United States",
    name: "US Office",
    address: "1127 Misty Valley Court, Lawrenceville, GA. 30045 (Georgia), United States",
    phones: ["+1-470-535-2006", "+1-678-622-7090"],
    color: "from-blue-600/20 to-indigo-600/5",
  },
  {
    region: "United Kingdom",
    name: "UK Office",
    address: "The Hub, 123 Star Lane, London, E16 4PZ, United Kingdom",
    phones: ["+44-7956670069", "+44-7760919119"],
    color: "from-red-600/20 to-purple-600/5",
  },
  {
    region: "Nigeria (FCT)",
    name: "Abuja Office",
    address: "17 Oladipo Diya Way, Gudu District, FCT, Abuja, Nigeria",
    phones: ["+234-8038246281", "+234-7060574969"],
    color: "from-green-600/20 to-emerald-600/5",
  },
  {
    region: "Nigeria (Lagos)",
    name: "Lagos Office",
    address: "Km 22, Lekki-Epe Expressway, beside Lagos Business School, Ajah, Lekki, Lagos, Nigeria",
    phones: ["+234-8034954566", "+234-8035508230"],
    color: "from-amber-600/20 to-yellow-600/5",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "general", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-ink-900 text-paper-0 overflow-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,160,89,0.12),transparent_40%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(197,160,89,0.08),transparent_45%)]" aria-hidden />

      {/* Hero Header */}
      <div className="relative pt-32 pb-16 text-center border-b border-white/5">
        <Container>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.45em] text-gold-400">
            Reach Out
          </span>
          <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[64px] font-bold leading-tight">
            Connect With Our <span className="text-gold-600 block sm:inline">Global Offices</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-body-l text-ink-300 leading-relaxed">
            Have questions about programs, partnership, or ministries? Our international support teams are here to serve and guide you.
          </p>
        </Container>
      </div>

      {/* Main Content grid */}
      <Section surface="dark" className="relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Form Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[20px] p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold-600/15 flex items-center justify-center text-gold-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-body-l font-bold text-paper-0">Send a Message</h2>
                  <p className="text-body-s text-white/50">Typically replies within 24 hours</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8 animate-[fadeIn_0.5s_ease_both]">
                  <div className="w-16 h-16 bg-gold-600/20 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-400/30">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="text-body-l font-bold text-paper-0">Message Sent!</h3>
                  <p className="text-body-s text-white/60 mt-2 max-w-xs mx-auto">
                    Thank you for reaching out. A representative from our global network will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold-400 hover:text-gold-hover text-body-s font-semibold underline transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-body-m text-paper-0 placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-body-m text-paper-0 placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                      Area of Interest
                    </label>
                    <select
                      id="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-[#161a26] border border-white/10 rounded-[10px] px-4 py-3 text-body-m text-paper-0 focus:outline-none focus:border-gold-400/50 transition-colors cursor-pointer"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="partnership">Partnership Support</option>
                      <option value="mentorship">Mentorship Hubs</option>
                      <option value="events">Conferences & Events</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Briefly describe what you'd like to discuss..."
                      className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-body-m text-paper-0 placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}

              {/* Direct Care Desk Details */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href="mailto:mail@davidogbueli.org" className="text-body-s text-white/70 hover:text-gold-hover transition-colors no-underline">
                    mail@davidogbueli.org
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 text-body-s text-white/70">
                    <a href="tel:+2348035508230" className="hover:text-gold-hover transition-colors no-underline">+234-8035508230</a>
                    <a href="tel:+2348034954566" className="hover:text-gold-hover transition-colors no-underline">+234-8034954566</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Global Offices list */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold-400" /> International Hubs
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OFFICES.map((office) => (
                  <div
                    key={office.name}
                    className={`bg-gradient-to-br ${office.color} bg-white/5 border border-white/10 rounded-[16px] p-5 shadow-lg group hover:border-gold-400/35 transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-0.5">
                          {office.region}
                        </span>
                        <h3 className="text-body-m font-bold text-paper-0 group-hover:text-gold-400 transition-colors">
                          {office.name}
                        </h3>
                      </div>
                      <div className="w-7 h-7 rounded-[8px] bg-white/5 flex items-center justify-center border border-white/5">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      </div>
                    </div>

                    <p className="text-body-s text-white/60 leading-relaxed mb-4 min-h-[50px]">
                      {office.address}
                    </p>

                    <div className="space-y-1.5 border-t border-white/5 pt-3.5">
                      {office.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          className="flex items-center gap-2 text-caption text-white/50 hover:text-gold-hover transition-colors no-underline"
                        >
                          <Phone className="w-3 h-3 text-gold-400/70" />
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </main>
  );
}
