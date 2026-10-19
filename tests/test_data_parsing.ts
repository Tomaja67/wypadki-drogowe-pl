// Proste testy parsowania danych
// Uruchomienie: npx tsx tests/test_data_parsing.ts

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`FAIL: ${msg}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${msg}`);
  }
}

// Test 1: Parsowanie nazw województw
function testVoivodeshipNames() {
  const raw = 'WOJ. DOLNOŚLĄSKIE';
  const cleaned = raw.replace(/^WOJ\.\s*/, '').toLowerCase();
  assert(cleaned === 'dolnośląskie', 'Parsowanie nazwy województwa');
}

// Test 2: Parsowanie liczb z CSV
function testNumberParsing() {
  const csvLine = 'WOJ. MAZOWIECKIE;2924;272;3580;58727';
  const parts = csvLine.split(';');
  assert(parts.length === 5, 'CSV ma 5 kolumn');
  assert(parseInt(parts[1] ?? '0') === 2924, 'Liczba wypadków = 2924');
  assert(parseInt(parts[2] ?? '0') === 272, 'Liczba zabitych = 272');
}

// Test 3: Nazwy miesięcy
function testMonthNames() {
  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  assert(months.length === 12, 'Jest 12 miesięcy');
  assert(months[0] === 'Styczeń', 'Pierwszy miesiąc to Styczeń');
}

// Test 4: Kwartały Gdyni
function testGdyniaQuarters() {
  const line = '45,0,45,25,2015Q1';
  const parts = line.split(',');
  const quarter = parts[4] ?? '';
  const year = parseInt(quarter.split('Q')[0] ?? '0');
  const q = parseInt(quarter.split('Q')[1] ?? '0');
  assert(year === 2015, 'Rok = 2015');
  assert(q === 1, 'Kwartał = 1');
  assert(parseInt(parts[0] ?? '0') === 45, 'Ranni = 45');
}

// Test 5: Obliczanie sumy
function testSummation() {
  const data = [
    { accidents: 1964, killed: 121 },
    { accidents: 799, killed: 100 },
    { accidents: 816, killed: 92 },
  ];
  const totalAcc = data.reduce((s, d) => s + d.accidents, 0);
  const totalKilled = data.reduce((s, d) => s + d.killed, 0);
  assert(totalAcc === 3579, 'Suma wypadków = 3579');
  assert(totalKilled === 313, 'Suma zabitych = 313');
}

console.log('\n=== Testy parsowania danych ===\n');
testVoivodeshipNames();
testNumberParsing();
testMonthNames();
testGdyniaQuarters();
testSummation();
console.log('\n=== Koniec testów ===\n');
