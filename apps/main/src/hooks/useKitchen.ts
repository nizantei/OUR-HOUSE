import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useKitchenStore } from '../store/kitchenStore';
import type { Kitchen } from '@our-house/shared/types';

export function useKitchen(houseId: string | undefined) {
  const { kitchen, loading, setKitchen, setLoading, setError } = useKitchenStore();

  useEffect(() => {
    if (!houseId) return;

    fetchKitchen();

    const channel = supabase
      .channel(`kitchen:${houseId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'kitchens',
          filter: `house_id=eq.${houseId}`,
        },
        (payload) => {
          setKitchen(payload.new as Kitchen);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [houseId]);

  const fetchKitchen = async () => {
    if (!houseId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('kitchens')
        .select('*')
        .eq('house_id', houseId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setKitchen(null);
        } else {
          throw error;
        }
      } else {
        setKitchen(data as Kitchen);
      }
    } catch (error) {
      console.error('Error fetching kitchen:', error);
      setError('Failed to load kitchen');
    } finally {
      setLoading(false);
    }
  };

  return {
    kitchen,
    loading,
    refreshKitchen: fetchKitchen,
  };
}
