import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChecklistItem } from '@our-house/shared/types';

interface ChecklistNoteEditorProps {
  initialItems: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
}

function generateId(): string {
  return crypto.randomUUID();
}

function createEmptyItem(): ChecklistItem {
  return { id: generateId(), text: '', checked: false };
}

export function ChecklistNoteEditor({ initialItems, onChange }: ChecklistNoteEditorProps) {
  const [items, setItems] = useState<ChecklistItem[]>(
    initialItems.length > 0 ? initialItems : [createEmptyItem()]
  );
  const lastInputRef = useRef<HTMLInputElement>(null);
  const shouldFocusLast = useRef(false);

  useEffect(() => {
    if (shouldFocusLast.current && lastInputRef.current) {
      lastInputRef.current.focus();
      shouldFocusLast.current = false;
    }
  });

  const updateItems = useCallback(
    (newItems: ChecklistItem[]) => {
      setItems(newItems);
      onChange(newItems);
    },
    [onChange]
  );

  const handleToggle = useCallback(
    (id: string) => {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      updateItems(newItems);
    },
    [items, updateItems]
  );

  const handleTextChange = useCallback(
    (id: string, text: string) => {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, text } : item
      );
      updateItems(newItems);
    },
    [items, updateItems]
  );

  const handleAddItem = useCallback(() => {
    const newItems = [...items, createEmptyItem()];
    shouldFocusLast.current = true;
    updateItems(newItems);
  }, [items, updateItems]);

  const handleRemoveItem = useCallback(
    (id: string) => {
      if (items.length <= 1) return;
      const newItems = items.filter((item) => item.id !== id);
      updateItems(newItems);
    },
    [items, updateItems]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddItem();
      }

      if (e.key === 'Backspace') {
        const item = items.find((i) => i.id === id);
        if (item && item.text === '' && items.length > 1) {
          e.preventDefault();
          handleRemoveItem(id);
        }
      }
    },
    [items, handleAddItem, handleRemoveItem]
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 group">
            {/* Checkbox */}
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                item.checked
                  ? 'bg-warmth-600 border-warmth-600 text-white'
                  : 'border-warmth-400 hover:border-warmth-600'
              }`}
              aria-label={item.checked ? 'Uncheck item' : 'Check item'}
            >
              {item.checked && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Text input */}
            <input
              ref={index === items.length - 1 ? lastInputRef : undefined}
              type="text"
              value={item.text}
              onChange={(e) => handleTextChange(item.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              placeholder="List item..."
              className={`flex-1 px-2 py-1.5 rounded border border-warmth-200 bg-white
                font-handwriting text-sm focus:outline-none focus:ring-1
                focus:ring-warmth-400 placeholder:text-warmth-400 ${
                  item.checked ? 'line-through text-warmth-500' : 'text-warmth-900'
                }`}
            />

            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemoveItem(item.id)}
              disabled={items.length <= 1}
              className="flex-shrink-0 w-6 h-6 rounded-full text-warmth-400
                hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100
                transition-all disabled:opacity-0 disabled:cursor-not-allowed
                flex items-center justify-center"
              aria-label="Remove item"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 4L10 10M10 4L4 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add item button */}
      <button
        type="button"
        onClick={handleAddItem}
        className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-sm
          text-warmth-600 hover:bg-warmth-100 transition-colors self-start"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3V13M3 8H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Add item
      </button>
    </div>
  );
}
