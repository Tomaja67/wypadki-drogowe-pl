import { prisma } from '@/lib/prisma';
import { HourlyClient } from './_components/hourly-client';

export const dynamic = 'force-dynamic';

export default async function GodzinyPage() {
  const hourly = await prisma.hourlyStats.findMany({
    where: { year: 2025 },
    orderBy: { hour: 'asc' },
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Rozkład godzinowy zdarzeń</h1>
        <p className="text-muted-foreground mt-1">Dane za 2025 r. — kiedy dochodzi do największej liczby wypadków?</p>
      </div>
      <HourlyClient data={hourly.map((h: any) => ({
        hourRange: h.hourRange,
        accidents: h.accidents,
        killed: h.killed,
        injured: h.injured,
        collisions: h.collisions,
      }))} />
    </div>
  );
}
