import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHouse } from '../hooks/useHouse';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export function Home() {
  const navigate = useNavigate();
  const { house, loading: houseLoading } = useHouse();
  const { signOut } = useAuth();

  useEffect(() => {
    if (!houseLoading) {
      if (!house) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate('/living-room', { replace: true });
      }
    }
  }, [house, houseLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  if (houseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading your house...</p>
        </div>
      </div>
    );
  }

  if (!house) {
    return null; // Will redirect to onboarding
  }

  return (
    <div className="min-h-screen bg-warmth-50">
      {/* Temporary home page - will be replaced with actual rooms */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-warmth-100 rounded-2xl shadow-soft p-8 border border-warmth-300 animate-appear">
            <div className="text-center mb-8">
              <h1 className="font-decorative text-4xl text-warmth-900 mb-4">
                Welcome Home! 🏡
              </h1>
              <p className="text-warmth-700 text-lg">
                You're now in your shared house
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-decorative text-2xl text-warmth-900 mb-4">
                House Details
              </h2>
              <div className="space-y-2 text-warmth-700">
                <p><strong>House ID:</strong> {house.id}</p>
                <p><strong>Created:</strong> {new Date(house.created_at).toLocaleDateString()}</p>
                {house.invitation_code && !house.invitation_used && (
                  <div className="mt-4 p-4 bg-warmth-50 rounded-lg">
                    <p className="font-medium text-warmth-900 mb-2">Invitation Code:</p>
                    <div className="flex items-center gap-3">
                      <code className="text-2xl font-mono tracking-wider text-warmth-700 bg-white px-4 py-2 rounded border border-warmth-300">
                        {house.invitation_code}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(house.invitation_code!)}
                        className="text-warmth-500 hover:text-warmth-700 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-warmth-500 mt-2">
                      Share this code with your partner so they can join!
                    </p>
                  </div>
                )}
                {house.user_2 && (
                  <p className="text-success mt-4">✓ Both users connected!</p>
                )}
              </div>
            </div>

            <div className="bg-info bg-opacity-10 border border-info rounded-lg p-4 mb-6">
              <p className="text-info text-sm">
                <strong>Coming soon:</strong> Rooms will be available here (Living Room, Kitchen, Garden, Gallery, Bedroom, Private Rooms)
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={handleSignOut}
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
