import { useState } from 'react';
import { Modal } from '../../../../components/rooms/shared/Modal';
import {
  GIFT_CATEGORIES,
  getGiftsByCategory,
  renderGiftSVG,
  getGiftById,
} from './giftLibrary';

interface GiftPickerProps {
  onSelect: (giftId: string, message: string) => void;
  onClose: () => void;
}

export function GiftPicker({ onSelect, onClose }: GiftPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(GIFT_CATEGORIES[0]);
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const filteredGifts = getGiftsByCategory(activeCategory);
  const selectedGift = selectedGiftId ? getGiftById(selectedGiftId) : null;

  const handleSend = () => {
    if (selectedGiftId) {
      onSelect(selectedGiftId, message);
    }
  };

  const handleBack = () => {
    setSelectedGiftId(null);
    setMessage('');
  };

  return (
    <Modal onClose={onClose} title={selectedGift ? 'Write a Note' : 'Choose a Gift'}>
      {!selectedGift ? (
        <div className="space-y-4">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {GIFT_CATEGORIES.map((cat) => (
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

          {/* Gift grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto">
            {filteredGifts.map((gift) => (
              <button
                key={gift.id}
                onClick={() => setSelectedGiftId(gift.id)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-warmth-100 transition-colors"
              >
                <svg viewBox="0 0 60 60" width={50} height={50} className="drop-shadow-sm">
                  {renderGiftSVG(gift.id)}
                </svg>
                <span className="text-xs text-warmth-600 truncate w-full text-center">
                  {gift.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Selected gift preview */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-warmth-500 hover:text-warmth-700 text-sm transition-colors"
            >
              &larr; Back
            </button>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 60 60" width={48} height={48} className="drop-shadow-sm">
                {renderGiftSVG(selectedGiftId!)}
              </svg>
              <span className="font-medium text-warmth-800">{selectedGift.name}</span>
            </div>
          </div>

          {/* Message textarea */}
          <div>
            <label
              htmlFor="gift-message"
              className="block text-sm font-medium text-warmth-700 mb-1"
            >
              Write a note to go with this gift...
            </label>
            <textarea
              id="gift-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Something sweet, funny, or from the heart..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-warmth-200 bg-warmth-50 text-warmth-900 placeholder-warmth-400 focus:outline-none focus:ring-2 focus:ring-warmth-400 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-warmth-400 mt-1 text-right">
              {message.length}/500
            </p>
          </div>

          {/* Send Gift button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-full py-2.5 rounded-lg font-medium transition-colors bg-warmth-500 text-white hover:bg-warmth-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send Gift
          </button>
        </div>
      )}
    </Modal>
  );
}
