import { livingRoomConfig } from '../../../configs/livingRoom.config';

export function SideTable() {
  const { top, leg, base } = livingRoomConfig.sideTable;

  return (
    <g className="side-table">
      <ellipse cx={top.cx} cy={top.cy} rx={top.rx} ry={top.ry} fill={top.color} />
      <rect x={leg.x} y={leg.y} width={leg.width} height={leg.height} fill={leg.color} />
      <ellipse cx={base.cx} cy={base.cy} rx={base.rx} ry={base.ry} fill={base.color} />
    </g>
  );
}
