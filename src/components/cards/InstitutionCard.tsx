import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Institution } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { DynIcon } from "@/components/ui/DynIcon";

export function InstitutionCard({
  institution,
  locale,
  dark = false,
}: {
  institution: Institution;
  locale: Locale;
  dark?: boolean;
}) {
  const external = institution.externalUrl;
  const href = external ?? `/${locale}/institutions/${institution.slug}`;
  const className =
    dark
      ? "card-lift group flex h-full flex-col rounded-[var(--radius-l)] border border-paper-0/10 bg-paper-0/5 p-6 text-paper-0 hover:bg-paper-0/10"
      : "card-lift group flex h-full flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6";

  const body = (
    <>
      <DynIcon name={institution.icon} className="mb-4 h-7 w-7 text-gold-600" />
      <h3 className={dark ? "text-heading-3 text-paper-0" : "text-heading-3 text-ink-900"}>{institution.name}</h3>
      <p className={dark ? "mt-2 flex-1 text-body-s text-ink-300" : "mt-2 flex-1 text-body-s text-ink-500"}>
        {institution.tagline}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-body-s font-semibold text-gold-400">
        {external ? "Visit" : "Explore"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={external} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}
