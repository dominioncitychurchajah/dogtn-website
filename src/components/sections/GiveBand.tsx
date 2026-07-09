import Image from "next/image";
import { HandHeart } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function GiveBand({ locale, copy }: { locale: Locale; copy: HomeCopy["give"] }) {
  return (
    <section className="relative overflow-hidden bg-verd-600 py-16 text-paper-0 lg:py-24">
      <Image
        src="/images/pastor/prayer-hands-raised.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-verd-600/60 to-verd-600/40" />

      <Container className="relative z-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-paper-0/30 bg-paper-0/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.2em]">
              <HandHeart className="h-4 w-4" />
              {copy.badge}
            </span>
            <h2 className="text-heading-1 text-paper-0">{copy.title}</h2>
            <p className="measure mt-4 text-body-l text-paper-0/85">{copy.body}</p>
          </div>

          <div className="shrink-0">
            <Button href={`/${locale}/give`} size="l">
              {copy.cta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
