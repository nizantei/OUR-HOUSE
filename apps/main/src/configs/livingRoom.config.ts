import type { BaseRoomConfig, SVGElementConfig } from './types';

export interface LivingRoomConfig extends BaseRoomConfig {
  couch: {
    back: SVGElementConfig & { width: number; height: number; rx: number };
    cushions: (SVGElementConfig & { width: number; height: number; rx: number })[];
  };
  sideTable: {
    top: { cx: number; cy: number; rx: number; ry: number; color: string };
    leg: SVGElementConfig & { width: number; height: number };
    base: { cx: number; cy: number; rx: number; ry: number; color: string };
  };
  plant: {
    origin: { x: number; y: number };
    pot: { path: string; color: string };
    soil: { cx: number; cy: number; rx: number; ry: number; color: string };
    leaves: {
      left: { cx: number; cy: number; rx: number; ry: number; rotation: number; color: string };
      center: SVGElementConfig & { width: number; height: number; rx: number };
      right: { cx: number; cy: number; rx: number; ry: number; rotation: number; color: string };
      top: { cx: number; cy: number; rx: number; ry: number; color: string };
    };
  };
  pictureFrame: { x: number; y: number };
  calendar: { x: number; y: number };
}

export const livingRoomConfig: LivingRoomConfig = {
  viewBox: '0 0 1000 600',
  colors: {
    wall: 'var(--living-room)',
    wallOpacity: 0.3,
    floor: 'var(--warmth-200)',
    accent: '#A0826D',
  },
  couch: {
    back: { x: 100, y: 380, width: 300, height: 80, rx: 8, color: '#8B7355', opacity: 0.8 },
    cushions: [
      { x: 120, y: 420, width: 80, height: 60, rx: 6, color: '#A0826D' },
      { x: 210, y: 420, width: 80, height: 60, rx: 6, color: '#A0826D' },
      { x: 300, y: 420, width: 80, height: 60, rx: 6, color: '#A0826D' },
    ],
  },
  sideTable: {
    top: { cx: 510, cy: 420, rx: 60, ry: 15, color: '#7D6658' },
    leg: { x: 505, y: 420, width: 10, height: 80, color: '#7D6658' },
    base: { cx: 510, cy: 500, rx: 25, ry: 8, color: '#7D6658' },
  },
  plant: {
    origin: { x: 640, y: 460 },
    pot: { path: 'M 620 500 L 600 540 L 680 540 L 660 500 Z', color: '#C17B4B' },
    soil: { cx: 640, cy: 500, rx: 20, ry: 6, color: '#8B5A3C' },
    leaves: {
      left: { cx: 625, cy: 480, rx: 15, ry: 30, rotation: -20, color: '#86A789' },
      center: { x: 637, y: 460, width: 6, height: 45, rx: 3, color: '#6B8E6F' },
      right: { cx: 655, cy: 470, rx: 15, ry: 30, rotation: 25, color: '#86A789' },
      top: { cx: 640, cy: 455, rx: 12, ry: 25, color: '#86A789' },
    },
  },
  pictureFrame: { x: 150, y: 100 },
  calendar: { x: 700, y: 80 },
};
