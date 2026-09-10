import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Container } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getTrack, tracks } from "@/data/mentorship";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { waitlistCopy } from "@/i18n/pages/waitlist";
import { WaitlistForm } from "@/components/mentorship/WaitlistForm";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}): Promise<Metadata> {
  const { locale, track } = await params;
  const data = getTrack(track);
  const w = waitlistCopy[isLocale(locale) ? locale : defaultLocale];
  if (!data) return { title: w.title, robots: { index: false } };
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: `mentorship/${track}/apply`,
    title: `${w.title} · ${data.name}`,
    description: w.body,
  });
}

export default async function TrackWaitlistPage({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}) {
  const { locale, track } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const data = getTrack(track);
  if (!data) notFound();

  const w = waitlistCopy[loc];

  return (
    <Section className="bg-[#F5F1E8]">
      <Container>
        <Breadcrumb
          items={[
            { label: "Mentorship", href: `/${loc}/mentorship` },
            { label: data.name, href: `/${loc}/mentorship/${data.slug}` },
            { label: w.title },
          ]}
        />

        <div className="mx-auto mt-8 max-w-[640px]">
          <span className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
            {data.name}
          </span>
          <h1 className="font-serif text-[28px] leading-tight text-[#0A192F] sm:text-[36px]">
            {w.title}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#6B7280]">{w.body}</p>

          <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
            {/* Pre-selects the track the visitor arrived from. */}
            <WaitlistForm
              c={w}
              tracks={tracks.map((t) => ({ slug: t.slug, name: t.name }))}
              defaultTrack={data.slug}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
