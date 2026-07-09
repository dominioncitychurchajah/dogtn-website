import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { books, getBook } from "@/data/books";
import { getTeaching } from "@/data/teachings";
import { Section, SectionHeading, Container } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { BookActions } from "@/components/library/BookActions";
import { ContentCard } from "@/components/cards/ContentCard";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return { title: book?.title ?? "Book" };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const book = getBook(slug);
  if (!book) notFound();

  const related = book.relatedTeachings.map(getTeaching).filter(Boolean);

  return (
    <>
      <section className="bg-ink-900 text-paper-0">
        <Container className="py-14 lg:py-20">
          <Breadcrumb
            items={[{ label: "Library", href: `/${loc}/library` }, { label: book.title }]}
          />
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            {/* 3D cover */}
            <div className="flex justify-center [perspective:1600px]">
              <div className="relative aspect-[2/3] w-64 max-w-full rotate-y-[-12deg] rounded-[var(--radius-m)] shadow-elev-4 transition-transform duration-500 [transform-style:preserve-3d] hover:rotate-y-0 sm:w-72">
                <Image src={book.cover} alt={`${book.title} cover`} fill sizes="288px" className="rounded-[var(--radius-m)] object-cover" priority />
              </div>
            </div>
            {/* Details */}
            <div className="flex flex-col justify-center">
              <Badge tone="gold" className="self-start">{book.category}</Badge>
              <h1 className="mt-4 text-display-l">{book.title}</h1>
              {book.subtitle && <p className="mt-2 font-display text-heading-3 italic text-gold-400">{book.subtitle}</p>}
              <p className="mt-4 text-body-m text-ink-300">by {book.author}</p>
              <p className="mt-6 measure text-body-l text-ink-300">{book.synopsis}</p>
              <p className="mt-4 text-caption uppercase tracking-widest text-ink-500">
                Available in: {book.formats.join(" · ")}
              </p>
              <div className="mt-8">
                <BookActions book={book} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <Section surface="alt">
          <Container>
            <SectionHeading eyebrow="Go deeper" title="Related teachings" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((teaching) => teaching && <ContentCard key={teaching.slug} teaching={teaching} locale={loc} />)}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
