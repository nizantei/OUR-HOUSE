import { bedroomConfig } from '../../../../configs/bedroom.config';
import { renderGiftSVG } from './giftLibrary';
import type { Present } from '@our-house/shared/types';

interface WrappedGiftProps {
  present: Present;
  index: number;
  onClick: () => void;
}

export function WrappedGift({ present, index, onClick }: WrappedGiftProps) {
  const { giftArea } = bedroomConfig;
  const x = giftArea.startX + index * giftArea.spacing;
  const y = giftArea.startY;

  // Box dimensions
  const boxWidth = 50;
  const boxHeight = 44;
  const bx = x;
  const by = y;

  if (present.opened) {
    // Render the opened gift (gift_subtype SVG or a generic heart icon)
    const giftId = present.gift_subtype;

    return (
      <g
        className="opened-gift"
        transform={`translate(${bx - 5}, ${by - 10})`}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        {/* Slight glow behind the opened gift */}
        <circle cx={30} cy={30} r={28} fill="#FFF9C4" opacity={0.15} />

        {giftId ? (
          <g transform="scale(1)">
            {renderGiftSVG(giftId)}
          </g>
        ) : (
          /* Generic open letter / heart icon */
          <g>
            <path
              d="M30,48 C20,40 8,30 8,20 C8,12 14,8 20,8 C25,8 30,13 30,16 C30,13 35,8 40,8 C46,8 52,12 52,20 C52,30 40,40 30,48 Z"
              fill="#E57373"
            />
            <ellipse cx={20} cy={18} rx={4} ry={3} fill="#EF9A9A" opacity={0.5} />
          </g>
        )}
      </g>
    );
  }

  // Render wrapped/unopened present with breathe animation
  return (
    <g
      className="wrapped-gift"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Breathe animation wrapper */}
      <g transform={`translate(${bx + boxWidth / 2}, ${by + boxHeight / 2})`}>
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.04;1"
          dur="3s"
          repeatCount="indefinite"
          additive="sum"
        />
        <g transform={`translate(${-boxWidth / 2}, ${-boxHeight / 2})`}>
          {/* Gift box shadow */}
          <rect
            x={2}
            y={4}
            width={boxWidth}
            height={boxHeight}
            rx={4}
            fill="#00000010"
          />

          {/* Gift box body */}
          <rect
            x={0}
            y={10}
            width={boxWidth}
            height={boxHeight - 10}
            rx={4}
            fill="#D4A0A0"
          />

          {/* Gift box lid */}
          <rect
            x={-3}
            y={6}
            width={boxWidth + 6}
            height={10}
            rx={3}
            fill="#C48B8B"
          />

          {/* Ribbon vertical */}
          <rect
            x={boxWidth / 2 - 3}
            y={6}
            width={6}
            height={boxHeight - 2}
            fill="#E57373"
            opacity={0.7}
          />

          {/* Ribbon horizontal */}
          <rect
            x={-3}
            y={8}
            width={boxWidth + 6}
            height={6}
            fill="#E57373"
            opacity={0.7}
          />

          {/* Bow - two loops and center */}
          <ellipse
            cx={boxWidth / 2 - 8}
            cy={6}
            rx={7}
            ry={5}
            fill="#EF5350"
            transform={`rotate(-20,${boxWidth / 2 - 8},6)`}
          />
          <ellipse
            cx={boxWidth / 2 + 8}
            cy={6}
            rx={7}
            ry={5}
            fill="#EF5350"
            transform={`rotate(20,${boxWidth / 2 + 8},6)`}
          />
          <circle cx={boxWidth / 2} cy={6} r={4} fill="#C62828" />

          {/* "?" question mark tag */}
          <g transform={`translate(${boxWidth - 4}, ${-2})`}>
            <rect x={0} y={0} width={16} height={18} rx={3} fill="#FFF8E1" stroke="#FFE082" strokeWidth={0.8} />
            <text
              x={8}
              y={14}
              textAnchor="middle"
              fontSize={12}
              fontWeight="bold"
              fill="#C48B8B"
              fontFamily="serif"
            >
              ?
            </text>
          </g>
        </g>
      </g>
    </g>
  );
}
