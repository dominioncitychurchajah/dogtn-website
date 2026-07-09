import { ClipboardCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function AssessmentBand({
  locale,
  copy,
}: {
  locale: Locale;
  copy: HomeCopy["assessment"];
}) {
  return (
    <Section surface="paper">
      <Container>
        <div className="relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-[var(--radius-xl)] bg-gold-600 p-10 text-ink-900 shadow-elev-2 lg:flex-row lg:items-center lg:p-16">
          {/* Oversized icon watermark */}
          <ClipboardCheck className="pointer-events-none absolute -end-6 -top-10 h-72 w-72 text-ink-900/10" />

          <div className="relative z-10 max-w-xl">
            <h2 className="text-heading-1 leading-tight text-ink-900">{copy.title}</h2>
            <p className="mt-5 text-body-l font-medium text-ink-900/80">{copy.body}</p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              href={`/${locale}/leadership/assessment`}
              size="l"
              className="bg-ink-900 text-paper-0 shadow-elev-3 hover:bg-ink-700"
            >
              {copy.cta}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
