import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationReview } from "@/components/admin/ApplicationReview";

export const dynamicParams = true;
export const metadata: Metadata = { title: "Admin · Application Review" };

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
