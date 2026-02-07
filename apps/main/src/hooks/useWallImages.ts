import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useGalleryStore } from '../store/galleryStore';
import { useAuthStore } from '../store/authStore';
import type { WallImage } from '@our-house/shared/types';

export function useWallImages(galleryId: string | undefined) {
  const { wallImages, setWallImages, addWallImage, removeWallImage, updateWallImage } = useGalleryStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!galleryId) return;
    fetchWallImages();

    const channel = supabase
      .channel(`wall_images:${galleryId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wall_images', filter: `gallery_id=eq.${galleryId}` },
        (payload) => { addWallImage(payload.new as WallImage); }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'wall_images', filter: `gallery_id=eq.${galleryId}` },
        (payload) => {
          const updated = payload.new as WallImage;
          if (updated.deleted_at) {
            removeWallImage(updated.id);
          } else {
            updateWallImage(updated.id, updated);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'wall_images', filter: `gallery_id=eq.${galleryId}` },
        (payload) => { removeWallImage(payload.old.id); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [galleryId]);

  const fetchWallImages = async () => {
    if (!galleryId) return;
    try {
      const { data, error } = await supabase
        .from('wall_images')
        .select('*')
        .eq('gallery_id', galleryId)
        .is('deleted_at', null)
        .order('uploaded_at', { ascending: true });

      if (error) throw error;
      setWallImages((data || []) as WallImage[]);
    } catch (error) {
      console.error('Error fetching wall images:', error);
    }
  };

  const uploadWallImage = async (file: File, position: { x: number; y: number }) => {
    if (!galleryId || !user) throw new Error('Missing required data');

    const fileExt = file.name.split('.').pop();
    const fileName = `gallery-${galleryId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(fileName);

    const { data, error } = await supabase
      .from('wall_images')
      .insert({
        gallery_id: galleryId,
        url: publicUrl,
        uploaded_by: user.id,
        uploaded_at: new Date().toISOString(),
        position_x: position.x,
        position_y: position.y,
      })
      .select()
      .single();

    if (error) throw error;
    return data as WallImage;
  };

  const updateImagePosition = async (id: string, x: number, y: number) => {
    const { error } = await supabase
      .from('wall_images')
      .update({ position_x: x, position_y: y })
      .eq('id', id);

    if (error) console.error('Error updating image position:', error);
  };

  const deleteWallImage = async (id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('wall_images')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.id })
      .eq('id', id);

    if (error) console.error('Error deleting wall image:', error);
  };

  return { wallImages, uploadWallImage, updateImagePosition, deleteWallImage, refreshWallImages: fetchWallImages };
}
