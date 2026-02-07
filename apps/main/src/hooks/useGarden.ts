import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useGardenStore } from '../store/gardenStore';
import type { Garden } from '@our-house/shared/types';

export function useGarden(houseId: string | undefined) {
  const { garden, setGarden, updateGarden, setIsWatering, setLoading, setError, loading } = useGardenStore();

  useEffect(() => {
    if (!houseId) return;
    fetchGarden();

    const channel = supabase
      .channel(`garden:${houseId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'gardens', filter: `house_id=eq.${houseId}` },
        (payload) => {
          const updated = payload.new as Garden;
          setGarden(updated);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [houseId]);

  const fetchGarden = async () => {
    if (!houseId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gardens')
        .select('*')
        .eq('house_id', houseId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setGarden(data as Garden | null);
    } catch (error) {
      console.error('Error fetching garden:', error);
      setError('Failed to load garden');
    } finally {
      setLoading(false);
    }
  };

  const waterPlant = async () => {
    if (!garden) return;

    const lastWatered = garden.plant_last_watered ? new Date(garden.plant_last_watered) : null;
    const now = new Date();
    if (lastWatered) {
      const hoursSince = (now.getTime() - lastWatered.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setError('Plant was already watered today! Come back tomorrow.');
        return;
      }
    }

    try {
      setIsWatering(true);
      const newStage = Math.min(5, garden.plant_growth_stage + 1);
      const { error } = await supabase
        .from('gardens')
        .update({
          plant_last_watered: now.toISOString(),
          plant_growth_stage: newStage,
        })
        .eq('id', garden.id);

      if (error) throw error;
      updateGarden({ plant_last_watered: now.toISOString(), plant_growth_stage: newStage });

      setTimeout(() => setIsWatering(false), 2000);
    } catch (error) {
      console.error('Error watering plant:', error);
      setError('Failed to water plant');
      setIsWatering(false);
    }
  };

  const canWater = (): boolean => {
    if (!garden) return false;
    if (!garden.plant_last_watered) return true;
    const hoursSince = (Date.now() - new Date(garden.plant_last_watered).getTime()) / (1000 * 60 * 60);
    return hoursSince >= 24;
  };

  return { garden, loading, waterPlant, canWater, refreshGarden: fetchGarden };
}
