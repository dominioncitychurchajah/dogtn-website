"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Section";

interface HisStoryClientProps {
  locale: string;
}

const timelineEvents = [
  {
    year: "1968",
    title: "Born in Alor, Anambra State",
    desc: "David Ugochukwu Ogbueli is born into a family in Alor, Anambra State, Nigeria.",
  },
  {
    year: "1980",
    title: "Ministry Begins at Age 12",
    desc: "A young David begins his journey of faith, sensing a divine call to lead and transform.",
  },
  {
    year: "1991",
    title: "New Covenant Family — UNN",
    desc: "While studying at the University of Nigeria, Nsukka, he pioneers the New Covenant Family campus fellowship.",
  },
  {
    year: "1996",
    title: "Dominion City Founded",
    desc: "What starts as a gathering of nurses at No. 2 Marcus Garvey Street, Enugu, becomes the foundation of a global movement.",
  },
  {
    year: "2000s",
    title: "Expanding Across Nigeria and Africa",
    desc: "The ministry grows rapidly across all geopolitical zones of Nigeria and into neighboring African nations.",
  },
  {
    year: "2010s",
    title: "Global Footprint — Europe, Asia, Americas",
    desc: "Chapters emerge in the United Kingdom, United States, Canada, and across Asia, with thousands attending global summits.",
  },
  {
    year: "2020s",
    title: "2000+ Churches, 50+ Nations",
    desc: "Today, Dominion City Global stands as one of Africa's most influential transformation networks, with Dr. Ogbueli recognized globally.",
  },
];

const educationCards = [
  {
    institution: "Harvard Business School",
    programme: "Executive Leadership Programme",
  },
  {
    institution: "Lagos Business School",
    programme: "Senior Management Programme",
  },
  {
    institution: "NIPSS",
    programme: "National Institute for Policy and Strategic Studies (Course 41)",
  },
];

const fadeUpVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
  viewport: { once: true, amount: 0.2 },
};

export default function HisStoryClient({ locale }: HisStoryClientProps) {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0A192F] pt-24 pb-20">
        <Image
          src="/images/pastor/sermon-blue-backdrop.jpg"
          alt="Dr. David Ogbueli Sermon Background"
          fill
          unoptimized
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#0A192F]/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full mt-10">
          <motion.span
            {...fadeUpVariant}
            className="text-[#C9A227] uppercase tracking-[0.2em] text-sm font-semibold mb-6 block"
          >
            HIS JOURNEY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="font-serif text-[56px] lg:text-[72px] text-white leading-tight mb-6"
          >
            The Journey of a Reformer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-white/70 text-xl max-w-xl mx-auto"
          >
            Three decades of apostolic ministry that shaped a generation and touched a world.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — TIMELINE */}
      <section id="timeline" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUpVariant}
            className="font-serif text-[48px] text-[#0A192F] mb-20 text-center"
          >
            A Life Marked by Purpose
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[1px] bg-[#E5E7EB] md:-translate-x-1/2" />

            <div className="space-y-16">
              {timelineEvents.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative flex flex-col md:flex-row items-start justify-between group md:even:flex-row-reverse"
                >
                  <div className="md:w-[45%] pl-14 md:pl-0 md:group-even:pl-14 md:group-even:text-left text-left md:group-odd:text-right">
                    <span className="font-serif text-[32px] text-[#C9A227] font-bold block mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-[22px] text-[#0A192F] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-[#C9A227] md:-translate-x-1/2 mt-3 md:mt-4 shadow-[0_0_0_8px_white]" />
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — EDUCATION */}
      <section id="education" className="bg-[#F5F1E8] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpVariant} className="text-center mb-16">
            <span className="text-[#C9A227] uppercase tracking-[0.15em] text-sm font-semibold mb-4 block">
              Continuous Learning
            </span>
            <h2 className="font-serif text-[48px] text-[#0A192F]">
              Sharpened for Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {educationCards.map((card, idx) => (
              <motion.div
                key={card.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white rounded-[8px] p-8 shadow-sm border border-[#E5E7EB] text-center md:text-left"
              >
                <h3 className="font-serif text-xl text-[#0A192F] mb-3">
                  {card.institution}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {card.programme}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PHILOSOPHY */}
      <section id="family" className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpVariant} className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0A192F] leading-relaxed mb-10 relative">
              <span className="text-[#C9A227] text-6xl absolute -top-8 -left-8 md:-left-12 opacity-30">"</span>
              The mandate of the Church is not to fill pews but to fill positions — in government, business, arts, and society.
              <span className="text-[#C9A227] text-6xl absolute -bottom-10 -right-4 md:-right-8 opacity-30">"</span>
            </h3>
            <p className="text-[#6B7280] text-lg leading-relaxed max-w-3xl mx-auto">
              Alongside his global mandate, Dr. Ogbueli is a devoted family man, cherishing the steadfast support of his wife and children as they serve the vision together. Family remains the bedrock of his transformative philosophy, exemplifying the foundational values he imparts to millions across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="bg-[#0A192F] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUpVariant}>
            <h2 className="font-serif text-[40px] md:text-[48px] text-white mb-10">
              Explore His Teachings
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={`/${locale}/books`}
                className="bg-[#C9A227] text-white px-8 py-4 rounded-[4px] font-medium tracking-wide hover:bg-[#b08d20] transition-colors w-full sm:w-auto"
              >
                Browse Books
              </Link>
              <Link
                href={`/${locale}/media`}
                className="border border-white/20 text-white px-8 py-4 rounded-[4px] font-medium tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                Watch Teachings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
