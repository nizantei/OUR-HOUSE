import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useGalleryStore } from '../store/galleryStore';
import { useAuthStore } from '../store/authStore';
import type { Album, Photo } from '@our-house/shared/types';

export function useAlbums(galleryId: string | undefined) {
  const { albums, setAlbums, addAlbum, removeAlbum, currentAlbumPhotos, setCurrentAlbumPhotos, addPhoto, removePhoto } = useGalleryStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!galleryId) return;
    fetchAlbums();

    const channel = supabase
      .channel(`albums:${galleryId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'albums', filter: `gallery_id=eq.${galleryId}` },
        (payload) => { addAlbum(payload.new as Album); }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'albums', filter: `gallery_id=eq.${galleryId}` },
        (payload) => { removeAlbum(payload.old.id); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [galleryId]);

  const fetchAlbums = async () => {
    if (!galleryId) return;
    try {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setAlbums((data || []) as Album[]);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const createAlbum = async (name: string) => {
    if (!galleryId) throw new Error('No gallery');
    const { data, error } = await supabase
      .from('albums')
      .insert({ gallery_id: galleryId, name })
      .select()
      .single();

    if (error) throw error;
    return data as Album;
  };

  const deleteAlbum = async (id: string) => {
    const { error } = await supabase.from('albums').delete().eq('id', id);
    if (error) throw error;
  };

  const fetchAlbumPhotos = async (albumId: string) => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('album_id', albumId)
        .is('deleted_at', null)
        .order('uploaded_at', { ascending: true });

      if (error) throw error;
      setCurrentAlbumPhotos((data || []) as Photo[]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const uploadPhoto = async (albumId: string, file: File, caption?: string) => {
    if (!user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `album-${albumId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('album-photos')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('album-photos')
      .getPublicUrl(fileName);

    const { data, error } = await supabase
      .from('photos')
      .insert({
        album_id: albumId,
        url: publicUrl,
        uploaded_by: user.id,
        uploaded_at: new Date().toISOString(),
        caption,
      })
      .select()
      .single();

    if (error) throw error;
    const photo = data as Photo;
    addPhoto(photo);
    return photo;
  };

  const deletePhoto = async (id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('photos')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.id })
      .eq('id', id);

    if (error) throw error;
    removePhoto(id);
  };

  return {
    albums,
    currentAlbumPhotos,
    createAlbum,
    deleteAlbum,
    fetchAlbumPhotos,
    uploadPhoto,
    deletePhoto,
    refreshAlbums: fetchAlbums,
  };
}
