import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { usePrivateRoomStore } from '../store/privateRoomStore';
import type { RoomElement, RoomElementType } from '@our-house/shared/types';

export function useRoomElements(privateRoomId: string | undefined) {
  const { elements, setElements, addElement, removeElement, updateElement } = usePrivateRoomStore();

  useEffect(() => {
    if (!privateRoomId) return;
    fetchElements();

    const channel = supabase
      .channel(`room_elements:${privateRoomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_elements', filter: `private_room_id=eq.${privateRoomId}` },
        (payload) => { addElement(payload.new as RoomElement); }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'room_elements', filter: `private_room_id=eq.${privateRoomId}` },
        (payload) => {
          const updated = payload.new as RoomElement;
          updateElement(updated.id, updated);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'room_elements', filter: `private_room_id=eq.${privateRoomId}` },
        (payload) => { removeElement(payload.old.id); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [privateRoomId]);

  const fetchElements = async () => {
    if (!privateRoomId) return;
    try {
      const { data, error } = await supabase
        .from('room_elements')
        .select('*')
        .eq('private_room_id', privateRoomId)
        .order('z_index', { ascending: true });

      if (error) throw error;
      setElements((data || []) as RoomElement[]);
    } catch (error) {
      console.error('Error fetching room elements:', error);
    }
  };

  const addNewElement = async (assetId: string, type: RoomElementType = 'furniture') => {
    if (!privateRoomId) return;
    const maxZ = elements.length > 0 ? Math.max(...elements.map((e) => e.z_index)) + 1 : 0;

    const { data, error } = await supabase
      .from('room_elements')
      .insert({
        private_room_id: privateRoomId,
        type,
        asset_id: assetId,
        position_x: 400 + Math.random() * 200,
        position_y: 250 + Math.random() * 100,
        scale: 1,
        rotation: 0,
        z_index: maxZ,
      })
      .select()
      .single();

    if (error) throw error;
    return data as RoomElement;
  };

  const deleteElement = async (id: string) => {
    const { error } = await supabase.from('room_elements').delete().eq('id', id);
    if (error) console.error('Error deleting element:', error);
  };

  const updateElementPosition = async (id: string, x: number, y: number) => {
    const { error } = await supabase
      .from('room_elements')
      .update({ position_x: x, position_y: y })
      .eq('id', id);

    if (error) console.error('Error updating position:', error);
  };

  const updateElementProperties = async (id: string, changes: Partial<RoomElement>) => {
    const { error } = await supabase
      .from('room_elements')
      .update(changes)
      .eq('id', id);

    if (error) console.error('Error updating element:', error);
  };

  const bringForward = async (id: string) => {
    const el = elements.find((e) => e.id === id);
    if (!el) return;
    const maxZ = Math.max(...elements.map((e) => e.z_index));
    if (el.z_index >= maxZ) return;
    await updateElementProperties(id, { z_index: maxZ + 1 });
    updateElement(id, { z_index: maxZ + 1 });
  };

  const sendBack = async (id: string) => {
    const el = elements.find((e) => e.id === id);
    if (!el) return;
    const minZ = Math.min(...elements.map((e) => e.z_index));
    if (el.z_index <= minZ) return;
    await updateElementProperties(id, { z_index: minZ - 1 });
    updateElement(id, { z_index: minZ - 1 });
  };

  return {
    elements,
    addNewElement,
    deleteElement,
    updateElementPosition,
    updateElementProperties,
    bringForward,
    sendBack,
    refreshElements: fetchElements,
  };
}
