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
  /** Current chat-hero UI (HeroChat/QuickPills/RoutingCard/ThinkingIndicator/QuickJumpCards).
   *  The AI's live conversational replies (Groq or decision-tree fallback) stay English —
   *  localizing free-text intent classification is a separate, deeper project. */
  chatHero: {
    greetingPre: string;
    greetingPost: string;
    inputPlaceholder: string;
  };
  pills: {
    discoverPurpose: string; discoverPurposeQ: string;
    deepenFaith: string; deepenFaithQ: string;
    buildLeadership: string; buildLeadershipQ: string;
    findMentor: string; findMentorQ: string;
    joinCommunity: string; joinCommunityQ: string;
    takeAssessment: string; takeAssessmentQ: string;
    exploreTeachings: string; exploreTeachingsQ: string;
  };
  jumpDivider: string;
  jumpCards: {
    assessmentTitle: string; assessmentDesc: string; assessmentCta: string;
    mentorTitle: string; mentorDesc: string; mentorCta: string;
  };
  thinking: { headline: string; step1: string; step2: string; step3: string };
  routing: { takingYouThere: string; cancel: string };
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
    chatHero: {
      greetingPre: "Hi, ",
      greetingPost: "! Where do you want to get started?",
      inputPlaceholder: "Ask Debbie anything about your journey...",
    },
    pills: {
      discoverPurpose: "Discover Purpose", discoverPurposeQ: "I want to discover my purpose and calling. Where should I start?",
      deepenFaith: "Deepen Faith", deepenFaithQ: "I want to deepen my faith and grow spiritually. What do you recommend?",
      buildLeadership: "Build Leadership", buildLeadershipQ: "I want to build my leadership skills. What programs do you have?",
      findMentor: "Find a Mentor", findMentorQ: "I want to find a mentor. How does the mentorship program work?",
      joinCommunity: "Join Community", joinCommunityQ: "I want to join a community. What groups are available?",
      takeAssessment: "Take Assessment", takeAssessmentQ: "I am not sure where I fit. Can I take an assessment?",
      exploreTeachings: "Explore Teachings", exploreTeachingsQ: "I want to explore teachings and sermons. Where can I find them?",
    },
    jumpDivider: "Or jump straight in",
    jumpCards: {
      assessmentTitle: "Take your 7-minute assessment",
      assessmentDesc: "Discover your current leadership level and the best next step.",
      assessmentCta: "Start now",
      mentorTitle: "Get matched with a mentor",
      mentorDesc: "Find a mentor who aligns with your calling and season.",
      mentorCta: "Get matched",
    },
    thinking: {
      headline: "Debbie is thinking",
      step1: "Understanding your question...",
      step2: "Finding the best path...",
      step3: "Preparing your direction...",
    },
    routing: { takingYouThere: "Taking you there in", cancel: "Cancel" },
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
    chatHero: {
      greetingPre: "Bonjour, ",
      greetingPost: " ! Par où voulez-vous commencer ?",
      inputPlaceholder: "Demandez n'importe quoi à Debbie sur votre parcours...",
    },
    pills: {
      discoverPurpose: "Découvrir mon But", discoverPurposeQ: "Je veux découvrir mon but et ma vocation. Par où devrais-je commencer ?",
      deepenFaith: "Approfondir la Foi", deepenFaithQ: "Je veux approfondir ma foi et grandir spirituellement. Que recommandez-vous ?",
      buildLeadership: "Développer le Leadership", buildLeadershipQ: "Je veux développer mes compétences de leadership. Quels programmes avez-vous ?",
      findMentor: "Trouver un Mentor", findMentorQ: "Je veux trouver un mentor. Comment fonctionne le programme de mentorat ?",
      joinCommunity: "Rejoindre une Communauté", joinCommunityQ: "Je veux rejoindre une communauté. Quels groupes sont disponibles ?",
      takeAssessment: "Faire l'Évaluation", takeAssessmentQ: "Je ne suis pas sûr de ma place. Puis-je faire une évaluation ?",
      exploreTeachings: "Explorer les Enseignements", exploreTeachingsQ: "Je veux explorer des enseignements et des sermons. Où puis-je les trouver ?",
    },
    jumpDivider: "Ou commencez directement",
    jumpCards: {
      assessmentTitle: "Faites votre évaluation de 7 minutes",
      assessmentDesc: "Découvrez votre niveau de leadership actuel et la meilleure prochaine étape.",
      assessmentCta: "Commencer maintenant",
      mentorTitle: "Soyez jumelé avec un mentor",
      mentorDesc: "Trouvez un mentor aligné avec votre vocation et votre saison.",
      mentorCta: "Être jumelé",
    },
    thinking: {
      headline: "Debbie réfléchit",
      step1: "Compréhension de votre question...",
      step2: "Recherche du meilleur chemin...",
      step3: "Préparation de votre orientation...",
    },
    routing: { takingYouThere: "Redirection dans", cancel: "Annuler" },
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
    chatHero: {
      greetingPre: "Olá, ",
      greetingPost: "! Onde deseja começar?",
      inputPlaceholder: "Pergunte à Debbie qualquer coisa sobre a sua jornada...",
    },
    pills: {
      discoverPurpose: "Descobrir Propósito", discoverPurposeQ: "Quero descobrir o meu propósito e vocação. Por onde devo começar?",
      deepenFaith: "Aprofundar a Fé", deepenFaithQ: "Quero aprofundar a minha fé e crescer espiritualmente. O que recomenda?",
      buildLeadership: "Desenvolver Liderança", buildLeadershipQ: "Quero desenvolver as minhas competências de liderança. Que programas têm?",
      findMentor: "Encontrar um Mentor", findMentorQ: "Quero encontrar um mentor. Como funciona o programa de mentoria?",
      joinCommunity: "Juntar-me a uma Comunidade", joinCommunityQ: "Quero juntar-me a uma comunidade. Que grupos estão disponíveis?",
      takeAssessment: "Fazer Avaliação", takeAssessmentQ: "Não sei ao certo onde me encaixo. Posso fazer uma avaliação?",
      exploreTeachings: "Explorar Ensinamentos", exploreTeachingsQ: "Quero explorar ensinamentos e sermões. Onde os posso encontrar?",
    },
    jumpDivider: "Ou comece já",
    jumpCards: {
      assessmentTitle: "Faça a sua avaliação de 7 minutos",
      assessmentDesc: "Descubra o seu nível de liderança atual e o melhor próximo passo.",
      assessmentCta: "Começar agora",
      mentorTitle: "Seja associado a um mentor",
      mentorDesc: "Encontre um mentor alinhado com a sua vocação e estação.",
      mentorCta: "Ser associado",
    },
    thinking: {
      headline: "A Debbie está a pensar",
      step1: "A compreender a sua pergunta...",
      step2: "A encontrar o melhor caminho...",
      step3: "A preparar a sua direção...",
    },
    routing: { takingYouThere: "A redirecionar em", cancel: "Cancelar" },
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
    chatHero: {
      greetingPre: "Habari, ",
      greetingPost: "! Unataka kuanzia wapi?",
      inputPlaceholder: "Muulize Debbie chochote kuhusu safari yako...",
    },
    pills: {
      discoverPurpose: "Gundua Kusudi", discoverPurposeQ: "Nataka kugundua kusudi na wito wangu. Nianzie wapi?",
      deepenFaith: "Imarisha Imani", deepenFaithQ: "Nataka kuimarisha imani yangu na kukua kiroho. Unapendekeza nini?",
      buildLeadership: "Jenga Uongozi", buildLeadershipQ: "Nataka kujenga ujuzi wangu wa uongozi. Mna programu gani?",
      findMentor: "Pata Mshauri", findMentorQ: "Nataka kupata mshauri. Programu ya ushauri inafanyaje kazi?",
      joinCommunity: "Jiunge na Jamii", joinCommunityQ: "Nataka kujiunga na jamii. Ni vikundi vipi vinavyopatikana?",
      takeAssessment: "Fanya Tathmini", takeAssessmentQ: "Sina uhakika ninafaa wapi. Naweza kufanya tathmini?",
      exploreTeachings: "Gundua Mafundisho", exploreTeachingsQ: "Nataka kugundua mafundisho na mahubiri. Naweza kuyapata wapi?",
    },
    jumpDivider: "Au anza moja kwa moja",
    jumpCards: {
      assessmentTitle: "Fanya tathmini yako ya dakika 7",
      assessmentDesc: "Gundua kiwango chako cha sasa cha uongozi na hatua bora inayofuata.",
      assessmentCta: "Anza sasa",
      mentorTitle: "Pata mshauri anayekufaa",
      mentorDesc: "Pata mshauri anayeoanisha na wito na msimu wako.",
      mentorCta: "Pata mshauri",
    },
    thinking: {
      headline: "Debbie anafikiri",
      step1: "Kuelewa swali lako...",
      step2: "Kutafuta njia bora...",
      step3: "Kuandaa uelekeo wako...",
    },
    routing: { takingYouThere: "Tunakupeleka ndani ya", cancel: "Ghairi" },
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
    chatHero: {
      greetingPre: "مرحبًا، ",
      greetingPost: "! أين تريد أن تبدأ؟",
      inputPlaceholder: "اسأل ديبي أي شيء عن رحلتك...",
    },
    pills: {
      discoverPurpose: "اكتشف هدفك", discoverPurposeQ: "أريد اكتشاف هدفي ودعوتي. من أين يجب أن أبدأ؟",
      deepenFaith: "عمّق إيمانك", deepenFaithQ: "أريد تعميق إيماني والنمو روحيًا. بماذا توصي؟",
      buildLeadership: "طوّر قيادتك", buildLeadershipQ: "أريد تطوير مهاراتي القيادية. ما البرامج المتوفرة لديكم؟",
      findMentor: "ابحث عن مرشد", findMentorQ: "أريد إيجاد مرشد. كيف يعمل برنامج التوجيه؟",
      joinCommunity: "انضم إلى مجتمع", joinCommunityQ: "أريد الانضمام إلى مجتمع. ما المجموعات المتاحة؟",
      takeAssessment: "خذ التقييم", takeAssessmentQ: "لست متأكدًا من مكاني المناسب. هل يمكنني إجراء تقييم؟",
      exploreTeachings: "استكشف التعاليم", exploreTeachingsQ: "أريد استكشاف التعاليم والعظات. أين يمكنني إيجادها؟",
    },
    jumpDivider: "أو ابدأ مباشرة",
    jumpCards: {
      assessmentTitle: "خذ تقييمك لمدة 7 دقائق",
      assessmentDesc: "اكتشف مستوى قيادتك الحالي وأفضل خطوة تالية.",
      assessmentCta: "ابدأ الآن",
      mentorTitle: "تواصل مع مرشد",
      mentorDesc: "اعثر على مرشد يتوافق مع دعوتك وموسمك.",
      mentorCta: "اعثر على مرشد",
    },
    thinking: {
      headline: "ديبي تفكر",
      step1: "فهم سؤالك...",
      step2: "البحث عن أفضل مسار...",
      step3: "تحضير توجيهك...",
    },
    routing: { takingYouThere: "سننقلك خلال", cancel: "إلغاء" },
  },
};
