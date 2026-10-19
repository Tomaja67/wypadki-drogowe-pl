'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface GdyniaData {
  period: string;
  accidents: number;
  injured: number;
  killed: number;
  totalVictims: number;
}

export function GdyniaClient({ data }: { data: GdyniaData[] }) {
  const safeData = data ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Całkowita liczba wypadków', value: safeData.reduce((s: number, d: GdyniaData) => s + (d?.accidents ?? 0), 0) },
          { label: 'Łączna liczba rannych', value: safeData.reduce((s: number, d: GdyniaData) => s + (d?.injured ?? 0), 0) },
          { label: 'Łączna liczba zabitych', value: safeData.reduce((s: number, d: GdyniaData) => s + (d?.killed ?? 0), 0) },
        ].map((item: any) => (
          <div key={item.label} className="bg-card rounded-xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-display font-bold mt-1">{item?.value?.toLocaleString?.('pl-PL') ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">2015–2026</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Wypadki drogowe w Gdyni — trend kwartalny</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={safeData} margin={{ left: 10, right: 10, bottom: 40, top: 5 }}>
              <XAxis dataKey="period" tickLine={false} tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={55} interval="preserveStartEnd" />
              <YAxis tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="accidents" name="Wypadki" fill="#dc2626" fillOpacity={0.2} stroke="#dc2626" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Ranni i zabici</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safeData} margin={{ left: 10, right: 10, bottom: 40, top: 5 }}>
              <XAxis dataKey="period" tickLine={false} tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={55} interval="preserveStartEnd" />
              <YAxis tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="injured" name="Ranni" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="killed" name="Zabici" stroke="#dc2626" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
