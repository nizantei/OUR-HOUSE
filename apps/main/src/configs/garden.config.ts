import type { BaseRoomConfig } from './types';

export interface GardenConfig extends BaseRoomConfig {
  sky: {
    gradient: { top: string; bottom: string };
    height: number;
  };
  sun: {
    cx: number;
    cy: number;
    r: number;
    color: string;
    glowColor: string;
    glowR: number;
  };
  clouds: { cx: number; cy: number; scale: number }[];
  ground: {
    grassY: number;
    grassColor: string;
    soilColor: string;
    gardenBed: { x: number; y: number; width: number; height: number; color: string; borderColor: string };
  };
  fence: {
    y: number;
    postColor: string;
    railColor: string;
    postWidth: number;
    postHeight: number;
    postSpacing: number;
    count: number;
    startX: number;
  };
  plant: {
    x: number;
    y: number;
  };
  flowerBed: {
    startX: number;
    startY: number;
    spacing: number;
    maxPerRow: number;
  };
}

export const gardenConfig: GardenConfig = {
  viewBox: '0 0 1000 600',
  colors: {
    wall: '#87CEEB',
    wallOpacity: 1,
    floor: '#7CB342',
    accent: '#4CAF50',
  },
  sky: {
    gradient: { top: '#87CEEB', bottom: '#B3E5FC' },
    height: 350,
  },
  sun: {
    cx: 850,
    cy: 80,
    r: 45,
    color: '#FFD54F',
    glowColor: '#FFF9C4',
    glowR: 65,
  },
  clouds: [
    { cx: 150, cy: 60, scale: 1 },
    { cx: 500, cy: 90, scale: 0.8 },
    { cx: 750, cy: 50, scale: 0.6 },
  ],
  ground: {
    grassY: 350,
    grassColor: '#7CB342',
    soilColor: '#8D6E63',
    gardenBed: {
      x: 100,
      y: 380,
      width: 800,
      height: 180,
      color: '#6D4C41',
      borderColor: '#5D4037',
    },
  },
  fence: {
    y: 300,
    postColor: '#A1887F',
    railColor: '#8D6E63',
    postWidth: 12,
    postHeight: 80,
    postSpacing: 80,
    count: 12,
    startX: 20,
  },
  plant: {
    x: 500,
    y: 340,
  },
  flowerBed: {
    startX: 150,
    startY: 430,
    spacing: 80,
    maxPerRow: 8,
  },
};
