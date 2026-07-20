import type { Locale } from "@/i18n/config";

/** Per-page translation module for the Ministry page. */
export interface MinistryCopy {
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  institutionsEyebrow: string;
  institutionsHeading: string;
  institutionsBody: string;
  statLives: string;
  statNations: string;
  institutions: {
    dliTitle: string;
    dliDesc: string;
    dcTitle: string;
    dcDesc: string;
    glfTitle: string;
    glfDesc: string;
    ghfTitle: string;
    ghfDesc: string;
    priesthoodTitle: string;
    priesthoodDesc: string;
    missionsTitle: string;
    missionsDesc: string;
  };
  explore: string;
  discoverTitle: string;
  discoverBody: string;
  discoverCta: string;
  eventsHeading: string;
  eventsSubtitle: string;
  events: {
    nightOfGloryTitle: string;
    nightOfGloryDesc: string;
    nightOfGloryLocation: string;
    campMeetingTitle: string;
    campMeetingDesc: string;
    campMeetingLocation: string;
    pushTitle: string;
    pushDesc: string;
    pushLocation: string;
    summitTitle: string;
    summitDesc: string;
    summitLocation: string;
  };
  register: string;
  ctaHeading: string;
  ctaStartHere: string;
  ctaPartner: string;
}

export const ministryCopy: Record<Locale, MinistryCopy> = {
  en: {
    heroEyebrow: "Our Ministry",
    heroTitlePre: "A Network Built to ",
    heroTitleAccent: "Transform",
    heroSubtitle: "Six interconnected institutions, one mandate — to raise leaders that transform nations.",
    institutionsEyebrow: "The Institutions",
    institutionsHeading: "The Ecosystem of Transformation",
    institutionsBody: "Through our institutions, we equip people to excel in every sphere of society, from governance and business to community building and spiritual maturity.",
    statLives: "Lives Touched",
    statNations: "Nations",
    institutions: {
      dliTitle: "Dominion Leadership Institute",
      dliDesc: "Where future leaders are formed with character, purpose, and the skills to transform their sphere.",
      dcTitle: "Dominion City",
      dcDesc: "A community of believers growing together in faith, service, and leadership.",
      glfTitle: "Global Leadership Forum",
      glfDesc: "Where leaders convene to shape nations and build lasting institutions.",
      ghfTitle: "Golden Heart Foundation",
      ghfDesc: "Empowering young people with the values, skills, and mentorship they need to lead.",
      priesthoodTitle: "Priesthood Institute",
      priesthoodDesc: "Forming ministers who carry the gospel with depth, integrity, and global vision.",
      missionsTitle: "Global Missions Network",
      missionsDesc: "Taking the message of transformation to communities around the world.",
    },
    explore: "Explore",
    discoverTitle: "Discover Your Place",
    discoverBody: "Every person has a unique role to play in this transformation.",
    discoverCta: "Find Your Place",
    eventsHeading: "Major Events & Conferences",
    eventsSubtitle: "Join us at our global gatherings designed for impartation, training, and strategic empowerment.",
    events: {
      nightOfGloryTitle: "Night of Glory",
      nightOfGloryDesc: "Annual supernatural gathering",
      nightOfGloryLocation: "Lagos, Abuja, London",
      campMeetingTitle: "Camp Meeting",
      campMeetingDesc: "Intensive training and impartation",
      campMeetingLocation: "Annual, Nigeria",
      pushTitle: "PUSH Conference",
      pushDesc: "Prayer and strategic intercession",
      pushLocation: "Quarterly",
      summitTitle: "Strategic Leadership Summit",
      summitDesc: "For institutional heads and nation-builders",
      summitLocation: "Annual",
    },
    register: "Register",
    ctaHeading: "Ready to Be Part of Something Greater?",
    ctaStartHere: "Start Here",
    ctaPartner: "Give / Partner",
  },
  fr: {
    heroEyebrow: "Notre Ministère",
    heroTitlePre: "Un réseau conçu pour ",
    heroTitleAccent: "transformer",
    heroSubtitle: "Six institutions interconnectées, un seul mandat — former des leaders qui transforment les nations.",
    institutionsEyebrow: "Les Institutions",
    institutionsHeading: "L'écosystème de la transformation",
    institutionsBody: "À travers nos institutions, nous équipons les gens pour exceller dans chaque sphère de la société, de la gouvernance et des affaires à la construction communautaire et à la maturité spirituelle.",
    statLives: "Vies touchées",
    statNations: "Nations",
    institutions: {
      dliTitle: "Institut de Leadership Dominion",
      dliDesc: "Où les futurs leaders se forment en caractère, en vision et en compétences pour transformer leur sphère.",
      dcTitle: "Dominion City",
      dcDesc: "Une communauté de croyants grandissant ensemble dans la foi, le service et le leadership.",
      glfTitle: "Forum Mondial du Leadership",
      glfDesc: "Où les leaders se réunissent pour façonner les nations et bâtir des institutions durables.",
      ghfTitle: "Fondation Golden Heart",
      ghfDesc: "Donner aux jeunes les valeurs, les compétences et le mentorat dont ils ont besoin pour diriger.",
      priesthoodTitle: "Institut de la Prêtrise",
      priesthoodDesc: "Former des ministres qui portent l'évangile avec profondeur, intégrité et vision mondiale.",
      missionsTitle: "Réseau des Missions Mondiales",
      missionsDesc: "Porter le message de transformation aux communautés du monde entier.",
    },
    explore: "Découvrir",
    discoverTitle: "Découvrez votre place",
    discoverBody: "Chaque personne a un rôle unique à jouer dans cette transformation.",
    discoverCta: "Trouvez votre place",
    eventsHeading: "Grands Événements et Conférences",
    eventsSubtitle: "Rejoignez-nous lors de nos rassemblements mondiaux conçus pour l'impartition, la formation et l'autonomisation stratégique.",
    events: {
      nightOfGloryTitle: "Nuit de Gloire",
      nightOfGloryDesc: "Rassemblement surnaturel annuel",
      nightOfGloryLocation: "Lagos, Abuja, Londres",
      campMeetingTitle: "Camp de Prière",
      campMeetingDesc: "Formation intensive et impartition",
      campMeetingLocation: "Annuel, Nigeria",
      pushTitle: "Conférence PUSH",
      pushDesc: "Prière et intercession stratégique",
      pushLocation: "Trimestriel",
      summitTitle: "Sommet Stratégique du Leadership",
      summitDesc: "Pour les chefs d'institutions et bâtisseurs de nations",
      summitLocation: "Annuel",
    },
    register: "S'inscrire",
    ctaHeading: "Prêt à faire partie de quelque chose de plus grand ?",
    ctaStartHere: "Commencer ici",
    ctaPartner: "Donner / Partenariat",
  },
  pt: {
    heroEyebrow: "O Nosso Ministério",
    heroTitlePre: "Uma Rede Construída para ",
    heroTitleAccent: "Transformar",
    heroSubtitle: "Seis instituições interligadas, um único mandato — formar líderes que transformam nações.",
    institutionsEyebrow: "As Instituições",
    institutionsHeading: "O Ecossistema da Transformação",
    institutionsBody: "Através das nossas instituições, capacitamos pessoas para se destacarem em todas as esferas da sociedade, desde a governança e os negócios até à construção comunitária e à maturidade espiritual.",
    statLives: "Vidas Tocadas",
    statNations: "Nações",
    institutions: {
      dliTitle: "Instituto de Liderança Dominion",
      dliDesc: "Onde os futuros líderes são formados com caráter, propósito e as competências para transformar a sua esfera.",
      dcTitle: "Dominion City",
      dcDesc: "Uma comunidade de crentes que crescem juntos em fé, serviço e liderança.",
      glfTitle: "Fórum Global de Liderança",
      glfDesc: "Onde líderes se reúnem para moldar nações e construir instituições duradouras.",
      ghfTitle: "Fundação Golden Heart",
      ghfDesc: "Capacitando jovens com os valores, competências e mentoria que precisam para liderar.",
      priesthoodTitle: "Instituto do Sacerdócio",
      priesthoodDesc: "Formando ministros que carregam o evangelho com profundidade, integridade e visão global.",
      missionsTitle: "Rede de Missões Globais",
      missionsDesc: "Levando a mensagem de transformação a comunidades ao redor do mundo.",
    },
    explore: "Explorar",
    discoverTitle: "Descubra o Seu Lugar",
    discoverBody: "Cada pessoa tem um papel único a desempenhar nesta transformação.",
    discoverCta: "Encontre o Seu Lugar",
    eventsHeading: "Grandes Eventos e Conferências",
    eventsSubtitle: "Junte-se a nós nos nossos encontros globais concebidos para impartição, formação e capacitação estratégica.",
    events: {
      nightOfGloryTitle: "Noite de Glória",
      nightOfGloryDesc: "Encontro sobrenatural anual",
      nightOfGloryLocation: "Lagos, Abuja, Londres",
      campMeetingTitle: "Acampamento de Oração",
      campMeetingDesc: "Formação intensiva e impartição",
      campMeetingLocation: "Anual, Nigéria",
      pushTitle: "Conferência PUSH",
      pushDesc: "Oração e intercessão estratégica",
      pushLocation: "Trimestral",
      summitTitle: "Cimeira Estratégica de Liderança",
      summitDesc: "Para dirigentes de instituições e construtores de nações",
      summitLocation: "Anual",
    },
    register: "Inscrever-se",
    ctaHeading: "Pronto para Fazer Parte de Algo Maior?",
    ctaStartHere: "Comece Aqui",
    ctaPartner: "Doar / Parceria",
  },
  sw: {
    heroEyebrow: "Huduma Yetu",
    heroTitlePre: "Mtandao Uliojengwa Ku",
    heroTitleAccent: "badilisha",
    heroSubtitle: "Taasisi sita zilizounganishwa, agizo moja — kulea viongozi wanaobadilisha mataifa.",
    institutionsEyebrow: "Taasisi",
    institutionsHeading: "Mfumo wa Mabadiliko",
    institutionsBody: "Kupitia taasisi zetu, tunawawezesha watu kufanya vizuri katika kila nyanja ya jamii, kutoka utawala na biashara hadi ujenzi wa jamii na ukomavu wa kiroho.",
    statLives: "Maisha Yaliyoguswa",
    statNations: "Mataifa",
    institutions: {
      dliTitle: "Taasisi ya Uongozi ya Dominion",
      dliDesc: "Mahali viongozi wa baadaye wanapoundwa kwa tabia, kusudi, na ujuzi wa kubadilisha nyanja zao.",
      dcTitle: "Dominion City",
      dcDesc: "Jumuiya ya waumini wanaokua pamoja katika imani, huduma, na uongozi.",
      glfTitle: "Jukwaa la Uongozi Kimataifa",
      glfDesc: "Mahali viongozi wanakutana kuunda mataifa na kujenga taasisi za kudumu.",
      ghfTitle: "Wakfu wa Golden Heart",
      ghfDesc: "Kuwawezesha vijana kwa maadili, ujuzi, na ushauri wanaohitaji kuongoza.",
      priesthoodTitle: "Taasisi ya Ukuhani",
      priesthoodDesc: "Kuunda wahudumu wanaobeba injili kwa kina, uadilifu, na maono ya kimataifa.",
      missionsTitle: "Mtandao wa Misheni Kimataifa",
      missionsDesc: "Kupeleka ujumbe wa mabadiliko kwa jamii duniani kote.",
    },
    explore: "Gundua",
    discoverTitle: "Gundua Nafasi Yako",
    discoverBody: "Kila mtu ana nafasi ya kipekee ya kutekeleza katika mabadiliko haya.",
    discoverCta: "Pata Nafasi Yako",
    eventsHeading: "Matukio Makuu na Mikutano",
    eventsSubtitle: "Jiunge nasi katika mikusanyiko yetu ya kimataifa iliyoundwa kwa ajili ya uwezeshaji, mafunzo, na uwezeshaji wa kimkakati.",
    events: {
      nightOfGloryTitle: "Usiku wa Utukufu",
      nightOfGloryDesc: "Mkusanyiko wa kimiujiza wa kila mwaka",
      nightOfGloryLocation: "Lagos, Abuja, London",
      campMeetingTitle: "Kambi ya Maombi",
      campMeetingDesc: "Mafunzo makali na uwezeshaji",
      campMeetingLocation: "Kila Mwaka, Nigeria",
      pushTitle: "Mkutano wa PUSH",
      pushDesc: "Maombi na uombezi wa kimkakati",
      pushLocation: "Kila Robo Mwaka",
      summitTitle: "Mkutano wa Kimkakati wa Uongozi",
      summitDesc: "Kwa wakuu wa taasisi na wajenzi wa mataifa",
      summitLocation: "Kila Mwaka",
    },
    register: "Jisajili",
    ctaHeading: "Uko Tayari Kuwa Sehemu ya Kitu Kikubwa Zaidi?",
    ctaStartHere: "Anza Hapa",
    ctaPartner: "Changia / Shirikiana",
  },
  ar: {
    heroEyebrow: "خدمتنا",
    heroTitlePre: "شبكة بُنيت من أجل ",
    heroTitleAccent: "التحول",
    heroSubtitle: "ست مؤسسات مترابطة، تكليف واحد — إعداد قادة يغيّرون الأمم.",
    institutionsEyebrow: "المؤسسات",
    institutionsHeading: "منظومة التحول",
    institutionsBody: "من خلال مؤسساتنا، نُعِدّ الناس للتفوق في كل مجال من مجالات المجتمع، من الحوكمة والأعمال إلى بناء المجتمع والنضج الروحي.",
    statLives: "أرواح تأثرت",
    statNations: "دولة",
    institutions: {
      dliTitle: "معهد Dominion للقيادة",
      dliDesc: "حيث يتشكّل قادة المستقبل بالشخصية والهدف والمهارات اللازمة لتغيير مجالهم.",
      dcTitle: "Dominion City",
      dcDesc: "مجتمع من المؤمنين ينمون معًا في الإيمان والخدمة والقيادة.",
      glfTitle: "المنتدى العالمي للقيادة",
      glfDesc: "حيث يجتمع القادة لتشكيل الأمم وبناء مؤسسات دائمة.",
      ghfTitle: "مؤسسة Golden Heart",
      ghfDesc: "تمكين الشباب بالقيم والمهارات والتوجيه الذي يحتاجونه للقيادة.",
      priesthoodTitle: "معهد الكهنوت",
      priesthoodDesc: "إعداد خدام يحملون الإنجيل بعمق ونزاهة ورؤية عالمية.",
      missionsTitle: "شبكة الإرساليات العالمية",
      missionsDesc: "نقل رسالة التحول إلى المجتمعات حول العالم.",
    },
    explore: "استكشف",
    discoverTitle: "اكتشف مكانك",
    discoverBody: "لكل شخص دور فريد يلعبه في هذا التحول.",
    discoverCta: "اعثر على مكانك",
    eventsHeading: "الفعاليات والمؤتمرات الكبرى",
    eventsSubtitle: "انضم إلينا في تجمعاتنا العالمية المصممة للتزويد والتدريب والتمكين الاستراتيجي.",
    events: {
      nightOfGloryTitle: "ليلة المجد",
      nightOfGloryDesc: "تجمع خارق سنوي",
      nightOfGloryLocation: "لاغوس، أبوجا، لندن",
      campMeetingTitle: "مخيم الصلاة",
      campMeetingDesc: "تدريب مكثف وتزويد",
      campMeetingLocation: "سنويًا، نيجيريا",
      pushTitle: "مؤتمر PUSH",
      pushDesc: "الصلاة والشفاعة الاستراتيجية",
      pushLocation: "ربع سنوي",
      summitTitle: "قمة القيادة الاستراتيجية",
      summitDesc: "لرؤساء المؤسسات وبناة الأمم",
      summitLocation: "سنويًا",
    },
    register: "سجّل",
    ctaHeading: "هل أنت مستعد لتكون جزءًا من شيء أعظم؟",
    ctaStartHere: "ابدأ هنا",
    ctaPartner: "تبرّع / شارك",
  },
};
