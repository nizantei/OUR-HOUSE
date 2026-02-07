import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useGalleryStore } from '../store/galleryStore';
import type { Gallery } from '@our-house/shared/types';

export function useGallery(houseId: string | undefined) {
  const { gallery, setGallery, setLoading, setError, loading } = useGalleryStore();

  useEffect(() => {
    if (!houseId) return;
    fetchGallery();

    const channel = supabase
      .channel(`gallery:${houseId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'galleries', filter: `house_id=eq.${houseId}` },
        (payload) => { setGallery(payload.new as Gallery); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [houseId]);

  const fetchGallery = async () => {
    if (!houseId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('house_id', houseId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setGallery(data as Gallery | null);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setError('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  return { gallery, loading, refreshGallery: fetchGallery };
}
