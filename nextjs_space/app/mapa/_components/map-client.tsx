'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Stat {
  voivodeship: string;
  accidents: number;
  killed: number;
  injured: number;
  collisions: number;
}

const voivodeshipPaths: Record<string, string> = {
  'zachodniopomorskie': 'M 120 60 L 160 40 L 200 50 L 210 80 L 200 120 L 170 140 L 130 130 L 100 100 Z',
  'pomorskie': 'M 200 30 L 260 20 L 310 30 L 320 70 L 290 100 L 250 110 L 210 80 L 200 50 Z',
  'warmińsko-mazurskie': 'M 310 30 L 370 25 L 430 40 L 440 80 L 410 110 L 350 100 L 320 70 Z',
  'podlaskie': 'M 410 110 L 440 80 L 470 90 L 480 150 L 460 200 L 420 190 L 400 150 Z',
  'lubuskie': 'M 80 130 L 130 130 L 160 160 L 150 210 L 120 230 L 80 210 L 70 170 Z',
  'wielkopolskie': 'M 130 130 L 200 120 L 250 110 L 270 150 L 260 200 L 220 230 L 160 220 L 150 170 Z',
  'kujawsko-pomorskie': 'M 250 70 L 320 70 L 340 100 L 320 140 L 270 150 L 250 110 Z',
  'mazowieckie': 'M 320 140 L 400 150 L 420 190 L 410 240 L 370 270 L 310 250 L 290 200 L 300 160 Z',
  'dolnośląskie': 'M 100 230 L 150 210 L 190 240 L 210 290 L 180 320 L 120 310 L 90 270 Z',
  'łódzkie': 'M 220 200 L 290 200 L 310 250 L 290 290 L 240 290 L 220 250 Z',
  'lubelskie': 'M 370 220 L 420 190 L 460 200 L 470 260 L 440 310 L 390 310 L 360 270 Z',
  'opolskie': 'M 170 290 L 210 290 L 230 330 L 210 360 L 170 350 L 155 320 Z',
  'śląskie': 'M 210 290 L 260 290 L 280 330 L 260 370 L 220 370 L 200 340 Z',
  'świętokrzyskie': 'M 290 280 L 360 270 L 380 310 L 350 350 L 300 340 L 280 310 Z',
  'małopolskie': 'M 260 350 L 300 340 L 350 350 L 370 390 L 320 420 L 270 410 L 250 380 Z',
  'podkarpackie': 'M 370 330 L 440 310 L 470 340 L 460 390 L 420 420 L 370 400 Z',
};

function getColor(accidents: number, max: number): string {
  const ratio = accidents / (max || 1);
  if (ratio > 0.7) return '#dc2626';
  if (ratio > 0.5) return '#ea580c';
  if (ratio > 0.3) return '#f59e0b';
  if (ratio > 0.15) return '#84cc16';
  return '#22c55e';
}

export function MapClient({ stats }: { stats: Stat[] }) {
  const [hovered, setHovered] = useState<Stat | null>(null);
  const maxAccidents = Math.max(...(stats?.map((s: Stat) => s?.accidents ?? 0) ?? [1]));
  const statsMap = new Map((stats ?? []).map((s: Stat) => [s?.voivodeship ?? '', s]));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card rounded-xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
        <svg viewBox="40 0 480 450" className="w-full h-auto">
          {Object.entries(voivodeshipPaths).map(([name, path]) => {
            const stat = statsMap?.get(name);
            const color = getColor(stat?.accidents ?? 0, maxAccidents);
            return (
              <path
                key={name}
                d={path}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-opacity duration-150 hover:opacity-80"
                onMouseEnter={() => setHovered(stat ?? null)}
                onMouseLeave={() => setHovered(null)}
              >
                <title>{name}: {stat?.accidents ?? 0} wypadków</title>
              </path>
            );
          })}
        </svg>
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground justify-center">
          <span>Mniej</span>
          {['#22c55e', '#84cc16', '#f59e0b', '#ea580c', '#dc2626'].map((c: string) => (
            <div key={c} className="w-6 h-4 rounded" style={{ backgroundColor: c }} />
          ))}
          <span>Więcej wypadków</span>
        </div>
      </div>

      <div className="space-y-3">
        {hovered ? (
          <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
            <h3 className="font-display font-bold text-lg capitalize mb-3">{hovered?.voivodeship}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Wypadki</span><span className="font-mono font-bold">{hovered?.accidents?.toLocaleString?.('pl-PL') ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Zabici</span><span className="font-mono font-bold text-destructive">{hovered?.killed?.toLocaleString?.('pl-PL') ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ranni</span><span className="font-mono font-bold">{hovered?.injured?.toLocaleString?.('pl-PL') ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Kolizje</span><span className="font-mono font-bold">{hovered?.collisions?.toLocaleString?.('pl-PL') ?? 0}</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-xl p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
            <p className="text-muted-foreground text-sm">Najedź na województwo, aby zobaczyć szczegóły</p>
          </div>
        )}

        <div className="bg-card rounded-xl p-5 max-h-[400px] overflow-auto" style={{ boxShadow: 'var(--shadow-md)' }}>
          <h3 className="font-display font-bold mb-3">Ranking województw</h3>
          <div className="space-y-2">
            {(stats ?? []).map((s: Stat, i: number) => (
              <div key={s?.voivodeship ?? i} className="flex items-center gap-2 text-sm">
                <span className="w-5 text-muted-foreground font-mono">{i + 1}.</span>
                <span className="flex-1 capitalize">{s?.voivodeship ?? ''}</span>
                <span className="font-mono font-bold">{s?.accidents?.toLocaleString?.('pl-PL') ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
