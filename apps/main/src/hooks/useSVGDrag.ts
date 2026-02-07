import { useCallback, useRef, useState } from 'react';

interface UseSVGDragOptions {
  svgRef: React.RefObject<SVGSVGElement | null>;
  onDragEnd?: (x: number, y: number) => void;
  bounds?: { minX: number; minY: number; maxX: number; maxY: number };
  debounceMs?: number;
}

interface DragState {
  isDragging: boolean;
  x: number;
  y: number;
}

function screenToSVG(svg: SVGSVGElement, clientX: number, clientY: number) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const svgPt = pt.matrixTransform(ctm.inverse());
  return { x: svgPt.x, y: svgPt.y };
}

export function useSVGDrag(initialX: number, initialY: number, options: UseSVGDragOptions) {
  const { svgRef, onDragEnd, bounds } = options;
  const [state, setState] = useState<DragState>({ isDragging: false, x: initialX, y: initialY });
  const offsetRef = useRef({ dx: 0, dy: 0 });
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const clamp = useCallback((x: number, y: number) => {
    if (!bounds) return { x, y };
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    };
  }, [bounds]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const svg = svgRef.current;
    if (!svg) return;

    const svgPt = screenToSVG(svg, e.clientX, e.clientY);
    offsetRef.current = { dx: svgPt.x - state.x, dy: svgPt.y - state.y };
    setState((s) => ({ ...s, isDragging: true }));

    (e.target as Element).setPointerCapture(e.pointerId);
  }, [svgRef, state.x, state.y]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!state.isDragging) return;
    const svg = svgRef.current;
    if (!svg) return;

    const svgPt = screenToSVG(svg, e.clientX, e.clientY);
    const newPos = clamp(svgPt.x - offsetRef.current.dx, svgPt.y - offsetRef.current.dy);
    setState((s) => ({ ...s, x: newPos.x, y: newPos.y }));
  }, [state.isDragging, svgRef, clamp]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!state.isDragging) return;
    setState((s) => ({ ...s, isDragging: false }));

    if (onDragEnd) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        onDragEnd(state.x, state.y);
      }, 300);
    }
  }, [state.isDragging, state.x, state.y, onDragEnd]);

  const setPosition = useCallback((x: number, y: number) => {
    setState((s) => ({ ...s, x, y }));
  }, []);

  return {
    x: state.x,
    y: state.y,
    isDragging: state.isDragging,
    setPosition,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      style: { touchAction: 'none' as const, cursor: state.isDragging ? 'grabbing' : 'grab' },
    },
  };
}
