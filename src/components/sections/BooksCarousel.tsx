"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { BOOKS } from "@/data/books";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { booksCopy } from "@/i18n/pages/books";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 },
};

/** Horizontal product-style carousel showcasing Dr. Ogbueli's books.
 *  Content source is the same BOOKS data used across the site. */
export function BooksCarousel({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = booksCopy[loc];
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const books = BOOKS.filter((b) => b.cover);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-book-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#F5F1E8] py-24">
      <Container>
        <motion.div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" {...fadeUp}>
          <div>
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#C9A227]">
              {c.carouselEyebrow}
            </span>
            <h2 className="font-serif text-[40px] leading-tight text-[#0A192F] lg:text-[56px]">
              {c.carouselHeading}
            </h2>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous books"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0A192F]/15 text-[#0A192F] transition-colors hover:bg-[#0A192F] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next books"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0A192F]/15 text-[#0A192F] transition-colors hover:bg-[#0A192F] hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollerRef}
          className="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4"
        >
          {books.map((book) => (
            <div
              key={book.slug}
              data-book-card
              className="flex w-[240px] shrink-0 snap-start flex-col overflow-hidden rounded-[12px] border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-[268px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0A192F]">
                <Image
                  src={book.cover as string}
                  alt={`${book.title} cover`}
                  fill
                  sizes="268px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                  {book.category}
                </span>
                <h3 className="mb-2 line-clamp-2 font-serif text-[19px] font-semibold leading-snug text-[#0A192F]">
                  {book.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
                  {book.desc ?? book.subtitle}
                </p>
                <Link
                  href={`/${locale}/books/${book.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] transition-colors hover:text-[#b38f22]"
                >
                  {c.getTheBook} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <motion.div className="mt-12 text-center" {...fadeUp}>
          <Link
            href={`/${locale}/books`}
            className="inline-block rounded-sm bg-[#0A192F] px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#112a4f]"
          >
            {c.browseLibrary}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
