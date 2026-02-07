import { motion } from 'framer-motion';
import { WaterDrops } from './WaterDrops';
import { gardenConfig } from '../../../configs/garden.config';

interface WateringCanProps {
  onWater: () => void;
  canWater: boolean;
  isWatering: boolean;
}

export function WateringCan({ onWater, canWater, isWatering }: WateringCanProps) {
  const { plant } = gardenConfig;
  const canX = plant.x + 120;
  const canY = plant.y - 30;

  return (
    <g
      transform={`translate(${canX}, ${canY})`}
      onClick={canWater ? onWater : undefined}
      style={{ cursor: canWater ? 'pointer' : 'default' }}
      role="button"
      aria-label={canWater ? 'Water the plant' : 'Cannot water right now'}
    >
      <motion.g
        animate={{
          rotate: isWatering ? -35 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ transformOrigin: '0px 0px' }}
      >
        {/* Can body */}
        <rect
          x={-20}
          y={-15}
          width={40}
          height={30}
          rx={4}
          fill={canWater ? '#78909C' : '#B0BEC5'}
          opacity={canWater ? 1 : 0.5}
        />

        {/* Handle */}
        <circle
          cx={-22}
          cy={-8}
          r={10}
          fill="none"
          stroke={canWater ? '#546E7A' : '#90A4AE'}
          strokeWidth={3}
          opacity={canWater ? 1 : 0.5}
        />

        {/* Spout */}
        <polygon
          points="20,-15 45,-30 48,-26 22,-12"
          fill={canWater ? '#607D8B' : '#B0BEC5'}
          opacity={canWater ? 1 : 0.5}
        />

        {/* Spout holes (dots) */}
        <circle cx={46} cy={-28} r={1.5} fill={canWater ? '#546E7A' : '#90A4AE'} opacity={canWater ? 0.8 : 0.4} />
        <circle cx={44} cy={-25} r={1.5} fill={canWater ? '#546E7A' : '#90A4AE'} opacity={canWater ? 0.8 : 0.4} />
        <circle cx={48} cy={-25} r={1.5} fill={canWater ? '#546E7A' : '#90A4AE'} opacity={canWater ? 0.8 : 0.4} />

        {/* Water band decoration */}
        <rect
          x={-18}
          y={-5}
          width={36}
          height={4}
          rx={1}
          fill={canWater ? '#42A5F5' : '#90CAF9'}
          opacity={canWater ? 0.7 : 0.3}
        />

        {/* Water drops from spout */}
        <g transform="translate(47, -24)">
          <WaterDrops active={isWatering} />
        </g>
      </motion.g>
    </g>
  );
}
