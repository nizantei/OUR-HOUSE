import { create } from 'zustand';
import type { Kitchen, StickyNote, Magnet } from '@our-house/shared/types';

interface KitchenState {
  kitchen: Kitchen | null;
  stickyNotes: StickyNote[];
  magnets: Magnet[];
  loading: boolean;
  error: string | null;
  setKitchen: (kitchen: Kitchen | null) => void;
  setStickyNotes: (stickyNotes: StickyNote[]) => void;
  addStickyNote: (note: StickyNote) => void;
  removeStickyNote: (id: string) => void;
  updateStickyNote: (id: string, changes: Partial<StickyNote>) => void;
  setMagnets: (magnets: Magnet[]) => void;
  addMagnet: (magnet: Magnet) => void;
  removeMagnet: (id: string) => void;
  updateMagnet: (id: string, changes: Partial<Magnet>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useKitchenStore = create<KitchenState>((set) => ({
  kitchen: null,
  stickyNotes: [],
  magnets: [],
  loading: false,
  error: null,
  setKitchen: (kitchen) => set({ kitchen }),
  setStickyNotes: (stickyNotes) => set({ stickyNotes }),
  addStickyNote: (note) => set((state) => ({
    stickyNotes: [...state.stickyNotes, note],
  })),
  removeStickyNote: (id) => set((state) => ({
    stickyNotes: state.stickyNotes.filter((n) => n.id !== id),
  })),
  updateStickyNote: (id, changes) => set((state) => ({
    stickyNotes: state.stickyNotes.map((n) =>
      n.id === id ? { ...n, ...changes } : n
    ),
  })),
  setMagnets: (magnets) => set({ magnets }),
  addMagnet: (magnet) => set((state) => ({
    magnets: [...state.magnets, magnet],
  })),
  removeMagnet: (id) => set((state) => ({
    magnets: state.magnets.filter((m) => m.id !== id),
  })),
  updateMagnet: (id, changes) => set((state) => ({
    magnets: state.magnets.map((m) =>
      m.id === id ? { ...m, ...changes } : m
    ),
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    kitchen: null,
    stickyNotes: [],
    magnets: [],
    loading: false,
    error: null,
  }),
}));
