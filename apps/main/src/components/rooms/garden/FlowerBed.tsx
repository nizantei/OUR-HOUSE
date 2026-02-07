import { gardenConfig } from '../../../configs/garden.config';
import { FlowerSVG } from './FlowerSVG';
import type { Flower } from '@our-house/shared/types';

interface FlowerBedProps {
  flowers: Flower[];
}

export function FlowerBed({ flowers }: FlowerBedProps) {
  const { flowerBed } = gardenConfig;

  return (
    <g>
      {flowers.map((flower, i) => {
        const row = Math.floor(i / flowerBed.maxPerRow);
        const col = i % flowerBed.maxPerRow;
        const x = flower.position_x || flowerBed.startX + col * flowerBed.spacing;
        const y = flower.position_y || flowerBed.startY + row * flowerBed.spacing;

        return (
          <FlowerSVG
            key={flower.id}
            flowerType={flower.flower_type}
            x={x}
            y={y}
            scale={0.9}
          />
        );
      })}
    </g>
  );
}
