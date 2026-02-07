import { create } from 'zustand';
import type { Garden, Flower } from '@our-house/shared/types';

interface GardenState {
  garden: Garden | null;
  flowers: Flower[];
  isWatering: boolean;
  loading: boolean;
  error: string | null;
  setGarden: (garden: Garden | null) => void;
  setFlowers: (flowers: Flower[]) => void;
  addFlower: (flower: Flower) => void;
  removeFlower: (id: string) => void;
  setIsWatering: (isWatering: boolean) => void;
  updateGarden: (changes: Partial<Garden>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useGardenStore = create<GardenState>((set) => ({
  garden: null,
  flowers: [],
  isWatering: false,
  loading: false,
  error: null,
  setGarden: (garden) => set({ garden }),
  setFlowers: (flowers) => set({ flowers }),
  addFlower: (flower) => set((state) => ({ flowers: [...state.flowers, flower] })),
  removeFlower: (id) => set((state) => ({ flowers: state.flowers.filter((f) => f.id !== id) })),
  setIsWatering: (isWatering) => set({ isWatering }),
  updateGarden: (changes) => set((state) => ({
    garden: state.garden ? { ...state.garden, ...changes } : null,
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ garden: null, flowers: [], isWatering: false, loading: false, error: null }),
}));
