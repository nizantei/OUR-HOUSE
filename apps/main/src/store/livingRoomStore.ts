import { create } from 'zustand';
import type { LivingRoom, Countdown } from '@our-house/shared/types';

interface LivingRoomState {
  livingRoom: LivingRoom | null;
  countdowns: Countdown[];
  loading: boolean;
  error: string | null;
  setLivingRoom: (livingRoom: LivingRoom | null) => void;
  setCountdowns: (countdowns: Countdown[]) => void;
  addCountdown: (countdown: Countdown) => void;
  removeCountdown: (id: string) => void;
  updateFeaturedImage: (imageUrl: string | undefined, uploadedBy: string | undefined, uploadedAt: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useLivingRoomStore = create<LivingRoomState>((set) => ({
  livingRoom: null,
  countdowns: [],
  loading: false,
  error: null,
  setLivingRoom: (livingRoom) => set({ livingRoom }),
  setCountdowns: (countdowns) => set({ countdowns }),
  addCountdown: (countdown) => set((state) => ({
    countdowns: [...state.countdowns, countdown]
  })),
  removeCountdown: (id) => set((state) => ({
    countdowns: state.countdowns.filter(c => c.id !== id)
  })),
  updateFeaturedImage: (imageUrl, uploadedBy, uploadedAt) => set((state) => ({
    livingRoom: state.livingRoom ? {
      ...state.livingRoom,
      featured_image_url: imageUrl,
      featured_image_uploaded_by: uploadedBy,
      featured_image_uploaded_at: uploadedAt,
    } : null,
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    livingRoom: null,
    countdowns: [],
    loading: false,
    error: null
  }),
}));
