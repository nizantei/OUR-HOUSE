import type { BaseRoomConfig } from './types';

export interface BedroomConfig extends BaseRoomConfig {
  bed: {
    headboard: { x: number; y: number; width: number; height: number; color: string; rx: number };
    mattress: { x: number; y: number; width: number; height: number; color: string; rx: number };
    pillow1: { x: number; y: number; width: number; height: number; color: string; rx: number };
    pillow2: { x: number; y: number; width: number; height: number; color: string; rx: number };
    blanket: { color: string; accentColor: string };
  };
  nightstand: {
    body: { x: number; y: number; width: number; height: number; color: string; rx: number };
    top: { color: string };
    drawer: { color: string; handleColor: string };
  };
  lamp: {
    base: { cx: number; cy: number; rx: number; ry: number; color: string };
    stem: { x: number; y: number; width: number; height: number; color: string };
    shade: { cx: number; cy: number; rx: number; ry: number; color: string };
    glow: { cx: number; cy: number; r: number; color: string; opacity: number };
  };
  window: {
    frame: { x: number; y: number; width: number; height: number; color: string; rx: number };
    nightSky: string;
    moonColor: string;
    starColor: string;
  };
  curtains: {
    color: string;
    width: number;
  };
  rug: {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    color: string;
    borderColor: string;
  };
  giftArea: {
    startX: number;
    startY: number;
    spacing: number;
    maxVisible: number;
  };
}

export const bedroomConfig: BedroomConfig = {
  viewBox: '0 0 1000 600',
  colors: {
    wall: '#E8D5E0',
    wallOpacity: 0.3,
    floor: '#C9A882',
    accent: '#D4A0A0',
  },
  bed: {
    headboard: { x: 250, y: 250, width: 400, height: 80, color: '#8B6F5E', rx: 10 },
    mattress: { x: 250, y: 320, width: 400, height: 120, color: '#F5F0EB', rx: 6 },
    pillow1: { x: 290, y: 280, width: 100, height: 50, color: '#FFF8F0', rx: 12 },
    pillow2: { x: 510, y: 280, width: 100, height: 50, color: '#FFF8F0', rx: 12 },
    blanket: { color: '#D4A0A0', accentColor: '#C48B8B' },
  },
  nightstand: {
    body: { x: 700, y: 360, width: 80, height: 80, color: '#8B6F5E', rx: 4 },
    top: { color: '#7D6658' },
    drawer: { color: '#A0826D', handleColor: '#D4A574' },
  },
  lamp: {
    base: { cx: 740, cy: 360, rx: 20, ry: 6, color: '#C17B4B' },
    stem: { x: 737, y: 310, width: 6, height: 50, color: '#D4A574' },
    shade: { cx: 740, cy: 300, rx: 30, ry: 18, color: '#FFF3E0' },
    glow: { cx: 740, cy: 340, r: 80, color: '#FFF8E1', opacity: 0.2 },
  },
  window: {
    frame: { x: 60, y: 100, width: 160, height: 200, color: '#F5E6D3', rx: 6 },
    nightSky: '#1A237E',
    moonColor: '#FFF9C4',
    starColor: '#FFFFFF',
  },
  curtains: {
    color: '#D4A0A0',
    width: 30,
  },
  rug: {
    cx: 450,
    cy: 510,
    rx: 180,
    ry: 50,
    color: '#D4A0A0',
    borderColor: '#C48B8B',
  },
  giftArea: {
    startX: 280,
    startY: 450,
    spacing: 70,
    maxVisible: 5,
  },
};
