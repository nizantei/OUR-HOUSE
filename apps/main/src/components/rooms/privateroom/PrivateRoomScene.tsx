import { Wall } from '../core/Wall';
import { Floor } from '../core/Floor';
import { DraggableElement } from './DraggableElement';
import { FurnitureSVG } from './furniture/FurnitureSVG';
import { privateRoomConfig } from '../../../configs/privateRoom.config';
import type { RoomElement } from '@our-house/shared/types';

interface PrivateRoomSceneProps {
  elements: RoomElement[];
  isEditing: boolean;
  selectedElementId: string | null;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onElementClick: (id: string) => void;
  onElementDragEnd: (id: string, x: number, y: number) => void;
}

export function PrivateRoomScene({
  elements,
  isEditing,
  selectedElementId,
  svgRef,
  onElementClick,
  onElementDragEnd,
}: PrivateRoomSceneProps) {
  const { colors } = privateRoomConfig;
  const sorted = [...elements].sort((a, b) => a.z_index - b.z_index);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label="Private Room illustration"
    >
      <Wall color={colors.wall} opacity={colors.wallOpacity} />
      <Floor color={colors.floor} />

      {sorted.map((element) =>
        isEditing ? (
          <DraggableElement
            key={element.id}
            element={element}
            svgRef={svgRef}
            isSelected={element.id === selectedElementId}
            onSelect={() => onElementClick(element.id)}
            onDragEnd={onElementDragEnd}
          />
        ) : (
          <FurnitureSVG
            key={element.id}
            assetId={element.asset_id}
            x={element.position_x}
            y={element.position_y}
            scale={element.scale}
            rotation={element.rotation}
          />
        )
      )}

      {isEditing && elements.length === 0 && (
        <text x="500" y="300" textAnchor="middle" fill="#A0826D" fontSize="18" opacity="0.6">
          Tap "Add Furniture" to start decorating!
        </text>
      )}
    </svg>
  );
}
