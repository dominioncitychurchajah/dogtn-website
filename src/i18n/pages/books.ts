import type { Locale } from "@/i18n/config";

/**
 * Per-page translation module for the Books listing, book detail, and
 * homepage Books carousel. The BOOKS catalog data itself (titles,
 * descriptions, takeaways) stays in English — translating full per-title
 * marketing copy for 10+ books is a separate content project.
 */
export interface BooksCopy {
  heroTitle: string;
  heroSubtitle: string;
  startHereTitle: string;
  startHereSubtitle: string;
  featured: string;
  learnMore: string;
  amazon: string;
  allBooksHeading: string;
  categories: { all: string; leadership: string; prayer: string; relationships: string; politics: string };
  details: string;
  buy: string;
  noBooksFound: string;
  backToBooks: string;
  keyTakeaways: string;
  readerReviews: string;
  getOnAmazon: string;
  moreBooks: string;
  relatedTeachings: string;
  carouselEyebrow: string;
  carouselHeading: string;
  getTheBook: string;
  browseLibrary: string;
}

export const booksCopy: Record<Locale, BooksCopy> = {
  en: {
    heroTitle: "The Library of a Reformer",
    heroSubtitle: "Explore written works on kingdom governance, strategic intercession, and transformational leadership.",
    startHereTitle: "Start Here",
    startHereSubtitle: "Foundational reading for kingdom citizens.",
    featured: "Featured",
    learnMore: "Learn More",
    amazon: "Amazon →",
    allBooksHeading: "All Books",
    categories: { all: "All", leadership: "Leadership", prayer: "Prayer", relationships: "Relationships", politics: "Politics" },
    details: "Details",
    buy: "Buy →",
    noBooksFound: "No books found in this category.",
    backToBooks: "← Back to all books",
    keyTakeaways: "Key Takeaways",
    readerReviews: "Reader Reviews",
    getOnAmazon: "Get on Amazon",
    moreBooks: "More Books",
    relatedTeachings: "Related Teachings",
    carouselEyebrow: "The Teachings",
    carouselHeading: "Books That Redefine a Generation",
    getTheBook: "Get the Book",
    browseLibrary: "Browse the Complete Library →",
  },
  fr: {
    heroTitle: "La Bibliothèque d'un Réformateur",
    heroSubtitle: "Explorez des œuvres écrites sur la gouvernance du royaume, l'intercession stratégique et le leadership transformationnel.",
    startHereTitle: "Commencer ici",
    startHereSubtitle: "Lectures fondamentales pour les citoyens du royaume.",
    featured: "En vedette",
    learnMore: "En savoir plus",
    amazon: "Amazon →",
    allBooksHeading: "Tous les livres",
    categories: { all: "Tous", leadership: "Leadership", prayer: "Prière", relationships: "Relations", politics: "Politique" },
    details: "Détails",
    buy: "Acheter →",
    noBooksFound: "Aucun livre trouvé dans cette catégorie.",
    backToBooks: "← Retour à tous les livres",
    keyTakeaways: "Points clés à retenir",
    readerReviews: "Avis des lecteurs",
    getOnAmazon: "Obtenir sur Amazon",
    moreBooks: "Plus de livres",
    relatedTeachings: "Enseignements associés",
    carouselEyebrow: "Les Enseignements",
    carouselHeading: "Des livres qui redéfinissent une génération",
    getTheBook: "Obtenir le livre",
    browseLibrary: "Parcourir la bibliothèque complète →",
  },
  pt: {
    heroTitle: "A Biblioteca de um Reformador",
    heroSubtitle: "Explore obras escritas sobre governança do reino, intercessão estratégica e liderança transformadora.",
    startHereTitle: "Comece Aqui",
    startHereSubtitle: "Leitura fundamental para cidadãos do reino.",
    featured: "Destaque",
    learnMore: "Saiba Mais",
    amazon: "Amazon →",
    allBooksHeading: "Todos os Livros",
    categories: { all: "Todos", leadership: "Liderança", prayer: "Oração", relationships: "Relacionamentos", politics: "Política" },
    details: "Detalhes",
    buy: "Comprar →",
    noBooksFound: "Nenhum livro encontrado nesta categoria.",
    backToBooks: "← Voltar a todos os livros",
    keyTakeaways: "Principais Aprendizados",
    readerReviews: "Avaliações de Leitores",
    getOnAmazon: "Obter na Amazon",
    moreBooks: "Mais Livros",
    relatedTeachings: "Ensinamentos Relacionados",
    carouselEyebrow: "Os Ensinamentos",
    carouselHeading: "Livros Que Redefinem uma Geração",
    getTheBook: "Obter o Livro",
    browseLibrary: "Explorar a Biblioteca Completa →",
  },
  sw: {
    heroTitle: "Maktaba ya Mrekebishaji",
    heroSubtitle: "Gundua kazi zilizoandikwa kuhusu utawala wa ufalme, uombezi wa kimkakati, na uongozi wa kubadilisha.",
    startHereTitle: "Anza Hapa",
    startHereSubtitle: "Usomaji wa msingi kwa raia wa ufalme.",
    featured: "Yaliyoangaziwa",
    learnMore: "Jifunze Zaidi",
    amazon: "Amazon →",
    allBooksHeading: "Vitabu Vyote",
    categories: { all: "Vyote", leadership: "Uongozi", prayer: "Maombi", relationships: "Mahusiano", politics: "Siasa" },
    details: "Maelezo",
    buy: "Nunua →",
    noBooksFound: "Hakuna vitabu vilivyopatikana katika kategoria hii.",
    backToBooks: "← Rudi kwenye vitabu vyote",
    keyTakeaways: "Mafunzo Muhimu",
    readerReviews: "Maoni ya Wasomaji",
    getOnAmazon: "Pata kwenye Amazon",
    moreBooks: "Vitabu Zaidi",
    relatedTeachings: "Mafundisho Yanayohusiana",
    carouselEyebrow: "Mafundisho",
    carouselHeading: "Vitabu Vinavyofafanua Upya Kizazi",
    getTheBook: "Pata Kitabu",
    browseLibrary: "Vinjari Maktaba Kamili →",
  },
  ar: {
    heroTitle: "مكتبة مُصلح",
    heroSubtitle: "استكشف أعمالًا مكتوبة عن حوكمة الملكوت، والشفاعة الاستراتيجية، والقيادة التحويلية.",
    startHereTitle: "ابدأ هنا",
    startHereSubtitle: "قراءات أساسية لمواطني الملكوت.",
    featured: "مميز",
    learnMore: "اعرف المزيد",
    amazon: "أمازون ←",
    allBooksHeading: "جميع الكتب",
    categories: { all: "الكل", leadership: "القيادة", prayer: "الصلاة", relationships: "العلاقات", politics: "السياسة" },
    details: "التفاصيل",
    buy: "اشترِ ←",
    noBooksFound: "لم يتم العثور على كتب في هذه الفئة.",
    backToBooks: "→ العودة إلى جميع الكتب",
    keyTakeaways: "أهم الأفكار",
    readerReviews: "آراء القراء",
    getOnAmazon: "احصل عليه من أمازون",
    moreBooks: "المزيد من الكتب",
    relatedTeachings: "تعاليم ذات صلة",
    carouselEyebrow: "التعاليم",
    carouselHeading: "كتب تُعيد تعريف جيل",
    getTheBook: "احصل على الكتاب",
    browseLibrary: "تصفّح المكتبة الكاملة ←",
  },
};
