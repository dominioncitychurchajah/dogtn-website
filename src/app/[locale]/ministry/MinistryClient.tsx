"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Section";
import { Globe, GraduationCap, Users, Presentation, HeartHandshake, Flame, ArrowRight } from "lucide-react";

type MinistryClientProps = {
  locale: string;
};

export default function MinistryClient({ locale }: MinistryClientProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
    viewport: { once: true, amount: 0.2 }
  };

  const institutions = [
    {
      id: "dli",
      Icon: GraduationCap,
      title: "Dominion Leadership Institute",
      description: "Where future leaders are formed with character, purpose, and the skills to transform their sphere.",
      href: `/${locale}/leadership`,
      external: false,
    },
    {
      id: "dominion-city",
      Icon: Users,
      title: "Dominion City",
      description: "A community of believers growing together in faith, service, and leadership.",
      href: "https://www.dominioncity.cc",
      external: true,
    },
    {
      id: "glf",
      Icon: Presentation,
      title: "Global Leadership Forum",
      description: "Where leaders convene to shape nations and build lasting institutions.",
      href: "https://dcglobal-gules.vercel.app/en/events",
      external: true,
    },
    {
      id: "golden-heart",
      Icon: HeartHandshake,
      title: "Golden Heart Foundation",
      description: "Empowering young people with the values, skills, and mentorship they need to lead.",
      href: `/${locale}/partnership`,
      external: false,
    },
    {
      id: "priesthood",
      Icon: Flame,
      title: "Priesthood Institute",
      description: "Forming ministers who carry the gospel with depth, integrity, and global vision.",
      href: `/${locale}/mentorship`,
      external: false,
    },
    {
      id: "missions",
      Icon: Globe,
      title: "Global Missions Network",
      description: "Taking the message of transformation to communities around the world.",
      href: `/${locale}/partnership`,
      external: false,
    },
  ];

  const events = [
    {
      title: "Night of Glory",
      description: "Annual supernatural gathering",
      location: "Lagos, Abuja, London"
    },
    {
      title: "Camp Meeting",
      description: "Intensive training and impartation",
      location: "Annual, Nigeria"
    },
    {
      title: "PUSH Conference",
      description: "Prayer and strategic intercession",
      location: "Quarterly"
    },
    {
      title: "Strategic Leadership Summit",
      description: "For institutional heads and nation-builders",
      location: "Annual"
    }
  ];

  return (
    <main className="w-full bg-[#F5F1E8]">
      {/* SECTION 1 — HERO */}
      <section className="relative w-full min-h-[60vh] bg-[#0A192F] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
        <Image 
          src="/images/pastor/community-vestments-auditorium.jpg"
          alt="Ministry Background"
          fill
          className="object-cover opacity-20"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent"></div>
        
        <Container className="relative z-10 w-full flex flex-col items-center text-center">
          <motion.div {...fadeInUp} className="max-w-4xl flex flex-col items-center">
            <span className="inline-block py-1 px-3 mb-6 border border-[#C9A227] text-[#C9A227] text-sm font-medium tracking-widest uppercase rounded-full">
              Our Ministry
            </span>
            <h1 className="font-serif text-[56px] lg:text-[72px] text-white leading-tight mb-6">
              A Network Built to <span className="text-[#C9A227]">Transform</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light">
              Six interconnected institutions, one mandate — to raise leaders that transform nations.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 2 — THE ECOSYSTEM OVERVIEW */}
      <section className="py-24 bg-[#0A192F]">
        <Container>
          <motion.div {...fadeInUp} className="mb-14 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <span className="text-[#C9A227] font-semibold tracking-wider uppercase text-sm mb-4 block">The Institutions</span>
              <h2 className="font-serif text-[40px] md:text-[48px] text-white leading-tight">
                The Ecosystem of Transformation
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                Through our institutions, we equip people to excel in every sphere of society, from governance and business to community building and spiritual maturity.
              </p>
            </div>
            <div className="flex shrink-0 gap-10 lg:mb-2">
              <div>
                <div className="font-serif text-[40px] lg:text-[48px] text-[#C9A227] leading-none">1.2M+</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/50">Lives Touched</div>
              </div>
              <div>
                <div className="font-serif text-[40px] lg:text-[48px] text-[#C9A227] leading-none">50+</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/50">Nations</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {institutions.map((inst, idx) => {
              const ExploreLink = inst.external ? (
                <a href={inst.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] group-hover:gap-3 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link href={inst.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] group-hover:gap-3 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              );
              return (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex h-full flex-col rounded-[12px] border border-white/10 bg-white/5 p-8 text-white transition-all hover:-translate-y-1 hover:bg-white/10"
                >
                  <inst.Icon className="mb-3 h-7 w-7 text-[#C9A227]" aria-hidden />
                  <h3 className="font-serif text-[22px] text-white leading-snug">{inst.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{inst.description}</p>
                  {ExploreLink}
                </motion.div>
              );
            })}

            {/* Discover Your Place — spans two columns */}
            <motion.div
              {...fadeInUp}
              className="flex h-full flex-col justify-between rounded-[12px] border border-[#C9A227]/30 bg-[#C9A227]/15 p-8 text-white md:col-span-2"
            >
              <div>
                <h3 className="font-serif text-[24px] text-white">Discover Your Place</h3>
                <p className="mt-3 max-w-sm text-white/70 leading-relaxed">
                  Every person has a unique role to play in this transformation.
                </p>
              </div>
              <Link
                href={`/${locale}/start-here`}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-[8px] bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#0A192F] transition-colors hover:bg-[#b08d22]"
              >
                Find Your Place <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — SPEAKING & CONFERENCES */}
      <section className="py-24 bg-[#0A192F]">
        <Container>
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-[36px] md:text-[40px] text-white leading-tight mb-4">
              Major Events & Conferences
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Join us at our global gatherings designed for impartation, training, and strategic empowerment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, idx) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[8px] flex flex-col hover:bg-white/10 transition-colors"
              >
                <h3 className="font-serif text-[22px] text-[#C9A227] mb-2">{event.title}</h3>
                <p className="text-white/80 mb-6 flex-grow">{event.description}</p>
                
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <p className="text-white/60 text-sm mb-4">{event.location}</p>
                  <a href="https://dcglobal-gules.vercel.app/en/events" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-[#C9A227] flex items-center transition-colors">
                    Register <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4 — CTA BAND */}
      <section className="py-20 bg-[#F5F1E8] border-t border-[#0A192F]/5">
        <Container>
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-serif text-[32px] md:text-[40px] text-[#0A192F] leading-tight mb-8">
              Ready to Be Part of Something Greater?
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href={`/${locale}/start-here`}
                className="px-8 py-3 bg-[#0A192F] text-white font-medium rounded hover:bg-[#0A192F]/90 transition-colors"
              >
                Start Here
              </Link>
              <Link 
                href={`/${locale}/partnership`}
                className="px-8 py-3 bg-transparent border border-[#0A192F] text-[#0A192F] font-medium rounded hover:bg-[#0A192F] hover:text-white transition-colors"
              >
                Give / Partner
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
