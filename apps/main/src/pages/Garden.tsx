import { useState } from 'react';
import { useHouseStore } from '../store/houseStore';
import { useGarden } from '../hooks/useGarden';
import { useFlowers } from '../hooks/useFlowers';
import { useGardenStore } from '../store/gardenStore';
import { RoomContainer } from '../components/rooms/core/RoomContainer';
import { GardenScene } from '../components/rooms/garden/GardenScene';
import { Modal } from '../components/rooms/shared/Modal';
import { Button } from '../components/ui/Button';
import { gardenConfig } from '../configs/garden.config';
import type { Flower } from '@our-house/shared/types';

const GROWTH_STAGE_NAMES = ['Seed', 'Sprout', 'Seedling', 'Growing', 'Budding', 'Full Bloom'] as const;

const FLOWER_TYPES = [
  { type: 'rose', color: '#E53935', label: 'Rose' },
  { type: 'sunflower', color: '#FDD835', label: 'Sunflower' },
  { type: 'tulip', color: '#D81B60', label: 'Tulip' },
  { type: 'daisy', color: '#FFFFFF', label: 'Daisy' },
  { type: 'lavender', color: '#9C27B0', label: 'Lavender' },
  { type: 'bluebell', color: '#1E88E5', label: 'Bluebell' },
  { type: 'marigold', color: '#FF8F00', label: 'Marigold' },
  { type: 'lily', color: '#F48FB1', label: 'Lily' },
] as const;

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function calculateFlowerPosition(existingCount: number): { x: number; y: number } {
  const { startX, startY, spacing, maxPerRow } = gardenConfig.flowerBed;
  const row = Math.floor(existingCount / maxPerRow);
  const col = existingCount % maxPerRow;
  return {
    x: startX + col * spacing,
    y: startY + row * spacing,
  };
}

export function Garden() {
  const { house } = useHouseStore();
  const { garden, loading, waterPlant, canWater } = useGarden(house?.id);
  const { flowers, plantFlower } = useFlowers(garden?.id);
  const { isWatering } = useGardenStore();

  const [showFlowerModal, setShowFlowerModal] = useState(false);
  const [selectedFlowerType, setSelectedFlowerType] = useState<string>('');
  const [goalName, setGoalName] = useState('');

  const handlePlantFlower = async () => {
    if (!selectedFlowerType || !goalName.trim()) return;

    const position = calculateFlowerPosition(flowers.length);
    await plantFlower(selectedFlowerType, goalName.trim(), position);

    setSelectedFlowerType('');
    setGoalName('');
    setShowFlowerModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading Garden...</p>
        </div>
      </div>
    );
  }

  if (!garden) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center">
          <p className="text-warmth-700">Garden not found</p>
        </div>
      </div>
    );
  }

  const growthStage = garden.plant_growth_stage;
  const stageName = GROWTH_STAGE_NAMES[growthStage] ?? GROWTH_STAGE_NAMES[0];

  const bottomPanel = (
    <div className="space-y-4 animate-appear">
      <h1 className="font-decorative text-2xl text-warmth-900">Garden</h1>

      {/* Growth stage indicator */}
      <div className="bg-warmth-100 rounded-lg px-4 py-3">
        <p className="text-warmth-900 font-medium">
          Stage {growthStage}: {stageName}
        </p>
        {garden.plant_last_watered && (
          <p className="text-warmth-600 text-sm mt-1">
            Last watered {getRelativeTime(garden.plant_last_watered)}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <Button
            onClick={waterPlant}
            variant="primary"
            size="sm"
            disabled={!canWater() || isWatering}
          >
            {isWatering ? 'Watering...' : 'Water Plant'}
          </Button>
          {!canWater() && !isWatering && (
            <p className="text-warmth-500 text-xs">Already watered today</p>
          )}
        </div>
        <Button
          onClick={() => setShowFlowerModal(true)}
          variant="outline"
          size="sm"
        >
          Plant a Flower
        </Button>
      </div>

      {/* Flower list */}
      {flowers.length > 0 && (
        <div>
          <h3 className="font-decorative text-lg text-warmth-900 mb-2">
            Flowers ({flowers.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {flowers.map((flower: Flower) => {
              const flowerInfo = FLOWER_TYPES.find((f) => f.type === flower.flower_type);
              return (
                <div
                  key={flower.id}
                  className="p-3 rounded-lg bg-warmth-100 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-warmth-300 flex-shrink-0"
                      style={{ backgroundColor: flowerInfo?.color ?? '#ccc' }}
                    />
                    <span className="text-warmth-900 font-medium truncate">
                      {flower.goal_name}
                    </span>
                  </div>
                  <p className="text-warmth-500 text-xs mt-1 capitalize">
                    {flowerInfo?.label ?? flower.flower_type}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RoomContainer bottomPanel={bottomPanel}>
      <GardenScene
        growthStage={growthStage}
        isWatering={isWatering}
        canWater={canWater()}
        flowers={flowers}
        onWater={waterPlant}
      />

      {showFlowerModal && (
        <Modal onClose={() => setShowFlowerModal(false)} title="Plant a Flower">
          <div className="space-y-5">
            {/* Flower type picker */}
            <div>
              <label className="block text-warmth-700 text-sm font-medium mb-2">
                Choose a flower
              </label>
              <div className="grid grid-cols-4 gap-3">
                {FLOWER_TYPES.map((flower) => (
                  <button
                    key={flower.type}
                    onClick={() => setSelectedFlowerType(flower.type)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all ${
                      selectedFlowerType === flower.type
                        ? 'bg-warmth-200 ring-2 ring-warmth-500'
                        : 'bg-warmth-50 hover:bg-warmth-100'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{
                        backgroundColor: flower.color,
                        borderColor:
                          selectedFlowerType === flower.type
                            ? 'var(--warmth-700, #5D4037)'
                            : 'var(--warmth-300, #D7CCC8)',
                      }}
                    />
                    <span className="text-xs text-warmth-700">{flower.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal name input */}
            <div>
              <label
                htmlFor="goal-name"
                className="block text-warmth-700 text-sm font-medium mb-2"
              >
                Name a goal for this flower
              </label>
              <input
                id="goal-name"
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g., Learn to cook pasta"
                className="w-full px-4 py-2 rounded-lg border-2 border-warmth-300 bg-white text-warmth-900 placeholder-warmth-400 focus:outline-none focus:border-warmth-500 transition-colors"
                maxLength={100}
              />
            </div>

            {/* Plant button */}
            <Button
              onClick={handlePlantFlower}
              variant="primary"
              fullWidth
              disabled={!selectedFlowerType || !goalName.trim()}
            >
              Plant
            </Button>
          </div>
        </Modal>
      )}
    </RoomContainer>
  );
}
