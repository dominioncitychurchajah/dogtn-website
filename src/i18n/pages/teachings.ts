import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Teachings page and its client children.
 * `en` is the source copy extracted from the page; other locales are translations.
 * Teaching titles/descriptions/series come from data and are NOT translated here.
 */
export interface TeachingsCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  filterTopic: string;
  filterFormat: string;
  filterSeries: string;
  filterYear: string;
  allTopics: string;
  allFormats: string;
  allSeries: string;
  allYears: string;
  formatVideo: string;
  formatAudio: string;
  formatArticle: string;
  dataSaver: string;
  showingLabel: string;
  resultSingular: string;
  resultPlural: string;
  featuredBadge: string;
  featuredTitle: string;
  featuredBlurb: string;
  startJourney: string;
  viewCurriculum: string;
  noResults: string;
  bridgeHeading: string;
  bridgeBody: string;
  chooseJourney: string;
  newInLibrary: string;
  viewAllArchive: string;
}

export const teachingsCopy: Record<Locale, TeachingsCopy> = {
  en: {
    metaTitle: "Teachings",
    metaDescription:
      "Access decades of teaching. Search thousands of leadership sessions, theological insights, and transformation frameworks.",
    eyebrow: "Teachings Archive",
    title: "Teachings",
    subtitle:
      "Access decades of teaching. Search thousands of leadership sessions, theological insights, and transformation frameworks.",
    searchPlaceholder: "Search leadership, purpose, family…",
    filterTopic: "Topic",
    filterFormat: "Format",
    filterSeries: "Series",
    filterYear: "Year",
    allTopics: "All Topics",
    allFormats: "All Formats",
    allSeries: "All Series",
    allYears: "All Years",
    formatVideo: "Video",
    formatAudio: "Audio",
    formatArticle: "Article",
    dataSaver: "Data Saver",
    showingLabel: "Showing",
    resultSingular: "Result",
    resultPlural: "Results",
    featuredBadge: "Featured Series",
    featuredTitle: "The Laws of Transformation",
    featuredBlurb:
      "A definitive 12-part series on the principles that govern personal growth and institutional impact. Led by Dr. David Ogbueli and the teaching team.",
    startJourney: "Start Journey",
    viewCurriculum: "View Curriculum",
    noResults: "No teachings match these filters yet.",
    bridgeHeading: "Not sure where to start?",
    bridgeBody:
      "Let us guide you to the teaching path that matches your current season and your goals.",
    chooseJourney: "Choose a Guided Journey",
    newInLibrary: "New in the Library",
    viewAllArchive: "View All Archive",
  },
  fr: {
    metaTitle: "Enseignements",
    metaDescription:
      "Accédez à l'écosystème METANOIA complet. Explorez des milliers de sessions de leadership exclusives, une profondeur théologique et des cadres de transformation.",
    eyebrow: "Moteur de messages",
    title: "Enseignements",
    subtitle:
      "Accédez à l'écosystème METANOIA complet. Explorez des milliers de sessions de leadership exclusives, une profondeur théologique et des cadres de transformation.",
    searchPlaceholder: "Rechercher leadership, vocation, famille…",
    filterTopic: "Thème",
    filterFormat: "Format",
    filterSeries: "Série",
    filterYear: "Année",
    allTopics: "Tous les thèmes",
    allFormats: "Tous les formats",
    allSeries: "Toutes les séries",
    allYears: "Toutes les années",
    formatVideo: "Vidéo",
    formatAudio: "Audio",
    formatArticle: "Article",
    dataSaver: "Économie de données",
    showingLabel: "Affichage de",
    resultSingular: "résultat",
    resultPlural: "résultats",
    featuredBadge: "Série en vedette",
    featuredTitle: "Les Lois de la Transformation",
    featuredBlurb:
      "Un cadre définitif en 12 parties sur la gravité institutionnelle et la physique du changement individuel. Dirigé par les visionnaires mondiaux de la Fondation.",
    startJourney: "Commencer le parcours",
    viewCurriculum: "Voir le programme",
    noResults: "Aucun enseignement ne correspond à ces filtres pour le moment.",
    bridgeHeading: "Vous ne savez pas par où commencer ?",
    bridgeBody:
      "Laissez notre moteur de programme associer votre saison de leadership actuelle au parcours de transformation le plus pertinent.",
    chooseJourney: "Choisir un parcours guidé",
    newInLibrary: "Nouveautés de la bibliothèque",
    viewAllArchive: "Voir toutes les archives",
  },
  pt: {
    metaTitle: "Ensinamentos",
    metaDescription:
      "Aceda ao ecossistema METANOIA completo. Pesquise milhares de sessões de liderança exclusivas, profundidade teológica e estruturas de transformação.",
    eyebrow: "Motor de mensagens",
    title: "Ensinamentos",
    subtitle:
      "Aceda ao ecossistema METANOIA completo. Pesquise milhares de sessões de liderança exclusivas, profundidade teológica e estruturas de transformação.",
    searchPlaceholder: "Pesquisar liderança, propósito, família…",
    filterTopic: "Tema",
    filterFormat: "Formato",
    filterSeries: "Série",
    filterYear: "Ano",
    allTopics: "Todos os temas",
    allFormats: "Todos os formatos",
    allSeries: "Todas as séries",
    allYears: "Todos os anos",
    formatVideo: "Vídeo",
    formatAudio: "Áudio",
    formatArticle: "Artigo",
    dataSaver: "Poupança de dados",
    showingLabel: "A mostrar",
    resultSingular: "resultado",
    resultPlural: "resultados",
    featuredBadge: "Série em destaque",
    featuredTitle: "As Leis da Transformação",
    featuredBlurb:
      "Uma estrutura definitiva em 12 partes sobre a gravidade institucional e a física da mudança individual. Conduzida pelos visionários globais da Fundação.",
    startJourney: "Iniciar jornada",
    viewCurriculum: "Ver currículo",
    noResults: "Nenhum ensinamento corresponde a estes filtros por enquanto.",
    bridgeHeading: "Não sabe por onde começar?",
    bridgeBody:
      "Deixe o nosso motor de currículo associar a sua estação de liderança atual ao caminho de transformação mais relevante.",
    chooseJourney: "Escolher uma jornada guiada",
    newInLibrary: "Novidades na biblioteca",
    viewAllArchive: "Ver todo o arquivo",
  },
  sw: {
    metaTitle: "Mafundisho",
    metaDescription:
      "Fikia mfumo kamili wa METANOIA. Tafuta maelfu ya vipindi vya uongozi vya kipekee, kina cha kitheolojia, na miundo ya mabadiliko.",
    eyebrow: "Injini ya Ujumbe",
    title: "Mafundisho",
    subtitle:
      "Fikia mfumo kamili wa METANOIA. Tafuta maelfu ya vipindi vya uongozi vya kipekee, kina cha kitheolojia, na miundo ya mabadiliko.",
    searchPlaceholder: "Tafuta uongozi, kusudi, familia…",
    filterTopic: "Mada",
    filterFormat: "Muundo",
    filterSeries: "Msururu",
    filterYear: "Mwaka",
    allTopics: "Mada zote",
    allFormats: "Miundo yote",
    allSeries: "Misururu yote",
    allYears: "Miaka yote",
    formatVideo: "Video",
    formatAudio: "Sauti",
    formatArticle: "Makala",
    dataSaver: "Kuokoa Data",
    showingLabel: "Inaonyesha",
    resultSingular: "tokeo",
    resultPlural: "matokeo",
    featuredBadge: "Msururu Maalum",
    featuredTitle: "Sheria za Mabadiliko",
    featuredBlurb:
      "Muundo kamili wa sehemu 12 kuhusu mvuto wa kitaasisi na fizikia ya mabadiliko ya mtu binafsi. Ukiongozwa na wenye maono wa kimataifa wa Msingi.",
    startJourney: "Anza Safari",
    viewCurriculum: "Tazama Mtaala",
    noResults: "Hakuna mafundisho yanayolingana na vichujio hivi kwa sasa.",
    bridgeHeading: "Huna uhakika pa kuanzia?",
    bridgeBody:
      "Acha injini yetu ya mtaala ilinganishe msimu wako wa sasa wa uongozi na njia ya mabadiliko inayofaa zaidi.",
    chooseJourney: "Chagua Safari Iliyoongozwa",
    newInLibrary: "Mpya Maktabani",
    viewAllArchive: "Tazama Kumbukumbu Zote",
  },
  ar: {
    metaTitle: "التعاليم",
    metaDescription:
      "ادخل إلى منظومة METANOIA الكاملة. ابحث في آلاف جلسات القيادة الحصرية والعمق اللاهوتي وأطر التحوّل.",
    eyebrow: "محرك الرسائل",
    title: "التعاليم",
    subtitle:
      "ادخل إلى منظومة METANOIA الكاملة. ابحث في آلاف جلسات القيادة الحصرية والعمق اللاهوتي وأطر التحوّل.",
    searchPlaceholder: "ابحث عن القيادة، الهدف، الأسرة…",
    filterTopic: "الموضوع",
    filterFormat: "الصيغة",
    filterSeries: "السلسلة",
    filterYear: "السنة",
    allTopics: "كل المواضيع",
    allFormats: "كل الصيغ",
    allSeries: "كل السلاسل",
    allYears: "كل السنوات",
    formatVideo: "فيديو",
    formatAudio: "صوت",
    formatArticle: "مقال",
    dataSaver: "توفير البيانات",
    showingLabel: "عرض",
    resultSingular: "نتيجة",
    resultPlural: "نتائج",
    featuredBadge: "سلسلة مميزة",
    featuredTitle: "قوانين التحوّل",
    featuredBlurb:
      "إطار حاسم من 12 جزءًا حول الجاذبية المؤسسية وفيزياء التغيير الفردي. بقيادة روّاد المؤسسة العالميين.",
    startJourney: "ابدأ الرحلة",
    viewCurriculum: "اطّلع على المنهج",
    noResults: "لا توجد تعاليم تطابق هذه المرشّحات حتى الآن.",
    bridgeHeading: "لست متأكدًا من أين تبدأ؟",
    bridgeBody: "دع محرك المناهج لدينا يربط موسم قيادتك الحالي بأنسب مسار للتحوّل.",
    chooseJourney: "اختر رحلة موجَّهة",
    newInLibrary: "جديد في المكتبة",
    viewAllArchive: "عرض كل الأرشيف",
  },
};
