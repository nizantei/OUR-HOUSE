import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Room {
  name: string;
  icon: string;
  route: string;
  active: boolean;
  color: string;
}

const rooms: Room[] = [
  { name: 'Living Room', icon: '🛋️', route: '/living-room', active: true, color: 'var(--living-room)' },
  { name: 'Kitchen', icon: '🍳', route: '/kitchen', active: false, color: 'var(--kitchen)' },
  { name: 'Garden', icon: '🌱', route: '/garden', active: false, color: 'var(--garden)' },
  { name: 'Gallery', icon: '🖼️', route: '/gallery', active: false, color: 'var(--gallery)' },
  { name: 'Bedroom', icon: '💝', route: '/bedroom', active: false, color: 'var(--bedroom)' },
  { name: 'Private Room', icon: '🚪', route: '/private-room', active: false, color: 'var(--private-room)' },
];

export function RoomNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoomClick = (room: Room) => {
    if (room.active) {
      navigate(room.route);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Menu Button */}
      <button
        className="fixed bottom-6 right-6 md:top-6 md:bottom-auto z-50 bg-warmth-500 hover:bg-warmth-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-warmth-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Room navigation menu"
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <>
              {/* X icon when open */}
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              {/* House icon when closed */}
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </>
          )}
        </svg>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center animate-fade-in"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" />

          {/* Menu Content */}
          <div
            className="relative bg-warmth-50 rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 animate-appear"
            onClick={(e) => e.stopPropagation()}
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="font-decorative text-3xl text-warmth-900 mb-6 text-center">
              Our House
            </h2>

            <div className="space-y-3">
              {rooms.map((room) => {
                const isCurrentRoom = location.pathname === room.route;

                return (
                  <button
                    key={room.route}
                    onClick={() => handleRoomClick(room)}
                    disabled={!room.active}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      room.active
                        ? isCurrentRoom
                          ? 'bg-warmth-200 border-2 border-warmth-500'
                          : 'bg-warmth-100 hover:bg-warmth-200 border-2 border-transparent hover:border-warmth-300 cursor-pointer'
                        : 'bg-gray-100 opacity-60 cursor-not-allowed border-2 border-transparent'
                    }`}
                    style={{
                      backgroundColor: room.active && !isCurrentRoom ? `${room.color}15` : undefined,
                    }}
                  >
                    <span className="text-3xl">{room.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-decorative text-lg text-warmth-900">
                        {room.name}
                      </div>
                      {!room.active && (
                        <div className="text-xs text-warmth-600">Coming Soon</div>
                      )}
                      {isCurrentRoom && (
                        <div className="text-xs text-warmth-700 font-medium">
                          Current Room
                        </div>
                      )}
                    </div>
                    {room.active && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-warmth-500"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-3 bg-warmth-100 hover:bg-warmth-200 text-warmth-900 rounded-xl font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
