import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module pattern.
 * Each key page exports `Record<Locale, {...}>` of its static UI copy.
 * Pages read `copy[locale]`; client children receive the needed strings as props.
 */
export interface CommunityCopy {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  cards: Array<{ title: string; body: string; href: string; cta: string }>;
}

export const communityCopy: Record<Locale, CommunityCopy> = {
  en: {
    metaTitle: "Community",
    metaDescription: "Connect with the Dominion City family online, in person, and through local chapters.",
    badge: "Connect with your global family",
    title: "Find your place to belong and grow.",
    subtitle: "Community is not a placeholder here. It is the pathway.",
    body: "Whether you are planning your first visit, looking for a chapter, joining the WhatsApp broadcast, or taking your next step in service, we want to help you connect with people who will walk with you.",
    primaryCta: "Request WhatsApp Access",
    secondaryCta: "Plan Your Visit",
    cards: [
      {
        title: "Visit This Sunday",
        body: "Join us in person at Dominion City Auditorium, Ajah. Expect a warm welcome, heartfelt worship, and a practical message rooted in Scripture.",
        href: "/events",
        cta: "See Gatherings",
      },
      {
        title: "Find a Chapter",
        body: "Explore local communities and transformation hubs connected to the wider network.",
        href: "/institutions/dominion-city",
        cta: "Explore Locations",
      },
      {
        title: "Need Prayer?",
        body: "Reach out for prayer, counsel, or a human touchpoint. Someone from the team can help you take the next step.",
        href: "mailto:support@davidogbueli.org?subject=Prayer%20Request",
        cta: "Send a Request",
      },
    ],
  },
  fr: {
    metaTitle: "Communauté",
    metaDescription: "Connectez-vous à la famille Dominion City en ligne, en personne et à travers les chapitres locaux.",
    badge: "Connectez-vous à votre famille mondiale",
    title: "Trouvez votre place pour appartenir et grandir.",
    subtitle: "La communauté est un chemin, pas une page vide.",
    body: "Que vous planifiiez votre première visite, cherchiez un chapitre, rejoigniez la diffusion WhatsApp ou serviez, nous voulons vous aider à avancer avec les bonnes personnes.",
    primaryCta: "Rejoindre WhatsApp",
    secondaryCta: "Planifier une visite",
    cards: [],
  },
  pt: {
    metaTitle: "Comunidade",
    metaDescription: "Conecte-se com a família Dominion City online, presencialmente e por capítulos locais.",
    badge: "Conecte-se com a sua família global",
    title: "Encontre o seu lugar para pertencer e crescer.",
    subtitle: "Comunidade e um caminho, nao uma pagina vazia.",
    body: "Quer esteja a planear a sua primeira visita, procurar um capitulo, juntar-se ao WhatsApp ou servir, queremos ajudar no seu proximo passo.",
    primaryCta: "Entrar no WhatsApp",
    secondaryCta: "Planear visita",
    cards: [],
  },
  sw: {
    metaTitle: "Jamii",
    metaDescription: "Ungana na familia ya Dominion City mtandaoni, ana kwa ana, na kupitia matawi ya karibu.",
    badge: "Ungana na familia yako ya kimataifa",
    title: "Pata mahali pa kuhusika na kukua.",
    subtitle: "Jamii ni njia, si ukurasa mtupu.",
    body: "Iwe unapanga ziara yako ya kwanza, unatafuta tawi, unajiunga na WhatsApp au unataka kuhudumu, tunataka kukusaidia kuchukua hatua inayofuata.",
    primaryCta: "Jiunge WhatsApp",
    secondaryCta: "Panga Ziara",
    cards: [],
  },
  ar: {
    metaTitle: "المجتمع",
    metaDescription: "تواصل مع عائلة دومينيون سيتي عبر الإنترنت والحضور والفروع المحلية.",
    badge: "تواصل مع عائلتك العالمية",
    title: "اعثر على مكانك للانتماء والنمو.",
    subtitle: "المجتمع ليس صفحة فارغة، بل طريق للنمو.",
    body: "سواء كنت تخطط لزيارتك الأولى أو تبحث عن فرع أو تنضم إلى واتساب أو تخدم، نريد مساعدتك في خطوتك التالية.",
    primaryCta: "انضم إلى واتساب",
    secondaryCta: "خطط لزيارتك",
    cards: [],
  },
};
