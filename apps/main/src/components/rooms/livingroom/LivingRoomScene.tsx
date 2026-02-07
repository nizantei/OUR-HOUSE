import { RoomScene } from '../core/RoomScene';
import { Wall } from '../core/Wall';
import { Floor } from '../core/Floor';
import { Couch } from './Couch';
import { SideTable } from './SideTable';
import { Plant } from './Plant';
import { PictureFrame } from './PictureFrame';
import { CountdownCalendar } from './CountdownCalendar';
import { livingRoomConfig } from '../../../configs/livingRoom.config';
import type { Countdown } from '@our-house/shared/types';

interface LivingRoomSceneProps {
  featuredImageUrl?: string;
  countdowns: Countdown[];
  onPictureFrameClick: () => void;
  onCalendarClick: () => void;
}

export function LivingRoomScene({
  featuredImageUrl,
  countdowns,
  onPictureFrameClick,
  onCalendarClick,
}: LivingRoomSceneProps) {
  const { colors } = livingRoomConfig;

  return (
    <RoomScene roomType="Living Room">
      <Wall color={colors.wall} opacity={colors.wallOpacity} />
      <Floor color={colors.floor} />
      <Couch />
      <SideTable />
      <Plant />
      <PictureFrame imageUrl={featuredImageUrl} onClick={onPictureFrameClick} />
      <CountdownCalendar countdowns={countdowns} onClick={onCalendarClick} />
    </RoomScene>
  );
}
