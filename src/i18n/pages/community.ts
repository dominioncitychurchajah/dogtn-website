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
}

export const communityCopy: Record<Locale, CommunityCopy> = {
  en: {
    metaTitle: "Community",
    metaDescription: "Our community experience is being rebuilt as a dedicated app.",
    badge: "(Our Alternate Community App is in progress)",
    title: "Work in Progress",
    subtitle: "",
    body: "We're building a dedicated community experience away from this website. Once it's ready, this tab will take you straight there. Thank you for your patience.",
  },
  fr: {
    metaTitle: "Communauté",
    metaDescription: "Notre espace communautaire est en cours de reconstruction sous forme d'application dédiée.",
    badge: "(Notre application communautaire dédiée est en préparation)",
    title: "En cours de réalisation",
    subtitle: "",
    body: "Nous développons une expérience communautaire dédiée en dehors de ce site web. Dès qu'elle sera prête, cet onglet vous y conduira directement. Merci de votre patience.",
  },
  pt: {
    metaTitle: "Comunidade",
    metaDescription: "A nossa experiência de comunidade está a ser reconstruída como uma aplicação dedicada.",
    badge: "(A nossa aplicação de comunidade dedicada está em desenvolvimento)",
    title: "Em construção",
    subtitle: "",
    body: "Estamos a construir uma experiência de comunidade dedicada fora deste site. Assim que estiver pronta, este separador levá-lo-á diretamente até lá. Obrigado pela sua paciência.",
  },
  sw: {
    metaTitle: "Jamii",
    metaDescription: "Huduma yetu ya jamii inajengwa upya kama programu maalum.",
    badge: "(Programu yetu maalum ya jamii inaendelezwa)",
    title: "Kazi Inaendelea",
    subtitle: "",
    body: "Tunajenga huduma maalum ya jamii nje ya tovuti hii. Itakapokamilika, kichupo hiki kitakupeleka moja kwa moja huko. Asante kwa uvumilivu wako.",
  },
  ar: {
    metaTitle: "المجتمع",
    metaDescription: "تجربة المجتمع لدينا يُعاد بناؤها كتطبيق مخصص.",
    badge: "(تطبيق المجتمع المخصص لدينا قيد التطوير)",
    title: "العمل قيد التنفيذ",
    subtitle: "",
    body: "نحن نبني تجربة مجتمعية مخصصة خارج هذا الموقع. وبمجرد أن تصبح جاهزة، سينقلك هذا التبويب إليها مباشرةً. شكرًا لصبرك.",
  },
};
