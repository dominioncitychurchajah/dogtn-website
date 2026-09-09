import { create } from "zustand";

export interface AudioTrack {
  title: string;
  speaker: string;
  src?: string;
  /** Live stream (radio) — the player shows an on-air badge and hides seek affordances. */
  live?: boolean;
}

interface AudioState {
  track: AudioTrack | null;
  playing: boolean;
  play: (track: AudioTrack) => void;
  toggle: () => void;
  stop: () => void;
}

/** Layout-level persistent mini audio player state. */
export const useAudioPlayer = create<AudioState>((set) => ({
  track: null,
  playing: false,
  play: (track) => set({ track, playing: true }),
  toggle: () => set((s) => ({ playing: !s.playing })),
  stop: () => set({ track: null, playing: false }),
}));
