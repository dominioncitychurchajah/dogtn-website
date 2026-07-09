import type { Book } from "@/data/types";

export const books: Book[] = [
  {
    slug: "pillars-of-king-solomons-wisdom-and-wealth",
    title: "Pillars of King Solomon's Wisdom & Wealth",
    subtitle: "The Ancient Principles Behind Enduring Prosperity",
    author: "Dr. David Ogbueli",
    cover: "/images/books/pillars-of-solomon.png",
    category: "Wisdom & Wealth",
    formats: ["ebook", "paperback", "audiobook"],
    price: { amount: 12000, currency: "NGN" },
    synopsis:
      "Solomon became the wealthiest man of his age not by accident but by principle. This book unpacks the timeless pillars of wisdom that produced his wealth — and shows how any leader can build a life of lasting prosperity on the same foundation.",
    sample:
      "Wealth without wisdom is a burden waiting to happen. Before Solomon ever counted his gold, he had already secured the one thing that made all the rest possible...",
    relatedTeachings: ["solomons-secret-of-wisdom", "the-jewish-mindset-of-increase"],
    featured: true,
  },
  {
    slug: "the-jewish-secrets-of-wealth-creation",
    title: "The Jewish Secrets of Wealth Creation",
    subtitle: "Covenant Principles for Generational Increase",
    author: "Dr. David Ogbueli",
    cover: "/images/books/jewish-secrets.png",
    category: "Wisdom & Wealth",
    formats: ["ebook", "paperback"],
    price: { amount: 10000, currency: "NGN" },
    synopsis:
      "Why have a people so few in number produced so much of the world's wealth and innovation? This book reveals the covenant mindset, disciplines, and family principles behind generational increase — and how to apply them.",
    sample:
      "Increase is not luck; it is a mindset passed from generation to generation. The secret was never hidden — it was simply practised...",
    relatedTeachings: ["the-jewish-mindset-of-increase", "kingdom-principles-in-business"],
    featured: true,
  },
  {
    slug: "the-laws-of-proper-speech",
    title: "The Laws of Proper Speech — The Power of Words",
    subtitle: "How Disciplined Language Builds a Leader's Future",
    author: "Dr. David Ogbueli",
    cover: "/images/books/laws-of-proper-speech.png",
    category: "Communication",
    formats: ["ebook", "paperback", "audiobook"],
    price: { amount: 9000, currency: "NGN" },
    synopsis:
      "Words frame worlds. In this book, Dr. Ogbueli lays out the five laws of proper speech and shows how the disciplined use of language shapes relationships, reputation, and destiny.",
    sample:
      "You will never rise above the quality of your words. The tongue is the steering wheel of a life — small, but it sets the direction...",
    relatedTeachings: ["the-power-of-words", "the-tongue-and-your-testimony"],
    featured: true,
  },
  {
    slug: "the-leaders-foundation",
    title: "The Leader's Foundation",
    subtitle: "Character Before Crowns",
    author: "Dr. David Ogbueli",
    cover: "/images/books/pillars-of-solomon.png",
    category: "Leadership",
    formats: ["ebook", "paperback"],
    price: { amount: 8500, currency: "NGN" },
    synopsis:
      "Promotion without formation is a trap. This foundational leadership book examines why God builds the vessel before the assignment, and how to develop the character that sustains influence.",
    sample:
      "Everyone wants the crown; few will submit to the making. Yet the foundation you refuse to lay today becomes the ceiling you cannot break tomorrow...",
    relatedTeachings: ["character-before-crowns", "raising-leaders-who-last"],
  },
  {
    slug: "the-discipline-of-vision",
    title: "The Discipline of Vision",
    subtitle: "Seeing and Building a Preferred Future",
    author: "Dr. David Ogbueli",
    cover: "/images/books/jewish-secrets.png",
    category: "Leadership",
    formats: ["ebook"],
    price: { amount: 7500, currency: "NGN" },
    synopsis:
      "Vision is not a feeling; it is a discipline. This book teaches leaders how to see the preferred future clearly and govern their days toward it with consistency and courage.",
    sample:
      "The future belongs to those who can see it before it arrives — and who are willing to work backwards from it every single day...",
    relatedTeachings: ["the-discipline-of-vision", "the-throne-of-your-life"],
  },
  {
    slug: "living-from-rest",
    title: "Living From Rest",
    subtitle: "Labouring From Grace, Not Fear",
    author: "Dr. David Ogbueli",
    cover: "/images/books/laws-of-proper-speech.png",
    category: "Spiritual Growth",
    formats: ["ebook", "audiobook"],
    price: { amount: 7000, currency: "NGN" },
    synopsis:
      "Striving exhausts; rest sustains. A gentle, practical guide to labouring from a place of finished grace rather than fearful performance, so leaders can endure for the long haul.",
    sample:
      "You were never meant to carry what only grace can hold. Rest is not the reward for the work — it is the soil the work grows from...",
    relatedTeachings: ["living-from-rest", "the-interior-life-of-a-leader"],
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export default books;
