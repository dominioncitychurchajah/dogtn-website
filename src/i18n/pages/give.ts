import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Give page.
 * The server page reads `giveCopy[locale]`; `GivingCard` imports this module
 * and reads it via a `locale` prop.
 */
export interface GiveCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** 3 trust badges: Secure SSL, PCI Compliant, Global Reach */
  trust: [string, string, string];
  /** 3 impact items: Training Leaders, Supporting Missions, Serving Communities */
  impact: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string },
  ];
  partnershipTitle: string;
  partnershipSubtitle: string;
  /** 3 partnership cards: Monthly, Missions, Scholarship */
  cards: [
    { title: string; body: string; link: string },
    { title: string; body: string; link: string },
    { title: string; body: string; link: string },
  ];
  faqsTitle: string;
  /** 4 FAQ pairs */
  faqs: [
    { question: string; answer: string },
    { question: string; answer: string },
    { question: string; answer: string },
    { question: string; answer: string },
  ];
  // GivingCard
  selectFund: string;
  /** 5 fund names: General, Golden Heart, Missions, Building, GLF Scholarships */
  funds: [string, string, string, string, string];
  oneTime: string;
  monthly: string;
  impactBadge: string;
  selectAmount: string;
  otherAmount: string;
  receiptEmail: string;
  continueSecurely: string;
  termsPrefix: string;
  termsLink: string;
  termsSuffix: string;
  toastChooseAmount: string;
  /** Template with {amount} {frequency} {fund} placeholders */
  toastThankYou: string;
  toastFreqMonthly: string;
  toastFreqOneTime: string;
}

export const giveCopy: Record<Locale, GiveCopy> = {
  en: {
    metaTitle: "Give",
    metaDescription:
      "Partner with the institutions, missions, training, and outreach work raising leaders and transforming society across the globe.",
    eyebrow: "Give",
    title: "Give: Invest in Eternal Impact",
    subtitle:
      "Your generosity trains leaders, reaches communities, and transforms lives. Discover the different ways you can give below.",
    trust: ["Secure SSL", "PCI Compliant", "Global Reach"],
    impact: [
      {
        title: "Training Leaders",
        body: "Equipping the next generation of leaders through world-class institutes.",
      },
      {
        title: "Supporting Missions",
        body: "Funding outreach and humanitarian efforts in communities around the world.",
      },
      {
        title: "Serving Communities",
        body: "Investing in community transformation, education, and social welfare.",
      },
    ],
    partnershipTitle: "Partnership & General Giving: Your Impact Starts Here.",
    partnershipSubtitle:
      "Choose the purpose that resonates with your heart, then continue securely with the giving option that fits you.",
    cards: [
      {
        title: "Monthly Partner",
        body: "Consistency fuels transformation. Join the foundation of our work with regular monthly support that sustains long-term projects.",
        link: "Learn More",
      },
      {
        title: "Missions Partner",
        body: "Fund outreach and humanitarian efforts. Your partnership ensures transformation reaches communities around the world.",
        link: "Explore Impact",
      },
      {
        title: "Scholarship Partner",
        body: "Remove barriers to excellence. Provide learning resources and care for promising leaders in our global training programs.",
        link: "Give Scholarship",
      },
    ],
    faqsTitle: "Giving FAQs",
    faqs: [
      {
        question: "How do I receive receipts?",
        answer:
          "Receipts are automatically generated and sent to the email address provided at the time of your gift. You can also log into your donor profile to view your full history.",
      },
      {
        question: "Annual statements for tax purposes?",
        answer:
          "Consolidated annual statements are emailed to all donors every January for the preceding tax year. Please ensure your contact details remain current.",
      },
      {
        question: "Managing recurring giving?",
        answer:
          "You can pause, modify, or cancel your recurring gifts at any time through the 'My Journey' portal. Simply click the account icon in the navigation bar.",
      },
      {
        question: "Can I give internationally?",
        answer:
          "Yes, our secure payment system supports a wide range of global currencies and local payment methods including bank transfers and mobile wallets.",
      },
    ],
    selectFund: "Select a Fund",
    funds: ["General", "Golden Heart", "Missions", "Building", "GLF Scholarships"],
    oneTime: "One-time",
    monthly: "Monthly",
    impactBadge: "Impact",
    selectAmount: "Select Amount",
    otherAmount: "Other Amount",
    receiptEmail: "Receipt Email",
    continueSecurely: "Continue Securely",
    termsPrefix: "By continuing, you agree to our ",
    termsLink: "Terms",
    termsSuffix:
      " and acknowledge that gifts are processed securely through authorized payment gateways.",
    toastChooseAmount: "Please choose an amount to give.",
    toastThankYou: "Thank you — {amount} {frequency} to {fund}. Redirecting to secure checkout…",
    toastFreqMonthly: "monthly",
    toastFreqOneTime: "one-time",
  },
  fr: {
    metaTitle: "Faire un don",
    metaDescription:
      "Associez-vous aux institutions, aux missions, à la formation et aux actions de proximité qui forment des leaders et transforment la société à travers le monde.",
    eyebrow: "Faire un don",
    title: "Donnez pour une transformation durable.",
    subtitle:
      "Associez-vous aux institutions, aux missions, à la formation et aux actions de proximité qui forment des leaders et transforment la société à travers le monde.",
    trust: ["SSL sécurisé", "Conforme PCI", "Portée mondiale"],
    impact: [
      {
        title: "Former des leaders",
        body: "Équiper la prochaine génération de réformateurs de la société grâce à des instituts de leadership stratégiques.",
      },
      {
        title: "Soutenir les missions",
        body: "Faciliter des projets d'action mondiale et des efforts humanitaires dans les territoires non atteints.",
      },
      {
        title: "Servir les communautés",
        body: "Investir dans des initiatives de transformation communautaire, des infrastructures et le bien-être social.",
      },
    ],
    partnershipTitle: "Programmes de partenariat",
    partnershipSubtitle:
      "Approfondissez votre engagement envers la vision en rejoignant l'un de nos cercles de partenariat essentiels.",
    cards: [
      {
        title: "Partenaire mensuel",
        body: "La constance alimente la transformation. Rejoignez le socle de notre travail grâce à un soutien mensuel régulier qui soutient des projets à long terme.",
        link: "En savoir plus",
      },
      {
        title: "Partenaire des missions",
        body: "Financez directement l'action pionnière. Votre partenariat garantit que la lumière de la transformation atteigne les extrémités de la terre.",
        link: "Découvrir l'impact",
      },
      {
        title: "Partenaire des bourses",
        body: "Levez les obstacles à l'excellence. Offrez des ressources d'apprentissage et un accompagnement à des leaders prometteurs de nos programmes de formation mondiaux.",
        link: "Offrir une bourse",
      },
    ],
    faqsTitle: "Questions fréquentes sur les dons",
    faqs: [
      {
        question: "Comment recevoir mes reçus ?",
        answer:
          "Les reçus sont générés automatiquement et envoyés à l'adresse e-mail indiquée au moment de votre don. Vous pouvez également vous connecter à votre profil de donateur pour consulter l'intégralité de votre historique.",
      },
      {
        question: "Relevés annuels à des fins fiscales ?",
        answer:
          "Des relevés annuels consolidés sont envoyés par e-mail à tous les donateurs chaque mois de janvier pour l'année fiscale précédente. Veuillez veiller à ce que vos coordonnées restent à jour.",
      },
      {
        question: "Gérer les dons récurrents ?",
        answer:
          "Vous pouvez suspendre, modifier ou annuler vos dons récurrents à tout moment via le portail « Mon parcours ». Il vous suffit de cliquer sur l'icône du compte dans la barre de navigation.",
      },
      {
        question: "Puis-je faire un don depuis l'étranger ?",
        answer:
          "Oui, notre système de paiement sécurisé prend en charge un large éventail de devises internationales et de moyens de paiement locaux, y compris les virements bancaires et les portefeuilles mobiles.",
      },
    ],
    selectFund: "Choisir un fonds",
    funds: ["Général", "Cœur d'or", "Missions", "Construction", "Bourses GLF"],
    oneTime: "Ponctuel",
    monthly: "Mensuel",
    impactBadge: "Impact",
    selectAmount: "Choisir un montant",
    otherAmount: "Autre montant",
    receiptEmail: "E-mail pour le reçu",
    continueSecurely: "Continuer en toute sécurité",
    termsPrefix: "En continuant, vous acceptez nos ",
    termsLink: "Conditions",
    termsSuffix:
      " et reconnaissez que les dons sont traités en toute sécurité via des passerelles de paiement autorisées.",
    toastChooseAmount: "Veuillez choisir un montant à donner.",
    toastThankYou:
      "Merci — {amount} {frequency} pour {fund}. Redirection vers le paiement sécurisé…",
    toastFreqMonthly: "mensuel",
    toastFreqOneTime: "ponctuel",
  },
  pt: {
    metaTitle: "Doar",
    metaDescription:
      "Seja parceiro das instituições, missões, formação e ações de proximidade que formam líderes e transformam a sociedade em todo o mundo.",
    eyebrow: "Doar",
    title: "Doe para uma transformação duradoura.",
    subtitle:
      "Seja parceiro das instituições, missões, formação e ações de proximidade que formam líderes e transformam a sociedade em todo o mundo.",
    trust: ["SSL seguro", "Conforme PCI", "Alcance global"],
    impact: [
      {
        title: "Formar líderes",
        body: "Equipar a próxima geração de reformadores da sociedade através de institutos de liderança estratégicos.",
      },
      {
        title: "Apoiar missões",
        body: "Facilitar projetos de alcance global e esforços humanitários em territórios não alcançados.",
      },
      {
        title: "Servir comunidades",
        body: "Investir em iniciativas de transformação comunitária, infraestruturas e bem-estar social.",
      },
    ],
    partnershipTitle: "Programas de parceria",
    partnershipSubtitle:
      "Aprofunde o seu compromisso com a visão juntando-se a um dos nossos círculos de parceria principais.",
    cards: [
      {
        title: "Parceiro mensal",
        body: "A consistência alimenta a transformação. Junte-se à base do nosso trabalho com um apoio mensal regular que sustenta projetos de longo prazo.",
        link: "Saber mais",
      },
      {
        title: "Parceiro das missões",
        body: "Financie diretamente o alcance pioneiro. A sua parceria garante que a luz da transformação chegue aos confins da terra.",
        link: "Explorar o impacto",
      },
      {
        title: "Parceiro de bolsas",
        body: "Remova as barreiras à excelência. Ofereça propinas e recursos a líderes promissores nos nossos programas de formação globais.",
        link: "Doar bolsa",
      },
    ],
    faqsTitle: "Perguntas frequentes sobre doações",
    faqs: [
      {
        question: "Como recebo os recibos?",
        answer:
          "Os recibos são gerados automaticamente e enviados para o endereço de e-mail fornecido no momento da sua doação. Também pode iniciar sessão no seu perfil de doador para ver todo o histórico.",
      },
      {
        question: "Declarações anuais para efeitos fiscais?",
        answer:
          "As declarações anuais consolidadas são enviadas por e-mail a todos os doadores em janeiro de cada ano, relativas ao ano fiscal anterior. Certifique-se de que os seus dados de contacto se mantêm atualizados.",
      },
      {
        question: "Gerir doações recorrentes?",
        answer:
          "Pode pausar, modificar ou cancelar as suas doações recorrentes a qualquer momento através do portal «A Minha Jornada». Basta clicar no ícone da conta na barra de navegação.",
      },
      {
        question: "Posso doar internacionalmente?",
        answer:
          "Sim, o nosso sistema de pagamento seguro suporta uma ampla variedade de moedas globais e métodos de pagamento locais, incluindo transferências bancárias e carteiras móveis.",
      },
    ],
    selectFund: "Selecionar um fundo",
    funds: ["Geral", "Coração de Ouro", "Missões", "Construção", "Bolsas GLF"],
    oneTime: "Única vez",
    monthly: "Mensal",
    impactBadge: "Impacto",
    selectAmount: "Selecionar montante",
    otherAmount: "Outro montante",
    receiptEmail: "E-mail para o recibo",
    continueSecurely: "Continuar em segurança",
    termsPrefix: "Ao continuar, concorda com os nossos ",
    termsLink: "Termos",
    termsSuffix:
      " e reconhece que as doações são processadas em segurança através de gateways de pagamento autorizados.",
    toastChooseAmount: "Por favor, escolha um montante para doar.",
    toastThankYou:
      "Obrigado — {amount} {frequency} para {fund}. A redirecionar para o pagamento seguro…",
    toastFreqMonthly: "mensal",
    toastFreqOneTime: "único",
  },
  sw: {
    metaTitle: "Toa",
    metaDescription:
      "Shirikiana na taasisi, misheni, mafunzo, na kazi ya kufikia jamii inayoinua viongozi na kubadilisha jamii duniani kote.",
    eyebrow: "Toa",
    title: "Toa kwa ajili ya mabadiliko ya kudumu.",
    subtitle:
      "Shirikiana na taasisi, misheni, mafunzo, na kazi ya kufikia jamii inayoinua viongozi na kubadilisha jamii duniani kote.",
    trust: ["SSL Salama", "Inakidhi PCI", "Ufikiaji wa Kimataifa"],
    impact: [
      {
        title: "Kufundisha Viongozi",
        body: "Kuwaandaa kizazi kijacho cha wanamageuzi wa jamii kupitia taasisi za uongozi za kimkakati.",
      },
      {
        title: "Kusaidia Misheni",
        body: "Kuwezesha miradi ya kufikia jamii duniani na juhudi za kibinadamu katika maeneo ambayo hayajafikiwa.",
      },
      {
        title: "Kuhudumia Jamii",
        body: "Kuwekeza katika mipango ya mabadiliko ya jamii, miundombinu, na ustawi wa kijamii.",
      },
    ],
    partnershipTitle: "Programu za Ushirikiano",
    partnershipSubtitle:
      "Ongeza kujitolea kwako kwa maono kwa kujiunga na moja ya duru zetu kuu za ushirikiano.",
    cards: [
      {
        title: "Mshirika wa Kila Mwezi",
        body: "Uthabiti huchochea mabadiliko. Jiunge na msingi wa kazi yetu kwa msaada wa kawaida wa kila mwezi unaoendeleza miradi ya muda mrefu.",
        link: "Jifunze Zaidi",
      },
      {
        title: "Mshirika wa Misheni",
        body: "Fadhili moja kwa moja kazi ya kufikia maeneo mapya. Ushirikiano wako huhakikisha nuru ya mabadiliko inafika miisho ya dunia.",
        link: "Chunguza Athari",
      },
      {
        title: "Mshirika wa Ufadhili wa Masomo",
        body: "Ondoa vizuizi vya ubora. Toa ada na rasilimali kwa viongozi wenye matumaini katika programu zetu za mafunzo za kimataifa.",
        link: "Toa Ufadhili wa Masomo",
      },
    ],
    faqsTitle: "Maswali ya Mara kwa Mara kuhusu Kutoa",
    faqs: [
      {
        question: "Ninapataje risiti?",
        answer:
          "Risiti hutengenezwa kiotomatiki na kutumwa kwa anwani ya barua pepe uliyotoa wakati wa mchango wako. Unaweza pia kuingia katika wasifu wako wa mtoaji ili kuona historia yako kamili.",
      },
      {
        question: "Taarifa za mwaka kwa madhumuni ya kodi?",
        answer:
          "Taarifa za mwaka zilizojumuishwa hutumwa kwa barua pepe kwa watoaji wote kila mwezi Januari kwa mwaka wa kodi uliopita. Tafadhali hakikisha maelezo yako ya mawasiliano yanabaki ya sasa.",
      },
      {
        question: "Kudhibiti michango ya mara kwa mara?",
        answer:
          "Unaweza kusitisha, kubadilisha, au kughairi michango yako ya mara kwa mara wakati wowote kupitia lango la 'Safari Yangu'. Bofya tu aikoni ya akaunti kwenye upau wa urambazaji.",
      },
      {
        question: "Naweza kutoa kimataifa?",
        answer:
          "Ndiyo, mfumo wetu salama wa malipo unasaidia aina mbalimbali za sarafu za kimataifa na njia za malipo za kienyeji ikiwa ni pamoja na uhamishaji wa benki na pochi za simu.",
      },
    ],
    selectFund: "Chagua Mfuko",
    funds: ["Kwa Ujumla", "Moyo wa Dhahabu", "Misheni", "Ujenzi", "Ufadhili wa Masomo wa GLF"],
    oneTime: "Mara Moja",
    monthly: "Kila Mwezi",
    impactBadge: "Athari",
    selectAmount: "Chagua Kiasi",
    otherAmount: "Kiasi Kingine",
    receiptEmail: "Barua Pepe ya Risiti",
    continueSecurely: "Endelea kwa Usalama",
    termsPrefix: "Kwa kuendelea, unakubali ",
    termsLink: "Masharti",
    termsSuffix:
      " yetu na unatambua kuwa michango huchakatwa kwa usalama kupitia lango za malipo zilizoidhinishwa.",
    toastChooseAmount: "Tafadhali chagua kiasi cha kutoa.",
    toastThankYou:
      "Asante — {amount} {frequency} kwa {fund}. Inaelekeza kwenye malipo salama…",
    toastFreqMonthly: "kila mwezi",
    toastFreqOneTime: "wa mara moja",
  },
  ar: {
    metaTitle: "العطاء",
    metaDescription:
      "كن شريكًا للمؤسسات والبعثات والتدريب وأعمال التواصل التي تُعِدّ القادة وتُحوّل المجتمع حول العالم.",
    eyebrow: "العطاء",
    title: "تبرّع من أجل تحوّل دائم.",
    subtitle:
      "كن شريكًا للمؤسسات والبعثات والتدريب وأعمال التواصل التي تُعِدّ القادة وتُحوّل المجتمع حول العالم.",
    trust: ["SSL آمن", "متوافق مع PCI", "وصول عالمي"],
    impact: [
      {
        title: "تدريب القادة",
        body: "إعداد الجيل القادم من مصلحي المجتمع عبر معاهد قيادة استراتيجية.",
      },
      {
        title: "دعم البعثات",
        body: "تيسير مشاريع التواصل العالمي والجهود الإنسانية في المناطق التي لم تُخدَم بعد.",
      },
      {
        title: "خدمة المجتمعات",
        body: "الاستثمار في مبادرات تحوّل المجتمع والبنية التحتية والرعاية الاجتماعية.",
      },
    ],
    partnershipTitle: "برامج الشراكة",
    partnershipSubtitle:
      "عمّق التزامك بالرؤية بالانضمام إلى إحدى دوائر الشراكة الأساسية لدينا.",
    cards: [
      {
        title: "شريك شهري",
        body: "الاستمرارية تُغذّي التحوّل. انضمّ إلى أساس عملنا بدعم شهري منتظم يُديم المشاريع طويلة الأمد.",
        link: "اعرف المزيد",
      },
      {
        title: "شريك البعثات",
        body: "موّل مباشرةً التواصل في المناطق النائية. شراكتك تضمن أن يبلغ نور التحوّل أقاصي الأرض.",
        link: "استكشف الأثر",
      },
      {
        title: "شريك المنح الدراسية",
        body: "أزِل العوائق أمام التميّز. وفّر الرسوم الدراسية والموارد للقادة الواعدين في برامج التدريب العالمية لدينا.",
        link: "قدّم منحة دراسية",
      },
    ],
    faqsTitle: "الأسئلة الشائعة حول العطاء",
    faqs: [
      {
        question: "كيف أحصل على الإيصالات؟",
        answer:
          "تُنشأ الإيصالات تلقائيًا وتُرسل إلى عنوان البريد الإلكتروني المقدَّم وقت تبرّعك. يمكنك أيضًا تسجيل الدخول إلى ملفك كمتبرّع لعرض سجلّك الكامل.",
      },
      {
        question: "كشوف سنوية لأغراض ضريبية؟",
        answer:
          "تُرسَل كشوف سنوية موحّدة عبر البريد الإلكتروني إلى جميع المتبرّعين في يناير من كل عام عن السنة الضريبية السابقة. يُرجى التأكد من بقاء بيانات الاتصال الخاصة بك محدّثة.",
      },
      {
        question: "إدارة العطاء المتكرر؟",
        answer:
          "يمكنك إيقاف تبرّعاتك المتكررة مؤقتًا أو تعديلها أو إلغاؤها في أي وقت عبر بوابة «رحلتي». ما عليك سوى النقر على أيقونة الحساب في شريط التنقل.",
      },
      {
        question: "هل يمكنني التبرّع دوليًا؟",
        answer:
          "نعم، يدعم نظام الدفع الآمن لدينا مجموعة واسعة من العملات العالمية وطرق الدفع المحلية بما في ذلك التحويلات المصرفية والمحافظ عبر الهاتف.",
      },
    ],
    selectFund: "اختر صندوقًا",
    funds: ["عام", "القلب الذهبي", "البعثات", "البناء", "منح GLF الدراسية"],
    oneTime: "مرة واحدة",
    monthly: "شهري",
    impactBadge: "أثر",
    selectAmount: "اختر المبلغ",
    otherAmount: "مبلغ آخر",
    receiptEmail: "البريد الإلكتروني للإيصال",
    continueSecurely: "المتابعة بأمان",
    termsPrefix: "بالمتابعة، فإنك توافق على ",
    termsLink: "الشروط",
    termsSuffix: " الخاصة بنا وتُقرّ بأن التبرّعات تُعالَج بأمان عبر بوابات دفع مُعتمدة.",
    toastChooseAmount: "يرجى اختيار مبلغ للتبرّع.",
    toastThankYou: "شكرًا — {amount} {frequency} إلى {fund}. جارٍ التحويل إلى الدفع الآمن…",
    toastFreqMonthly: "شهري",
    toastFreqOneTime: "لمرة واحدة",
  },
};
