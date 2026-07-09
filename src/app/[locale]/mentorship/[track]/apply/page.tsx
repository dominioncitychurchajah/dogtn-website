import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading, Container } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getTrack, tracks } from "@/data/mentorship";
import { ApplicationStepper } from "@/components/forms/ApplicationStepper";

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const data = getTrack(track);
  return {
    title: data ? `Apply · ${data.name}` : "Mentorship Application",
    description: "Apply to a DOGTN mentorship track. Your progress is saved automatically.",
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}) {
  const { locale, track } = await params;
  const data = getTrack(track);
  if (!data) notFound();

  return (
    <Section surface="alt">
      <Container>
        <Breadcrumb
          items={[
            { label: "Mentorship", href: `/${locale}/mentorship` },
            { label: data.name, href: `/${locale}/mentorship/${data.slug}` },
            { label: "Apply" },
          ]}
        />
        <div className="mt-8">
          <SectionHeading
            eyebrow="Mentorship application"
            title={`Apply to ${data.name}`}
            intro="This process takes about 20 minutes. Your progress is saved automatically as you go."
          />
        </div>
        <ApplicationStepper slug={data.slug} trackName={data.name} locale={locale} />
      </Container>
    </Section>
  );
}
