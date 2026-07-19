"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BOOKS } from "@/data/books";
import { Container } from "@/components/layout/Section";

export default function BooksClient({ locale }: { locale: string }) {
  const [filter, setFilter] = useState("all");
  
  const categories = ["all", "leadership", "prayer", "relationships", "politics"];
  
  const filteredBooks = filter === "all" ? BOOKS : BOOKS.filter(book => book.category === filter);
  
  const startHereBooks = BOOKS.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as const } }
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-[#0A192F] text-white py-24 pt-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#C9A227] mb-6">
              The Library of a Reformer
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Explore written works on kingdom governance, strategic intercession, and transformational leadership.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Start Here / Featured */}
      <section className="py-20 bg-[#F5F1E8]">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-serif text-[#0A192F] mb-4">Start Here</h2>
            <p className="text-[#6B7280]">Foundational reading for kingdom citizens.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {startHereBooks.map((book, index) => (
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-black/5 flex flex-col h-full"
              >
                <div className="bg-[#0A192F] aspect-[3/4] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 bg-[#C9A227] text-[#0A192F] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                    Featured
                  </div>
                  {book.cover ? (
                    <Image src={book.cover} alt={`${book.title} cover`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  ) : (
                    <h3 className="text-3xl font-serif text-[#C9A227] text-center leading-tight p-8">
                      {book.title}
                    </h3>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider mb-2 block">
                    {book.category}
                  </span>
                  <p className="text-[#6B7280] mb-6 flex-grow">{book.desc}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Link 
                      href={`/${locale}/books/${book.slug}`}
                      className="inline-block bg-[#0A192F] text-white px-5 py-2 text-sm font-medium hover:bg-[#0A192F]/90 transition-colors rounded-md"
                    >
                      Learn More
                    </Link>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#0A192F] hover:text-[#C9A227] transition-colors"
                    >
                      Amazon &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Filter & Main Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-serif text-[#0A192F]">All Books</h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    filter === cat
                      ? "bg-[#C9A227] text-[#0A192F]"
                      : "bg-[#F5F1E8] text-[#6B7280] hover:bg-[#C9A227]/20 hover:text-[#0A192F]"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBooks.map((book) => (
              <motion.div
                variants={itemVariants}
                key={book.slug}
                className="bg-[#F5F1E8] rounded-xl p-6 flex flex-col h-full border border-black/5"
              >
                <div className="mb-6 flex-grow">
                  {book.cover && (
                    <div className="relative mb-4 aspect-[3/4] w-24 overflow-hidden rounded-md shadow-sm">
                      <Image src={book.cover} alt={`${book.title} cover`} fill sizes="96px" className="object-cover" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider mb-3 block">
                    {book.category}
                  </span>
                  <h3 className="text-2xl font-serif text-[#0A192F] mb-3">
                    {book.title}
                  </h3>
                  <p className="text-[#6B7280]">{book.desc}</p>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/10">
                  <Link 
                    href={`/${locale}/books/${book.slug}`}
                    className="inline-block bg-[#0A192F] text-white px-5 py-2 text-sm font-medium hover:bg-[#0A192F]/90 transition-colors rounded-md"
                  >
                    Details
                  </Link>
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#0A192F] hover:text-[#C9A227] transition-colors"
                  >
                    Buy &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
            
            {filteredBooks.length === 0 && (
              <div className="col-span-full py-12 text-center text-[#6B7280]">
                No books found in this category.
              </div>
            )}
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
