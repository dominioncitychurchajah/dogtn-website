"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter, usePathname } from "next/navigation";
import { X, Mail, Send } from "lucide-react";
import { useChatStore } from "@/lib/chat-store";
import { useAudioPlayer } from "@/lib/audio-store";
import { useDebbieProactiveTriggers } from "@/lib/use-debbie-proactive";
import { DebbieFace, type DebbieFaceState } from "@/components/chat/DebbieFace";
import { DebbieLanding } from "@/components/chat/DebbieLanding";
import { TEAM_EMAIL } from "@/data/debbie-flows";
import type { DebbieChip } from "@/data/debbie-flows";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function ChatWidget({ locale }: { locale: Locale }) {
  const router = useRouter();
  const { track } = useAudioPlayer();
  const {
    isOpen,
    messages,
    isTyping,
    currentChips,
    hasProactiveMessage,
    toggle,
    close,
    selectChip,
    sendFreeText,
  } = useChatStore();
  const hasTrack = Boolean(track);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [draft, setDraft] = React.useState("");
  const [faceState, setFaceState] = React.useState<DebbieFaceState>("idle");

  const pathname = usePathname();
  const isStartHere = pathname === `/${locale}/start-here` || pathname === `/${locale}/start-here/`;

  useDebbieProactiveTriggers(locale);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  React.useEffect(() => {
    if (isTyping) {
      setFaceState("thinking");
      return;
    }
    setFaceState("active");
    const t = setTimeout(() => setFaceState("idle"), 900);
    return () => clearTimeout(t);
  }, [isTyping, messages.length]);

  if (isStartHere) return null;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || isTyping) return;
    sendFreeText(draft);
    setDraft("");
  }

  function handleChip(chip: DebbieChip) {
    const { navigate } = selectChip(chip);
    if (!navigate) return;
    setTimeout(() => {
      if (navigate.external) {
        window.open(navigate.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(`/${locale}${navigate.href}`);
      }
      close();
    }, 1300);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={hasProactiveMessage ? "Debbie has a message for you" : isOpen ? "Close chat" : "Ask Debbie"}
        aria-expanded={isOpen}
        className={cn(
          "fixed right-4 z-[90] flex h-[60px] items-center justify-center gap-2 rounded-full bg-ink-900 text-gold-400 shadow-elev-3 transition-transform hover:scale-105 active:scale-95 md:right-6",
          isOpen ? "w-[60px]" : "w-[60px] md:w-auto md:px-5",
          hasTrack ? "bottom-24" : "bottom-6",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center">
              <DebbieFace state="idle" className="h-8 w-8" />
              <span
                role="status"
                aria-live="polite"
                className={cn(
                  "absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-ink-900",
                  hasProactiveMessage ? "bg-flame-600 debbie-bell-bounce" : "bg-gold-600 pulse-live",
                )}
              >
                {hasProactiveMessage && <span className="sr-only">New message from Debbie</span>}
              </span>
            </span>
            <span className="hidden text-body-s font-semibold md:inline">Ask Debbie</span>
          </>
        )}
      </button>

      <Dialog.Root open={isOpen} onOpenChange={(v) => (v ? toggle() : close())}>
        <Dialog.Portal>
          <Dialog.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            className={cn(
              "fixed z-[95] flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 shadow-elev-4 focus:outline-none",
              "right-4 w-[380px] max-w-[calc(100vw-2rem)] md:right-6",
              hasTrack ? "bottom-24" : "bottom-6",
              "h-[min(600px,70dvh)]",
              "max-md:inset-x-0 max-md:bottom-0 max-md:right-0 max-md:h-[85dvh] max-md:w-full max-md:max-w-full max-md:rounded-b-none",
            )}
          >
            <div className="flex items-center gap-3 border-b border-ink-100 bg-paper-50 px-4 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 text-gold-400">
                <DebbieFace state={faceState} animated={false} className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <Dialog.Title className="text-body-s font-semibold text-ink-900">Debbie</Dialog.Title>
                <Dialog.Description className="text-caption text-ink-500">
                  Guiding your next step
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label="Close chat"
                className="rounded-full p-1.5 text-ink-500 hover:bg-paper-0 hover:text-ink-900"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex-1 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 ? (
                <DebbieLanding onSelect={handleChip} />
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn("flex", m.sender === "user" ? "justify-end" : "justify-start")}
                    >
                      <p
                        className={cn(
                          "max-w-[85%] rounded-[var(--radius-l)] px-4 py-2.5 text-body-s",
                          m.sender === "user"
                            ? "bg-ink-900 text-paper-0"
                            : "border border-ink-100 bg-paper-50 text-ink-900",
                        )}
                      >
                        {m.text}
                      </p>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <span className="flex items-center gap-1 rounded-[var(--radius-l)] border border-ink-100 bg-paper-50 px-4 py-3">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300 [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300 [animation-delay:300ms]" />
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-ink-100 bg-paper-0 px-4 py-3">
              {messages.length > 0 && currentChips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentChips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleChip(chip)}
                      disabled={isTyping}
                      className="rounded-full border border-ink-100 bg-paper-0 px-3.5 py-2 text-caption font-semibold text-ink-900 transition-colors hover:border-gold-600 hover:bg-gold-600/10 disabled:opacity-50"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
              {messages.length > 0 && (
                <a
                  href={`mailto:${TEAM_EMAIL}?subject=${encodeURIComponent("Chat with Debbie — I need help")}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-caption font-semibold text-ink-500 underline hover:text-gold-hover"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  Talk to our team
                </a>
              )}
              <form onSubmit={handleSend} className={cn("flex items-center gap-2", messages.length > 0 && "mt-3")}>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={isTyping}
                  placeholder="Chat with Debbie"
                  aria-label="Message Debbie"
                  className="flex-1 rounded-full border border-ink-100 bg-paper-0 px-4 py-2.5 text-body-s text-ink-900 placeholder:text-ink-300 focus:border-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isTyping || !draft.trim()}
                  aria-label="Send message"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-600 text-ink-900 transition-colors hover:bg-gold-hover disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
