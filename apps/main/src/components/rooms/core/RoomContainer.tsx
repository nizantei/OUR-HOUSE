import type { ReactNode } from 'react';
import { RoomNavMenu } from '../shared/RoomNavMenu';

interface RoomContainerProps {
  children: ReactNode;
}

export function RoomContainer({ children }: RoomContainerProps) {
  return (
    <div className="min-h-screen bg-warmth-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl aspect-[5/3] relative">
          {children}
        </div>
      </div>

      {/* Floating Room Navigation Menu */}
      <RoomNavMenu />
    </div>
  );
}
