import type { StickyNote as StickyNoteType } from '@our-house/shared/types';

interface StickyNoteProps {
  note: StickyNoteType;
  onClick: () => void;
}

function renderPreviewContent(note: StickyNoteType): string {
  if ('text' in note.content) {
    const text = note.content.text;
    return text.length > 40 ? text.slice(0, 40) + '...' : text;
  }

  if ('items' in note.content) {
    const items = note.content.items;
    const checked = items.filter((item) => item.checked).length;
    return `${checked}/${items.length} done`;
  }

  // doodle
  return '';
}

function renderDoodleIcon(): JSX.Element {
  return (
    <g>
      {/* Simple pencil icon to indicate a doodle */}
      <line x1="20" y1="55" x2="55" y2="20" stroke="#666" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="20" x2="60" y2="25" stroke="#666" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="25" x2="25" y2="60" stroke="#666" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="55" x2="25" y2="60" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="62" x2="20" y2="55" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

export function StickyNote({ note, onClick }: StickyNoteProps) {
  const isDoodle = 'imageUrl' in note.content;
  const previewText = renderPreviewContent(note);
  const isChecklist = 'items' in note.content;

  // Compute a slightly darker border color from the note color
  const borderColor = note.color + '99';

  return (
    <g
      transform={`rotate(${note.rotation}, 40, 40)`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Sticky note: ${isDoodle ? 'doodle' : previewText}`}
      className="cursor-pointer"
    >
      {/* Shadow */}
      <rect
        x={3}
        y={3}
        width={80}
        height={80}
        rx={2}
        fill="rgba(0,0,0,0.1)"
      />

      {/* Note body */}
      <rect
        x={0}
        y={0}
        width={80}
        height={80}
        rx={2}
        fill={note.color}
        stroke={borderColor}
        strokeWidth={0.5}
      />

      {/* Folded corner effect */}
      <polygon
        points="65,0 80,0 80,15"
        fill="rgba(0,0,0,0.06)"
      />

      {isDoodle ? (
        renderDoodleIcon()
      ) : (
        <foreignObject x={5} y={5} width={70} height={70}>
          <div
            // @ts-expect-error xmlns required for foreignObject
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              fontFamily: 'var(--font-handwriting, cursive)',
              fontSize: '8px',
              lineHeight: '1.3',
              color: '#444',
              wordBreak: 'break-word',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: isChecklist ? 'center' : 'flex-start',
              alignItems: isChecklist ? 'center' : 'flex-start',
            }}
          >
            {isChecklist && 'items' in note.content ? (
              <>
                <div style={{ fontSize: '14px', marginBottom: '2px' }}>
                  {'items' in note.content && note.content.items.filter((i) => i.checked).length === note.content.items.length
                    ? '\u2705'
                    : '\u2610'}
                </div>
                <div style={{ fontSize: '9px', fontWeight: 600 }}>{previewText}</div>
              </>
            ) : (
              <span>{previewText}</span>
            )}
          </div>
        </foreignObject>
      )}
    </g>
  );
}
