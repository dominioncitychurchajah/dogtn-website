export interface Routing {
  title: string;
  description: string;
  url: string;
  cta: string;
  secondaryCta?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  routing?: Routing;
  confidence?: number;
}

export interface IntentData {
  keywords: string[];
  title: string;
  description: string;
  url: string;
  cta: string;
  secondaryCta?: string;
  response: string;
}
