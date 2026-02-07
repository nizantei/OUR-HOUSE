import { useRef, useState, useEffect, useCallback } from 'react';

interface DoodleNoteEditorProps {
  initialImageUrl?: string;
  onSave: (imageBlob: Blob) => void;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  size: number;
}

const PALETTE_COLORS = [
  { color: '#000000', label: 'Black' },
  { color: '#795548', label: 'Brown' },
  { color: '#E07A5F', label: 'Terracotta' },
  { color: '#D4A0A0', label: 'Rose' },
  { color: '#FFDAB9', label: 'Peach' },
  { color: '#4CAF50', label: 'Green' },
  { color: '#2196F3', label: 'Blue' },
  { color: '#9C27B0', label: 'Purple' },
  { color: '#FFD700', label: 'Gold' },
  { color: '#FFFFFF', label: 'Eraser' },
];

const BRUSH_SIZES = [
  { size: 2, label: 'Small' },
  { size: 5, label: 'Medium' },
  { size: 10, label: 'Large' },
];

const MAX_UNDO_HISTORY = 20;

export function DoodleNoteEditor({ initialImageUrl, onSave }: DoodleNoteEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const undoStackRef = useRef<Stroke[][]>([]);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);

  const getCanvasCoords = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background image if present
    if (backgroundImageRef.current) {
      ctx.drawImage(backgroundImageRef.current, 0, 0, canvas.width, canvas.height);
    }

    // Draw all committed strokes
    for (const stroke of strokesRef.current) {
      drawStroke(ctx, stroke);
    }

    // Draw current in-progress stroke
    if (currentStrokeRef.current) {
      drawStroke(ctx, currentStrokeRef.current);
    }
  }, []);

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Use composite operation for eraser
    if (stroke.color === '#FFFFFF') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.stroke();

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  // Load initial image if provided
  useEffect(() => {
    if (initialImageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        backgroundImageRef.current = img;
        redrawCanvas();
      };
      img.src = initialImageUrl;
    } else {
      redrawCanvas();
    }
  }, [initialImageUrl, redrawCanvas]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.setPointerCapture(e.pointerId);
      setIsDrawing(true);

      const point = getCanvasCoords(e);
      currentStrokeRef.current = {
        points: [point],
        color: selectedColor,
        size: brushSize,
      };
    },
    [selectedColor, brushSize, getCanvasCoords]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !currentStrokeRef.current) return;

      const point = getCanvasCoords(e);
      currentStrokeRef.current.points.push(point);
      redrawCanvas();
    },
    [isDrawing, getCanvasCoords, redrawCanvas]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !currentStrokeRef.current) return;

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.releasePointerCapture(e.pointerId);
      }

      setIsDrawing(false);

      // Commit current stroke
      const completedStroke = currentStrokeRef.current;
      currentStrokeRef.current = null;

      if (completedStroke.points.length >= 2) {
        // Save undo state (before adding stroke)
        undoStackRef.current = [
          ...undoStackRef.current.slice(-MAX_UNDO_HISTORY + 1),
          [...strokesRef.current],
        ];

        strokesRef.current = [...strokesRef.current, completedStroke];
        redrawCanvas();
      }
    },
    [isDrawing, redrawCanvas]
  );

  const handleUndo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const previousState = undoStackRef.current[undoStackRef.current.length - 1];
    undoStackRef.current = undoStackRef.current.slice(0, -1);
    strokesRef.current = previousState;
    redrawCanvas();
  }, [redrawCanvas]);

  const handleClear = useCallback(() => {
    // Save undo state before clearing
    undoStackRef.current = [
      ...undoStackRef.current.slice(-MAX_UNDO_HISTORY + 1),
      [...strokesRef.current],
    ];

    strokesRef.current = [];
    backgroundImageRef.current = null;
    redrawCanvas();
  }, [redrawCanvas]);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onSave(blob);
        }
      },
      'image/png',
      1.0
    );
  }, [onSave]);

  return (
    <div className="flex flex-col gap-4">
      {/* Canvas */}
      <div className="relative border-2 border-warmth-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full aspect-square cursor-crosshair"
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </div>

      {/* Color palette */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-warmth-700 font-medium w-full mb-1">Colors:</span>
        {PALETTE_COLORS.map(({ color, label }) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            aria-label={label}
            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
              selectedColor === color
                ? 'border-warmth-800 scale-110 ring-2 ring-warmth-400'
                : 'border-warmth-300'
            } ${color === '#FFFFFF' ? 'bg-white' : ''}`}
            style={{
              backgroundColor: color,
              // Eraser: show a diagonal line pattern to differentiate from white
              ...(color === '#FFFFFF' && label === 'Eraser'
                ? {
                    backgroundImage:
                      'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)',
                    backgroundSize: '6px 6px',
                  }
                : {}),
            }}
          />
        ))}
      </div>

      {/* Brush sizes */}
      <div className="flex gap-3 items-center">
        <span className="text-sm text-warmth-700 font-medium">Brush:</span>
        {BRUSH_SIZES.map(({ size, label }) => (
          <button
            key={size}
            type="button"
            onClick={() => setBrushSize(size)}
            aria-label={`${label} brush`}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-colors ${
              brushSize === size
                ? 'border-warmth-700 bg-warmth-100'
                : 'border-warmth-300 hover:border-warmth-400'
            }`}
          >
            <div
              className="rounded-full bg-warmth-800"
              style={{ width: size * 2, height: size * 2 }}
            />
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleUndo}
          disabled={undoStackRef.current.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
            text-warmth-700 bg-warmth-100 hover:bg-warmth-200 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L2 8L4 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 8H10C12.2091 8 14 9.79086 14 12V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Undo
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
            text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
        >
          Clear
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium
            text-white bg-warmth-700 hover:bg-warmth-800 transition-colors"
        >
          Save Drawing
        </button>
      </div>
    </div>
  );
}
