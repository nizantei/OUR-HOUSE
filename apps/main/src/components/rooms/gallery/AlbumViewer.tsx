import { useState, useEffect, useMemo, useCallback } from 'react';
import { PhotoUpload } from './PhotoUpload';
import type { Album, Photo } from '@our-house/shared/types';

const PHOTOS_PER_PAGE = 6;

// Deterministic "random" values seeded by photo id so layout is stable across re-renders
function seededValue(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const normalized = (Math.abs(hash) % 1000) / 1000;
  return min + normalized * (max - min);
}

interface AlbumViewerProps {
  album: Album;
  photos: Photo[];
  onClose: () => void;
  onUpload: (file: File, caption?: string) => void;
}

export function AlbumViewer({ album, photos, onClose, onUpload }: AlbumViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const totalPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));

  const currentPhotos = useMemo(
    () => photos.slice(currentPage * PHOTOS_PER_PAGE, (currentPage + 1) * PHOTOS_PER_PAGE),
    [photos, currentPage],
  );

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showUpload) {
          setShowUpload(false);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, showUpload]);

  // Arrow key navigation
  useEffect(() => {
    const handleArrows = (e: KeyboardEvent) => {
      if (showUpload) return;
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        setCurrentPage((p) => p - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        setCurrentPage((p) => p + 1);
      }
    };
    document.addEventListener('keydown', handleArrows);
    return () => document.removeEventListener('keydown', handleArrows);
  }, [currentPage, totalPages, showUpload]);

  const handleUpload = useCallback(
    (file: File, caption?: string) => {
      onUpload(file, caption);
      setShowUpload(false);
    },
    [onUpload],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

      {/* Album container */}
      <div
        className="relative w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-appear"
        style={{
          background: 'linear-gradient(135deg, #FFF8E7 0%, #F5E6C8 50%, #EDE0C8 100%)',
          animationDelay: '0.1s',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-warmth-200/50">
          <h2 className="font-decorative text-2xl text-warmth-900">{album.name}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-warmth-200/50 transition-colors text-warmth-600 hover:text-warmth-900"
            aria-label="Close album"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Photo grid / upload area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {showUpload ? (
            <PhotoUpload
              onUpload={handleUpload}
              onCancel={() => setShowUpload(false)}
            />
          ) : currentPhotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {currentPhotos.map((photo) => {
                const rotation = seededValue(photo.id, -5, 5);
                const scale = seededValue(photo.id + 's', 0.95, 1.05);
                return (
                  <div
                    key={photo.id}
                    className="flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:z-10"
                    style={{
                      transform: `rotate(${rotation}deg) scale(${scale})`,
                    }}
                  >
                    {/* Polaroid-style card */}
                    <div
                      className="bg-white rounded-sm shadow-md"
                      style={{
                        padding: '10px 10px 6px 10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Photo'}
                        className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-sm"
                        loading="lazy"
                      />
                      {/* White padding bottom area for caption */}
                      <div className="pt-2 pb-2 text-center min-h-[28px]">
                        {photo.caption && (
                          <p
                            className="text-xs text-warmth-700 font-handwriting leading-tight"
                            style={{ fontStyle: 'italic' }}
                          >
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-warmth-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">No photos yet</p>
              <p className="text-sm mt-1">Upload the first photo to this album.</p>
            </div>
          )}
        </div>

        {/* Footer: pagination + upload button */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-warmth-200/50">
          {/* Page navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 0}
              className="p-1.5 rounded-full hover:bg-warmth-200/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-warmth-700"
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-warmth-600">
              {photos.length > 0
                ? `Page ${currentPage + 1} of ${totalPages}`
                : 'Empty album'}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 rounded-full hover:bg-warmth-200/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-warmth-700"
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Upload button */}
          {!showUpload && (
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-warmth-700 text-warmth-50 hover:bg-warmth-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Upload Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
