import { useState, useRef } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface PhotoUploadProps {
  onUpload: (file: File, caption?: string) => void;
  onCancel: () => void;
}

export function PhotoUpload({ onUpload, onCancel }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File must be under 10MB.');
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    onUpload(selectedFile, caption.trim() || undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* File input area */}
      <div
        className="border-2 border-dashed border-warmth-300 rounded-xl p-6 text-center cursor-pointer hover:border-warmth-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded-lg object-contain shadow-md"
            />
            <p className="text-sm text-warmth-600">{selectedFile?.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-warmth-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-warmth-600 font-medium">Click to select a photo</p>
            <p className="text-xs text-warmth-400">Max 10MB - JPG, PNG, GIF, WebP</p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Caption input */}
      <div>
        <label
          htmlFor="photo-caption"
          className="block text-sm font-medium text-warmth-700 mb-1"
        >
          Caption (optional)
        </label>
        <input
          id="photo-caption"
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption..."
          maxLength={200}
          className="w-full px-3 py-2 rounded-lg border border-warmth-200 bg-warmth-50 text-warmth-900 placeholder-warmth-400 focus:outline-none focus:ring-2 focus:ring-warmth-400 focus:border-transparent text-sm"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-warmth-600 hover:bg-warmth-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFile}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-warmth-700 text-warmth-50 hover:bg-warmth-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
