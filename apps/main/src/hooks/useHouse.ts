import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useHouseStore } from '../store/houseStore';
import { useAuthStore } from '../store/authStore';

export function useHouse() {
  const { house, loading, setHouse, setLoading } = useHouseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchHouse();
    } else {
      setHouse(null);
      setLoading(false);
    }
  }, [user, setHouse, setLoading]);

  const fetchHouse = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('houses')
        .select('*')
        .or(`user_1.eq.${user.id},user_2.eq.${user.id}`)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No house found
          setHouse(null);
        } else {
          throw error;
        }
      } else {
        setHouse(data as any);
      }
    } catch (error) {
      console.error('Error fetching house:', error);
      setHouse(null);
    } finally {
      setLoading(false);
    }
  };

  const createHouse = async () => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase.rpc('create_house_with_rooms', {
        creator_id: user.id,
      });

      if (error) throw error;

      // Fetch the newly created house
      await fetchHouse();

      return data;
    } catch (error) {
      console.error('Error creating house:', error);
      throw error;
    }
  };

  const joinHouse = async (invitationCode: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase.rpc('join_house', {
        user_id: user.id,
        inv_code: invitationCode,
      });

      if (error) throw error;

      // Fetch the house we just joined
      await fetchHouse();

      return data;
    } catch (error) {
      console.error('Error joining house:', error);
      throw error;
    }
  };

  return {
    house,
    loading,
    createHouse,
    joinHouse,
    refreshHouse: fetchHouse,
  };
}
