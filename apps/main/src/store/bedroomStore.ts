import { create } from 'zustand';
import type { Bedroom, Present } from '@our-house/shared/types';

interface BedroomState {
  bedroom: Bedroom | null;
  presents: Present[];
  loading: boolean;
  error: string | null;
  setBedroom: (bedroom: Bedroom | null) => void;
  setPresents: (presents: Present[]) => void;
  addPresent: (present: Present) => void;
  removePresent: (id: string) => void;
  updatePresent: (id: string, changes: Partial<Present>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useBedroomStore = create<BedroomState>((set) => ({
  bedroom: null,
  presents: [],
  loading: false,
  error: null,
  setBedroom: (bedroom) => set({ bedroom }),
  setPresents: (presents) => set({ presents }),
  addPresent: (present) => set((state) => ({ presents: [...state.presents, present] })),
  removePresent: (id) => set((state) => ({ presents: state.presents.filter((p) => p.id !== id) })),
  updatePresent: (id, changes) => set((state) => ({
    presents: state.presents.map((p) => p.id === id ? { ...p, ...changes } : p),
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ bedroom: null, presents: [], loading: false, error: null }),
}));
