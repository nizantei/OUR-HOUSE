import { bedroomConfig } from '../../../configs/bedroom.config';

export function BedroomWindow() {
  const { frame, nightSky, moonColor, starColor } = bedroomConfig.window;
  const { color: curtainColor, width: curtainWidth } = bedroomConfig.curtains;

  const glassX = frame.x + 6;
  const glassY = frame.y + 6;
  const glassWidth = frame.width - 12;
  const glassHeight = frame.height - 12;

  // Moon position (upper right of window)
  const moonCx = glassX + glassWidth - 30;
  const moonCy = glassY + 30;
  const moonR = 14;

  // Star positions scattered across the night sky
  const stars = [
    { x: glassX + 20, y: glassY + 20, r: 1.5 },
    { x: glassX + 50, y: glassY + 50, r: 1.2 },
    { x: glassX + 30, y: glassY + 80, r: 1.0 },
    { x: glassX + 80, y: glassY + 70, r: 1.3 },
    { x: glassX + 60, y: glassY + 120, r: 1.1 },
    { x: glassX + 100, y: glassY + 100, r: 1.4 },
  ];

  // Curtain paths - wavy draped fabric shapes
  const leftCurtainX = frame.x - curtainWidth / 2;
  const rightCurtainX = frame.x + frame.width - curtainWidth / 2;
  const curtainTop = frame.y - 10;
  const curtainBottom = frame.y + frame.height + 10;

  return (
    <g className="bedroom-window">
      {/* Window frame outer */}
      <rect
        x={frame.x}
        y={frame.y}
        width={frame.width}
        height={frame.height}
        rx={frame.rx}
        fill={frame.color}
      />

      {/* Night sky glass */}
      <rect
        x={glassX}
        y={glassY}
        width={glassWidth}
        height={glassHeight}
        rx={3}
        fill={nightSky}
      />

      {/* Crescent moon - a circle with an overlapping dark circle to create crescent */}
      <circle cx={moonCx} cy={moonCy} r={moonR} fill={moonColor} />
      <circle cx={moonCx + 6} cy={moonCy - 4} r={moonR - 2} fill={nightSky} />

      {/* Stars */}
      {stars.map((star, i) => (
        <g key={i}>
          <circle cx={star.x} cy={star.y} r={star.r} fill={starColor} opacity={0.9} />
          {/* Tiny cross sparkle effect */}
          <line
            x1={star.x - star.r * 1.5}
            y1={star.y}
            x2={star.x + star.r * 1.5}
            y2={star.y}
            stroke={starColor}
            strokeWidth={0.3}
            opacity={0.5}
          />
          <line
            x1={star.x}
            y1={star.y - star.r * 1.5}
            x2={star.x}
            y2={star.y + star.r * 1.5}
            stroke={starColor}
            strokeWidth={0.3}
            opacity={0.5}
          />
        </g>
      ))}

      {/* Window pane dividers (cross pattern) */}
      <line
        x1={glassX + glassWidth / 2}
        y1={glassY}
        x2={glassX + glassWidth / 2}
        y2={glassY + glassHeight}
        stroke={frame.color}
        strokeWidth={4}
      />
      <line
        x1={glassX}
        y1={glassY + glassHeight / 2}
        x2={glassX + glassWidth}
        y2={glassY + glassHeight / 2}
        stroke={frame.color}
        strokeWidth={4}
      />

      {/* Window sill */}
      <rect
        x={frame.x - 6}
        y={frame.y + frame.height}
        width={frame.width + 12}
        height={6}
        rx={2}
        fill={frame.color}
      />

      {/* Curtain rod */}
      <rect
        x={frame.x - curtainWidth - 4}
        y={curtainTop}
        width={frame.width + curtainWidth * 2 + 8}
        height={4}
        rx={2}
        fill="#8B6F5E"
      />

      {/* Left curtain - wavy draped path */}
      <path
        d={`
          M${leftCurtainX},${curtainTop + 4}
          L${leftCurtainX + curtainWidth + 10},${curtainTop + 4}
          Q${leftCurtainX + curtainWidth + 6},${curtainTop + 40}
           ${leftCurtainX + curtainWidth + 14},${curtainTop + 80}
          Q${leftCurtainX + curtainWidth + 4},${curtainTop + 120}
           ${leftCurtainX + curtainWidth + 12},${curtainTop + 160}
          Q${leftCurtainX + curtainWidth + 6},${curtainTop + 190}
           ${leftCurtainX + curtainWidth + 8},${curtainBottom}
          L${leftCurtainX - 4},${curtainBottom}
          Q${leftCurtainX + 2},${curtainTop + 180}
           ${leftCurtainX - 2},${curtainTop + 140}
          Q${leftCurtainX + 4},${curtainTop + 100}
           ${leftCurtainX},${curtainTop + 60}
          Z
        `}
        fill={curtainColor}
        opacity={0.8}
      />
      {/* Left curtain fold lines */}
      <path
        d={`
          M${leftCurtainX + curtainWidth / 2},${curtainTop + 4}
          Q${leftCurtainX + curtainWidth / 2 - 2},${curtainTop + 80}
           ${leftCurtainX + curtainWidth / 2 + 2},${curtainTop + 160}
          L${leftCurtainX + curtainWidth / 2 + 2},${curtainBottom}
        `}
        stroke="#C48B8B"
        strokeWidth={0.8}
        fill="none"
        opacity={0.4}
      />

      {/* Right curtain - wavy draped path */}
      <path
        d={`
          M${rightCurtainX + curtainWidth},${curtainTop + 4}
          L${rightCurtainX - 10},${curtainTop + 4}
          Q${rightCurtainX - 6},${curtainTop + 40}
           ${rightCurtainX - 14},${curtainTop + 80}
          Q${rightCurtainX - 4},${curtainTop + 120}
           ${rightCurtainX - 12},${curtainTop + 160}
          Q${rightCurtainX - 6},${curtainTop + 190}
           ${rightCurtainX - 8},${curtainBottom}
          L${rightCurtainX + curtainWidth + 4},${curtainBottom}
          Q${rightCurtainX + curtainWidth - 2},${curtainTop + 180}
           ${rightCurtainX + curtainWidth + 2},${curtainTop + 140}
          Q${rightCurtainX + curtainWidth - 4},${curtainTop + 100}
           ${rightCurtainX + curtainWidth},${curtainTop + 60}
          Z
        `}
        fill={curtainColor}
        opacity={0.8}
      />
      {/* Right curtain fold lines */}
      <path
        d={`
          M${rightCurtainX + curtainWidth / 2},${curtainTop + 4}
          Q${rightCurtainX + curtainWidth / 2 + 2},${curtainTop + 80}
           ${rightCurtainX + curtainWidth / 2 - 2},${curtainTop + 160}
          L${rightCurtainX + curtainWidth / 2 - 2},${curtainBottom}
        `}
        stroke="#C48B8B"
        strokeWidth={0.8}
        fill="none"
        opacity={0.4}
      />
    </g>
  );
}
