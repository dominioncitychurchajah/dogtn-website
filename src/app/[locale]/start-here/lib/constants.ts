export const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL = "llama-3.3-70b-versatile";
export const USE_GROQ = true; // Set to false to force decision tree only
