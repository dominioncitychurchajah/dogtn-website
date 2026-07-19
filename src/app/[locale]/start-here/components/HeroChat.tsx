"use client";

import * as React from "react";
import Image from "next/image";
import { ChatInput, ChatInputHandle } from "./ChatInput";
import { QuickPills } from "./QuickPills";
import { ChatMessage } from "./ChatMessage";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { QuickJumpCards } from "./QuickJumpCards";
import { Message } from "../types";

interface HeroChatProps {
  userName: string;
  locale: string;
  messages: Message[];
  isProcessing: boolean;
  isThinking: boolean;
  thinkingSteps: string[];
  onSendMessage: (text: string, intent: string | null) => void;
}

export function HeroChat({
  userName,
  locale,
  messages,
  isProcessing,
  isThinking,
  thinkingSteps,
  onSendMessage,
}: HeroChatProps) {
  const chatInputRef = React.useRef<ChatInputHandle>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const threadRef = React.useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  // Auto-scroll to newest message
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, thinkingSteps]);

  // Track whether user has started a conversation
  React.useEffect(() => {
    if (messages.length > 0) setHasInteracted(true);
  }, [messages.length]);

  const handlePillClick = (question: string, intent: string) => {
    // Typewriter effect: inject text into input then auto-submit
    chatInputRef.current?.typeText(question);
    // onTypingComplete will fire the actual send — see below
    pillIntentRef.current = intent;
    pillQuestionRef.current = question;
  };

  const pillIntentRef = React.useRef<string | null>(null);
  const pillQuestionRef = React.useRef<string | null>(null);

  const handleTypingComplete = () => {
    // After typewriter finishes, wait 600ms then auto-submit
    setTimeout(() => {
      const intent = pillIntentRef.current;
      const question = pillQuestionRef.current;
      pillIntentRef.current = null;
      pillQuestionRef.current = null;
      if (question) {
        chatInputRef.current?.clear();
        onSendMessage(question, intent);
      }
    }, 600);
  };

  const handleInputSend = (text: string) => {
    onSendMessage(text, null);
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col bg-ink-900 text-paper-0 ambient-gradient">
      {/* Background image */}
      <Image
        src="/images/pastor/ecosystem-side-profile.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-ink-900/80 to-ink-900" aria-hidden />

      {/* Content — centered, contained column. No competing side columns. */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-[900px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
        {/* Greeting */}
        <div className="text-center mb-8">
          <h1 className="font-display text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-[1.2] text-paper-0">
            Hi, <span className="text-gold-400">{userName}</span>!{" "}
            <span className="block sm:inline">Where do you want to get started?</span>
          </h1>
        </div>

        {/* Search input */}
        <ChatInput
          ref={chatInputRef}
          onSend={handleInputSend}
          isProcessing={isProcessing}
          onTypingComplete={handleTypingComplete}
        />

        {/* Quick pills — hide once conversation starts */}
        {!hasInteracted && (
          <QuickPills
            onPillClick={handlePillClick}
            disabled={isProcessing}
          />
        )}

        {/* Quick-jump cards — fade out once the chat starts */}
        <div
          className={`transition-all duration-300 ease-out ${
            hasInteracted ? "pointer-events-none max-h-0 opacity-0 -translate-y-2" : "mt-8 max-h-[400px] opacity-100 translate-y-0"
          }`}
          aria-hidden={hasInteracted}
        >
          <QuickJumpCards locale={locale} />
        </div>

        {/* Conversation thread */}
        {hasInteracted && (
          <div
            ref={threadRef}
            className="mt-6 flex-1 max-h-[60vh] overflow-y-auto flex flex-col gap-4 pr-1 scrollbar-thin"
            role="log"
            aria-live="polite"
            aria-label="Conversation with Debbie"
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .scrollbar-thin::-webkit-scrollbar { width: 4px; }
              .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
              .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
              .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
            `}} />

            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}

            {isThinking && <ThinkingIndicator steps={thinkingSteps} />}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Show pills again below conversation for follow-up */}
        {hasInteracted && !isProcessing && !isThinking && messages.length > 0 && (
          <QuickPills
            onPillClick={handlePillClick}
            disabled={isProcessing}
          />
        )}
      </div>
    </section>
  );
}
