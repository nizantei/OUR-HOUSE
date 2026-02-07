interface NoteColorPickerProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const NOTE_COLORS = [
  { color: '#FFF9C4', label: 'Yellow' },
  { color: '#F8BBD0', label: 'Pink' },
  { color: '#C8E6C9', label: 'Green' },
  { color: '#BBDEFB', label: 'Blue' },
  { color: '#E1BEE7', label: 'Purple' },
  { color: '#FFE0B2', label: 'Orange' },
];

export function NoteColorPicker({ selectedColor, onSelect }: NoteColorPickerProps) {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm text-warmth-700 font-medium">Color:</span>
      <div className="flex gap-2">
        {NOTE_COLORS.map(({ color, label }) => (
          <button
            key={color}
            type="button"
            aria-label={`${label} sticky note`}
            onClick={() => onSelect(color)}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
              selectedColor === color
                ? 'border-warmth-800 scale-110 ring-2 ring-warmth-400'
                : 'border-warmth-300'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export { NOTE_COLORS };
