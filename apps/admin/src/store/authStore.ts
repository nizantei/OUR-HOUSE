import { create } from 'zustand';
import type { User } from '@our-house/shared/types';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSupabaseUser: (user: SupabaseUser | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  supabaseUser: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSupabaseUser: (supabaseUser) => set({ supabaseUser }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ user: null, supabaseUser: null, loading: false }),
}));
