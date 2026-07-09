import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Mentorship section.
 * Holds only the static UI / marketing copy hardcoded in the mentorship pages.
 * Data-driven track fields (name, audience, outcomes, expectations, cohort
 * dates, eligibility, faqs) live in `@/data/mentorship` and are NOT translated.
 */
export interface MentorshipCopy {
  // Shared metadata (overview page)
  metaTitle: string;
  metaDescription: string;

  // Overview page (src/app/[locale]/mentorship/page.tsx)
  eyebrow: string;
  title: string;
  subtitle: string;
  exploreTracksCta: string;
  gridTitle: string;
  gridSubtitle: string;
  exploreTrackCta: string;
  closingTitle: string;
  closingBody: string;
  takeAssessmentCta: string;

  // Track detail page (src/app/[locale]/mentorship/[track]/page.tsx)
  applyNow: string;
  viewExpectations: string;
  curatedTitle: string;
  curatedSubtitle: string;
  /** 3 program-level audience profiles, order matches the page component. */
  profiles: { title: string; desc: string }[];
  measuredImpactTitle: string;
  commitmentTitle: string;
  oversightTitle: string;
  /** 3 program-level oversight roles, order matches the page component. */
  oversightRoles: { title: string; desc: string }[];
  timelineTitle: string;
  timelineApplicationLabel: string;
  timelineApplicationValue: string;
  timelineReviewLabel: string;
  timelineReviewValue: string;
  timelineInterviewLabel: string;
  timelineInterviewValue: string;
  timelineCohortStartLabel: string;
  eligibilityTitle: string;
  faqTitle: string;
  readyTitle: string;
  readyBody: string;
  beginApplicationCta: string;
}

export const mentorshipCopy: Record<Locale, MentorshipCopy> = {
  en: {
    metaTitle: "Mentorship",
    metaDescription:
      "Structured mentorship tracks that form leaders — from emerging leaders to nation builders — through cohorts, personal mentoring, and accountability.",
    eyebrow: "Let Dr David Mentor You",
    title: "Mentorship Tracks",
    subtitle:
      "A structured pathway for leaders ready to be formed, corrected, equipped, and sent into greater responsibility. Choose the track that meets you where you are — and grow under mentors who have walked the road.",
    exploreTracksCta: "Explore the Tracks",
    gridTitle: "Four Tracks, One Journey of Formation",
    gridSubtitle:
      "Each track pairs you with a cohort and a personal mentor, with clear outcomes and a defined rhythm.",
    exploreTrackCta: "Explore Track",
    closingTitle: "Not sure which track fits?",
    closingBody:
      "Take the leadership assessment — it points you to the track built for your season.",
    takeAssessmentCta: "Take the Assessment",
    applyNow: "Apply Now",
    viewExpectations: "View Expectations",
    curatedTitle: "Intentionally Curated",
    curatedSubtitle:
      "The track is designed for specific leadership profiles within our ecosystem.",
    profiles: [
      {
        title: "Emerging Ministry Leaders",
        desc: "Those currently serving in vocational or volunteer ministry looking to deepen their theological and practical leadership foundations.",
      },
      {
        title: "Young Professionals",
        desc: "Individuals in the corporate or creative spheres who desire to lead with integrity, purpose, and institutional wisdom.",
      },
      {
        title: "Ascending Servants",
        desc: "Established leaders preparing for a significant transition or elevation in their current institutional responsibility.",
      },
    ],
    measuredImpactTitle: "The Measured Impact",
    commitmentTitle: "The Commitment",
    oversightTitle: "Oversight Structure",
    oversightRoles: [
      {
        title: "The Cohort Mentor",
        desc: "Primary guide overseeing the weekly rhythm and strategic development of the cohort.",
      },
      {
        title: "The Reviewer",
        desc: "An objective evaluator who critiques assignments and provides unvarnished feedback on progress.",
      },
      {
        title: "Pastoral Oversight",
        desc: "Continuous spiritual governance ensuring character remains the foundation of your leadership.",
      },
    ],
    timelineTitle: "Key Timeline",
    timelineApplicationLabel: "Application Window",
    timelineApplicationValue: "Oct 1 – Oct 31",
    timelineReviewLabel: "Review Period",
    timelineReviewValue: "Nov 1 – Nov 10",
    timelineInterviewLabel: "Interview Week",
    timelineInterviewValue: "Nov 15 – Nov 22",
    timelineCohortStartLabel: "Cohort Start",
    eligibilityTitle: "Eligibility Checklist",
    faqTitle: "Frequent Enquiries",
    readyTitle: "Ready to apply?",
    readyBody:
      "Join the next cohort of leaders dedicated to institutional excellence and personal transformation.",
    beginApplicationCta: "Begin Application",
  },
  fr: {
    metaTitle: "Mentorat",
    metaDescription:
      "Des parcours de mentorat structurés qui forment des leaders — des leaders émergents aux bâtisseurs de nations — à travers des cohortes, un mentorat personnel et la responsabilité.",
    eyebrow: "Laissez le Dr David vous encadrer",
    title: "Parcours de mentorat",
    subtitle:
      "Un cheminement structuré pour les leaders prêts à être formés, corrigés, équipés et envoyés vers de plus grandes responsabilités. Choisissez le parcours qui vous rejoint là où vous êtes — et grandissez auprès de mentors qui ont parcouru le chemin.",
    exploreTracksCta: "Découvrir les parcours",
    gridTitle: "Quatre parcours, un seul cheminement de formation",
    gridSubtitle:
      "Chaque parcours vous associe à une cohorte et à un mentor personnel, avec des résultats clairs et un rythme défini.",
    exploreTrackCta: "Découvrir le parcours",
    closingTitle: "Vous ne savez pas quel parcours vous convient ?",
    closingBody:
      "Passez l'évaluation de leadership — elle vous oriente vers le parcours conçu pour votre saison.",
    takeAssessmentCta: "Passer l'évaluation",
    applyNow: "Postuler maintenant",
    viewExpectations: "Voir les attentes",
    curatedTitle: "Soigneusement conçu",
    curatedSubtitle:
      "Ce parcours est conçu pour des profils de leadership précis au sein de notre écosystème.",
    profiles: [
      {
        title: "Leaders ministériels émergents",
        desc: "Ceux qui servent actuellement dans un ministère vocationnel ou bénévole et qui souhaitent approfondir leurs fondements théologiques et pratiques du leadership.",
      },
      {
        title: "Jeunes professionnels",
        desc: "Des personnes des sphères corporatives ou créatives qui désirent diriger avec intégrité, sens du but et sagesse institutionnelle.",
      },
      {
        title: "Serviteurs en ascension",
        desc: "Des leaders établis se préparant à une transition ou à une élévation importante dans leur responsabilité institutionnelle actuelle.",
      },
    ],
    measuredImpactTitle: "L'impact mesuré",
    commitmentTitle: "L'engagement",
    oversightTitle: "Structure de supervision",
    oversightRoles: [
      {
        title: "Le mentor de cohorte",
        desc: "Guide principal supervisant le rythme hebdomadaire et le développement stratégique de la cohorte.",
      },
      {
        title: "L'évaluateur",
        desc: "Un évaluateur objectif qui critique les travaux et fournit un retour sans complaisance sur les progrès.",
      },
      {
        title: "Supervision pastorale",
        desc: "Une gouvernance spirituelle continue veillant à ce que le caractère demeure le fondement de votre leadership.",
      },
    ],
    timelineTitle: "Calendrier clé",
    timelineApplicationLabel: "Période de candidature",
    timelineApplicationValue: "1 oct. – 31 oct.",
    timelineReviewLabel: "Période d'examen",
    timelineReviewValue: "1 nov. – 10 nov.",
    timelineInterviewLabel: "Semaine d'entretiens",
    timelineInterviewValue: "15 nov. – 22 nov.",
    timelineCohortStartLabel: "Début de la cohorte",
    eligibilityTitle: "Liste d'éligibilité",
    faqTitle: "Questions fréquentes",
    readyTitle: "Prêt à postuler ?",
    readyBody:
      "Rejoignez la prochaine cohorte de leaders dédiés à l'excellence institutionnelle et à la transformation personnelle.",
    beginApplicationCta: "Commencer la candidature",
  },
  pt: {
    metaTitle: "Mentoria",
    metaDescription:
      "Percursos de mentoria estruturados que formam líderes — desde líderes emergentes a construtores de nações — através de cohortes, mentoria pessoal e responsabilização.",
    eyebrow: "Deixe o Dr. David ser o seu mentor",
    title: "Percursos de Mentoria",
    subtitle:
      "Um caminho estruturado para líderes prontos a ser formados, corrigidos, equipados e enviados para maiores responsabilidades. Escolha o percurso que o encontra onde está — e cresça sob mentores que já percorreram o caminho.",
    exploreTracksCta: "Explorar os percursos",
    gridTitle: "Quatro percursos, uma jornada de formação",
    gridSubtitle:
      "Cada percurso associa-o a uma cohorte e a um mentor pessoal, com resultados claros e um ritmo definido.",
    exploreTrackCta: "Explorar percurso",
    closingTitle: "Não sabe qual percurso lhe assenta?",
    closingBody:
      "Faça a avaliação de liderança — ela indica-lhe o percurso criado para a sua estação.",
    takeAssessmentCta: "Fazer a avaliação",
    applyNow: "Candidatar-se agora",
    viewExpectations: "Ver expectativas",
    curatedTitle: "Cuidadosamente concebido",
    curatedSubtitle:
      "O percurso foi concebido para perfis de liderança específicos dentro do nosso ecossistema.",
    profiles: [
      {
        title: "Líderes ministeriais emergentes",
        desc: "Aqueles que servem atualmente num ministério vocacional ou voluntário e que procuram aprofundar os seus fundamentos teológicos e práticos de liderança.",
      },
      {
        title: "Jovens profissionais",
        desc: "Indivíduos nas esferas corporativa ou criativa que desejam liderar com integridade, propósito e sabedoria institucional.",
      },
      {
        title: "Servos em ascensão",
        desc: "Líderes estabelecidos que se preparam para uma transição ou elevação significativa na sua atual responsabilidade institucional.",
      },
    ],
    measuredImpactTitle: "O Impacto Medido",
    commitmentTitle: "O Compromisso",
    oversightTitle: "Estrutura de Supervisão",
    oversightRoles: [
      {
        title: "O Mentor da Cohorte",
        desc: "Guia principal que supervisiona o ritmo semanal e o desenvolvimento estratégico da cohorte.",
      },
      {
        title: "O Avaliador",
        desc: "Um avaliador objetivo que critica os trabalhos e fornece um retorno franco sobre o progresso.",
      },
      {
        title: "Supervisão Pastoral",
        desc: "Governação espiritual contínua que garante que o caráter permanece o fundamento da sua liderança.",
      },
    ],
    timelineTitle: "Cronograma Principal",
    timelineApplicationLabel: "Período de candidatura",
    timelineApplicationValue: "1 out. – 31 out.",
    timelineReviewLabel: "Período de análise",
    timelineReviewValue: "1 nov. – 10 nov.",
    timelineInterviewLabel: "Semana de entrevistas",
    timelineInterviewValue: "15 nov. – 22 nov.",
    timelineCohortStartLabel: "Início da cohorte",
    eligibilityTitle: "Lista de Elegibilidade",
    faqTitle: "Perguntas Frequentes",
    readyTitle: "Pronto para se candidatar?",
    readyBody:
      "Junte-se à próxima cohorte de líderes dedicados à excelência institucional e à transformação pessoal.",
    beginApplicationCta: "Iniciar candidatura",
  },
  sw: {
    metaTitle: "Uongozaji",
    metaDescription:
      "Njia zilizopangwa za uongozaji zinazounda viongozi — kutoka viongozi wanaochipuka hadi wajenzi wa mataifa — kupitia vikundi, uongozaji binafsi na uwajibikaji.",
    eyebrow: "Mruhusu Dkt. David Akuongoze",
    title: "Njia za Uongozaji",
    subtitle:
      "Njia iliyopangwa kwa viongozi walio tayari kuundwa, kusahihishwa, kuandaliwa na kutumwa kwenye majukumu makubwa zaidi. Chagua njia inayokukuta ulipo — na ukue chini ya washauri waliopita njia hiyo.",
    exploreTracksCta: "Chunguza Njia",
    gridTitle: "Njia Nne, Safari Moja ya Kuundwa",
    gridSubtitle:
      "Kila njia inakuunganisha na kikundi na mshauri binafsi, ikiwa na matokeo wazi na mdundo uliobainishwa.",
    exploreTrackCta: "Chunguza Njia",
    closingTitle: "Huna uhakika ni njia gani inakufaa?",
    closingBody:
      "Fanya tathmini ya uongozi — inakuelekeza kwenye njia iliyoundwa kwa msimu wako.",
    takeAssessmentCta: "Fanya Tathmini",
    applyNow: "Omba Sasa",
    viewExpectations: "Angalia Matarajio",
    curatedTitle: "Imeandaliwa kwa Makusudi",
    curatedSubtitle:
      "Njia hii imeundwa kwa ajili ya sifa mahususi za uongozi ndani ya mfumo wetu.",
    profiles: [
      {
        title: "Viongozi wa Huduma Wanaochipuka",
        desc: "Wale wanaohudumu kwa sasa katika huduma ya kazi au ya kujitolea wakitaka kuimarisha misingi yao ya kitheolojia na ya kiutendaji ya uongozi.",
      },
      {
        title: "Wataalamu Vijana",
        desc: "Watu walio katika nyanja za kikampuni au za ubunifu wanaotamani kuongoza kwa uadilifu, kusudi na hekima ya kitaasisi.",
      },
      {
        title: "Watumishi Wanaopanda",
        desc: "Viongozi waliojidhihirisha wakijiandaa kwa mabadiliko au kupandishwa muhimu katika jukumu lao la sasa la kitaasisi.",
      },
    ],
    measuredImpactTitle: "Athari Iliyopimwa",
    commitmentTitle: "Ahadi",
    oversightTitle: "Muundo wa Usimamizi",
    oversightRoles: [
      {
        title: "Mshauri wa Kikundi",
        desc: "Kiongozi mkuu anayesimamia mdundo wa kila wiki na maendeleo ya kimkakati ya kikundi.",
      },
      {
        title: "Mkaguzi",
        desc: "Mtathmini asiye na upendeleo anayechambua kazi na kutoa maoni ya wazi kuhusu maendeleo.",
      },
      {
        title: "Usimamizi wa Kichungaji",
        desc: "Utawala wa kiroho unaoendelea unaohakikisha tabia inabaki kuwa msingi wa uongozi wako.",
      },
    ],
    timelineTitle: "Ratiba Muhimu",
    timelineApplicationLabel: "Kipindi cha Kuomba",
    timelineApplicationValue: "1 Okt – 31 Okt",
    timelineReviewLabel: "Kipindi cha Ukaguzi",
    timelineReviewValue: "1 Nov – 10 Nov",
    timelineInterviewLabel: "Wiki ya Mahojiano",
    timelineInterviewValue: "15 Nov – 22 Nov",
    timelineCohortStartLabel: "Mwanzo wa Kikundi",
    eligibilityTitle: "Orodha ya Ustahiki",
    faqTitle: "Maswali Yanayoulizwa Mara kwa Mara",
    readyTitle: "Uko tayari kuomba?",
    readyBody:
      "Jiunge na kikundi kijacho cha viongozi waliojitolea kwa ubora wa kitaasisi na mabadiliko binafsi.",
    beginApplicationCta: "Anza Maombi",
  },
  ar: {
    metaTitle: "الإرشاد",
    metaDescription:
      "مسارات إرشاد منظَّمة تُشكِّل القادة — من القادة الناشئين إلى بُناة الأمم — من خلال المجموعات والإرشاد الشخصي والمساءلة.",
    eyebrow: "دع الدكتور ديفيد يرشدك",
    title: "مسارات الإرشاد",
    subtitle:
      "مسار منظَّم للقادة المستعدين ليُشكَّلوا ويُصحَّحوا ويُجهَّزوا ويُرسَلوا إلى مسؤوليات أعظم. اختر المسار الذي يلتقيك حيث أنت — وانمُ تحت إشراف مرشدين ساروا الطريق.",
    exploreTracksCta: "استكشف المسارات",
    gridTitle: "أربعة مسارات، رحلة تكوين واحدة",
    gridSubtitle:
      "يربطك كل مسار بمجموعة وبمرشد شخصي، مع نتائج واضحة وإيقاع محدَّد.",
    exploreTrackCta: "استكشف المسار",
    closingTitle: "لست متأكدًا أي مسار يناسبك؟",
    closingBody:
      "أجرِ تقييم القيادة — فهو يوجِّهك إلى المسار المصمَّم لموسمك.",
    takeAssessmentCta: "ابدأ التقييم",
    applyNow: "قدِّم الآن",
    viewExpectations: "اطّلع على التوقعات",
    curatedTitle: "مُصمَّم بعناية",
    curatedSubtitle:
      "صُمِّم هذا المسار لأنماط قيادية محددة داخل منظومتنا.",
    profiles: [
      {
        title: "قادة الخدمة الناشئون",
        desc: "أولئك الذين يخدمون حاليًا في خدمة تفرُّغية أو تطوعية ويسعون لتعميق أسسهم اللاهوتية والعملية في القيادة.",
      },
      {
        title: "المهنيون الشباب",
        desc: "الأفراد في المجالات المؤسسية أو الإبداعية الذين يرغبون في القيادة بنزاهة وهدف وحكمة مؤسسية.",
      },
      {
        title: "الخدّام الصاعدون",
        desc: "قادة راسخون يستعدون لانتقال أو ترقٍّ مهم في مسؤوليتهم المؤسسية الحالية.",
      },
    ],
    measuredImpactTitle: "الأثر المقيس",
    commitmentTitle: "الالتزام",
    oversightTitle: "هيكل الإشراف",
    oversightRoles: [
      {
        title: "مرشد المجموعة",
        desc: "المرشد الأساسي الذي يشرف على الإيقاع الأسبوعي والتطوير الاستراتيجي للمجموعة.",
      },
      {
        title: "المُراجِع",
        desc: "مُقيِّم موضوعي ينقد المهام ويقدّم ملاحظات صريحة حول التقدم.",
      },
      {
        title: "الإشراف الرعوي",
        desc: "حوكمة روحية مستمرة تضمن بقاء الشخصية أساس قيادتك.",
      },
    ],
    timelineTitle: "الجدول الزمني الرئيسي",
    timelineApplicationLabel: "فترة التقديم",
    timelineApplicationValue: "1 أكتوبر – 31 أكتوبر",
    timelineReviewLabel: "فترة المراجعة",
    timelineReviewValue: "1 نوفمبر – 10 نوفمبر",
    timelineInterviewLabel: "أسبوع المقابلات",
    timelineInterviewValue: "15 نوفمبر – 22 نوفمبر",
    timelineCohortStartLabel: "بداية المجموعة",
    eligibilityTitle: "قائمة الأهلية",
    faqTitle: "الأسئلة الشائعة",
    readyTitle: "هل أنت مستعد للتقديم؟",
    readyBody:
      "انضم إلى المجموعة القادمة من القادة المكرَّسين للتميّز المؤسسي والتحوّل الشخصي.",
    beginApplicationCta: "ابدأ التقديم",
  },
};
