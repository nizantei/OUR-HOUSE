import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useKitchenStore } from '../store/kitchenStore';
import { useAuthStore } from '../store/authStore';
import type { StickyNote, StickyNoteType, StickyNoteContent } from '@our-house/shared/types';

export function useStickyNotes(kitchenId: string | undefined) {
  const {
    stickyNotes,
    setStickyNotes,
    addStickyNote,
    removeStickyNote,
    updateStickyNote,
    setError,
  } = useKitchenStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!kitchenId) return;

    fetchStickyNotes();

    const channel = supabase
      .channel(`sticky_notes:${kitchenId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sticky_notes',
          filter: `kitchen_id=eq.${kitchenId}`,
        },
        (payload) => {
          const note = payload.new as StickyNote;
          if (!note.deleted_at) {
            addStickyNote(note);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sticky_notes',
          filter: `kitchen_id=eq.${kitchenId}`,
        },
        (payload) => {
          const note = payload.new as StickyNote;
          if (note.deleted_at) {
            removeStickyNote(note.id);
          } else {
            updateStickyNote(note.id, note);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'sticky_notes',
          filter: `kitchen_id=eq.${kitchenId}`,
        },
        (payload) => {
          removeStickyNote(payload.old.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [kitchenId]);

  const fetchStickyNotes = async () => {
    if (!kitchenId) return;

    try {
      const { data, error } = await supabase
        .from('sticky_notes')
        .select('*')
        .eq('kitchen_id', kitchenId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setStickyNotes(data as StickyNote[]);
    } catch (error) {
      console.error('Error fetching sticky notes:', error);
      setError('Failed to load sticky notes');
    }
  };

  const createNote = async (
    type: StickyNoteType,
    content: StickyNoteContent,
    color: string,
    position: { x: number; y: number }
  ) => {
    if (!kitchenId || !user) throw new Error('Missing required data');

    try {
      setError(null);
      const { data, error } = await supabase
        .from('sticky_notes')
        .insert({
          kitchen_id: kitchenId,
          type,
          content,
          color,
          position_x: position.x,
          position_y: position.y,
          z_index: 0,
          rotation: Math.random() * 6 - 3, // slight random tilt between -3 and 3 degrees
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      return data as StickyNote;
    } catch (error) {
      console.error('Error creating sticky note:', error);
      throw new Error('Failed to create sticky note');
    }
  };

  const updateNote = async (id: string, changes: Partial<StickyNote>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('sticky_notes')
        .update(changes)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data as StickyNote;
    } catch (error) {
      console.error('Error updating sticky note:', error);
      throw new Error('Failed to update sticky note');
    }
  };

  const deleteNote = async (id: string) => {
    if (!user) throw new Error('Missing required data');

    try {
      setError(null);
      const { error } = await supabase
        .from('sticky_notes')
        .update({
          deleted_at: new Date().toISOString(),
          deleted_by: user.id,
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting sticky note:', error);
      throw new Error('Failed to delete sticky note');
    }
  };

  const updateNotePosition = async (
    id: string,
    x: number,
    y: number,
    z_index: number
  ) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('sticky_notes')
        .update({
          position_x: x,
          position_y: y,
          z_index,
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating sticky note position:', error);
      throw new Error('Failed to update sticky note position');
    }
  };

  return {
    stickyNotes,
    createNote,
    updateNote,
    deleteNote,
    updateNotePosition,
    refreshStickyNotes: fetchStickyNotes,
  };
}
