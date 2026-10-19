'use client';

import { AbacusDashboard, useDashboardData } from '@/components/viz/abacus-dashboard';
import { manifest } from '@/lib/dashboard-manifest';

export default function HomePage() {
  const { data, dataAsOf, error } = useDashboardData('/api/dashboard', 120_000);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <p className="text-destructive">Błąd ładowania danych: {String(error)}</p>
      </div>
    );
  }

  return <AbacusDashboard manifest={manifest} data={data} dataAsOf={dataAsOf} className="min-h-screen" />;
}
