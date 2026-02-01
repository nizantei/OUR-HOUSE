import { RoomScene } from '../core/RoomScene';
import { Wall } from '../core/Wall';
import { Floor } from '../core/Floor';
import { PictureFrame } from './PictureFrame';
import { CountdownCalendar } from './CountdownCalendar';
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
  return (
    <RoomScene roomType="Living Room">
      {/* Back wall */}
      <Wall color="var(--living-room)" />

      {/* Floor */}
      <Floor color="var(--warmth-200)" />

      {/* Decorative Couch */}
      <g className="couch">
        {/* Couch back */}
        <rect
          x="100"
          y="380"
          width="300"
          height="80"
          rx="8"
          fill="#8B7355"
          opacity="0.8"
        />
        {/* Left cushion */}
        <rect
          x="120"
          y="420"
          width="80"
          height="60"
          rx="6"
          fill="#A0826D"
        />
        {/* Middle cushion */}
        <rect
          x="210"
          y="420"
          width="80"
          height="60"
          rx="6"
          fill="#A0826D"
        />
        {/* Right cushion */}
        <rect
          x="300"
          y="420"
          width="80"
          height="60"
          rx="6"
          fill="#A0826D"
        />
      </g>

      {/* Side Table */}
      <g className="side-table">
        {/* Table top */}
        <ellipse
          cx="510"
          cy="420"
          rx="60"
          ry="15"
          fill="#7D6658"
        />
        {/* Table base/leg */}
        <rect
          x="505"
          y="420"
          width="10"
          height="80"
          fill="#7D6658"
        />
        <ellipse
          cx="510"
          cy="500"
          rx="25"
          ry="8"
          fill="#7D6658"
        />
      </g>

      {/* Plant with breathing animation */}
      <g className="plant animate-breathe" style={{ transformOrigin: '640px 460px' }}>
        {/* Pot */}
        <path
          d="M 620 500 L 600 540 L 680 540 L 660 500 Z"
          fill="#C17B4B"
        />
        {/* Soil */}
        <ellipse
          cx="640"
          cy="500"
          rx="20"
          ry="6"
          fill="#8B5A3C"
        />
        {/* Left leaf */}
        <ellipse
          cx="625"
          cy="480"
          rx="15"
          ry="30"
          fill="#86A789"
          transform="rotate(-20 625 480)"
        />
        {/* Center stem */}
        <rect
          x="637"
          y="460"
          width="6"
          height="45"
          rx="3"
          fill="#6B8E6F"
        />
        {/* Right leaf */}
        <ellipse
          cx="655"
          cy="470"
          rx="15"
          ry="30"
          fill="#86A789"
          transform="rotate(25 655 470)"
        />
        {/* Top leaf */}
        <ellipse
          cx="640"
          cy="455"
          rx="12"
          ry="25"
          fill="#86A789"
        />
      </g>

      {/* Picture Frame on wall */}
      <PictureFrame
        imageUrl={featuredImageUrl}
        onClick={onPictureFrameClick}
      />

      {/* Countdown Calendar on wall */}
      <CountdownCalendar
        countdowns={countdowns}
        onClick={onCalendarClick}
      />
    </RoomScene>
  );
}
