import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Media page. Individual video titles and
 * press headlines stay in English — translating that long-tail content is a
 * separate project. "GMTV Studio" is a brand name, kept the same across locales.
 */
export interface MediaCopy {
  heroTitle: string;
  heroSubtitle: string;
  tabs: { all: string; teachings: string; gmtv: string; conference: string; podcast: string };
  noVideos: string;
  playVideo: string;
  closeVideo: string;
  podcastHeading: string;
  podcastBody: string;
  podcastComingSoon: string;
  eventsCtaEyebrow: string;
  eventsCtaHeading: string;
  eventsCtaBody: string;
  eventsCtaButton: string;
  pressHeading: string;
  pressCta: string;
}

export const mediaCopy: Record<Locale, MediaCopy> = {
  en: {
    heroTitle: "Watch. Listen. Grow.",
    heroSubtitle: "Decades of transformative teaching, now available wherever you are.",
    tabs: { all: "All", teachings: "Teachings", gmtv: "GMTV Studio", conference: "Conference Archives", podcast: "Podcast" },
    noVideos: "No videos in this category yet.",
    playVideo: "Play video",
    closeVideo: "Close video",
    podcastHeading: "The Transformation Podcast",
    podcastBody: "Subscribe on your favourite platform and never miss an episode.",
    podcastComingSoon: "More on the way",
    eventsCtaEyebrow: "Gather With Us",
    eventsCtaHeading: "Experience It Live",
    eventsCtaBody: "Watching is powerful — being in the room is transformational. Find the next conference, camp meeting, or gathering near you.",
    eventsCtaButton: "See Upcoming Events",
    pressHeading: "Press & Media Appearances",
    pressCta: "For media enquiries",
  },
  fr: {
    heroTitle: "Regardez. Écoutez. Grandissez.",
    heroSubtitle: "Des décennies d'enseignement transformateur, désormais disponibles où que vous soyez.",
    tabs: { all: "Tout", teachings: "Enseignements", gmtv: "GMTV Studio", conference: "Archives de conférences", podcast: "Podcast" },
    noVideos: "Aucune vidéo dans cette catégorie pour l'instant.",
    playVideo: "Lire la vidéo",
    closeVideo: "Fermer la vidéo",
    podcastHeading: "Le Podcast de la Transformation",
    podcastBody: "Abonnez-vous sur votre plateforme préférée et ne manquez plus aucun épisode.",
    podcastComingSoon: "D'autres à venir",
    eventsCtaEyebrow: "Rejoignez-nous",
    eventsCtaHeading: "Vivez-le en direct",
    eventsCtaBody: "Regarder est puissant — être dans la salle est transformateur. Trouvez la prochaine conférence, retraite ou rassemblement près de chez vous.",
    eventsCtaButton: "Voir les événements à venir",
    pressHeading: "Presse et Apparitions Médiatiques",
    pressCta: "Pour les demandes médias",
  },
  pt: {
    heroTitle: "Assista. Ouça. Cresça.",
    heroSubtitle: "Décadas de ensino transformador, agora disponíveis onde quer que você esteja.",
    tabs: { all: "Todos", teachings: "Ensinamentos", gmtv: "GMTV Studio", conference: "Arquivos de Conferências", podcast: "Podcast" },
    noVideos: "Ainda não há vídeos nesta categoria.",
    playVideo: "Reproduzir vídeo",
    closeVideo: "Fechar vídeo",
    podcastHeading: "O Podcast da Transformação",
    podcastBody: "Subscreva na sua plataforma favorita e nunca perca um episódio.",
    podcastComingSoon: "Mais a caminho",
    eventsCtaEyebrow: "Reúna-se Connosco",
    eventsCtaHeading: "Viva ao Vivo",
    eventsCtaBody: "Assistir é poderoso — estar na sala é transformador. Encontre a próxima conferência, acampamento ou encontro perto de si.",
    eventsCtaButton: "Ver Próximos Eventos",
    pressHeading: "Imprensa e Aparições na Mídia",
    pressCta: "Para consultas de imprensa",
  },
  sw: {
    heroTitle: "Tazama. Sikiliza. Kua.",
    heroSubtitle: "Miongo ya mafundisho ya kubadilisha maisha, sasa yanapatikana popote ulipo.",
    tabs: { all: "Vyote", teachings: "Mafundisho", gmtv: "GMTV Studio", conference: "Kumbukumbu za Mikutano", podcast: "Podikasti" },
    noVideos: "Hakuna video katika kategoria hii bado.",
    playVideo: "Cheza video",
    closeVideo: "Funga video",
    podcastHeading: "Podikasti ya Mabadiliko",
    podcastBody: "Jisajili kwenye jukwaa lako unalopenda na usikose kipindi chochote.",
    podcastComingSoon: "Zaidi zinakuja",
    eventsCtaEyebrow: "Kutana Nasi",
    eventsCtaHeading: "Ipate Moja kwa Moja",
    eventsCtaBody: "Kutazama ni nguvu — kuwepo ndani ya chumba kunabadilisha maisha. Pata mkutano, kambi au tukio linalofuata karibu nawe.",
    eventsCtaButton: "Ona Matukio Yajayo",
    pressHeading: "Vyombo vya Habari na Matukio",
    pressCta: "Kwa maswali ya vyombo vya habari",
  },
  ar: {
    heroTitle: "شاهد. استمع. انمُ.",
    heroSubtitle: "عقود من التعاليم التحويلية، متاحة الآن أينما كنت.",
    tabs: { all: "الكل", teachings: "التعاليم", gmtv: "GMTV Studio", conference: "أرشيف المؤتمرات", podcast: "بودكاست" },
    noVideos: "لا توجد مقاطع فيديو في هذه الفئة بعد.",
    playVideo: "تشغيل الفيديو",
    closeVideo: "إغلاق الفيديو",
    podcastHeading: "بودكاست التحول",
    podcastBody: "اشترك على منصتك المفضلة ولا تفوّت أي حلقة.",
    podcastComingSoon: "المزيد قادم",
    eventsCtaEyebrow: "انضم إلينا",
    eventsCtaHeading: "عِشها مباشرة",
    eventsCtaBody: "المشاهدة قوية — لكن التواجد في القاعة يُحدث تحولاً. اعثر على المؤتمر أو المخيم أو التجمع القادم بالقرب منك.",
    eventsCtaButton: "شاهد الفعاليات القادمة",
    pressHeading: "الصحافة والظهور الإعلامي",
    pressCta: "للاستفسارات الإعلامية",
  },
};
