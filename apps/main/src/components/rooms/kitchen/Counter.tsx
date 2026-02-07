import { kitchenConfig } from '../../../configs/kitchen.config';

export function Counter() {
  const { top, body, accent } = kitchenConfig.counter;

  return (
    <g className="counter">
      {/* Counter body */}
      <rect
        x={body.x}
        y={body.y}
        width={body.width}
        height={body.height}
        fill={body.color}
      />

      {/* Countertop */}
      <rect
        x={top.x}
        y={top.y}
        width={top.width}
        height={top.height}
        rx={top.rx}
        fill={top.color}
      />

      {/* Cabinet door lines */}
      <line
        x1={body.x + body.width / 2}
        y1={body.y + 10}
        x2={body.x + body.width / 2}
        y2={body.y + body.height - 10}
        stroke={accent}
        strokeWidth={1.5}
      />

      {/* Cabinet knobs */}
      <circle
        cx={body.x + body.width / 2 - 15}
        cy={body.y + body.height / 2}
        r={3}
        fill={accent}
      />
      <circle
        cx={body.x + body.width / 2 + 15}
        cy={body.y + body.height / 2}
        r={3}
        fill={accent}
      />

      {/* Mug on countertop */}
      <g className="mug" transform={`translate(${top.x + 40}, ${top.y - 28})`}>
        <rect x={0} y={8} width={18} height={20} rx={3} fill="#D4A574" />
        <path
          d="M18,12 C24,12 24,24 18,24"
          fill="none"
          stroke="#D4A574"
          strokeWidth={2}
        />
        <ellipse cx={9} cy={8} rx={9} ry={3} fill="#C49464" />
      </g>

      {/* Utensil holder on countertop */}
      <g className="utensil-holder" transform={`translate(${top.x + top.width - 60}, ${top.y - 45})`}>
        {/* Holder body */}
        <rect x={0} y={15} width={24} height={30} rx={4} fill="#8B7355" />
        <ellipse cx={12} cy={15} rx={12} ry={4} fill="#7D6658" />
        {/* Utensils sticking out */}
        <line x1={6} y1={0} x2={6} y2={15} stroke="#A9A9A9" strokeWidth={2} strokeLinecap="round" />
        <line x1={12} y1={2} x2={12} y2={15} stroke="#A9A9A9" strokeWidth={2} strokeLinecap="round" />
        <line x1={18} y1={1} x2={18} y2={15} stroke="#A9A9A9" strokeWidth={2} strokeLinecap="round" />
      </g>
    </g>
  );
}
