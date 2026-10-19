# Raport końcowy projektu — Wypadki Drogowe PL

---

**Identyfikator dokumentu:** WDP-DOC-001
**Wersja:** 1.0
**Autor:** Tomaja67
**Data utworzenia:** 2026-10-19
**Historia zmian:**

| Wersja | Data | Autor | Opis zmian |
|--------|------|-------|------------|
| 1.0 | 2026-10-19 | Tomaja67 | Wersja początkowa |

---

## 1. Cel projektu

Celem projektu było stworzenie open-source'owej aplikacji webowej analizującej wypadki drogowe w Polsce na podstawie otwartych danych z portalu dane.gov.pl. Aplikacja miała zwiększyć świadomość społeczną dotyczącą bezpieczeństwa drogowego.

## 2. Rezultaty

### Zrealizowane funkcje:
- Dashboard główny z 4 KPI i filtrami wg lat
- Mapa choropleth Polski wg 16 województw
- Analiza miesięczna i godzinowa wypadków
- Analiza wg rodzajów zdarzeń
- Trend wieloletni dla Gdyni (2015-2026)
- Pełna dokumentacja open-source

### Wykorzystane źródła danych:
- Dataset 834 (Policja) — 3 lata danych (2018, 2020, 2025)
- Otwarte Dane Gdynia — kwartały 2015-2026

## 3. Porównanie z planem

| Element | Plan | Realizacja | Status |
|---------|------|------------|--------|
| Dashboard z KPI | Tak | Tak | ✅ |
| Mapa choropleth | Tak | Tak (SVG) | ✅ |
| Filtry (rok, region) | Tak | Tak | ✅ |
| Tabela z wyszukiwarką | Tak | Tak | ✅ |
| Trend miesięczny | Tak | Tak | ✅ |
| Strona źródeł danych | Tak | Tak | ✅ |
| Pliki open-source | Tak | Tak | ✅ |
| Docker | Tak | Tak | ✅ |
| CI/CD | Tak | Tak | ✅ |
| Testy | Tak | Tak | ✅ |

## 4. Wpływ

- Udostępnienie danych o wypadkach w przystępnej formie wizualnej
- Możliwość porównania bezpieczeństwa drogowego między regionami
- Identyfikacja trendów (spadek ofiar śmiertelnych o 33% między 2018 a 2025)
- Open-source — każdy może kontynuować pracę

## 5. Wnioski

1. Dane z dane.gov.pl są dostępne, ale wymagają przetworzenia (różne formaty CSV, kodowania)
2. Brak jednolitego API do danych Policji — każdy rok to osobny plik
3. Bezpieczeństwo drogowe poprawia się — spadek wypadków i ofiar
4. Mazowieckie stałe dominuje w statystykach ze względu na największy ruch
