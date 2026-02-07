import { renderMagnetSVG } from './magnetLibrary';

interface MagnetSVGProps {
  magnetType: string;
  x?: number;
  y?: number;
  scale?: number;
}

export function MagnetSVG({ magnetType, x = 0, y = 0, scale = 1 }: MagnetSVGProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {renderMagnetSVG(magnetType)}
    </g>
  );
}
