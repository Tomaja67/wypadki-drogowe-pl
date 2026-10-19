'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface HourData {
  hourRange: string;
  accidents: number;
  killed: number;
  injured: number;
  collisions: number;
}

export function HourlyClient({ data }: { data: HourData[] }) {
  const safeData = (data ?? []).map((d: HourData) => ({
    ...d,
    hour: d?.hourRange?.split?.('-')?.[0] ?? '',
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Najniebezpieczniejsza godzina', value: '16:00–16:59', sub: '1 793 wypadki' },
          { label: 'Najwięcej ofiar śmiertelnych', value: '17:00–17:59', sub: '115 zabici' },
          { label: 'Najspokojniejsza godzina', value: '03:00–03:59', sub: '130 wypadków' },
          { label: 'Nocne wypadki (22–05)', value: '1 456', sub: '237 ofiar śmiertelnych' },
        ].map((item: any) => (
          <div key={item.label} className="bg-card rounded-xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xl font-display font-bold mt-1">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Wypadki wg godziny</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeData} margin={{ left: 10, right: 10, bottom: 40, top: 5 }}>
              <XAxis dataKey="hour" tickLine={false} tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={50} />
              <YAxis tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="accidents" name="Wypadki" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
        <h3 className="font-display font-bold mb-4">Ofiary śmiertelne i ranni wg godziny</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safeData} margin={{ left: 10, right: 10, bottom: 40, top: 5 }}>
              <XAxis dataKey="hour" tickLine={false} tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={50} />
              <YAxis tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="killed" name="Zabici" stroke="#dc2626" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="injured" name="Ranni" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
