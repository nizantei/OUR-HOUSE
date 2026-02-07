import { useRef, useState } from 'react';
import { useHouseStore } from '../store/houseStore';
import { useKitchen } from '../hooks/useKitchen';
import { useStickyNotes } from '../hooks/useStickyNotes';
import { useMagnets } from '../hooks/useMagnets';
import { RoomContainer } from '../components/rooms/core/RoomContainer';
import { KitchenScene } from '../components/rooms/kitchen/KitchenScene';
import { NoteEditorModal } from '../components/rooms/kitchen/notes/NoteEditorModal';
import { MagnetPicker } from '../components/rooms/kitchen/magnets/MagnetPicker';
import { Button } from '../components/ui/Button';
import type { StickyNoteType, StickyNoteContent, StickyNote } from '@our-house/shared/types';
import { supabase } from '@our-house/shared/lib/supabase';

export function Kitchen() {
  const { house } = useHouseStore();
  const { kitchen, loading } = useKitchen(house?.id);
  const { stickyNotes, createNote, updateNote, deleteNote, updateNotePosition } = useStickyNotes(kitchen?.id);
  const { magnets, addMagnet, removeMagnet, updateMagnetPosition } = useMagnets(kitchen?.id);
  const svgRef = useRef<SVGSVGElement>(null);

  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [showMagnetPicker, setShowMagnetPicker] = useState(false);
  const [editingNote, setEditingNote] = useState<StickyNote | null>(null);

  const handleNoteClick = (noteId: string) => {
    const note = stickyNotes.find((n) => n.id === noteId);
    if (note) {
      setEditingNote(note);
      setShowNoteEditor(true);
    }
  };

  const handleNoteSave = async (type: StickyNoteType, content: StickyNoteContent, color: string) => {
    if (editingNote) {
      await updateNote(editingNote.id, { type, content, color });
    } else {
      await createNote(type, content, color, {
        x: 400 + Math.random() * 200,
        y: 200 + Math.random() * 200,
      });
    }
    setShowNoteEditor(false);
    setEditingNote(null);
  };

  const handleDoodleSave = async (blob: Blob) => {
    if (!kitchen) return;
    const fileName = `doodle-${Date.now()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('doodle-images')
      .upload(fileName, blob, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error('Error uploading doodle:', uploadError);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('doodle-images')
      .getPublicUrl(fileName);

    const content: StickyNoteContent = { imageUrl: publicUrl };
    if (editingNote) {
      await updateNote(editingNote.id, { content });
    } else {
      await createNote('doodle', content, '#FFF9C4', {
        x: 400 + Math.random() * 200,
        y: 200 + Math.random() * 200,
      });
    }
    setShowNoteEditor(false);
    setEditingNote(null);
  };

  const handleMagnetSelect = async (magnetType: string) => {
    await addMagnet(magnetType, {
      x: 420 + Math.random() * 160,
      y: 200 + Math.random() * 200,
    });
    setShowMagnetPicker(false);
  };

  const handleNoteDragEnd = (id: string, x: number, y: number) => {
    const note = stickyNotes.find((n) => n.id === id);
    updateNotePosition(id, x, y, note?.z_index ?? 0);
  };

  const handleMagnetDragEnd = (id: string, x: number, y: number) => {
    const magnet = magnets.find((m) => m.id === id);
    updateMagnetPosition(id, x, y, magnet?.z_index ?? 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading Kitchen...</p>
        </div>
      </div>
    );
  }

  if (!kitchen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center">
          <p className="text-warmth-700">Kitchen not found</p>
        </div>
      </div>
    );
  }

  const bottomPanel = (
    <div className="space-y-4 animate-appear">
      <h1 className="font-decorative text-2xl text-warmth-900">Kitchen</h1>
      <div className="flex gap-3">
        <Button
          onClick={() => { setEditingNote(null); setShowNoteEditor(true); }}
          variant="primary"
          size="sm"
        >
          Add Note
        </Button>
        <Button onClick={() => setShowMagnetPicker(true)} variant="outline" size="sm">
          Add Magnet
        </Button>
      </div>

      {stickyNotes.length > 0 && (
        <div>
          <h3 className="font-decorative text-lg text-warmth-900 mb-2">Notes ({stickyNotes.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {stickyNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                className="p-3 rounded-lg text-left text-sm transition-colors hover:opacity-80"
                style={{ backgroundColor: note.color }}
              >
                {'text' in note.content && (
                  <p className="truncate text-warmth-900">{note.content.text || 'Empty note'}</p>
                )}
                {'items' in note.content && (
                  <p className="text-warmth-900">
                    Checklist ({note.content.items.filter((i) => i.checked).length}/{note.content.items.length})
                  </p>
                )}
                {'imageUrl' in note.content && (
                  <p className="text-warmth-900">Drawing</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <RoomContainer bottomPanel={bottomPanel}>
      <KitchenScene
        stickyNotes={stickyNotes}
        magnets={magnets}
        svgRef={svgRef}
        onNoteClick={handleNoteClick}
        onNoteDragEnd={handleNoteDragEnd}
        onMagnetDragEnd={handleMagnetDragEnd}
      />

      {showNoteEditor && (
        <NoteEditorModal
          note={editingNote ?? undefined}
          onSave={handleNoteSave}
          onClose={() => { setShowNoteEditor(false); setEditingNote(null); }}
        />
      )}

      {showMagnetPicker && (
        <MagnetPicker
          onSelect={handleMagnetSelect}
          onClose={() => setShowMagnetPicker(false)}
        />
      )}
    </RoomContainer>
  );
}
