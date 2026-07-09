import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Journey } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { DynIcon } from "@/components/ui/DynIcon";
import { cn } from "@/lib/utils";

const accents: Record<Journey["accent"], string> = {
  gold: "text-gold-600",
  flame: "text-flame-600",
  verd: "text-verd-600",
  info: "text-info-600",
};

export function JourneyCard({ journey, locale }: { journey: Journey; locale: Locale }) {
  return (
    <Link
      href={`/${locale}/journeys/${journey.slug}`}
      className="card-lift group flex h-full flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6"
    >
      <DynIcon name={journey.icon} className={cn("mb-4 h-8 w-8", accents[journey.accent])} />
      <h3 className="text-heading-3 text-ink-900">{journey.title}</h3>
      <p className="mt-2 flex-1 text-body-s text-ink-500">{journey.promise}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-body-s font-semibold text-gold-hover">
        {journey.modules.length} modules
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
      </span>
    </Link>
  );
}
