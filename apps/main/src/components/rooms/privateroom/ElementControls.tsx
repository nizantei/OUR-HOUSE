import type { RoomElement } from '@our-house/shared/types';
import { privateRoomConfig } from '../../../configs/privateRoom.config';

interface ElementControlsProps {
  element: RoomElement;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBack: () => void;
  onScaleChange: (scale: number) => void;
  onRotationChange: (rotation: number) => void;
}

export function ElementControls({
  element,
  onDelete,
  onBringForward,
  onSendBack,
  onScaleChange,
  onRotationChange,
}: ElementControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-warmth-50 border-t border-warmth-200 shadow-lg px-4 py-3 z-40 animate-appear">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Top row: action buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={onSendBack}
              className="px-3 py-1.5 text-sm font-medium bg-warmth-100 text-warmth-700 rounded-lg hover:bg-warmth-200 transition-colors"
            >
              Send Back
            </button>
            <button
              onClick={onBringForward}
              className="px-3 py-1.5 text-sm font-medium bg-warmth-100 text-warmth-700 rounded-lg hover:bg-warmth-200 transition-colors"
            >
              Bring Forward
            </button>
          </div>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>

        {/* Scale slider */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-warmth-700 w-16 shrink-0">
            Scale
          </label>
          <input
            type="range"
            min={privateRoomConfig.minScale}
            max={privateRoomConfig.maxScale}
            step={0.1}
            value={element.scale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
            className="flex-1 accent-warmth-500"
          />
          <span className="text-xs text-warmth-500 w-10 text-right">
            {element.scale.toFixed(1)}x
          </span>
        </div>

        {/* Rotation slider */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-warmth-700 w-16 shrink-0">
            Rotate
          </label>
          <input
            type="range"
            min={0}
            max={360}
            step={5}
            value={element.rotation}
            onChange={(e) => onRotationChange(parseInt(e.target.value, 10))}
            className="flex-1 accent-warmth-500"
          />
          <span className="text-xs text-warmth-500 w-10 text-right">
            {element.rotation}&deg;
          </span>
        </div>
      </div>
    </div>
  );
}
