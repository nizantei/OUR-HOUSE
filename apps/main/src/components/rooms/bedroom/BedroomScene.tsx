import { Wall } from '../core/Wall';
import { Floor } from '../core/Floor';
import { Rug } from './Rug';
import { Bed } from './Bed';
import { Nightstand } from './Nightstand';
import { Lamp } from './Lamp';
import { BedroomWindow } from './BedroomWindow';
import { WrappedGift } from './gifts/WrappedGift';
import { bedroomConfig } from '../../../configs/bedroom.config';
import type { Present } from '@our-house/shared/types';

interface BedroomSceneProps {
  presents: Present[];
  onPresentClick: (id: string) => void;
}

export function BedroomScene({ presents, onPresentClick }: BedroomSceneProps) {
  const { colors, giftArea } = bedroomConfig;

  // Limit visible presents to maxVisible from config
  const visiblePresents = presents.slice(0, giftArea.maxVisible);

  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label="Bedroom illustration"
    >
      {/* Background layers */}
      <Wall color={colors.wall} opacity={colors.wallOpacity} />
      <Floor color={colors.floor} />

      {/* Rug on the floor in front of the bed */}
      <Rug />

      {/* Window with night sky and curtains */}
      <BedroomWindow />

      {/* Bed centered in the room */}
      <Bed />

      {/* Nightstand beside the bed */}
      <Nightstand />

      {/* Lamp on the nightstand */}
      <Lamp />

      {/* Wrapped gifts near the bed */}
      {visiblePresents.map((present, index) => (
        <WrappedGift
          key={present.id}
          present={present}
          index={index}
          onClick={() => onPresentClick(present.id)}
        />
      ))}
    </svg>
  );
}
