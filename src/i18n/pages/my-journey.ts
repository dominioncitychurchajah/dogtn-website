import type { Locale } from "@/i18n/config";
import type { Stage } from "@/data/types";

/** Per-page translation module for the My Journey dashboard. */
export interface MyJourneyCopy {
  metaTitle: string;
  eyebrow: string;
  welcome: string;
  currentStage: string;
  stages: Record<Stage, string>;
  journeyProgress: string;
  complete: string;
  checklist: [
    { label: string; detail: string },
    { label: string; detail: string },
    { label: string; detail: string },
  ];
  continueLearning: string;
  viewAll: string;
  progress: string;
  /** 2 continue-learning cards (badge + description + cta; titles stay as program names) */
  cards: [
    { badge: string; desc: string; cta: string },
    { badge: string; desc: string; cta: string },
  ];
  /** 4 utility tiles */
  utilities: [
    { label: string; desc: string },
    { label: string; desc: string },
    { label: string; desc: string },
    { label: string; desc: string },
  ];
  recommendedForYou: string;
  assessmentTitle: string;
  assessmentBody: string;
  cohortNote: string;
  beginAssessment: string;
}

export const myJourneyCopy: Record<Locale, MyJourneyCopy> = {
  en: {
    metaTitle: "My Journey",
    eyebrow: "Personal Dashboard",
    welcome: "Welcome back, Chidera.",
    currentStage: "Current Stage:",
    stages: { Visitor: "Visitor", Learner: "Learner", Disciple: "Disciple", Leader: "Leader", Mentor: "Mentor", "Nation Builder": "Nation Builder" },
    journeyProgress: "Journey Progress",
    complete: "Complete",
    checklist: [
      { label: "Complete current journey", detail: "Modules remaining: 4/12" },
      { label: "Join a chapter", detail: "Connect with your local cohort" },
      { label: "Save one reflection", detail: "Document your spiritual growth" },
    ],
    continueLearning: "Continue Learning",
    viewAll: "View All",
    progress: "Progress",
    cards: [
      { badge: "Transformation", desc: "Developing the internal character and external skills required for global influence.", cta: "Resume" },
      { badge: "Institutional", desc: "The fundamental principles of the Disciple Leadership Institute curriculum.", cta: "Start Module 2" },
    ],
    utilities: [
      { label: "Certificates", desc: "Access your earned institutional credentials and badges." },
      { label: "Events", desc: "Register for upcoming leadership summits and conferences." },
      { label: "Applications", desc: "Review status for chapter leading or mentor applications." },
      { label: "Giving", desc: "Track your kingdom contributions and institutional impact." },
    ],
    recommendedForYou: "Recommended for you",
    assessmentTitle: "Take the Leadership Assessment",
    assessmentBody: "Discover your unique gifting profile and how it aligns with the 7 mountains of influence.",
    cohortNote: "Taken by others in your cohort",
    beginAssessment: "Begin Assessment",
  },
  fr: {
    metaTitle: "Mon Parcours",
    eyebrow: "Tableau de bord personnel",
    welcome: "Bon retour, Chidera.",
    currentStage: "Étape actuelle :",
    stages: { Visitor: "Visiteur", Learner: "Apprenant", Disciple: "Disciple", Leader: "Leader", Mentor: "Mentor", "Nation Builder": "Bâtisseur de nation" },
    journeyProgress: "Progression du parcours",
    complete: "Terminé",
    checklist: [
      { label: "Terminer le parcours actuel", detail: "Modules restants : 4/12" },
      { label: "Rejoindre un chapitre", detail: "Connectez-vous à votre cohorte locale" },
      { label: "Enregistrer une réflexion", detail: "Documentez votre croissance spirituelle" },
    ],
    continueLearning: "Continuer l'apprentissage",
    viewAll: "Tout voir",
    progress: "Progression",
    cards: [
      { badge: "Transformation", desc: "Développer le caractère intérieur et les compétences externes requis pour une influence mondiale.", cta: "Reprendre" },
      { badge: "Institutionnel", desc: "Les principes fondamentaux du cursus du Disciple Leadership Institute.", cta: "Commencer le module 2" },
    ],
    utilities: [
      { label: "Certificats", desc: "Accédez à vos accréditations et badges institutionnels." },
      { label: "Événements", desc: "Inscrivez-vous aux prochains sommets et conférences de leadership." },
      { label: "Candidatures", desc: "Suivez le statut de vos candidatures de responsable ou de mentor." },
      { label: "Dons", desc: "Suivez vos contributions et votre impact institutionnel." },
    ],
    recommendedForYou: "Recommandé pour vous",
    assessmentTitle: "Faire l'évaluation de leadership",
    assessmentBody: "Découvrez votre profil de dons unique et son alignement avec les 7 sphères d'influence.",
    cohortNote: "Réalisée par d'autres dans votre cohorte",
    beginAssessment: "Commencer l'évaluation",
  },
  pt: {
    metaTitle: "Minha Jornada",
    eyebrow: "Painel Pessoal",
    welcome: "Bem-vindo de volta, Chidera.",
    currentStage: "Estágio atual:",
    stages: { Visitor: "Visitante", Learner: "Aprendiz", Disciple: "Discípulo", Leader: "Líder", Mentor: "Mentor", "Nation Builder": "Construtor de Nações" },
    journeyProgress: "Progresso da jornada",
    complete: "Concluído",
    checklist: [
      { label: "Concluir a jornada atual", detail: "Módulos restantes: 4/12" },
      { label: "Juntar-se a um capítulo", detail: "Conecte-se à sua coorte local" },
      { label: "Guardar uma reflexão", detail: "Documente o seu crescimento espiritual" },
    ],
    continueLearning: "Continuar a aprender",
    viewAll: "Ver tudo",
    progress: "Progresso",
    cards: [
      { badge: "Transformação", desc: "Desenvolvendo o caráter interior e as competências externas necessárias para a influência global.", cta: "Retomar" },
      { badge: "Institucional", desc: "Os princípios fundamentais do currículo do Disciple Leadership Institute.", cta: "Iniciar Módulo 2" },
    ],
    utilities: [
      { label: "Certificados", desc: "Aceda às suas credenciais e distintivos institucionais." },
      { label: "Eventos", desc: "Inscreva-se nas próximas cimeiras e conferências de liderança." },
      { label: "Candidaturas", desc: "Reveja o estado das candidaturas a líder de capítulo ou mentor." },
      { label: "Doações", desc: "Acompanhe as suas contribuições e o seu impacto institucional." },
    ],
    recommendedForYou: "Recomendado para si",
    assessmentTitle: "Fazer a Avaliação de Liderança",
    assessmentBody: "Descubra o seu perfil de dons único e como se alinha com as 7 esferas de influência.",
    cohortNote: "Feita por outros na sua coorte",
    beginAssessment: "Iniciar Avaliação",
  },
  sw: {
    metaTitle: "Safari Yangu",
    eyebrow: "Dashibodi ya Kibinafsi",
    welcome: "Karibu tena, Chidera.",
    currentStage: "Hatua ya sasa:",
    stages: { Visitor: "Mgeni", Learner: "Mwanafunzi", Disciple: "Mwanafunzi wa Karibu", Leader: "Kiongozi", Mentor: "Mshauri", "Nation Builder": "Mjenzi wa Taifa" },
    journeyProgress: "Maendeleo ya Safari",
    complete: "Imekamilika",
    checklist: [
      { label: "Kamilisha safari ya sasa", detail: "Moduli zilizobaki: 4/12" },
      { label: "Jiunge na tawi", detail: "Ungana na kikundi chako cha eneo" },
      { label: "Hifadhi tafakari moja", detail: "Andika ukuaji wako wa kiroho" },
    ],
    continueLearning: "Endelea Kujifunza",
    viewAll: "Ona zote",
    progress: "Maendeleo",
    cards: [
      { badge: "Mageuzi", desc: "Kukuza tabia ya ndani na ujuzi wa nje unaohitajika kwa ushawishi wa kimataifa.", cta: "Endelea" },
      { badge: "Kitaasisi", desc: "Kanuni za msingi za mtaala wa Disciple Leadership Institute.", cta: "Anza Moduli ya 2" },
    ],
    utilities: [
      { label: "Vyeti", desc: "Fikia vyeti na beji zako za kitaasisi." },
      { label: "Matukio", desc: "Jisajili kwa mikutano na makongamano ya uongozi yajayo." },
      { label: "Maombi", desc: "Angalia hali ya maombi ya uongozi wa tawi au ushauri." },
      { label: "Kutoa", desc: "Fuatilia michango yako na athari yako ya kitaasisi." },
    ],
    recommendedForYou: "Imependekezwa kwako",
    assessmentTitle: "Fanya Tathmini ya Uongozi",
    assessmentBody: "Gundua wasifu wako wa kipekee wa vipawa na jinsi unavyolingana na nyanja 7 za ushawishi.",
    cohortNote: "Imefanywa na wengine katika kikundi chako",
    beginAssessment: "Anza Tathmini",
  },
  ar: {
    metaTitle: "رحلتي",
    eyebrow: "لوحة التحكم الشخصية",
    welcome: "مرحبًا بعودتك، تشيديرا.",
    currentStage: "المرحلة الحالية:",
    stages: { Visitor: "زائر", Learner: "متعلّم", Disciple: "تلميذ", Leader: "قائد", Mentor: "مُرشد", "Nation Builder": "باني الأمم" },
    journeyProgress: "تقدّم الرحلة",
    complete: "مكتمل",
    checklist: [
      { label: "أكمل الرحلة الحالية", detail: "الوحدات المتبقية: 4/12" },
      { label: "انضم إلى فرع", detail: "تواصل مع مجموعتك المحلية" },
      { label: "احفظ تأملاً واحدًا", detail: "وثّق نموك الروحي" },
    ],
    continueLearning: "متابعة التعلّم",
    viewAll: "عرض الكل",
    progress: "التقدّم",
    cards: [
      { badge: "تحوّل", desc: "تنمية الشخصية الداخلية والمهارات الخارجية اللازمة للتأثير العالمي.", cta: "استئناف" },
      { badge: "مؤسسي", desc: "المبادئ الأساسية لمنهج معهد قيادة التلاميذ.", cta: "ابدأ الوحدة 2" },
    ],
    utilities: [
      { label: "الشهادات", desc: "اطّلع على اعتماداتك وشاراتك المؤسسية." },
      { label: "الفعاليات", desc: "سجّل في قمم ومؤتمرات القيادة القادمة." },
      { label: "الطلبات", desc: "راجع حالة طلبات قيادة الفرع أو الإرشاد." },
      { label: "العطاء", desc: "تابع مساهماتك وأثرك المؤسسي." },
    ],
    recommendedForYou: "موصى به لك",
    assessmentTitle: "ابدأ تقييم القيادة",
    assessmentBody: "اكتشف ملف مواهبك الفريد وكيف يتوافق مع مجالات التأثير السبعة.",
    cohortNote: "قام به آخرون في مجموعتك",
    beginAssessment: "ابدأ التقييم",
  },
};
