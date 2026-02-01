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
        // Create or update user profile in database
        const { user } = data.session;

        const { error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            google_id: user.user_metadata.sub || user.id,
            email: user.email!,
            display_name: user.user_metadata.full_name || user.email!.split('@')[0],
            profile_picture: user.user_metadata.avatar_url,
            last_active: new Date().toISOString(),
          }, {
            onConflict: 'id',
          });

        if (upsertError) throw upsertError;

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
    <div className="min-h-screen flex items-center justify-center bg-warmth-50">
      <div className="text-center">
        {error ? (
          <div className="animate-appear">
            <div className="text-error text-lg mb-4">{error}</div>
            <div className="spinner mx-auto"></div>
          </div>
        ) : (
          <div className="animate-appear">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-warmth-700 text-lg">Signing you in...</p>
          </div>
        )}
      </div>
    </div>
  );
}
