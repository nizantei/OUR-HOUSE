import { livingRoomConfig } from '../../../configs/livingRoom.config';

export function Plant() {
  const { origin, pot, soil, leaves } = livingRoomConfig.plant;

  return (
    <g className="plant animate-breathe" style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}>
      <path d={pot.path} fill={pot.color} />
      <ellipse cx={soil.cx} cy={soil.cy} rx={soil.rx} ry={soil.ry} fill={soil.color} />
      <ellipse
        cx={leaves.left.cx}
        cy={leaves.left.cy}
        rx={leaves.left.rx}
        ry={leaves.left.ry}
        fill={leaves.left.color}
        transform={`rotate(${leaves.left.rotation} ${leaves.left.cx} ${leaves.left.cy})`}
      />
      <rect
        x={leaves.center.x}
        y={leaves.center.y}
        width={leaves.center.width}
        height={leaves.center.height}
        rx={leaves.center.rx}
        fill={leaves.center.color}
      />
      <ellipse
        cx={leaves.right.cx}
        cy={leaves.right.cy}
        rx={leaves.right.rx}
        ry={leaves.right.ry}
        fill={leaves.right.color}
        transform={`rotate(${leaves.right.rotation} ${leaves.right.cx} ${leaves.right.cy})`}
      />
      <ellipse
        cx={leaves.top.cx}
        cy={leaves.top.cy}
        rx={leaves.top.rx}
        ry={leaves.top.ry}
        fill={leaves.top.color}
      />
    </g>
  );
}
