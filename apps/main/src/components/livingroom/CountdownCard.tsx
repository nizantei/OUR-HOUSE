import { useState, useEffect } from 'react';
import type { Countdown } from '@our-house/shared/types';
import { useAuthStore } from '../../store/authStore';

interface CountdownCardProps {
  countdown: Countdown;
  onDelete: (id: string) => Promise<void>;
}

export function CountdownCard({ countdown, onDelete }: CountdownCardProps) {
  const { user } = useAuthStore();
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, isPast: false });
  const [deleting, setDeleting] = useState(false);

  const isCreator = user?.id === countdown.created_by;

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(countdown.date);
      const diffTime = targetDate.getTime() - Date.now();
      const isPast = diffTime < 0;
      const absDiffTime = Math.abs(diffTime);
      const days = Math.floor(absDiffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(absDiffTime / (1000 * 60 * 60));

      setTimeRemaining({ days, hours, isPast });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [countdown.date]);

  const handleDelete = async () => {
    if (!isCreator) return;

    try {
      setDeleting(true);
      await onDelete(countdown.id);
    } catch (error) {
      console.error('Failed to delete countdown:', error);
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-warmth-100 rounded-lg shadow-soft p-6 border border-warmth-200 hover:shadow-soft-lg transition-all duration-[var(--duration-normal)] relative">
      {isCreator && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-4 right-4 text-warmth-400 hover:text-error transition-colors"
          aria-label="Delete countdown"
        >
          {deleting ? (
            <div className="spinner w-4 h-4 border-2"></div>
          ) : (
            <span className="text-xl">×</span>
          )}
        </button>
      )}

      <h3 className="font-decorative text-2xl text-warmth-900 mb-3 pr-8">
        {countdown.name}
      </h3>

      <div className="mb-2">
        {timeRemaining.isPast ? (
          <p className="text-warmth-600 text-sm">
            This moment has passed
          </p>
        ) : (
          <>
            <div className="text-4xl font-bold text-warmth-700 mb-1">
              {timeRemaining.days}
            </div>
            <p className="text-warmth-600 text-sm">
              {timeRemaining.days === 1 ? 'day' : 'days'} remaining
            </p>
            <p className="text-warmth-500 text-xs mt-1">
              ({timeRemaining.hours} hours)
            </p>
          </>
        )}
      </div>

      <p className="text-warmth-600 text-sm mt-4">
        {formatDate(countdown.date)}
      </p>
    </div>
  );
}
