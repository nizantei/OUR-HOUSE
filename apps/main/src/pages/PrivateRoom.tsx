import { useRef, useState } from 'react';
import { useHouseStore } from '../store/houseStore';
import { useAuthStore } from '../store/authStore';
import { usePrivateRoom } from '../hooks/usePrivateRoom';
import { useRoomElements } from '../hooks/useRoomElements';
import { usePrivateRoomStore } from '../store/privateRoomStore';
import { RoomContainer } from '../components/rooms/core/RoomContainer';
import { PrivateRoomScene } from '../components/rooms/privateroom/PrivateRoomScene';
import { ElementControls } from '../components/rooms/privateroom/ElementControls';
import { FurniturePicker } from '../components/rooms/privateroom/furniture/FurniturePicker';
import { Button } from '../components/ui/Button';

export function PrivateRoom() {
  const { house } = useHouseStore();
  const { user } = useAuthStore();
  const svgRef = useRef<SVGSVGElement>(null);

  const [viewingPartner, setViewingPartner] = useState(false);
  const [showFurniturePicker, setShowFurniturePicker] = useState(false);

  const currentOwnerId = viewingPartner
    ? (house?.user_1 === user?.id ? house?.user_2 : house?.user_1)
    : user?.id;

  const { privateRoom, loading, toggleVisibility } = usePrivateRoom(house?.id, currentOwnerId ?? undefined);
  const {
    elements,
    addNewElement,
    deleteElement,
    updateElementPosition,
    updateElementProperties,
    bringForward,
    sendBack,
  } = useRoomElements(privateRoom?.id);

  const {
    isEditing,
    selectedElementId,
    setIsEditing,
    setSelectedElementId,
  } = usePrivateRoomStore();

  const selectedElement = elements.find((e) => e.id === selectedElementId);
  const isOwnRoom = !viewingPartner;

  const handleElementClick = (id: string) => {
    if (isEditing) {
      setSelectedElementId(id === selectedElementId ? null : id);
    }
  };

  const handleElementDragEnd = (id: string, x: number, y: number) => {
    updateElementPosition(id, x, y);
  };

  const handleAddFurniture = async (assetId: string) => {
    await addNewElement(assetId);
    setShowFurniturePicker(false);
  };

  const handleDelete = async () => {
    if (selectedElementId) {
      await deleteElement(selectedElementId);
      setSelectedElementId(null);
    }
  };

  const handleScaleChange = (scale: number) => {
    if (selectedElementId) {
      updateElementProperties(selectedElementId, { scale });
      usePrivateRoomStore.getState().updateElement(selectedElementId, { scale });
    }
  };

  const handleRotationChange = (rotation: number) => {
    if (selectedElementId) {
      updateElementProperties(selectedElementId, { rotation });
      usePrivateRoomStore.getState().updateElement(selectedElementId, { rotation });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading Private Room...</p>
        </div>
      </div>
    );
  }

  if (!privateRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center">
          <p className="text-warmth-700">Private room not found</p>
        </div>
      </div>
    );
  }

  const bottomPanel = (
    <div className="space-y-4 animate-appear">
      <h1 className="font-decorative text-2xl text-warmth-900">
        {isOwnRoom ? 'My Room' : "Partner's Room"}
      </h1>

      {/* Room toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setViewingPartner(false); setIsEditing(false); setSelectedElementId(null); }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            !viewingPartner ? 'bg-warmth-500 text-white' : 'bg-warmth-100 text-warmth-700'
          }`}
        >
          My Room
        </button>
        <button
          onClick={() => { setViewingPartner(true); setIsEditing(false); setSelectedElementId(null); }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            viewingPartner ? 'bg-warmth-500 text-white' : 'bg-warmth-100 text-warmth-700'
          }`}
        >
          Partner's Room
        </button>
      </div>

      {/* Edit controls (own room only) */}
      {isOwnRoom && (
        <>
          <div className="flex gap-3 items-center">
            <Button
              onClick={() => { setIsEditing(!isEditing); setSelectedElementId(null); }}
              variant={isEditing ? 'primary' : 'outline'}
              size="sm"
            >
              {isEditing ? 'Done Editing' : 'Edit Room'}
            </Button>
            {isEditing && (
              <Button onClick={() => setShowFurniturePicker(true)} variant="outline" size="sm">
                Add Furniture
              </Button>
            )}
          </div>

          {/* Visibility toggle */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-warmth-700">Visible to Partner</label>
            <button
              onClick={toggleVisibility}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                privateRoom.visible_to_partner ? 'bg-warmth-500' : 'bg-warmth-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  privateRoom.visible_to_partner ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </>
      )}

      {/* Partner room visibility notice */}
      {viewingPartner && !privateRoom.visible_to_partner && (
        <div className="bg-warmth-100 px-4 py-3 rounded-lg">
          <p className="text-warmth-600 text-sm">
            Your partner hasn't made their room visible yet.
          </p>
        </div>
      )}

      {/* Element controls */}
      {isEditing && selectedElement && (
        <ElementControls
          element={selectedElement}
          onDelete={handleDelete}
          onBringForward={() => bringForward(selectedElementId!)}
          onSendBack={() => sendBack(selectedElementId!)}
          onScaleChange={handleScaleChange}
          onRotationChange={handleRotationChange}
        />
      )}
    </div>
  );

  return (
    <RoomContainer bottomPanel={bottomPanel}>
      <PrivateRoomScene
        elements={elements}
        isEditing={isEditing && isOwnRoom}
        selectedElementId={selectedElementId}
        svgRef={svgRef}
        onElementClick={handleElementClick}
        onElementDragEnd={handleElementDragEnd}
      />

      {showFurniturePicker && (
        <FurniturePicker
          onSelect={handleAddFurniture}
          onClose={() => setShowFurniturePicker(false)}
        />
      )}
    </RoomContainer>
  );
}
