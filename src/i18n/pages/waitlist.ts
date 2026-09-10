import type { Locale } from "@/i18n/config";

/**
 * Waitlist copy. Translations were produced alongside the English and should
 * be read by a native speaker before launch, particularly sw and ar.
 */
export interface WaitlistCopy {
  eyebrow: string;
  title: string;
  body: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  currentRole: string;
  currentRoleOptional: string;
  track: string;
  trackNoPreference: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorBody: string;
  privacy: string;
  speakToSomeone: string;
}

export const waitlistCopy: Record<Locale, WaitlistCopy> = {
  en: {
    eyebrow: "Mentorship",
    title: "Join the mentorship waitlist",
    body: "Mentorship with Dr. David Ogbueli runs in a dedicated app across three leadership tracks. Join the waitlist and we will send your invitation the moment it opens.",
    fullName: "Full name",
    email: "Email",
    phone: "Phone (WhatsApp if possible)",
    country: "Country",
    currentRole: "What do you do right now?",
    currentRoleOptional: "optional",
    track: "Which track interests you?",
    trackNoPreference: "Not sure yet",
    submit: "Join the waitlist",
    submitting: "Joining…",
    successTitle: "You are on the list",
    successBody: "Check your inbox for confirmation. We will send your invitation as soon as the app opens.",
    errorBody: "We could not add you just now. Please try again, or call us.",
    privacy: "We use your details only to invite you to the mentorship app.",
    speakToSomeone: "Speak with someone",
  },
  fr: {
    eyebrow: "Mentorat",
    title: "Rejoignez la liste d'attente du mentorat",
    body: "Le mentorat avec le Dr David Ogbueli se déroule dans une application dédiée, selon trois parcours de leadership. Inscrivez-vous et nous vous enverrons votre invitation dès l'ouverture.",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Téléphone (WhatsApp si possible)",
    country: "Pays",
    currentRole: "Que faites-vous actuellement ?",
    currentRoleOptional: "facultatif",
    track: "Quel parcours vous intéresse ?",
    trackNoPreference: "Je ne sais pas encore",
    submit: "Rejoindre la liste d'attente",
    submitting: "Inscription…",
    successTitle: "Vous êtes inscrit",
    successBody: "Consultez votre boîte de réception pour la confirmation. Nous vous enverrons votre invitation dès l'ouverture de l'application.",
    errorBody: "Nous n'avons pas pu vous inscrire. Veuillez réessayer ou nous appeler.",
    privacy: "Vos informations servent uniquement à vous inviter à l'application de mentorat.",
    speakToSomeone: "Parler à quelqu'un",
  },
  pt: {
    eyebrow: "Mentoria",
    title: "Entre na lista de espera da mentoria",
    body: "A mentoria com o Dr. David Ogbueli decorre numa aplicação dedicada, em três percursos de liderança. Entre na lista e enviaremos o seu convite assim que abrir.",
    fullName: "Nome completo",
    email: "E-mail",
    phone: "Telefone (WhatsApp, se possível)",
    country: "País",
    currentRole: "O que faz atualmente?",
    currentRoleOptional: "opcional",
    track: "Que percurso lhe interessa?",
    trackNoPreference: "Ainda não sei",
    submit: "Entrar na lista de espera",
    submitting: "A inscrever…",
    successTitle: "Está na lista",
    successBody: "Verifique a sua caixa de entrada para a confirmação. Enviaremos o seu convite assim que a aplicação abrir.",
    errorBody: "Não foi possível inscrevê-lo agora. Tente novamente ou ligue-nos.",
    privacy: "Usamos os seus dados apenas para o convidar para a aplicação de mentoria.",
    speakToSomeone: "Falar com alguém",
  },
  sw: {
    eyebrow: "Ushauri",
    title: "Jiunge na orodha ya kusubiri ya ushauri",
    body: "Ushauri na Dkt. David Ogbueli hufanyika katika programu maalum yenye njia tatu za uongozi. Jiunge na orodha nasi tutakutumia mwaliko mara tu itakapofunguliwa.",
    fullName: "Jina kamili",
    email: "Barua pepe",
    phone: "Simu (WhatsApp ikiwezekana)",
    country: "Nchi",
    currentRole: "Unafanya nini kwa sasa?",
    currentRoleOptional: "si lazima",
    track: "Ni njia gani inakuvutia?",
    trackNoPreference: "Sijui bado",
    submit: "Jiunge na orodha",
    submitting: "Inajiunga…",
    successTitle: "Uko kwenye orodha",
    successBody: "Angalia barua pepe yako kwa uthibitisho. Tutakutumia mwaliko mara tu programu itakapofunguliwa.",
    errorBody: "Hatukuweza kukuandikisha sasa. Tafadhali jaribu tena, au tupigie simu.",
    privacy: "Tunatumia taarifa zako kukualika kwenye programu ya ushauri pekee.",
    speakToSomeone: "Zungumza na mtu",
  },
  ar: {
    eyebrow: "الإرشاد",
    title: "انضم إلى قائمة انتظار الإرشاد",
    body: "يجري الإرشاد مع د. ديفيد أوغبويلي عبر تطبيق مخصّص يضم ثلاثة مسارات للقيادة. انضم إلى القائمة وسنرسل دعوتك فور فتحه.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف (واتساب إن أمكن)",
    country: "الدولة",
    currentRole: "ما الذي تعمله حاليًا؟",
    currentRoleOptional: "اختياري",
    track: "أي مسار يهمّك؟",
    trackNoPreference: "لست متأكدًا بعد",
    submit: "انضم إلى القائمة",
    submitting: "جارٍ الانضمام…",
    successTitle: "أنت على القائمة",
    successBody: "تحقّق من بريدك للتأكيد. سنرسل دعوتك فور فتح التطبيق.",
    errorBody: "تعذّر تسجيلك الآن. يرجى المحاولة مرة أخرى أو الاتصال بنا.",
    privacy: "نستخدم بياناتك فقط لدعوتك إلى تطبيق الإرشاد.",
    speakToSomeone: "تحدّث مع أحدنا",
  },
};
