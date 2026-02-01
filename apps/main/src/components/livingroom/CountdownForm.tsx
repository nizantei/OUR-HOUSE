import { useState } from 'react';
import { Button } from '../ui/Button';

interface CountdownFormProps {
  onSubmit: (name: string, date: string) => Promise<void>;
  onCancel: () => void;
}

export function CountdownForm({ onSubmit, onCancel }: CountdownFormProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a name for the countdown');
      return;
    }

    if (!date) {
      setError('Please select a date');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSubmit(name.trim(), date);
      // Reset form
      setName('');
      setDate('');
      onCancel();
    } catch (err: any) {
      setError(err.message || 'Failed to create countdown');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-warmth-100 rounded-lg shadow-soft p-6 border border-warmth-300 animate-appear">
      <h3 className="font-decorative text-xl text-warmth-900 mb-4">
        Create New Countdown
      </h3>

      {error && (
        <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-warmth-900 font-medium mb-2 text-sm">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anniversary, Birthday, Trip..."
            maxLength={50}
            className="w-full px-4 py-2 bg-white border-2 border-warmth-300 rounded-lg text-warmth-900 focus:border-warmth-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-warmth-900 font-medium mb-2 text-sm">
            Target Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            className="w-full px-4 py-2 bg-white border-2 border-warmth-300 rounded-lg text-warmth-900 focus:border-warmth-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="spinner w-4 h-4 border-2"></div>
                Creating...
              </span>
            ) : (
              'Create Countdown'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
