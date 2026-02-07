import { useEffect } from 'react';
import { StickyNote } from './StickyNote';
import { useSVGDrag } from '../../../../hooks/useSVGDrag';
import type { StickyNote as StickyNoteType } from '@our-house/shared/types';

interface DraggableStickyNoteProps {
  note: StickyNoteType;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onClick: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

// Fridge surface constraints (from kitchen config)
const FRIDGE_BOUNDS = {
  minX: 360,
  minY: 150,
  maxX: 640,
  maxY: 530,
};

// Minimum drag distance (in SVG units) to distinguish a click from a drag
const CLICK_THRESHOLD = 3;

export function DraggableStickyNote({
  note,
  svgRef,
  onClick,
  onDragEnd,
}: DraggableStickyNoteProps) {
  const { x, y, isDragging, setPosition, dragHandlers } = useSVGDrag(
    note.position_x,
    note.position_y,
    {
      svgRef,
      bounds: FRIDGE_BOUNDS,
      onDragEnd: (newX: number, newY: number) => {
        onDragEnd(note.id, newX, newY);
      },
    }
  );

  // Sync position if note updates externally (real-time)
  useEffect(() => {
    if (!isDragging) {
      setPosition(note.position_x, note.position_y);
    }
  }, [note.position_x, note.position_y, isDragging, setPosition]);

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = Math.abs(x - note.position_x);
    const dy = Math.abs(y - note.position_y);

    // If the note barely moved, treat it as a click
    if (dx < CLICK_THRESHOLD && dy < CLICK_THRESHOLD) {
      onClick(note.id);
    }

    dragHandlers.onPointerUp(e);
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{
        ...dragHandlers.style,
        zIndex: note.z_index,
      }}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={handlePointerUp}
    >
      <StickyNote note={note} onClick={() => onClick(note.id)} />
    </g>
  );
}
