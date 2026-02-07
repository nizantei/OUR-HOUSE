import { useRef, useState } from 'react';
import { useHouseStore } from '../store/houseStore';
import { useGallery } from '../hooks/useGallery';
import { useWallImages } from '../hooks/useWallImages';
import { useAlbums } from '../hooks/useAlbums';
import { RoomContainer } from '../components/rooms/core/RoomContainer';
import { GalleryScene } from '../components/rooms/gallery/GalleryScene';
import { AlbumViewer } from '../components/rooms/gallery/AlbumViewer';
import { Modal } from '../components/rooms/shared/Modal';
import { Button } from '../components/ui/Button';
import { galleryConfig } from '../configs/gallery.config';
import type { Album } from '@our-house/shared/types';

export function Gallery() {
  const { house } = useHouseStore();
  const { gallery, loading } = useGallery(house?.id);
  const { wallImages, uploadWallImage, updateImagePosition, deleteWallImage } = useWallImages(gallery?.id);
  const {
    albums,
    currentAlbumPhotos,
    createAlbum,
    deleteAlbum,
    fetchAlbumPhotos,
    uploadPhoto,
    deletePhoto,
  } = useAlbums(gallery?.id);

  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [showUploadToWall, setShowUploadToWall] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  const handleFrameClick = (slotIndex: number) => {
    // Check if the frame slot already has an image
    const slot = galleryConfig.frameSlots[slotIndex];
    const existing = wallImages.find(
      (img) => img.position_x === slot.x && img.position_y === slot.y
    );
    if (!existing) {
      // Open file picker for this empty frame
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            await uploadWallImage(file, { x: slot.x, y: slot.y });
          } catch (err) {
            console.error('Error uploading wall image:', err);
          }
        }
      };
      input.click();
    }
  };

  const handleAlbumClick = async (album: Album) => {
    await fetchAlbumPhotos(album.id);
    setSelectedAlbum(album);
  };

  const handleUploadToWall = () => {
    // Find the first empty frame slot
    const emptySlot = galleryConfig.frameSlots.find((slot) =>
      !wallImages.some((img) => img.position_x === slot.x && img.position_y === slot.y)
    );

    if (!emptySlot) {
      alert('All frame slots are full!');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          await uploadWallImage(file, { x: emptySlot.x, y: emptySlot.y });
        } catch (err) {
          console.error('Error uploading wall image:', err);
        }
      }
    };
    input.click();
  };

  const handleCreateAlbum = async () => {
    if (!newAlbumName.trim()) return;
    try {
      await createAlbum(newAlbumName.trim());
      setNewAlbumName('');
      setShowCreateAlbum(false);
    } catch (err) {
      console.error('Error creating album:', err);
    }
  };

  const handleUploadPhotoToAlbum = async (file: File, caption?: string) => {
    if (!selectedAlbum) return;
    try {
      await uploadPhoto(selectedAlbum.id, file, caption);
    } catch (err) {
      console.error('Error uploading photo:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center">
          <p className="text-warmth-700">Gallery not found</p>
        </div>
      </div>
    );
  }

  const bottomPanel = (
    <div className="space-y-4 animate-appear">
      <h1 className="font-decorative text-2xl text-warmth-900">Gallery</h1>

      <div className="flex gap-3">
        <Button onClick={handleUploadToWall} variant="primary" size="sm">
          Upload to Wall
        </Button>
        <Button onClick={() => setShowCreateAlbum(true)} variant="outline" size="sm">
          Create Album
        </Button>
      </div>

      {albums.length > 0 && (
        <div>
          <h3 className="font-decorative text-lg text-warmth-900 mb-2">
            Albums ({albums.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => handleAlbumClick(album)}
                className="p-3 rounded-lg bg-warmth-100 text-left text-sm transition-colors hover:bg-warmth-200"
              >
                <span className="text-warmth-900 font-medium truncate block">
                  {album.name}
                </span>
                <span className="text-warmth-500 text-xs mt-1 block">
                  {new Date(album.created_at).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RoomContainer bottomPanel={bottomPanel}>
      <GalleryScene
        wallImages={wallImages}
        albums={albums}
        svgRef={svgRef}
        onFrameClick={handleFrameClick}
        onAlbumClick={handleAlbumClick}
        onImageDragEnd={updateImagePosition}
        onDeleteImage={deleteWallImage}
      />

      {selectedAlbum && (
        <AlbumViewer
          album={selectedAlbum}
          photos={currentAlbumPhotos}
          onClose={() => setSelectedAlbum(null)}
          onUploadPhoto={handleUploadPhotoToAlbum}
          onDeletePhoto={deletePhoto}
          onDeleteAlbum={async () => {
            await deleteAlbum(selectedAlbum.id);
            setSelectedAlbum(null);
          }}
        />
      )}

      {showCreateAlbum && (
        <Modal onClose={() => { setShowCreateAlbum(false); setNewAlbumName(''); }} title="Create Album">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="album-name"
                className="block text-warmth-700 text-sm font-medium mb-2"
              >
                Album Name
              </label>
              <input
                id="album-name"
                type="text"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                placeholder="e.g., Summer Vacation"
                className="w-full px-4 py-2 rounded-lg border-2 border-warmth-300 bg-white text-warmth-900 placeholder-warmth-400 focus:outline-none focus:border-warmth-500 transition-colors"
                maxLength={100}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateAlbum();
                }}
                autoFocus
              />
            </div>
            <Button
              onClick={handleCreateAlbum}
              variant="primary"
              fullWidth
              disabled={!newAlbumName.trim()}
            >
              Create
            </Button>
          </div>
        </Modal>
      )}
    </RoomContainer>
  );
}
