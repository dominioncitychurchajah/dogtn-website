import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Leadership page.
 * The server page reads `leadershipCopy[locale]` and passes strings to client
 * children; `CertVerifier` imports this module and reads it via a `locale` prop.
 */
export interface LeadershipCopy {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  startAssessment: string;
  exploreCourses: string;
  bentoTitle: string;
  bentoSubtitle: string;
  quickAssessment: string;
  /** 5 pillar labels: Character, Vision, Competence, Influence, Service */
  pillars: [string, string, string, string, string];
  launchEngine: string;
  globalFootprint: string;
  certifiedLeaders: string;
  countries: string;
  quote: string;
  pathwayTitle: string;
  pathwaySubtitle: string;
  /** 4 pathway steps in order: DLI Basic, DLI Advanced, Certification, Leadership Tracks */
  pathway: [
    { title: string; caption: string },
    { title: string; caption: string },
    { title: string; caption: string },
    { title: string; caption: string },
  ];
  activeEnrollment: string;
  coreModules: string;
  viewAllCourses: string;
  duration: string;
  format: string;
  nextCohort: string;
  weeks: string;
  formatHybrid: string;
  formatIntensive: string;
  /** 2 module blurbs, in order (Foundation, Strategic) */
  blurbs: [string, string];
  viewCourse: string;
  journalTitle: string;
  validateTitle: string;
  validateBody: string;
  certPlaceholder: string;
  verify: string;
  blockchainNote: string;
  certNote: string;
}

export const leadershipCopy: Record<Locale, LeadershipCopy> = {
  en: {
    metaTitle: "Leadership",
    metaDescription:
      "Assess your growth, find the right pathway, and build the character needed for lasting impact.",
    heroEyebrow: "Leadership Development",
    heroTitle: "Develop Your Leadership",
    heroSubtitle:
      "Assess your growth, find the right pathway, and build the character needed for lasting impact.",
    startAssessment: "Start Leadership Assessment",
    exploreCourses: "Explore DLI Courses",
    bentoTitle: "Find Your Level in 7 Minutes",
    bentoSubtitle: "Our assessment measures five core pillars of leadership growth.",
    quickAssessment: "Quick Assessment",
    pillars: ["Character", "Vision", "Competence", "Influence", "Service"],
    launchEngine: "Start Assessment",
    globalFootprint: "Global Footprint",
    certifiedLeaders: "Certified Leaders",
    countries: "Countries",
    quote:
      "Leadership is not a title; it is a weight of responsibility born of spiritual and mental transformation.",
    pathwayTitle: "Leadership Pathway",
    pathwaySubtitle:
      "A structured journey from foundational character to global leadership.",
    pathway: [
      { title: "DLI Basic", caption: "Fundamentals of Character and Purpose" },
      { title: "DLI Advanced", caption: "Strategy and Visionary Leadership" },
      { title: "Certification", caption: "Professional Governance Mastery" },
      { title: "Leadership Tracks", caption: "Specialized Leadership in Your Sphere" },
    ],
    activeEnrollment: "Active Enrollment",
    coreModules: "Core Modules",
    viewAllCourses: "View All Courses",
    duration: "Duration",
    format: "Format",
    nextCohort: "Next Cohort",
    weeks: "Weeks",
    formatHybrid: "Hybrid / Online",
    formatIntensive: "Intensive In-person",
    blurbs: [
      "Build the foundation of leadership. Focus on personal ethics, spiritual identity, and discovering your primary purpose.",
      "Equip yourself for greater influence. Learn strategic thinking, resource management, and how to build a healthy organizational culture.",
    ],
    viewCourse: "View Course",
    journalTitle: "The Leadership Journal",
    validateTitle: "Validate Credentials",
    validateBody:
      "Verify the authenticity of any DOGTN Leadership Institute certificate.",
    certPlaceholder: "Enter certificate ID (e.g. DLI-2026-0891)",
    verify: "Verify",
    blockchainNote: "Every credential we issue is secured and independently verifiable.",
    certNote: "Every credential we issue is secured and independently verifiable.",
  },
  fr: {
    metaTitle: "Leadership",
    metaDescription:
      "Évaluez votre progression, engagez-vous dans le bon parcours de leadership et poursuivez votre formation grâce à un enseignement structuré conçu pour un impact mondial.",
    heroEyebrow: "Écosystème institutionnel",
    heroTitle: "Le moteur du leadership",
    heroSubtitle:
      "Évaluez votre progression, engagez-vous dans le bon parcours de leadership et poursuivez votre formation grâce à un enseignement structuré conçu pour un impact mondial.",
    startAssessment: "Commencer l'évaluation de leadership",
    exploreCourses: "Découvrir les cours DLI",
    bentoTitle: "Trouvez votre niveau en 7 minutes",
    bentoSubtitle:
      "Notre moteur de précision mesure cinq piliers fondamentaux de la formation au leadership.",
    quickAssessment: "Évaluation rapide",
    pillars: ["Caractère", "Vision", "Compétence", "Influence", "Service"],
    launchEngine: "Lancer le moteur",
    globalFootprint: "Présence mondiale",
    certifiedLeaders: "Leaders certifiés",
    countries: "Pays",
    quote:
      "Le leadership n'est pas un titre ; c'est un poids de responsabilité né d'une transformation spirituelle et mentale.",
    pathwayTitle: "Parcours de leadership",
    pathwaySubtitle:
      "Un parcours structuré, de l'éthique fondamentale à la gouvernance institutionnelle mondiale.",
    pathway: [
      { title: "DLI Fondamental", caption: "Fondements du caractère et de la vocation" },
      { title: "DLI Avancé", caption: "Gestion visionnaire et stratégie" },
      { title: "Certification", caption: "Maîtrise de la gouvernance professionnelle" },
      { title: "Filières de leadership", caption: "Déploiement exécutif spécialisé" },
    ],
    activeEnrollment: "Inscriptions ouvertes",
    coreModules: "Modules essentiels",
    viewAllCourses: "Voir tous les cours",
    duration: "Durée",
    format: "Format",
    nextCohort: "Prochaine cohorte",
    weeks: "semaines",
    formatHybrid: "Hybride / En ligne",
    formatIntensive: "Intensif en présentiel",
    blurbs: [
      "Maîtrisez l'architecture interne du leadership. Concentrez-vous sur l'éthique personnelle, l'identité spirituelle et la découverte de la vocation première.",
      "Préparer les leaders à l'influence institutionnelle. Pensée systémique, gestion des ressources et conception de la culture organisationnelle.",
    ],
    viewCourse: "Voir le cours",
    journalTitle: "Le Journal du leadership",
    validateTitle: "Valider les certifications",
    validateBody:
      "Vérifiez instantanément l'authenticité des certificats et des accréditations professionnelles du DOGTN Leadership Institute.",
    certPlaceholder: "Saisissez l'identifiant du certificat (ex. DLI-2026-0891)",
    verify: "Vérifier",
    blockchainNote: "Protocole de vérification sécurisé par blockchain activé.",
    certNote: "Vérification sécurisée de chaque accréditation DLI que nous délivrons.",
  },
  pt: {
    metaTitle: "Liderança",
    metaDescription:
      "Avalie o seu crescimento, entre no percurso de liderança certo e continue a sua formação através de um ensino estruturado concebido para um impacto global.",
    heroEyebrow: "Ecossistema institucional",
    heroTitle: "O motor da liderança",
    heroSubtitle:
      "Avalie o seu crescimento, entre no percurso de liderança certo e continue a sua formação através de um ensino estruturado concebido para um impacto global.",
    startAssessment: "Iniciar avaliação de liderança",
    exploreCourses: "Explorar cursos DLI",
    bentoTitle: "Descubra o seu nível em 7 minutos",
    bentoSubtitle:
      "O nosso motor de precisão mede cinco pilares fundamentais da formação em liderança.",
    quickAssessment: "Avaliação rápida",
    pillars: ["Carácter", "Visão", "Competência", "Influência", "Serviço"],
    launchEngine: "Iniciar o motor",
    globalFootprint: "Presença global",
    certifiedLeaders: "Líderes certificados",
    countries: "Países",
    quote:
      "A liderança não é um título; é um peso de responsabilidade nascido de uma transformação espiritual e mental.",
    pathwayTitle: "Percurso de liderança",
    pathwaySubtitle:
      "Uma jornada estruturada, da ética fundamental à governação institucional global.",
    pathway: [
      { title: "DLI Básico", caption: "Fundamentos do carácter e do propósito" },
      { title: "DLI Avançado", caption: "Gestão visionária e estratégia" },
      { title: "Certificação", caption: "Domínio da governação profissional" },
      { title: "Trilhas de liderança", caption: "Colocação executiva especializada" },
    ],
    activeEnrollment: "Inscrições abertas",
    coreModules: "Módulos essenciais",
    viewAllCourses: "Ver todos os cursos",
    duration: "Duração",
    format: "Formato",
    nextCohort: "Próxima turma",
    weeks: "semanas",
    formatHybrid: "Híbrido / Online",
    formatIntensive: "Intensivo presencial",
    blurbs: [
      "Domine a arquitetura interna da liderança. Foque-se na ética pessoal, na identidade espiritual e na descoberta do propósito primordial.",
      "Capacitar líderes para a influência institucional. Pensamento sistémico, gestão de recursos e conceção da cultura organizacional.",
    ],
    viewCourse: "Ver curso",
    journalTitle: "O Jornal da liderança",
    validateTitle: "Validar credenciais",
    validateBody:
      "Verifique instantaneamente a autenticidade dos certificados e credenciais profissionais do DOGTN Leadership Institute.",
    certPlaceholder: "Introduza o ID do certificado (ex. DLI-2026-0891)",
    verify: "Verificar",
    blockchainNote: "Protocolo de verificação protegido por blockchain ativado.",
    certNote: "Verificação segura de cada credencial DLI que emitimos.",
  },
  sw: {
    metaTitle: "Uongozi",
    metaDescription:
      "Pima ukuaji wako, ingia katika njia sahihi ya uongozi, na uendelee na malezi yako kupitia mafunzo yaliyopangwa kwa ajili ya athari ya kimataifa.",
    heroEyebrow: "Mfumo wa Kitaasisi",
    heroTitle: "Injini ya Uongozi",
    heroSubtitle:
      "Pima ukuaji wako, ingia katika njia sahihi ya uongozi, na uendelee na malezi yako kupitia mafunzo yaliyopangwa kwa ajili ya athari ya kimataifa.",
    startAssessment: "Anza Tathmini ya Uongozi",
    exploreCourses: "Chunguza Kozi za DLI",
    bentoTitle: "Tambua kiwango chako kwa dakika 7",
    bentoSubtitle: "Injini yetu ya usahihi hupima nguzo tano kuu za malezi ya uongozi.",
    quickAssessment: "Tathmini ya Haraka",
    pillars: ["Tabia", "Maono", "Umahiri", "Ushawishi", "Huduma"],
    launchEngine: "Zindua Injini",
    globalFootprint: "Uwepo wa Kimataifa",
    certifiedLeaders: "Viongozi Waliothibitishwa",
    countries: "Nchi",
    quote:
      "Uongozi si cheo; ni uzito wa uwajibikaji unaozaliwa kutokana na mabadiliko ya kiroho na kiakili.",
    pathwayTitle: "Njia ya Uongozi",
    pathwaySubtitle:
      "Safari iliyopangwa kutoka maadili ya msingi hadi utawala wa kitaasisi wa kimataifa.",
    pathway: [
      { title: "DLI Msingi", caption: "Misingi ya Tabia na Kusudi" },
      { title: "DLI ya Juu", caption: "Usimamizi wa Maono na Mkakati" },
      { title: "Uthibitisho", caption: "Umahiri wa Utawala wa Kitaaluma" },
      { title: "Njia za Uongozi", caption: "Uwekaji Maalum wa Uongozi" },
    ],
    activeEnrollment: "Usajili Unaoendelea",
    coreModules: "Moduli Muhimu",
    viewAllCourses: "Ona Kozi Zote",
    duration: "Muda",
    format: "Muundo",
    nextCohort: "Kundi Lijalo",
    weeks: "Wiki",
    formatHybrid: "Mchanganyiko / Mtandaoni",
    formatIntensive: "Ana kwa Ana wa Kina",
    blurbs: [
      "Fahamu muundo wa ndani wa uongozi. Zingatia maadili binafsi, utambulisho wa kiroho, na ugunduzi wa kusudi kuu.",
      "Kuwaandaa viongozi kwa ushawishi wa kitaasisi. Fikra za kimfumo, usimamizi wa rasilimali, na ubunifu wa utamaduni wa shirika.",
    ],
    viewCourse: "Ona Kozi",
    journalTitle: "Jarida la Uongozi",
    validateTitle: "Thibitisha Vyeti",
    validateBody:
      "Thibitisha papo hapo uhalisia wa vyeti na sifa za kitaaluma za DOGTN Leadership Institute.",
    certPlaceholder: "Weka kitambulisho cha cheti (mf. DLI-2026-0891)",
    verify: "Thibitisha",
    blockchainNote: "Itifaki ya uthibitisho iliyolindwa kwa blockchain imewezeshwa.",
    certNote: "Uthibitisho salama wa kila cheti cha DLI tunachotoa.",
  },
  ar: {
    metaTitle: "القيادة",
    metaDescription:
      "قيّم نموّك، وادخل مسار القيادة المناسب، وواصل تكوينك من خلال تدريب منظم مصمم لإحداث أثر عالمي.",
    heroEyebrow: "المنظومة المؤسسية",
    heroTitle: "محرك القيادة",
    heroSubtitle:
      "قيّم نموّك، وادخل مسار القيادة المناسب، وواصل تكوينك من خلال تدريب منظم مصمم لإحداث أثر عالمي.",
    startAssessment: "ابدأ تقييم القيادة",
    exploreCourses: "استكشف دورات DLI",
    bentoTitle: "اكتشف مستواك في 7 دقائق",
    bentoSubtitle: "يقيس محركنا الدقيق خمس ركائز أساسية لتكوين القيادة.",
    quickAssessment: "تقييم سريع",
    pillars: ["الشخصية", "الرؤية", "الكفاءة", "التأثير", "الخدمة"],
    launchEngine: "تشغيل المحرك",
    globalFootprint: "الحضور العالمي",
    certifiedLeaders: "قادة معتمدون",
    countries: "دولة",
    quote:
      "القيادة ليست لقبًا؛ إنها ثقل مسؤولية يولد من تحوّل روحي وعقلي.",
    pathwayTitle: "مسار القيادة",
    pathwaySubtitle:
      "رحلة منظمة من الأخلاقيات التأسيسية إلى الحوكمة المؤسسية العالمية.",
    pathway: [
      { title: "DLI الأساسي", caption: "أسس الشخصية والغاية" },
      { title: "DLI المتقدم", caption: "الإدارة الرؤيوية والاستراتيجية" },
      { title: "الاعتماد", caption: "إتقان الحوكمة المهنية" },
      { title: "مسارات القيادة", caption: "التوظيف التنفيذي المتخصص" },
    ],
    activeEnrollment: "التسجيل مفتوح",
    coreModules: "الوحدات الأساسية",
    viewAllCourses: "عرض جميع الدورات",
    duration: "المدة",
    format: "الصيغة",
    nextCohort: "الدفعة القادمة",
    weeks: "أسبوعًا",
    formatHybrid: "مدمج / عبر الإنترنت",
    formatIntensive: "مكثّف حضوري",
    blurbs: [
      "أتقن البنية الداخلية للقيادة. ركّز على الأخلاق الشخصية والهوية الروحية واكتشاف الغاية الأساسية.",
      "إعداد القادة للتأثير المؤسسي. التفكير النُّظُمي وإدارة الموارد وتصميم الثقافة التنظيمية.",
    ],
    viewCourse: "عرض الدورة",
    journalTitle: "مجلة القيادة",
    validateTitle: "التحقق من الاعتمادات",
    validateBody:
      "تحقّق فورًا من صحة شهادات واعتمادات معهد DOGTN للقيادة المهنية.",
    certPlaceholder: "أدخل معرّف الشهادة (مثال: DLI-2026-0891)",
    verify: "تحقّق",
    blockchainNote: "تم تفعيل بروتوكول تحقّق مؤمَّن بتقنية البلوك تشين.",
    certNote: "تحقّق آمن من كل اعتماد DLI نُصدره.",
  },
};
