"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export type ChatInputHandle = {
  typeText: (text: string) => void;
  clear: () => void;
  getText: () => string;
};

interface ChatInputProps {
  onSend: (text: string) => void;
  isProcessing: boolean;
  onTypingComplete?: () => void;
}

export const ChatInput = React.forwardRef<ChatInputHandle, ChatInputProps>(
  function ChatInput({ onSend, isProcessing, onTypingComplete }, ref) {
    const [inputValue, setInputValue] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const [shaking, setShaking] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const typingRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useImperativeHandle(ref, () => ({
      typeText(text: string) {
        setIsTyping(true);
        setInputValue("");
        let i = 0;
        const type = () => {
          if (i < text.length) {
            setInputValue(text.slice(0, i + 1));
            i++;
            typingRef.current = setTimeout(type, 30);
          } else {
            setIsTyping(false);
            onTypingComplete?.();
          }
        };
        type();
      },
      clear() {
        setInputValue("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      },
      getText() {
        return inputValue;
      },
    }));

    // Clean up typing on unmount
    React.useEffect(() => {
      return () => {
        if (typingRef.current) clearTimeout(typingRef.current);
      };
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isTyping) return; // Don't allow manual input during typewriter
      setInputValue(e.target.value);
      const ta = textareaRef.current;
      if (ta) {
        ta.style.height = "auto";
        ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
      }
    };

    const handleSend = () => {
      const text = inputValue.trim();
      if (!text) {
        setShaking(true);
        setTimeout(() => setShaking(false), 300);
        return;
      }
      if (isProcessing) return;
      onSend(text);
      setInputValue("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div
        className={`bg-white/5 backdrop-blur-md rounded-[16px] border border-white/10 p-4 transition-all duration-300 relative ${
          isTyping ? "shadow-[0_0_20px_rgba(201,168,76,0.3)]" : ""
        } focus-within:border-[rgba(201,168,76,0.5)] focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.2),0_0_20px_rgba(201,168,76,0.1)] ${
          shaking ? "animate-[inputShake_300ms_ease-in-out]" : ""
        }`}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes inputShake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
        `}} />
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask Debbie anything about your journey..."
          rows={2}
          disabled={isProcessing || isTyping}
          className="w-full min-h-[56px] max-h-[120px] border-0 bg-transparent text-paper-0 placeholder:text-white/40 outline-none resize-none text-body-m leading-relaxed disabled:opacity-70"
        />
        <div className="flex justify-end mt-1">
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isProcessing || isTyping}
            className="w-10 h-10 rounded-full bg-gold-600 hover:bg-gold-hover disabled:opacity-40 transition-all flex items-center justify-center text-ink-900 shadow-elev-1 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            aria-label="Send message to Debbie"
          >
            <ArrowUp className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    );
  }
);
