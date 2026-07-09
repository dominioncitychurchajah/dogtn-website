import Image from "next/image";
import type { Metadata } from "next";
import { Users, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Section";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { communityCopy } from "@/i18n/pages/community";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = communityCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = communityCopy[loc];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-900 text-paper-0">
      <Image
        src="/images/pastor/community-vestments-auditorium.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/85 to-ink-900" aria-hidden />
      <Container className="relative py-24 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-600/15 text-gold-400">
            <Users className="h-8 w-8" aria-hidden />
          </span>
          <h1 className="mt-6 text-heading-1">{c.title}</h1>
          <p className="mt-3 inline-flex items-center gap-2 text-body-m text-ink-300">
            <Sparkles className="h-4 w-4 text-gold-400" aria-hidden />
            {c.badge}
          </p>
          <p className="mt-6 measure text-body-m text-ink-300">{c.body}</p>
        </div>
      </Container>
    </section>
  );
}
