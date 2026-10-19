#!/usr/bin/env python3
"""
Skrypt pobierający dane z dane.gov.pl i Otwartych Danych Gdyni.
Użycie: python3 scripts/download_data.py
"""

import os
import urllib.request

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'nextjs_space', 'data')
os.makedirs(DATA_DIR, exist_ok=True)

FILES = {
    'woj_2025.csv': 'https://api.dane.gov.pl/media/resources/20260320/Zdarzenia_w_ruchu_drogowych_w_2025_r._-_podzia%C5%82_na_wojew%C3%B3dztwa.csv',
    'woj_2020.csv': 'https://api.dane.gov.pl/media/resources/20210421/Zdarzenia_w_ruchu_drogowych_w_2020_r._-_podzia%C5%82_na_wojew%C3%B3dztwa.csv',
    'woj_2018.csv': 'https://www.dane.gov.pl/media/resources/20190319/Wojew%C3%B3dztwa.csv',
    'miesiace_2025.csv': 'https://api.dane.gov.pl/media/resources/20260320/Zdarzenia_w_ruchu_drogowych_w_2025_r._-_statystyka_og%C3%B3lna_-_podzia%C5%82_na_miesi%C4%85ce.csv',
    'godziny_2025.csv': 'https://api.dane.gov.pl/media/resources/20260320/Zdarzenia_w_ruchu_drogowych_w_2025_r._-_statystyka_og%C3%B3lna_-_podzia%C5%82_na_godziny.csv',
    'rodzaj_2025.csv': 'https://api.dane.gov.pl/media/resources/20260320/Zdarzenia_w_ruchu_drogowych_w_2025_r._-_statystyka_og%C3%B3lna_-_rodzaj_zdarzenia.csv',
    'gdynia_wypadki.csv': 'https://otwartedane.gdynia.pl/pl/dataset/51860541-3bca-42e0-98fa-bafdd539f3dd/resource/ad5e545d-1ddc-4dd6-af32-04755dfba530/download/city_7_4_data.csv',
}

def main():
    for filename, url in FILES.items():
        dest = os.path.join(DATA_DIR, filename)
        print(f'Pobieranie {filename}...')
        try:
            urllib.request.urlretrieve(url, dest)
            print(f'  Zapisano: {dest}')
        except Exception as e:
            print(f'  Błąd: {e}')

    print('\nGotowe! Pliki zapisane w:', DATA_DIR)

if __name__ == '__main__':
    main()
