import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@our-house/shared/lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // Get the session from the URL hash
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session) {
        // Redirect to home
        navigate('/', { replace: true });
      } else {
        setError('No session found. Please try logging in again.');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    } catch (err) {
      console.error('Error handling auth callback:', err);
      setError('An error occurred during sign in. Redirecting...');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {error ? (
          <div>
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <div className="spinner mx-auto"></div>
          </div>
        ) : (
          <div>
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-700 text-lg">Signing you in...</p>
          </div>
        )}
      </div>
    </div>
  );
}
