import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export function Login() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warmth-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-decorative text-5xl text-warmth-900 mb-4">
            Our House
          </h1>
          <p className="text-warmth-700 text-lg font-primary">
            A shared home for two hearts
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-warmth-100 rounded-2xl shadow-soft p-8 border border-warmth-300 animate-appear">
          <h2 className="font-decorative text-2xl text-warmth-900 mb-6 text-center">
            Welcome Home
          </h2>

          <p className="text-warmth-700 text-center mb-8 leading-relaxed">
            Sign in with Google to create or join your shared space
          </p>

          {error && (
            <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            fullWidth
            size="lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="spinner w-5 h-5 border-2"></div>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </span>
            )}
          </Button>

          <p className="text-warmth-500 text-xs text-center mt-6">
            This is a private space for couples. <br />
            No data is shared with third parties.
          </p>
        </div>

        {/* Footer */}
        <p className="text-warmth-500 text-sm text-center mt-8">
          A calm, intimate space designed with love
        </p>
      </div>
    </div>
  );
}
