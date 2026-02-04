let pyodide;
const I18N = {
  de: {
    title: '\u00dcbung: Komplexe Wechselstromrechnung - Zeigerdiagramm',
    loading: '[... loading ...]',
    lang: 'Sprache:',
    seed: 'Seed (7 Stellen):',
    seedPlaceholder: 'leer = random',
    genSeed: 'Generieren (Seed)',
    genDefault: 'Generieren (Default)',
    genRandom: 'Generieren (Random)',
    values: 'Schaltungswerte',
    tasks: 'Aufgaben',
    check: 'Pr\u00fcfen',
    nature: 'Schaltung ist:',
    inductive: 'induktiv',
    capacitive: 'kapazitiv',
    blank: 'Leeres Zeigerdiagramm',
    zeiger: 'Zeigerwerte und Ergebnisse',
    scale: 'Ma\u00dfstab:',
    inputsCartesian: 'Eingaben (kartesisch)',
    inputsPolar: 'Eingaben (polar)',
    tableColSymbol: 'Gr\u00f6ße',
    tableColCartesian: 'Kartesisch',
    tableColPolar: 'Polar',
    tableColUnit: 'Einheit',
    error: 'Fehler',
  },
  en: {
    title: 'Exercise: AC Complex Calculation - Phasor Diagram',
    loading: '[... loading ...]',
    lang: 'Language:',
    seed: 'Seed (7 digits):',
    seedPlaceholder: 'empty = random',
    genSeed: 'Generate (Seed)',
    genDefault: 'Generate (Default)',
    genRandom: 'Generate (Random)',
    values: 'Circuit values',
    tasks: 'Tasks',
    check: 'Check',
    nature: 'Circuit is:',
    inductive: 'inductive',
    capacitive: 'capacitive',
    blank: 'Empty phasor diagram',
    zeiger: 'Phasor values and results',
    scale: 'Scale:',
    inputsCartesian: 'Inputs (cartesian)',
    inputsPolar: 'Inputs (polar)',
    tableColSymbol: 'Symbol',
    tableColCartesian: 'Cartesian',
    tableColPolar: 'Polar',
    tableColUnit: 'Unit',
    error: 'Error',
  }
};
let LANG = localStorage.getItem('lang') || 'de';
if (!I18N[LANG]) LANG = 'de';
let BASE_TITLE = I18N[LANG].title;
document.title = `${BASE_TITLE} ${I18N[LANG].loading}`;

function tr(k) {
  return (I18N[LANG] && I18N[LANG][k]) || I18N.de[k] || k;
}

function setLoadingTitle(isLoading) {
  BASE_TITLE = tr('title');
  const t = isLoading ? `${BASE_TITLE} ${tr('loading')}` : BASE_TITLE;
  document.title = t;
  const h = document.getElementById('main-title');
  if (h) h.textContent = t;
}

function applyLanguageUI() {
  document.documentElement.lang = LANG;
  const l = document.getElementById('lbl-lang');
  if (l) l.textContent = tr('lang');
  const s = document.getElementById('lbl-seed');
  if (s) s.textContent = tr('seed');
  const seed = document.getElementById('seed');
  if (seed) seed.placeholder = tr('seedPlaceholder');
  const b1 = document.getElementById('gen-seed');
  const b2 = document.getElementById('gen-default');
  const b3 = document.getElementById('gen-random');
  if (b1) b1.textContent = tr('genSeed');
  if (b2) b2.textContent = tr('genDefault');
  if (b3) b3.textContent = tr('genRandom');
  const bn = document.getElementById('lbl-nature');
  if (bn) bn.textContent = tr('nature');
  const ind = document.getElementById('lbl-inductive');
  const cap = document.getElementById('lbl-capacitive');
  if (ind) ind.textContent = tr('inductive');
  if (cap) cap.textContent = tr('capacitive');
  const blank = document.getElementById('lbl-blank-title');
  if (blank) blank.textContent = tr('blank');
  const check = document.getElementById('check');
  if (check) check.textContent = tr('check');
  setLoadingTitle(false);
}

function fmtEngSI(x, unit) {
  const v = Number(x);
  if (!isFinite(v) || v === 0) return `0 ${unit}`;
  let exp3 = Math.floor(Math.log10(Math.abs(v)) / 3) * 3;
  let m = v / Math.pow(10, exp3);
  let mi = Math.round(m);
  if (Math.abs(mi) >= 1000) {
    mi = Math.round(mi / 1000);
    exp3 += 3;
  }
  const p = {
    '-12': 'p', '-9': 'n', '-6': 'u', '-3': 'm',
    '0': '', '3': 'k', '6': 'M', '9': 'G'
  };
  const prefix = p[String(exp3)] ?? `e${exp3}`;
  return `${mi} ${prefix}${unit}`;
}

const allFieldKeys = [
  'zc_re','zc_im','zl_re','zl_im','zpar_re','zpar_im','z_re','z_im',
  'i_re','i_im','v1_re','v1_im','v2_re','v2_im','i1_re','i1_im','i2_re','i2_im',
  's_re','s_im',
  'zc_mag','zc_phase','zl_mag','zl_phase','zpar_mag','zpar_phase','z_mag','z_phase',
  'i_mag','i_phase','v1_mag','v1_phase','v2_mag','v2_phase','i1_mag','i1_phase','i2_mag','i2_phase',
  's_mag','s_phase'
];

function inputEl(id) {
  const inp = document.createElement('input');
  inp.id = id;
  inp.className = 'mono';
  return inp;
}

function rowCartesian(labelHtml, reKey, imKey, unit) {
  const row = document.createElement('div');
  row.className = 'eq-row';
  row.innerHTML = `<span class="eq-label">${labelHtml} =</span><span>(</span>`;
  row.appendChild(inputEl(reKey));
  row.innerHTML += `<span>+</span>`;
  row.appendChild(inputEl(imKey));
  row.innerHTML += `<span><b>j</b>) ${unit}</span>`;
  return row;
}

function rowPolar(labelHtml, magKey, phaseKey, unit) {
  const row = document.createElement('div');
  row.className = 'eq-row';
  row.innerHTML = `<span class="eq-label">${labelHtml} =</span><span>Betrag:</span>`;
  row.appendChild(inputEl(magKey));
  row.innerHTML += `<span>${unit}, Winkel:</span>`;
  row.appendChild(inputEl(phaseKey));
  row.innerHTML += `<span>°</span>`;
  return row;
}

function renderInputs(data) {
  const cart = document.getElementById('inputs-cart');
  const polar = document.getElementById('inputs-polar');

  const zxy = `<u>Z</u><sub>${data.tags.zpair}</sub>`;
  const v1 = `<u>V</u><sub>${data.tags.v1}</sub>`;
  const v2 = `<u>V</u><sub>${data.tags.v2}</sub>`;
  const i1 = `<u>I</u><sub>${data.tags.i1}</sub>`;
  const i2 = `<u>I</u><sub>${data.tags.i2}</sub>`;

  cart.innerHTML = `<div class="section-title">${tr('inputsCartesian')}</div>`;
  cart.appendChild(rowCartesian('<u>Z</u><sub>C</sub>', 'zc_re', 'zc_im', 'Ohm'));
  cart.appendChild(rowCartesian('<u>Z</u><sub>L</sub>', 'zl_re', 'zl_im', 'Ohm'));
  cart.appendChild(rowCartesian(zxy, 'zpar_re', 'zpar_im', 'Ohm'));
  cart.appendChild(rowCartesian('<u>Z</u>', 'z_re', 'z_im', 'Ohm'));
  cart.appendChild(rowCartesian('<u>I</u>', 'i_re', 'i_im', 'A'));
  cart.appendChild(rowCartesian(v1, 'v1_re', 'v1_im', 'V'));
  cart.appendChild(rowCartesian(v2, 'v2_re', 'v2_im', 'V'));
  cart.appendChild(rowCartesian(i1, 'i1_re', 'i1_im', 'A'));
  cart.appendChild(rowCartesian(i2, 'i2_re', 'i2_im', 'A'));
  cart.appendChild(rowCartesian('<u>S</u>', 's_re', 's_im', 'VA'));

  polar.innerHTML = `<div class="section-title">${tr('inputsPolar')}</div>`;
  polar.appendChild(rowPolar('<u>Z</u><sub>C</sub>', 'zc_mag', 'zc_phase', 'Ohm'));
  polar.appendChild(rowPolar('<u>Z</u><sub>L</sub>', 'zl_mag', 'zl_phase', 'Ohm'));
  polar.appendChild(rowPolar(zxy, 'zpar_mag', 'zpar_phase', 'Ohm'));
  polar.appendChild(rowPolar('<u>Z</u>', 'z_mag', 'z_phase', 'Ohm'));
  polar.appendChild(rowPolar('<u>I</u>', 'i_mag', 'i_phase', 'A'));
  polar.appendChild(rowPolar(v1, 'v1_mag', 'v1_phase', 'V'));
  polar.appendChild(rowPolar(v2, 'v2_mag', 'v2_phase', 'V'));
  polar.appendChild(rowPolar(i1, 'i1_mag', 'i1_phase', 'A'));
  polar.appendChild(rowPolar(i2, 'i2_mag', 'i2_phase', 'A'));
  polar.appendChild(rowPolar('<u>S</u>', 's_mag', 's_phase', 'VA'));

  cart.style.display = data.mode === 0 ? 'block' : 'none';
  polar.style.display = data.mode === 1 ? 'block' : 'none';
}

async function init() {
  applyLanguageUI();
  pyodide = await loadPyodide();
  await pyodide.loadPackage(['matplotlib']);
  const code = await (await fetch(`../rlc_core.py?v=${Date.now()}`)).text();
  await pyodide.runPythonAsync(code);

  document.getElementById('gen-seed').onclick = () => generateWithMode('seed');
  document.getElementById('gen-default').onclick = () => generateWithMode('default');
  document.getElementById('gen-random').onclick = () => generateWithMode('random');
  document.getElementById('check').onclick = check;
  const langSel = document.getElementById('lang');
  if (langSel) {
    langSel.value = LANG;
    langSel.onchange = async () => {
      LANG = langSel.value === 'en' ? 'en' : 'de';
      localStorage.setItem('lang', LANG);
      applyLanguageUI();
      await generateWithMode('seed');
    };
  }
  // Always start with a fresh random seed on page load.
  document.getElementById('seed').value = '';
  await generateWithMode('random');
}

async function generateWithMode(mode = 'seed') {
  setLoadingTitle(true);
  let seed = '';
  if (mode === 'default') {
    seed = '5116550';
  } else if (mode === 'seed') {
    seed = document.getElementById('seed').value || '';
  } else {
    seed = '';
  }
  const valuesEl = document.getElementById('values');
  valuesEl.innerHTML = `<b>${tr('values')}</b><br>...`;

  let data;
  try {
    const result = await pyodide.runPythonAsync(`import json; json.dumps(generate(${JSON.stringify(seed)}, ${JSON.stringify(LANG)}))`);
    data = JSON.parse(result);
  } catch (e) {
    valuesEl.innerHTML = `<b>${tr('error')}:</b> ${e}`;
    throw e;
  } finally {
    setLoadingTitle(false);
  }

  document.getElementById('seed').value = data.seed;
  valuesEl.innerHTML = `
    <b>${tr('values')}</b><br>
    <i>R</i> = ${data.values.R}<br>
    <i>L</i> = ${data.values.L}<br>
    <i>C</i> = ${data.values.C}<br>
    V = ${data.values.V}<br>
    <i>f</i> = ${data.values.f}
  `;

  document.getElementById('schematic').src = `../schematics/${data.schematic}`;
  document.getElementById('tasks').innerHTML = `<b>${tr('tasks')}</b><br>` + data.tasks.join('<br>');
  const cellWord = LANG === 'en' ? 'grid' : 'Kästchen';
  document.getElementById('scale').innerHTML = `<b>${tr('scale')}</b> ${fmtEngSI(data.scale.Vstep, 'V')}/${cellWord}, ${fmtEngSI(data.scale.Istep, 'A')}/${cellWord}`;
  document.getElementById('phasor').src = `data:image/png;base64,${data.phasor_png}`;
  document.getElementById('blank').src = `data:image/png;base64,${data.blank_png}`;
  const z = data.zeiger || [];
  let html = `<b>${tr('zeiger')}</b><br><table style='border-collapse:collapse'>`;
  html += `<tr><th style='text-align:left;padding-right:12px'>${tr('tableColSymbol')}</th><th style='text-align:left;padding-right:12px'>${tr('tableColCartesian')}</th><th style='text-align:left;padding-right:12px'>${tr('tableColPolar')}</th><th style='text-align:left'>${tr('tableColUnit')}</th></tr>`;
  for (const row of z) {
    html += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`;
  }
  const nat = data.nature === 'kapazitiv' ? tr('capacitive') : tr('inductive');
  html += `</table><div>${tr('nature')} ${nat}</div>`;
  document.getElementById('solution').innerHTML = html;

  renderInputs(data);

  for (const k of allFieldKeys) {
    const el = document.getElementById(k);
    if (el) el.classList.remove('ok', 'bad');
  }
  document.querySelectorAll('input[name="nature"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="nature"]').forEach(r => r.parentElement.classList.remove('ok','bad'));
}

async function check() {
  const inputs = {};
  for (const key of allFieldKeys) {
    const el = document.getElementById(key);
    if (el) inputs[key] = el.value;
  }
  const nature = document.querySelector('input[name="nature"]:checked');
  inputs['nature'] = nature ? nature.value : '';

  const result = await pyodide.runPythonAsync(`import json; json.dumps(check(${JSON.stringify(inputs)}))`);
  const data = JSON.parse(result);

  for (const key of allFieldKeys) {
    const el = document.getElementById(key);
    if (!el) continue;
    el.classList.remove('ok','bad');
    if (key in data) el.classList.add(data[key] ? 'ok' : 'bad');
  }

  if ('nature' in data) {
    document.querySelectorAll('input[name="nature"]').forEach(r => {
      r.parentElement.classList.remove('ok','bad');
      r.parentElement.classList.add(data['nature'] ? 'ok' : 'bad');
    });
  }
}

init();
