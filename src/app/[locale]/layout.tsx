import { notFound } from "next/navigation";
import { locales, isLocale, dirFor, type Locale } from "@/i18n/config";
import { getDictionary, t } from "@/lib/i18n-utils";
import { HtmlLangDir } from "@/components/layout/HtmlLangDir";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MiniAudioPlayer } from "@/components/layout/MiniAudioPlayer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ToastProvider } from "@/components/ui/Toast";
import type { NavStrings } from "@/components/layout/nav-config";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  return {
    title: { default: `${t(dict, "brand.name")} · ${t(dict, "brand.network")}`, template: `%s · ${t(dict, "brand.name")}` },
    description: t(dict, "brand.tagline"),
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const navStrings: NavStrings = {
    startHere: t(dict, "nav.startHere"),
    teachings: t(dict, "nav.teachings"),
    leadership: t(dict, "nav.leadership"),
    mentorship: t(dict, "nav.mentorship"),
    institutions: t(dict, "nav.institutions"),
    community: t(dict, "nav.community"),
    events: t(dict, "nav.events"),
    library: t(dict, "nav.library"),
    partnership: t(dict, "nav.partnership"),
    give: t(dict, "nav.give"),
    myJourney: t(dict, "nav.myJourney"),
    search: t(dict, "nav.search"),
    account: t(dict, "nav.account"),
    menu: t(dict, "nav.menu"),
  };

  return (
    <div dir={dirFor(locale)} className="flex min-h-dvh flex-col">
      <HtmlLangDir locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-[var(--radius-m)] focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper-0"
      >
        Skip to content
      </a>
      <ToastProvider>
        <Header locale={locale} strings={navStrings} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <MiniAudioPlayer />
        <ChatWidget locale={locale} />
      </ToastProvider>
    </div>
  );
}
