import { useState, useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import type { User } from '@our-house/shared/types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
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

  async function updateUser(userId: string, updates: Partial<User>) {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers(); // Refresh list
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm('Delete this user? This will cascade delete their house and all data.')) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers(); // Refresh list
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  return { users, loading, updateUser, deleteUser, fetchUsers };
}
