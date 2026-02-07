import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export function useAuth() {
  const { user, supabaseUser, loading, setUser, setSupabaseUser, setLoading } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSupabaseUser, setLoading]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser(data as any);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Ensure user profile exists in our users table
      await ensureUserProfile(data.user);
    }

    return data;
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });

    if (error) throw error;

    if (data.user) {
      await ensureUserProfile(data.user, displayName);
    }

    return data;
  };

  const ensureUserProfile = async (authUser: any, displayName?: string) => {
    const name = displayName || authUser.user_metadata?.display_name || authUser.email?.split('@')[0] || 'User';
    const { error } = await supabase
      .from('users')
      .upsert({
        id: authUser.id,
        google_id: authUser.user_metadata?.sub || authUser.id,
        email: authUser.email!,
        display_name: name,
        profile_picture: authUser.user_metadata?.avatar_url || null,
        last_active: new Date().toISOString(),
      }, {
        onConflict: 'id',
      });

    if (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    supabaseUser,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
}
