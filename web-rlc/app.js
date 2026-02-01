let pyodide;
const BASE_TITLE = 'Übung: Komplexe Wechselstromrechnung - Zeigerdiagramm';
document.title = `${BASE_TITLE} [... loading ...]`;

function setLoadingTitle(isLoading) {
  const t = isLoading ? `${BASE_TITLE} [... loading ...]` : BASE_TITLE;
  document.title = t;
  const h = document.getElementById('main-title');
  if (h) h.textContent = t;
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

  cart.innerHTML = `<div class="section-title">Eingaben (kartesisch)</div>`;
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

  polar.innerHTML = `<div class="section-title">Eingaben (polar)</div>`;
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
  pyodide = await loadPyodide();
  await pyodide.loadPackage(['matplotlib']);
  const code = await (await fetch(`../rlc_core.py?v=${Date.now()}`)).text();
  await pyodide.runPythonAsync(code);

  document.getElementById('gen-seed').onclick = () => generateWithMode('seed');
  document.getElementById('gen-default').onclick = () => generateWithMode('default');
  document.getElementById('gen-random').onclick = () => generateWithMode('random');
  document.getElementById('check').onclick = check;
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
  valuesEl.innerHTML = '<b>Schaltungswerte</b><br>...';

  let data;
  try {
    const result = await pyodide.runPythonAsync(`import json; json.dumps(generate(${JSON.stringify(seed)}))`);
    data = JSON.parse(result);
  } catch (e) {
    valuesEl.innerHTML = `<b>Fehler:</b> ${e}`;
    throw e;
  } finally {
    setLoadingTitle(false);
  }

  document.getElementById('seed').value = data.seed;
  valuesEl.innerHTML = `
    <b>Schaltungswerte</b><br>
    <i>R</i> = ${data.values.R}<br>
    <i>L</i> = ${data.values.L}<br>
    <i>C</i> = ${data.values.C}<br>
    V = ${data.values.V}<br>
    <i>f</i> = ${data.values.f}
  `;

  document.getElementById('schematic').src = `../schematics/${data.schematic}`;
  document.getElementById('tasks').innerHTML = '<b>Aufgaben</b><br>' + data.tasks.join('<br>');
  document.getElementById('scale').innerHTML = `<b>Maßstab:</b> ${fmtEngSI(data.scale.Vstep, 'V')}/Kästchen, ${fmtEngSI(data.scale.Istep, 'A')}/Kästchen`;
  document.getElementById('phasor').src = `data:image/png;base64,${data.phasor_png}`;
  document.getElementById('blank').src = `data:image/png;base64,${data.blank_png}`;
  const z = data.zeiger || [];
  let html = "<b>Zeigerwerte und Ergebnisse</b><br><table style='border-collapse:collapse'>";
  html += "<tr><th style='text-align:left;padding-right:12px'>Größe</th><th style='text-align:left;padding-right:12px'>Kartesisch</th><th style='text-align:left;padding-right:12px'>Polar</th><th style='text-align:left'>Einheit</th></tr>";
  for (const row of z) {
    html += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`;
  }
  html += "</table><div>Schaltung ist " + data.nature + "</div>";
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
