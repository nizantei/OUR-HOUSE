import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useBedroomStore } from '../store/bedroomStore';
import type { Bedroom } from '@our-house/shared/types';

export function useBedroom(houseId: string | undefined) {
  const { bedroom, setBedroom, setLoading, setError, loading } = useBedroomStore();

  useEffect(() => {
    if (!houseId) return;
    fetchBedroom();

    const channel = supabase
      .channel(`bedroom:${houseId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bedrooms', filter: `house_id=eq.${houseId}` },
        (payload) => { setBedroom(payload.new as Bedroom); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [houseId]);

  const fetchBedroom = async () => {
    if (!houseId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bedrooms')
        .select('*')
        .eq('house_id', houseId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setBedroom(data as Bedroom | null);
    } catch (error) {
      console.error('Error fetching bedroom:', error);
      setError('Failed to load bedroom');
    } finally {
      setLoading(false);
    }
  };

  return { bedroom, loading, refreshBedroom: fetchBedroom };
}
