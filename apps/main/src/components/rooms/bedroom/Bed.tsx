import { bedroomConfig } from '../../../configs/bedroom.config';

export function Bed() {
  const { headboard, mattress, pillow1, pillow2, blanket } = bedroomConfig.bed;

  // Blanket covers the lower portion of the mattress with a wavy top edge
  const blanketY = mattress.y + 30;
  const blanketBottom = mattress.y + mattress.height;
  const blanketLeft = mattress.x;
  const blanketRight = mattress.x + mattress.width;

  return (
    <g className="bed">
      {/* Headboard - dark wood with rounded top */}
      <rect
        x={headboard.x}
        y={headboard.y}
        width={headboard.width}
        height={headboard.height}
        rx={headboard.rx}
        fill={headboard.color}
      />
      {/* Headboard top arch for decorative rounded shape */}
      <path
        d={`M${headboard.x},${headboard.y + 20} Q${headboard.x + headboard.width / 2},${headboard.y - 10} ${headboard.x + headboard.width},${headboard.y + 20}`}
        fill={headboard.color}
      />
      {/* Headboard wood grain hint */}
      <line
        x1={headboard.x + 40}
        y1={headboard.y + 20}
        x2={headboard.x + 40}
        y2={headboard.y + headboard.height}
        stroke="#7D6150"
        strokeWidth={0.5}
        opacity={0.3}
      />
      <line
        x1={headboard.x + headboard.width - 40}
        y1={headboard.y + 20}
        x2={headboard.x + headboard.width - 40}
        y2={headboard.y + headboard.height}
        stroke="#7D6150"
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* Mattress */}
      <rect
        x={mattress.x}
        y={mattress.y}
        width={mattress.width}
        height={mattress.height}
        rx={mattress.rx}
        fill={mattress.color}
      />
      {/* Mattress subtle shadow at top where headboard meets */}
      <rect
        x={mattress.x}
        y={mattress.y}
        width={mattress.width}
        height={6}
        fill="#00000008"
        rx={2}
      />

      {/* Pillow 1 (left) */}
      <rect
        x={pillow1.x}
        y={pillow1.y}
        width={pillow1.width}
        height={pillow1.height}
        rx={pillow1.rx}
        fill={pillow1.color}
      />
      {/* Pillow 1 puffiness */}
      <ellipse
        cx={pillow1.x + pillow1.width / 2}
        cy={pillow1.y + pillow1.height / 2}
        rx={pillow1.width / 2 - 8}
        ry={pillow1.height / 2 - 4}
        fill="#FFFFFF"
        opacity={0.3}
      />

      {/* Pillow 2 (right) */}
      <rect
        x={pillow2.x}
        y={pillow2.y}
        width={pillow2.width}
        height={pillow2.height}
        rx={pillow2.rx}
        fill={pillow2.color}
      />
      {/* Pillow 2 puffiness */}
      <ellipse
        cx={pillow2.x + pillow2.width / 2}
        cy={pillow2.y + pillow2.height / 2}
        rx={pillow2.width / 2 - 8}
        ry={pillow2.height / 2 - 4}
        fill="#FFFFFF"
        opacity={0.3}
      />

      {/* Draped blanket with wavy top edge */}
      <path
        d={`
          M${blanketLeft},${blanketY}
          Q${blanketLeft + 60},${blanketY - 12}
           ${blanketLeft + 100},${blanketY + 4}
          Q${blanketLeft + 160},${blanketY + 16}
           ${blanketLeft + 200},${blanketY - 2}
          Q${blanketLeft + 260},${blanketY - 14}
           ${blanketLeft + 300},${blanketY + 2}
          Q${blanketLeft + 360},${blanketY + 14}
           ${blanketRight},${blanketY}
          L${blanketRight},${blanketBottom}
          L${blanketLeft},${blanketBottom}
          Z
        `}
        fill={blanket.color}
      />
      {/* Blanket accent fold line */}
      <path
        d={`
          M${blanketLeft},${blanketY + 20}
          Q${blanketLeft + 80},${blanketY + 10}
           ${blanketLeft + 200},${blanketY + 22}
          Q${blanketLeft + 320},${blanketY + 32}
           ${blanketRight},${blanketY + 18}
        `}
        stroke={blanket.accentColor}
        strokeWidth={1.5}
        fill="none"
        opacity={0.5}
      />
      {/* Blanket bottom edge shadow */}
      <rect
        x={blanketLeft}
        y={blanketBottom - 4}
        width={mattress.width}
        height={4}
        fill={blanket.accentColor}
        opacity={0.3}
        rx={2}
      />
    </g>
  );
}
