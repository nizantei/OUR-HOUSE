import { useState } from 'react';
import type { Countdown } from '@our-house/shared/types';

interface CountdownCalendarProps {
  countdowns: Countdown[];
  onClick: () => void;
}

export function CountdownCalendar({ countdowns, onClick }: CountdownCalendarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const calculateDaysRemaining = (targetDate: string): number => {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const topCountdowns = countdowns
    .map(countdown => ({
      ...countdown,
      daysRemaining: calculateDaysRemaining(countdown.date),
    }))
    .filter(c => c.daysRemaining >= 0)
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 3);

  return (
    <g
      className="countdown-calendar cursor-pointer transition-transform duration-300"
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: '790px 190px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Countdown calendar - click to manage countdowns"
      onKeyDown={handleKeyDown}
    >
      {/* Calendar background */}
      <rect
        x="700"
        y="120"
        width="180"
        height="140"
        fill="#FFFFFF"
        rx="8"
        style={{
          filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))',
        }}
      />

      {/* Calendar header (month bar) */}
      <rect
        x="700"
        y="120"
        width="180"
        height="30"
        fill="#C77D55"
        rx="8"
      />
      <rect
        x="700"
        y="135"
        width="180"
        height="15"
        fill="#C77D55"
      />

      {/* Binding rings */}
      <circle cx="730" cy="120" r="5" fill="#8B5A3C" />
      <circle cx="790" cy="120" r="5" fill="#8B5A3C" />
      <circle cx="850" cy="120" r="5" fill="#8B5A3C" />

      {/* Calendar title */}
      <text
        x="790"
        y="142"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="600"
      >
        Countdowns
      </text>

      {/* Countdown entries */}
      {topCountdowns.length > 0 ? (
        topCountdowns.map((countdown, index) => (
          <g key={countdown.id}>
            {/* Countdown text */}
            <text
              x="715"
              y={170 + index * 30}
              fill="#44403C"
              fontSize="12"
              fontWeight="500"
            >
              {countdown.name.length > 15
                ? `${countdown.name.slice(0, 15)}...`
                : countdown.name}
            </text>
            {/* Days remaining */}
            <text
              x="865"
              y={170 + index * 30}
              textAnchor="end"
              fill="#C77D55"
              fontSize="14"
              fontWeight="700"
            >
              {countdown.daysRemaining}d
            </text>
          </g>
        ))
      ) : (
        <>
          {/* Empty state */}
          <text
            x="790"
            y="195"
            textAnchor="middle"
            fill="#D6D3D1"
            fontSize="32"
          >
            📅
          </text>
          <text
            x="790"
            y="220"
            textAnchor="middle"
            fill="#78716C"
            fontSize="10"
          >
            Click to add
          </text>
        </>
      )}

      {/* Hover glow effect */}
      {isHovered && (
        <rect
          x="695"
          y="115"
          width="190"
          height="150"
          fill="none"
          stroke="#E8A87C"
          strokeWidth="3"
          opacity="0.6"
          rx="10"
          className="animate-breathe"
        />
      )}
    </g>
  );
}
