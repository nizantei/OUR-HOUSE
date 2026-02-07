import type { BaseRoomConfig } from './types';

export interface GalleryConfig extends BaseRoomConfig {
  wall: {
    texture: string;
    spotlightColor: string;
    spotlightOpacity: number;
  };
  frameSlots: { x: number; y: number; width: number; height: number }[];
  frameStyle: {
    borderWidth: number;
    borderColor: string;
    matColor: string;
    matWidth: number;
    shadowColor: string;
  };
  shelf: {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    supportColor: string;
  };
  albumSlots: { x: number; y: number }[];
  spotlights: { cx: number; cy: number; r: number }[];
}

export const galleryConfig: GalleryConfig = {
  viewBox: '0 0 1000 600',
  colors: {
    wall: '#4A3728',
    wallOpacity: 0.35,
    floor: '#5D4037',
    accent: '#D4A574',
  },
  wall: {
    texture: '#6D4C41',
    spotlightColor: '#FFF8E1',
    spotlightOpacity: 0.15,
  },
  frameSlots: [
    { x: 80, y: 60, width: 200, height: 160 },
    { x: 400, y: 40, width: 200, height: 200 },
    { x: 720, y: 60, width: 200, height: 160 },
    { x: 240, y: 260, width: 150, height: 120 },
    { x: 600, y: 260, width: 150, height: 120 },
  ],
  frameStyle: {
    borderWidth: 6,
    borderColor: '#D4A574',
    matColor: '#FFF8E1',
    matWidth: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  shelf: {
    x: 50,
    y: 480,
    width: 900,
    height: 16,
    color: '#8D6E63',
    supportColor: '#6D4C41',
  },
  albumSlots: [
    { x: 120, y: 440 },
    { x: 300, y: 440 },
    { x: 480, y: 440 },
    { x: 660, y: 440 },
    { x: 840, y: 440 },
  ],
  spotlights: [
    { cx: 180, cy: 0, r: 200 },
    { cx: 500, cy: 0, r: 220 },
    { cx: 820, cy: 0, r: 200 },
  ],
};
