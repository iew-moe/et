const I18N = {
  de: {
    title: 'Übung: Single-Choice Aufgabensammlung',
    loading: '[... loading ...]',
    lang: 'Sprache:',
    seed: 'Seed:',
    seedPlaceholder: 'leer = random',
    genSeed: 'Generieren (Seed)',
    genRandom: 'Generieren (Random)',
    values: 'Hinweise',
    infoText: 'Pro Thema wird eine Frage gestellt; genau eine Antwort ist jeweils richtig. Jede Frage wird sofort beim Anklicken ausgewertet. Ein Thema gilt als erledigt, wenn eine Frage daraus im ersten Versuch richtig beantwortet wurde. Der Zähler steigt nur bei neuen Aufgaben bzw. neuen Zahlenwerten; bereits gelöste Aufgaben werden bei der Auswahl möglichst vermieden. Sobald du geübt hast, stehen die Themen mit dem größten Übungsbedarf oben. Formelsammlung und Taschenrechner sind erlaubt.',
    topicsTitle: 'Themenfortschritt (Anzahl im ersten Versuch richtig gelöst)',
    legend: 'Belohnungen (im ersten Versuch richtig): ✅ 1× · 🌟 2× · 🚀 ab 3× · 🏆 ab 5× · 🦄 ab 8×',
    legendFail: 'Übungsbedarf (im ersten Versuch falsch): 😅 1× · 🙈 2× · 🌧️ ab 3× · 🧯 ab 5× · 🆘 ab 8×',
    questionWord: 'Frage',
    showSolution: 'Musterlösung anzeigen',
    correctAnswer: 'Richtige Antwort',
    okPrefix: 'Richtig!',
    okFirstTry: 'Thema erledigt (erster Versuch) — Zähler +1.',
    okKnown: 'Diese Aufgabe hattest du bereits gelöst — der Zähler erhöht sich nur bei neuen Aufgaben bzw. neuen Zahlenwerten.',
    okRetry: 'Gelöst — zählt aber nicht als erster Versuch. Beim nächsten Durchgang kommt eine neue Frage zu diesem Thema.',
    revealed: 'Aufgedeckt (ohne Wertung).',
    status: 'Dieser Durchgang: {a} von {m} Fragen beantwortet, {n} richtig, davon {f} im ersten Versuch.',
    tutorAsk: 'Ich habe bei „{q}“ die Option {sel} gewählt und das ist falsch. Gib mir bitte einen Hinweis, ohne die richtige Option zu verraten.',
    none: 'Keine der anderen Antwortmöglichkeiten ist korrekt.',
    noneFits: 'Keine der anderen Antwortmöglichkeiten trifft zu.',
    noneVals: 'Keiner der angegebenen Werte stimmt.',
    topics: {
      ohm: 'Ohmsches Gesetz & Leiter',
      temp: 'Temperaturabhängigkeit',
      netz: 'Reihe/Parallel & Ersatzwiderstand',
      teiler: 'Spannungs- & Stromteiler',
      methoden: 'Netzwerkanalyse & Ersatzquelle',
      uels: 'Überlagerungssatz',
      blind: 'Blindwiderstand & Impedanz',
      komplex: 'Komplexe Rechnung',
      wz: 'Wechselgrößen & Zeigerdiagramm',
      resonanz: 'Schwingkreis & Frequenzverhalten',
      cl: 'Kondensator & Spule'
    }
  },
  en: {
    title: 'Exercise: Single-Choice Problem Collection',
    loading: '[... loading ...]',
    lang: 'Language:',
    seed: 'Seed:',
    seedPlaceholder: 'empty = random',
    genSeed: 'Generate (Seed)',
    genRandom: 'Generate (Random)',
    values: 'Notes',
    infoText: 'One question per topic; exactly one answer is correct. Each question is evaluated immediately when you click an option. A topic counts as done when one of its questions is answered correctly on the first attempt. The counter only increases for new tasks or new numeric values; already solved tasks are avoided when selecting questions. Once you have practised, the topics that need the most practice appear at the top. Formula sheet and calculator are allowed.',
    topicsTitle: 'Topic progress (number solved correctly on first attempt)',
    legend: 'Rewards (correct on first attempt): ✅ 1× · 🌟 2× · 🚀 from 3× · 🏆 from 5× · 🦄 from 8×',
    legendFail: 'Needs practice (wrong on first attempt): 😅 1× · 🙈 2× · 🌧️ from 3× · 🧯 from 5× · 🆘 from 8×',
    questionWord: 'Question',
    showSolution: 'Show worked solution',
    correctAnswer: 'Correct answer',
    okPrefix: 'Correct!',
    okFirstTry: 'Topic done (first attempt) — counter +1.',
    okKnown: 'You had already solved this task — the counter only increases for new tasks or new numeric values.',
    okRetry: 'Solved — but not on the first attempt. The next run will present a new question for this topic.',
    revealed: 'Revealed (not counted).',
    status: 'This run: {a} of {m} questions answered, {n} correct, {f} of them on the first attempt.',
    tutorAsk: 'For “{q}” I chose option {sel} and it is wrong. Please give me a hint without revealing the correct option.',
    none: 'None of the other options is correct.',
    noneFits: 'None of the other options applies.',
    noneVals: 'None of the given values is correct.',
    topics: {
      ohm: "Ohm's law & conductors",
      temp: 'Temperature dependence',
      netz: 'Series/parallel & equivalent resistance',
      teiler: 'Voltage & current divider',
      methoden: 'Network analysis & equivalent source',
      uels: 'Superposition theorem',
      blind: 'Reactance & impedance',
      komplex: 'Complex calculation',
      wz: 'AC quantities & phasor diagram',
      resonanz: 'Resonant circuit & frequency behaviour',
      cl: 'Capacitor & inductor'
    }
  }
};
let LANG = localStorage.getItem('lang') || 'de';
if (!I18N[LANG]) LANG = 'de';

function tr(k) {
  return (I18N[LANG] && I18N[LANG][k]) || I18N.de[k] || k;
}

// Dezimaldarstellung: Punkt (Datenbasis) -> Komma im Deutschen.
function num(x, lang) {
  const s = String(x);
  return lang === 'de' ? s.replace('.', ',') : s;
}

const TOPICS = ['ohm', 'temp', 'netz', 'teiler', 'methoden', 'uels', 'blind', 'komplex', 'wz', 'resonanz', 'cl'];

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('exerciseProgress') || '{}');
  } catch {
    return {};
  }
}

function saveProgress(p) {
  localStorage.setItem('exerciseProgress', JSON.stringify(p));
}

// Fortschritt wird pro THEMA gespeichert:
// - exerciseProgress.single_choice[topicId] = 0/100 (fuer den Ring auf der Startseite)
// - singleChoiceTopicCounts[topicId] = Anzahl im ersten Versuch richtig geloester Fragen
const TOPIC_COUNTS_KEY = 'singleChoiceTopicCounts';

function loadTopicCounts() {
  try {
    return JSON.parse(localStorage.getItem(TOPIC_COUNTS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveTopicCounts(c) {
  localStorage.setItem(TOPIC_COUNTS_KEY, JSON.stringify(c));
}

function topicCount(topicId) {
  return Number(loadTopicCounts()[topicId] || 0);
}

function migrateAndInitTopics() {
  const p = loadProgress();
  const sc = p.single_choice || {};
  let changed = false;
  for (const key of Object.keys(sc)) {
    if (!TOPICS.includes(key)) { delete sc[key]; changed = true; }
  }
  for (const t of TOPICS) {
    if (!(t in sc)) { sc[t] = 0; changed = true; }
  }
  p.single_choice = sc;
  if (changed) saveProgress(p);

  const counts = loadTopicCounts();
  let cChanged = false;
  for (const t of TOPICS) {
    if (!(t in counts)) {
      counts[t] = Number(sc[t] || 0) >= 100 ? 1 : 0;
      cChanged = true;
    }
  }
  if (cChanged) saveTopicCounts(counts);
}

function topicDone(topicId) {
  return topicCount(topicId) >= 1;
}

// "Problemfaelle": Anzahl im ersten Versuch FALSCH beantworteter Fragen pro Thema.
const TOPIC_FAILS_KEY = 'singleChoiceTopicFails';

function loadTopicFails() {
  try {
    return JSON.parse(localStorage.getItem(TOPIC_FAILS_KEY) || '{}');
  } catch {
    return {};
  }
}

function topicFailCount(topicId) {
  return Number(loadTopicFails()[topicId] || 0);
}

function creditFail(topicId) {
  const f = loadTopicFails();
  f[topicId] = Number(f[topicId] || 0) + 1;
  localStorage.setItem(TOPIC_FAILS_KEY, JSON.stringify(f));
}

function failEmoji(n) {
  if (n >= 8) return '🆘';
  if (n >= 5) return '🧯';
  if (n >= 3) return '🌧️';
  if (n >= 2) return '🙈';
  if (n >= 1) return '😅';
  return '';
}

// Kompakter Fortschrittstext eines Themas, z. B. "✅×2 😅×1".
function topicScoreText(topicId) {
  const n = topicCount(topicId);
  const f = topicFailCount(topicId);
  const parts = [];
  if (n >= 1) parts.push(`${topicEmoji(n)}×${n}`);
  if (f >= 1) parts.push(`${failEmoji(f)}×${f}`);
  return parts.join(' ');
}

// Bereits (irgendwann) richtig geloeste Aufgaben(-Varianten), Schluessel: id bzw. id#variante.
const SOLVED_TASKS_KEY = 'singleChoiceSolvedTasks';

function loadSolvedTasks() {
  try {
    return JSON.parse(localStorage.getItem(SOLVED_TASKS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveSolvedTasks(s) {
  localStorage.setItem(SOLVED_TASKS_KEY, JSON.stringify(s));
}

function comboKey(q, vi) {
  return q.variants ? `${q.id}#${vi}` : q.id;
}

function markTaskSolved(key) {
  const s = loadSolvedTasks();
  if (!s[key]) {
    s[key] = true;
    saveSolvedTasks(s);
  }
}

// Emoji-Belohnung fuer besonders motivierte Studierende.
function topicEmoji(n) {
  if (n >= 8) return '🦄';
  if (n >= 5) return '🏆';
  if (n >= 3) return '🚀';
  if (n >= 2) return '🌟';
  if (n >= 1) return '✅';
  return '○';
}

function creditTopic(topicId) {
  const counts = loadTopicCounts();
  counts[topicId] = Number(counts[topicId] || 0) + 1;
  saveTopicCounts(counts);
  const p = loadProgress();
  if (!p.single_choice) p.single_choice = {};
  p.single_choice[topicId] = 100;
  saveProgress(p);
}

function setLoadingTitle(isLoading) {
  const t = isLoading ? `${tr('title')} ${tr('loading')}` : tr('title');
  document.title = t;
  const h = document.getElementById('main-title');
  if (h) h.textContent = t;
}

function applyLanguageUI() {
  document.documentElement.lang = LANG;
  document.getElementById('lbl-lang').textContent = tr('lang');
  document.getElementById('lbl-seed').textContent = tr('seed');
  const seed = document.getElementById('seed');
  if (seed) seed.placeholder = tr('seedPlaceholder');
  document.getElementById('gen-seed').textContent = tr('genSeed');
  document.getElementById('gen-random').textContent = tr('genRandom');
  const showSolution = document.getElementById('show-solution');
  if (showSolution) showSolution.textContent = tr('showSolution');
  setLoadingTitle(false);
}

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stableSeed(seedText) {
  const s = String(seedText || '').trim();
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  return Math.floor(100000 + Math.random() * 900000);
}

// ---------------------------------------------------------------------------
// Fragenpool. Konventionen:
// - Konzeptfragen: feste Texte in q.de / q.en; opts[0] ist die richtige Antwort.
// - Rechenfragen: q.variants (Zahlenwert-Kombinationen) + q.tpl.de/en(v).
//   Auch dort liefert tpl(...).opts[0] die richtige Antwort.
// - Anzeige-Reihenfolge der Optionen wird seed-basiert gemischt.
// - Notation wie in der Formelsammlung: komplexe Groessen/Zeiger unterstrichen
//   (<u>), Indizes als <sub>, Amplituden mit Dach, Effektivwerte gross.
// ---------------------------------------------------------------------------
const QUESTIONS = [
  // ---------- Thema: Ohmsches Gesetz & Leiter ----------
  {
    id: 'dc_ohm', topic: 'ohm',
    // ok/w1/w2: [R-Text, U-Text]; nur ok erfuellt U = R*I.
    variants: [
      { i: '50 A', ok: ['2 Ω', '100 V'], w1: ['100 Ω', '2 V'], w2: ['0.5 Ω', '100 V'], calc: 'U = R·I = 2 Ω · 50 A = 100 V' },
      { i: '2 A', ok: ['30 Ω', '60 V'], w1: ['60 Ω', '30 V'], w2: ['15 Ω', '60 V'], calc: 'U = R·I = 30 Ω · 2 A = 60 V' },
      { i: '10 A', ok: ['1.2 Ω', '12 V'], w1: ['12 Ω', '1.2 V'], w2: ['0.6 Ω', '12 V'], calc: 'U = R·I = 1.2 Ω · 10 A = 12 V' },
      { i: '0.5 A', ok: ['200 Ω', '100 V'], w1: ['100 Ω', '200 V'], w2: ['400 Ω', '100 V'], calc: 'U = R·I = 200 Ω · 0.5 A = 100 V' },
      { i: '5 A', ok: ['4 Ω', '20 V'], w1: ['20 Ω', '4 V'], w2: ['2 Ω', '20 V'], calc: 'U = R·I = 4 Ω · 5 A = 20 V' }
    ],
    tpl: {
      de: (v) => ({
        q: `Für den Strom I durch einen ohmschen Widerstand R und die Spannung U am Widerstand kann bei I = ${num(v.i, 'de')} gelten:`,
        opts: [
          `R = ${num(v.ok[0], 'de')} und U = ${num(v.ok[1], 'de')}`,
          `R = ${num(v.w1[0], 'de')} und U = ${num(v.w1[1], 'de')}`,
          `R = ${num(v.w2[0], 'de')} und U = ${num(v.w2[1], 'de')}`,
          I18N.de.none
        ],
        expl: `Ohmsches Gesetz: ${num(v.calc, 'de')}. Bei den anderen Kombinationen ergibt U/R nicht ${num(v.i, 'de')}.`
      }),
      en: (v) => ({
        q: `For the current I through an ohmic resistor R and the voltage U across it, with I = ${v.i} the following can hold:`,
        opts: [
          `R = ${v.ok[0]} and U = ${v.ok[1]}`,
          `R = ${v.w1[0]} and U = ${v.w1[1]}`,
          `R = ${v.w2[0]} and U = ${v.w2[1]}`,
          I18N.en.none
        ],
        expl: `Ohm's law: ${v.calc}. For the other combinations U/R does not equal ${v.i}.`
      })
    }
  },
  {
    id: 'dc_leiter', topic: 'ohm',
    // rho = 0.0179 µΩm (Kupfer); ok = rho*l/A.
    variants: [
      { l: '100 m', a: '1.79 mm²', ok: '1 Ω', w1: '0.1 Ω', w2: '10 Ω', calc: 'R = 0.0179·10⁻⁶ Ωm · 100 m / (1.79·10⁻⁶ m²) = 1 Ω' },
      { l: '200 m', a: '1.79 mm²', ok: '2 Ω', w1: '0.2 Ω', w2: '20 Ω', calc: 'R = 0.0179·10⁻⁶ Ωm · 200 m / (1.79·10⁻⁶ m²) = 2 Ω' },
      { l: '100 m', a: '3.58 mm²', ok: '0.5 Ω', w1: '5 Ω', w2: '0.05 Ω', calc: 'R = 0.0179·10⁻⁶ Ωm · 100 m / (3.58·10⁻⁶ m²) = 0.5 Ω' },
      { l: '350 m', a: '1.79 mm²', ok: '3.5 Ω', w1: '0.35 Ω', w2: '35 Ω', calc: 'R = 0.0179·10⁻⁶ Ωm · 350 m / (1.79·10⁻⁶ m²) = 3.5 Ω' },
      { l: '70 m', a: '0.358 mm²', ok: '3.5 Ω', w1: '0.35 Ω', w2: '35 Ω', calc: 'R = 0.0179·10⁻⁶ Ωm · 70 m / (0.358·10⁻⁶ m²) = 3.5 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Ein Kupferleiter (ρ = 0,0179 µΩm) hat die Länge l = ${num(v.l, 'de')} und die Querschnittsfläche A = ${num(v.a, 'de')}. Sein Widerstand beträgt:`,
        opts: [`R = ${num(v.ok, 'de')}`, `R = ${num(v.w1, 'de')}`, `R = ${num(v.w2, 'de')}`, I18N.de.none],
        expl: `R = ρ·l/A: ${num(v.calc, 'de')}. Tipp: µΩm und mm² konsequent in SI umrechnen.`
      }),
      en: (v) => ({
        q: `A copper conductor (ρ = 0.0179 µΩm) has length l = ${v.l} and cross-sectional area A = ${v.a}. Its resistance is:`,
        opts: [`R = ${v.ok}`, `R = ${v.w1}`, `R = ${v.w2}`, I18N.en.none],
        expl: `R = ρ·l/A: ${v.calc}. Tip: convert µΩm and mm² consistently to SI units.`
      })
    }
  },
  // ---------- Thema: Temperaturabhängigkeit ----------
  {
    id: 'dc_temp', topic: 'temp',
    variants: [
      { r0: '1 Ω', al: '4·10⁻³', th: '120 °C', ok: '1.4 Ω', w: ['1.48 Ω', '0.6 Ω', '4.8 Ω'], calc: 'R = 1 Ω · (1 + 0.004 · 100 K) = 1.4 Ω' },
      { r0: '10 Ω', al: '4·10⁻³', th: '70 °C', ok: '12 Ω', w: ['2 Ω', '10.2 Ω', '8 Ω'], calc: 'R = 10 Ω · (1 + 0.004 · 50 K) = 12 Ω' },
      { r0: '2 Ω', al: '5·10⁻³', th: '120 °C', ok: '3 Ω', w: ['1 Ω', '2.5 Ω', '12 Ω'], calc: 'R = 2 Ω · (1 + 0.005 · 100 K) = 3 Ω' },
      { r0: '100 mΩ', al: '4·10⁻³', th: '45 °C', ok: '110 mΩ', w: ['90 mΩ', '104.5 mΩ', '140 mΩ'], calc: 'R = 100 mΩ · (1 + 0.004 · 25 K) = 110 mΩ' },
      { r0: '50 Ω', al: '2·10⁻³', th: '170 °C', ok: '65 Ω', w: ['35 Ω', '50.3 Ω', '15 Ω'], calc: 'R = 50 Ω · (1 + 0.002 · 150 K) = 65 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Ein Widerstand hat bei ϑ<sub>0</sub> = 20 °C den Wert R<sub>0</sub> = ${num(v.r0, 'de')}; der Temperaturbeiwert ist α<sub>0</sub> = ${v.al} K⁻¹. Bei ϑ = ${num(v.th, 'de')} gilt:`,
        opts: [`R = ${num(v.ok, 'de')}`, `R = ${num(v.w[0], 'de')}`, `R = ${num(v.w[1], 'de')}`, `R = ${num(v.w[2], 'de')}`],
        expl: `R(ϑ) = R<sub>0</sub>·[1 + α<sub>0</sub>·(ϑ − ϑ<sub>0</sub>)]: ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `A resistor has R<sub>0</sub> = ${v.r0} at ϑ<sub>0</sub> = 20 °C; the temperature coefficient is α<sub>0</sub> = ${v.al} K⁻¹. At ϑ = ${v.th}:`,
        opts: [`R = ${v.ok}`, `R = ${v.w[0]}`, `R = ${v.w[1]}`, `R = ${v.w[2]}`],
        expl: `R(ϑ) = R<sub>0</sub>·[1 + α<sub>0</sub>·(ϑ − ϑ<sub>0</sub>)]: ${v.calc}.`
      })
    }
  },
  {
    id: 'dc_ptc', topic: 'temp',
    de: { q: 'Welche Aussage zu Heiß- und Kaltleitern ist richtig?',
      opts: ['Bei einem Kaltleiter (PTC, α<sub>0</sub> &gt; 0) steigt der Widerstand mit steigender Temperatur.',
        'Bei einem Kaltleiter sinkt der Widerstand mit steigender Temperatur.',
        'Bei einem Heißleiter (NTC) ist der Widerstand temperaturunabhängig.',
        'Keine der anderen Antwortmöglichkeiten ist korrekt.'],
      expl: 'Kaltleiter (PTC, α<sub>0</sub> &gt; 0): ϑ↑ ⇒ R↑. Heißleiter (NTC, α<sub>0</sub> &lt; 0): ϑ↑ ⇒ R↓.' },
    en: { q: 'Which statement about PTC and NTC resistors is correct?',
      opts: ['For a PTC resistor (α<sub>0</sub> &gt; 0) the resistance increases with increasing temperature.',
        'For a PTC resistor the resistance decreases with increasing temperature.',
        'For an NTC resistor the resistance is independent of temperature.',
        'None of the other options is correct.'],
      expl: 'PTC (α<sub>0</sub> &gt; 0): ϑ↑ ⇒ R↑. NTC (α<sub>0</sub> &lt; 0): ϑ↑ ⇒ R↓.' }
  },
  // ---------- Thema: Reihe/Parallel & Ersatzwiderstand ----------
  {
    id: 'dc_par_statement', topic: 'netz',
    de: { q: 'Welche Aussage bezüglich einer Parallelschaltung mehrerer unterschiedlicher ohmscher Widerstände ist richtig?',
      opts: ['Der Gesamtwiderstand ist kleiner als der kleinste Einzelwiderstand.',
        'Der Gesamtwiderstand entspricht der Summe der Einzelwiderstände.',
        'Durch alle Widerstände fließt der gleiche Strom.',
        'Keine der anderen Antwortmöglichkeiten ist korrekt.'],
      expl: 'Eine Parallelschaltung reduziert den Gesamtwiderstand (R<sub>E</sub> kleiner als der kleinste Einzelwiderstand). Gemeinsam ist die Spannung, nicht der Strom.' },
    en: { q: 'Which statement about a parallel connection of several different ohmic resistors is correct?',
      opts: ['The total resistance is smaller than the smallest individual resistance.',
        'The total resistance equals the sum of the individual resistances.',
        'The same current flows through all resistors.',
        'None of the other options is correct.'],
      expl: 'A parallel connection reduces the total resistance (R<sub>E</sub> below the smallest individual value). The voltage is common, not the current.' }
  },
  {
    id: 'dc_ser_statement', topic: 'netz',
    de: { q: 'Welche Aussage bezüglich einer Reihenschaltung mehrerer unterschiedlicher ohmscher Widerstände ist richtig?',
      opts: ['Durch alle Widerstände fließt der gleiche Strom.',
        'An allen Widerständen liegt die gleiche Spannung.',
        'Der Gesamtwiderstand ist kleiner als der größte Einzelwiderstand.',
        'Keine der anderen Antwortmöglichkeiten ist korrekt.'],
      expl: 'In der Reihenschaltung fließt durch alle Bauelemente derselbe Strom; R<sub>E</sub> = ΣR<sub>k</sub> ist größer als jeder Einzelwiderstand.' },
    en: { q: 'Which statement about a series connection of several different ohmic resistors is correct?',
      opts: ['The same current flows through all resistors.',
        'The same voltage is across all resistors.',
        'The total resistance is smaller than the largest individual resistance.',
        'None of the other options is correct.'],
      expl: 'In a series connection the same current flows through all components; R<sub>E</sub> = ΣR<sub>k</sub> exceeds every individual resistance.' }
  },
  {
    id: 'dc_rab', topic: 'netz',
    // R1 parallel zu (R2 + R3); w1 = Summe aller drei (klassischer Fehler).
    variants: [
      { r1: 6, r2: 2, r3: 4, ok: '3 Ω', w1: '12 Ω', w2: '2 Ω', calc: 'R₂+R₃ = 6 Ω; 6 Ω ∥ 6 Ω = 3 Ω' },
      { r1: 4, r2: 1, r3: 3, ok: '2 Ω', w1: '8 Ω', w2: '1 Ω', calc: 'R₂+R₃ = 4 Ω; 4 Ω ∥ 4 Ω = 2 Ω' },
      { r1: 12, r2: 2, r3: 4, ok: '4 Ω', w1: '18 Ω', w2: '3 Ω', calc: 'R₂+R₃ = 6 Ω; 12 Ω ∥ 6 Ω = 12·6/18 = 4 Ω' },
      { r1: 10, r2: 4, r3: 6, ok: '5 Ω', w1: '20 Ω', w2: '4 Ω', calc: 'R₂+R₃ = 10 Ω; 10 Ω ∥ 10 Ω = 5 Ω' },
      { r1: 3, r2: 2, r3: 4, ok: '2 Ω', w1: '9 Ω', w2: '1.5 Ω', calc: 'R₂+R₃ = 6 Ω; 3 Ω ∥ 6 Ω = 3·6/9 = 2 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `R<sub>1</sub> = ${v.r1} Ω liegt parallel zur Reihenschaltung aus R<sub>2</sub> = ${v.r2} Ω und R<sub>3</sub> = ${v.r3} Ω. Der Ersatzwiderstand bezüglich der Klemmen A–B beträgt:`,
        opts: [`R<sub>AB</sub> = ${num(v.ok, 'de')}`, `R<sub>AB</sub> = ${num(v.w1, 'de')}`, `R<sub>AB</sub> = ${num(v.w2, 'de')}`, I18N.de.none],
        expl: `Erst Reihe, dann parallel: ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `R<sub>1</sub> = ${v.r1} Ω is in parallel with the series connection of R<sub>2</sub> = ${v.r2} Ω and R<sub>3</sub> = ${v.r3} Ω. The equivalent resistance at terminals A–B is:`,
        opts: [`R<sub>AB</sub> = ${v.ok}`, `R<sub>AB</sub> = ${v.w1}`, `R<sub>AB</sub> = ${v.w2}`, I18N.en.none],
        expl: `Series first, then parallel: ${v.calc}.`
      })
    }
  },
  // ---------- Thema: Spannungs- & Stromteiler ----------
  {
    id: 'dc_vdiv', topic: 'teiler',
    // ok = U0*R2/(R1+R2); w1 = vertauschter Teiler (U an R1); w2 = weiterer Fehlwert.
    variants: [
      { u0: '12 V', r1: '2 kΩ', r2: '4 kΩ', ok: '8 V', w1: '4 V', w2: '6 V', calc: '12 V · 4/(2+4) = 8 V' },
      { u0: '10 V', r1: '1 kΩ', r2: '4 kΩ', ok: '8 V', w1: '2 V', w2: '5 V', calc: '10 V · 4/(1+4) = 8 V' },
      { u0: '9 V', r1: '6 kΩ', r2: '3 kΩ', ok: '3 V', w1: '6 V', w2: '4.5 V', calc: '9 V · 3/(6+3) = 3 V' },
      { u0: '24 V', r1: '1 kΩ', r2: '2 kΩ', ok: '16 V', w1: '8 V', w2: '12 V', calc: '24 V · 2/(1+2) = 16 V' },
      { u0: '15 V', r1: '10 kΩ', r2: '20 kΩ', ok: '10 V', w1: '5 V', w2: '7.5 V', calc: '15 V · 20/(10+20) = 10 V' }
    ],
    tpl: {
      de: (v) => ({
        q: `Unbelasteter Spannungsteiler: U<sub>0</sub> = ${num(v.u0, 'de')}, R<sub>1</sub> = ${num(v.r1, 'de')}, R<sub>2</sub> = ${num(v.r2, 'de')} (in Reihe). Die Spannung U<sub>2</sub> an R<sub>2</sub> beträgt:`,
        opts: [`U<sub>2</sub> = ${num(v.ok, 'de')}`, `U<sub>2</sub> = ${num(v.w1, 'de')}`, `U<sub>2</sub> = ${num(v.w2, 'de')}`, I18N.de.none],
        expl: `Spannungsteilerregel: U<sub>2</sub> = U<sub>0</sub>·R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) = ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `Unloaded voltage divider: U<sub>0</sub> = ${v.u0}, R<sub>1</sub> = ${v.r1}, R<sub>2</sub> = ${v.r2} (in series). The voltage U<sub>2</sub> across R<sub>2</sub> is:`,
        opts: [`U<sub>2</sub> = ${v.ok}`, `U<sub>2</sub> = ${v.w1}`, `U<sub>2</sub> = ${v.w2}`, I18N.en.none],
        expl: `Voltage divider rule: U<sub>2</sub> = U<sub>0</sub>·R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) = ${v.calc}.`
      })
    }
  },
  {
    id: 'dc_idiv', topic: 'teiler',
    // ok = I*R2/(R1+R2); w1 = vertauschter Teiler; w2 = weiterer Fehlwert.
    variants: [
      { i: '6 A', r1: '2 Ω', r2: '4 Ω', ok: '4 A', w1: '2 A', w2: '3 A', calc: '6 A · 4/(2+4) = 4 A' },
      { i: '9 A', r1: '1 Ω', r2: '2 Ω', ok: '6 A', w1: '3 A', w2: '4.5 A', calc: '9 A · 2/(1+2) = 6 A' },
      { i: '10 A', r1: '3 Ω', r2: '2 Ω', ok: '4 A', w1: '6 A', w2: '5 A', calc: '10 A · 2/(3+2) = 4 A' },
      { i: '12 A', r1: '5 Ω', r2: '1 Ω', ok: '2 A', w1: '10 A', w2: '6 A', calc: '12 A · 1/(5+1) = 2 A' },
      { i: '8 A', r1: '6 Ω', r2: '2 Ω', ok: '2 A', w1: '6 A', w2: '4 A', calc: '8 A · 2/(6+2) = 2 A' }
    ],
    tpl: {
      de: (v) => ({
        q: `Der Gesamtstrom I = ${num(v.i, 'de')} teilt sich auf R<sub>1</sub> = ${num(v.r1, 'de')} parallel zu R<sub>2</sub> = ${num(v.r2, 'de')} auf. Der Strom I<sub>1</sub> durch R<sub>1</sub> beträgt:`,
        opts: [`I<sub>1</sub> = ${num(v.ok, 'de')}`, `I<sub>1</sub> = ${num(v.w1, 'de')}`, `I<sub>1</sub> = ${num(v.w2, 'de')}`, I18N.de.none],
        expl: `Stromteilerregel: I<sub>1</sub> = I·R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) = ${num(v.calc, 'de')}. Merke: Der kleinere Widerstand führt den größeren Strom.`
      }),
      en: (v) => ({
        q: `The total current I = ${v.i} splits between R<sub>1</sub> = ${v.r1} in parallel with R<sub>2</sub> = ${v.r2}. The current I<sub>1</sub> through R<sub>1</sub> is:`,
        opts: [`I<sub>1</sub> = ${v.ok}`, `I<sub>1</sub> = ${v.w1}`, `I<sub>1</sub> = ${v.w2}`, I18N.en.none],
        expl: `Current divider rule: I<sub>1</sub> = I·R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) = ${v.calc}. The smaller resistor carries the larger current.`
      })
    }
  },
  // ---------- Thema: Netzwerkanalyse & Ersatzquelle ----------
  {
    id: 'dc_mesh', topic: 'methoden',
    // ok = z-(k-1); Optionen sind reine Zahlen.
    variants: [
      { k: 4, z: 6, ok: '3', w: ['2', '4', '6'] },
      { k: 3, z: 5, ok: '3', w: ['2', '4', '5'] },
      { k: 5, z: 8, ok: '4', w: ['3', '5', '8'] },
      { k: 2, z: 3, ok: '2', w: ['1', '3', '4'] },
      { k: 6, z: 9, ok: '4', w: ['3', '5', '9'] }
    ],
    tpl: {
      de: (v) => ({
        q: `Ein Netzwerk hat k = ${v.k} Knoten und z = ${v.z} Zweige. Wie viele unabhängige Maschengleichungen können aufgestellt werden?`,
        opts: [v.ok, v.w[0], v.w[1], v.w[2]],
        expl: `Anzahl unabhängiger Maschengleichungen: z − (k−1) = ${v.z} − ${v.k - 1} = ${v.ok} (unabhängige Knotengleichungen: k−1 = ${v.k - 1}).`
      }),
      en: (v) => ({
        q: `A network has k = ${v.k} nodes and z = ${v.z} branches. How many independent mesh equations can be set up?`,
        opts: [v.ok, v.w[0], v.w[1], v.w[2]],
        expl: `Number of independent mesh equations: z − (k−1) = ${v.z} − ${v.k - 1} = ${v.ok} (independent node equations: k−1 = ${v.k - 1}).`
      })
    }
  },
  {
    id: 'dc_esq', topic: 'methoden',
    // ok = R1 || R2; w1 = R1+R2; w2 = R1.
    variants: [
      { r1: 6, r2: 3, ok: '2 Ω', w1: '9 Ω', w2: '6 Ω', calc: '6·3/(6+3) = 2 Ω' },
      { r1: 4, r2: 4, ok: '2 Ω', w1: '8 Ω', w2: '4 Ω', calc: '4·4/(4+4) = 2 Ω' },
      { r1: 10, r2: 15, ok: '6 Ω', w1: '25 Ω', w2: '10 Ω', calc: '10·15/(10+15) = 6 Ω' },
      { r1: 12, r2: 6, ok: '4 Ω', w1: '18 Ω', w2: '12 Ω', calc: '12·6/(12+6) = 4 Ω' },
      { r1: 20, r2: 5, ok: '4 Ω', w1: '25 Ω', w2: '20 Ω', calc: '20·5/(20+5) = 4 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Eine Schaltung besteht aus der Spannungsquelle U<sub>0</sub> in Reihe mit R<sub>1</sub> = ${v.r1} Ω; direkt an den Klemmen A–B liegt R<sub>2</sub> = ${v.r2} Ω parallel. Welchen Innenwiderstand R<sub>i</sub> hat die äquivalente Ersatzspannungsquelle?`,
        opts: [`R<sub>i</sub> = ${num(v.ok, 'de')}`, `R<sub>i</sub> = ${num(v.w1, 'de')}`, `R<sub>i</sub> = ${num(v.w2, 'de')}`, I18N.de.none],
        expl: `Quelle deaktivieren (U<sub>0</sub> → Kurzschluss): von den Klemmen aus gesehen R<sub>i</sub> = R<sub>1</sub> ∥ R<sub>2</sub> = ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `A circuit consists of the voltage source U<sub>0</sub> in series with R<sub>1</sub> = ${v.r1} Ω; R<sub>2</sub> = ${v.r2} Ω is connected in parallel directly at terminals A–B. What is the internal resistance R<sub>i</sub> of the equivalent voltage source?`,
        opts: [`R<sub>i</sub> = ${v.ok}`, `R<sub>i</sub> = ${v.w1}`, `R<sub>i</sub> = ${v.w2}`, I18N.en.none],
        expl: `Deactivate the source (U<sub>0</sub> → short circuit): seen from the terminals, R<sub>i</sub> = R<sub>1</sub> ∥ R<sub>2</sub> = ${v.calc}.`
      })
    }
  },
  {
    id: 'dc_switch', topic: 'methoden',
    // R1 = n·R2; P_auf = (n+1)/n · P_zu.
    variants: [
      { n: 3, pzu: '3 W', ok: '4 W', w: ['2.25 W', '3 W', '9 W'], calc: 'P = I<sub>q</sub>²·4R₂ = (4/3)·3 W = 4 W' },
      { n: 1, pzu: '2 W', ok: '4 W', w: ['1 W', '2 W', '8 W'], calc: 'P = I<sub>q</sub>²·2R₂ = (2/1)·2 W = 4 W' },
      { n: 4, pzu: '8 W', ok: '10 W', w: ['6.4 W', '8 W', '32 W'], calc: 'P = I<sub>q</sub>²·5R₂ = (5/4)·8 W = 10 W' },
      { n: 2, pzu: '6 W', ok: '9 W', w: ['4 W', '6 W', '12 W'], calc: 'P = I<sub>q</sub>²·3R₂ = (3/2)·6 W = 9 W' },
      { n: 3, pzu: '6 W', ok: '8 W', w: ['4.5 W', '6 W', '18 W'], calc: 'P = I<sub>q</sub>²·4R₂ = (4/3)·6 W = 8 W' }
    ],
    tpl: {
      de: (v) => ({
        q: `Eine ideale Stromquelle I<sub>q</sub> speist die Reihenschaltung aus R<sub>1</sub> und der Parallelschaltung von R<sub>2</sub> mit einem Schalter S; es gilt R<sub>1</sub> = ${v.n}·R<sub>2</sub>. Bei geschlossenem Schalter (R<sub>2</sub> überbrückt) liefert die Quelle P = ${num(v.pzu, 'de')}. Welche Leistung liefert sie bei offenem Schalter?`,
        opts: [`P = ${num(v.ok, 'de')}`, `P = ${num(v.w[0], 'de')}`, `P = ${num(v.w[1], 'de')}`, `P = ${num(v.w[2], 'de')}`],
        expl: `Die ideale Stromquelle prägt I<sub>q</sub> ein. Geschlossen: P = I<sub>q</sub>²·R<sub>1</sub> = I<sub>q</sub>²·${v.n}R₂ = ${num(v.pzu, 'de')}. Offen: ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `An ideal current source I<sub>q</sub> feeds the series connection of R<sub>1</sub> and the parallel combination of R<sub>2</sub> with a switch S; R<sub>1</sub> = ${v.n}·R<sub>2</sub>. With the switch closed (R<sub>2</sub> bypassed) the source delivers P = ${v.pzu}. What power does it deliver with the switch open?`,
        opts: [`P = ${v.ok}`, `P = ${v.w[0]}`, `P = ${v.w[1]}`, `P = ${v.w[2]}`],
        expl: `The ideal current source imposes I<sub>q</sub>. Closed: P = I<sub>q</sub>²·R<sub>1</sub> = I<sub>q</sub>²·${v.n}R₂ = ${v.pzu}. Open: ${v.calc}.`
      })
    }
  },
  // ---------- Thema: Überlagerungssatz ----------
  {
    id: 'dc_super_deact', topic: 'uels',
    de: { q: 'Bei der Einzelbetrachtung im Überlagerungssatz werden:',
      opts: ['Spannungsquellen kurzgeschlossen (0 V) und Stromquellen geöffnet (0 A).',
        'Spannungsquellen geöffnet und Stromquellen kurzgeschlossen.',
        'alle Quellen kurzgeschlossen.',
        'alle Quellen geöffnet.'],
      expl: 'Zu deaktivierende Quellen werden zu Null gesetzt: Spannungsquelle 0 V ⇒ Kurzschluss, Stromquelle 0 A ⇒ Leerlauf.' },
    en: { q: 'In the individual analyses of the superposition theorem:',
      opts: ['Voltage sources are short-circuited (0 V) and current sources are opened (0 A).',
        'Voltage sources are opened and current sources are short-circuited.',
        'All sources are short-circuited.',
        'All sources are opened.'],
      expl: 'Deactivated sources are set to zero: voltage source 0 V ⇒ short circuit, current source 0 A ⇒ open circuit.' }
  },
  {
    id: 'dc_super_quant', topic: 'uels',
    de: { q: 'Welche Größen dürfen mit dem Überlagerungssatz überlagert werden?',
      opts: ['Ströme und Spannungen, nicht aber Leistungen.',
        'Ströme, Spannungen und Leistungen.',
        'Nur Leistungen.',
        'Nur Energien.'],
      expl: 'Nur Größen, die linear von den Quellen abhängen (Ströme, Spannungen). Leistung P = U·I ~ I² ist quadratisch und darf nicht überlagert werden.' },
    en: { q: 'Which quantities may be superposed using the superposition theorem?',
      opts: ['Currents and voltages, but not powers.',
        'Currents, voltages and powers.',
        'Only powers.',
        'Only energies.'],
      expl: 'Only quantities that depend linearly on the sources (currents, voltages). Power P = U·I ~ I² is quadratic and must not be superposed.' }
  },
  // ---------- Thema: Blindwiderstand & Impedanz ----------
  {
    id: 'ac_xc', topic: 'blind',
    // ok = 1/(2*pi*f*C); w = ok/10 und ok*10.
    variants: [
      { c: '100 µF', f: '50 Hz', ok: '31.8 Ω', w1: '3.18 Ω', w2: '318 Ω', calc: '1/(2π·50 Hz · 100·10⁻⁶ F) ≈ 31.8 Ω' },
      { c: '1 µF', f: '1 kHz', ok: '159.2 Ω', w1: '15.92 Ω', w2: '1592 Ω', calc: '1/(2π·1000 Hz · 1·10⁻⁶ F) ≈ 159.2 Ω' },
      { c: '318.3 µF', f: '10 kHz', ok: '50 mΩ', w1: '5 mΩ', w2: '0.5 Ω', calc: '1/(2π·10⁴ Hz · 318.3·10⁻⁶ F) ≈ 0.05 Ω = 50 mΩ' },
      { c: '159.2 nF', f: '10 kHz', ok: '100 Ω', w1: '10 Ω', w2: '1 kΩ', calc: '1/(2π·10⁴ Hz · 159.2·10⁻⁹ F) ≈ 100 Ω' },
      { c: '3.183 µF', f: '50 Hz', ok: '1 kΩ', w1: '100 Ω', w2: '10 kΩ', calc: '1/(2π·50 Hz · 3.183·10⁻⁶ F) ≈ 1000 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Welchen Wert hat der Blindwiderstand X<sub>C</sub> der Kapazität C = ${num(v.c, 'de')} bei f = ${num(v.f, 'de')} (gerundet)?`,
        opts: [`X<sub>C</sub> = ${num(v.ok, 'de')}`, `X<sub>C</sub> = ${num(v.w1, 'de')}`, `X<sub>C</sub> = ${num(v.w2, 'de')}`, I18N.de.noneFits],
        expl: `X<sub>C</sub> = 1/(ωC) = ${num(v.calc, 'de')}. Achtung: ω = 2πf verwenden, nicht f.`
      }),
      en: (v) => ({
        q: `What is the reactance X<sub>C</sub> of the capacitance C = ${v.c} at f = ${v.f} (rounded)?`,
        opts: [`X<sub>C</sub> = ${v.ok}`, `X<sub>C</sub> = ${v.w1}`, `X<sub>C</sub> = ${v.w2}`, I18N.en.noneFits],
        expl: `X<sub>C</sub> = 1/(ωC) = ${v.calc}. Note: use ω = 2πf, not f.`
      })
    }
  },
  {
    id: 'ac_xl', topic: 'blind',
    variants: [
      { l: '10 mH', f: '1 kHz', ok: '62.8 Ω', w1: '6.28 Ω', w2: '628 Ω', calc: '2π·1000 Hz · 0.01 H ≈ 62.8 Ω' },
      { l: '636.6 µH', f: '10 kHz', ok: '40 Ω', w1: '4 Ω', w2: '400 Ω', calc: '2π·10⁴ Hz · 636.6·10⁻⁶ H ≈ 40 Ω' },
      { l: '1.59 mH', f: '100 Hz', ok: '1 Ω', w1: '0.1 Ω', w2: '10 Ω', calc: '2π·100 Hz · 1.59·10⁻³ H ≈ 1 Ω' },
      { l: '100 mH', f: '50 Hz', ok: '31.4 Ω', w1: '3.14 Ω', w2: '314 Ω', calc: '2π·50 Hz · 0.1 H ≈ 31.4 Ω' },
      { l: '15.9 µH', f: '1 MHz', ok: '100 Ω', w1: '10 Ω', w2: '1 kΩ', calc: '2π·10⁶ Hz · 15.9·10⁻⁶ H ≈ 100 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Welchen Wert hat der Blindwiderstand X<sub>L</sub> der Induktivität L = ${num(v.l, 'de')} bei f = ${num(v.f, 'de')} (gerundet)?`,
        opts: [`X<sub>L</sub> = ${num(v.ok, 'de')}`, `X<sub>L</sub> = ${num(v.w1, 'de')}`, `X<sub>L</sub> = ${num(v.w2, 'de')}`, I18N.de.noneFits],
        expl: `X<sub>L</sub> = ωL = ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `What is the reactance X<sub>L</sub> of the inductance L = ${v.l} at f = ${v.f} (rounded)?`,
        opts: [`X<sub>L</sub> = ${v.ok}`, `X<sub>L</sub> = ${v.w1}`, `X<sub>L</sub> = ${v.w2}`, I18N.en.noneFits],
        expl: `X<sub>L</sub> = ωL = ${v.calc}.`
      })
    }
  },
  {
    id: 'ac_zl', topic: 'blind',
    // ok = j·X; Distraktoren: -j·X, X (reell), j·X mit falscher Einheit/Groessenordnung.
    variants: [
      { l: '1.59 mH', f: '1 kHz', x: '10 Ω', wx: '10 mΩ', calc: 'j·2π·1000 Hz · 1.59·10⁻³ H ≈ j·10 Ω' },
      { l: '159.1 nH', f: '10 kHz', x: '10 mΩ', wx: '10 Ω', calc: 'j·2π·10⁴ Hz · 159.1·10⁻⁹ H ≈ j·10 mΩ' },
      { l: '3.18 mH', f: '50 Hz', x: '1 Ω', wx: '1 mΩ', calc: 'j·2π·50 Hz · 3.18·10⁻³ H ≈ j·1 Ω' },
      { l: '15.9 mH', f: '1 kHz', x: '100 Ω', wx: '100 mΩ', calc: 'j·2π·1000 Hz · 15.9·10⁻³ H ≈ j·100 Ω' },
      { l: '31.8 µH', f: '100 kHz', x: '20 Ω', wx: '20 mΩ', calc: 'j·2π·10⁵ Hz · 31.8·10⁻⁶ H ≈ j·20 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Welchen Wert hat die komplexe Impedanz <u>Z</u><sub>L</sub> einer Spule mit L = ${num(v.l, 'de')} bei f = ${num(v.f, 'de')} (gerundet)?`,
        opts: [`<u>Z</u><sub>L</sub> = j·${num(v.x, 'de')}`, `<u>Z</u><sub>L</sub> = −j·${num(v.x, 'de')}`, `<u>Z</u><sub>L</sub> = ${num(v.x, 'de')}`, `<u>Z</u><sub>L</sub> = j·${num(v.wx, 'de')}`],
        expl: `<u>Z</u><sub>L</sub> = jωL = ${num(v.calc, 'de')} — bei der Spule positiv imaginär.`
      }),
      en: (v) => ({
        q: `What is the complex impedance <u>Z</u><sub>L</sub> of an inductor with L = ${v.l} at f = ${v.f} (rounded)?`,
        opts: [`<u>Z</u><sub>L</sub> = j·${v.x}`, `<u>Z</u><sub>L</sub> = −j·${v.x}`, `<u>Z</u><sub>L</sub> = ${v.x}`, `<u>Z</u><sub>L</sub> = j·${v.wx}`],
        expl: `<u>Z</u><sub>L</sub> = jωL = ${v.calc} — positive imaginary for an inductor.`
      })
    }
  },
  {
    id: 'ac_zc', topic: 'blind',
    variants: [
      { c: '159.2 µF', f: '100 Hz', x: '10 Ω', wx: '10 mΩ', calc: '1/(2π·100 Hz · 159.2·10⁻⁶ F) ≈ 10 Ω ⇒ <u>Z</u><sub>C</sub> ≈ −j·10 Ω' },
      { c: '159.1 nF', f: '10 kHz', x: '100 Ω', wx: '100 mΩ', calc: '1/(2π·10⁴ Hz · 159.1·10⁻⁹ F) ≈ 100 Ω ⇒ <u>Z</u><sub>C</sub> ≈ −j·100 Ω' },
      { c: '159.2 µF', f: '50 Hz', x: '20 Ω', wx: '20 mΩ', calc: '1/(2π·50 Hz · 159.2·10⁻⁶ F) ≈ 20 Ω ⇒ <u>Z</u><sub>C</sub> ≈ −j·20 Ω' },
      { c: '3.183 µF', f: '1 kHz', x: '50 Ω', wx: '50 mΩ', calc: '1/(2π·1000 Hz · 3.183·10⁻⁶ F) ≈ 50 Ω ⇒ <u>Z</u><sub>C</sub> ≈ −j·50 Ω' },
      { c: '1.59 µF', f: '200 Hz', x: '500 Ω', wx: '0.5 Ω', calc: '1/(2π·200 Hz · 1.59·10⁻⁶ F) ≈ 500 Ω ⇒ <u>Z</u><sub>C</sub> ≈ −j·500 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `Welchen Wert hat die komplexe Impedanz <u>Z</u><sub>C</sub> eines Kondensators mit C = ${num(v.c, 'de')} bei f = ${num(v.f, 'de')} (gerundet)?`,
        opts: [`<u>Z</u><sub>C</sub> = −j·${num(v.x, 'de')}`, `<u>Z</u><sub>C</sub> = j·${num(v.x, 'de')}`, `<u>Z</u><sub>C</sub> = ${num(v.x, 'de')}`, `<u>Z</u><sub>C</sub> = −j·${num(v.wx, 'de')}`],
        expl: `<u>Z</u><sub>C</sub> = 1/(jωC) = −j/(ωC); ${num(v.calc, 'de')} — beim Kondensator negativ imaginär.`
      }),
      en: (v) => ({
        q: `What is the complex impedance <u>Z</u><sub>C</sub> of a capacitor with C = ${v.c} at f = ${v.f} (rounded)?`,
        opts: [`<u>Z</u><sub>C</sub> = −j·${v.x}`, `<u>Z</u><sub>C</sub> = j·${v.x}`, `<u>Z</u><sub>C</sub> = ${v.x}`, `<u>Z</u><sub>C</sub> = −j·${v.wx}`],
        expl: `<u>Z</u><sub>C</sub> = 1/(jωC) = −j/(ωC); ${v.calc} — negative imaginary for a capacitor.`
      })
    }
  },
  // ---------- Thema: Komplexe Rechnung ----------
  {
    id: 'ac_abs', topic: 'komplex',
    // Pythagoraeische Tripel; w: |a|+|b|, |a|-|b| bzw. andere Fehlwerte.
    variants: [
      { z: '(3 − j·4) A', ok: '5 A', w: ['7 A', '1 A', '25 A'], calc: '√(3² + 4²) A = 5 A' },
      { z: '(6 + j·8) A', ok: '10 A', w: ['14 A', '2 A', '100 A'], calc: '√(6² + 8²) A = 10 A' },
      { z: '(5 − j·12) A', ok: '13 A', w: ['17 A', '7 A', '169 A'], calc: '√(5² + 12²) A = 13 A' },
      { z: '(8 − j·6) A', ok: '10 A', w: ['14 A', '2 A', '48 A'], calc: '√(8² + 6²) A = 10 A' },
      { z: '(12 + j·5) A', ok: '13 A', w: ['17 A', '7 A', '60 A'], calc: '√(12² + 5²) A = 13 A' }
    ],
    tpl: {
      de: (v) => ({
        q: `Der komplexe Strom (Effektivwertzeiger) <u>I</u> = ${num(v.z, 'de')} hat den Effektivwert I = |<u>I</u>|:`,
        opts: [`I = ${num(v.ok, 'de')}`, `I = ${num(v.w[0], 'de')}`, `I = ${num(v.w[1], 'de')}`, `I = ${num(v.w[2], 'de')}`],
        expl: `Betrag: I = |<u>I</u>| = ${num(v.calc, 'de')}. Der Betrag eines Zeigers wird ohne Unterstrich geschrieben.`
      }),
      en: (v) => ({
        q: `The complex current (rms phasor) <u>I</u> = ${v.z} has the rms value I = |<u>I</u>|:`,
        opts: [`I = ${v.ok}`, `I = ${v.w[0]}`, `I = ${v.w[1]}`, `I = ${v.w[2]}`],
        expl: `Magnitude: I = |<u>I</u>| = ${v.calc}. The magnitude of a phasor is written without the underline.`
      })
    }
  },
  {
    id: 'ac_zrc', topic: 'komplex',
    variants: [
      { r: 4, x: 3, ok: '5 Ω', w: ['7 Ω', '1 Ω', '12 Ω'], calc: '√(4² + 3²) Ω = 5 Ω' },
      { r: 3, x: 4, ok: '5 Ω', w: ['7 Ω', '1 Ω', '12 Ω'], calc: '√(3² + 4²) Ω = 5 Ω' },
      { r: 6, x: 8, ok: '10 Ω', w: ['14 Ω', '2 Ω', '48 Ω'], calc: '√(6² + 8²) Ω = 10 Ω' },
      { r: 12, x: 5, ok: '13 Ω', w: ['17 Ω', '7 Ω', '60 Ω'], calc: '√(12² + 5²) Ω = 13 Ω' },
      { r: 8, x: 15, ok: '17 Ω', w: ['23 Ω', '7 Ω', '120 Ω'], calc: '√(8² + 15²) Ω = 17 Ω' }
    ],
    tpl: {
      de: (v) => ({
        q: `RC-Reihenschaltung mit R = ${v.r} Ω und X<sub>C</sub> = ${v.x} Ω. Der Scheinwiderstand Z = |<u>Z</u>| beträgt:`,
        opts: [`Z = ${num(v.ok, 'de')}`, `Z = ${num(v.w[0], 'de')}`, `Z = ${num(v.w[1], 'de')}`, `Z = ${num(v.w[2], 'de')}`],
        expl: `<u>Z</u> = R − j·X<sub>C</sub> ⇒ Z = √(R² + X<sub>C</sub>²) = ${num(v.calc, 'de')}. Nicht einfach Beträge addieren!`
      }),
      en: (v) => ({
        q: `RC series circuit with R = ${v.r} Ω and X<sub>C</sub> = ${v.x} Ω. The apparent impedance Z = |<u>Z</u>| is:`,
        opts: [`Z = ${v.ok}`, `Z = ${v.w[0]}`, `Z = ${v.w[1]}`, `Z = ${v.w[2]}`],
        expl: `<u>Z</u> = R − j·X<sub>C</sub> ⇒ Z = √(R² + X<sub>C</sub>²) = ${v.calc}. Do not simply add the magnitudes!`
      })
    }
  },
  // ---------- Thema: Wechselgrößen & Zeigerdiagramm ----------
  {
    id: 'ac_rms', topic: 'wz',
    variants: [
      { uh: '325 V', ok: '230 V', w: ['163 V', '460 V', '325 V'], calc: '325 V / √2 ≈ 230 V (Netzspannung)' },
      { uh: '14.14 V', ok: '10 V', w: ['7.07 V', '20 V', '14.14 V'], calc: '14.14 V / √2 ≈ 10 V' },
      { uh: '170 V', ok: '120 V', w: ['85 V', '240 V', '170 V'], calc: '170 V / √2 ≈ 120 V' },
      { uh: '565.7 V', ok: '400 V', w: ['283 V', '800 V', '565.7 V'], calc: '565.7 V / √2 ≈ 400 V' },
      { uh: '1.414 V', ok: '1 V', w: ['0.707 V', '2 V', '1.414 V'], calc: '1.414 V / √2 ≈ 1 V' }
    ],
    tpl: {
      de: (v) => ({
        q: `Eine sinusförmige Spannung hat den Amplitudenwert û = ${num(v.uh, 'de')}. Der Effektivwert U beträgt (gerundet):`,
        opts: [`U = ${num(v.ok, 'de')}`, `U = ${num(v.w[0], 'de')}`, `U = ${num(v.w[1], 'de')}`, `U = ${num(v.w[2], 'de')}`],
        expl: `U = û/√2 = ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `A sinusoidal voltage has the amplitude û = ${v.uh}. The rms value U is (rounded):`,
        opts: [`U = ${v.ok}`, `U = ${v.w[0]}`, `U = ${v.w[1]}`, `U = ${v.w[2]}`],
        expl: `U = û/√2 = ${v.calc}.`
      })
    }
  },
  {
    id: 'ac_phasor_c', topic: 'wz',
    de: { q: 'Im Zeigerdiagramm eilt die Spannung <u>U</u><sub>x</sub> dem Strom <u>I</u><sub>x</sub> um exakt 90° nach. Um welche Schaltung handelt es sich?',
      opts: ['Idealer Kondensator', 'Ideale Spule', 'Reihenschaltung aus R und C', 'Reihenschaltung aus R und L'],
      expl: 'φ = φ<sub>u</sub> − φ<sub>i</sub> = −90°: rein kapazitives Verhalten. Bei R+C in Reihe läge φ zwischen −90° und 0°.' },
    en: { q: 'In the phasor diagram the voltage <u>U</u><sub>x</sub> lags the current <u>I</u><sub>x</sub> by exactly 90°. Which circuit is it?',
      opts: ['Ideal capacitor', 'Ideal inductor', 'Series connection of R and C', 'Series connection of R and L'],
      expl: 'φ = φ<sub>u</sub> − φ<sub>i</sub> = −90°: purely capacitive. For R+C in series, φ would lie between −90° and 0°.' }
  },
  {
    id: 'ac_phasor_rl', topic: 'wz',
    de: { q: 'Im Zeigerdiagramm eilt die Spannung <u>U</u><sub>x</sub> dem Strom <u>I</u><sub>x</sub> um einen Winkel zwischen 0° und 90° vor. Um welche Schaltung kann es sich handeln?',
      opts: ['Reihenschaltung aus R und L', 'Reihenschaltung aus R und C', 'Idealer Kondensator', 'Idealer ohmscher Widerstand'],
      expl: '0° &lt; φ &lt; 90°: ohmsch-induktives Verhalten (rein induktiv wäre φ = +90°, rein ohmsch φ = 0°).' },
    en: { q: 'In the phasor diagram the voltage <u>U</u><sub>x</sub> leads the current <u>I</u><sub>x</sub> by an angle between 0° and 90°. Which circuit can it be?',
      opts: ['Series connection of R and L', 'Series connection of R and C', 'Ideal capacitor', 'Ideal ohmic resistor'],
      expl: '0° &lt; φ &lt; 90°: resistive-inductive behaviour (purely inductive would be φ = +90°, purely resistive φ = 0°).' }
  },
  // ---------- Thema: Schwingkreis & Frequenzverhalten ----------
  {
    id: 'ac_res_ur', topic: 'resonanz',
    de: { q: 'Eine RLC-Serienschaltung wird an einer idealen Wechselspannungsquelle mit variabler Frequenz betrieben. Der Effektivwert der Spannung am ohmschen Widerstand ist:',
      opts: ['bei Resonanzfrequenz am höchsten.', 'bei Resonanzfrequenz am niedrigsten.', 'frequenzunabhängig.', 'Keine der anderen Antwortmöglichkeiten trifft zu.'],
      expl: 'Bei ω<sub>0</sub> gilt Im{<u>Z</u>} = 0 und Z = R (Minimum) ⇒ I maximal ⇒ U<sub>R</sub> = R·I maximal.' },
    en: { q: 'An RLC series circuit is driven by an ideal AC voltage source with variable frequency. The rms voltage across the ohmic resistor is:',
      opts: ['highest at the resonance frequency.', 'lowest at the resonance frequency.', 'independent of frequency.', 'None of the other options applies.'],
      expl: 'At ω<sub>0</sub>, Im{<u>Z</u>} = 0 and Z = R (minimum) ⇒ I is maximal ⇒ U<sub>R</sub> = R·I is maximal.' }
  },
  {
    id: 'ac_f0', topic: 'resonanz',
    variants: [
      { l: '1 mH', c: '1 µF', ok: '5 kHz', w1: '1 kHz', w2: '31.6 kHz', calc: '1/(2π·√(10⁻³ H · 10⁻⁶ F)) ≈ 5.03 kHz' },
      { l: '10 mH', c: '10 µF', ok: '503 Hz', w1: '100 Hz', w2: '3.16 kHz', calc: '1/(2π·√(10⁻² H · 10⁻⁵ F)) ≈ 503 Hz' },
      { l: '100 µH', c: '100 nF', ok: '50.3 kHz', w1: '10 kHz', w2: '316 kHz', calc: '1/(2π·√(10⁻⁴ H · 10⁻⁷ F)) ≈ 50.3 kHz' },
      { l: '1 mH', c: '100 nF', ok: '15.9 kHz', w1: '1.59 kHz', w2: '159 kHz', calc: '1/(2π·√(10⁻³ H · 10⁻⁷ F)) ≈ 15.9 kHz' },
      { l: '2.5 mH', c: '4 µF', ok: '1.59 kHz', w1: '159 Hz', w2: '15.9 kHz', calc: '1/(2π·√(2.5·10⁻³ H · 4·10⁻⁶ F)) ≈ 1.59 kHz' }
    ],
    tpl: {
      de: (v) => ({
        q: `RLC-Reihenschwingkreis mit L = ${num(v.l, 'de')} und C = ${num(v.c, 'de')}. Die Resonanzfrequenz f<sub>0</sub> beträgt (gerundet):`,
        opts: [`f<sub>0</sub> = ${num(v.ok, 'de')}`, `f<sub>0</sub> = ${num(v.w1, 'de')}`, `f<sub>0</sub> = ${num(v.w2, 'de')}`, I18N.de.noneFits],
        expl: `f<sub>0</sub> = 1/(2π·√(LC)) = ${num(v.calc, 'de')}.`
      }),
      en: (v) => ({
        q: `RLC series resonant circuit with L = ${v.l} and C = ${v.c}. The resonance frequency f<sub>0</sub> is (rounded):`,
        opts: [`f<sub>0</sub> = ${v.ok}`, `f<sub>0</sub> = ${v.w1}`, `f<sub>0</sub> = ${v.w2}`, I18N.en.noneFits],
        expl: `f<sub>0</sub> = 1/(2π·√(LC)) = ${v.calc}.`
      })
    }
  },
  {
    id: 'ac_chf', topic: 'resonanz',
    // Vier Faelle: Bauteil (C/L) x Grenzfall (0/inf). ok/w1 = Kurzschluss/Leerlauf passend.
    variants: [
      { comp: 'C', lim: 'inf', okDe: 'Wie ein Kurzschluss.', w1De: 'Wie ein Leerlauf (offene Klemmen).', okEn: 'Like a short circuit.', w1En: 'Like an open circuit.',
        explDe: 'X<sub>C</sub> = 1/(ωC) → 0 für ω → ∞ ⇒ Kurzschluss.', explEn: 'X<sub>C</sub> = 1/(ωC) → 0 for ω → ∞ ⇒ short circuit.' },
      { comp: 'C', lim: '0', okDe: 'Wie ein Leerlauf (offene Klemmen).', w1De: 'Wie ein Kurzschluss.', okEn: 'Like an open circuit.', w1En: 'Like a short circuit.',
        explDe: 'X<sub>C</sub> = 1/(ωC) → ∞ für ω → 0 ⇒ Leerlauf (Gleichstrom fließt nicht durch den Kondensator).', explEn: 'X<sub>C</sub> = 1/(ωC) → ∞ for ω → 0 ⇒ open circuit (no DC current through a capacitor).' },
      { comp: 'L', lim: 'inf', okDe: 'Wie ein Leerlauf (offene Klemmen).', w1De: 'Wie ein Kurzschluss.', okEn: 'Like an open circuit.', w1En: 'Like a short circuit.',
        explDe: 'X<sub>L</sub> = ωL → ∞ für ω → ∞ ⇒ Leerlauf.', explEn: 'X<sub>L</sub> = ωL → ∞ for ω → ∞ ⇒ open circuit.' },
      { comp: 'L', lim: '0', okDe: 'Wie ein Kurzschluss.', w1De: 'Wie ein Leerlauf (offene Klemmen).', okEn: 'Like a short circuit.', w1En: 'Like an open circuit.',
        explDe: 'X<sub>L</sub> = ωL → 0 für ω → 0 ⇒ Kurzschluss (ideale Spule ist für Gleichstrom ein Kurzschluss).', explEn: 'X<sub>L</sub> = ωL → 0 for ω → 0 ⇒ short circuit (an ideal inductor is a short for DC).' }
    ],
    tpl: {
      de: (v) => ({
        q: `Wie verhält sich ${v.comp === 'C' ? 'ein idealer Kondensator' : 'eine ideale Spule'} im Grenzfall ${v.lim === 'inf' ? 'sehr hoher Frequenz (ω → ∞)' : 'sehr niedriger Frequenz (ω → 0)'}?`,
        opts: [v.okDe, v.w1De, 'Wie ein ohmscher Widerstand.', I18N.de.none],
        expl: v.explDe
      }),
      en: (v) => ({
        q: `How does ${v.comp === 'C' ? 'an ideal capacitor' : 'an ideal inductor'} behave in the limit of ${v.lim === 'inf' ? 'very high frequency (ω → ∞)' : 'very low frequency (ω → 0)'}?`,
        opts: [v.okEn, v.w1En, 'Like an ohmic resistor.', I18N.en.none],
        expl: v.explEn
      })
    }
  },
  // ---------- Thema: Kondensator & Spule ----------
  {
    id: 'ac_ident_c', topic: 'cl',
    // ok = i/(du/dt); Distraktoren: falsche Kapazitaet, Spule, Widerstand.
    variants: [
      { rate: '20 V', per: 'Sekunde', i: '20 mA', ok: 'Idealer Kondensator mit C = 1 mF', w1: 'Idealer Kondensator mit C = 1 µF', w2: 'Ideale Spule mit L = 1 mH', w3: 'Idealer ohmscher Widerstand mit R = 1 kΩ',
        okEn: 'Ideal capacitor with C = 1 mF', w1En: 'Ideal capacitor with C = 1 µF', w2En: 'Ideal inductor with L = 1 mH', w3En: 'Ideal ohmic resistor with R = 1 kΩ',
        calc: 'C = i/(du/dt) = 0.02 A / (20 V/s) = 1 mF' },
      { rate: '10 V', per: 'Sekunde', i: '1 mA', ok: 'Idealer Kondensator mit C = 100 µF', w1: 'Idealer Kondensator mit C = 10 µF', w2: 'Ideale Spule mit L = 100 µH', w3: 'Idealer ohmscher Widerstand mit R = 10 kΩ',
        okEn: 'Ideal capacitor with C = 100 µF', w1En: 'Ideal capacitor with C = 10 µF', w2En: 'Ideal inductor with L = 100 µH', w3En: 'Ideal ohmic resistor with R = 10 kΩ',
        calc: 'C = i/(du/dt) = 0.001 A / (10 V/s) = 100 µF' },
      { rate: '5 V', per: 'Sekunde', i: '50 µA', ok: 'Idealer Kondensator mit C = 10 µF', w1: 'Idealer Kondensator mit C = 1 µF', w2: 'Ideale Spule mit L = 10 mH', w3: 'Idealer ohmscher Widerstand mit R = 100 kΩ',
        okEn: 'Ideal capacitor with C = 10 µF', w1En: 'Ideal capacitor with C = 1 µF', w2En: 'Ideal inductor with L = 10 mH', w3En: 'Ideal ohmic resistor with R = 100 kΩ',
        calc: 'C = i/(du/dt) = 50·10⁻⁶ A / (5 V/s) = 10 µF' },
      { rate: '100 V', per: 'Sekunde', i: '0.2 A', ok: 'Idealer Kondensator mit C = 2 mF', w1: 'Idealer Kondensator mit C = 0.2 mF', w2: 'Ideale Spule mit L = 2 mH', w3: 'Idealer ohmscher Widerstand mit R = 500 Ω',
        okEn: 'Ideal capacitor with C = 2 mF', w1En: 'Ideal capacitor with C = 0.2 mF', w2En: 'Ideal inductor with L = 2 mH', w3En: 'Ideal ohmic resistor with R = 500 Ω',
        calc: 'C = i/(du/dt) = 0.2 A / (100 V/s) = 2 mF' }
    ],
    tpl: {
      de: (v) => ({
        q: `An einem linearen Bauteil steigt die Spannung linear mit ${num(v.rate, 'de')} pro ${v.per}, währenddessen fließt ein konstanter Strom von ${num(v.i, 'de')}. Um welches Bauteil handelt es sich?`,
        opts: [v.ok, v.w1, v.w2, v.w3],
        expl: `i<sub>C</sub>(t) = C·du<sub>C</sub>/dt ⇒ ${num(v.calc, 'de')}. Eine Spule hätte bei konstantem Strom u = L·di/dt = 0.`
      }),
      en: (v) => ({
        q: `Across a linear component the voltage rises linearly at ${v.rate} per second while a constant current of ${v.i} flows. Which component is it?`,
        opts: [v.okEn, v.w1En, v.w2En, v.w3En],
        expl: `i<sub>C</sub>(t) = C·du<sub>C</sub>/dt ⇒ ${v.calc}. An inductor with constant current would give u = L·di/dt = 0.`
      })
    }
  },
  {
    id: 'ac_ceq', topic: 'cl',
    // C1, C2 in Reihe (-> cs), parallel dazu C3; Ce vorgegeben, C3 = Ce - cs.
    variants: [
      { c1: 2, c2: 2, cs: 1, ce: 3, ok: '2 mF', w1: '1 mF', w2: '4 mF', u: 'mF' },
      { c1: 4, c2: 4, cs: 2, ce: 5, ok: '3 µF', w1: '1 µF', w2: '7 µF', u: 'µF' },
      { c1: 6, c2: 3, cs: 2, ce: 6, ok: '4 mF', w1: '2 mF', w2: '8 mF', u: 'mF' },
      { c1: 2, c2: 2, cs: 1, ce: 5, ok: '4 mF', w1: '2 mF', w2: '6 mF', u: 'mF' },
      { c1: 10, c2: 10, cs: 5, ce: 8, ok: '3 µF', w1: '13 µF', w2: '2 µF', u: 'µF' }
    ],
    tpl: {
      de: (v) => ({
        q: `C<sub>1</sub> = ${v.c1} ${v.u} und C<sub>2</sub> = ${v.c2} ${v.u} sind in Reihe geschaltet; parallel dazu liegt C<sub>3</sub>. Die Gesamtkapazität soll C<sub>e</sub> = ${v.ce} ${v.u} betragen. Welchen Wert hat C<sub>3</sub>?`,
        opts: [`C<sub>3</sub> = ${num(v.ok, 'de')}`, `C<sub>3</sub> = ${num(v.w1, 'de')}`, `C<sub>3</sub> = ${num(v.w2, 'de')}`, I18N.de.noneVals],
        expl: `Reihe: C<sub>1</sub>·C<sub>2</sub>/(C<sub>1</sub>+C<sub>2</sub>) = ${v.cs} ${v.u}; parallel addieren: ${v.cs} ${v.u} + C<sub>3</sub> = ${v.ce} ${v.u} ⇒ C<sub>3</sub> = ${num(v.ok, 'de')}. Achtung: Bei C sind Reihe/Parallel gegenüber R vertauscht!`
      }),
      en: (v) => ({
        q: `C<sub>1</sub> = ${v.c1} ${v.u} and C<sub>2</sub> = ${v.c2} ${v.u} are connected in series; C<sub>3</sub> is in parallel with them. The total capacitance shall be C<sub>e</sub> = ${v.ce} ${v.u}. What is C<sub>3</sub>?`,
        opts: [`C<sub>3</sub> = ${v.ok}`, `C<sub>3</sub> = ${v.w1}`, `C<sub>3</sub> = ${v.w2}`, I18N.en.noneVals],
        expl: `Series: C<sub>1</sub>·C<sub>2</sub>/(C<sub>1</sub>+C<sub>2</sub>) = ${v.cs} ${v.u}; add in parallel: ${v.cs} ${v.u} + C<sub>3</sub> = ${v.ce} ${v.u} ⇒ C<sub>3</sub> = ${v.ok}. Note: for C, series/parallel rules are swapped compared to R!`
      })
    }
  }
];

let state = null;

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, '');
}

function shuffledIndices(n, rng) {
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

// Pro Thema wird genau eine (seed-abhaengige) Frage gezogen; bei Rechenfragen
// zusaetzlich eine Zahlenwert-Variante. Bereits geloeste Aufgaben(-Varianten)
// werden bevorzugt vermieden: gewaehlt wird zuerst aus den ungeloesten Kombos.
function makeCase(seedText) {
  const seed = stableSeed(seedText);
  const rng = mulberry32(seed);
  const solvedTasks = loadSolvedTasks();

  // Fragen-Reihenfolge: ohne jeden Fortschritt die Standard-Themenreihenfolge.
  // Sobald geuebt wurde, stehen die schwaechsten Themen oben (Netto-Score =
  // Belohnungen minus Problemfaelle, aufsteigend); bei Gleichstand entscheidet
  // der Seed-Zufall, damit nicht immer dasselbe Thema oben steht.
  const anyProgress = TOPICS.some((t) => topicCount(t) > 0 || topicFailCount(t) > 0);
  let orderedTopics = TOPICS.slice();
  if (anyProgress) {
    const tie = new Map(TOPICS.map((t) => [t, rng()]));
    orderedTopics.sort((a, b) => {
      const na = topicCount(a) - topicFailCount(a);
      const nb = topicCount(b) - topicFailCount(b);
      if (na !== nb) return na - nb;
      return tie.get(a) - tie.get(b);
    });
  }

  const picked = orderedTopics.map((topicId) => {
    const combos = [];
    QUESTIONS.forEach((q, qi) => {
      if (q.topic !== topicId) return;
      if (q.variants) {
        q.variants.forEach((_, vIdx) => combos.push({ qi, vi: vIdx, key: `${q.id}#${vIdx}` }));
      } else {
        combos.push({ qi, vi: -1, key: q.id });
      }
    });
    const unsolved = combos.filter((c2) => !solvedTasks[c2.key]);
    const pickFrom = unsolved.length ? unsolved : combos;
    const chosen = pickFrom[Math.floor(rng() * pickFrom.length)];
    const perm = shuffledIndices(4, rng); // perm[k] = Originalindex der angezeigten Option k
    return {
      qi: chosen.qi,
      vi: chosen.vi,
      topicId,
      perm,
      correctShown: perm.indexOf(0),
      answered: false,
      firstAttemptUsed: false,
      solvedFirstTry: false,
      solved: false,
      revealed: false,
      wrongShown: []
    };
  });
  return { seed, picked };
}

function qData(item) {
  const q = QUESTIONS[item.qi];
  if (q.variants) {
    const v = q.variants[item.vi >= 0 ? item.vi : 0];
    const tpl = q.tpl[LANG] || q.tpl.de;
    return { q, loc: tpl(v) };
  }
  return { q, loc: q[LANG] || q.de };
}

function renderTopicPanel() {
  const chips = TOPICS.map((topicId) => {
    const n = topicCount(topicId);
    const f = topicFailCount(topicId);
    const name = tr('topics')[topicId] || topicId;
    const score = topicScoreText(topicId);
    const lead = n >= 1 ? '' : '○ ';
    return `<span class="topic-chip ${n >= 1 ? 'done' : ''}">${lead}${name}${score ? ' · ' + score : ''}</span>`;
  });
  const nDone = TOPICS.filter(topicDone).length;
  document.getElementById('topic-panel').innerHTML =
    `<div class="section-title">${tr('topicsTitle')}: ${nDone}/${TOPICS.length}</div>` +
    `<div class="topic-list">${chips.join('')}</div>` +
    `<div class="small" style="margin-top:6px;">${tr('legend')}<br>${tr('legendFail')}</div>`;
}

// Kleine Themen-Badges direkt an den Fragen aktualisieren.
function updateQuestionBadges() {
  if (!state) return;
  state.picked.forEach((item, k) => {
    const el = document.getElementById(`qtopic-${k}`);
    if (!el) return;
    const name = tr('topics')[item.topicId] || item.topicId;
    const score = topicScoreText(item.topicId);
    el.textContent = score ? `${name} · ${score}` : name;
  });
}

function renderStatus() {
  if (!state) return;
  const m = state.picked.length;
  const a = state.picked.filter((it) => it.answered).length;
  const n = state.picked.filter((it) => it.solved).length;
  const f = state.picked.filter((it) => it.solvedFirstTry).length;
  document.getElementById('check-status').textContent =
    tr('status').replace('{a}', a).replace('{m}', m).replace('{n}', n).replace('{f}', f);
}

function render(c) {
  document.getElementById('values').innerHTML =
    `<b>${tr('values')}</b><br>- Seed: ${c.seed}<br>- ${tr('infoText')}`;
  renderTopicPanel();

  const parts = [];
  c.picked.forEach((item, k) => {
    const { loc } = qData(item);
    parts.push(`<div class="question" id="q-${k}">`);
    parts.push(`<span class="topic" id="qtopic-${k}"></span>`);
    parts.push(`<div class="q-text">${tr('questionWord')} ${k + 1}: ${loc.q}</div>`);
    item.perm.forEach((orig, shown) => {
      const letter = String.fromCharCode(97 + shown); // a, b, c, d
      parts.push(
        `<label class="opt" id="opt-${k}-${shown}">` +
        `<input type="radio" name="q${k}" value="${shown}"> ${letter}) ${loc.opts[orig]}</label>`
      );
    });
    parts.push(`<div class="expl" id="expl-${k}" style="display:none"></div>`);
    parts.push('</div>');
  });
  document.getElementById('tasks').innerHTML = parts.join('');

  // Sofort-Auswertung: jeder Klick auf eine Option wertet die Frage aus.
  c.picked.forEach((item, k) => {
    document.querySelectorAll(`input[name="q${k}"]`).forEach((inp) => {
      inp.addEventListener('change', () => onAnswer(k, Number(inp.value)));
    });
  });

  updateQuestionBadges();
  renderStatus();
}

function lockQuestion(k) {
  const item = state.picked[k];
  item.answered = true;
  const div = document.getElementById(`q-${k}`);
  if (div) div.classList.add('locked');
  document.querySelectorAll(`input[name="q${k}"]`).forEach((inp) => { inp.disabled = true; });
}

function showExplanation(k, kindText, extraClassOk) {
  const item = state.picked[k];
  const { loc } = qData(item);
  const letter = String.fromCharCode(97 + item.correctShown);
  const explDiv = document.getElementById(`expl-${k}`);
  if (!explDiv) return;
  explDiv.className = 'expl' + (extraClassOk ? ' expl-ok' : '');
  explDiv.innerHTML =
    `<b>${kindText}</b> ${tr('correctAnswer')}: <b>${letter})</b> ${loc.opts[0]}<br>${loc.expl}`;
  explDiv.style.display = 'block';
}

function onAnswer(k, shownIdx) {
  if (!state) return;
  const item = state.picked[k];
  if (item.answered) return;

  const div = document.getElementById(`q-${k}`);
  const optLabel = document.getElementById(`opt-${k}-${shownIdx}`);
  const isFirstAttempt = !item.firstAttemptUsed;
  item.firstAttemptUsed = true;

  if (shownIdx === item.correctShown) {
    // Richtig: sofort Erklaerung anzeigen, Frage sperren.
    item.solved = true;
    const key = comboKey(QUESTIONS[item.qi], item.vi);
    const alreadySolved = !!loadSolvedTasks()[key];
    markTaskSolved(key);
    let okText;
    if (isFirstAttempt && !alreadySolved) {
      // Zaehler nur fuer NEUE Aufgaben(-Varianten) im ersten Versuch.
      item.solvedFirstTry = true;
      creditTopic(item.topicId);
      renderTopicPanel();
      updateQuestionBadges();
      okText = tr('okFirstTry');
    } else if (isFirstAttempt) {
      item.solvedFirstTry = true;
      okText = tr('okKnown');
    } else {
      okText = tr('okRetry');
    }
    if (optLabel) optLabel.classList.add('opt-ok');
    if (div) { div.classList.remove('bad'); div.classList.add('ok'); }
    showExplanation(k, `${tr('okPrefix')} ${okText}`, true);
    lockQuestion(k);
  } else {
    // Falsch: markieren; weitere Versuche moeglich.
    if (optLabel) optLabel.classList.add('opt-bad');
    if (div) div.classList.add('bad');
    if (!item.wrongShown.includes(shownIdx)) item.wrongShown.push(shownIdx);
    if (isFirstAttempt) {
      // "Problemfall": im ersten Versuch falsch -> Uebungsbedarf-Zaehler des Themas.
      creditFail(item.topicId);
      renderTopicPanel();
      updateQuestionBadges();
    }
    state.activeQuestion = k;
    const { loc } = qData(item);
    const letter = String.fromCharCode(97 + shownIdx);
    // KI-Tutor oeffnen, ohne shared/tutor.js zu veraendern: Panel per Toggle-Klick
    // einblenden und die Hilfebitte ins Eingabefeld vorbefuellen. Abgesendet wird
    // bewusst von den Studierenden selbst; der vollstaendige Fragen-Kontext geht
    // ohnehin ueber window.getEtTutorContext() an den Tutor.
    const tutorPanel = document.querySelector('.et-tutor-panel');
    const tutorToggle = document.querySelector('.et-tutor-toggle');
    const tutorInput = document.querySelector('.et-tutor-input');
    if (tutorPanel && tutorPanel.hidden && tutorToggle) tutorToggle.click();
    if (tutorInput && item.wrongShown.length === 1) {
      tutorInput.value = tr('tutorAsk')
        .replace('{q}', `${tr('questionWord')} ${k + 1}: ${stripHtml(loc.q)}`)
        .replace('{sel}', letter);
      tutorInput.focus();
    }
  }
  renderStatus();
}

function showSolution() {
  if (!state) return;
  state.picked.forEach((item, k) => {
    if (item.answered) return;
    item.revealed = true;
    showExplanation(k, tr('revealed'), false);
    lockQuestion(k);
  });
  renderStatus();
}

window.getEtTutorContext = function () {
  const questions = state ? state.picked.map((item, k) => {
    const { q, loc } = qData(item);
    return {
      number: k + 1,
      id: q.id,
      variant: item.vi >= 0 ? item.vi : null,
      topicId: item.topicId,
      topicName: tr('topics')[item.topicId] || item.topicId,
      question: stripHtml(loc.q),
      shownOptions: item.perm.map((orig, shown) =>
        `${String.fromCharCode(97 + shown)}) ${stripHtml(loc.opts[orig])}`),
      wrongOptionsTried: item.wrongShown.map((s) => String.fromCharCode(97 + s)),
      answeredCorrectly: item.solved,
      solvedOnFirstAttempt: item.solvedFirstTry,
      correctOptionForTutor: String.fromCharCode(97 + item.correctShown),
      explanationForTutor: stripHtml(loc.expl),
    };
  }) : null;
  return {
    exerciseId: 'single_choice',
    lang: LANG,
    seed: document.getElementById('seed')?.value || (state ? String(state.seed) : ''),
    title: tr('title'),
    values: state ? {
      numQuestions: state.picked.length,
      topicsDone: TOPICS.filter(topicDone),
      topicsOpen: TOPICS.filter((t) => !topicDone(t)),
      topicCounts: Object.fromEntries(TOPICS.map((t) => [t, topicCount(t)])),
    } : null,
    activeQuestion: state && Number.isInteger(state.activeQuestion) ? state.activeQuestion + 1 : null,
    questions,
    visibleValuesText: document.getElementById('values')?.innerText || '',
    visibleTasksText: document.getElementById('tasks')?.innerText || '',
    userInputs: state ? Object.fromEntries(state.picked.map((item, k) => {
      const el = document.querySelector(`input[name="q${k}"]:checked`);
      return [`q${k}`, el ? String.fromCharCode(97 + Number(el.value)) : ''];
    })) : {},
    checkResult: state ? {
      percent: Math.round((state.picked.filter((it) => it.solvedFirstTry).length / state.picked.length) * 100),
      fields: Object.fromEntries(state.picked.map((item, k) => [`q${k}`, item.solved])),
    } : null,
    formulaSheetUrl: '../Formelsammlung_ET1.html',
  };
};

function generate(mode = 'seed') {
  setLoadingTitle(true);
  let seed = '';
  if (mode === 'seed') seed = document.getElementById('seed').value || '';
  if (mode === 'random') seed = '';
  state = makeCase(seed);
  document.getElementById('seed').value = state.seed;
  render(state);
  setLoadingTitle(false);
}

function init() {
  migrateAndInitTopics();
  applyLanguageUI();
  document.getElementById('lang').value = LANG;
  document.getElementById('lang').addEventListener('change', (e) => {
    LANG = e.target.value === 'en' ? 'en' : 'de';
    localStorage.setItem('lang', LANG);
    applyLanguageUI();
    generate('seed'); // gleiche Fragen (gleicher Seed), neue Sprache
  });
  document.getElementById('gen-seed').onclick = () => generate('seed');
  document.getElementById('gen-random').onclick = () => generate('random');
  const showSolutionButton = document.getElementById('show-solution');
  if (showSolutionButton) showSolutionButton.onclick = showSolution;
  generate('random');
}

init();
