import type { BaseRoomConfig } from './types';

export interface PrivateRoomConfig extends BaseRoomConfig {
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  defaultElementSize: {
    width: number;
    height: number;
  };
  minScale: number;
  maxScale: number;
}

export const privateRoomConfig: PrivateRoomConfig = {
  viewBox: '0 0 1000 600',
  colors: {
    wall: '#E8D5C4',
    wallOpacity: 0.3,
    floor: '#D4B896',
    accent: '#A0826D',
  },
  bounds: {
    minX: 10,
    minY: 10,
    maxX: 990,
    maxY: 590,
  },
  defaultElementSize: {
    width: 80,
    height: 80,
  },
  minScale: 0.3,
  maxScale: 3.0,
};
