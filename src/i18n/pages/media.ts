import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Media page. Individual video titles and
 * press headlines stay in English — translating that long-tail content is a
 * separate project. "GMTV Studio" is a brand name, kept the same across locales.
 */
export interface MediaCopy {
  /** Section name shown above the hero title — the Media Center identity. */
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  tabs: { all: string; teachings: string; gmtv: string; conference: string; podcast: string };
  noVideos: string;
  featuredLabel: string;
  watchNow: string;
  browseAll: string;
  videoCount: string;
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
    eyebrow: "Media Center",
    heroTitle: "Expand Your World",
    heroSubtitle: "Decades of transformative teaching, now available wherever you are.",
    tabs: { all: "All", teachings: "Teachings", gmtv: "GMTV Studio", conference: "Conference Archives", podcast: "Podcast" },
    noVideos: "No videos in this category yet.",
    featuredLabel: "Featured",
    watchNow: "Watch now",
    browseAll: "Browse everything",
    videoCount: "messages",
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
    eyebrow: "Centre Média",
    heroTitle: "Élargissez Votre Monde",
    heroSubtitle: "Des décennies d'enseignement transformateur, désormais disponibles où que vous soyez.",
    tabs: { all: "Tout", teachings: "Enseignements", gmtv: "GMTV Studio", conference: "Archives de conférences", podcast: "Podcast" },
    noVideos: "Aucune vidéo dans cette catégorie pour l'instant.",
    featuredLabel: "À la une",
    watchNow: "Regarder",
    browseAll: "Tout parcourir",
    videoCount: "messages",
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
    eyebrow: "Centro de Mídia",
    heroTitle: "Expanda o Seu Mundo",
    heroSubtitle: "Décadas de ensino transformador, agora disponíveis onde quer que você esteja.",
    tabs: { all: "Todos", teachings: "Ensinamentos", gmtv: "GMTV Studio", conference: "Arquivos de Conferências", podcast: "Podcast" },
    noVideos: "Ainda não há vídeos nesta categoria.",
    featuredLabel: "Destaque",
    watchNow: "Assistir agora",
    browseAll: "Ver tudo",
    videoCount: "mensagens",
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
    eyebrow: "Kituo cha Habari",
    heroTitle: "Panua Ulimwengu Wako",
    heroSubtitle: "Miongo ya mafundisho ya kubadilisha maisha, sasa yanapatikana popote ulipo.",
    tabs: { all: "Vyote", teachings: "Mafundisho", gmtv: "GMTV Studio", conference: "Kumbukumbu za Mikutano", podcast: "Podikasti" },
    noVideos: "Hakuna video katika kategoria hii bado.",
    featuredLabel: "Iliyoangaziwa",
    watchNow: "Tazama sasa",
    browseAll: "Vinjari vyote",
    videoCount: "mahubiri",
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
    eyebrow: "مركز الإعلام",
    heroTitle: "وسّع عالمك",
    heroSubtitle: "عقود من التعاليم التحويلية، متاحة الآن أينما كنت.",
    tabs: { all: "الكل", teachings: "التعاليم", gmtv: "GMTV Studio", conference: "أرشيف المؤتمرات", podcast: "بودكاست" },
    noVideos: "لا توجد مقاطع فيديو في هذه الفئة بعد.",
    featuredLabel: "مميّز",
    watchNow: "شاهد الآن",
    browseAll: "تصفّح الكل",
    videoCount: "رسالة",
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
