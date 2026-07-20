import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Media page. Individual video titles,
 * press headlines, and TV schedule programme names stay in English —
 * translating that long-tail content is a separate project.
 */
export interface MediaCopy {
  heroTitle: string;
  heroSubtitle: string;
  tabs: { all: string; teachings: string; tv: string; podcast: string; conference: string };
  noVideos: string;
  tvHeading: string;
  tvBody: string;
  liveBroadcast: string;
  podcastHeading: string;
  podcastBody: string;
  pressHeading: string;
  pressCta: string;
}

export const mediaCopy: Record<Locale, MediaCopy> = {
  en: {
    heroTitle: "Watch. Listen. Grow.",
    heroSubtitle: "Decades of transformative teaching, now available wherever you are.",
    tabs: { all: "All", teachings: "Teachings", tv: "TV Broadcast", podcast: "Podcast", conference: "Conference Archives" },
    noVideos: "No videos in this category yet — see the section below.",
    tvHeading: "Expand Your World",
    tvBody: "Join thousands globally who tune in to the weekly TV broadcast. Experience life-transforming messages right from your living room.",
    liveBroadcast: "LIVE BROADCAST",
    podcastHeading: "The Transformation Podcast",
    podcastBody: "Subscribe on your favourite platform and never miss an episode.",
    pressHeading: "Press & Media Appearances",
    pressCta: "For media enquiries",
  },
  fr: {
    heroTitle: "Regardez. Écoutez. Grandissez.",
    heroSubtitle: "Des décennies d'enseignement transformateur, désormais disponibles où que vous soyez.",
    tabs: { all: "Tout", teachings: "Enseignements", tv: "Diffusion TV", podcast: "Podcast", conference: "Archives de conférences" },
    noVideos: "Aucune vidéo dans cette catégorie pour l'instant — voir la section ci-dessous.",
    tvHeading: "Élargissez votre monde",
    tvBody: "Rejoignez des milliers de personnes à travers le monde qui suivent la diffusion TV hebdomadaire. Vivez des messages qui transforment la vie, depuis votre salon.",
    liveBroadcast: "DIFFUSION EN DIRECT",
    podcastHeading: "Le Podcast de la Transformation",
    podcastBody: "Abonnez-vous sur votre plateforme préférée et ne manquez plus aucun épisode.",
    pressHeading: "Presse et Apparitions Médiatiques",
    pressCta: "Pour les demandes médias",
  },
  pt: {
    heroTitle: "Assista. Ouça. Cresça.",
    heroSubtitle: "Décadas de ensino transformador, agora disponíveis onde quer que você esteja.",
    tabs: { all: "Todos", teachings: "Ensinamentos", tv: "Transmissão TV", podcast: "Podcast", conference: "Arquivos de Conferências" },
    noVideos: "Ainda não há vídeos nesta categoria — veja a secção abaixo.",
    tvHeading: "Expanda o Seu Mundo",
    tvBody: "Junte-se a milhares de pessoas em todo o mundo que sintonizam a transmissão semanal na TV. Viva mensagens transformadoras direto da sua sala.",
    liveBroadcast: "TRANSMISSÃO AO VIVO",
    podcastHeading: "O Podcast da Transformação",
    podcastBody: "Subscreva na sua plataforma favorita e nunca perca um episódio.",
    pressHeading: "Imprensa e Aparições na Mídia",
    pressCta: "Para consultas de imprensa",
  },
  sw: {
    heroTitle: "Tazama. Sikiliza. Kua.",
    heroSubtitle: "Miongo ya mafundisho ya kubadilisha maisha, sasa yanapatikana popote ulipo.",
    tabs: { all: "Vyote", teachings: "Mafundisho", tv: "Matangazo ya TV", podcast: "Podikasti", conference: "Kumbukumbu za Mikutano" },
    noVideos: "Hakuna video katika kategoria hii bado — angalia sehemu iliyo hapa chini.",
    tvHeading: "Panua Dunia Yako",
    tvBody: "Jiunge na maelfu duniani kote wanaofuatilia matangazo ya kila wiki ya TV. Pata ujumbe wa kubadilisha maisha moja kwa moja kutoka sebuleni mwako.",
    liveBroadcast: "MATANGAZO YA MOJA KWA MOJA",
    podcastHeading: "Podikasti ya Mabadiliko",
    podcastBody: "Jisajili kwenye jukwaa lako unalopenda na usikose kipindi chochote.",
    pressHeading: "Vyombo vya Habari na Matukio",
    pressCta: "Kwa maswali ya vyombo vya habari",
  },
  ar: {
    heroTitle: "شاهد. استمع. انمُ.",
    heroSubtitle: "عقود من التعاليم التحويلية، متاحة الآن أينما كنت.",
    tabs: { all: "الكل", teachings: "التعاليم", tv: "البث التلفزيوني", podcast: "بودكاست", conference: "أرشيف المؤتمرات" },
    noVideos: "لا توجد مقاطع فيديو في هذه الفئة بعد — انظر القسم أدناه.",
    tvHeading: "وسّع عالمك",
    tvBody: "انضم إلى آلاف الأشخاص حول العالم الذين يتابعون البث التلفزيوني الأسبوعي. عِش رسائل تغيّر الحياة من غرفة معيشتك مباشرة.",
    liveBroadcast: "بث مباشر",
    podcastHeading: "بودكاست التحول",
    podcastBody: "اشترك على منصتك المفضلة ولا تفوّت أي حلقة.",
    pressHeading: "الصحافة والظهور الإعلامي",
    pressCta: "للاستفسارات الإعلامية",
  },
};
