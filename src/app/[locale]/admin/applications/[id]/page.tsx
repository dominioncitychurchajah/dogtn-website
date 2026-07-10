import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationReview } from "@/components/admin/ApplicationReview";

export const metadata: Metadata = { title: "Admin · Application Review" };

// Applicant ids shown on the Kanban board — prerendered for the static export.
export function generateStaticParams() {
  return [
    "APP-1021", "APP-1028", "APP-1030", "APP-1031", "APP-1035",
    "APP-1039", "APP-1040", "APP-1042", "APP-1043", "APP-1044",
  ].map((id) => ({ id }));
}

export default async function ApplicationReviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  return (
    <div>
      <Link
        href={`/${locale}/admin/applications`}
        className="mb-6 inline-flex items-center gap-1.5 text-body-s font-semibold text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back to board
      </Link>
      <ApplicationReview id={id} />
    </div>
  );
}
