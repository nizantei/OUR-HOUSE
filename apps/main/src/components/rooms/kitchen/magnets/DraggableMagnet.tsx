import { useEffect } from 'react';
import type { Magnet } from '@our-house/shared/types';
import { useSVGDrag } from '../../../../hooks/useSVGDrag';
import { renderMagnetSVG } from './magnetLibrary';

interface DraggableMagnetProps {
  magnet: Magnet;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onDragEnd: (id: string, x: number, y: number) => void;
}

const FRIDGE_BOUNDS = { minX: 360, minY: 150, maxX: 620, maxY: 510 };

export function DraggableMagnet({ magnet, svgRef, onDragEnd }: DraggableMagnetProps) {
  const { x, y, isDragging, setPosition, dragHandlers } = useSVGDrag(
    magnet.position_x,
    magnet.position_y,
    {
      svgRef,
      bounds: FRIDGE_BOUNDS,
      onDragEnd: (newX, newY) => onDragEnd(magnet.id, newX, newY),
    }
  );

  useEffect(() => {
    if (!isDragging) {
      setPosition(magnet.position_x, magnet.position_y);
    }
  }, [magnet.position_x, magnet.position_y]);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      {...dragHandlers}
      className={isDragging ? 'opacity-80' : ''}
    >
      {renderMagnetSVG(magnet.magnet_type)}
    </g>
  );
}
