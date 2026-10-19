# Lessons Learned — Wypadki Drogowe PL

---

**Identyfikator dokumentu:** WDP-DOC-002
**Wersja:** 1.0
**Autor:** Tomaja67
**Data utworzenia:** 2026-10-19
**Historia zmian:**

| Wersja | Data | Autor | Opis zmian |
|--------|------|-------|------------|
| 1.0 | 2026-10-19 | Tomaja67 | Wersja początkowa |

---

## Co zadziałało

1. **Wykorzystanie pre-agregowanych danych w bazie** — API zwraca gotowe agregaty, dzięki czemu dashboard ładuje się błyskawicznie
2. **Podejście data-first** — najpierw pobraliśmy i zbadaliśmy dane, potem projektowaliśmy schemat bazy
3. **AbacusDashboard kit** — gotowy komponent dashboardowy drastycznie skrócił czas developmentu
4. **SVG mapa** — lekka i szybka alternatywa dla ciężkich bibliotek mapowych

## Co nie zadziałało

1. **Kodowanie plików CSV** — różne pliki używały cp1250 i UTF-8, co wymagało dodatkowej obsługi
2. **Brak API czasu rzeczywistego** — dane dane.gov.pl to statyczne pliki, nie live API
3. **Brak geolokalizacji wypadków** — dane Policji nie zawierają współrzędnych GPS poszczególnych zdarzeń

## Co zrobilibyśmy inaczej

1. Dodalibyśmy więcej lat danych (2016-2024) dla pełniejszego trendu
2. Użylibyśmy GeoJSON z oficjalnymi granicami województw zamiast uproszczonego SVG
3. Zintegrowalibyśmy dane z GUS o populacji dla wskaźników per capita

## Rekomendacje

1. Regularnie aktualizować dane po publikacji nowych roczników
2. Rozważyć integracje z SEWIK (System Ewidencji Wypadków i Kolizji)
3. Dodać dane GUS o populacji województw dla normalizacji wskaźników
