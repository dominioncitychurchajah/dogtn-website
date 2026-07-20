import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Ministries page.
 * Ministry NAMES are brand/proper nouns and stay identical across locales;
 * descriptions are translated (fr/pt/sw/ar are machine-quality — review before
 * a native-speaker sign-off). Display order is intentional and preserved.
 */
export interface MinistryEntry {
  title: string;
  desc: string;
}

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
  ministries: {
    dominionCity: MinistryEntry;
    goldenHeart: MinistryEntry;
    gmn: MinistryEntry;
    glf: MinistryEntry;
    dli: MinistryEntry;
    priesthood: MinistryEntry;
    huram: MinistryEntry;
    shalom: MinistryEntry;
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

// Brand names — identical in every locale.
const NAMES = {
  dominionCity: "Dominion City Global",
  goldenHeart: "Golden Heart Foundation",
  gmn: "Global Missions Network",
  glf: "Global Leadership Forum",
  dli: "Dominion Leadership Institute",
  priesthood: "Priesthood Institute",
  huram: "Huram Development",
  shalom: "Shalom World",
};

export const ministryCopy: Record<Locale, MinistryCopy> = {
  en: {
    heroEyebrow: "Our Ministries",
    heroTitlePre: "A Network Built to ",
    heroTitleAccent: "Transform",
    heroSubtitle: "Eight interconnected ministries, one mandate — to raise leaders that transform nations.",
    institutionsEyebrow: "The Ministries",
    institutionsHeading: "The Ecosystem of Transformation",
    institutionsBody: "Through our ministries, we equip people to excel in every sphere of society, from governance and business to community building and spiritual maturity.",
    statLives: "Lives Touched",
    statNations: "Nations",
    ministries: {
      dominionCity: { title: NAMES.dominionCity, desc: "A church ministry founded to raise leaders that transform societies, with over 1,000 chapters worldwide and a presence across America, Europe, the Middle East, Asia, and Africa, with regional offices in the United States, United Kingdom, and Nigeria." },
      goldenHeart: { title: NAMES.goldenHeart, desc: "A non-profit organization dedicated to youth empowerment and development. Host of the National Youth Summit, attracting over 50,000 participants annually from across Africa." },
      gmn: { title: NAMES.gmn, desc: "An alliance of global apostolic leaders united by a common mandate to expand the reach of the Gospel and transform nations." },
      glf: { title: NAMES.glf, desc: "A mentorship and leadership development platform established for human capital development and transformational leadership, enabling exponential growth in performance and productivity across ministry, career, enterprise, politics, government, and every sphere of influence." },
      dli: { title: NAMES.dli, desc: "A leadership training institute established for personal and ministry development. DLI has produced over 30,000 graduates who are making significant impact around the world." },
      priesthood: { title: NAMES.priesthood, desc: "A ministerial college established to train ministry professionals in the competence, capacity, charisma, and practical skillset required for the last-day move of God." },
      huram: { title: NAMES.huram, desc: "A building and construction company with strong expertise in architecture, engineering, and project management, delivering large-scale projects including mega auditoriums, estates, and universities." },
      shalom: { title: NAMES.shalom, desc: "A multi-commerce business venture responsible for the marketing and distribution of ministry books, publications, and other ministry commercial assets through an integrated supply chain." },
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
    heroEyebrow: "Nos Ministères",
    heroTitlePre: "Un réseau conçu pour ",
    heroTitleAccent: "transformer",
    heroSubtitle: "Huit ministères interconnectés, un seul mandat — former des leaders qui transforment les nations.",
    institutionsEyebrow: "Les Ministères",
    institutionsHeading: "L'écosystème de la transformation",
    institutionsBody: "À travers nos ministères, nous équipons les gens pour exceller dans chaque sphère de la société, de la gouvernance et des affaires à la construction communautaire et à la maturité spirituelle.",
    statLives: "Vies touchées",
    statNations: "Nations",
    ministries: {
      dominionCity: { title: NAMES.dominionCity, desc: "Un ministère d'église fondé pour former des leaders qui transforment les sociétés, avec plus de 1 000 antennes dans le monde et une présence en Amérique, en Europe, au Moyen-Orient, en Asie et en Afrique, avec des bureaux régionaux aux États-Unis, au Royaume-Uni et au Nigeria." },
      goldenHeart: { title: NAMES.goldenHeart, desc: "Une organisation à but non lucratif dédiée à l'autonomisation et au développement des jeunes. Organisatrice du Sommet National de la Jeunesse, attirant plus de 50 000 participants chaque année à travers l'Afrique." },
      gmn: { title: NAMES.gmn, desc: "Une alliance de leaders apostoliques mondiaux unis par un mandat commun : étendre la portée de l'Évangile et transformer les nations." },
      glf: { title: NAMES.glf, desc: "Une plateforme de mentorat et de développement du leadership créée pour le développement du capital humain et le leadership transformationnel, permettant une croissance exponentielle des performances et de la productivité dans le ministère, la carrière, l'entreprise, la politique, le gouvernement et toutes les sphères d'influence." },
      dli: { title: NAMES.dli, desc: "Un institut de formation au leadership créé pour le développement personnel et ministériel. DLI a formé plus de 30 000 diplômés qui ont un impact significatif dans le monde entier." },
      priesthood: { title: NAMES.priesthood, desc: "Un collège ministériel créé pour former des professionnels du ministère dans la compétence, la capacité, le charisme et les aptitudes pratiques requises pour l'œuvre de Dieu des derniers jours." },
      huram: { title: NAMES.huram, desc: "Une entreprise de bâtiment et de construction dotée d'une solide expertise en architecture, en ingénierie et en gestion de projet, réalisant des projets d'envergure, notamment des méga-auditoriums, des domaines résidentiels et des universités." },
      shalom: { title: NAMES.shalom, desc: "Une entreprise commerciale multi-secteurs responsable du marketing et de la distribution des livres, publications et autres actifs commerciaux du ministère à travers une chaîne d'approvisionnement intégrée." },
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
    heroEyebrow: "Os Nossos Ministérios",
    heroTitlePre: "Uma Rede Construída para ",
    heroTitleAccent: "Transformar",
    heroSubtitle: "Oito ministérios interligados, um único mandato — formar líderes que transformam nações.",
    institutionsEyebrow: "Os Ministérios",
    institutionsHeading: "O Ecossistema da Transformação",
    institutionsBody: "Através dos nossos ministérios, capacitamos pessoas para se destacarem em todas as esferas da sociedade, desde a governança e os negócios até à construção comunitária e à maturidade espiritual.",
    statLives: "Vidas Tocadas",
    statNations: "Nações",
    ministries: {
      dominionCity: { title: NAMES.dominionCity, desc: "Um ministério eclesiástico fundado para formar líderes que transformam sociedades, com mais de 1.000 filiais em todo o mundo e presença na América, Europa, Médio Oriente, Ásia e África, com escritórios regionais nos Estados Unidos, Reino Unido e Nigéria." },
      goldenHeart: { title: NAMES.goldenHeart, desc: "Uma organização sem fins lucrativos dedicada ao empoderamento e desenvolvimento dos jovens. Anfitriã da Cimeira Nacional da Juventude, atraindo mais de 50.000 participantes anualmente de toda a África." },
      gmn: { title: NAMES.gmn, desc: "Uma aliança de líderes apostólicos globais unidos por um mandato comum: expandir o alcance do Evangelho e transformar nações." },
      glf: { title: NAMES.glf, desc: "Uma plataforma de mentoria e desenvolvimento de liderança criada para o desenvolvimento do capital humano e a liderança transformadora, permitindo um crescimento exponencial no desempenho e na produtividade no ministério, carreira, empresa, política, governo e em todas as esferas de influência." },
      dli: { title: NAMES.dli, desc: "Um instituto de formação em liderança criado para o desenvolvimento pessoal e ministerial. O DLI já formou mais de 30.000 graduados que estão a causar impacto significativo em todo o mundo." },
      priesthood: { title: NAMES.priesthood, desc: "Um colégio ministerial criado para formar profissionais do ministério na competência, capacidade, carisma e conjunto de habilidades práticas necessárias para o mover de Deus dos últimos dias." },
      huram: { title: NAMES.huram, desc: "Uma empresa de construção civil com forte experiência em arquitetura, engenharia e gestão de projetos, entregando projetos de grande escala, incluindo mega auditórios, condomínios e universidades." },
      shalom: { title: NAMES.shalom, desc: "Um empreendimento comercial multissetorial responsável pelo marketing e distribuição de livros, publicações e outros ativos comerciais do ministério através de uma cadeia de abastecimento integrada." },
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
    heroEyebrow: "Huduma Zetu",
    heroTitlePre: "Mtandao Uliojengwa Ku",
    heroTitleAccent: "badilisha",
    heroSubtitle: "Huduma nane zilizounganishwa, agizo moja — kulea viongozi wanaobadilisha mataifa.",
    institutionsEyebrow: "Huduma",
    institutionsHeading: "Mfumo wa Mabadiliko",
    institutionsBody: "Kupitia huduma zetu, tunawawezesha watu kufanya vizuri katika kila nyanja ya jamii, kutoka utawala na biashara hadi ujenzi wa jamii na ukomavu wa kiroho.",
    statLives: "Maisha Yaliyoguswa",
    statNations: "Mataifa",
    ministries: {
      dominionCity: { title: NAMES.dominionCity, desc: "Huduma ya kanisa iliyoanzishwa kulea viongozi wanaobadilisha jamii, ikiwa na matawi zaidi ya 1,000 duniani kote na uwepo katika Amerika, Ulaya, Mashariki ya Kati, Asia, na Afrika, ikiwa na ofisi za kikanda Marekani, Uingereza, na Nigeria." },
      goldenHeart: { title: NAMES.goldenHeart, desc: "Shirika lisilo la faida linalojitolea kuwawezesha na kuwaendeleza vijana. Mwenyeji wa Mkutano wa Kitaifa wa Vijana, unaovutia washiriki zaidi ya 50,000 kila mwaka kutoka Afrika nzima." },
      gmn: { title: NAMES.gmn, desc: "Muungano wa viongozi wa kitume wa kimataifa walioungana kwa agizo moja: kupanua ufikaji wa Injili na kubadilisha mataifa." },
      glf: { title: NAMES.glf, desc: "Jukwaa la ushauri na maendeleo ya uongozi lililoanzishwa kwa ajili ya maendeleo ya raslimali watu na uongozi wa mabadiliko, likiwezesha ukuaji mkubwa wa utendaji na uzalishaji katika huduma, kazi, biashara, siasa, serikali, na kila nyanja ya ushawishi." },
      dli: { title: NAMES.dli, desc: "Taasisi ya mafunzo ya uongozi iliyoanzishwa kwa maendeleo ya binafsi na ya huduma. DLI imetoa wahitimu zaidi ya 30,000 wanaoleta athari kubwa duniani kote." },
      priesthood: { title: NAMES.priesthood, desc: "Chuo cha kihuduma kilichoanzishwa kuwafunza wataalamu wa huduma katika umahiri, uwezo, karama, na ujuzi wa vitendo unaohitajika kwa kazi ya Mungu ya siku za mwisho." },
      huram: { title: NAMES.huram, desc: "Kampuni ya ujenzi yenye utaalamu mkubwa katika usanifu majengo, uhandisi, na usimamizi wa miradi, ikitekeleza miradi mikubwa ikiwemo kumbi kubwa, makazi, na vyuo vikuu." },
      shalom: { title: NAMES.shalom, desc: "Biashara yenye sekta nyingi inayohusika na uuzaji na usambazaji wa vitabu, machapisho, na raslimali nyingine za kibiashara za huduma kupitia mnyororo wa ugavi ulioundwa." },
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
    heroEyebrow: "خدماتنا",
    heroTitlePre: "شبكة بُنيت من أجل ",
    heroTitleAccent: "التحول",
    heroSubtitle: "ثماني خدمات مترابطة، تكليف واحد — إعداد قادة يغيّرون الأمم.",
    institutionsEyebrow: "الخدمات",
    institutionsHeading: "منظومة التحول",
    institutionsBody: "من خلال خدماتنا، نُعِدّ الناس للتفوق في كل مجال من مجالات المجتمع، من الحوكمة والأعمال إلى بناء المجتمع والنضج الروحي.",
    statLives: "أرواح تأثرت",
    statNations: "دولة",
    ministries: {
      dominionCity: { title: NAMES.dominionCity, desc: "خدمة كنسية تأسست لإعداد قادة يغيّرون المجتمعات، بأكثر من 1,000 فرع حول العالم وحضور في أمريكا وأوروبا والشرق الأوسط وآسيا وأفريقيا، مع مكاتب إقليمية في الولايات المتحدة والمملكة المتحدة ونيجيريا." },
      goldenHeart: { title: NAMES.goldenHeart, desc: "منظمة غير ربحية مكرّسة لتمكين الشباب وتنميتهم. تستضيف القمة الوطنية للشباب التي تجتذب أكثر من 50,000 مشارك سنويًا من جميع أنحاء أفريقيا." },
      gmn: { title: NAMES.gmn, desc: "تحالف من القادة الرسوليين حول العالم توحّدهم رسالة مشتركة: توسيع انتشار الإنجيل وتغيير الأمم." },
      glf: { title: NAMES.glf, desc: "منصة للإرشاد وتطوير القيادة أُنشئت لتنمية رأس المال البشري والقيادة التحويلية، تتيح نموًا هائلاً في الأداء والإنتاجية عبر الخدمة والمهنة والأعمال والسياسة والحكومة وكل مجالات التأثير." },
      dli: { title: NAMES.dli, desc: "معهد لتدريب القيادة أُنشئ للتنمية الشخصية والخدمية. خرّج المعهد أكثر من 30,000 متخرج يُحدثون أثرًا كبيرًا حول العالم." },
      priesthood: { title: NAMES.priesthood, desc: "كلية خدمية أُنشئت لتدريب المحترفين في الخدمة على الكفاءة والقدرة والموهبة والمهارات العملية اللازمة لعمل الله في الأيام الأخيرة." },
      huram: { title: NAMES.huram, desc: "شركة بناء وتشييد تتمتع بخبرة قوية في الهندسة المعمارية والهندسة وإدارة المشاريع، تنفّذ مشاريع ضخمة تشمل قاعات كبرى ومجمّعات سكنية وجامعات." },
      shalom: { title: NAMES.shalom, desc: "مشروع تجاري متعدد الأنشطة مسؤول عن تسويق وتوزيع كتب الخدمة ومنشوراتها وأصولها التجارية الأخرى عبر سلسلة إمداد متكاملة." },
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
