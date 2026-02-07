import { useEffect } from 'react';
import type { RoomElement } from '@our-house/shared/types';
import { useSVGDrag } from '../../../hooks/useSVGDrag';
import { privateRoomConfig } from '../../../configs/privateRoom.config';
import { renderFurnitureSVG } from './furniture/furnitureLibrary';

interface DraggableElementProps {
  element: RoomElement;
  svgRef: React.RefObject<SVGSVGElement | null>;
  isSelected: boolean;
  onSelect: () => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

export function DraggableElement({
  element,
  svgRef,
  isSelected,
  onSelect,
  onDragEnd,
}: DraggableElementProps) {
  const { width, height } = privateRoomConfig.defaultElementSize;

  const { x, y, isDragging, setPosition, dragHandlers } = useSVGDrag(
    element.position_x,
    element.position_y,
    {
      svgRef,
      bounds: privateRoomConfig.bounds,
      onDragEnd: (newX, newY) => onDragEnd(element.id, newX, newY),
    }
  );

  // Sync position when element data updates externally (e.g. real-time)
  useEffect(() => {
    if (!isDragging) {
      setPosition(element.position_x, element.position_y);
    }
  }, [element.position_x, element.position_y]);

  const scaledW = width * element.scale;
  const scaledH = height * element.scale;
  const content = renderFurnitureSVG(element.asset_id);

  return (
    <g
      {...dragHandlers}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={isDragging ? 'opacity-80' : ''}
    >
      {/* Selection indicator - blue outline around the element */}
      {isSelected && (
        <rect
          x={x - 4}
          y={y - 4}
          width={scaledW + 8}
          height={scaledH + 8}
          rx={4}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={2}
          strokeDasharray="6,3"
        />
      )}

      {/* Furniture SVG at the element's position/scale/rotation */}
      <g
        transform={`translate(${x}, ${y}) rotate(${element.rotation}, ${scaledW / 2}, ${scaledH / 2}) scale(${element.scale})`}
      >
        {content}
      </g>
    </g>
  );
}
