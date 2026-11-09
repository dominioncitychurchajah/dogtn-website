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
  /** The two doors into the mentorship app, used on the lander and the homepage. */
  portalHeading: string;
  portalReturningTitle: string;
  portalReturningBody: string;
  portalLoginCta: string;
  portalNewTitle: string;
  portalNewBody: string;
  portalRegisterCta: string;
  portalHelpBody: string;
  /** Progression narrative: I -> II -> III. */
  progressionTitle: string;
  progressionBody: string;
  durationLabel: string;
  commitmentLabel: string;
  nextCohortLabel: string;
  monthsUnit: string;
  hoursPerWeekUnit: string;
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
  eligibilityTitle: string;
  faqTitle: string;
  readyTitle: string;
  readyBody: string;
  beginApplicationCta: string;
}

export const mentorshipCopy: Record<Locale, MentorshipCopy> = {
  en: {
    metaTitle: "Global Leadership Executive",
    metaDescription:
      "Three mentorship tracks with Dr. David Ogbueli, from emerging leaders to nation builders. Join the waitlist for the mentorship app.",
    eyebrow: "Let Dr David Mentor You",
    title: "Global Leadership Executive",
    subtitle:
      "A structured pathway for leaders ready to grow and step into greater responsibility. Choose the track that meets you where you are, and learn from mentors who have walked the road.",
    exploreTracksCta: "Explore Mentorship Tracks",
    portalHeading: "Start, or continue, your mentorship",
    portalReturningTitle: "Already a student",
    portalReturningBody: "Pick up your track where you left off.",
    portalLoginCta: "Log in",
    portalNewTitle: "New here",
    portalNewBody: "Create your account and start at the level that fits you.",
    portalRegisterCta: "Register",
    portalHelpBody:
      "Sign in with the email you registered with. If the password will not work, use \u201cforgot password\u201d on the log-in page \u2014 or call us and we will sort it out:",
    progressionTitle: "One programme, three levels",
    progressionBody:
      "Global Leadership Executive is a single formation path in three levels. You enter where your responsibility actually sits today, and each level prepares you for the next: character before position, sustainability before scale, multiplication before legacy.",
    durationLabel: "Duration",
    commitmentLabel: "Commitment",
    nextCohortLabel: "Invitation",
    monthsUnit: "months",
    hoursPerWeekUnit: "hrs / week",
    gridTitle: "3 Tracks to 1 Mentorship Transformation",
    gridSubtitle:
      "Each track is shaped for a different season of leadership, with mentorship from Dr. David Ogbueli.",
    exploreTrackCta: "Explore Track",
    closingTitle: "Not sure which track fits?",
    closingBody:
      "Take the leadership assessment and discover the track that matches your current season.",
    takeAssessmentCta: "Take Leadership Assessment",
    applyNow: "Join Mentorship",
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
        title: "Your Mentor",
        desc: "Dr. David Ogbueli mentors every track personally.",
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
    eligibilityTitle: "Eligibility Checklist",
    faqTitle: "Frequent Enquiries",
    readyTitle: "Ready to join?",
    readyBody:
      "Create your account in the mentorship app and start with your track.",
    beginApplicationCta: "Join Mentorship",
  },
  fr: {
    metaTitle: "Global Leadership Executive",
    metaDescription:
      "Trois parcours de mentorat avec le Dr David Ogbueli, des leaders émergents aux bâtisseurs de nations. Rejoignez la liste d'attente de l'application.",
    eyebrow: "Laissez le Dr David vous encadrer",
    title: "Global Leadership Executive",
    subtitle:
      "Un cheminement structuré pour les leaders prêts à être formés, corrigés, équipés et envoyés vers de plus grandes responsabilités. Choisissez le parcours qui vous rejoint là où vous êtes, et grandissez auprès de mentors qui ont parcouru le chemin.",
    exploreTracksCta: "Découvrir les parcours de mentorat",
    portalHeading: "Commencez ou poursuivez votre mentorat",
    portalReturningTitle: "Déjà inscrit",
    portalReturningBody: "Reprenez votre parcours là où vous l'avez laissé.",
    portalLoginCta: "Se connecter",
    portalNewTitle: "Nouveau ici",
    portalNewBody: "Créez votre compte et commencez au niveau qui vous correspond.",
    portalRegisterCta: "S'inscrire",
    portalHelpBody:
      "Connectez-vous avec l'adresse e-mail de votre inscription. Si le mot de passe ne fonctionne pas, utilisez « mot de passe oublié » sur la page de connexion, ou appelez-nous :",
    progressionTitle: "Un programme, trois niveaux",
    progressionBody:
      "Global Leadership Executive est un seul chemin de formation en trois niveaux. Vous entrez là où se situe réellement votre responsabilité aujourd'hui, et chaque niveau prépare le suivant : le caractère avant la position, la durabilité avant l'échelle, la multiplication avant l'héritage.",
    durationLabel: "Durée",
    commitmentLabel: "Engagement",
    nextCohortLabel: "Invitation",
    monthsUnit: "mois",
    hoursPerWeekUnit: "h / semaine",
    gridTitle: "3 parcours pour 1 transformation par le mentorat",
    gridSubtitle:
      "Chaque parcours est conçu pour une saison de leadership différente, avec le mentorat du Dr David Ogbueli.",
    exploreTrackCta: "Découvrir le parcours",
    closingTitle: "Vous ne savez pas quel parcours vous convient ?",
    closingBody:
      "Passez l'évaluation de leadership, elle vous oriente vers le parcours conçu pour votre saison.",
    takeAssessmentCta: "Faire l'évaluation de leadership",
    applyNow: "Rejoindre le mentorat",
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
        title: "Votre mentor",
        desc: "Le Dr David Ogbueli assure personnellement le mentorat de chaque parcours.",
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
    eligibilityTitle: "Liste d'éligibilité",
    faqTitle: "Questions fréquentes",
    readyTitle: "Prêt à nous rejoindre ?",
    readyBody:
      "Créez votre compte dans l'application de mentorat et commencez votre parcours.",
    beginApplicationCta: "Rejoindre le mentorat",
  },
  pt: {
    metaTitle: "Global Leadership Executive",
    metaDescription:
      "Três percursos de mentoria com o Dr. David Ogbueli, de líderes emergentes a construtores de nações. Entre na lista de espera da aplicação.",
    eyebrow: "Deixe o Dr. David ser o seu mentor",
    title: "Global Leadership Executive",
    subtitle:
      "Um caminho estruturado para líderes prontos a ser formados, corrigidos, equipados e enviados para maiores responsabilidades. Escolha o percurso que o encontra onde está, e cresça sob mentores que já percorreram o caminho.",
    exploreTracksCta: "Explorar os percursos do mentorado",
    portalHeading: "Comece ou continue o seu mentorado",
    portalReturningTitle: "Já é aluno",
    portalReturningBody: "Retome o seu percurso onde parou.",
    portalLoginCta: "Entrar",
    portalNewTitle: "Novo por aqui",
    portalNewBody: "Crie a sua conta e comece no nível certo para si.",
    portalRegisterCta: "Registar",
    portalHelpBody:
      "Entre com o e-mail do seu registo. Se a palavra-passe não funcionar, use «esqueci a palavra-passe» na página de entrada, ou ligue-nos:",
    progressionTitle: "Um programa, três níveis",
    progressionBody:
      "O Global Leadership Executive é um único percurso de formação em três níveis. Você entra onde a sua responsabilidade realmente está hoje, e cada nível prepara o seguinte: carácter antes da posição, sustentabilidade antes da escala, multiplicação antes do legado.",
    durationLabel: "Duração",
    commitmentLabel: "Compromisso",
    nextCohortLabel: "Próxima turma",
    monthsUnit: "meses",
    hoursPerWeekUnit: "h / semana",
    gridTitle: "3 percursos para 1 transformação pelo mentorado",
    gridSubtitle:
      "Cada percurso é moldado para uma estação diferente de liderança, com a mentoria do Dr. David Ogbueli.",
    exploreTrackCta: "Explorar percurso",
    closingTitle: "Não sabe qual percurso lhe assenta?",
    closingBody:
      "Faça a avaliação de liderança, ela indica-lhe o percurso criado para a sua estação.",
    takeAssessmentCta: "Fazer a Avaliação de Liderança",
    applyNow: "Entrar no Mentorado",
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
        title: "O seu mentor",
        desc: "O Dr. David Ogbueli acompanha pessoalmente cada percurso.",
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
    eligibilityTitle: "Lista de Elegibilidade",
    faqTitle: "Perguntas Frequentes",
    readyTitle: "Pronto para entrar?",
    readyBody:
      "Crie a sua conta na aplicação do mentorado e comece pelo seu percurso.",
    beginApplicationCta: "Entrar no Mentorado",
  },
  sw: {
    metaTitle: "Global Leadership Executive",
    metaDescription:
      "Njia tatu za ushauri na Dkt. David Ogbueli, kutoka viongozi wanaochipuka hadi wajenzi wa mataifa. Jiunge na orodha ya kusubiri ya programu.",
    eyebrow: "Mruhusu Dkt. David Akuongoze",
    title: "Global Leadership Executive",
    subtitle:
      "Njia iliyopangwa kwa viongozi walio tayari kuundwa, kusahihishwa, kuandaliwa na kutumwa kwenye majukumu makubwa zaidi. Chagua njia inayokukuta ulipo, na ukue chini ya washauri waliopita njia hiyo.",
    exploreTracksCta: "Chunguza Njia za Ushauri",
    portalHeading: "Anza au endelea na ushauri wako",
    portalReturningTitle: "Tayari ni mwanafunzi",
    portalReturningBody: "Endelea na njia yako pale ulipoishia.",
    portalLoginCta: "Ingia",
    portalNewTitle: "Mgeni hapa",
    portalNewBody: "Fungua akaunti yako na uanze ngazi inayokufaa.",
    portalRegisterCta: "Jisajili",
    portalHelpBody:
      "Ingia kwa barua pepe uliyotumia kujisajili. Nenosiri likikataa, tumia \u201cumesahau nenosiri\u201d kwenye ukurasa wa kuingia, au tupigie:",
    progressionTitle: "Programu moja, viwango vitatu",
    progressionBody:
      "Global Leadership Executive ni njia moja ya malezi katika viwango vitatu. Unaingia pale ambapo jukumu lako lipo sasa, na kila kiwango kinakutayarisha kwa kinachofuata: tabia kabla ya nafasi, uendelevu kabla ya ukubwa, kuzidisha kabla ya urithi.",
    durationLabel: "Muda",
    commitmentLabel: "Ahadi",
    nextCohortLabel: "Kikundi kijacho",
    monthsUnit: "miezi",
    hoursPerWeekUnit: "saa / wiki",
    gridTitle: "Njia 3 kwa Mabadiliko 1 ya Ushauri",
    gridSubtitle:
      "Kila njia inakuunganisha na kikundi na mshauri binafsi, ikiwa na matokeo wazi na mdundo uliobainishwa.",
    exploreTrackCta: "Chunguza Njia",
    closingTitle: "Huna uhakika ni njia gani inakufaa?",
    closingBody:
      "Fanya tathmini ya uongozi, inakuelekeza kwenye njia iliyoundwa kwa msimu wako.",
    takeAssessmentCta: "Fanya Tathmini ya Uongozi",
    applyNow: "Jiunge na Ushauri",
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
    eligibilityTitle: "Orodha ya Ustahiki",
    faqTitle: "Maswali Yanayoulizwa Mara kwa Mara",
    readyTitle: "Uko tayari kujiunga?",
    readyBody:
      "Jiunge na kikundi kijacho cha viongozi waliojitolea kwa ubora wa kitaasisi na mabadiliko binafsi.",
    beginApplicationCta: "Jiunge na Ushauri",
  },
  ar: {
    metaTitle: "Global Leadership Executive",
    metaDescription:
      "ثلاثة مسارات للإرشاد مع د. ديفيد أوغبويلي، من القادة الناشئين إلى بُناة الأمم. انضم إلى قائمة انتظار التطبيق.",
    eyebrow: "دع الدكتور ديفيد يرشدك",
    title: "Global Leadership Executive",
    subtitle:
      "مسار منظَّم للقادة المستعدين ليُشكَّلوا ويُصحَّحوا ويُجهَّزوا ويُرسَلوا إلى مسؤوليات أعظم. اختر المسار الذي يلتقيك حيث أنت، وانمُ تحت إشراف مرشدين ساروا الطريق.",
    exploreTracksCta: "استكشف مسارات الإرشاد",
    portalHeading: "ابدأ إرشادك أو تابعه",
    portalReturningTitle: "طالب حالي",
    portalReturningBody: "تابع مسارك من حيث توقفت.",
    portalLoginCta: "تسجيل الدخول",
    portalNewTitle: "جديد هنا",
    portalNewBody: "أنشئ حسابك وابدأ من المستوى المناسب لك.",
    portalRegisterCta: "إنشاء حساب",
    portalHelpBody:
      "سجّل الدخول بالبريد الإلكتروني الذي استخدمته. إذا لم تنجح كلمة المرور، استخدم «نسيت كلمة المرور» في صفحة الدخول، أو اتصل بنا:",
    progressionTitle: "برنامج واحد، ثلاثة مستويات",
    progressionBody:
      "‏Global Leadership Executive مسار تكوين واحد في ثلاثة مستويات. تبدأ من حيث تقع مسؤوليتك فعليًا اليوم، وكل مستوى يُعِدّك للذي يليه: الشخصية قبل المنصب، والاستدامة قبل التوسّع، والمضاعفة قبل الإرث.",
    durationLabel: "المدة",
    commitmentLabel: "الالتزام",
    nextCohortLabel: "الدفعة القادمة",
    monthsUnit: "شهرًا",
    hoursPerWeekUnit: "ساعة / أسبوع",
    gridTitle: "3 مسارات نحو تحوّل إرشادي واحد",
    gridSubtitle:
      "يربطك كل مسار بمجموعة وبمرشد شخصي، مع نتائج واضحة وإيقاع محدَّد.",
    exploreTrackCta: "استكشف المسار",
    closingTitle: "لست متأكدًا أي مسار يناسبك؟",
    closingBody:
      "أجرِ تقييم القيادة، فهو يوجِّهك إلى المسار المصمَّم لموسمك.",
    takeAssessmentCta: "ابدأ تقييم القيادة",
    applyNow: "انضم إلى الإرشاد",
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
    eligibilityTitle: "قائمة الأهلية",
    faqTitle: "الأسئلة الشائعة",
    readyTitle: "هل أنت مستعد للانضمام؟",
    readyBody:
      "انضم إلى المجموعة القادمة من القادة المكرَّسين للتميّز المؤسسي والتحوّل الشخصي.",
    beginApplicationCta: "انضم إلى الإرشاد",
  },
};
