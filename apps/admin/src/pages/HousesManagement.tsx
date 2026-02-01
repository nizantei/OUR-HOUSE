import { useState, useEffect } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import type { House } from '@our-house/shared/types';
import AdminLayout from '../components/AdminLayout';

interface HouseWithUsers extends House {
  user1_name?: string;
  user1_email?: string;
  user2_name?: string;
  user2_email?: string;
}

export default function HousesManagement() {
  const [houses, setHouses] = useState<HouseWithUsers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHouses();
  }, []);

  async function fetchHouses() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('houses')
        .select(`
          *,
          user1:user_1 (display_name, email),
          user2:user_2 (display_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const housesWithUsers = (data || []).map((house: any) => ({
        ...house,
        user1_name: house.user1?.display_name,
        user1_email: house.user1?.email,
        user2_name: house.user2?.display_name,
        user2_email: house.user2?.email,
      }));

      setHouses(housesWithUsers);
    } catch (error) {
      console.error('Error fetching houses:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteHouse(houseId: string) {
    if (!confirm('Delete this house? This will delete all associated rooms and data.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('houses')
        .delete()
        .eq('id', houseId);

      if (error) throw error;
      await fetchHouses();
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  }

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">House Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User 2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invitation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {houses.map((house) => (
              <tr key={house.id}>
                <td className="px-6 py-4 text-sm font-mono">{house.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-sm">
                  <div>{house.user1_name}</div>
                  <div className="text-gray-500 text-xs">{house.user1_email}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {house.user2_name ? (
                    <>
                      <div>{house.user2_name}</div>
                      <div className="text-gray-500 text-xs">{house.user2_email}</div>
                    </>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {house.invitation_used ? '✅ Used' : `🔗 ${house.invitation_code}`}
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(house.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => deleteHouse(house.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
