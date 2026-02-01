import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from './hooks/useAdminAuth';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import UsersManagement from './pages/UsersManagement';
import HousesManagement from './pages/HousesManagement';
import { AuthCallback } from './pages/AuthCallback';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UsersManagement /></ProtectedRoute>} />
        <Route path="/houses" element={<ProtectedRoute><HousesManagement /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
