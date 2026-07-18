"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import { useAIChat } from "../hooks/useAIChat";
import { HeroChat } from "./HeroChat";

interface StartHereAIProps {
  locale: Locale;
}

/**
 * Client-side orchestrator that wires the AI chat hook to
 * the inline conversation hero. No side panels, no floating
 * buttons — Debbie lives directly on the page.
 */
export function StartHereAI({ locale }: StartHereAIProps) {
  const {
    messages,
    isProcessing,
    userName,
    isThinking,
    thinkingSteps,
    sendMessage,
  } = useAIChat(locale);

  return (
    <HeroChat
      userName={userName}
      locale={locale}
      messages={messages}
      isProcessing={isProcessing}
      isThinking={isThinking}
      thinkingSteps={thinkingSteps}
      onSendMessage={sendMessage}
    />
  );
}
