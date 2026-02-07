import { useState, useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { supabaseAdmin } from '../lib/supabaseAdmin';
import type { User } from '@our-house/shared/types';

export interface AuthUserInfo {
  id: string;
  email: string;
  provider: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [authUsers, setAuthUsers] = useState<Map<string, AuthUserInfo>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchAuthUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data as User[]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAuthUsers() {
    if (!supabaseAdmin) return;
    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers();
      if (error) throw error;
      const map = new Map<string, AuthUserInfo>();
      for (const u of data.users) {
        const provider = u.app_metadata?.provider || 'email';
        map.set(u.id, {
          id: u.id,
          email: u.email || '',
          provider,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at || null,
        });
      }
      setAuthUsers(map);
    } catch (error) {
      console.error('Error fetching auth users:', error);
    }
  }

  async function updateUser(userId: string, updates: Partial<User>) {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  async function setUserPassword(userId: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!supabaseAdmin) {
      return { success: false, error: 'Service role key not configured. Add VITE_SUPABASE_SERVICE_ROLE_KEY to .env.local' };
    }
    try {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword,
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error('Error setting password:', error);
      return { success: false, error: error?.message || 'Failed to set password' };
    }
  }

  async function deleteUser(userId: string) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      // Also delete from auth if admin client available
      if (supabaseAdmin) {
        await supabaseAdmin.auth.admin.deleteUser(userId);
      }

      await fetchUsers();
      await fetchAuthUsers();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  return { users, authUsers, loading, updateUser, setUserPassword, deleteUser, fetchUsers };
}
