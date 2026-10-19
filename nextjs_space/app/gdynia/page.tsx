import { prisma } from '@/lib/prisma';
import { GdyniaClient } from './_components/gdynia-client';

export const dynamic = 'force-dynamic';

export default async function GdyniaPage() {
  const data = await prisma.gdyniaQuarterly.findMany({
    orderBy: [{ year: 'asc' }, { quarter: 'asc' }],
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Gdynia — trend wypadków</h1>
        <p className="text-muted-foreground mt-1">Dane kwartalne 2015–2026 z Otwartych Danych Gdyni</p>
      </div>
      <GdyniaClient data={data.map((d: any) => ({
        period: `${d.year}Q${d.quarter}`,
        accidents: d.accidents,
        injured: d.injured,
        killed: d.killed,
        totalVictims: d.totalVictims,
      }))} />
    </div>
  );
}
