import { useState, useCallback, useRef, useEffect } from 'react';

interface TextNoteEditorProps {
  initialText: string;
  onChange: (text: string) => void;
}

export function TextNoteEditor({ initialText, onChange }: TextNoteEditorProps) {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at end
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setText(newText);
      onChange(newText);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = e.currentTarget;
      const { selectionStart, value } = textarea;

      // Find the start of the current line
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = value.slice(lineStart, selectionStart);

      if (e.key === 'Enter') {
        // If current line starts with "* ", continue the bullet list
        if (currentLine.match(/^\* .+/)) {
          e.preventDefault();
          const before = value.slice(0, selectionStart);
          const after = value.slice(selectionStart);
          const newText = before + '\n* ' + after;
          setText(newText);
          onChange(newText);

          // Move cursor after the new bullet
          requestAnimationFrame(() => {
            textarea.setSelectionRange(selectionStart + 3, selectionStart + 3);
          });
          return;
        }

        // If current line is just "* " (empty bullet), exit list mode
        if (currentLine === '* ') {
          e.preventDefault();
          const before = value.slice(0, lineStart);
          const after = value.slice(selectionStart);
          const newText = before + after;
          setText(newText);
          onChange(newText);

          requestAnimationFrame(() => {
            textarea.setSelectionRange(lineStart, lineStart);
          });
          return;
        }
      }

      if (e.key === 'Backspace') {
        // If on an empty bullet "* " and pressing backspace, remove the bullet
        if (currentLine === '* ' && selectionStart === lineStart + 2) {
          e.preventDefault();
          const before = value.slice(0, lineStart);
          const after = value.slice(selectionStart);
          const newText = before + after;
          setText(newText);
          onChange(newText);

          requestAnimationFrame(() => {
            textarea.setSelectionRange(lineStart, lineStart);
          });
          return;
        }
      }

      // Auto-detect: when user types "* " at the start of a line, this naturally
      // starts a bullet. No extra handling needed since we handle Enter continuation above.
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-2">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Write your note... (type * for bullets)"
        rows={8}
        className="w-full px-4 py-3 rounded-lg border border-warmth-300 bg-white
          font-handwriting text-warmth-900 text-base leading-relaxed
          resize-none focus:outline-none focus:ring-2 focus:ring-warmth-400
          focus:border-transparent placeholder:text-warmth-400"
      />
      <p className="text-xs text-warmth-500">
        Tip: Type &quot;* &quot; at the start of a line for bullet points.
      </p>
    </div>
  );
}
