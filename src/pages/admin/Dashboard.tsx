import { useEffect, useState } from 'react';
import { getDashboard, auth } from '../../lib/api';
import { Users, Package, Mail, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) return; // AdminLayout will redirect
    getDashboard(token)
      .then(setData)
      .catch((e) => setError(e.message || 'Failed to load dashboard'));
  }, []);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Overview of your platform performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Users', value: data?.stats?.users ?? '—', icon: Users, color: 'bg-brand-600' },
          { label: 'Products', value: data?.stats?.products ?? '—', icon: Package, color: 'bg-brand-500' },
          { label: 'Inquiries', value: data?.stats?.inquiries ?? '—', icon: Mail, color: 'bg-amber-400 text-slate-900' },
          { label: 'Growth', value: data?.stats?.growth ?? '+12%', icon: TrendingUp, color: 'bg-brand-700' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <div className="text-slate-500 dark:text-slate-400 text-sm">{label}</div>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-white ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Activity / Chart placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 min-h-[260px]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Traffic Overview</h2>
            <div className="text-xs text-slate-500 dark:text-slate-400">Last 7 days</div>
          </div>
          <div className="h-40 grid grid-cols-12 gap-2 items-end">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded bg-brand-200 dark:bg-brand-800" style={{ height: `${25 + (i % 4) * 15}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-[#fec216] rounded-full" /> New inquiry received</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-brand-500 rounded-full" /> User admin@example.com logged in</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-brand-600 rounded-full" /> Product catalog updated</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-brand-700 rounded-full" /> 3 users registered</li>
          </ul>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-sm">{error}</div>
      )}
    </div>
  );
}
