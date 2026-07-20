"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Mic2, Send, Phone, Mail } from "lucide-react";
import type { Locale } from "@/i18n/config";

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <polygon points="10 15 15 12 10 9" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const p = (path: string) => `/${locale}${path}`;
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const socials = [
    { label: "YouTube", href: "https://www.youtube.com/@DominionCity", icon: YoutubeIcon },
    { label: "Instagram", href: "https://www.instagram.com/dominioncitylagos/", icon: InstagramIcon },
    { label: "Facebook", href: "https://www.facebook.com/DominionCity", icon: FacebookIcon },
    { label: "Podcast", href: "https://open.spotify.com/", icon: Mic2 },
  ];

  const cols = [
    {
      title: "About",
      links: [
        { label: "Biography", href: p("/his-story") },
        { label: "Timeline", href: p("/his-story#timeline") },
        { label: "Education", href: p("/his-story#education") },
        { label: "Family", href: p("/his-story#family") },
      ],
    },
    {
      title: "Ministries",
      links: [
        { label: "Dominion City", href: p("/ministry") },
        { label: "Golden Heart Foundation", href: p("/ministry#golden-heart") },
        { label: "Leadership Institute", href: p("/ministry#dli") },
        { label: "Global Missions", href: p("/ministry#missions") },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Start Here", href: p("/start-here") },
        { label: "Books", href: p("/books") },
        { label: "Media", href: p("/media") },
        { label: "Free Assessment", href: p("/leadership/assessment") },
        { label: "Events", href: "https://dcglobal-gules.vercel.app/en/events" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Prayer Request", href: p("/contact#contact-form") },
        { label: "General Contact", href: p("/contact") },
      ],
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-[#1A1A1A] text-white/60">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-16">
        {/* Top: Logo + Newsletter */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between border-b border-white/10 pb-14 mb-14">
          <div className="max-w-xs">
            <Link href={`/${locale}`} className="inline-flex items-center mb-5" aria-label="Dr. David Ogbueli — home">
              <Image
                src="/images/logo/dr-david-ogbueli-brand-white.png"
                alt="Dr. David Ogbueli"
                width={341}
                height={122}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Transforming lives through the power of God&apos;s Word.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-white/60">
              <a
                href="tel:+14705352006"
                className="flex items-center gap-2.5 rounded-sm py-0.5 transition-all hover:translate-x-1 hover:text-[#C9A227] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C9A227]" aria-hidden />
                +1-470-535-2006
              </a>
              <a
                href="tel:+2348035508230"
                className="flex items-center gap-2.5 rounded-sm py-0.5 transition-all hover:translate-x-1 hover:text-[#C9A227] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C9A227]" aria-hidden />
                +234-8035508230
              </a>
              <a
                href="mailto:mail@davidogbueli.org"
                className="flex items-center gap-2.5 rounded-sm py-0.5 transition-all hover:translate-x-1 hover:text-[#C9A227] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#C9A227]" aria-hidden />
                mail@davidogbueli.org
              </a>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full max-w-md">
            <div>
              <h3 className="text-[20px] font-semibold leading-tight text-white">Join the Global Transformation</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                Weekly insights, event updates, and ministry news delivered to your inbox.
              </p>
            </div>
            {subscribed ? (
              <p className="text-[#C9A227] text-sm font-semibold py-3">✓ You're subscribed — welcome to the movement.</p>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/15 rounded-[8px] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227] focus-visible:ring-2 focus-visible:ring-[#C9A227]/30"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C9A227] text-[#0A192F] text-sm font-bold rounded-[8px] transition-all hover:-translate-y-0.5 hover:bg-[#e0b430] active:translate-y-0 cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Join Now
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 mb-14">
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-sm py-0.5 text-sm text-white/60 transition-all hover:translate-x-1 hover:text-[#C9A227] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="inline-block rounded-sm py-0.5 text-sm text-white/60 transition-all hover:translate-x-1 hover:text-[#C9A227] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            © 2026 Dr. David Ogbueli. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/50 transition-all hover:scale-110 hover:bg-white/10 hover:text-[#C9A227] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A227] focus-visible:outline-offset-2"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
