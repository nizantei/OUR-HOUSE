import { create } from 'zustand';
import type { PrivateRoom, RoomElement } from '@our-house/shared/types';

interface PrivateRoomState {
  privateRoom: PrivateRoom | null;
  elements: RoomElement[];
  isEditing: boolean;
  selectedElementId: string | null;
  loading: boolean;
  error: string | null;
  setPrivateRoom: (room: PrivateRoom | null) => void;
  setElements: (elements: RoomElement[]) => void;
  addElement: (element: RoomElement) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, changes: Partial<RoomElement>) => void;
  setIsEditing: (editing: boolean) => void;
  setSelectedElementId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const usePrivateRoomStore = create<PrivateRoomState>((set) => ({
  privateRoom: null,
  elements: [],
  isEditing: false,
  selectedElementId: null,
  loading: false,
  error: null,
  setPrivateRoom: (privateRoom) => set({ privateRoom }),
  setElements: (elements) => set({ elements }),
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  removeElement: (id) => set((state) => ({
    elements: state.elements.filter((e) => e.id !== id),
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
  })),
  updateElement: (id, changes) => set((state) => ({
    elements: state.elements.map((e) => e.id === id ? { ...e, ...changes } : e),
  })),
  setIsEditing: (isEditing) => set({ isEditing, selectedElementId: isEditing ? null : null }),
  setSelectedElementId: (selectedElementId) => set({ selectedElementId }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    privateRoom: null, elements: [], isEditing: false, selectedElementId: null, loading: false, error: null,
  }),
}));
