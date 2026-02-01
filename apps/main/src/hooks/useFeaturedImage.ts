import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useLivingRoomStore } from '../store/livingRoomStore';
import { useAuthStore } from '../store/authStore';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export function useFeaturedImage(livingRoomId: string | undefined) {
  const { updateFeaturedImage, setError } = useLivingRoomStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!livingRoomId) return;

    const channel = supabase
      .channel(`living_room:${livingRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'living_rooms',
          filter: `id=eq.${livingRoomId}`,
        },
        (payload) => {
          const updated = payload.new as any;
          updateFeaturedImage(
            updated.featured_image_url,
            updated.featured_image_uploaded_by,
            updated.featured_image_uploaded_at
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [livingRoomId]);

  const uploadFeaturedImage = async (file: File) => {
    if (!livingRoomId || !user) throw new Error('Missing required data');

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Please upload an image file (JPEG, PNG, GIF, or WebP)');
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('Image must be smaller than 5MB');
    }

    try {
      setError(null);

      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${livingRoomId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('featured-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('featured-images')
        .getPublicUrl(filePath);

      // Update database
      const { error: updateError } = await supabase
        .from('living_rooms')
        .update({
          featured_image_url: publicUrl,
          featured_image_uploaded_by: user.id,
          featured_image_uploaded_at: new Date().toISOString(),
        })
        .eq('id', livingRoomId);

      if (updateError) throw updateError;

      // Update local state
      updateFeaturedImage(publicUrl, user.id, new Date().toISOString());

      return publicUrl;
    } catch (error) {
      console.error('Error uploading featured image:', error);
      throw new Error('Failed to upload image');
    }
  };


  return {
    uploadFeaturedImage,
  };
}
