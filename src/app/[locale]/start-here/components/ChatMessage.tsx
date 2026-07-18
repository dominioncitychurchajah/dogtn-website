"use client";

import * as React from "react";
import { Message } from "../types";
import { RoutingCard } from "./RoutingCard";
import { DebbieFace } from "@/components/chat/DebbieFace";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 animate-[messageAppear_400ms_cubic-bezier(0.16,1,0.3,1)_both] ${
        isUser ? "flex-row-reverse" : "justify-start"
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes messageAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gold-400 border border-white/5">
          <DebbieFace state="idle" className="w-5 h-5" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[85%] px-5 py-4 rounded-[12px] text-body-m leading-relaxed shadow-[0_2px_8px_rgba(0,0,0,0.2)] ${
          isUser
            ? "bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] text-paper-0 rounded-br-[4px] self-end"
            : "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-paper-0 rounded-bl-[4px]"
        }`}
      >
        <span className="whitespace-pre-line">{message.content}</span>
        
        {!isUser && message.routing && (
          <RoutingCard routing={message.routing} />
        )}
      </div>
    </div>
  );
}
