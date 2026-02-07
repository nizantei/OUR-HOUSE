import { useState } from 'react';
import { Modal } from '../../../../components/rooms/shared/Modal';
import {
  FURNITURE_CATEGORIES,
  furnitureDefinitions,
  getFurnitureByCategory,
  renderFurnitureSVG,
} from './furnitureLibrary';

interface FurniturePickerProps {
  onSelect: (assetId: string) => void;
  onClose: () => void;
}

export function FurniturePicker({ onSelect, onClose }: FurniturePickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(FURNITURE_CATEGORIES[0]);
  const filteredFurniture = getFurnitureByCategory(activeCategory);

  return (
    <Modal onClose={onClose} title="Add Furniture">
      <div className="space-y-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {FURNITURE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-warmth-500 text-white'
                  : 'bg-warmth-100 text-warmth-700 hover:bg-warmth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Furniture grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto">
          {filteredFurniture.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-warmth-100 transition-colors"
            >
              <svg viewBox="0 0 80 80" width={60} height={60} className="drop-shadow-sm">
                <g>{renderFurnitureSVG(item.id)}</g>
              </svg>
              <span className="text-xs text-warmth-600 truncate w-full text-center">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
