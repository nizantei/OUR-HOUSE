import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHouse } from '../hooks/useHouse';
import { Button } from '../components/ui/Button';

export function Onboarding() {
  const navigate = useNavigate();
  const { createHouse, joinHouse } = useHouse();
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateHouse = async () => {
    try {
      setLoading(true);
      setError(null);
      await createHouse();

      // Fetch the house to get invitation code
      // For now, we'll navigate and let Home component handle it
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create house');
      setLoading(false);
    }
  };

  const handleJoinHouse = async () => {
    if (!invitationCode.trim()) {
      setError('Please enter an invitation code');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await joinHouse(invitationCode.trim().toUpperCase());

      // Show success and redirect
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to join house. Please check the code.');
      setLoading(false);
    }
  };


  if (mode === 'choose') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50 px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-decorative text-5xl text-warmth-900 mb-4">
              Welcome Home
            </h1>
            <p className="text-warmth-700 text-lg">
              Let's set up your shared space
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Create House */}
            <button
              onClick={() => setMode('create')}
              className="bg-warmth-100 rounded-2xl shadow-soft p-8 border-2 border-warmth-300 hover:border-warmth-500 hover:shadow-soft-lg transition-all duration-[var(--duration-normal)] animate-appear"
            >
              <div className="text-6xl mb-4">🏡</div>
              <h2 className="font-decorative text-2xl text-warmth-900 mb-3">
                Create a House
              </h2>
              <p className="text-warmth-700 leading-relaxed">
                Start a new shared space and invite your partner
              </p>
            </button>

            {/* Join House */}
            <button
              onClick={() => setMode('join')}
              className="bg-warmth-100 rounded-2xl shadow-soft p-8 border-2 border-warmth-300 hover:border-warmth-500 hover:shadow-soft-lg transition-all duration-[var(--duration-normal)] animate-appear"
              style={{ animationDelay: '100ms' }}
            >
              <div className="text-6xl mb-4">🔑</div>
              <h2 className="font-decorative text-2xl text-warmth-900 mb-3">
                Join a House
              </h2>
              <p className="text-warmth-700 leading-relaxed">
                Enter an invitation code from your partner
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-warmth-100 rounded-2xl shadow-soft p-8 border border-warmth-300 animate-appear">
            <button
              onClick={() => setMode('choose')}
              className="text-warmth-500 hover:text-warmth-700 mb-6 flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏡</div>
              <h2 className="font-decorative text-2xl text-warmth-900 mb-3">
                Create Your House
              </h2>
              <p className="text-warmth-700 leading-relaxed">
                Once created, you'll receive an invitation code to share with your partner
              </p>
            </div>

            {error && (
              <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleCreateHouse}
              disabled={loading}
              fullWidth
              size="lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="spinner w-5 h-5 border-2"></div>
                  Creating...
                </span>
              ) : (
                'Create House'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-warmth-100 rounded-2xl shadow-soft p-8 border border-warmth-300 animate-appear">
            <button
              onClick={() => setMode('choose')}
              className="text-warmth-500 hover:text-warmth-700 mb-6 flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔑</div>
              <h2 className="font-decorative text-2xl text-warmth-900 mb-3">
                Join a House
              </h2>
              <p className="text-warmth-700 leading-relaxed">
                Enter the invitation code your partner shared with you
              </p>
            </div>

            {error && (
              <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-warmth-900 font-medium mb-2">
                Invitation Code
              </label>
              <input
                type="text"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-character code"
                maxLength={6}
                className="w-full px-4 py-3 bg-white border-2 border-warmth-300 rounded-lg text-warmth-900 text-center text-2xl font-mono tracking-wider focus:border-warmth-500 focus:outline-none transition-colors"
              />
            </div>

            <Button
              onClick={handleJoinHouse}
              disabled={loading || !invitationCode.trim()}
              fullWidth
              size="lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="spinner w-5 h-5 border-2"></div>
                  Joining...
                </span>
              ) : (
                'Join House'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
