import { prisma } from '@/lib/prisma';
import { MapClient } from './_components/map-client';

export const dynamic = 'force-dynamic';

export default async function MapaPage() {
  const stats = await prisma.voivodeshipStats.findMany({
    where: { year: 2025 },
    orderBy: { accidents: 'desc' },
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Mapa wypadków w Polsce</h1>
        <p className="text-muted-foreground mt-1">Dane za 2025 r. wg województw — najedź kursorem na region</p>
      </div>
      <MapClient stats={stats.map((s: any) => ({ voivodeship: s.voivodeship, accidents: s.accidents, killed: s.killed, injured: s.injured, collisions: s.collisions }))} />
    </div>
  );
}
