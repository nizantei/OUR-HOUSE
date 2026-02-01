import type { ReactNode } from 'react';

interface RoomSceneProps {
  children: ReactNode;
  roomType?: string;
}

export function RoomScene({ children, roomType }: RoomSceneProps) {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label={`${roomType || 'Room'} illustration`}
    >
      {children}
    </svg>
  );
}
