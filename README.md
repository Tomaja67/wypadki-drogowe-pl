# 🚗 Wypadki Drogowe PL

Interaktywny dashboard analizujący wypadki drogowe w Polsce na podstawie otwartych danych z portalu [dane.gov.pl](https://dane.gov.pl).

![License](https://img.shields.io/badge/license-MIT-green) ![Data](https://img.shields.io/badge/data-dane.gov.pl-blue)

## 🎯 Cel projektu

Celem projektu jest zwiększenie świadomości społecznej na temat bezpieczeństwa drogowego w Polsce poprzez wizualizację i analizę oficjalnych danych Policji.

## 🌐 Demo

**[▶ Otwórz demo](https://wypadki-drogowe-pl-66kv5a-119d74dd9b.abacusai.app)**

## 📊 Źródła danych

1. **Policja — Zdarzenia w ruchu drogowym** (dataset 834 na dane.gov.pl)
   - Statystyki wg województw: 2018, 2020, 2025
   - Podział na miesiące, godziny, rodzaje zdarzeń (2025)
2. **UM Gdynia — Otwarte Dane**
   - Kwartalne dane o wypadkach 2015–2026

## ✨ Funkcje

- 📊 Dashboard z KPI (wypadki, zabici, ranni, kolizje)
- 🗺️ Mapa choropleth Polski wg województw
- 📈 Trend miesięczny i godzinowy wypadków
- 🚗 Analiza wg typów zdarzeń
- 📉 Wieloletni trend dla Gdyni
- 🔍 Tabela z wyszukiwarką i sortowaniem
- 🌙 Tryb ciemny/jasny

## 🚀 Szybki start

### Docker (zalecane)

```bash
git clone https://github.com/Tomaja67/wypadki-drogowe-pl.git
cd wypadki-drogowe-pl
cp .env.example .env
docker compose up
```

Aplikacja będzie dostępna pod `http://localhost:3000`.

### Lokalnie

```bash
git clone https://github.com/Tomaja67/wypadki-drogowe-pl.git
cd wypadki-drogowe-pl/nextjs_space
cp .env.example .env
# Edytuj .env i ustaw DATABASE_URL na swoją bazę PostgreSQL
yarn install
npx prisma generate
npx prisma db push
yarn prisma db seed
yarn dev
```

### Darmowy hosting

Projekt można wdrożyć bezpłatnie na platformie [Abacus.AI](https://abacus.ai).

## 📁 Struktura projektu

```
wypadki-drogowe-pl/
├── nextjs_space/          # Aplikacja webowa
│   ├── app/               # Strony i API routes
│   ├── components/        # Komponenty React
│   ├── lib/               # Logika biznesowa
│   ├── prisma/            # Schemat bazy danych
│   ├── scripts/           # Seed i pobieranie danych
│   └── data/              # Pobrane pliki CSV
├── docs/                  # Dokumentacja
├── scripts/               # Skrypty pomocnicze
├── tests/                 # Testy
├── .github/               # CI/CD, szablony issue/PR
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🧪 Testy

```bash
cd nextjs_space && yarn test
```

## 📄 Licencja

MIT © Tomaja67
