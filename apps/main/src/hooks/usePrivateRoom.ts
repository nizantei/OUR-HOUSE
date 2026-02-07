import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { usePrivateRoomStore } from '../store/privateRoomStore';
import type { PrivateRoom } from '@our-house/shared/types';

export function usePrivateRoom(houseId: string | undefined, ownerId: string | undefined) {
  const { privateRoom, setPrivateRoom, setLoading, setError, loading } = usePrivateRoomStore();

  useEffect(() => {
    if (!houseId || !ownerId) return;
    fetchPrivateRoom();

    const channel = supabase
      .channel(`private_room:${houseId}:${ownerId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'private_rooms', filter: `house_id=eq.${houseId}` },
        (payload) => {
          const updated = payload.new as PrivateRoom;
          if (updated.owner_id === ownerId) {
            setPrivateRoom(updated);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [houseId, ownerId]);

  const fetchPrivateRoom = async () => {
    if (!houseId || !ownerId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('private_rooms')
        .select('*')
        .eq('house_id', houseId)
        .eq('owner_id', ownerId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setPrivateRoom(data as PrivateRoom | null);
    } catch (error) {
      console.error('Error fetching private room:', error);
      setError('Failed to load private room');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async () => {
    if (!privateRoom) return;
    const { error } = await supabase
      .from('private_rooms')
      .update({ visible_to_partner: !privateRoom.visible_to_partner })
      .eq('id', privateRoom.id);

    if (error) console.error('Error toggling visibility:', error);
  };

  return { privateRoom, loading, toggleVisibility, refreshPrivateRoom: fetchPrivateRoom };
}
