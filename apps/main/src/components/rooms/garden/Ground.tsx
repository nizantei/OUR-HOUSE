import { gardenConfig } from '../../../configs/garden.config';

export function Ground() {
  const { ground } = gardenConfig;
  const { gardenBed } = ground;

  return (
    <g>
      {/* Grass layer */}
      <rect
        x={0}
        y={ground.grassY}
        width={1000}
        height={600 - ground.grassY}
        fill={ground.grassColor}
      />

      {/* Soil undertone */}
      <rect
        x={0}
        y={ground.grassY + 40}
        width={1000}
        height={600 - ground.grassY - 40}
        fill={ground.soilColor}
        opacity={0.3}
      />

      {/* Garden bed */}
      <rect
        x={gardenBed.x}
        y={gardenBed.y}
        width={gardenBed.width}
        height={gardenBed.height}
        rx={8}
        ry={8}
        fill={gardenBed.color}
        stroke={gardenBed.borderColor}
        strokeWidth={3}
      />
    </g>
  );
}
