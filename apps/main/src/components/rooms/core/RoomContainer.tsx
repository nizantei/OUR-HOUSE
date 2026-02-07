import type { ReactNode } from 'react';
import { RoomNavMenu } from '../shared/RoomNavMenu';

interface RoomContainerProps {
  children: ReactNode;
  bottomPanel?: ReactNode;
}

export function RoomContainer({ children, bottomPanel }: RoomContainerProps) {
  return (
    <div className="min-h-[100dvh] bg-warmth-50 flex flex-col">
      {/* Scene area - fills width, auto height via SVG aspect ratio */}
      <div className="w-full max-w-5xl mx-auto relative flex-shrink-0">
        {children}
      </div>

      {/* Bottom panel - scrollable area below scene on mobile */}
      {bottomPanel && (
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 overflow-y-auto">
          {bottomPanel}
        </div>
      )}

      {/* Floating Room Navigation Menu */}
      <RoomNavMenu />
    </div>
  );
}
