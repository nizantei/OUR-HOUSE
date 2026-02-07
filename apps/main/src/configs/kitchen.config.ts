import type { BaseRoomConfig } from './types';

export interface KitchenConfig extends BaseRoomConfig {
  fridge: {
    body: { x: number; y: number; width: number; height: number; color: string; rx: number };
    freezer: { x: number; y: number; width: number; height: number; color: string };
    door: { x: number; y: number; width: number; height: number; color: string };
    handle: { x: number; y1: number; y2: number; color: string; width: number };
    divider: { y: number; color: string };
    surface: { x: number; y: number; width: number; height: number };
  };
  counter: {
    top: { x: number; y: number; width: number; height: number; color: string; rx: number };
    body: { x: number; y: number; width: number; height: number; color: string };
    accent: string;
  };
  window: {
    frame: { x: number; y: number; width: number; height: number; color: string; rx: number };
    glass: { color: string };
    sill: { height: number; color: string };
    panes: number;
  };
}

export const kitchenConfig: KitchenConfig = {
  viewBox: '0 0 1000 600',
  colors: {
    wall: 'var(--kitchen)',
    wallOpacity: 0.25,
    floor: '#E8D5B7',
    accent: '#F5E6D3',
  },
  fridge: {
    body: { x: 350, y: 140, width: 300, height: 400, color: '#E8E8E8', rx: 8 },
    freezer: { x: 355, y: 145, width: 290, height: 120, color: '#F0F0F0' },
    door: { x: 355, y: 275, width: 290, height: 260, color: '#F5F5F5' },
    handle: { x: 630, y1: 200, y2: 240, color: '#C0C0C0', width: 4 },
    divider: { y: 270, color: '#D0D0D0' },
    surface: { x: 360, y: 150, width: 280, height: 380 },
  },
  counter: {
    top: { x: 700, y: 380, width: 280, height: 20, color: '#8B7355', rx: 4 },
    body: { x: 705, y: 400, width: 270, height: 140, color: '#A0826D' },
    accent: '#7D6658',
  },
  window: {
    frame: { x: 50, y: 100, width: 220, height: 180, color: '#F5E6D3', rx: 6 },
    glass: { color: '#87CEEB' },
    sill: { height: 12, color: '#D4A574' },
    panes: 4,
  },
};
