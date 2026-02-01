import type { LivingRoom, User } from '@our-house/shared/types';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

interface FeaturedImageProps {
  livingRoom: LivingRoom;
  users: { user1: User | null; user2: User | null };
  onChangeImage: () => void;
}

export function FeaturedImage({ livingRoom, users, onChangeImage }: FeaturedImageProps) {
  const { user } = useAuthStore();

  const getUploader = () => {
    if (!livingRoom.featured_image_uploaded_by) return null;

    if (user?.id === livingRoom.featured_image_uploaded_by) {
      return 'You';
    }

    // Find the partner
    const partner = users.user1?.id === user?.id ? users.user2 : users.user1;
    return partner?.display_name || 'Your partner';
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!livingRoom.featured_image_url) {
    return (
      <div className="bg-warmth-100 rounded-2xl shadow-soft border-2 border-dashed border-warmth-300 p-12 text-center">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="font-decorative text-2xl text-warmth-900 mb-3">
          No Featured Image Yet
        </h3>
        <p className="text-warmth-700 mb-6">
          Upload a special photo to share with your partner
        </p>
        <Button onClick={onChangeImage}>
          Upload Image
        </Button>
      </div>
    );
  }

  const uploader = getUploader();
  const uploadDate = formatDate(livingRoom.featured_image_uploaded_at);

  return (
    <div className="bg-warmth-100 rounded-2xl shadow-soft overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={livingRoom.featured_image_url}
          alt="Featured"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {uploader && uploadDate && (
              <p className="text-warmth-600 text-sm">
                {uploader} shared this on {uploadDate}
              </p>
            )}
          </div>
          <Button size="sm" onClick={onChangeImage}>
            Change Image
          </Button>
        </div>
      </div>
    </div>
  );
}
