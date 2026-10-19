'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#dc2626', '#ea580c', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899', '#64748b', '#0ea5e9', '#14b8a6', '#a855f7'];

interface EventData {
  eventType: string;
  accidents: number;
  killed: number;
  injured: number;
  collisions: number;
}

export function EventTypesClient({ data }: { data: EventData[] }) {
  const safeData = data ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Wypadki wg rodzaju zdarzenia</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeData} layout="vertical" margin={{ left: 120, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="eventType" tickLine={false} tick={{ fontSize: 10 }} width={115} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="accidents" name="Wypadki" radius={[0, 4, 4, 0]}>
                {safeData.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Ofiary śmiertelne wg rodzaju zdarzenia</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeData} layout="vertical" margin={{ left: 120, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="eventType" tickLine={false} tick={{ fontSize: 10 }} width={115} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="killed" name="Zabici" radius={[0, 4, 4, 0]}>
                {safeData.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-2 bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Tabela szczegółowa</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Rodzaj zdarzenia</th>
                <th className="text-right py-2 px-3">Wypadki</th>
                <th className="text-right py-2 px-3">Zabici</th>
                <th className="text-right py-2 px-3">Ranni</th>
                <th className="text-right py-2 px-3">Kolizje</th>
                <th className="text-right py-2 px-3">% śmiertelność</th>
              </tr>
            </thead>
            <tbody>
              {safeData.map((e: EventData) => (
                <tr key={e?.eventType ?? ''} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-2 px-3">{e?.eventType ?? ''}</td>
                  <td className="text-right py-2 px-3 font-mono">{e?.accidents?.toLocaleString?.('pl-PL') ?? 0}</td>
                  <td className="text-right py-2 px-3 font-mono text-destructive font-bold">{e?.killed?.toLocaleString?.('pl-PL') ?? 0}</td>
                  <td className="text-right py-2 px-3 font-mono">{e?.injured?.toLocaleString?.('pl-PL') ?? 0}</td>
                  <td className="text-right py-2 px-3 font-mono">{e?.collisions?.toLocaleString?.('pl-PL') ?? 0}</td>
                  <td className="text-right py-2 px-3 font-mono">{((e?.killed ?? 0) / (e?.accidents || 1) * 100)?.toFixed?.(1) ?? '0'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
