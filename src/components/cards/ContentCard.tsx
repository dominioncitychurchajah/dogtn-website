import Image from "next/image";
import Link from "next/link";
import { Play, Headphones, FileText, Clock } from "lucide-react";
import type { Teaching } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { Badge } from "@/components/ui/Badge";

const formatIcon = { video: Play, audio: Headphones, article: FileText };

export function ContentCard({ teaching, locale }: { teaching: Teaching; locale: Locale }) {
  const Icon = formatIcon[teaching.format];
  return (
    <Link
      href={`/${locale}/teachings/${teaching.slug}`}
      className="card-lift group block overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0"
    >
      <div className="relative aspect-video overflow-hidden bg-ink-900">
        <Image
          src={teaching.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <Badge tone="ink">
            <Icon className="h-3 w-3" /> {teaching.format}
          </Badge>
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-ink-900/85 px-2 py-1 text-caption text-paper-0">
          <Clock className="h-3 w-3" /> {teaching.durationMin}m
        </span>
      </div>
      <div className="p-5">
        {teaching.series && (
          <span className="mb-1 block text-caption font-semibold uppercase tracking-wider text-gold-hover">
            {teaching.series}
          </span>
        )}
        <h3 className="text-heading-3 leading-tight text-ink-900 group-hover:text-gold-hover">{teaching.title}</h3>
        <p className="mt-2 line-clamp-2 text-body-s text-ink-500">{teaching.description}</p>
      </div>
    </Link>
  );
}
