import type { ReactNode } from 'react';
import { RoomNavMenu } from '../shared/RoomNavMenu';

interface RoomContainerProps {
  children: ReactNode;
  bottomPanel?: ReactNode;
}

export function RoomContainer({ children, bottomPanel }: RoomContainerProps) {
  return (
    <div className="h-[100dvh] bg-warmth-50 flex flex-col overflow-hidden">
      {/* Scene area - fills all available vertical space */}
      <div className="flex-1 min-h-0 w-full overflow-hidden relative">
        {children}
      </div>

      {/* Bottom panel - compact bar at bottom */}
      {bottomPanel && (
        <div className="flex-shrink-0 w-full bg-warmth-50/95 backdrop-blur-sm border-t border-warmth-200 px-4 py-3 max-h-[28vh] overflow-y-auto">
          {bottomPanel}
        </div>
      )}

      {/* Floating Room Navigation Menu */}
      <RoomNavMenu />
    </div>
  );
}
