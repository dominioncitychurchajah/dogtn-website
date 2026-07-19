import { IntentData } from "../types";

export const DECISION_TREE: {
  intents: Record<string, IntentData>;
  default: Omit<IntentData, "keywords">;
} = {
  intents: {
    "discover-purpose": {
      keywords: ["purpose", "calling", "why am i here", "destiny", "gift", "talent", "passion", "blueprint", "gifted", "who am i", "what should i do", "direction", "meaning", "why"],
      title: "Discover Your Purpose",
      description: "A proven path to uncover your calling and divine purpose.",
      url: "/journeys/discover-purpose",
      cta: "Start Your Journey",
      secondaryCta: "Learn More",
      response: "I can see you are searching for something deeper. Your purpose is not a mystery to be solved, but a path to be walked. Let us help you uncover it."
    },
    "deepen-faith": {
      keywords: ["faith", "spiritual", "grow", "prayer", "bible", "kingdom", "god", "jesus", "worship", "devotion", "christian", "holy spirit", "disciple", "lord", "scripture", "study"],
      title: "Deepen Your Faith",
      description: "Strengthen your spiritual foundation through systematic Kingdom teaching.",
      url: "/journeys/grow-spiritually",
      cta: "Start Your Journey",
      secondaryCta: "View Curriculum",
      response: "Growing in faith is a journey, not a destination. We have structured teachings to help you build a solid spiritual foundation."
    },
    "build-leadership": {
      keywords: ["lead", "leader", "leadership", "govern", "governance", "influence", "steward", "stewardship", "team", "manage", "boss", "organization", "vision", "direction"],
      title: "Build Your Leadership",
      description: "Learn the principles of governance and how to shape the next generation.",
      url: "/journeys/become-a-leader",
      cta: "Start Your Journey",
      secondaryCta: "View Programs",
      response: "Leadership is influence. Whether you lead a team, a church, or a nation, we have the tools to help you grow."
    },
    "scale-ministry": {
      keywords: ["ministry", "church", "pastor", "preach", "mission", "missions", "global", "expand", "plant", "congregation", "flock", "revival", "souls"],
      title: "Scale Your Ministry",
      description: "Equip yourself to build and lead ministries with global impact.",
      url: "/journeys/build-a-ministry",
      cta: "Start Your Journey",
      secondaryCta: "Learn More",
      response: "The harvest is plentiful. Let us equip you with the systems and strategies to expand your reach for the Kingdom."
    },
    "transform-society": {
      keywords: ["nation", "society", "culture", "transform", "change", "reform", "politics", "business", "marketplace", "seven mountains", "nation builder", "government", "media", "arts", "education", "family"],
      title: "Transform Your Society",
      description: "Learn how to carry transformation into business, culture, and governance.",
      url: "/journeys/transform-society",
      cta: "Start Your Journey",
      secondaryCta: "Learn More",
      response: "You are called to be a change agent in your sphere. We will show you how to bring Kingdom principles into every mountain of influence."
    },
    "find-mentor": {
      keywords: ["mentor", "mentorship", "guide", "coach", "counsel", "advisor", "disciple", "discipleship", "accountability", "someone to help", "walk with me", "show me"],
      title: "Find a Mentor",
      description: "Connect with a mentor, gain accountability, and get clear direction.",
      url: "/mentorship",
      cta: "Get Matched",
      secondaryCta: "How It Works",
      response: "No one walks alone. A mentor can help you navigate your season with wisdom and clarity."
    },
    "join-community": {
      keywords: ["community", "group", "fellowship", "connect", "belong", "family", "people", "friends", "network", "meet people", "find people", "where are you", "location"],
      title: "Join a Community",
      description: "Find your tribe. Connect with like-minded believers in your region or online.",
      url: "/ministry",
      cta: "Find a Group",
      secondaryCta: "Explore Communities",
      response: "You were not meant to do life alone. There is a community waiting to welcome you."
    },
    "take-assessment": {
      keywords: ["assessment", "test", "quiz", "evaluate", "where do i start", "not sure", "confused", "help me decide", "diagnostic", "console", "lost", "unsure", "dont know", "do not know", "begin", "new", "first time"],
      title: "Leadership Assessment",
      description: "Take our seven-minute assessment to discover your current leadership level.",
      url: "/leadership/assessment",
      cta: "Take Assessment",
      secondaryCta: "Learn More",
      response: "Not sure where to start? That is perfectly fine. Our assessment will help you discover your current level and point you to the right path."
    },
    "explore-teachings": {
      keywords: ["teaching", "sermon", "message", "video", "audio", "podcast", "learn", "study", "course", "training", "watch", "listen", "read", "content", "resource"],
      title: "Explore Teachings",
      description: "Access world-class Kingdom teachings from Dr. David Ogbueli and guest faculty.",
      url: "/media",
      cta: "Browse Teachings",
      secondaryCta: "Latest Sermons",
      response: "Knowledge is the foundation of transformation. Dive into our library of teachings covering purpose, faith, leadership, and more."
    },
    "give-donate": {
      keywords: ["give", "donate", "offering", "tithe", "support", "sow", "seed", "partner", "financial", "money", "contribute", "help fund", "support the work"],
      title: "Partner With Us",
      description: "Your giving helps us raise leaders who transform nations.",
      url: "/partnership",
      cta: "Give Now",
      secondaryCta: "Partnership Options",
      response: "Thank you for your heart to give. Every seed sown helps us reach more lives and build more leaders."
    },
    "events": {
      keywords: ["event", "conference", "summit", "retreat", "meeting", "gathering", "calendar", "when", "where", "attend", "visit", "coming up", "next", "schedule"],
      title: "Upcoming Events",
      description: "Join us for conferences, summits, and gatherings around the world.",
      url: "https://dcglobal-gules.vercel.app/en/events",
      cta: "View Events",
      secondaryCta: "Subscribe",
      response: "We would love to see you at one of our gatherings. Check out what is coming up near you."
    },
    "contact-support": {
      keywords: ["contact", "help", "support", "question", "issue", "problem", "talk to someone", "human", "call", "email", "reach out", "speak to", "assistance"],
      title: "Contact Support",
      description: "Our team is here to help you find your way.",
      url: "mailto:support@davidogbueli.org",
      cta: "Get Help",
      secondaryCta: "FAQs",
      response: "We are here for you. Reach out and a member of our team will get back to you promptly."
    }
  },
  default: {
    title: "Let Us Find Your Path Together",
    description: "I want to make sure I point you in the right direction. Could you tell me a bit more about what you are looking for?",
    url: "/start-here",
    cta: "Browse All Paths",
    secondaryCta: "Take Assessment",
    response: "I want to understand you better. Are you looking to grow spiritually, develop as a leader, find community, or discover your purpose?"
  }
};
