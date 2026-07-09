import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface QuizState {
  answers: Record<string, number>;
  placement: Record<string, string>;
  currentIndex: number;
  email?: string;
  setAnswer: (id: string, value: number) => void;
  setPlacement: (key: string, value: string) => void;
  next: () => void;
  prev: () => void;
  setEmail: (e: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      placement: {},
      currentIndex: 0,
      email: undefined,
      setAnswer: (id, value) =>
        set((state) => ({ answers: { ...state.answers, [id]: value } })),
      setPlacement: (key, value) =>
        set((state) => ({ placement: { ...state.placement, [key]: value } })),
      next: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
      prev: () =>
        set((state) => ({
          currentIndex: Math.max(0, state.currentIndex - 1),
        })),
      setEmail: (e) => set({ email: e }),
      reset: () =>
        set({ answers: {}, placement: {}, currentIndex: 0, email: undefined }),
    }),
    {
      name: "dogtn-assessment",
    }
  )
);

export default useQuizStore;
