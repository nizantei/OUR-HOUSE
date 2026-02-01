import { create } from 'zustand';
import type { House } from '@our-house/shared/types';

interface HouseState {
  house: House | null;
  loading: boolean;
  setHouse: (house: House | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useHouseStore = create<HouseState>((set) => ({
  house: null,
  loading: true,
  setHouse: (house) => set({ house }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ house: null, loading: false }),
}));
