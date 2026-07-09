import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Start Here page.
 * `en` is the source copy extracted from the page; other locales are translations.
 * The five JourneyCards come from data and are NOT translated here.
 */
export interface StartHereCopy {
  metaTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  journeysEyebrow: string;
  journeysTitle: string;
  journeysIntro: string;
  orientationEyebrow: string;
  orientationTitle: string;
  orientationBody: string;
  ctaTakeOrientation: string;
  ctaTalkMentor: string;
}

export const startHereCopy: Record<Locale, StartHereCopy> = {
  en: {
    metaTitle: "Start Here",
    heroEyebrow: "Start Here",
    heroTitle: "Choose the path that fits where you are",
    heroBody:
      "Don't just browse — begin. Five guided journeys take you from wherever you are today toward raising leaders who transform society. Pick the one that meets your current season.",
    journeysEyebrow: "I want to…",
    journeysTitle: "The five journeys",
    journeysIntro:
      "Each journey is a structured sequence of teachings mapped to a stage of transformation. Choose one to begin, or take the orientation if you're unsure.",
    orientationEyebrow: "Orientation",
    orientationTitle: "Not sure where to begin?",
    orientationBody:
      "Our transformation diagnostic identifies your current stage and recommends the journey best suited to your calling — in about seven minutes.",
    ctaTakeOrientation: "Take the orientation",
    ctaTalkMentor: "Talk to a mentor",
  },
  fr: {
    metaTitle: "Commencez ici",
    heroEyebrow: "Commencez ici",
    heroTitle: "Choisissez le chemin qui correspond à là où vous en êtes",
    heroBody:
      "Ne vous contentez pas de parcourir — commencez. Cinq parcours guidés vous mènent de là où vous êtes aujourd'hui vers la formation de leaders qui transforment la société. Choisissez celui qui correspond à votre saison actuelle.",
    journeysEyebrow: "Je veux…",
    journeysTitle: "Les cinq parcours",
    journeysIntro:
      "Chaque parcours est une séquence structurée d'enseignements associée à une étape de la transformation. Choisissez-en un pour commencer, ou faites l'orientation si vous hésitez.",
    orientationEyebrow: "Orientation",
    orientationTitle: "Vous ne savez pas par où commencer ?",
    orientationBody:
      "Notre diagnostic de transformation identifie votre étape actuelle et recommande le parcours le mieux adapté à votre appel — en environ sept minutes.",
    ctaTakeOrientation: "Faire l'orientation",
    ctaTalkMentor: "Parler à un mentor",
  },
  pt: {
    metaTitle: "Comece aqui",
    heroEyebrow: "Comece aqui",
    heroTitle: "Escolha o caminho que se adequa a onde você está",
    heroBody:
      "Não se limite a explorar — comece. Cinco jornadas guiadas levam-no de onde está hoje até formar líderes que transformam a sociedade. Escolha a que corresponde à sua estação atual.",
    journeysEyebrow: "Eu quero…",
    journeysTitle: "As cinco jornadas",
    journeysIntro:
      "Cada jornada é uma sequência estruturada de ensinamentos mapeada para uma etapa da transformação. Escolha uma para começar, ou faça a orientação se estiver em dúvida.",
    orientationEyebrow: "Orientação",
    orientationTitle: "Não sabe por onde começar?",
    orientationBody:
      "O nosso diagnóstico de transformação identifica a sua etapa atual e recomenda a jornada mais adequada ao seu chamado — em cerca de sete minutos.",
    ctaTakeOrientation: "Fazer a orientação",
    ctaTalkMentor: "Falar com um mentor",
  },
  sw: {
    metaTitle: "Anza Hapa",
    heroEyebrow: "Anza Hapa",
    heroTitle: "Chagua njia inayolingana na ulipo",
    heroBody:
      "Usiishie kutazama tu — anza. Safari tano zilizoongozwa zinakupeleka kutoka ulipo leo hadi kulea viongozi wanaobadilisha jamii. Chagua ile inayolingana na msimu wako wa sasa.",
    journeysEyebrow: "Nataka…",
    journeysTitle: "Safari tano",
    journeysIntro:
      "Kila safari ni mfululizo uliopangwa wa mafundisho unaolingana na hatua ya mabadiliko. Chagua moja ili kuanza, au fanya mwongozo kama huna uhakika.",
    orientationEyebrow: "Mwongozo",
    orientationTitle: "Huna uhakika pa kuanzia?",
    orientationBody:
      "Uchunguzi wetu wa mabadiliko hutambua hatua yako ya sasa na kupendekeza safari inayofaa zaidi kwa wito wako — kwa takriban dakika saba.",
    ctaTakeOrientation: "Fanya mwongozo",
    ctaTalkMentor: "Zungumza na mshauri",
  },
  ar: {
    metaTitle: "ابدأ هنا",
    heroEyebrow: "ابدأ هنا",
    heroTitle: "اختر المسار الذي يناسب موضعك الحالي",
    heroBody:
      "لا تكتفِ بالتصفح — ابدأ. خمس رحلات موجَّهة تأخذك من حيث أنت اليوم نحو إعداد قادة يحوّلون المجتمع. اختر الرحلة التي تناسب موسمك الحالي.",
    journeysEyebrow: "أريد أن…",
    journeysTitle: "الرحلات الخمس",
    journeysIntro:
      "كل رحلة هي سلسلة منظَّمة من التعاليم مرتبطة بمرحلة من مراحل التحوّل. اختر واحدة لتبدأ، أو قم بالتوجيه إذا لم تكن متأكدًا.",
    orientationEyebrow: "التوجيه",
    orientationTitle: "لست متأكدًا من أين تبدأ؟",
    orientationBody:
      "يحدد تشخيص التحوّل لدينا مرحلتك الحالية ويوصي بالرحلة الأنسب لدعوتك — في نحو سبع دقائق.",
    ctaTakeOrientation: "ابدأ التوجيه",
    ctaTalkMentor: "تحدث إلى مرشد",
  },
};
