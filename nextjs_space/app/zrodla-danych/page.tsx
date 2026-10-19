import { Database, ExternalLink, FileText, Scale } from 'lucide-react';

export default function ZrodlaDanychPage() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Źródła danych</h1>
        <p className="text-muted-foreground mt-1">Wszystkie dane wykorzystane w aplikacji pochodzą z otwartych źródeł</p>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">Zdarzenia w ruchu drogowym (Policja)</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Dataset 834 na portalu dane.gov.pl. Zawiera oficjalne statystyki Policji dotyczące wypadków drogowych
                w Polsce: podział na województwa, miesiące, godziny i rodzaje zdarzeń.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Wykorzystane lata:</strong> 2018, 2020, 2025
              </p>
              <a
                href="https://dane.gov.pl/pl/dataset/834"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
              >
                Otwórz na dane.gov.pl <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">Wypadki drogowe — Gdynia</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Portal Otwartych Danych Gdyni. Dane kwartalne 2015–2026: liczba wypadków z ofiarami, rannych i zabitych.
              </p>
              <a
                href="https://otwartedane.gdynia.pl/pl/dataset/51860541-3bca-42e0-98fa-bafdd539f3dd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
              >
                Otwórz na otwartedane.gdynia.pl <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Scale className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">Licencja danych</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Dane publiczne udostępnione na zasadach otwartych licencji (CC0 / otwarta licencja MFiPR).
                Aplikacja udostępniona na licencji MIT.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-xl p-6">
          <h3 className="font-display font-bold mb-2">Metodologia</h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Dane pobrane bezpośrednio z API dane.gov.pl (pliki CSV)</li>
            <li>Dane oczyszczone z nagłówków i podsumowań, skonwertowane do formatu JSON</li>
            <li>Przechowywane w bazie danych PostgreSQL z pełną indeksacją</li>
            <li>API zwraca pre-agregowane dane — brak obliczeń w locie po stronie klienta</li>
            <li>Dashboard odświeża dane co 2 minuty (polling)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
