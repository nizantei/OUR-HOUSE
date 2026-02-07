export interface SVGElementConfig {
  x: number;
  y: number;
  width?: number;
  height?: number;
  scale?: number;
  color: string;
  opacity?: number;
  rx?: number;
}

export interface RoomColors {
  wall: string;
  wallOpacity: number;
  floor: string;
  accent: string;
}

export interface BaseRoomConfig {
  viewBox: string;
  colors: RoomColors;
}
