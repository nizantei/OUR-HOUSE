import { renderFurnitureSVG } from './furnitureLibrary';
import { privateRoomConfig } from '../../../../configs/privateRoom.config';

interface FurnitureSVGProps {
  assetId: string;
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
}

export function FurnitureSVG({
  assetId,
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
}: FurnitureSVGProps) {
  const { width, height } = privateRoomConfig.defaultElementSize;
  const content = renderFurnitureSVG(assetId);

  if (!content) return null;

  // The furniture renderers return <svg> elements with viewBox="0 0 80 80".
  // We wrap them in a <g> with translate/rotate/scale so they can be placed
  // freely inside the room's SVG coordinate space.
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}, ${width * scale / 2}, ${height * scale / 2}) scale(${scale})`}
    >
      {content}
    </g>
  );
}
