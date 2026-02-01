import { useEffect, useState } from 'react';
import { supabase } from '@our-house/shared/lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHouses: 0,
    recentUsers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      // Total users
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Total houses
      const { count: houseCount } = await supabase
        .from('houses')
        .select('*', { count: 'exact', head: true });

      // Recent users (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { count: recentCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      setStats({
        totalUsers: userCount || 0,
        totalHouses: houseCount || 0,
        recentUsers: recentCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Total Houses</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalHouses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">New Users (7 days)</h3>
          <p className="text-3xl font-bold mt-2">{stats.recentUsers}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
