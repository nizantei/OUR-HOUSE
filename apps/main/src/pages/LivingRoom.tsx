import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@our-house/shared/lib/supabase';
import { useHouseStore } from '../store/houseStore';
import { useLivingRoomStore } from '../store/livingRoomStore';
import { useCountdowns } from '../hooks/useCountdowns';
import { useFeaturedImage } from '../hooks/useFeaturedImage';
import { useAuth } from '../hooks/useAuth';
import type { LivingRoom as LivingRoomType, User } from '@our-house/shared/types';
import { Button } from '../components/ui/Button';
import { CountdownCard } from '../components/livingroom/CountdownCard';
import { CountdownForm } from '../components/livingroom/CountdownForm';
import { FeaturedImage } from '../components/livingroom/FeaturedImage';
import { ImageUpload } from '../components/livingroom/ImageUpload';
import { RoomNavigation } from '../components/livingroom/RoomNavigation';

export function LivingRoom() {
  const navigate = useNavigate();
  const { house } = useHouseStore();
  const { livingRoom, setLivingRoom, setLoading, loading, error } = useLivingRoomStore();
  const { signOut } = useAuth();
  const [showCountdownForm, setShowCountdownForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [users, setUsers] = useState<{ user1: User | null; user2: User | null }>({
    user1: null,
    user2: null,
  });

  const { countdowns, createCountdown, deleteCountdown } = useCountdowns(livingRoom?.id);
  const { uploadFeaturedImage } = useFeaturedImage(livingRoom?.id);

  useEffect(() => {
    if (house) {
      fetchLivingRoom();
      fetchUsers();
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

  const fetchUsers = async () => {
    if (!house) return;

    try {
      const { data: user1Data } = await supabase
        .from('users')
        .select('*')
        .eq('id', house.user_1)
        .single();

      let user2Data = null;
      if (house.user_2) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', house.user_2)
          .single();
        user2Data = data;
      }

      setUsers({
        user1: user1Data as User | null,
        user2: user2Data as User | null,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
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
    <div className="min-h-screen bg-warmth-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-appear">
          <h1 className="font-decorative text-4xl text-warmth-900">
            Living Room
          </h1>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            Sign Out
          </Button>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6 text-sm animate-appear">
            {error}
          </div>
        )}

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured Image Section */}
          <section className="animate-appear">
            <h2 className="font-decorative text-2xl text-warmth-900 mb-4">
              Featured Image
            </h2>
            {showImageUpload ? (
              <ImageUpload
                onUpload={handleUploadImage}
                onCancel={() => setShowImageUpload(false)}
              />
            ) : (
              <FeaturedImage
                livingRoom={livingRoom}
                users={users}
                onChangeImage={() => setShowImageUpload(true)}
              />
            )}
          </section>

          {/* Countdowns Section */}
          <section className="animate-appear" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-decorative text-2xl text-warmth-900">
                Countdowns
              </h2>
              {!showCountdownForm && (
                <Button
                  onClick={() => setShowCountdownForm(true)}
                  size="sm"
                >
                  New Countdown
                </Button>
              )}
            </div>

            {showCountdownForm && (
              <div className="mb-6">
                <CountdownForm
                  onSubmit={handleCreateCountdown}
                  onCancel={() => setShowCountdownForm(false)}
                />
              </div>
            )}

            {countdowns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countdowns.map((countdown) => (
                  <CountdownCard
                    key={countdown.id}
                    countdown={countdown}
                    onDelete={deleteCountdown}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-warmth-100 rounded-lg shadow-soft p-8 text-center border border-warmth-200">
                <div className="text-4xl mb-3">⏰</div>
                <p className="text-warmth-600">
                  No countdowns yet. Create one to mark a special date!
                </p>
              </div>
            )}
          </section>

          {/* Room Navigation Section */}
          <section className="animate-appear" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-decorative text-2xl text-warmth-900 mb-4">
              Other Rooms
            </h2>
            <RoomNavigation />
          </section>
        </div>
      </div>
    </div>
  );
}
