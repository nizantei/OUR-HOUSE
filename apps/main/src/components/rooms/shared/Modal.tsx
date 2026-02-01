import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
}

export function Modal({ children, onClose, title }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative bg-warmth-50 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-appear"
        onClick={(e) => e.stopPropagation()}
        style={{ animationDelay: '0.1s' }}
      >
        {title && (
          <div className="px-6 py-4 border-b border-warmth-200">
            <h2 className="font-decorative text-2xl text-warmth-900">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
