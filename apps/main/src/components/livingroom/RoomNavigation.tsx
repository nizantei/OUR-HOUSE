export function RoomNavigation() {
  const rooms = [
    { name: 'Kitchen', emoji: '🍳', color: 'bg-yellow-100', textColor: 'text-yellow-900' },
    { name: 'Garden', emoji: '🌱', color: 'bg-green-100', textColor: 'text-green-900' },
    { name: 'Gallery', emoji: '🖼️', color: 'bg-purple-100', textColor: 'text-purple-900' },
    { name: 'Bedroom', emoji: '💝', color: 'bg-pink-100', textColor: 'text-pink-900' },
    { name: 'Private Room', emoji: '🚪', color: 'bg-blue-100', textColor: 'text-blue-900' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room, index) => (
        <div
          key={room.name}
          className={`${room.color} rounded-lg shadow-soft p-6 border border-warmth-200 opacity-60 cursor-not-allowed animate-appear`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="text-4xl mb-3">{room.emoji}</div>
          <h3 className={`font-decorative text-xl ${room.textColor} mb-2`}>
            {room.name}
          </h3>
          <p className="text-warmth-600 text-sm">
            Coming Soon
          </p>
        </div>
      ))}
    </div>
  );
}
