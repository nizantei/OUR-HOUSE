import { useState } from 'react';
import { useHouseStore } from '../store/houseStore';
import { useBedroom } from '../hooks/useBedroom';
import { usePresents } from '../hooks/usePresents';
import { useAuthStore } from '../store/authStore';
import { RoomContainer } from '../components/rooms/core/RoomContainer';
import { BedroomScene } from '../components/rooms/bedroom/BedroomScene';
import { GiftPicker } from '../components/rooms/bedroom/gifts/GiftPicker';
import { GiftSVG } from '../components/rooms/bedroom/gifts/GiftSVG';
import { Modal } from '../components/rooms/shared/Modal';
import { Button } from '../components/ui/Button';
import type { Present } from '@our-house/shared/types';

export function Bedroom() {
  const { house } = useHouseStore();
  const { user } = useAuthStore();
  const { bedroom, loading } = useBedroom(house?.id);
  const { presents, givePresent, openPresent } = usePresents(bedroom?.id);

  const [showGiftPicker, setShowGiftPicker] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [viewingPresent, setViewingPresent] = useState<Present | null>(null);

  const handlePresentClick = async (id: string) => {
    const present = presents.find((p) => p.id === id);
    if (!present) return;

    if (!present.opened) {
      await openPresent(id);
    }
    setViewingPresent(present);
  };

  const handleGiftSelect = async (giftId: string, message: string) => {
    await givePresent('gift', message, giftId);
    setShowGiftPicker(false);
  };

  const handleSendLetter = async () => {
    if (!letterText.trim()) return;
    await givePresent('letter', letterText.trim());
    setLetterText('');
    setShowLetterModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading Bedroom...</p>
        </div>
      </div>
    );
  }

  if (!bedroom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center">
          <p className="text-warmth-700">Bedroom not found</p>
        </div>
      </div>
    );
  }

  const myPresents = presents.filter((p) => p.given_by !== user?.id);
  const unopenedCount = myPresents.filter((p) => !p.opened).length;

  const bottomPanel = (
    <div className="space-y-4 animate-appear">
      <h1 className="font-decorative text-2xl text-warmth-900">Bedroom</h1>

      {unopenedCount > 0 && (
        <div className="bg-pink-50 border border-pink-200 px-4 py-3 rounded-lg">
          <p className="text-pink-800 font-medium">
            You have {unopenedCount} unopened gift{unopenedCount > 1 ? 's' : ''}!
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={() => setShowGiftPicker(true)} variant="primary" size="sm">
          Leave a Gift
        </Button>
        <Button onClick={() => setShowLetterModal(true)} variant="outline" size="sm">
          Write a Letter
        </Button>
      </div>

      {presents.length > 0 && (
        <div>
          <h3 className="font-decorative text-lg text-warmth-900 mb-2">Presents</h3>
          <div className="space-y-2">
            {presents.map((present) => (
              <button
                key={present.id}
                onClick={() => handlePresentClick(present.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  present.opened
                    ? 'bg-warmth-100 hover:bg-warmth-200'
                    : 'bg-pink-50 hover:bg-pink-100 border border-pink-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {present.opened ? (present.type === 'letter' ? '💌' : '🎁') : '🎀'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-warmth-900">
                      {present.type === 'letter' ? 'Love Letter' : 'Gift'}
                      {!present.opened && ' (Unopened)'}
                    </p>
                    {present.opened && (
                      <p className="text-xs text-warmth-600 truncate">{present.content}</p>
                    )}
                  </div>
                  <span className="text-xs text-warmth-500">
                    {new Date(present.given_at).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RoomContainer bottomPanel={bottomPanel}>
      <BedroomScene
        presents={presents.filter((p) => !p.opened).slice(0, 5)}
        onPresentClick={handlePresentClick}
      />

      {showGiftPicker && (
        <GiftPicker
          onSelect={handleGiftSelect}
          onClose={() => setShowGiftPicker(false)}
        />
      )}

      {showLetterModal && (
        <Modal onClose={() => setShowLetterModal(false)} title="Write a Love Letter">
          <div className="space-y-4">
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              placeholder="Dear love..."
              className="w-full h-48 p-4 bg-warmth-50 border border-warmth-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-warmth-400 font-handwriting text-warmth-900"
              maxLength={2000}
              autoFocus
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-warmth-500">{letterText.length}/2000</span>
              <div className="flex gap-2">
                <Button onClick={() => setShowLetterModal(false)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button
                  onClick={handleSendLetter}
                  variant="primary"
                  size="sm"
                  disabled={!letterText.trim()}
                >
                  Send Letter
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {viewingPresent && (
        <Modal
          onClose={() => setViewingPresent(null)}
          title={viewingPresent.type === 'letter' ? 'Love Letter' : 'Your Gift'}
        >
          <div className="space-y-4 text-center">
            {viewingPresent.type === 'gift' && viewingPresent.gift_subtype && (
              <div className="flex justify-center">
                <GiftSVG giftId={viewingPresent.gift_subtype} size={120} />
              </div>
            )}
            <div className="bg-warmth-50 p-4 rounded-lg">
              <p className="font-handwriting text-warmth-900 text-lg whitespace-pre-wrap">
                {viewingPresent.content}
              </p>
            </div>
            <p className="text-xs text-warmth-500">
              Received {new Date(viewingPresent.given_at).toLocaleDateString()}
            </p>
          </div>
        </Modal>
      )}
    </RoomContainer>
  );
}
