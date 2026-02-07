import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { AuthCallback } from './pages/AuthCallback';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { LivingRoom } from './pages/LivingRoom';
import { Kitchen } from './pages/Kitchen';
import { Garden } from './pages/Garden';
import { Gallery } from './pages/Gallery';
import { Bedroom } from './pages/Bedroom';
import { PrivateRoom } from './pages/PrivateRoom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmth-50">
        <div className="text-center animate-appear">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-warmth-700 text-lg font-decorative">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected routes */}
          <Route
            path="/onboarding"
            element={user ? <Onboarding /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/living-room"
            element={user ? <ErrorBoundary roomName="Living Room"><LivingRoom /></ErrorBoundary> : <Navigate to="/login" replace />}
          />
          <Route
            path="/kitchen"
            element={user ? <ErrorBoundary roomName="Kitchen"><Kitchen /></ErrorBoundary> : <Navigate to="/login" replace />}
          />
          <Route
            path="/garden"
            element={user ? <ErrorBoundary roomName="Garden"><Garden /></ErrorBoundary> : <Navigate to="/login" replace />}
          />
          <Route
            path="/gallery"
            element={user ? <ErrorBoundary roomName="Gallery"><Gallery /></ErrorBoundary> : <Navigate to="/login" replace />}
          />
          <Route
            path="/bedroom"
            element={user ? <ErrorBoundary roomName="Bedroom"><Bedroom /></ErrorBoundary> : <Navigate to="/login" replace />}
          />
          <Route
            path="/private-room"
            element={user ? <ErrorBoundary roomName="Private Room"><PrivateRoom /></ErrorBoundary> : <Navigate to="/login" replace />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
