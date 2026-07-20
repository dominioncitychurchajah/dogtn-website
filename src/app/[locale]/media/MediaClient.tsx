"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Mic2, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mediaCopy } from "@/i18n/pages/media";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 }
};

const TAB_KEYS = ["all", "teachings", "tv", "podcast", "conference"] as const;
type TabKey = (typeof TAB_KEYS)[number];

// Stable English category keys — data (`videos`) stays keyed on these regardless of UI locale.
const CATEGORY_MAP: Record<TabKey, string> = {
  all: "All",
  teachings: "Teachings",
  tv: "TV Broadcast",
  podcast: "Podcast",
  conference: "Conference Archives",
};

// Tabs that scroll to a dedicated section below rather than filtering the video grid.
const SECTION_TABS: Partial<Record<TabKey, string>> = {
  tv: "tv-broadcast",
  podcast: "podcast",
};

const videos = [
  { title: "The Laws of Kingdom Governance", duration: "58 min", category: "Teachings" },
  { title: "How to Pray Through Principalities", duration: "45 min", category: "Teachings" },
  { title: "Discipleship and National Transformation", duration: "72 min", category: "Teachings" },
  { title: "The Apostolic Mandate for This Generation", duration: "63 min", category: "Conference Archives" },
  { title: "Building Institutions That Outlast Leaders", duration: "51 min", category: "Teachings" },
  { title: "Night of Glory: Lagos 2024 Highlights", duration: "120 min", category: "Conference Archives" }
];

export default function MediaClient({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = mediaCopy[loc];
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const activeCategory = CATEGORY_MAP[activeTab];
  const filteredVideos = activeTab === "all" ? videos : videos.filter((v) => v.category === activeCategory);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    const sectionId = SECTION_TABS[tab];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[50vh] bg-[#0A192F] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/pastor/preaching-purple-lit.jpg"
          alt="Dr. David Ogbueli Preaching"
          fill
          className="object-cover opacity-25"
          priority
        />
        <Container className="relative z-10 py-20 flex flex-col items-center">
          <motion.h1
            {...fadeUp}
            className="font-serif text-[56px] lg:text-[72px] text-white leading-tight"
          >
            {c.heroTitle}
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 mt-4 text-lg max-w-2xl"
          >
            {c.heroSubtitle}
          </motion.p>
        </Container>
      </section>

      {/* SECTION 2 - TABS NAVIGATION */}
      <div className="sticky top-20 z-10 bg-white border-b border-[#E5E7EB]">
        <Container>
          <div className="flex overflow-x-auto hide-scrollbar space-x-8">
            {TAB_KEYS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`py-4 whitespace-nowrap text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-[#C9A227] text-[#0A192F]"
                    : "text-[#6B7280] hover:text-[#0A192F]"
                }`}
              >
                {c.tabs[tab]}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* SECTION 3 - VIDEO GRID */}
      <section className="bg-white py-16">
        <Container>
          {filteredVideos.length > 0 ? (
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              animate="whileInView"
              variants={{
                initial: {},
                whileInView: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {filteredVideos.map((video, idx) => (
                <motion.div key={idx} variants={fadeUp} className="group cursor-pointer">
                  <div className="bg-[#0A192F]/10 aspect-video rounded-[8px] overflow-hidden relative flex items-center justify-center mb-3">
                    <PlayCircle className="text-white/60 w-12 h-12 transition-transform group-hover:scale-110" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-wider bg-[#C9A227]/15 text-[#C9A227] px-2 py-0.5 rounded-full font-semibold">
                        {video.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[18px] text-[#0A192F] group-hover:text-[#C9A227] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[#6B7280] text-xs mt-1">{video.duration}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-[#6B7280] py-8 text-center">
              {c.noVideos}
            </p>
          )}
        </Container>
      </section>

      {/* SECTION 4 - TV BROADCAST */}
      <section id="tv-broadcast" className="bg-[#F5F1E8] py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <h2 className="font-serif text-[40px] text-[#0A192F] leading-tight mb-4">
                {c.tvHeading}
              </h2>
              <p className="text-[#6B7280] mb-6 text-lg">
                {c.tvBody}
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-[#C9A227] pl-4">
                  <p className="font-bold text-[#0A192F]">Dominion Network</p>
                  <p className="text-[#6B7280] text-sm">Mon-Fri, 7:00 AM WAT</p>
                </div>
                <div className="border-l-2 border-[#C9A227] pl-4">
                  <p className="font-bold text-[#0A192F]">TBN Africa</p>
                  <p className="text-[#6B7280] text-sm">Sun, 10:00 PM WAT</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <div className="bg-[#0A192F] rounded-[12px] aspect-video flex items-center justify-center shadow-lg relative overflow-hidden">
                <span className="text-[#C9A227] font-bold tracking-widest text-xl relative z-10">
                  {c.liveBroadcast}
                </span>
                <div className="absolute inset-0 bg-[#C9A227]/5 animate-pulse"></div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 - PODCAST */}
      <section id="podcast" className="bg-white py-16 text-center">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-serif text-[40px] text-[#0A192F] mb-4">
              {c.podcastHeading}
            </h2>
            <p className="text-[#6B7280] mb-8 text-lg">
              {c.podcastBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {[
                { name: "Spotify", href: "https://open.spotify.com/show/2JO3Nr5fVyyuLuq8DiGQDa" },
                { name: "Apple Podcasts", href: "https://podcasts.apple.com/podcast/david-ogbueli/id1625589899" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#0A192F] text-white px-8 py-3 rounded-full hover:bg-[#C9A227] transition-colors"
                >
                  <Mic2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{platform.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 6 - PRESS */}
      <section className="bg-[#0A192F] py-16">
        <Container>
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <h2 className="font-serif text-[40px] text-white">{c.pressHeading}</h2>
            <Link href={`/${locale}/contact`} className="group flex items-center gap-2 text-[#C9A227] hover:text-white transition-colors mt-4 md:mt-0">
              <span className="font-medium">{c.pressCta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              initial: {},
              whileInView: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              {
                publication: "Vanguard",
                headline: "Nigeria needs help of God — David Ogbueli",
                date: "November 2025",
                href: "https://www.vanguardngr.com/2025/11/nigeria-needs-help-of-god-david-ogbueli/",
              },
              {
                publication: "Vanguard",
                headline: "Moral renewal, leadership crucial to Nigeria's transformation — Ogbueli",
                date: "April 2026",
                href: "https://www.vanguardngr.com/2026/04/moral-renewal-leadership-crucial-to-nigerias-transformation-ogbueli/",
              },
              {
                publication: "THISDAY",
                headline: "Dominion City's Global Camp Meeting Closes with Explosion of Miracles, Transformed Lives",
                date: "April 2026",
                href: "https://www.thisdaylive.com/2026/04/16/dominion-citys-global-camp-meeting-closes-with-explosion-of-miracles-transformed-lives/",
              }
            ].map((press, idx) => (
              <motion.a
                key={idx}
                href={press.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="block bg-white/5 border border-white/10 rounded-[8px] p-5 hover:bg-white/10 transition-colors"
              >
                <p className="text-[#C9A227] text-sm font-medium mb-3">{press.publication}</p>
                <h3 className="text-white text-lg font-serif mb-4 leading-tight">{press.headline}</h3>
                <p className="text-white/50 text-xs">{press.date}</p>
              </motion.a>
            ))}
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
