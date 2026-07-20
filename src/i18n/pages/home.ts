import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the HOME page.
 * `en` is the source copy; other locales are faithful translations.
 * Gold-accent headings are split into pre/accent/post so the accent span
 * stays intact in every language (Arabic renders RTL automatically).
 */
export interface HomeCopy {
  hero: {
    badge: string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    subtitle: string;
    ctaJourney: string;
    ctaAssessment: string;
  };
  nextGathering: {
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    subtitle: string;
    days: string;
    hours: string;
    mins: string;
    secs: string;
    auditorium: string;
    address: string;
    phoneSupport: string;
    parking: string;
    parkingValue: string;
  };
  events: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  ecosystem: {
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    intro: string;
    statReach: string;
    statNations: string;
    explore: string;
    discoverTitle: string;
    discoverBody: string;
    viewAll: string;
  };
  featuredTeaching: {
    eyebrow: string;
    watch: string;
    listen: string;
    notes: string;
    recentlyRecorded: string;
  };
  assessment: {
    title: string;
    body: string;
    cta: string;
  };
  /** Current hero (replaces the unused legacy `hero` block above for the live homepage). */
  heroCurrent: {
    eyebrow: string;
    body: string;
    ctaStartHere: string;
    ctaAssessment: string;
  };
  statsSection: {
    eyebrow: string;
    heading: string;
    labelChurches: string;
    labelNations: string;
    labelLives: string;
    labelYears: string;
    body: string;
    exploreMinistry: string;
  };
  testimonialSection: {
    quote: string;
    attribution: string;
    goToLabel: string;
  };
  testimonies: {
    eyebrow: string;
    title: string;
    intro: string;
    prev: string;
    next: string;
  };
  give: {
    badge: string;
    title: string;
    body: string;
    cta: string;
  };
  newsletter: {
    title: string;
    body: string;
    whatsappPrompt: string;
    whatsappCta: string;
    emailPlaceholder: string;
    subscribe: string;
    successToast: string;
  };
}

const ADDRESS = "Dominion City Auditorium, Lekki-Epe Expressway, Ajah, Lagos.";

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    hero: {
      badge: "David Ogbueli Transformation Network",
      titlePre: "Raising Leaders That ",
      titleAccent: "Transform",
      titlePost: " Society.",
      subtitle:
        "For over three decades, Dr. David Ogbueli has equipped leaders, ministries, and nations through transformative discipleship and purposeful mentorship.",
      ctaJourney: "Choose Your Journey",
      ctaAssessment: "Take Free Assessment",
    },
    nextGathering: {
      titlePre: "Next Global ",
      titleAccent: "Gathering",
      titlePost: "",
      subtitle: "Watch live or join us this Sunday at 8:00 AM GMT+1.",
      days: "Days",
      hours: "Hours",
      mins: "Mins",
      secs: "Secs",
      auditorium: "Main Auditorium",
      address: ADDRESS,
      phoneSupport: "Contact",
      parking: "Parking",
      parkingValue: "Free & Secure",
    },
    events: {
      title: "Gather, Grow, and Be Transformed",
      subtitle: "Join powerful conferences, leadership intensives, and online gatherings across the network. There is always a next level waiting for you.",
      viewAll: "View All Events",
    },
    ecosystem: {
      titlePre: "A Network Built to ",
      titleAccent: "Transform",
      titlePost: "",
      intro:
        "Through our institutions, we equip people to excel in every sphere of society, from governance and business to community building and spiritual maturity.",
      statReach: "Lives Touched",
      statNations: "Nations",
      explore: "Explore",
      discoverTitle: "Discover Your Place",
      discoverBody:
        "Every person has a unique role to play in this transformation.",
      viewAll: "View All Institutions",
    },
    featuredTeaching: {
      eyebrow: "Recommended Study",
      watch: "Watch Now",
      listen: "Listen",
      notes: "Download Notes",
      recentlyRecorded: "Recently Recorded",
    },
    assessment: {
      title: "Where Are You as a Leader?",
      body: "Discover your leadership profile and sphere of impact in seven minutes. Get honest questions, a clear picture of where you stand, and a recommended next step.",
      cta: "Take Free Assessment",
    },
    heroCurrent: {
      eyebrow: "Apostolic Leader · Social Reformer · Global Voice",
      body: "For over three decades, one man's voice has called a generation to transform society through the power of kingdom principles.",
      ctaStartHere: "Start Here",
      ctaAssessment: "Take Free Assessment",
    },
    statsSection: {
      eyebrow: "Global Impact",
      heading: "From One Room to 50+ Nations",
      labelChurches: "Churches",
      labelNations: "Nations Reached",
      labelLives: "Lives Transformed",
      labelYears: "Years of Ministry",
      body: "Today, Dominion City Global spans Nigeria, Africa, Europe, Asia, and the Americas. Dr. Ogbueli has been honoured by the Mayor of Brampton, Canada, for his community impact, and his voice has reached the United Nations and global leadership platforms.",
      exploreMinistry: "Explore the Ministry",
    },
    testimonialSection: {
      quote: "Dr. Ogbueli's teaching on kingdom governance completely changed how I lead my company and serve my community. His voice is a prophetic compass for our generation.",
      attribution: "Business Leader, Lagos, Nigeria",
      goToLabel: "Go to testimony",
    },
    testimonies: {
      eyebrow: "Testimonies",
      title: "Real Lives, Real Transformation",
      intro:
        "Real people at every stage of the journey, from first-time visitor to nation builder.",
      prev: "Previous testimony",
      next: "Next testimony",
    },
    give: {
      badge: "Partner With the Vision",
      title: "Make an Eternal Impact",
      body: "Your generosity trains leaders, reaches communities, and restores dignity to lives. Invest in what moves your heart.",
      cta: "Give",
    },
    newsletter: {
      title: "Stay Connected",
      body: "Receive weekly wisdom, updates, and exclusive access to the Transformation Network.",
      whatsappPrompt: "Prefer WhatsApp?",
      whatsappCta: "Request access to our broadcast",
      emailPlaceholder: "Email Address",
      subscribe: "Subscribe",
      successToast: "Subscribed. Welcome to the vision.",
    },
  },

  fr: {
    hero: {
      badge: "Fondation mondiale de leadership",
      titlePre: "Former des leaders qui ",
      titleAccent: "transforment",
      titlePost: " la société.",
      subtitle:
        "Un réseau mondial de transformation dédié à la vocation, au discipulat, au leadership, au mentorat et à la construction stratégique d'institutions et de nations.",
      ctaJourney: "Choisissez votre parcours",
      ctaAssessment: "Faire l'évaluation",
    },
    nextGathering: {
      titlePre: "Prochain ",
      titleAccent: "rassemblement",
      titlePost: " mondial",
      subtitle:
        "Rejoignez notre glorieux culte en ligne ou en personne ce dimanche à 8h00.",
      days: "Jours",
      hours: "Heures",
      mins: "Min",
      secs: "Sec",
      auditorium: "Auditorium principal",
      address: ADDRESS,
      phoneSupport: "Assistance téléphonique",
      parking: "Stationnement",
      parkingValue: "Gratuit et sécurisé",
    },
    events: {
      title: "Rassemblements mondiaux",
      subtitle:
        "Rejoignez-nous lors de nos grandes conférences annuelles et sommets de leadership.",
      viewAll: "Voir tous les événements",
    },
    ecosystem: {
      titlePre: "Un écosystème mondial de ",
      titleAccent: "transformation",
      titlePost: "",
      intro:
        "À travers nos diverses institutions, nous équipons les individus pour exceller dans toutes les sphères de la société — de la gouvernance et des affaires à la construction communautaire et à la maturité spirituelle.",
      statReach: "Portée mondiale",
      statNations: "Nations",
      explore: "Explorer",
      discoverTitle: "Découvrez votre place",
      discoverBody:
        "Chaque individu a une contribution unique à apporter à la tapisserie mondiale de la transformation.",
      viewAll: "Voir toutes les institutions",
    },
    featuredTeaching: {
      eyebrow: "Étude recommandée",
      watch: "Regarder",
      listen: "Écouter",
      notes: "Notes d'étude",
      recentlyRecorded: "Enregistré récemment",
    },
    assessment: {
      title: "Où en êtes-vous en tant que leader ?",
      body: "Découvrez votre profil de leadership et votre sphère d'impact grâce à notre diagnostic institutionnel de 7 minutes. Des questions honnêtes, une image claire et une prochaine étape recommandée.",
      cta: "Faire l'évaluation",
    },
    heroCurrent: {
      eyebrow: "Leader apostolique · Réformateur social · Voix mondiale",
      body: "Depuis plus de trois décennies, la voix d'un seul homme a appelé une génération à transformer la société par le pouvoir des principes du royaume.",
      ctaStartHere: "Commencer ici",
      ctaAssessment: "Faire l'évaluation gratuite",
    },
    statsSection: {
      eyebrow: "Impact mondial",
      heading: "D'une seule pièce à plus de 50 nations",
      labelChurches: "Églises",
      labelNations: "Nations atteintes",
      labelLives: "Vies transformées",
      labelYears: "Années de ministère",
      body: "Aujourd'hui, Dominion City Global s'étend sur le Nigeria, l'Afrique, l'Europe, l'Asie et les Amériques. Le Dr Ogbueli a été honoré par le maire de Brampton, au Canada, pour son impact communautaire, et sa voix a atteint les Nations Unies et les plateformes mondiales de leadership.",
      exploreMinistry: "Découvrir le ministère",
    },
    testimonialSection: {
      quote: "L'enseignement du Dr Ogbueli sur la gouvernance du royaume a complètement changé ma façon de diriger mon entreprise et de servir ma communauté. Sa voix est une boussole prophétique pour notre génération.",
      attribution: "Chef d'entreprise, Lagos, Nigeria",
      goToLabel: "Aller au témoignage",
    },
    testimonies: {
      eyebrow: "Témoignages",
      title: "Des vies transformées",
      intro:
        "De vraies personnes à chaque étape du parcours — du premier visiteur au bâtisseur de nations.",
      prev: "Témoignage précédent",
      next: "Témoignage suivant",
    },
    give: {
      badge: "Partenaire de la vision",
      title: "Donnez et aidez à transformer une nation",
      body: "Chaque don forme un leader, implante une œuvre et redonne sa dignité à une vie. Semez dans une mission qui nous survivra à tous.",
      cta: "Donner",
    },
    newsletter: {
      title: "Restez connecté à la vision",
      body: "Recevez chaque semaine de la sagesse, des actualités institutionnelles et un accès exclusif à l'écosystème du Réseau de Transformation.",
      whatsappPrompt: "Vous préférez WhatsApp ?",
      whatsappCta: "Rejoignez notre diffusion WhatsApp",
      emailPlaceholder: "Adresse e-mail",
      subscribe: "S'abonner",
      successToast: "Inscription réussie — bienvenue dans la vision",
    },
  },

  pt: {
    hero: {
      badge: "Fundação Global de Liderança",
      titlePre: "A formar líderes que ",
      titleAccent: "transformam",
      titlePost: " a sociedade.",
      subtitle:
        "Uma rede global de transformação dedicada ao propósito, ao discipulado, à liderança, à mentoria e à construção estratégica de instituições e nações.",
      ctaJourney: "Escolha o seu percurso",
      ctaAssessment: "Fazer a avaliação",
    },
    nextGathering: {
      titlePre: "Próximo ",
      titleAccent: "encontro",
      titlePost: " global",
      subtitle:
        "Junte-se ao nosso glorioso culto online ou presencialmente este domingo às 8h00.",
      days: "Dias",
      hours: "Horas",
      mins: "Min",
      secs: "Seg",
      auditorium: "Auditório principal",
      address: ADDRESS,
      phoneSupport: "Apoio telefónico",
      parking: "Estacionamento",
      parkingValue: "Gratuito e seguro",
    },
    events: {
      title: "Encontros globais",
      subtitle:
        "Junte-se a nós nas nossas grandes conferências anuais e cimeiras de liderança.",
      viewAll: "Ver todos os eventos",
    },
    ecosystem: {
      titlePre: "Um ecossistema global de ",
      titleAccent: "transformação",
      titlePost: "",
      intro:
        "Através das nossas diversas instituições, capacitamos as pessoas para se destacarem em todas as esferas da sociedade — da governação e dos negócios à construção comunitária e à maturidade espiritual.",
      statReach: "Alcance global",
      statNations: "Nações",
      explore: "Explorar",
      discoverTitle: "Descubra o seu lugar",
      discoverBody:
        "Cada pessoa tem uma contribuição única para a tapeçaria global da transformação.",
      viewAll: "Ver todas as instituições",
    },
    featuredTeaching: {
      eyebrow: "Estudo recomendado",
      watch: "Ver agora",
      listen: "Ouvir",
      notes: "Notas de estudo",
      recentlyRecorded: "Gravado recentemente",
    },
    assessment: {
      title: "Onde está como líder?",
      body: "Descubra o seu perfil de liderança e a sua esfera de impacto através do nosso diagnóstico institucional de 7 minutos. Perguntas honestas, uma imagem clara e um próximo passo recomendado.",
      cta: "Fazer a avaliação",
    },
    heroCurrent: {
      eyebrow: "Líder Apostólico · Reformador Social · Voz Global",
      body: "Por mais de três décadas, a voz de um homem tem chamado uma geração a transformar a sociedade através do poder dos princípios do reino.",
      ctaStartHere: "Comece Aqui",
      ctaAssessment: "Fazer Avaliação Gratuita",
    },
    statsSection: {
      eyebrow: "Impacto Global",
      heading: "De Uma Sala a Mais de 50 Nações",
      labelChurches: "Igrejas",
      labelNations: "Nações Alcançadas",
      labelLives: "Vidas Transformadas",
      labelYears: "Anos de Ministério",
      body: "Hoje, a Dominion City Global abrange a Nigéria, a África, a Europa, a Ásia e as Américas. O Dr. Ogbueli foi homenageado pelo Prefeito de Brampton, no Canadá, pelo seu impacto comunitário, e a sua voz já alcançou as Nações Unidas e plataformas globais de liderança.",
      exploreMinistry: "Explorar o Ministério",
    },
    testimonialSection: {
      quote: "O ensino do Dr. Ogbueli sobre governança do reino mudou completamente a forma como lidero a minha empresa e sirvo a minha comunidade. A sua voz é uma bússola profética para a nossa geração.",
      attribution: "Líder Empresarial, Lagos, Nigéria",
      goToLabel: "Ir para o depoimento",
    },
    testimonies: {
      eyebrow: "Testemunhos",
      title: "Vidas a serem transformadas",
      intro:
        "Pessoas reais em cada etapa da jornada — do visitante de primeira vez ao construtor de nações.",
      prev: "Testemunho anterior",
      next: "Testemunho seguinte",
    },
    give: {
      badge: "Parceiro da visão",
      title: "Dê e ajude a transformar uma nação",
      body: "Cada doação forma um líder, planta uma obra e devolve a dignidade a uma vida. Semeie numa missão que nos sobreviverá a todos.",
      cta: "Doar",
    },
    newsletter: {
      title: "Mantenha-se ligado à visão",
      body: "Receba semanalmente sabedoria, atualizações institucionais e acesso exclusivo ao ecossistema da Rede de Transformação.",
      whatsappPrompt: "Prefere o WhatsApp?",
      whatsappCta: "Junte-se à nossa transmissão no WhatsApp",
      emailPlaceholder: "Endereço de e-mail",
      subscribe: "Subscrever",
      successToast: "Subscrição feita — bem-vindo à visão",
    },
  },

  sw: {
    hero: {
      badge: "Msingi wa Uongozi wa Kimataifa",
      titlePre: "Kulea viongozi ",
      titleAccent: "wanaobadilisha",
      titlePost: " jamii.",
      subtitle:
        "Mtandao wa kimataifa wa mabadiliko uliojitolea kwa kusudi, ufuasi, uongozi, ushauri, na ujenzi wa kimkakati wa taasisi na mataifa.",
      ctaJourney: "Chagua safari yako",
      ctaAssessment: "Fanya tathmini",
    },
    nextGathering: {
      titlePre: "",
      titleAccent: "Mkutano",
      titlePost: " wa Kimataifa Ujao",
      subtitle:
        "Jiunge na ibada yetu tukufu mtandaoni au ana kwa ana Jumapili hii saa 8:00 asubuhi.",
      days: "Siku",
      hours: "Saa",
      mins: "Dak",
      secs: "Sek",
      auditorium: "Ukumbi Mkuu",
      address: ADDRESS,
      phoneSupport: "Msaada wa simu",
      parking: "Maegesho",
      parkingValue: "Bila malipo na salama",
    },
    events: {
      title: "Mikutano ya Kimataifa",
      subtitle:
        "Jiunge nasi katika mikutano yetu mikuu ya kila mwaka na mikutano ya uongozi.",
      viewAll: "Tazama matukio yote",
    },
    ecosystem: {
      titlePre: "Mfumo wa kimataifa wa ",
      titleAccent: "mabadiliko",
      titlePost: "",
      intro:
        "Kupitia taasisi zetu mbalimbali, tunawawezesha watu kufanya vyema katika kila nyanja ya jamii — kutoka utawala na biashara hadi ujenzi wa jamii na ukomavu wa kiroho.",
      statReach: "Ufikiaji wa Kimataifa",
      statNations: "Mataifa",
      explore: "Chunguza",
      discoverTitle: "Gundua nafasi yako",
      discoverBody:
        "Kila mtu ana mchango wa kipekee katika taswira ya kimataifa ya mabadiliko.",
      viewAll: "Tazama taasisi zote",
    },
    featuredTeaching: {
      eyebrow: "Somo Linalopendekezwa",
      watch: "Tazama sasa",
      listen: "Sikiliza",
      notes: "Maelezo ya somo",
      recentlyRecorded: "Imerekodiwa hivi karibuni",
    },
    assessment: {
      title: "Uko wapi kama kiongozi?",
      body: "Gundua wasifu wako wa uongozi na nyanja yako ya athari kupitia uchunguzi wetu wa kitaasisi wa dakika 7. Maswali ya kweli, picha iliyo wazi, na hatua inayofuata inayopendekezwa.",
      cta: "Fanya tathmini",
    },
    heroCurrent: {
      eyebrow: "Kiongozi wa Kitume · Mrekebishaji wa Jamii · Sauti ya Kimataifa",
      body: "Kwa zaidi ya miongo mitatu, sauti ya mtu mmoja imeita kizazi kubadilisha jamii kupitia nguvu ya kanuni za ufalme.",
      ctaStartHere: "Anza Hapa",
      ctaAssessment: "Fanya Tathmini ya Bure",
    },
    statsSection: {
      eyebrow: "Athari ya Kimataifa",
      heading: "Kutoka Chumba Kimoja Hadi Mataifa Zaidi ya 50",
      labelChurches: "Makanisa",
      labelNations: "Mataifa Yaliyofikiwa",
      labelLives: "Maisha Yaliyobadilishwa",
      labelYears: "Miaka ya Huduma",
      body: "Leo, Dominion City Global inaenea Nigeria, Afrika, Ulaya, Asia, na Amerika. Dr. Ogbueli ameheshimiwa na Meya wa Brampton, Kanada, kwa athari yake katika jamii, na sauti yake imefika Umoja wa Mataifa na majukwaa ya uongozi wa kimataifa.",
      exploreMinistry: "Gundua Huduma",
    },
    testimonialSection: {
      quote: "Mafundisho ya Dr. Ogbueli kuhusu utawala wa ufalme yalibadilisha kabisa jinsi ninavyoongoza kampuni yangu na kuhudumia jamii yangu. Sauti yake ni dira ya kinabii kwa kizazi chetu.",
      attribution: "Kiongozi wa Biashara, Lagos, Nigeria",
      goToLabel: "Nenda kwenye ushuhuda",
    },
    testimonies: {
      eyebrow: "Ushuhuda",
      title: "Maisha Yanabadilishwa",
      intro:
        "Watu halisi katika kila hatua ya safari — kutoka mgeni wa mara ya kwanza hadi mjenzi wa mataifa.",
      prev: "Ushuhuda uliopita",
      next: "Ushuhuda unaofuata",
    },
    give: {
      badge: "Shirikiana na Maono",
      title: "Toa, na Usaidie Kubadilisha Taifa",
      body: "Kila zawadi hufundisha kiongozi, hupanda kazi, na hurejesha heshima kwa maisha. Panda katika utume utakaodumu kuliko sisi sote.",
      cta: "Toa",
    },
    newsletter: {
      title: "Endelea Kuunganishwa na Maono",
      body: "Pokea hekima ya kila wiki, taarifa za kitaasisi, na ufikiaji wa kipekee wa mfumo wa Mtandao wa Mabadiliko.",
      whatsappPrompt: "Unapendelea WhatsApp?",
      whatsappCta: "Jiunge na Matangazo yetu ya WhatsApp",
      emailPlaceholder: "Anwani ya barua pepe",
      subscribe: "Jisajili",
      successToast: "Umejisajili — karibu kwenye maono",
    },
  },

  ar: {
    hero: {
      badge: "مؤسسة القيادة العالمية",
      titlePre: "إعداد قادة ",
      titleAccent: "يحوّلون",
      titlePost: " المجتمع.",
      subtitle:
        "شبكة تحوّل عالمية مكرّسة للهدف والتلمذة والقيادة والإرشاد والبناء الاستراتيجي للمؤسسات والأمم.",
      ctaJourney: "اختر رحلتك",
      ctaAssessment: "قم بالتقييم",
    },
    nextGathering: {
      titlePre: "",
      titleAccent: "اللقاء",
      titlePost: " العالمي القادم",
      subtitle:
        "انضم إلى خدمتنا المجيدة عبر الإنترنت أو حضوريًا هذا الأحد الساعة 8:00 صباحًا.",
      days: "أيام",
      hours: "ساعات",
      mins: "دقائق",
      secs: "ثوانٍ",
      auditorium: "القاعة الرئيسية",
      address: ADDRESS,
      phoneSupport: "الدعم الهاتفي",
      parking: "مواقف السيارات",
      parkingValue: "مجاني وآمن",
    },
    events: {
      title: "اللقاءات العالمية",
      subtitle: "انضم إلينا في مؤتمراتنا السنوية الكبرى وقممنا القيادية.",
      viewAll: "عرض جميع الفعاليات",
    },
    ecosystem: {
      titlePre: "منظومة عالمية من ",
      titleAccent: "التحوّل",
      titlePost: "",
      intro:
        "من خلال مؤسساتنا المتنوعة، نُعدّ الأفراد للتميّز في كل مجال من مجالات المجتمع — من الحوكمة والأعمال إلى بناء المجتمع والنضج الروحي.",
      statReach: "الانتشار العالمي",
      statNations: "الأمم",
      explore: "استكشف",
      discoverTitle: "اكتشف مكانك",
      discoverBody: "لكل فرد إسهام فريد في نسيج التحوّل العالمي.",
      viewAll: "عرض جميع المؤسسات",
    },
    featuredTeaching: {
      eyebrow: "دراسة موصى بها",
      watch: "شاهد الآن",
      listen: "استمع",
      notes: "ملاحظات الدراسة",
      recentlyRecorded: "سُجِّل مؤخرًا",
    },
    assessment: {
      title: "أين أنت كقائد؟",
      body: "اكتشف ملفك القيادي ومجال تأثيرك من خلال تشخيصنا المؤسسي الذي يستغرق 7 دقائق. أسئلة صادقة، وصورة واضحة، وخطوة تالية موصى بها.",
      cta: "قم بالتقييم",
    },
    heroCurrent: {
      eyebrow: "قائد رسولي · مُصلح اجتماعي · صوت عالمي",
      body: "منذ أكثر من ثلاثة عقود، دعا صوت رجل واحد جيلاً كاملاً لتغيير المجتمع من خلال قوة مبادئ الملكوت.",
      ctaStartHere: "ابدأ هنا",
      ctaAssessment: "خذ التقييم المجاني",
    },
    statsSection: {
      eyebrow: "الأثر العالمي",
      heading: "من غرفة واحدة إلى أكثر من 50 دولة",
      labelChurches: "الكنائس",
      labelNations: "الدول التي تم الوصول إليها",
      labelLives: "الأرواح التي تغيّرت",
      labelYears: "سنوات الخدمة",
      body: "اليوم، تمتد Dominion City Global عبر نيجيريا وأفريقيا وأوروبا وآسيا والأمريكتين. تكرّم الدكتور أوغبويلي من قبل عمدة برامبتون في كندا لأثره المجتمعي، ووصل صوته إلى الأمم المتحدة ومنصات القيادة العالمية.",
      exploreMinistry: "استكشف الخدمة",
    },
    testimonialSection: {
      quote: "غيّرت تعاليم الدكتور أوغبويلي حول حوكمة الملكوت طريقة قيادتي لشركتي وخدمتي لمجتمعي تمامًا. صوته بوصلة نبوية لجيلنا.",
      attribution: "قائد أعمال، لاغوس، نيجيريا",
      goToLabel: "الانتقال إلى الشهادة",
    },
    testimonies: {
      eyebrow: "الشهادات",
      title: "حياة تتحوّل",
      intro:
        "أشخاص حقيقيون في كل مرحلة من مراحل الرحلة — من الزائر لأول مرة إلى باني الأمم.",
      prev: "الشهادة السابقة",
      next: "الشهادة التالية",
    },
    give: {
      badge: "كن شريكًا في الرؤية",
      title: "امنح، وساعد في تحويل أمة",
      body: "كل عطية تُدرّب قائدًا، وتغرس عملًا، وتعيد الكرامة إلى حياة. ازرع في رسالة تبقى بعدنا جميعًا.",
      cta: "امنح",
    },
    newsletter: {
      title: "ابقَ على صلة بالرؤية",
      body: "احصل أسبوعيًا على الحكمة والتحديثات المؤسسية والوصول الحصري إلى منظومة شبكة التحوّل.",
      whatsappPrompt: "تفضّل واتساب؟",
      whatsappCta: "انضم إلى بثّنا على واتساب",
      emailPlaceholder: "عنوان البريد الإلكتروني",
      subscribe: "اشترك",
      successToast: "تم الاشتراك — مرحبًا بك في الرؤية",
    },
  },
};
