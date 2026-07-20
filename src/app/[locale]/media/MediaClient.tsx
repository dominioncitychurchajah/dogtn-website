"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Mic2, ArrowRight, X, CalendarDays } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mediaCopy } from "@/i18n/pages/media";

const EVENTS_URL = "https://dcglobal-gules.vercel.app/en/events";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 }
};

const TAB_KEYS = ["all", "teachings", "gmtv", "conference", "podcast"] as const;
type TabKey = (typeof TAB_KEYS)[number];

// Stable English category keys — the `videos` data stays keyed on these
// regardless of the UI locale.
const CATEGORY_MAP: Record<Exclude<TabKey, "all" | "podcast">, string> = {
  teachings: "Teachings",
  gmtv: "GMTV Studio",
  conference: "Conference Archives",
};

// Tabs that scroll to a dedicated section rather than filtering the video grid.
const SECTION_TABS: Partial<Record<TabKey, string>> = {
  podcast: "podcast",
};

type Video = { title: string; event: string; youtubeId: string; category: string };

// Real messages from the official "Pastor David Ogbueli" YouTube channel
// (youtube.com/@DominionCity), sourced from the VOD library at
// davidogbueli.org. IDs verified via YouTube's oEmbed endpoint.
const videos: Video[] = [
  // ── Teachings ─────────────────────────────────────────────
  { title: "Kingdom-Centric Christianity, Part 1", event: "Sunday Message", youtubeId: "o_sOd1B8ZT4", category: "Teachings" },
  { title: "Love: The Greatest Moral Virtue", event: "Sunday Message", youtubeId: "GvO5ijXQrQg", category: "Teachings" },
  { title: "Energy Frequencies", event: "Sunday Message", youtubeId: "JY6dZu4XU1Q", category: "Teachings" },
  { title: "The Tabernacle of David, Part 1", event: "Sunday Message", youtubeId: "Y-_45IuoUCM", category: "Teachings" },
  { title: "The Tabernacle of David, Part 2", event: "Sunday Message", youtubeId: "x_CG5KHe2So", category: "Teachings" },
  { title: "The 7 Tests of True Love, Part 1", event: "Sunday Message", youtubeId: "A1gtXKMffQM", category: "Teachings" },
  { title: "The 7 Tests of True Love, Part 2", event: "Sunday Message", youtubeId: "evcUPYeQPpU", category: "Teachings" },
  { title: "The Laws of Reflection in Ministry, Part 1", event: "Teaching Series", youtubeId: "P0Nr77vqdHA", category: "Teachings" },
  { title: "Human Development & Transformation, Part 1", event: "Teaching Series", youtubeId: "YvnE5LY-tNA", category: "Teachings" },
  { title: "Human Development & Transformation, Part 2", event: "Teaching Series", youtubeId: "1gWUF8aemjc", category: "Teachings" },
  { title: "Never Again (I Won't Settle For Less)", event: "Sunday Message", youtubeId: "1jwFERVjOhA", category: "Teachings" },
  { title: "The Secret of Sustainability in Ministry, Part 1", event: "Teaching Series", youtubeId: "_saMtZTP-g0", category: "Teachings" },
  { title: "March Super Sunday 3.0", event: "Sunday Message", youtubeId: "-mQo7W_EvvA", category: "Teachings" },
  { title: "March Super Sunday 1.0", event: "Sunday Message", youtubeId: "oJMHsoSb-jA", category: "Teachings" },

  // ── GMTV Studio ───────────────────────────────────────────
  { title: "GMTV Studio Session — with Grace Idowu", event: "Global Camp Meeting 2026", youtubeId: "pX7OwLNDyGk", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Min. Oncemore Six", event: "Global Camp Meeting 2026", youtubeId: "osIULybjtUc", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Pst. Daniel Olawande", event: "Global Camp Meeting 2026", youtubeId: "CygENoG4LLY", category: "GMTV Studio" },
  { title: "GMTV Studio Session, Ep. 2 — with Dr Charles Ndifon", event: "Global Camp Meeting 2026", youtubeId: "VBIXYBvh0c8", category: "GMTV Studio" },
  { title: "GMTV Studio Session, Ep. 1 — with Dr Charles Ndifon", event: "Global Camp Meeting 2026", youtubeId: "PoQUNilKyh8", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Evang. Christian Chukwuka", event: "Camp Meeting 2025", youtubeId: "efN1hNetjGU", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Pst (Dr) Ugonna Emechebe", event: "Camp Meeting 2025", youtubeId: "SbBWmWqCKnU", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Stan Nze", event: "Camp Meeting 2025", youtubeId: "IjTYIAwP-pQ", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Pst (Dr) Norbert Onaga", event: "Camp Meeting 2025", youtubeId: "MIKdR7b_4tI", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Evang. Ikechukwu Nnajiofor", event: "Camp Meeting 2025", youtubeId: "xJJhZN_cEOQ", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with Rev. Peter Bright", event: "Camp Meeting 2025", youtubeId: "DOtCxX3bZrA", category: "GMTV Studio" },
  { title: "GMTV Studio Session — with ESV (Dr) Iroy Orji", event: "Camp Meeting 2025", youtubeId: "dMvKf0aSZjM", category: "GMTV Studio" },

  // ── Conference Archives ───────────────────────────────────
  { title: "Jewish Secrets of Wealth Creation", event: "Global Camp Meeting 2026", youtubeId: "XzZt3_citMM", category: "Conference Archives" },
  { title: "Living with Eternity in Perspective", event: "Global Camp Meeting 2026", youtubeId: "iZzSoW4G83g", category: "Conference Archives" },
  { title: "Experiencing the Tangible Presence of God", event: "Global Camp Meeting 2026", youtubeId: "LI4cNgik9Fw", category: "Conference Archives" },
  { title: "Enforcing the Power of the Cross", event: "Global Camp Meeting 2026", youtubeId: "iLvVEteQAKQ", category: "Conference Archives" },
  { title: "Two Prayers That Can Transform Your Life", event: "Global Camp Meeting 2026", youtubeId: "GPoaECmBZJQ", category: "Conference Archives" },
  { title: "How to Host God's Presence", event: "Asaba Post-Encounter 2026", youtubeId: "nCRsE9GfxTA", category: "Conference Archives" },
  { title: "Leading Culture Change", event: "Asaba Post-Encounter 2026", youtubeId: "yznUhbmTK8I", category: "Conference Archives" },
  { title: "The Power of Honour", event: "Lagos Post-Encounter 2026", youtubeId: "L1koJCywvV0", category: "Conference Archives" },
  { title: "The Classes of Judgement, Part 1", event: "Lagos Post-Encounter 2026", youtubeId: "b2x0a-6zmrs", category: "Conference Archives" },
  { title: "The Five Ds of Satan", event: "Lagos Post-Encounter 2026", youtubeId: "Lh1QJ8c88dU", category: "Conference Archives" },
  { title: "WOFBEC 2026 — 1st Session", event: "Word of Faith Bible Explosion", youtubeId: "D66xT5RlvT8", category: "Conference Archives" },
  { title: "Be Wise as Serpent, Part 1", event: "Prayer & Prophetic Conference", youtubeId: "EniP0eCnYo8", category: "Conference Archives" },
  { title: "The Five Realms of the Prophetic, Part 1", event: "Prayer & Prophetic Conference", youtubeId: "8FBnkz0Whf0", category: "Conference Archives" },
  { title: "Soaring as Eagles", event: "DC Prayer & Prophetic Conf. 2025", youtubeId: "gZrIWJs0pAs", category: "Conference Archives" },
  { title: "The Gospel of the Kingdom & the Future of Africa", event: "Conference Session", youtubeId: "2QyxzDExYfs", category: "Conference Archives" },
  { title: "Financial Management, Part 1", event: "FMS Wealth Conference 2025", youtubeId: "6rOE_BzDryw", category: "Conference Archives" },
];

export default function MediaClient({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = mediaCopy[loc];
  const [activeTab, setActiveTab] = React.useState<TabKey>("all");
  const [activeVideo, setActiveVideo] = React.useState<Video | null>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  /** Blank the iframe before unmounting so audio stops the instant the user
   *  closes — the exit animation keeps the node mounted for ~300ms otherwise. */
  const closeLightbox = React.useCallback(() => {
    if (iframeRef.current) iframeRef.current.src = "about:blank";
    setActiveVideo(null);
  }, []);

  const filteredVideos = React.useMemo(() => {
    if (activeTab === "all" || activeTab === "podcast") return videos;
    return videos.filter((v) => v.category === CATEGORY_MAP[activeTab]);
  }, [activeTab]);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    const sectionId = SECTION_TABS[tab];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Close the lightbox on Escape and lock body scroll while it is open.
  React.useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

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
                whileInView: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {filteredVideos.map((video) => (
                <motion.button
                  key={video.youtubeId}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  aria-label={`${c.playVideo}: ${video.title}`}
                  variants={fadeUp}
                  className="group cursor-pointer block text-left"
                >
                  <div className="bg-[#0A192F]/10 aspect-video rounded-[8px] overflow-hidden relative flex items-center justify-center mb-3">
                    <Image
                      src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/30 transition-colors group-hover:bg-[#0A192F]/10" />
                    <PlayCircle className="relative text-white w-12 h-12 transition-transform group-hover:scale-110" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-wider bg-[#C9A227]/90 text-[#0A192F] px-2 py-0.5 rounded-full font-semibold">
                        {video.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[18px] text-[#0A192F] group-hover:text-[#C9A227] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[#6B7280] text-xs mt-1">{video.event}</p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <p className="text-[#6B7280] py-8 text-center">
              {c.noVideos}
            </p>
          )}
        </Container>
      </section>

      {/* SECTION 4 - EVENT DISCOVERY CTA */}
      <section className="bg-[#0A192F] py-20">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center flex flex-col items-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A227]">
              {c.eventsCtaEyebrow}
            </span>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white leading-tight">
              {c.eventsCtaHeading}
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              {c.eventsCtaBody}
            </p>
            <a
              href={EVENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-[#C9A227] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0A192F] transition-colors hover:bg-[#e0b430]"
            >
              <CalendarDays className="w-4 h-4" />
              {c.eventsCtaButton}
            </a>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 5 - PODCAST (structured so future episodes can be added without a refactor) */}
      <section id="podcast" className="bg-white py-16 text-center">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="mb-4 inline-block rounded-full bg-[#C9A227]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C9A227]">
              {c.podcastComingSoon}
            </span>
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

      {/* VIDEO LIGHTBOX — plays on-site, never redirects to YouTube */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A192F]/90 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={c.closeVideo}
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-[12px] bg-black shadow-2xl"
              style={{ aspectRatio: "16 / 9" }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <iframe
                ref={iframeRef}
                key={activeVideo.youtubeId}
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
