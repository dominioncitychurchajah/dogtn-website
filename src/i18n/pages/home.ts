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
      badge: "Global Leadership Foundation",
      titlePre: "Raising Leaders That ",
      titleAccent: "Transform",
      titlePost: " Society.",
      subtitle:
        "A global transformation network dedicated to purpose, discipleship, leadership, mentorship, and the strategic building of institutions and nations.",
      ctaJourney: "Choose Your Journey",
      ctaAssessment: "Take Assessment",
    },
    nextGathering: {
      titlePre: "Next Global ",
      titleAccent: "Gathering",
      titlePost: "",
      subtitle: "Join our glorious service online or in-person this Sunday at 8:00 AM.",
      days: "Days",
      hours: "Hours",
      mins: "Mins",
      secs: "Secs",
      auditorium: "Main Auditorium",
      address: ADDRESS,
      phoneSupport: "Phone Support",
      parking: "Parking",
      parkingValue: "Free & Secure",
    },
    events: {
      title: "Global Gatherings",
      subtitle: "Join us at our major annual conferences and leadership summits.",
      viewAll: "View All Events",
    },
    ecosystem: {
      titlePre: "A Global Ecosystem of ",
      titleAccent: "Transformation",
      titlePost: "",
      intro:
        "Through our diverse institutions, we are equipping individuals to excel in every sphere of society — from governance and business to community building and spiritual maturity.",
      statReach: "Global Reach",
      statNations: "Nations",
      explore: "Explore",
      discoverTitle: "Discover Your Place",
      discoverBody:
        "Every individual has a unique contribution to the global tapestry of transformation.",
      viewAll: "View All Institutions",
    },
    featuredTeaching: {
      eyebrow: "Recommended Study",
      watch: "Watch Now",
      listen: "Listen",
      notes: "Study Notes",
      recentlyRecorded: "Recently Recorded",
    },
    assessment: {
      title: "Where are you as a leader?",
      body: "Discover your leadership profile and your sphere of impact through our 7-minute institutional diagnostic. Honest questions, a clear picture, and a recommended next step.",
      cta: "Take Assessment",
    },
    testimonies: {
      eyebrow: "Testimonies",
      title: "Lives Being Transformed",
      intro:
        "Real people at every stage of the journey — from first-time visitor to nation builder.",
      prev: "Previous testimony",
      next: "Next testimony",
    },
    give: {
      badge: "Partner With the Vision",
      title: "Give, and Help Transform a Nation",
      body: "Every gift trains a leader, plants a work, and restores dignity to a life. Sow into a mission that outlasts us all.",
      cta: "Give",
    },
    newsletter: {
      title: "Stay Connected to the Vision",
      body: "Receive weekly wisdom, institutional updates, and exclusive access to the Transformation Network ecosystem.",
      whatsappPrompt: "Prefer WhatsApp?",
      whatsappCta: "Join our WhatsApp Broadcast",
      emailPlaceholder: "Email Address",
      subscribe: "Subscribe",
      successToast: "Subscribed — welcome to the vision",
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
