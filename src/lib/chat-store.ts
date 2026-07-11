import { create } from "zustand";
import {
  DEBBIE_NODES,
  ROOT_ID,
  ROOT_RETURN_TEXT,
  FREE_TEXT_HANDOFF_TEXT,
  type DebbieChip,
} from "@/data/debbie-flows";
import { trackEvent } from "@/lib/analytics";

export interface DebbieMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
}

interface NavigateResult {
  navigate?: { href: string; external?: boolean };
}

interface ChatState {
  isOpen: boolean;
  hasOpenedOnce: boolean;
  isTyping: boolean;
  messages: DebbieMessage[];
  currentChips: DebbieChip[];
  hasProactiveMessage: boolean;
  proactiveText: string | null;
  proactiveChips: DebbieChip[] | null;
  toggle: () => void;
  close: () => void;
  selectChip: (chip: DebbieChip) => NavigateResult;
  sendFreeText: (text: string) => void;
  triggerProactive: (text: string, chips?: DebbieChip[]) => void;
}

let seq = 0;
const nextId = () => `debbie-${++seq}`;

export const useChatStore = create<ChatState>()((set, get) => ({
  isOpen: false,
  hasOpenedOnce: false,
  isTyping: false,
  messages: [],
  currentChips: [],
  hasProactiveMessage: false,
  proactiveText: null,
  proactiveChips: null,

  toggle: () => {
    const { isOpen, hasOpenedOnce, hasProactiveMessage, proactiveText, proactiveChips } = get();
    if (isOpen) {
      set({ isOpen: false });
      return;
    }
    trackEvent("chatbot_opened");
    if (hasProactiveMessage && proactiveText) {
      trackEvent("proactive_message_viewed");
      set((s) => ({
        isOpen: true,
        hasOpenedOnce: true,
        messages: hasOpenedOnce
          ? [...s.messages, { id: nextId(), sender: "bot", text: proactiveText }]
          : [{ id: nextId(), sender: "bot", text: proactiveText }],
        currentChips: proactiveChips ?? DEBBIE_NODES[ROOT_ID].chips,
        hasProactiveMessage: false,
        proactiveText: null,
        proactiveChips: null,
      }));
      return;
    }
    // First open with no proactive message: leave messages empty so the
    // component renders the Kodee-style landing screen instead of a bubble.
    set({ isOpen: true, hasOpenedOnce: true });
  },

  close: () => set({ isOpen: false }),

  selectChip: (chip) => {
    set((s) => ({
      messages: [...s.messages, { id: nextId(), sender: "user", text: chip.label }],
      isTyping: true,
      currentChips: [],
    }));

    if (chip.event) trackEvent(chip.event);

    if (chip.kind === "link") {
      setTimeout(() => {
        set((s) => ({
          messages: [...s.messages, { id: nextId(), sender: "bot", text: chip.confirm }],
          isTyping: false,
        }));
      }, 450);
      return { navigate: { href: chip.href, external: chip.external } };
    }

    const node = DEBBIE_NODES[chip.to];
    const text = chip.to === ROOT_ID ? ROOT_RETURN_TEXT : node.bot;
    setTimeout(() => {
      set((s) => ({
        messages: [...s.messages, { id: nextId(), sender: "bot", text }],
        isTyping: false,
        currentChips: node.chips,
      }));
    }, 450);
    return {};
  },

  sendFreeText: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    set((s) => ({
      messages: [...s.messages, { id: nextId(), sender: "user", text: trimmed }],
      isTyping: true,
      currentChips: [],
    }));
    trackEvent("chat_free_text_sent");
    setTimeout(() => {
      set((s) => ({
        messages: [...s.messages, { id: nextId(), sender: "bot", text: FREE_TEXT_HANDOFF_TEXT }],
        isTyping: false,
        currentChips: DEBBIE_NODES[ROOT_ID].chips,
      }));
    }, 500);
  },

  triggerProactive: (text, chips) => {
    const { isOpen, hasProactiveMessage } = get();
    if (isOpen || hasProactiveMessage) return;
    set({ hasProactiveMessage: true, proactiveText: text, proactiveChips: chips ?? null });
  },
}));
