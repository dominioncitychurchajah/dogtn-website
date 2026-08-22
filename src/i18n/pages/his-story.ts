import type { Locale } from "@/i18n/config";

/** Per-page translation module for the His Story page. */
export interface HisStoryCopy {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  timelineHeading: string;
  timeline: {
    year1968Title: string;
    year1968Desc: string;
    year1980Title: string;
    year1980Desc: string;
    year1991Title: string;
    year1991Desc: string;
    year1996Title: string;
    year1996Desc: string;
    year2000sTitle: string;
    year2000sDesc: string;
    year2010sTitle: string;
    year2010sDesc: string;
    year2020sTitle: string;
    year2020sDesc: string;
  };
  educationEyebrow: string;
  educationHeading: string;
  education: {
    harvardProgramme: string;
    lbsProgramme: string;
    nipssProgramme: string;
  };
  philosophyQuote: string;
  philosophyBody: string;
  ctaHeading: string;
  browseBooks: string;
  watchTeachings: string;
}

export const hisStoryCopy: Record<Locale, HisStoryCopy> = {
  en: {
    heroEyebrow: "HIS JOURNEY",
    heroTitle: "The Journey of a Reformer",
    heroSubtitle: "Three decades of apostolic ministry that shaped a generation and touched a world.",
    timelineHeading: "A Legacy of Impact",
    timeline: {
      year1968Title: "Impact Among Secondary Students",
      year1968Desc: "As a young leader, David Ogbueli reaches secondary-school students across the region — turning many from waywardness toward purpose, discipline, and faith.",
      year1980Title: "Confronting Cultism at University",
      year1980Desc: "At the University of Nigeria, Nsukka, he pioneers the New Covenant Family — directly confronting campus cultism and raising students grounded in character and calling.",
      year1991Title: "Dominion City Is Born",
      year1991Desc: "Founds Dominion City in Enugu — a movement to raise leaders that transform every sphere of society.",
      year1996Title: "The National Youth Summit",
      year1996Desc: "After relocating to Lagos, he launches the National Youth Summit — mobilizing tens of thousands of young people and emerging leaders each year.",
      year2000sTitle: "Transformation Across Nations",
      year2000sDesc: "The movement multiplies across Nigeria, Africa, Europe, Asia, and the Americas — raising leaders in business, governance, and ministry.",
      year2010sTitle: "A Global Voice",
      year2010sDesc: "His message reaches the United Nations and global leadership platforms; he is honored by the Mayor of Brampton, Canada, for community impact.",
      year2020sTitle: "2,000+ Churches. 50+ Nations.",
      year2020sDesc: "One of Africa's most influential transformation networks, with 30,000+ leaders trained through the Dominion Leadership Institute alone.",
    },
    educationEyebrow: "Continuous Learning",
    educationHeading: "Sharpened for Excellence",
    education: {
      harvardProgramme: "Executive Leadership Programme",
      lbsProgramme: "Senior Management Programme",
      nipssProgramme: "National Institute for Policy and Strategic Studies (Course 41)",
    },
    philosophyQuote: "The mandate of the Church is not to fill pews but to fill positions — in government, business, arts, and society.",
    philosophyBody: "Alongside his global mandate, Dr. Ogbueli is a devoted family man, cherishing the steadfast support of his wife and children as they serve the vision together. Family remains the bedrock of his transformative philosophy, exemplifying the foundational values he imparts to millions across the globe.",
    ctaHeading: "Explore His Teachings",
    browseBooks: "Browse Books",
    watchTeachings: "Watch Teachings",
  },
  fr: {
    heroEyebrow: "SON PARCOURS",
    heroTitle: "Le Parcours d'un Réformateur",
    heroSubtitle: "Trois décennies de ministère apostolique qui ont façonné une génération et touché un monde.",
    timelineHeading: "Un Héritage d'Impact",
    timeline: {
      year1968Title: "Impact auprès des Élèves du Secondaire",
      year1968Desc: "Jeune leader, David Ogbueli touche les élèves du secondaire de sa région — détournant beaucoup de l'égarement vers le but, la discipline et la foi.",
      year1980Title: "Face au Cultisme à l'Université",
      year1980Desc: "À l'Université du Nigeria, Nsukka, il fonde la New Covenant Family — affrontant directement le cultisme sur le campus et formant des étudiants ancrés dans le caractère et la vocation.",
      year1991Title: "Naissance de Dominion City",
      year1991Desc: "Fonde Dominion City à Enugu — un mouvement pour former des leaders qui transforment chaque sphère de la société.",
      year1996Title: "Le Sommet National de la Jeunesse",
      year1996Desc: "Après son installation à Lagos, il lance le Sommet National de la Jeunesse — mobilisant chaque année des dizaines de milliers de jeunes et de leaders émergents.",
      year2000sTitle: "La Transformation à travers les Nations",
      year2000sDesc: "Le mouvement se multiplie au Nigeria, en Afrique, en Europe, en Asie et dans les Amériques — formant des leaders dans les affaires, la gouvernance et le ministère.",
      year2010sTitle: "Une Voix Mondiale",
      year2010sDesc: "Son message atteint les Nations Unies et les plateformes de leadership mondial ; il est honoré par le maire de Brampton, au Canada, pour son impact communautaire.",
      year2020sTitle: "Plus de 2 000 Églises. 50+ Nations.",
      year2020sDesc: "L'un des réseaux de transformation les plus influents d'Afrique, avec plus de 30 000 leaders formés par le seul Dominion Leadership Institute.",
    },
    educationEyebrow: "Apprentissage Continu",
    educationHeading: "Aiguisé pour l'Excellence",
    education: {
      harvardProgramme: "Programme de Leadership Exécutif",
      lbsProgramme: "Programme de Gestion Supérieure",
      nipssProgramme: "Institut National des Politiques et Études Stratégiques (Cours 41)",
    },
    philosophyQuote: "Le mandat de l'Église n'est pas de remplir les bancs mais de remplir des postes — dans le gouvernement, les affaires, les arts et la société.",
    philosophyBody: "Aux côtés de son mandat mondial, le Dr Ogbueli est un homme de famille dévoué, chérissant le soutien indéfectible de son épouse et de ses enfants alors qu'ils servent ensemble la vision. La famille reste le socle de sa philosophie transformatrice, illustrant les valeurs fondamentales qu'il transmet à des millions de personnes à travers le monde.",
    ctaHeading: "Découvrez Ses Enseignements",
    browseBooks: "Parcourir les Livres",
    watchTeachings: "Regarder les Enseignements",
  },
  pt: {
    heroEyebrow: "A SUA JORNADA",
    heroTitle: "A Jornada de um Reformador",
    heroSubtitle: "Três décadas de ministério apostólico que moldaram uma geração e tocaram um mundo.",
    timelineHeading: "Um Legado de Impacto",
    timeline: {
      year1968Title: "Impacto entre Estudantes do Secundário",
      year1968Desc: "Como jovem líder, David Ogbueli alcança estudantes do ensino secundário da sua região — afastando muitos do desvio rumo ao propósito, à disciplina e à fé.",
      year1980Title: "Enfrentando o Cultismo na Universidade",
      year1980Desc: "Na Universidade da Nigéria, Nsukka, ele funda a New Covenant Family — enfrentando diretamente o cultismo no campus e formando estudantes firmados no carácter e no chamado.",
      year1991Title: "Nasce a Dominion City",
      year1991Desc: "Funda a Dominion City em Enugu — um movimento para formar líderes que transformam cada esfera da sociedade.",
      year1996Title: "A Cimeira Nacional da Juventude",
      year1996Desc: "Após mudar-se para Lagos, lança a Cimeira Nacional da Juventude — mobilizando dezenas de milhares de jovens e líderes emergentes todos os anos.",
      year2000sTitle: "Transformação através das Nações",
      year2000sDesc: "O movimento multiplica-se pela Nigéria, África, Europa, Ásia e Américas — formando líderes nos negócios, na governação e no ministério.",
      year2010sTitle: "Uma Voz Global",
      year2010sDesc: "A sua mensagem alcança as Nações Unidas e plataformas globais de liderança; é honrado pelo Presidente da Câmara de Brampton, no Canadá, pelo seu impacto comunitário.",
      year2020sTitle: "Mais de 2.000 Igrejas. 50+ Nações.",
      year2020sDesc: "Uma das redes de transformação mais influentes de África, com mais de 30.000 líderes formados apenas pelo Dominion Leadership Institute.",
    },
    educationEyebrow: "Aprendizagem Contínua",
    educationHeading: "Aperfeiçoado para a Excelência",
    education: {
      harvardProgramme: "Programa de Liderança Executiva",
      lbsProgramme: "Programa de Gestão Sénior",
      nipssProgramme: "Instituto Nacional de Políticas e Estudos Estratégicos (Curso 41)",
    },
    philosophyQuote: "O mandato da Igreja não é encher bancos, mas ocupar posições — no governo, nos negócios, nas artes e na sociedade.",
    philosophyBody: "Além do seu mandato global, o Dr. Ogbueli é um homem de família dedicado, apreciando o apoio constante da sua esposa e filhos enquanto servem a visão juntos. A família continua a ser o alicerce da sua filosofia transformadora, exemplificando os valores fundamentais que transmite a milhões em todo o mundo.",
    ctaHeading: "Explore os Seus Ensinamentos",
    browseBooks: "Explorar Livros",
    watchTeachings: "Assistir Ensinamentos",
  },
  sw: {
    heroEyebrow: "SAFARI YAKE",
    heroTitle: "Safari ya Mrekebishaji",
    heroSubtitle: "Miongo mitatu ya huduma ya kitume iliyounda kizazi na kugusa dunia.",
    timelineHeading: "Urithi wa Athari",
    timeline: {
      year1968Title: "Athari kwa Wanafunzi wa Sekondari",
      year1968Desc: "Akiwa kiongozi kijana, David Ogbueli anawafikia wanafunzi wa sekondari katika eneo lake — akiwageuza wengi kutoka upotovu kuelekea kusudi, nidhamu na imani.",
      year1980Title: "Kukabiliana na Vikundi vya Siri Chuoni",
      year1980Desc: "Katika Chuo Kikuu cha Nigeria, Nsukka, anaanzisha New Covenant Family — akikabiliana moja kwa moja na vikundi vya siri (cultism) chuoni na kulea wanafunzi wenye tabia na wito.",
      year1991Title: "Kuzaliwa kwa Dominion City",
      year1991Desc: "Anaanzisha Dominion City huko Enugu — vuguvugu la kulea viongozi wanaobadilisha kila nyanja ya jamii.",
      year1996Title: "Mkutano wa Kitaifa wa Vijana",
      year1996Desc: "Baada ya kuhamia Lagos, anazindua Mkutano wa Kitaifa wa Vijana — akihamasisha makumi ya maelfu ya vijana na viongozi chipukizi kila mwaka.",
      year2000sTitle: "Mabadiliko Kote Mataifa",
      year2000sDesc: "Vuguvugu linaenea Nigeria, Afrika, Ulaya, Asia na Amerika — likilea viongozi katika biashara, utawala na huduma.",
      year2010sTitle: "Sauti ya Kimataifa",
      year2010sDesc: "Ujumbe wake unafika Umoja wa Mataifa na majukwaa ya uongozi ya kimataifa; anaheshimiwa na Meya wa Brampton, Kanada, kwa athari zake kwa jamii.",
      year2020sTitle: "Makanisa 2,000+. Mataifa 50+.",
      year2020sDesc: "Mojawapo ya mitandao yenye ushawishi mkubwa ya mabadiliko barani Afrika, ikiwa na viongozi 30,000+ waliofunzwa na Dominion Leadership Institute pekee.",
    },
    educationEyebrow: "Kujifunza Kuendelea",
    educationHeading: "Amenolewa kwa Ubora",
    education: {
      harvardProgramme: "Mpango wa Uongozi Mkuu",
      lbsProgramme: "Mpango wa Usimamizi wa Juu",
      nipssProgramme: "Taasisi ya Kitaifa ya Sera na Mafunzo ya Kimkakati (Kozi ya 41)",
    },
    philosophyQuote: "Agizo la Kanisa si kujaza viti bali kujaza nafasi — katika serikali, biashara, sanaa, na jamii.",
    philosophyBody: "Pamoja na agizo lake la kimataifa, Dr. Ogbueli ni mume na baba mwenye kujitolea, akithamini msaada thabiti wa mkewe na watoto wanapotumikia maono pamoja. Familia inabaki kuwa msingi wa falsafa yake ya mabadiliko, ikionyesha maadili ya msingi anayowapa mamilioni duniani kote.",
    ctaHeading: "Gundua Mafundisho Yake",
    browseBooks: "Vinjari Vitabu",
    watchTeachings: "Tazama Mafundisho",
  },
  ar: {
    heroEyebrow: "رحلته",
    heroTitle: "رحلة مُصلح",
    heroSubtitle: "ثلاثة عقود من الخدمة الرسولية التي شكّلت جيلاً ولمست عالماً.",
    timelineHeading: "إرثٌ من الأثر",
    timeline: {
      year1968Title: "أثر بين طلاب المدارس الثانوية",
      year1968Desc: "بصفته قائدًا شابًا، وصل ديفيد أوغبويلي إلى طلاب المدارس الثانوية في منطقته — محوِّلًا الكثيرين من الضياع نحو الهدف والانضباط والإيمان.",
      year1980Title: "مواجهة الطائفية في الجامعة",
      year1980Desc: "في جامعة نيجيريا، نسوكا، أسّس عائلة العهد الجديد — مواجهًا الطائفية (العصابات) في الحرم الجامعي مباشرةً، ومُعِدًّا طلابًا راسخين في الشخصية والدعوة.",
      year1991Title: "ميلاد Dominion City",
      year1991Desc: "أسّس Dominion City في إينوغو — حركة لإعداد قادة يغيّرون كل مجالات المجتمع.",
      year1996Title: "القمة الوطنية للشباب",
      year1996Desc: "بعد انتقاله إلى لاغوس، أطلق القمة الوطنية للشباب — محشِّدًا عشرات الآلاف من الشباب والقادة الناشئين كل عام.",
      year2000sTitle: "التحول عبر الأمم",
      year2000sDesc: "تتضاعف الحركة عبر نيجيريا وأفريقيا وأوروبا وآسيا والأمريكتين — مُعِدّةً قادة في الأعمال والحوكمة والخدمة.",
      year2010sTitle: "صوتٌ عالمي",
      year2010sDesc: "تصل رسالته إلى الأمم المتحدة ومنصات القيادة العالمية؛ ويُكرَّم من عمدة برامبتون بكندا لأثره المجتمعي.",
      year2020sTitle: "أكثر من 2000 كنيسة. 50+ دولة.",
      year2020sDesc: "واحدة من أكثر شبكات التحول تأثيرًا في أفريقيا، مع أكثر من 30,000 قائد تدرّبوا عبر معهد Dominion للقيادة وحده.",
    },
    educationEyebrow: "التعلّم المستمر",
    educationHeading: "مُهيّأ للتميّز",
    education: {
      harvardProgramme: "برنامج القيادة التنفيذية",
      lbsProgramme: "برنامج الإدارة العليا",
      nipssProgramme: "المعهد الوطني للسياسات والدراسات الاستراتيجية (الدورة 41)",
    },
    philosophyQuote: "تكليف الكنيسة ليس ملء المقاعد بل ملء المواقع — في الحكومة والأعمال والفنون والمجتمع.",
    philosophyBody: "إلى جانب تكليفه العالمي، الدكتور أوغبويلي رجل عائلة متفانٍ، يعتز بالدعم الثابت من زوجته وأبنائه وهم يخدمون الرؤية معًا. تظل العائلة أساس فلسفته التحويلية، مجسّدة القيم الأساسية التي ينقلها لملايين الأشخاص حول العالم.",
    ctaHeading: "استكشف تعاليمه",
    browseBooks: "تصفّح الكتب",
    watchTeachings: "شاهد التعاليم",
  },
};
