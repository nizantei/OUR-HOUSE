import { create } from 'zustand';
import type { User } from '@our-house/shared/types';

interface AuthState {
  user: User | null;
  supabaseUser: any | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSupabaseUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  supabaseUser: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSupabaseUser: (user) => set({ supabaseUser: user }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ user: null, supabaseUser: null, loading: false }),
}));
