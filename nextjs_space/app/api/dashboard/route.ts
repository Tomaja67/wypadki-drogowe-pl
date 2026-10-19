export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [voivodeshipAll, monthlyAll, eventTypes] = await Promise.all([
      prisma.voivodeshipStats.findMany({ orderBy: { accidents: 'desc' } }),
      prisma.monthlyStats.findMany({ where: { year: 2025 }, orderBy: { month: 'asc' } }),
      prisma.eventTypeStats.findMany({ where: { year: 2025 }, orderBy: { killed: 'desc' } }),
    ]);

    const years = [2018, 2020, 2025];
    const kpis: any[] = [];
    const yearTotals: Record<string, { accidents: number; killed: number; injured: number; collisions: number }> = {};

    for (const y of years) {
      const rows = voivodeshipAll.filter((r: any) => r.year === y);
      const totals = rows.reduce(
        (acc: any, r: any) => ({
          accidents: acc.accidents + r.accidents,
          killed: acc.killed + r.killed,
          injured: acc.injured + r.injured,
          collisions: acc.collisions + r.collisions,
        }),
        { accidents: 0, killed: 0, injured: 0, collisions: 0 }
      );
      yearTotals[String(y)] = totals;
    }

    const allTotals = {
      accidents: Object.values(yearTotals).reduce((s, t) => s + t.accidents, 0),
      killed: Object.values(yearTotals).reduce((s, t) => s + t.killed, 0),
      injured: Object.values(yearTotals).reduce((s, t) => s + t.injured, 0),
      collisions: Object.values(yearTotals).reduce((s, t) => s + t.collisions, 0),
    };

    const sparkAccidents = years.map((y) => yearTotals[String(y)]?.accidents ?? 0);
    const sparkKilled = years.map((y) => yearTotals[String(y)]?.killed ?? 0);

    const makeKpi = (metric: string, label: string, value: number, delta: number, spark: number[], yearVal: string, goodWhen: string) => ({
      metric, label, value, format: 'integer', delta, delta_label: '2018→2025', spark, good_when: goodWhen, year: yearVal,
    });

    const delta_acc = ((yearTotals['2025']?.accidents ?? 0) - (yearTotals['2018']?.accidents ?? 0)) / (yearTotals['2018']?.accidents || 1);
    const delta_killed = ((yearTotals['2025']?.killed ?? 0) - (yearTotals['2018']?.killed ?? 0)) / (yearTotals['2018']?.killed || 1);
    const delta_injured = ((yearTotals['2025']?.injured ?? 0) - (yearTotals['2018']?.injured ?? 0)) / (yearTotals['2018']?.injured || 1);
    const delta_coll = ((yearTotals['2025']?.collisions ?? 0) - (yearTotals['2018']?.collisions ?? 0)) / (yearTotals['2018']?.collisions || 1);

    kpis.push(
      makeKpi('accidents', 'Wypadki (suma)', allTotals.accidents, delta_acc, sparkAccidents, 'All', 'down'),
      makeKpi('killed', 'Ofiary śmiertelne (suma)', allTotals.killed, delta_killed, sparkKilled, 'All', 'down'),
      makeKpi('injured', 'Ranni (suma)', allTotals.injured, delta_injured, [], 'All', 'down'),
      makeKpi('collisions', 'Kolizje (suma)', allTotals.collisions, delta_coll, [], 'All', 'down'),
    );

    for (const y of years) {
      const t = yearTotals[String(y)] ?? { accidents: 0, killed: 0, injured: 0, collisions: 0 };
      kpis.push(
        { metric: 'accidents', label: `Wypadki ${y}`, value: t.accidents, format: 'integer', year: String(y), good_when: 'down' },
        { metric: 'killed', label: `Ofiary śmiertelne ${y}`, value: t.killed, format: 'integer', year: String(y), good_when: 'down' },
        { metric: 'injured', label: `Ranni ${y}`, value: t.injured, format: 'integer', year: String(y), good_when: 'down' },
        { metric: 'collisions', label: `Kolizje ${y}`, value: t.collisions, format: 'integer', year: String(y), good_when: 'down' },
      );
    }

    const monthNames = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
    const monthly_trend = monthlyAll.map((m: any) => ({
      month: monthNames[m.month - 1] ?? `M${m.month}`,
      accidents: m.accidents, killed: m.killed, injured: m.injured,
    }));

    const event_types = eventTypes.map((e: any) => ({
      eventType: e.eventType, killed: e.killed, accidents: e.accidents,
    }));

    const voivodeship_lollipop = voivodeshipAll.map((v: any) => ({
      voivodeship: v.voivodeship, accidents: v.accidents, year: String(v.year),
    }));

    const voivodeship_table = voivodeshipAll.map((v: any) => ({
      voivodeship: v.voivodeship, accidents: v.accidents, killed: v.killed,
      injured: v.injured, collisions: v.collisions, year: String(v.year),
    }));

    return NextResponse.json({
      data_as_of: '2026-03-20T00:00:00Z',
      data: { kpis, monthly_trend, event_types, voivodeship_lollipop, voivodeship_table },
    });
  } catch (error: any) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
