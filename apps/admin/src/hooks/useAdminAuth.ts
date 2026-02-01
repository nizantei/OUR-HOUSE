import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import type { User } from '@our-house/shared/types';
import { useAuthStore } from '../store/authStore';

export function useAdminAuth() {
  const { user, supabaseUser, loading, setUser, setSupabaseUser, setLoading, reset } = useAuthStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        reset();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSupabaseUser, setLoading, reset]);

  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data as User);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error('Error signing in:', error);
  }

  async function signOut() {
    await supabase.auth.signOut();
    reset();
  }

  const isAdmin = user?.is_admin === true;

  return { user, supabaseUser, loading, isAdmin, signInWithGoogle, signOut };
}
