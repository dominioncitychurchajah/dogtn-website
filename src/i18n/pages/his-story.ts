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
    timelineHeading: "A Life Marked by Purpose",
    timeline: {
      year1968Title: "Born in Alor, Anambra State",
      year1968Desc: "David Ugochukwu Ogbueli is born into a family in Alor, Anambra State, Nigeria.",
      year1980Title: "Ministry Begins at Age 12",
      year1980Desc: "A young David begins his journey of faith, sensing a divine call to lead and transform.",
      year1991Title: "New Covenant Family — UNN",
      year1991Desc: "While studying at the University of Nigeria, Nsukka, he pioneers the New Covenant Family campus fellowship.",
      year1996Title: "Dominion City Founded",
      year1996Desc: "What starts as a gathering of nurses at No. 2 Marcus Garvey Street, Enugu, becomes the foundation of a global movement.",
      year2000sTitle: "Expanding Across Nigeria and Africa",
      year2000sDesc: "The ministry grows rapidly across all geopolitical zones of Nigeria and into neighboring African nations.",
      year2010sTitle: "Global Footprint — Europe, Asia, Americas",
      year2010sDesc: "Chapters emerge in the United Kingdom, United States, Canada, and across Asia, with thousands attending global summits.",
      year2020sTitle: "2000+ Churches, 50+ Nations",
      year2020sDesc: "Today, Dominion City Global stands as one of Africa's most influential transformation networks, with Dr. Ogbueli recognized globally.",
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
    timelineHeading: "Une Vie Marquée par le But",
    timeline: {
      year1968Title: "Né à Alor, État d'Anambra",
      year1968Desc: "David Ugochukwu Ogbueli naît dans une famille à Alor, État d'Anambra, Nigeria.",
      year1980Title: "Le Ministère Commence à 12 Ans",
      year1980Desc: "Le jeune David commence son parcours de foi, sentant un appel divin à diriger et à transformer.",
      year1991Title: "New Covenant Family — UNN",
      year1991Desc: "Alors qu'il étudie à l'Université du Nigeria, Nsukka, il crée la communion universitaire New Covenant Family.",
      year1996Title: "Fondation de Dominion City",
      year1996Desc: "Ce qui commence comme un rassemblement d'infirmières au No. 2 Marcus Garvey Street, Enugu, devient le fondement d'un mouvement mondial.",
      year2000sTitle: "Expansion à travers le Nigeria et l'Afrique",
      year2000sDesc: "Le ministère se développe rapidement dans toutes les zones géopolitiques du Nigeria et dans les nations africaines voisines.",
      year2010sTitle: "Empreinte Mondiale — Europe, Asie, Amériques",
      year2010sDesc: "Des antennes émergent au Royaume-Uni, aux États-Unis, au Canada et en Asie, avec des milliers de participants aux sommets mondiaux.",
      year2020sTitle: "Plus de 2000 Églises, 50+ Nations",
      year2020sDesc: "Aujourd'hui, Dominion City Global est l'un des réseaux de transformation les plus influents d'Afrique, avec le Dr Ogbueli reconnu mondialement.",
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
    timelineHeading: "Uma Vida Marcada pelo Propósito",
    timeline: {
      year1968Title: "Nasceu em Alor, Estado de Anambra",
      year1968Desc: "David Ugochukwu Ogbueli nasce numa família em Alor, Estado de Anambra, Nigéria.",
      year1980Title: "O Ministério Começa aos 12 Anos",
      year1980Desc: "Um jovem David começa a sua jornada de fé, sentindo um chamado divino para liderar e transformar.",
      year1991Title: "New Covenant Family — UNN",
      year1991Desc: "Enquanto estudava na Universidade da Nigéria, Nsukka, ele é pioneiro da comunhão universitária New Covenant Family.",
      year1996Title: "Fundação da Dominion City",
      year1996Desc: "O que começa como um encontro de enfermeiras no No. 2 Marcus Garvey Street, Enugu, torna-se a base de um movimento global.",
      year2000sTitle: "Expansão pela Nigéria e África",
      year2000sDesc: "O ministério cresce rapidamente em todas as zonas geopolíticas da Nigéria e em nações africanas vizinhas.",
      year2010sTitle: "Alcance Global — Europa, Ásia, Américas",
      year2010sDesc: "Surgem filiais no Reino Unido, Estados Unidos, Canadá e em toda a Ásia, com milhares a participar em cimeiras globais.",
      year2020sTitle: "Mais de 2000 Igrejas, 50+ Nações",
      year2020sDesc: "Hoje, a Dominion City Global é uma das redes de transformação mais influentes de África, com o Dr. Ogbueli reconhecido globalmente.",
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
    timelineHeading: "Maisha Yaliyoashiriwa na Kusudi",
    timeline: {
      year1968Title: "Alizaliwa Alor, Jimbo la Anambra",
      year1968Desc: "David Ugochukwu Ogbueli anazaliwa katika familia huko Alor, Jimbo la Anambra, Nigeria.",
      year1980Title: "Huduma Yaanza Akiwa na Umri wa Miaka 12",
      year1980Desc: "David kijana anaanza safari yake ya imani, akihisi wito wa kimungu wa kuongoza na kubadilisha.",
      year1991Title: "New Covenant Family — UNN",
      year1991Desc: "Akiwa anasoma katika Chuo Kikuu cha Nigeria, Nsukka, anaanzisha ushirika wa chuo wa New Covenant Family.",
      year1996Title: "Dominion City Yaanzishwa",
      year1996Desc: "Kile kinachoanza kama mkusanyiko wa wauguzi katika No. 2 Marcus Garvey Street, Enugu, kinakuwa msingi wa vuguvugu la kimataifa.",
      year2000sTitle: "Kupanuka Kote Nigeria na Afrika",
      year2000sDesc: "Huduma inakua kwa kasi katika kanda zote za kisiasa za Nigeria na kuingia katika mataifa jirani ya Afrika.",
      year2010sTitle: "Athari za Kimataifa — Ulaya, Asia, Amerika",
      year2010sDesc: "Matawi yanaibuka Uingereza, Marekani, Kanada, na kote Asia, huku maelfu wakihudhuria mikutano ya kimataifa.",
      year2020sTitle: "Makanisa Zaidi ya 2000, Mataifa 50+",
      year2020sDesc: "Leo, Dominion City Global ni mojawapo ya mitandao yenye ushawishi mkubwa zaidi ya mabadiliko barani Afrika, huku Dr. Ogbueli akitambuliwa kimataifa.",
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
    timelineHeading: "حياة مطبوعة بالهدف",
    timeline: {
      year1968Title: "وُلد في ألور، ولاية أنامبرا",
      year1968Desc: "وُلد ديفيد أوغوتشوكو أوغبويلي في عائلة في ألور، ولاية أنامبرا، نيجيريا.",
      year1980Title: "بدأت الخدمة في سن الثانية عشرة",
      year1980Desc: "بدأ ديفيد الشاب رحلته الإيمانية، مستشعرًا دعوة إلهية للقيادة والتغيير.",
      year1991Title: "عائلة العهد الجديد — جامعة نيجيريا",
      year1991Desc: "أثناء دراسته في جامعة نيجيريا، نسوكا، أسس شركة العائلة الجامعية الجديدة للعهد.",
      year1996Title: "تأسيس Dominion City",
      year1996Desc: "ما بدأ كتجمع للممرضات في No. 2 Marcus Garvey Street، إينوغو، أصبح أساس حركة عالمية.",
      year2000sTitle: "التوسع عبر نيجيريا وأفريقيا",
      year2000sDesc: "تنمو الخدمة بسرعة عبر جميع المناطق الجيوسياسية في نيجيريا وإلى الدول الأفريقية المجاورة.",
      year2010sTitle: "بصمة عالمية — أوروبا، آسيا، الأمريكتين",
      year2010sDesc: "تظهر فروع في المملكة المتحدة والولايات المتحدة وكندا وعبر آسيا، مع حضور الآلاف للقمم العالمية.",
      year2020sTitle: "أكثر من 2000 كنيسة، 50+ دولة",
      year2020sDesc: "اليوم، تُعد Dominion City Global واحدة من أكثر شبكات التحول تأثيرًا في أفريقيا، ويحظى الدكتور أوغبويلي باعتراف عالمي.",
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
