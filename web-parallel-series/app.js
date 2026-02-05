const I18N = {
  de: {
    title: 'Übung: Reihen- und Parallelschaltung',
    loading: '[... loading ...]',
    lang: 'Sprache:',
    seed: 'Seed:',
    seedPlaceholder: 'leer = random',
    genSeed: 'Generieren (Seed)',
    genRandom: 'Generieren (Random)',
    values: 'Gegeben',
    tasks: 'Aufgabe',
    compType: 'Bauteiltyp',
    topology: 'Topologie',
    unitAll: 'Einheit (alle gleich)',
    taskCompute: 'Berechne die {kind} zwischen den Klemmen A-B.',
    taskUnits: 'Gib das Ergebnis in SI-Basiseinheit an ({unit}).',
    check: 'Prüfen',
    expected: 'Erwartet',
    correct: 'Richtig',
    wrong: 'Falsch',
    invalid: 'Ungültige Eingabe.'
  },
  en: {
    title: 'Exercise: Series and Parallel Circuits',
    loading: '[... loading ...]',
    lang: 'Language:',
    seed: 'Seed:',
    seedPlaceholder: 'empty = random',
    genSeed: 'Generate (Seed)',
    genRandom: 'Generate (Random)',
    values: 'Given',
    tasks: 'Task',
    compType: 'Component type',
    topology: 'Topology',
    unitAll: 'Unit (all same)',
    taskCompute: 'Compute the {kind} between terminals A-B.',
    taskUnits: 'Give the result in SI base units ({unit}).',
    check: 'Check',
    expected: 'Expected',
    correct: 'Correct',
    wrong: 'Wrong',
    invalid: 'Invalid input.'
  }
};
let LANG = localStorage.getItem('lang') || 'de';
if (!I18N[LANG]) LANG = 'de';

function tr(k) {
  return (I18N[LANG] && I18N[LANG][k]) || I18N.de[k] || k;
}

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

function updateProgress(exId, taskId, percent) {
  if (!taskId) return;
  const p = loadProgress();
  if (!p[exId]) p[exId] = {};
  const prev = Number(p[exId][taskId] || 0);
  if (percent > prev) {
    p[exId][taskId] = percent;
    saveProgress(p);
  }
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
  document.getElementById('check').textContent = tr('check');
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

function fmtNum(x, sig = 4) {
  const v = Number(x);
  if (!isFinite(v)) return 'NaN';
  let s = v.toPrecision(sig);
  if (!s.includes('e') && s.includes('.')) {
    s = s.replace(/0+$/, '').replace(/\.$/, '');
  }
  return s;
}

const E12 = [1.0,1.2,1.5,1.8,2.2,2.7,3.3,3.9,4.7,5.6,6.8,8.2];
const UNITS = {
  R: [['mOhm',1e-3], ['Ohm',1.0], ['kOhm',1e3], ['MOhm',1e6]],
  L: [['uH',1e-6], ['mH',1e-3], ['H',1.0]],
  C: [['pF',1e-12], ['nF',1e-9], ['uF',1e-6], ['mF',1e-3]]
};

const TOPOS = [
  { id:'2S', n:2, name:{de:'2 in Reihe', en:'2 in series'}, tree:['S',[0,1]] },
  { id:'2P', n:2, name:{de:'2 parallel', en:'2 in parallel'}, tree:['P',[0,1]] },
  { id:'3S', n:3, name:{de:'3 in Reihe', en:'3 in series'}, tree:['S',[0,1,2]] },
  { id:'3P', n:3, name:{de:'3 parallel', en:'3 in parallel'}, tree:['P',[0,1,2]] },
  { id:'3S_P', n:3, name:{de:'1 in Reihe, 2 parallel', en:'1 in series, 2 in parallel'}, tree:['S',[0,['P',[1,2]]]] },
  { id:'3P_S', n:3, name:{de:'2 parallel, dann 1 in Reihe', en:'2 in parallel, then 1 in series'}, tree:['S',[['P',[0,1]],2]] },
  { id:'4S', n:4, name:{de:'4 in Reihe', en:'4 in series'}, tree:['S',[0,1,2,3]] },
  { id:'4P', n:4, name:{de:'4 parallel', en:'4 in parallel'}, tree:['P',[0,1,2,3]] },
  { id:'4SPP', n:4, name:{de:'1 in Reihe + 3 parallel', en:'1 in series + 3 in parallel'}, tree:['S',[0,['P',[1,2,3]]]] },
  { id:'4SPP_R', n:4, name:{de:'3 parallel + 1 in Reihe', en:'3 in parallel + 1 in series'}, tree:['S',[['P',[0,1,2]],3]] },
  { id:'4PSS', n:4, name:{de:'3 in Reihe parallel zu 1', en:'3 in series in parallel with 1'}, tree:['P',[['S',[0,1,2]],3]] },
  { id:'4SP2P2', n:4, name:{de:'2 parallel in Reihe zu 2 parallel', en:'2 parallel in series with 2 parallel'}, tree:['S',[['P',[0,1]],['P',[2,3]]]] },
  { id:'4PS2S2', n:4, name:{de:'2 in Reihe parallel zu 2 in Reihe', en:'2 in series in parallel with 2 in series'}, tree:['P',[['S',[0,1]],['S',[2,3]]]] },
  { id:'4S_MIX_L', n:4, name:{de:'2 parallel + 2 in Reihe', en:'2 parallel + 2 in series'}, tree:['S',[['P',[0,1]],2,3]] },
  { id:'4S_MIX_R', n:4, name:{de:'2 in Reihe + 2 parallel', en:'2 in series + 2 parallel'}, tree:['S',[0,1,['P',[2,3]]]] },
  { id:'4P_MIX_L', n:4, name:{de:'2 in Reihe parallel zu 2 Einzelzweigen', en:'2 in series in parallel with 2 single branches'}, tree:['P',[['S',[0,1]],2,3]] },
  { id:'4P_MIX_R', n:4, name:{de:'2 Einzelzweige parallel zu 2 in Reihe', en:'2 single branches in parallel with 2 in series'}, tree:['P',[0,1,['S',[2,3]]]] }
];

function eqValue(kind, tree, vals) {
  if (typeof tree === 'number') return vals[tree];
  const op = tree[0];
  const items = tree[1];
  const sub = items.map(t => eqValue(kind, t, vals));
  if (kind === 'R' || kind === 'L') {
    if (op === 'S') return sub.reduce((a,b) => a+b, 0);
    return 1 / sub.reduce((a,b) => a + 1/b, 0);
  }
  // C
  if (op === 'P') return sub.reduce((a,b) => a+b, 0);
  return 1 / sub.reduce((a,b) => a + 1/b, 0);
}

function kindName(kind) {
  if (kind === 'R') return LANG === 'en' ? 'Equivalent resistance' : 'Ersatzwiderstand';
  if (kind === 'L') return LANG === 'en' ? 'Equivalent inductance' : 'Ersatzinduktivität';
  return LANG === 'en' ? 'Equivalent capacitance' : 'Ersatzkapazität';
}

function baseUnit(kind) {
  return {R:'Ohm', L:'H', C:'F'}[kind];
}

function symbol(kind) { return {R:'R', L:'L', C:'C'}[kind]; }

let state = null;

function makeCase(seedText) {
  const seed = stableSeed(seedText);
  const rng = mulberry32(seed);
  const kind = ['R','L','C'][Math.floor(rng()*3)];
  const topos = TOPOS.filter(t => t.n >= 2 && t.n <= 4);
  const topo = topos[Math.floor(rng()*topos.length)];
  const unitList = UNITS[kind];
  const unit = unitList[Math.floor(rng()*unitList.length)];
  const unitLabel = unit[0];
  const unitMult = unit[1];
  const coeffs = Array.from({length: topo.n}, () => E12[Math.floor(rng()*E12.length)]);
  const vals = coeffs.map(c => c * unitMult);
  const eq = eqValue(kind, topo.tree, vals);
  return { seed, kind, topo, unitLabel, unitMult, coeffs, vals, eq };
}

function render(c) {
  const s = symbol(c.kind);
  const values = [
    `<b>${tr('values')}</b><br>`,
    `- Seed: ${c.seed}<br>`,
    `- ${tr('compType')}: ${c.kind}<br>`,
    `- ${tr('topology')}: ${c.topo.name[LANG]}<br>`,
    `- ${tr('unitAll')}: ${c.unitLabel}<br>`
  ];
  c.coeffs.forEach((cf, i) => {
    values.push(`- ${s}<sub>${i+1}</sub> = ${fmtNum(cf)} ${c.unitLabel}<br>`);
  });
  document.getElementById('values').innerHTML = values.join('');

  document.getElementById('tasks').innerHTML =
    `<b>${tr('tasks')}</b><br>` +
    `${tr('taskCompute').replace('{kind}', kindName(c.kind))}<br>` +
    `${tr('taskUnits').replace('{unit}', baseUnit(c.kind))}<br>` +
    `${s}<sub>AB</sub>`;

  const inputs = document.getElementById('inputs');
  inputs.innerHTML = `
    <div class="section-title">${s}<sub>AB</sub> [${baseUnit(c.kind)}]</div>
    <input id="inp-eq" class="mono" />
  `;

  document.getElementById('schematic').src = `../schematics/parallel_series_topos_clean/parallel_series_${c.kind}_${c.topo.id}.png`;
  document.getElementById('schematic-msg').textContent = '';
  document.getElementById('check-status').textContent = '';
  const inp = document.getElementById('inp-eq');
  if (inp) inp.classList.remove('ok','bad');
}

function okValue(user, ref) {
  if (ref === 0) return user === 0;
  if (user === 0) return false;
  if ((user > 0) !== (ref > 0)) return false;
  return Math.abs(user - ref) <= 0.01 * Math.abs(ref);
}

function onCheck() {
  if (!state) return;
  const inp = document.getElementById('inp-eq');
  const user = Number(inp.value);
  if (!isFinite(user)) {
    document.getElementById('check-status').textContent = tr('invalid');
    inp.classList.add('bad');
    return;
  }
  const ok = okValue(user, state.eq);
  inp.classList.remove('ok','bad');
  inp.classList.add(ok ? 'ok' : 'bad');

  const si = `${fmtNum(state.eq)} ${baseUnit(state.kind)}`;
  const pref = `${fmtNum(state.eq / state.unitMult)} ${state.unitLabel}`;
  document.getElementById('check-status').textContent =
    ok ? `${tr('correct')}. ${tr('expected')}: ${si} (${pref})`
       : `${tr('wrong')}. ${tr('expected')}: ${si} (${pref})`;

  const percent = ok ? 100 : 0;
  updateProgress('parallel_series', String(state.seed), percent);
}

function hookEnterCheck(fn) {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const t = e.target;
    if (!t) return;
    const tag = (t.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') {
      e.preventDefault();
      fn();
    }
  });
}

function generate(mode='seed') {
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
  applyLanguageUI();
  document.getElementById('lang').value = LANG;
  document.getElementById('lang').addEventListener('change', (e) => {
    LANG = e.target.value === 'en' ? 'en' : 'de';
    localStorage.setItem('lang', LANG);
    applyLanguageUI();
    render(state);
  });
  document.getElementById('gen-seed').onclick = () => generate('seed');
  document.getElementById('gen-random').onclick = () => generate('random');
  document.getElementById('check').onclick = onCheck;
  generate('random');
  hookEnterCheck(onCheck);
}

init();
