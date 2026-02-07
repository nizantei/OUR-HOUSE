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

  const bottomPanel = (
    <div className="space-y-4 animate-appear">
      <div className="flex items-center justify-between">
        <h1 className="font-decorative text-2xl text-warmth-900">Living Room</h1>
        <Button onClick={handleSignOut} variant="outline" size="sm">
          Sign Out
        </Button>
      </div>

      {error && (
        <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={() => setShowImageUpload(true)} variant="primary" size="sm">
          Upload Photo
        </Button>
        <Button onClick={() => setShowCountdownForm(true)} variant="outline" size="sm">
          Add Countdown
        </Button>
      </div>

      {countdowns.length > 0 && (
        <div>
          <h3 className="font-decorative text-lg text-warmth-900 mb-2">Countdowns</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  );

  return (
    <RoomContainer bottomPanel={bottomPanel}>
      <LivingRoomScene
        featuredImageUrl={livingRoom.featured_image_url}
        countdowns={countdowns}
        onPictureFrameClick={() => setShowImageUpload(true)}
        onCalendarClick={() => setShowCountdownForm(true)}
      />

      {showImageUpload && (
        <Modal onClose={() => setShowImageUpload(false)} title="Upload Featured Image">
          <ImageUpload
            onUpload={handleUploadImage}
            onCancel={() => setShowImageUpload(false)}
          />
        </Modal>
      )}

      {showCountdownForm && (
        <Modal onClose={() => setShowCountdownForm(false)} title="Manage Countdowns">
          <div className="space-y-6">
            <CountdownForm
              onSubmit={handleCreateCountdown}
              onCancel={() => setShowCountdownForm(false)}
            />
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
