import { Sky } from './Sky';
import { Ground } from './Ground';
import { Fence } from './Fence';
import { Plant } from './Plant';
import { FlowerBed } from './FlowerBed';
import { WateringCan } from './WateringCan';
import type { Flower } from '@our-house/shared/types';

interface GardenSceneProps {
  growthStage: number;
  isWatering: boolean;
  canWater: boolean;
  flowers: Flower[];
  onWater: () => void;
}

export function GardenScene({
  growthStage,
  isWatering,
  canWater,
  flowers,
  onWater,
}: GardenSceneProps) {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Garden illustration"
    >
      <Sky />
      <Ground />
      <Fence />
      <FlowerBed flowers={flowers} />
      <Plant growthStage={growthStage} />
      <WateringCan onWater={onWater} canWater={canWater} isWatering={isWatering} />
    </svg>
  );
}
