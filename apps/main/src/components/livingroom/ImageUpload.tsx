import { useState, useRef } from 'react';
import { Button } from '../ui/Button';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  onCancel: () => void;
}

export function ImageUpload({ onUpload, onCancel }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select an image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError(null);
      await onUpload(selectedFile);
      onCancel();
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-warmth-100 rounded-2xl shadow-soft p-6 border border-warmth-300 animate-appear">
      <h3 className="font-decorative text-xl text-warmth-900 mb-4">
        Upload Featured Image
      </h3>

      {error && (
        <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="mb-6">
          <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="text-warmth-600 text-sm mt-2 text-center">
            Preview - {selectedFile?.name}
          </p>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-warmth-300 rounded-lg p-12 text-center cursor-pointer hover:border-warmth-500 transition-colors mb-6"
        >
          <div className="text-4xl mb-3">📸</div>
          <p className="text-warmth-700 mb-2">Click to select an image</p>
          <p className="text-warmth-500 text-sm">
            Maximum size: 5MB
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {preview ? (
          <>
            <Button
              onClick={handleUpload}
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner w-4 h-4 border-2"></div>
                  Uploading...
                </span>
              ) : (
                'Upload Image'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPreview(null);
                setSelectedFile(null);
                setError(null);
              }}
              disabled={loading}
            >
              Change
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={onCancel}
            fullWidth
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
