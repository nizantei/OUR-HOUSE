import { useEffect, useState } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import { useAuthStore } from '../store/authStore';

interface PresenceState {
  userId: string;
  displayName: string;
  profilePicture?: string;
  currentRoom: string;
  lastSeen: string;
}

export function usePresence(roomName: string) {
  const { user } = useAuthStore();
  const [partnerPresence, setPartnerPresence] = useState<PresenceState | null>(null);

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel(`presence:${user.id}`, {
      config: { presence: { key: user.id } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PresenceState>();
        const others = Object.entries(state)
          .filter(([key]) => key !== user.id)
          .flatMap(([, presences]) => presences);

        setPartnerPresence(others[0] || null);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            userId: user.id,
            displayName: user.display_name,
            profilePicture: user.profile_picture,
            currentRoom: roomName,
            lastSeen: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, roomName]);

  return { partnerPresence };
}
