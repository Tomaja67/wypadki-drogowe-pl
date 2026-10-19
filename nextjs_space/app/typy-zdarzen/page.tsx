import { prisma } from '@/lib/prisma';
import { EventTypesClient } from './_components/event-types-client';

export const dynamic = 'force-dynamic';

export default async function TypyZdarzenPage() {
  const eventTypes = await prisma.eventTypeStats.findMany({
    where: { year: 2025 },
    orderBy: { accidents: 'desc' },
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Rodzaje zdarzeń drogowych</h1>
        <p className="text-muted-foreground mt-1">Dane za 2025 r. — podział wg typu zdarzenia</p>
      </div>
      <EventTypesClient data={eventTypes.map((e: any) => ({
        eventType: e.eventType,
        accidents: e.accidents,
        killed: e.killed,
        injured: e.injured,
        collisions: e.collisions,
      }))} />
    </div>
  );
}
