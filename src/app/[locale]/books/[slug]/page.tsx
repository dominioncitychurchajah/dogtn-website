import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BOOKS } from "@/data/books";
import { teachings } from "@/data/teachings";
import { Container } from "@/components/layout/Section";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BOOKS.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  
  if (!book) {
    return {
      title: "Book Not Found",
    };
  }
  
  return {
    title: `${book.title} | Books | Dr. David Ogbueli`,
    description: book.desc,
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  
  if (!book) {
    notFound();
  }

  const relatedTeachings = teachings.filter((t) => book.relatedTeachings.includes(t.slug));

  return (
    <main className="min-h-screen bg-[#F5F1E8] pt-32 pb-20">
      <Container>
        <div className="mb-8">
          <Link 
            href={`/${locale}/books`}
            className="text-sm font-medium text-[#6B7280] hover:text-[#C9A227] transition-colors inline-flex items-center gap-2"
          >
            &larr; Back to all books
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Book Cover */}
          <div className="bg-[#0A192F] rounded-2xl p-12 lg:p-20 flex items-center justify-center min-h-[500px] shadow-lg relative overflow-hidden">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-contain p-12"
              />
            ) : (
              <>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10 text-center">
                  <span className="text-[#C9A227] text-sm font-bold tracking-widest uppercase mb-6 block">
                    {book.category}
                  </span>
                  <p className="text-5xl lg:text-7xl font-serif text-[#C9A227] leading-tight">
                    {book.title}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right: Book Details */}
          <div className="flex flex-col justify-center">
            <h1 className="sr-only">{book.title}</h1>
            <h2 className="text-3xl lg:text-4xl font-serif text-[#0A192F] mb-6">
              {book.desc}
            </h2>
            
            <div className="prose prose-lg prose-p:text-[#6B7280] max-w-none mb-10">
              <p>{book.fullDesc}</p>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[#0A192F] mb-6 border-b border-black/10 pb-4">
                Key Takeaways
              </h3>
              <ul className="space-y-4">
                {book.takeaways?.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#C9A227] mt-1 shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-[#6B7280]">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {book.reviews && book.reviews.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-[#0A192F] mb-6 border-b border-black/10 pb-4">
                  Reader Reviews
                </h3>
                <ul className="space-y-6">
                  {book.reviews.map((review, index) => (
                    <li key={index}>
                      <p className="text-[#6B7280] italic">&ldquo;{review.quote}&rdquo;</p>
                      <p className="mt-2 text-sm font-semibold text-[#0A192F]">— {review.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 mt-auto">
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#C9A227] text-[#0A192F] px-8 py-4 font-bold rounded hover:bg-[#b59020] transition-colors shadow-sm"
              >
                Get on Amazon
              </a>

              <Link
                href={`/${locale}/books`}
                className="inline-block bg-white text-[#0A192F] px-8 py-4 font-medium rounded hover:bg-gray-50 border border-black/10 transition-colors shadow-sm"
              >
                More Books
              </Link>
            </div>
          </div>
        </div>

        {relatedTeachings.length > 0 && (
          <div className="mt-20 border-t border-black/10 pt-16">
            <h3 className="text-2xl font-serif text-[#0A192F] mb-8">Related Teachings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTeachings.map((teaching) => (
                <Link
                  key={teaching.slug}
                  href={`/${locale}/media`}
                  className="block rounded-xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
                    {teaching.format} · {teaching.durationMin} min
                  </span>
                  <h4 className="mt-2 font-serif text-lg text-[#0A192F]">{teaching.title}</h4>
                  <p className="mt-2 text-sm text-[#6B7280] line-clamp-2">{teaching.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
