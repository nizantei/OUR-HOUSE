import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">Our House</p>
        </div>
        <nav className="mt-6">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700 transition">Dashboard</Link>
          <Link to="/users" className="block px-4 py-2 hover:bg-gray-700 transition">Users</Link>
          <Link to="/houses" className="block px-4 py-2 hover:bg-gray-700 transition">Houses</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Our House Admin</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.display_name}</span>
            <button
              onClick={handleSignOut}
              className="text-blue-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
