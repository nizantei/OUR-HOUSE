import { useState } from 'react';
import { Modal } from '../../../rooms/shared/Modal';
import { MAGNET_CATEGORIES, getMagnetsByCategory, renderMagnetSVG } from './magnetLibrary';

interface MagnetPickerProps {
  onSelect: (magnetType: string) => void;
  onClose: () => void;
}

export function MagnetPicker({ onSelect, onClose }: MagnetPickerProps) {
  const [activeCategory, setActiveCategory] = useState(MAGNET_CATEGORIES[0]);
  const filteredMagnets = getMagnetsByCategory(activeCategory);

  return (
    <Modal onClose={onClose} title="Pick a Magnet">
      <div className="space-y-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {MAGNET_CATEGORIES.map((cat) => (
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

        {/* Magnet grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto">
          {filteredMagnets.map((magnet) => (
            <button
              key={magnet.id}
              onClick={() => onSelect(magnet.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-warmth-100 transition-colors"
            >
              <svg viewBox="0 0 40 60" width={40} height={60} className="drop-shadow-sm">
                {renderMagnetSVG(magnet.id)}
              </svg>
              <span className="text-xs text-warmth-600 truncate w-full text-center">
                {magnet.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
