# Dokument wydajności — Wypadki Drogowe PL

---

**Identyfikator dokumentu:** WDP-DOC-003
**Wersja:** 1.0
**Autor:** Tomaja67
**Data utworzenia:** 2026-10-19
**Historia zmian:**

| Wersja | Data | Autor | Opis zmian |
|--------|------|-------|------------|
| 1.0 | 2026-10-19 | Tomaja67 | Wersja początkowa |

---

## Zastosowane optymalizacje

### 1. Pre-agregacja danych
- Dane są agregowane podczas seeda do bazy danych
- API zwraca gotowe zestawy danych — brak obliczeń w locie
- KPI obliczane server-side, nie po stronie klienta

### 2. Indeksacja bazy danych
- Indeksy na kolumnach `year` i `voivodeship` w każdej tabeli
- Unikalne constraint'y zapobiegają duplikatom

### 3. Optymalizacja frontendu
- Server Components (domyślne) — mniejszy bundle JS
- Client Components tylko tam, gdzie niezbędna interaktywność
- Lazy loading komponentów wykresowych
- SVG mapa zamiast ciężkiej biblioteki mapowej

### 4. Caching
- Dashboard polling co 120 sekund (nie przy każdym renderze)
- Static generation tam, gdzie to możliwe

## Metryki

| Metryka | Wartość |
|---------|----------|
| Czas odpowiedzi API /api/dashboard | < 200ms |
| Rozmiar bundla JS (First Load) | ~ 150 kB (gzipped) |
| Liczba zapytań SQL na request | 3 (równoległe Promise.all) |
| Liczba rekordów w bazie | ~140 |
| Czas seeda | < 5s |
