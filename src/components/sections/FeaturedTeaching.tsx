import Image from "next/image";
import { Play, Headphones, FileText, Flame } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { featuredTeaching } from "@/data/teachings";

export function FeaturedTeaching({
  locale,
  copy,
}: {
  locale: Locale;
  copy: HomeCopy["featuredTeaching"];
}) {
  const teaching = featuredTeaching;
  const duration = `${teaching.durationMin}:00`;

  return (
    <Section surface="paper">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Thumbnail */}
          <div className="w-full lg:w-1/2">
            <div className="group relative aspect-video overflow-hidden rounded-[var(--radius-l)] bg-ink-900 shadow-elev-3">
              <Image
                src={teaching.thumbnail}
                alt={teaching.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-600 text-ink-900 shadow-elev-3 transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 fill-ink-900" />
                </span>
              </div>
              <div className="absolute bottom-5 start-5 flex items-center gap-3">
                <span className="rounded-[var(--radius-s)] bg-ink-900/90 px-3 py-1 text-caption font-semibold text-paper-0">
                  {duration}
                </span>
                <span className="pulse-live inline-flex items-center gap-2 rounded-[var(--radius-s)] bg-flame-600 px-3 py-1 text-caption font-semibold uppercase tracking-wide text-paper-0">
                  <Flame className="h-3.5 w-3.5" />
                  {copy.recentlyRecorded}
                </span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="w-full lg:w-1/2">
            <span className="mb-4 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
              {copy.eyebrow}
            </span>
            <h2 className="text-heading-1 leading-tight text-ink-900">{teaching.title}</h2>
            {teaching.series && (
              <p className="mt-2 text-body-s font-semibold uppercase tracking-wide text-ink-500">
                {teaching.series}
              </p>
            )}
            <p className="measure mt-5 text-body-l text-ink-500">{teaching.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={`/${locale}/teachings/${teaching.slug}`}>
                <Play className="h-5 w-5 fill-ink-900" />
                {copy.watch}
              </Button>
              <Button href={`/${locale}/teachings/${teaching.slug}`} variant="secondary">
                <Headphones className="h-5 w-5" />
                {copy.listen}
              </Button>
              <Button href={`/${locale}/teachings/${teaching.slug}`} variant="ghost">
                <FileText className="h-5 w-5" />
                {copy.notes}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
