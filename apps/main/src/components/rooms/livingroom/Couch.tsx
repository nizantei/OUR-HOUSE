import { livingRoomConfig } from '../../../configs/livingRoom.config';

export function Couch() {
  const { back, cushions } = livingRoomConfig.couch;

  return (
    <g className="couch">
      <rect
        x={back.x}
        y={back.y}
        width={back.width}
        height={back.height}
        rx={back.rx}
        fill={back.color}
        opacity={back.opacity}
      />
      {cushions.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={c.width}
          height={c.height}
          rx={c.rx}
          fill={c.color}
        />
      ))}
    </g>
  );
}
