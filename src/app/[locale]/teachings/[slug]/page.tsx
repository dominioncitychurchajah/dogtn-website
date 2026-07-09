import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  Share2,
  Send,
  Link2,
  ArrowRight,
  Star,
  FileText,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { teachings, getTeaching } from "@/data/teachings";
import { getJourney } from "@/data/journeys";
import { Container, Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ContentCard } from "@/components/cards/ContentCard";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return teachings.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teaching = getTeaching(slug);
  return { title: teaching ? teaching.title : "Teaching" };
}

export default async function TeachingDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const teaching = getTeaching(slug);
  if (!teaching) notFound();

  const journey = teaching.journeySlug ? getJourney(teaching.journeySlug) : undefined;

  const related = teachings
    .filter(
      (t) =>
        t.slug !== teaching.slug &&
        (t.series === teaching.series ||
          t.tags.some((tag) => teaching.tags.includes(tag))),
    )
    .slice(0, 3);

  const aboutContent = (
    <div className="space-y-8">
      <div>
        <h3 className="text-heading-3 text-ink-900">Summary</h3>
        <p className="mt-3 text-body-l leading-relaxed text-ink-500 measure">
          {teaching.description}
        </p>
      </div>
      <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-50 p-6">
        <h3 className="mb-4 text-caption font-semibold uppercase tracking-wider text-gold-hover">
          Key Takeaways
        </h3>
        <ul className="space-y-3">
          {teaching.tags.map((tag) => (
            <li key={tag} className="flex items-start gap-3 text-body-m text-ink-700">
              <Star className="mt-0.5 h-4 w-4 flex-shrink-0 fill-gold-600 text-gold-600" />
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const transcriptContent = (
    <div className="space-y-4 text-body-m leading-relaxed text-ink-500 measure">
      {teaching.transcript ? (
        <p>{teaching.transcript}</p>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <FileText className="h-6 w-6 text-ink-300" />
          <p>A full transcript for this message is being prepared and will appear here soon.</p>
        </div>
      )}
    </div>
  );

  const notesContent = (
    <div className="space-y-4 text-body-m leading-relaxed text-ink-500 measure">
      <p>
        Downloadable study notes accompany this teaching. Use them to reflect, journal, and apply
        the message in your own leadership context.
      </p>
    </div>
  );

  return (
    <Section surface="paper">
      <Container>
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Teachings", href: `/${loc}/teachings` },
              { label: teaching.title },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Player / hero */}
            {teaching.format === "video" ? (
              <VideoPlayer poster={teaching.thumbnail} title={teaching.title} />
            ) : teaching.format === "audio" ? (
              <AudioPlayer title={teaching.title} speaker={teaching.speaker} />
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-l)] bg-ink-900 shadow-elev-3">
                <Image
                  src={teaching.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover opacity-70"
                  priority
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/80 to-transparent p-6">
                  <Badge tone="ink">
                    <FileText className="h-3 w-3" /> Article
                  </Badge>
                </div>
              </div>
            )}

            {/* Title block */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 text-caption font-semibold uppercase tracking-widest text-gold-hover">
                <span className="h-px w-8 bg-gold-600" />
                {teaching.series ?? "Teaching"}
              </div>
              <h1 className="text-heading-1 text-ink-900">{teaching.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-s text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" /> {teaching.speaker}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {formatDate(teaching.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {teaching.durationMin}m
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {teaching.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <Tabs
                items={[
                  { value: "about", label: "About", content: aboutContent },
                  { value: "transcript", label: "Transcript", content: transcriptContent },
                  { value: "notes", label: "Notes", content: notesContent },
                ]}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Journey bridge */}
            {journey && (
              <div className="rounded-[var(--radius-l)] bg-ink-900 p-8 text-paper-0">
                <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
                  Continue your journey
                </span>
                <h3 className="text-heading-3 text-paper-0">{journey.title}</h3>
                <p className="mt-3 text-body-s text-ink-300">{journey.promise}</p>
                <ProgressBar value={35} className="mt-5 bg-paper-0/10" label="Journey progress" />
                <Link
                  href={`/${loc}/journeys/${journey.slug}`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-6 py-3 text-body-m font-semibold text-ink-900 transition-colors hover:bg-gold-hover"
                >
                  Continue your journey: {journey.title}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            )}

            {/* Share */}
            <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
              <h3 className="mb-4 text-caption font-semibold uppercase tracking-wider text-ink-500">
                Share this message
              </h3>
              <div className="flex flex-wrap gap-2">
                <ShareButton label="Share to WhatsApp">
                  <Send className="h-4 w-4" /> WhatsApp
                </ShareButton>
                <ShareButton label="Share">
                  <Share2 className="h-4 w-4" /> Share
                </ShareButton>
                <ShareButton label="Copy link">
                  <Link2 className="h-4 w-4" /> Copy link
                </ShareButton>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="mb-4 text-caption font-semibold uppercase tracking-wider text-ink-500">
                  Related teachings
                </h3>
                <div className="space-y-6">
                  {related.map((t) => (
                    <ContentCard key={t.slug} teaching={t} locale={loc} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </Section>
  );
}

function ShareButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-[var(--radius-m)] border border-ink-100 px-4 py-2 text-body-s font-semibold text-ink-700"
    >
      {children}
    </span>
  );
}
