import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, MessageCircle, Award, Mail, FileText } from "lucide-react";
import { Section, SectionHeading, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatDate } from "@/lib/utils";
import { getTrack, tracks } from "@/data/mentorship";

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
    title: data ? `Application status · ${data.name}` : "Application Status",
    description: "Track the status of your DOGTN mentorship application.",
  };
}

const STEPS = [
  { key: "submitted", label: "Submitted", icon: CheckCircle2 },
  { key: "review", label: "In Review", icon: Clock },
  { key: "interview", label: "Interview", icon: MessageCircle },
  { key: "decision", label: "Decision", icon: Award },
] as const;

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}) {
  const { locale, track } = await params;
  const data = getTrack(track);
  if (!data) notFound();

  // Mock: application is currently "In Review" (index 1).
  const currentStep = 1;
  const submittedDate = "2026-07-01";

  return (
    <Section surface="paper">
      <Container>
        <Breadcrumb
          items={[
            { label: "Mentorship", href: `/${locale}/mentorship` },
            { label: data.name, href: `/${locale}/mentorship/${data.slug}` },
            { label: "Status" },
          ]}
        />

        {/* Header */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <h1 className="text-display-l text-ink-900">Application submitted</h1>
          <Badge tone="gold" className="w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-600 pulse-live" aria-hidden />
            In Review
          </Badge>
        </div>
        <p className="mt-4 measure text-body-l text-ink-500">
          Our selection committee is reviewing your leadership profile for the{" "}
          <span className="font-semibold text-ink-900">{data.name}</span> track. We take a holistic
          approach to mentorship, ensuring each pairing creates lasting impact.
        </p>

        {/* Timeline */}
        <div className="mt-14">
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const state = i < currentStep ? "done" : i === currentStep ? "active" : "todo";
              const Icon = s.icon;
              return (
                <li
                  key={s.key}
                  className={
                    state === "active"
                      ? "rounded-[var(--radius-l)] border border-gold-600/40 bg-ink-900 p-6 text-paper-0 shadow-elev-2"
                      : "rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6"
                  }
                >
                  <span
                    className={
                      state === "done"
                        ? "inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-600 text-ink-900"
                        : state === "active"
                          ? "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-600 text-gold-400"
                          : "inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper-50 text-ink-300"
                    }
                  >
                    <Icon className={state === "active" ? "h-6 w-6 pulse-live" : "h-6 w-6"} aria-hidden />
                  </span>
                  <p
                    className={
                      state === "active"
                        ? "mt-4 text-caption font-semibold uppercase tracking-wider text-gold-400"
                        : "mt-4 text-caption font-semibold uppercase tracking-wider text-ink-500"
                    }
                  >
                    Step {i + 1}
                  </p>
                  <p className={state === "active" ? "mt-1 text-heading-3 text-paper-0" : "mt-1 text-heading-3 text-ink-900"}>
                    {s.label}
                  </p>
                  {i === 0 && (
                    <p className={state === "todo" ? "mt-1 text-body-s text-ink-500" : "mt-1 text-body-s text-ink-300"}>
                      {formatDate(submittedDate)}
                    </p>
                  )}
                  {state === "active" && (
                    <p className="mt-1 text-body-s font-semibold text-gold-400">Estimated: 3–5 days</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Details + next steps */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-1 lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <FileText className="h-6 w-6 text-gold-hover" aria-hidden />
              <h2 className="text-heading-3 text-ink-900">Application details</h2>
            </div>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-caption font-semibold uppercase tracking-wide text-ink-500">Track</dt>
                <dd className="mt-1 text-body-l font-semibold text-ink-900">{data.name}</dd>
              </div>
              <div>
                <dt className="text-caption font-semibold uppercase tracking-wide text-ink-500">Submitted</dt>
                <dd className="mt-1 text-body-l text-ink-900">{formatDate(submittedDate)}</dd>
              </div>
              <div>
                <dt className="text-caption font-semibold uppercase tracking-wide text-ink-500">Next cohort</dt>
                <dd className="mt-1 text-body-l text-ink-900">{formatDate(data.cohortDates[0])}</dd>
              </div>
              <div>
                <dt className="text-caption font-semibold uppercase tracking-wide text-ink-500">Reference status</dt>
                <dd className="mt-1 flex items-center gap-2 text-body-l text-verd-600">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                  Verified
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[var(--radius-l)] bg-paper-50 p-8 lg:col-span-5">
            <h2 className="text-heading-3 text-ink-900">Next steps</h2>
            <p className="mt-3 text-body-m text-ink-500">
              You will receive an invitation to schedule your diagnostic interview once your review
              is complete. Keep an eye on your inbox.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 p-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-hover" aria-hidden />
                <div>
                  <p className="text-body-s font-semibold text-ink-900">Email notification</p>
                  <p className="text-caption text-ink-500">Watch for updates from our selection team.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 p-4">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-hover" aria-hidden />
                <div>
                  <p className="text-body-s font-semibold text-ink-900">Interview scheduling</p>
                  <p className="text-caption text-ink-500">A booking link follows once review closes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Button href={`/${locale}/mentorship`} size="l">
            Back to Mentorship
          </Button>
          <p className="measure text-body-s text-ink-500">
            Questions about your submission? Reach our support team through the portal messaging.
          </p>
        </div>
      </Container>
    </Section>
  );
}
