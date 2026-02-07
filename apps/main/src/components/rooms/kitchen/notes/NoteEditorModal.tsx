import { useState, useCallback } from 'react';
import { Modal } from '../../../../components/rooms/shared/Modal';
import { NoteColorPicker, NOTE_COLORS } from './NoteColorPicker';
import { TextNoteEditor } from './TextNoteEditor';
import { ChecklistNoteEditor } from './ChecklistNoteEditor';
import { DoodleNoteEditor } from './DoodleNoteEditor';
import type {
  StickyNote,
  StickyNoteType,
  StickyNoteContent,
  ChecklistItem,
} from '@our-house/shared/types';

interface NoteEditorModalProps {
  note?: StickyNote;
  onSave: (type: StickyNoteType, content: StickyNoteContent, color: string) => void;
  onClose: () => void;
}

type TabType = 'text' | 'checklist' | 'doodle';

const TABS: { type: TabType; label: string; icon: string }[] = [
  { type: 'text', label: 'Text', icon: '\u270E' },
  { type: 'checklist', label: 'Checklist', icon: '\u2611' },
  { type: 'doodle', label: 'Doodle', icon: '\u270F' },
];

function getInitialType(note?: StickyNote): TabType {
  if (!note) return 'text';
  return note.type;
}

function getInitialColor(note?: StickyNote): string {
  if (!note) return NOTE_COLORS[0].color;
  return note.color;
}

function getInitialText(note?: StickyNote): string {
  if (!note) return '';
  if ('text' in note.content) return note.content.text;
  return '';
}

function getInitialChecklistItems(note?: StickyNote): ChecklistItem[] {
  if (!note) return [];
  if ('items' in note.content) return note.content.items;
  return [];
}

function getInitialDoodleUrl(note?: StickyNote): string | undefined {
  if (!note) return undefined;
  if ('imageUrl' in note.content) return note.content.imageUrl;
  return undefined;
}

export function NoteEditorModal({ note, onSave, onClose }: NoteEditorModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(getInitialType(note));
  const [color, setColor] = useState(getInitialColor(note));

  // Content state for each type
  const [textContent, setTextContent] = useState(getInitialText(note));
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    getInitialChecklistItems(note)
  );
  const [_doodleBlob, setDoodleBlob] = useState<Blob | null>(null);

  const isEditing = !!note;
  const title = isEditing ? 'Edit Note' : 'New Note';

  const handleSaveText = useCallback(() => {
    if (!textContent.trim()) return;
    onSave('text', { text: textContent }, color);
  }, [textContent, color, onSave]);

  const handleSaveChecklist = useCallback(() => {
    const validItems = checklistItems.filter((item) => item.text.trim() !== '');
    if (validItems.length === 0) return;
    onSave('checklist', { items: validItems }, color);
  }, [checklistItems, color, onSave]);

  const handleDoodleSave = useCallback(
    (blob: Blob) => {
      setDoodleBlob(blob);
      // For doodles, the parent component is responsible for uploading the blob
      // and converting it to a URL. We pass a placeholder that will be replaced.
      const tempUrl = URL.createObjectURL(blob);
      onSave('doodle', { imageUrl: tempUrl }, color);
    },
    [color, onSave]
  );

  const handleSaveClick = useCallback(() => {
    switch (activeTab) {
      case 'text':
        handleSaveText();
        break;
      case 'checklist':
        handleSaveChecklist();
        break;
      case 'doodle':
        // Doodle saves via its own Save Drawing button
        break;
    }
  }, [activeTab, handleSaveText, handleSaveChecklist]);

  return (
    <Modal onClose={onClose} title={title}>
      <div className="flex flex-col gap-6">
        {/* Tab selector -- only show when creating a new note */}
        {!isEditing && (
          <div className="flex border-b border-warmth-200">
            {TABS.map((tab) => (
              <button
                key={tab.type}
                type="button"
                onClick={() => setActiveTab(tab.type)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium
                  border-b-2 transition-colors -mb-[2px] ${
                    activeTab === tab.type
                      ? 'border-warmth-700 text-warmth-900'
                      : 'border-transparent text-warmth-500 hover:text-warmth-700 hover:border-warmth-300'
                  }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Color picker */}
        <NoteColorPicker selectedColor={color} onSelect={setColor} />

        {/* Editor area */}
        <div className="min-h-[200px]">
          {activeTab === 'text' && (
            <TextNoteEditor initialText={textContent} onChange={setTextContent} />
          )}
          {activeTab === 'checklist' && (
            <ChecklistNoteEditor
              initialItems={checklistItems}
              onChange={setChecklistItems}
            />
          )}
          {activeTab === 'doodle' && (
            <DoodleNoteEditor
              initialImageUrl={getInitialDoodleUrl(note)}
              onSave={handleDoodleSave}
            />
          )}
        </div>

        {/* Save / Cancel buttons (not shown for doodle tab which has its own save) */}
        {activeTab !== 'doodle' && (
          <div className="flex justify-end gap-3 pt-2 border-t border-warmth-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-sm font-medium text-warmth-700
                bg-warmth-100 hover:bg-warmth-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              className="px-5 py-2 rounded-lg text-sm font-medium text-white
                bg-warmth-700 hover:bg-warmth-800 transition-colors"
            >
              {isEditing ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
