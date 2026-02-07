import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export function Login() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (mode === 'signup') {
        if (!displayName.trim()) {
          setError('Please enter your name.');
          setLoading(false);
          return;
        }
        const { user } = await signUpWithEmail(email, password, displayName.trim());
        if (user && !user.confirmed_at) {
          setError(null);
          alert('Check your email for a confirmation link!');
        }
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong.';
      if (msg.includes('Invalid login')) {
        setError('Wrong email or password.');
      } else if (msg.includes('already registered')) {
        setError('This email is already registered. Try logging in.');
      } else if (msg.includes('Password should be')) {
        setError('Password must be at least 6 characters.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warmth-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-decorative text-5xl text-warmth-900 mb-3">
            Our House
          </h1>
          <p className="text-warmth-700 text-lg font-primary">
            A shared home for two hearts
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-warmth-100 rounded-2xl shadow-soft p-8 border border-warmth-300 animate-appear">
          <h2 className="font-decorative text-2xl text-warmth-900 mb-6 text-center">
            {mode === 'login' ? 'Welcome Home' : 'Create Account'}
          </h2>

          {error && (
            <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3 mb-4">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-warmth-300 bg-white focus:outline-none focus:ring-2 focus:ring-warmth-400 text-warmth-900"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warmth-300 bg-white focus:outline-none focus:ring-2 focus:ring-warmth-400 text-warmth-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warmth-300 bg-white focus:outline-none focus:ring-2 focus:ring-warmth-400 text-warmth-900"
              minLength={6}
            />
            <Button type="submit" disabled={loading} fullWidth size="md">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner w-4 h-4 border-2"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Toggle login/signup */}
          <div className="text-center mb-5">
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
              className="text-warmth-600 text-sm hover:text-warmth-800 underline"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-warmth-300" />
            <span className="text-warmth-500 text-xs">or</span>
            <div className="flex-1 h-px bg-warmth-300" />
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            fullWidth
            variant="outline"
            size="md"
          >
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
          </Button>

          <p className="text-warmth-500 text-xs text-center mt-5">
            This is a private space for couples.
          </p>
        </div>
      </div>
    </div>
  );
}
