"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mediaCopy } from "@/i18n/pages/media";
import { useAudioPlayer } from "@/lib/audio-store";

// Dominion Mandate Radio (RadioKing). The raw MP3 stream feeds the site's own
// layout-level mini-player, so audio survives route changes; the widget API
// supplies what is currently on air. Both send Access-Control-Allow-Origin: *.
const RADIO_STREAM = "https://play.radioking.io/dominioncityradio";
const RADIO_NOW_PLAYING = "https://api.radioking.io/widget/radio/dominioncityradio/track/current";
const RADIO_STATION = "Dominion Mandate Radio";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 }
};

/**
 * Dominion Mandate Radio — cream showpiece panel with a floating player card.
 * Playback runs through the layout-level mini-player so it survives route changes.
 */
export function RadioSection({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = mediaCopy[loc];

  const playAudio = useAudioPlayer((st) => st.play);
  const toggleAudio = useAudioPlayer((st) => st.toggle);
  const stopAudio = useAudioPlayer((st) => st.stop);
  const radioPlaying = useAudioPlayer((st) => st.playing);
  const isOnRadio = useAudioPlayer((st) => st.track?.src === RADIO_STREAM);
  const [onAir, setOnAir] = React.useState<{ title: string; artist: string } | null>(null);

  // Poll the station's widget API. Failure is non-fatal: the section still
  // renders and the stream still plays, just without a now-playing line.
  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(RADIO_NOW_PLAYING, { cache: "no-store" });
        if (!res.ok) return;
        const d = await res.json();
        if (!cancelled && (d?.title || d?.artist)) {
          setOnAir({ title: d.title ?? "", artist: d.artist ?? "" });
        }
      } catch {
        /* offline or blocked — leave the last known value in place */
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const listenLive = React.useCallback(() => {
    playAudio({
      title: onAir?.title || RADIO_STATION,
      speaker: onAir?.artist || RADIO_STATION,
      src: RADIO_STREAM,
      live: true,
    });
  }, [playAudio, onAir]);

  return (
    <section id="radio" className="bg-white pt-16 pb-6 sm:pt-24 sm:pb-8">
      <Container>
        <motion.div
          {...fadeUp}
          className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.55fr)]"
        >
          <div className="relative min-w-0 aspect-[3/4] overflow-hidden rounded-[24px] bg-[#0A192F] lg:aspect-auto lg:min-h-[520px]">
            <Image
              src="/images/radio/dr-david-ogbueli-mic.webp"
              alt="Dr. David Ogbueli"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top"
            />
          </div>

          <div className="relative min-w-0 rounded-[24px] bg-[#EFDFC0] px-7 py-10 sm:px-12 sm:py-14">
            <p className="text-base font-bold text-[#0A192F]/85">{c.radioHeading}</p>
            <h2 className="mt-4 max-w-[15ch] text-[32px] font-bold leading-[1.1] tracking-tight text-[#0A192F] sm:text-[44px]">
              {c.radioBody}
            </h2>
            <p className="mt-6 text-base font-bold text-[#0A192F]/85">{c.radioTagline}</p>
            <button
              onClick={listenLive}
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#0A192F]"
            >
              {c.radioListen}
              <Play className="h-4 w-4 fill-current" aria-hidden />
            </button>

            {/* Floating now-playing card: in flow on small screens, overlapping
                the panel's bottom-right corner from lg up. */}
            <div className="relative mt-10 lg:absolute lg:-right-2 lg:bottom-12 lg:mt-0 lg:w-[430px]">
              {/* Decorative stack fanning down and to the right, behind the card. */}
              <div aria-hidden className="pointer-events-none absolute left-3 right-0 lg:-right-2 top-4 h-full rounded-[20px] bg-white/75" />
              <div aria-hidden className="pointer-events-none absolute left-8 right-0 lg:-right-4 top-8 h-full rounded-[20px] bg-white/50" />
              <div aria-hidden className="pointer-events-none absolute left-14 right-0 lg:-right-6 top-12 h-full rounded-[20px] bg-white/30" />
              {/* White matte framing the card, as in the reference. */}
              <div className="relative rounded-[22px] bg-white p-1.5 shadow-[0_22px_50px_-20px_rgba(10,25,47,0.45)]">
              <div className="flex items-center gap-3 rounded-[18px] bg-white p-3 ring-1 ring-[#0A192F]/5">
                <span className="shrink-0 rounded-full bg-[linear-gradient(135deg,#F5A9CE,#7CC6F0,#3B5BDB)] p-[2px]">
                  <Image
                    src="/images/radio/mandate-radio-logo.webp"
                    alt=""
                    width={56}
                    height={56}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                    {RADIO_STATION}
                  </p>
                  <p className="truncate text-base font-bold uppercase leading-tight text-[#0A192F]">
                    {onAir?.title || c.radioNowPlaying}
                  </p>
                  <p className="truncate text-sm text-[#6B7280]">
                    {onAir?.artist || "Dr. David Ogbueli"}
                  </p>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#FDEBE5] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#F0421C] sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E25822] animate-[pulse-live_2s_ease-in-out_infinite]" aria-hidden />
                  Live
                </span>
                <button
                  onClick={() => (isOnRadio ? toggleAudio() : listenLive())}
                  aria-label={c.radioListen}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#C9A227] text-[#0A192F] transition-colors hover:bg-[#0A192F] hover:text-white"
                >
                  {isOnRadio && radioPlaying ? (
                    <Pause className="h-4 w-4 fill-current" aria-hidden />
                  ) : (
                    <Play className="h-4 w-4 fill-current" aria-hidden />
                  )}
                </button>
                {isOnRadio && (
                  <button
                    onClick={stopAudio}
                    aria-label={c.closeVideo}
                    className="shrink-0 text-[#0A192F]/50 transition-colors hover:text-[#0A192F]"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                )}
              </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
