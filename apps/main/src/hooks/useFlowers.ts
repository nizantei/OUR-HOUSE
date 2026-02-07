import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useGardenStore } from '../store/gardenStore';
import type { Flower } from '@our-house/shared/types';

export function useFlowers(gardenId: string | undefined) {
  const { flowers, setFlowers, addFlower, removeFlower } = useGardenStore();

  useEffect(() => {
    if (!gardenId) return;
    fetchFlowers();

    const channel = supabase
      .channel(`flowers:${gardenId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'flowers', filter: `garden_id=eq.${gardenId}` },
        (payload) => { addFlower(payload.new as Flower); }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'flowers', filter: `garden_id=eq.${gardenId}` },
        (payload) => { removeFlower(payload.old.id); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [gardenId]);

  const fetchFlowers = async () => {
    if (!gardenId) return;
    try {
      const { data, error } = await supabase
        .from('flowers')
        .select('*')
        .eq('garden_id', gardenId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFlowers((data || []) as Flower[]);
    } catch (error) {
      console.error('Error fetching flowers:', error);
    }
  };

  const plantFlower = async (flowerType: string, goalName: string, position: { x: number; y: number }) => {
    if (!gardenId) return;
    try {
      const { data, error } = await supabase
        .from('flowers')
        .insert({
          garden_id: gardenId,
          flower_type: flowerType,
          goal_name: goalName,
          position_x: position.x,
          position_y: position.y,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as Flower;
    } catch (error) {
      console.error('Error planting flower:', error);
      throw new Error('Failed to plant flower');
    }
  };

  const removeFlowerById = async (id: string) => {
    try {
      const { error } = await supabase.from('flowers').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error removing flower:', error);
    }
  };

  return { flowers, plantFlower, removeFlower: removeFlowerById, refreshFlowers: fetchFlowers };
}
