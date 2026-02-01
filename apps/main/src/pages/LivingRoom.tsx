import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@our-house/shared/lib/supabase';
import { useHouseStore } from '../store/houseStore';
import { useLivingRoomStore } from '../store/livingRoomStore';
import { useCountdowns } from '../hooks/useCountdowns';
import { useFeaturedImage } from '../hooks/useFeaturedImage';
import { useAuth } from '../hooks/useAuth';
import type { LivingRoom as LivingRoomType } from '@our-house/shared/types';
import { Button } from '../components/ui/Button';
import { RoomContainer } from '../components/rooms/core/RoomContainer';
import { LivingRoomScene } from '../components/rooms/livingroom/LivingRoomScene';
import { Modal } from '../components/rooms/shared/Modal';
import { ImageUpload } from '../components/livingroom/ImageUpload';
import { CountdownForm } from '../components/livingroom/CountdownForm';
import { CountdownCard } from '../components/livingroom/CountdownCard';

export function LivingRoom() {
  const navigate = useNavigate();
  const { house } = useHouseStore();
  const { livingRoom, setLivingRoom, setLoading, loading, error } = useLivingRoomStore();
  const { signOut } = useAuth();
  const [showCountdownForm, setShowCountdownForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { countdowns, createCountdown, deleteCountdown } = useCountdowns(livingRoom?.id);
  const { uploadFeaturedImage } = useFeaturedImage(livingRoom?.id);

  useEffect(() => {
    if (house) {
      fetchLivingRoom();
    }
  }, [house]);

  const fetchLivingRoom = async () => {
    if (!house) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('living_rooms')
        .select('*')
        .eq('house_id', house.id)
        .single();

      if (error) throw error;

      setLivingRoom(data as LivingRoomType);
    } catch (error) {
      console.error('Error fetching living room:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const handleCreateCountdown = async (name: string, date: string) => {
    await createCountdown(name, date);
    setShowCountdownForm(false);
  };

  const handleUploadImage = async (file: File) => {
    await uploadFeaturedImage(file);
    setShowImageUpload(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading Living Room...</p>
        </div>
      </div>
    );
  }

  if (!livingRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center">
          <p className="text-warmth-700">Living room not found</p>
        </div>
      </div>
    );
  }

  return (
    <RoomContainer>
      {/* Header - floating at top */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between animate-appear">
        <h1 className="font-decorative text-3xl text-warmth-900 drop-shadow-sm">
          Living Room
        </h1>
        <Button onClick={handleSignOut} variant="outline" size="sm">
          Sign Out
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute top-20 left-4 right-4 z-10 bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg text-sm animate-appear">
          {error}
        </div>
      )}

      {/* Room Scene */}
      <LivingRoomScene
        featuredImageUrl={livingRoom.featured_image_url}
        countdowns={countdowns}
        onPictureFrameClick={() => setShowImageUpload(true)}
        onCalendarClick={() => setShowCountdownForm(true)}
      />

      {/* Image Upload Modal */}
      {showImageUpload && (
        <Modal onClose={() => setShowImageUpload(false)} title="Upload Featured Image">
          <ImageUpload
            onUpload={handleUploadImage}
            onCancel={() => setShowImageUpload(false)}
          />
        </Modal>
      )}

      {/* Countdown Management Modal */}
      {showCountdownForm && (
        <Modal onClose={() => setShowCountdownForm(false)} title="Manage Countdowns">
          <div className="space-y-6">
            {/* Countdown Form */}
            <CountdownForm
              onSubmit={handleCreateCountdown}
              onCancel={() => setShowCountdownForm(false)}
            />

            {/* Existing Countdowns */}
            {countdowns.length > 0 && (
              <div>
                <h3 className="font-decorative text-lg text-warmth-900 mb-3">
                  Your Countdowns
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {countdowns.map((countdown) => (
                    <CountdownCard
                      key={countdown.id}
                      countdown={countdown}
                      onDelete={deleteCountdown}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </RoomContainer>
  );
}
