"use client";

import * as React from "react";
import { Message, Routing } from "../types";
import { GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL, USE_GROQ } from "../lib/constants";
import { DECISION_TREE } from "../lib/intents";
import { useDecisionTree } from "./useDecisionTree";
import { trackEvent } from "@/lib/analytics";

const THINKING_MIN_MS = 2600; // Minimum thinking time in ms

export function useAIChat(locale: string) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [messageCount, setMessageCount] = React.useState(0);
  const [userName, setUserName] = React.useState("there");
  
  // Thinking indicator state
  const [isThinking, setIsThinking] = React.useState(false);
  const [thinkingSteps, setThinkingSteps] = React.useState<string[]>([]);
  
  const { route: decisionTreeRoute } = useDecisionTree();
  const chatHistoryRef = React.useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  // Personalization
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name") || window.localStorage.getItem("ogbueli_user_name");
      if (name) {
        setUserName(name);
        window.localStorage.setItem("ogbueli_user_name", name);
      }
    }
  }, []);

  const callGroqAI = async (userMessage: string, preDetectedIntent: string | null): Promise<{ response: string; routing: Routing; confidence?: number }> => {
    const systemPrompt = `You are Debbie, a warm, wise, and spiritually grounded AI assistant for the David Ogbueli Global Transformation Network (OGBUELI). Your role is to help users find their path, connect with resources, and take their next step in purpose, faith, leadership, or community.

CLASSIFY the user's intent into ONE of these 12 categories:
1. discover-purpose - finding calling, purpose, gifts, destiny
2. deepen-faith - spiritual growth, prayer, Bible study, Kingdom teaching
3. build-leadership - leadership training, governance, stewardship
4. scale-ministry - growing church/ministry, missions, pastoral training
5. transform-society - marketplace transformation, cultural influence, nation-building
6. find-mentor - mentorship, discipleship, personal guidance
7. join-community - connecting with groups, fellowship
8. take-assessment - unsure where to start, wants evaluation
9. explore-teachings - sermons, courses, educational content
10. give-donate - financial partnership, giving, support
11. events - conferences, summits, gatherings
12. contact-support - needs human help

RESPOND with a JSON object:
{
  "intent": "category-name",
  "confidence": 0.0-1.0,
  "response": "Warm, encouraging response (max 2 sentences). Be personal and faith-aligned. Use 'I' not 'we'.",
  "routing": {
    "title": "Resource name",
    "description": "One-line description",
    "url": "/en/...",
    "cta": "Primary button text",
    "secondaryCta": "Secondary button text"
  }
}

Rules: Be warm, not verbose (under 60 words). If unclear, ask ONE clarifying question. Never give generic answers. Always route to a specific page.`;

    const recentHistory = chatHistoryRef.current.slice(-4).map((msg) => ({
      role: msg.role === "assistant" ? "assistant" as const : "user" as const,
      content: msg.content,
    }));

    const messagesPayload = [
      { role: "system", content: systemPrompt },
      ...recentHistory,
      { role: "user", content: userMessage },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: messagesPayload,
          temperature: 0.3,
          max_tokens: 400,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Groq HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const contentStr = data.choices?.[0]?.message?.content;
      if (!contentStr) throw new Error("Empty response from Groq");

      let content;
      try {
        content = JSON.parse(contentStr);
      } catch (e) {
        const jsonMatch = contentStr.match(/```json\s*([\s\S]*?)```/) || contentStr.match(/{[\s\S]*}/);
        if (jsonMatch) {
          content = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } else {
          throw new Error("Could not parse JSON response");
        }
      }

      // Validate and merge with decision tree to resolve localized links or fallbacks
      const treeIntent = DECISION_TREE.intents[content.intent] || DECISION_TREE.default;
      const rawUrl = content.routing?.url || treeIntent.url;
      // Prepend locale prefix if not present
      const formattedUrl = rawUrl.startsWith("/") ? `/${locale}${rawUrl}` : rawUrl;

      return {
        response: content.response || treeIntent.response,
        confidence: content.confidence,
        routing: {
          title: content.routing?.title || treeIntent.title,
          description: content.routing?.description || treeIntent.description,
          url: formattedUrl,
          cta: content.routing?.cta || treeIntent.cta,
          secondaryCta: content.routing?.secondaryCta || treeIntent.secondaryCta,
        },
      };
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  const sendMessage = async (text: string, preDetectedIntent: string | null = null) => {
    if (isProcessing) return;
    setIsProcessing(true);
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    // Add user message
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    chatHistoryRef.current.push({ role: "user", content: text });

    // Start thinking animation with enforced minimum time
    const thinkingStart = Date.now();
    setIsThinking(true);
    setThinkingSteps(["Understanding your intent..."]);

    const step1Timer = setTimeout(() => {
      setThinkingSteps((prev) => [...prev, "Identifying the best path..."]);
    }, 800);

    const step2Timer = setTimeout(() => {
      setThinkingSteps((prev) => [...prev, "Preparing your next step..."]);
    }, 1800);

    try {
      let result: { response: string; routing: Routing; confidence?: number };

      if (USE_GROQ && GROQ_API_KEY && GROQ_API_KEY.length > 20) {
        try {
          result = await callGroqAI(text, preDetectedIntent);
        } catch (groqErr) {
          console.warn("Groq failed, falling back to decision tree:", groqErr);
          const fallback = decisionTreeRoute(text, preDetectedIntent, newCount);
          const rawUrl = fallback.routing.url;
          const formattedUrl = rawUrl.startsWith("/") ? `/${locale}${rawUrl}` : rawUrl;
          result = {
            response: "I'm having trouble connecting right now, but let me help based on what I know. " + fallback.response,
            routing: { ...fallback.routing, url: formattedUrl },
          };
        }
      } else {
        const fallback = decisionTreeRoute(text, preDetectedIntent, newCount);
        const rawUrl = fallback.routing.url;
        const formattedUrl = rawUrl.startsWith("/") ? `/${locale}${rawUrl}` : rawUrl;
        result = {
          response: fallback.response,
          routing: { ...fallback.routing, url: formattedUrl },
        };
      }

      // Enforce minimum thinking time (2.6s)
      const elapsed = Date.now() - thinkingStart;
      const remaining = Math.max(0, THINKING_MIN_MS - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remaining));

      // Stop thinking
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      setIsThinking(false);
      setThinkingSteps([]);

      // Add AI response
      const aiMsg: Message = {
        role: "assistant",
        content: result.response,
        routing: result.routing,
        confidence: result.confidence,
      };
      setMessages((prev) => [...prev, aiMsg]);
      chatHistoryRef.current.push({ role: "assistant", content: result.response });

      trackEvent("start_here_message_processed", {
        intent: preDetectedIntent || "unknown",
        success: true,
      });
    } catch (error) {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      setIsThinking(false);
      setThinkingSteps([]);

      console.error("AI handler error:", error);
      const fallback = decisionTreeRoute(text, preDetectedIntent, newCount);
      const rawUrl = fallback.routing.url;
      const formattedUrl = rawUrl.startsWith("/") ? `/${locale}${rawUrl}` : rawUrl;

      const aiMsg: Message = {
        role: "assistant",
        content: "I'm having trouble connecting right now, but let me help based on what I know. " + fallback.response,
        routing: { ...fallback.routing, url: formattedUrl },
      };
      setMessages((prev) => [...prev, aiMsg]);
      chatHistoryRef.current.push({ role: "assistant", content: aiMsg.content });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    isProcessing,
    messageCount,
    userName,
    isThinking,
    thinkingSteps,
    sendMessage,
  };
}
