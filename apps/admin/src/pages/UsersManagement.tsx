import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useUsers } from '../hooks/useUsers';

export default function UsersManagement() {
  const { users, authUsers, loading, updateUser, setUserPassword, deleteUser } = useUsers();
  const [passwords, setPasswords] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, { type: 'success' | 'error'; text: string }>>({});

  const handlePasswordChange = (userId: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [userId]: value }));
    // Clear message when typing
    setMessages((prev) => {
      const next = { ...prev };
      delete next[userId];
      return next;
    });
  };

  const handleSetPassword = async (userId: string) => {
    const pw = passwords[userId]?.trim();
    if (!pw) return;
    if (pw.length < 6) {
      setMessages((prev) => ({ ...prev, [userId]: { type: 'error', text: 'Min 6 characters' } }));
      return;
    }

    setSaving((prev) => ({ ...prev, [userId]: true }));
    const result = await setUserPassword(userId, pw);
    if (result.success) {
      setMessages((prev) => ({ ...prev, [userId]: { type: 'success', text: 'Password updated!' } }));
      setPasswords((prev) => ({ ...prev, [userId]: '' }));
    } else {
      setMessages((prev) => ({ ...prev, [userId]: { type: 'error', text: result.error || 'Failed' } }));
    }
    setSaving((prev) => ({ ...prev, [userId]: false }));
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    if (!confirm(`${currentStatus ? 'Remove' : 'Grant'} admin privileges?`)) return;
    await updateUser(userId, { is_admin: !currentStatus });
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Delete this user? This will remove their account and all data.')) return;
    await deleteUser(userId);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 text-lg">Loading users...</div>
        </div>
      </AdminLayout>
    );
  }

  const hasAdminClient = authUsers.size > 0;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <span className="text-sm text-gray-500">{users.length} user{users.length !== 1 ? 's' : ''}</span>
      </div>

      {!hasAdminClient && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6 text-sm">
          <strong>Password management disabled.</strong> Add <code className="bg-yellow-100 px-1 rounded">VITE_SUPABASE_SERVICE_ROLE_KEY</code> to{' '}
          <code className="bg-yellow-100 px-1 rounded">apps/admin/.env.local</code> to enable setting passwords.
          Find it in Supabase Dashboard &rarr; Settings &rarr; API &rarr; service_role key.
        </div>
      )}

      <div className="space-y-4">
        {users.map((user) => {
          const authInfo = authUsers.get(user.id);
          const message = messages[user.id];
          const isSaving = saving[user.id];

          return (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              {/* Top row: avatar + info + admin badge */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.display_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {user.display_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-lg">{user.display_name}</h3>
                    {user.is_admin && (
                      <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                    {authInfo && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                        {authInfo.provider === 'google' ? 'Google' : 'Email'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-0.5">{user.email}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-400">
                    <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                    {user.last_active && (
                      <span>Active {new Date(user.last_active).toLocaleDateString()}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mt-1 font-mono">{user.id}</p>
                </div>

                {/* Action buttons */}
                <div className="flex-shrink-0 flex gap-2">
                  <button
                    onClick={() => toggleAdmin(user.id, user.is_admin)}
                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition ${
                      user.is_admin
                        ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-xs px-3 py-1.5 rounded-md font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Password section */}
              {hasAdminClient && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500 font-medium w-24 flex-shrink-0">
                      Set Password:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter new password (min 6 chars)"
                      value={passwords[user.id] || ''}
                      onChange={(e) => handlePasswordChange(user.id, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSetPassword(user.id)}
                      disabled={isSaving || !passwords[user.id]?.trim()}
                      className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                  {message && (
                    <p className={`text-xs mt-1.5 ml-24 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {message.text}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No users found.
        </div>
      )}
    </AdminLayout>
  );
}
