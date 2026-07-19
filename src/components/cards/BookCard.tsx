import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { Badge } from "@/components/ui/Badge";

export function BookCard({ book, locale }: { book: Book; locale: Locale }) {
  return (
    <Link
      href={`/${locale}/books/${book.slug}`}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[var(--radius-m)] shadow-elev-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-elev-3">
        {book.cover ? (
          <Image src={book.cover} alt={`${book.title} cover`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-900 p-4">
            <span className="text-center font-serif text-lg italic text-gold-400">{book.title}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Badge tone="gold">{book.category}</Badge>
        <h3 className="mt-2 text-body-l font-semibold leading-tight text-ink-900 group-hover:text-gold-hover">{book.title}</h3>
        <p className="mt-1 text-caption uppercase tracking-wider text-ink-500">{book.formats.join(" · ")}</p>
      </div>
    </Link>
  );
}
