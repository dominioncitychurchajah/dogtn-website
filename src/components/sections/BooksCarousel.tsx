"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { BOOKS } from "@/data/books";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { booksCopy, type BooksCopy } from "@/i18n/pages/books";
import { cn } from "@/lib/utils";

const GAP = 28; // px between adjacent cards

/**
 * Premium 3D desk renders where they exist (supplied product photography); every
 * other title falls back to the warm ambient stage built from its flat cover.
 * A local map — the shared BOOKS data source is never modified.
 */
const RENDERS: Record<string, string> = {
  "the-pillars-of-solomons-wealth":
    "/images/books/renders/the-pillars-of-solomons-wealth-desk.webp",
  "the-jewish-secrets-of-wealth-creation":
    "/images/books/renders/the-jewish-secrets-of-wealth-creation-desk.webp",
  "the-laws-of-proper-speech":
    "/images/books/renders/the-laws-of-proper-speech-desk.webp",
  "discipleship-codes":
    "/images/books/renders/discipleship-codes-desk.webp",
  "praying-through-the-gates-of-time":
    "/images/books/renders/praying-through-the-gates-of-time-desk.webp",
  "the-glory-of-the-eagle":
    "/images/books/renders/the-glory-of-the-eagle-desk.webp",
  "building-the-word-foundation":
    "/images/books/renders/building-the-word-foundation-desk.webp",
  "the-reflection-principle":
    "/images/books/renders/the-reflection-principle-desk.webp",
  "tools-of-prophetic-dominion":
    "/images/books/renders/tools-of-prophetic-dominion-desk.webp",
  "the-love-revolution":
    "/images/books/renders/the-love-revolution-desk.webp",
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 },
};

function formatPrice(p: { amount: number; currency: string }) {
  return p.currency === "USD"
    ? `$${p.amount.toLocaleString()}`
    : `₦${p.amount.toLocaleString()}`;
}

/** Shortest signed distance from `active` to `i` around a ring of `count`. */
function circularDelta(active: number, i: number, count: number) {
  let d = (((i - active) % count) + count) % count; // 0 … count-1
  if (d > count / 2) d -= count; // -count/2 … +count/2
  return d;
}

type BookItem = (typeof BOOKS)[number];

/**
 * Premium 3-card showcase. The active book sits centre-stage (largest, full
 * opacity, elevated); its previous and next neighbours flank it (smaller,
 * dimmer). Each card is positioned by its *circular* distance from the active
 * index, so the row loops endlessly with no jump — the visible cards never
 * cross the wrap seam. Desktop shows three cards, tablet ~two, mobile one.
 * Content, prices, and links come straight from the shared BOOKS data.
 */
export function BooksCarousel({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = booksCopy[loc];
  const books = React.useMemo(() => BOOKS.filter((b) => b.cover), []);
  const count = books.length;

  const prefersReduced = useReducedMotion();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = React.useState({ card: 0, step: 0, sides: true });
  const [active, setActive] = React.useState(0);
  const [liked, setLiked] = React.useState<Set<string>>(new Set());
  const [paused, setPaused] = React.useState(false);
  const [interacted, setInteracted] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const dragX = useMotionValue(0);

  // Measure viewport → card width, stride, and whether side cards show.
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const v = el.clientWidth;
      const w = window.innerWidth;
      let card: number;
      let sides: boolean;
      if (w < 640) {
        card = v; // mobile: one full-width card
        sides = false;
      } else if (w < 1024) {
        card = Math.round(v * 0.66); // tablet: centre + peeking neighbours
        sides = true;
      } else {
        card = Math.min(520, Math.max(460, Math.round(v * 0.34))); // desktop: three cards
        sides = true;
      }
      setMetrics({ card, step: card + GAP, sides });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const markInteracted = React.useCallback(() => setInteracted(true), []);
  const go = React.useCallback(
    (dir: 1 | -1) => setActive((a) => (a + dir + count) % count),
    [count],
  );
  const goTo = React.useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  // Drag / swipe: finger-follow via dragX, snap to the nearest book on release.
  const onPanStart = () => {
    markInteracted();
    setPaused(true);
  };
  const onPan = (_e: unknown, info: PanInfo) => dragX.set(info.offset.x);
  const onPanEnd = (_e: unknown, info: PanInfo) => {
    // Forgiving on touch: a short drag OR a quick flick both advance.
    const threshold = Math.max(36, metrics.step * 0.14);
    if (info.offset.x <= -threshold || info.velocity.x < -300) go(1);
    else if (info.offset.x >= threshold || info.velocity.x > 300) go(-1);
    if (prefersReduced) dragX.set(0);
    else animate(dragX, 0, { type: "spring", stiffness: 300, damping: 34 });
    setPaused(false);
  };

  // Autoplay — only in view, not hovered/focused, and not after a manual move.
  React.useEffect(() => {
    if (prefersReduced || paused || interacted || !inView || count <= 1) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % count), 6500);
    return () => window.clearInterval(t);
  }, [prefersReduced, paused, interacted, inView, count]);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      markInteracted();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      markInteracted();
      go(-1);
    }
  };

  const toggleLike = (slug: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  if (count === 0) return null;

  const springy = prefersReduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.9 };

  return (
    <section className="overflow-hidden bg-[#F5F1E8] py-20 sm:py-24">
      <Container>
        <motion.div className="mb-10 text-center sm:mb-14" {...fadeUp}>
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#C9A227]">
            {c.carouselEyebrow}
          </span>
          <h2 className="mx-auto max-w-3xl font-serif text-[32px] leading-[1.12] text-balance text-[#0A192F] sm:text-[44px] lg:text-[56px]">
            {c.carouselHeading}
          </h2>
        </motion.div>
      </Container>

      {/* Showcase */}
      <motion.div
        className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6"
        role="region"
        aria-roledescription="carousel"
        aria-label={c.carouselHeading}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div ref={viewportRef} className="overflow-hidden">
          <motion.div className="grid" style={{ x: dragX }}>
            {books.map((book, i) => {
              const rel = circularDelta(active, i, count);
              const isCenter = rel === 0;
              const isSide = Math.abs(rel) === 1 && metrics.sides;
              const shown = isCenter || isSide;
              return (
                <motion.div
                  key={book.slug}
                  className="h-full [grid-area:1/1] justify-self-center"
                  style={{
                    width: metrics.card || "86%",
                    zIndex: isCenter ? 20 : isSide ? 10 : 0,
                    pointerEvents: shown ? "auto" : "none",
                  }}
                  animate={{
                    x: rel * (metrics.step || 0),
                    scale: isCenter ? 1 : 0.9,
                    opacity: isCenter ? 1 : isSide ? 0.88 : 0,
                  }}
                  transition={springy}
                  aria-hidden={!isCenter}
                >
                  <BookCard
                    book={book}
                    active={isCenter}
                    liked={liked.has(book.slug)}
                    onToggleLike={() => toggleLike(book.slug)}
                    onActivate={() => {
                      markInteracted();
                      setActive(i);
                    }}
                    locale={loc}
                    c={c}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Arrows — glass controls flanking the showcase; swipe drives mobile */}
        <button
          type="button"
          onClick={() => {
            markInteracted();
            go(-1);
          }}
          aria-label={c.prevBook}
          className="group/nav absolute left-1 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/70 text-[#0A192F] shadow-[0_10px_30px_-8px_rgba(10,25,47,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0A192F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] active:scale-95 sm:grid lg:left-2"
        >
          <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover/nav:-translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            markInteracted();
            go(1);
          }}
          aria-label={c.nextBook}
          className="group/nav absolute right-1 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/70 text-[#0A192F] shadow-[0_10px_30px_-8px_rgba(10,25,47,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0A192F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] active:scale-95 sm:grid lg:right-2"
        >
          <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover/nav:translate-x-0.5" />
        </button>
      </motion.div>

      {/* Mobile swipe hint — mobile has no arrows, so nudge users to swipe.
          Fades out for good once they interact. */}
      <AnimatePresence>
        {!interacted && (
          <motion.div
            className="mt-6 flex justify-center sm:hidden"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-hidden
          >
            <motion.span
              className="flex items-center gap-2 rounded-full bg-[#0A192F]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0A192F]/55"
              animate={prefersReduced ? {} : { x: [-4, 4, -4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {c.swipeHint}
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {books.map((book, i) => (
          <button
            key={book.slug}
            type="button"
            onClick={() => {
              markInteracted();
              goTo(i);
            }}
            aria-label={`${c.goToBook} ${book.title}`}
            aria-current={i === active}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]",
              i === active ? "w-7 bg-[#0A192F]" : "w-2.5 bg-[#0A192F]/25 hover:bg-[#0A192F]/45",
            )}
          />
        ))}
      </div>

      <Container>
        <motion.div className="mt-12 text-center" {...fadeUp}>
          <Link
            href={`/${loc}/books`}
            className="inline-block rounded-sm bg-[#0A192F] px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#112a4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
          >
            {c.browseLibrary}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function BookCard({
  book,
  active,
  liked,
  onToggleLike,
  onActivate,
  locale,
  c,
}: {
  book: BookItem;
  active: boolean;
  liked: boolean;
  onToggleLike: () => void;
  onActivate: () => void;
  locale: Locale;
  c: BooksCopy;
}) {
  const render = RENDERS[book.slug];
  return (
    <article
      onClick={() => {
        if (!active) onActivate();
      }}
      className={cn(
        "group relative flex h-full select-none flex-col overflow-hidden rounded-[28px] bg-white transition-shadow duration-500",
        active
          ? "shadow-[0_30px_70px_-24px_rgba(10,25,47,0.45)]"
          : "shadow-[0_12px_30px_-18px_rgba(10,25,47,0.35)]",
      )}
    >
      {/* Stage — a real 3D desk render where one exists, otherwise a warm
          ambient environment built from the flat cover. Either way, book leads. */}
      <div
        className="relative aspect-[5/4] overflow-hidden"
        style={
          render
            ? undefined
            : {
                background:
                  "radial-gradient(120% 95% at 50% 12%, #3a2c1e 0%, #241f2b 46%, #0c0d14 100%)",
              }
        }
      >
        {render ? (
          <Image
            src={render}
            alt={`${book.title} book cover`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 62vw, 520px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(48%_38%_at_50%_40%,rgba(201,162,39,0.28),transparent_72%)]" />
        )}

        {/* Floating favorite (glass) */}
        <button
          type="button"
          tabIndex={active ? 0 : -1}
          aria-hidden={!active}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          aria-label={liked ? `${c.saved}: ${book.title}` : `${c.save}: ${book.title}`}
          aria-pressed={liked}
          className={cn(
            "absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] active:scale-90",
            !active && "pointer-events-none",
          )}
        >
          <Heart
            className={cn(
              "h-[18px] w-[18px] transition-colors duration-300",
              liked ? "fill-[#C9A227] text-[#C9A227]" : "text-white",
            )}
          />
        </button>

        {/* Grounded flat cover — ambient stage only */}
        {!render && (
          <div className="absolute inset-0 flex items-center justify-center p-8 [perspective:1200px]">
            {/* floor shadow */}
            <div className="absolute bottom-[13%] h-6 w-[52%] rounded-[50%] bg-black/45 blur-2xl" />
            <div
              className="relative aspect-[2/3] h-[80%] transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:[transform:rotateY(-7deg)_rotateX(2deg)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={book.cover as string}
                alt={`${book.title} book cover`}
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 340px"
                className="rounded-md object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="w-fit rounded-full bg-[#C9A227]/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#927016]">
          {book.category}
        </span>

        <h3 className="mt-4 line-clamp-2 min-h-[3.4rem] text-[22px] font-bold leading-snug text-[#0A192F] sm:text-2xl">
          {book.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 min-h-[4rem] text-[15px] leading-relaxed text-[#5b6472]">
          {book.desc ?? book.subtitle}
        </p>

        {/* Purchase bar — the visual anchor */}
        <Link
          href={`/${locale}/books/${book.slug}`}
          tabIndex={active ? 0 : -1}
          aria-hidden={!active}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "group/cta mt-auto flex items-center justify-between gap-3 rounded-2xl bg-[#0A192F] p-2.5 transition-colors duration-300 hover:bg-[#112a4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]",
            !active && "pointer-events-none",
          )}
        >
          <span className="rounded-xl bg-white/10 px-4 py-2.5 text-lg font-bold text-white transition-all duration-300 group-hover/cta:bg-[#C9A227]/25 group-hover/cta:shadow-[0_0_18px_rgba(201,162,39,0.35)]">
            {formatPrice(book.price)}
          </span>
          <span className="flex items-center gap-2 pr-3 text-sm font-semibold uppercase tracking-wide text-white">
            {c.getTheBook}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </span>
        </Link>
      </div>
    </article>
  );
}
