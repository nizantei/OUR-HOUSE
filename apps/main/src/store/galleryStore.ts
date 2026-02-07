import { create } from 'zustand';
import type { Gallery, WallImage, Album, Photo } from '@our-house/shared/types';

interface GalleryState {
  gallery: Gallery | null;
  wallImages: WallImage[];
  albums: Album[];
  currentAlbumPhotos: Photo[];
  loading: boolean;
  error: string | null;
  setGallery: (gallery: Gallery | null) => void;
  setWallImages: (images: WallImage[]) => void;
  addWallImage: (image: WallImage) => void;
  removeWallImage: (id: string) => void;
  updateWallImage: (id: string, changes: Partial<WallImage>) => void;
  setAlbums: (albums: Album[]) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (id: string) => void;
  setCurrentAlbumPhotos: (photos: Photo[]) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  gallery: null,
  wallImages: [],
  albums: [],
  currentAlbumPhotos: [],
  loading: false,
  error: null,
  setGallery: (gallery) => set({ gallery }),
  setWallImages: (wallImages) => set({ wallImages }),
  addWallImage: (image) => set((state) => ({ wallImages: [...state.wallImages, image] })),
  removeWallImage: (id) => set((state) => ({ wallImages: state.wallImages.filter((i) => i.id !== id) })),
  updateWallImage: (id, changes) => set((state) => ({
    wallImages: state.wallImages.map((i) => i.id === id ? { ...i, ...changes } : i),
  })),
  setAlbums: (albums) => set({ albums }),
  addAlbum: (album) => set((state) => ({ albums: [...state.albums, album] })),
  removeAlbum: (id) => set((state) => ({ albums: state.albums.filter((a) => a.id !== id) })),
  setCurrentAlbumPhotos: (currentAlbumPhotos) => set({ currentAlbumPhotos }),
  addPhoto: (photo) => set((state) => ({ currentAlbumPhotos: [...state.currentAlbumPhotos, photo] })),
  removePhoto: (id) => set((state) => ({ currentAlbumPhotos: state.currentAlbumPhotos.filter((p) => p.id !== id) })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ gallery: null, wallImages: [], albums: [], currentAlbumPhotos: [], loading: false, error: null }),
}));
