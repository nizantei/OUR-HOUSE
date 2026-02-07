import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useKitchenStore } from '../store/kitchenStore';
import type { Magnet } from '@our-house/shared/types';

export function useMagnets(kitchenId: string | undefined) {
  const {
    magnets,
    setMagnets,
    addMagnet: addMagnetToStore,
    removeMagnet: removeMagnetFromStore,
    updateMagnet,
    setError,
  } = useKitchenStore();

  useEffect(() => {
    if (!kitchenId) return;

    fetchMagnets();

    const channel = supabase
      .channel(`magnets:${kitchenId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'magnets',
          filter: `kitchen_id=eq.${kitchenId}`,
        },
        (payload) => {
          addMagnetToStore(payload.new as Magnet);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'magnets',
          filter: `kitchen_id=eq.${kitchenId}`,
        },
        (payload) => {
          const magnet = payload.new as Magnet;
          updateMagnet(magnet.id, magnet);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'magnets',
          filter: `kitchen_id=eq.${kitchenId}`,
        },
        (payload) => {
          removeMagnetFromStore(payload.old.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [kitchenId]);

  const fetchMagnets = async () => {
    if (!kitchenId) return;

    try {
      const { data, error } = await supabase
        .from('magnets')
        .select('*')
        .eq('kitchen_id', kitchenId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMagnets(data as Magnet[]);
    } catch (error) {
      console.error('Error fetching magnets:', error);
      setError('Failed to load magnets');
    }
  };

  const addMagnet = async (
    type: string,
    position: { x: number; y: number }
  ) => {
    if (!kitchenId) throw new Error('Missing required data');

    try {
      setError(null);
      const { data, error } = await supabase
        .from('magnets')
        .insert({
          kitchen_id: kitchenId,
          magnet_type: type,
          position_x: position.x,
          position_y: position.y,
          z_index: 0,
        })
        .select()
        .single();

      if (error) throw error;

      return data as Magnet;
    } catch (error) {
      console.error('Error adding magnet:', error);
      throw new Error('Failed to add magnet');
    }
  };

  const removeMagnet = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('magnets')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing magnet:', error);
      throw new Error('Failed to remove magnet');
    }
  };

  const updateMagnetPosition = async (
    id: string,
    x: number,
    y: number,
    z_index: number
  ) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('magnets')
        .update({
          position_x: x,
          position_y: y,
          z_index,
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating magnet position:', error);
      throw new Error('Failed to update magnet position');
    }
  };

  return {
    magnets,
    addMagnet,
    removeMagnet,
    updateMagnetPosition,
    refreshMagnets: fetchMagnets,
  };
}
