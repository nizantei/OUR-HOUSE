import { Wall } from '../core/Wall';
import { Floor } from '../core/Floor';
import { Fridge } from './Fridge';
import { Counter } from './Counter';
import { KitchenWindow } from './KitchenWindow';
import { DraggableMagnet } from './magnets/DraggableMagnet';
import { DraggableStickyNote } from './notes/DraggableStickyNote';
import { kitchenConfig } from '../../../configs/kitchen.config';
import type { StickyNote, Magnet } from '@our-house/shared/types';

interface KitchenSceneProps {
  stickyNotes: StickyNote[];
  magnets: Magnet[];
  svgRef: React.RefObject<SVGSVGElement | null>;
  onNoteClick: (id: string) => void;
  onMagnetDragEnd: (id: string, x: number, y: number) => void;
  onNoteDragEnd: (id: string, x: number, y: number) => void;
}

export function KitchenScene({
  stickyNotes,
  magnets,
  svgRef,
  onNoteClick,
  onMagnetDragEnd,
  onNoteDragEnd,
}: KitchenSceneProps) {
  const { colors } = kitchenConfig;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Kitchen illustration"
    >
      {/* Background layers */}
      <Wall color={colors.wall} opacity={colors.wallOpacity} />
      <Floor color={colors.floor} />

      {/* Window on the left */}
      <KitchenWindow />

      {/* Fridge in the center */}
      <Fridge />

      {/* Counter on the right */}
      <Counter />

      {/* Magnets on the fridge surface */}
      {magnets.map((magnet) => (
        <DraggableMagnet
          key={magnet.id}
          magnet={magnet}
          svgRef={svgRef}
          onDragEnd={onMagnetDragEnd}
        />
      ))}

      {/* Sticky notes on the fridge surface */}
      {stickyNotes.map((note) => (
        <DraggableStickyNote
          key={note.id}
          note={note}
          svgRef={svgRef}
          onClick={onNoteClick}
          onDragEnd={onNoteDragEnd}
        />
      ))}
    </svg>
  );
}
