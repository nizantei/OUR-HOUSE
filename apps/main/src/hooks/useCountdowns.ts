import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useLivingRoomStore } from '../store/livingRoomStore';
import type { Countdown } from '@our-house/shared/types';
import { useAuthStore } from '../store/authStore';

export function useCountdowns(livingRoomId: string | undefined) {
  const { countdowns, setCountdowns, addCountdown, removeCountdown, setError } = useLivingRoomStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!livingRoomId) return;

    fetchCountdowns();

    const channel = supabase
      .channel(`countdowns:${livingRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'countdowns',
          filter: `living_room_id=eq.${livingRoomId}`,
        },
        (payload) => {
          addCountdown(payload.new as Countdown);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'countdowns',
          filter: `living_room_id=eq.${livingRoomId}`,
        },
        (payload) => {
          removeCountdown(payload.old.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [livingRoomId]);

  const fetchCountdowns = async () => {
    if (!livingRoomId) return;

    try {
      const { data, error } = await supabase
        .from('countdowns')
        .select('*')
        .eq('living_room_id', livingRoomId)
        .order('date', { ascending: true });

      if (error) throw error;

      setCountdowns(data as Countdown[]);
    } catch (error) {
      console.error('Error fetching countdowns:', error);
      setError('Failed to load countdowns');
    }
  };

  const createCountdown = async (name: string, date: string) => {
    if (!livingRoomId || !user) throw new Error('Missing required data');

    try {
      setError(null);
      const { data, error } = await supabase
        .from('countdowns')
        .insert({
          living_room_id: livingRoomId,
          name,
          date,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      return data as Countdown;
    } catch (error) {
      console.error('Error creating countdown:', error);
      throw new Error('Failed to create countdown');
    }
  };

  const deleteCountdown = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('countdowns')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting countdown:', error);
      throw new Error('Failed to delete countdown');
    }
  };


  return {
    countdowns,
    createCountdown,
    deleteCountdown,
    refreshCountdowns: fetchCountdowns,
  };
}
