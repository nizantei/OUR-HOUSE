import { useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useBedroomStore } from '../store/bedroomStore';
import { useAuthStore } from '../store/authStore';
import type { Present, PresentType } from '@our-house/shared/types';

export function usePresents(bedroomId: string | undefined) {
  const { presents, setPresents, addPresent, removePresent, updatePresent, setError } = useBedroomStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!bedroomId) return;
    fetchPresents();

    const channel = supabase
      .channel(`presents:${bedroomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'presents', filter: `bedroom_id=eq.${bedroomId}` },
        (payload) => {
          const p = payload.new as Present;
          if (!p.deleted_at) addPresent(p);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'presents', filter: `bedroom_id=eq.${bedroomId}` },
        (payload) => {
          const p = payload.new as Present;
          if (p.deleted_at) {
            removePresent(p.id);
          } else {
            updatePresent(p.id, p);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'presents', filter: `bedroom_id=eq.${bedroomId}` },
        (payload) => { removePresent(payload.old.id); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [bedroomId]);

  const fetchPresents = async () => {
    if (!bedroomId) return;
    try {
      const { data, error } = await supabase
        .from('presents')
        .select('*')
        .eq('bedroom_id', bedroomId)
        .is('deleted_at', null)
        .order('given_at', { ascending: false });

      if (error) throw error;
      setPresents((data || []) as Present[]);
    } catch (error) {
      console.error('Error fetching presents:', error);
      setError('Failed to load presents');
    }
  };

  const givePresent = async (type: PresentType, content: string, giftSubtype?: string) => {
    if (!bedroomId || !user) throw new Error('Missing required data');

    const { data, error } = await supabase
      .from('presents')
      .insert({
        bedroom_id: bedroomId,
        type,
        content,
        gift_subtype: giftSubtype,
        given_by: user.id,
        given_at: new Date().toISOString(),
        opened: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Present;
  };

  const openPresent = async (id: string) => {
    const { error } = await supabase
      .from('presents')
      .update({ opened: true, opened_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error opening present:', error);
      throw new Error('Failed to open present');
    }
  };

  const deletePresent = async (id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('presents')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.id })
      .eq('id', id);

    if (error) console.error('Error deleting present:', error);
  };

  return { presents, givePresent, openPresent, deletePresent, refreshPresents: fetchPresents };
}
