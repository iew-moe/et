const TOPO_JSON = "../superposition_topologies_50_clean/topologies.json";
const I18N = {
  de: {
    title: "Übung: Überlagerungssatz",
    loading: "[... loading ...]",
    lang: "Sprache:",
    seedPlaceholder: "leer = random",
    genSeed: "Generieren (Seed)",
    genRandom: "Generieren (Random)",
    check: "Prüfen",
    seed: "Seed:",
    circuit: "Gesamtschaltung",
    inputs: "Eingaben",
    partials: "Teilschaltung 1 (links) und Teilschaltung 2 (rechts)",
    partialVoltage: "Teilspannung",
    partialCurrent: "Teilstrom",
    totalVoltage: "Gesamtspannung",
    totalCurrent: "Gesamtstrom",
    valuesSources: "Quellen",
    valuesResistors: "Widerstände",
    tasks: "Aufgaben",
    checkOk: "Alle Eingaben innerhalb 1% Toleranz.",
    checkBad: "Mindestens eine Eingabe ist außerhalb 1% Toleranz.",
    loadingTopo: "Lade Topologien ...",
    noTopo: "Keine Topologien gefunden.",
    error: "Fehler",
    partialImagesMissing: "Teilbilder fehlen in topologies.json (part_png_v / part_png_i).",
    solutionTitle: "Musterlösung Überlagerungssatz",
    resultsTitle: "Berechnete Spannungen und Ströme",
    only: "nur",
    active: "aktiv",
    totalShort: "Gesamt",
  },
  en: {
    title: "Exercise: Superposition Theorem",
    loading: "[... loading ...]",
    lang: "Language:",
    seedPlaceholder: "empty = random",
    genSeed: "Generate (Seed)",
    genRandom: "Generate (Random)",
    check: "Check",
    seed: "Seed:",
    circuit: "Complete circuit",
    inputs: "Inputs",
    partials: "Partial circuit 1 (left) and partial circuit 2 (right)",
    partialVoltage: "Partial voltage",
    partialCurrent: "Partial current",
    totalVoltage: "Total voltage",
    totalCurrent: "Total current",
    valuesSources: "Sources",
    valuesResistors: "Resistors",
    tasks: "Tasks",
    checkOk: "All inputs are within 1% tolerance.",
    checkBad: "At least one input is outside 1% tolerance.",
    loadingTopo: "Loading topologies ...",
    noTopo: "No topologies found.",
    error: "Error",
    partialImagesMissing: "Partial images are missing in topologies.json (part_png_v / part_png_i).",
    solutionTitle: "Worked solution (superposition)",
    resultsTitle: "Calculated voltages and currents",
    only: "only",
    active: "active",
    totalShort: "Total",
  },
};
let LANG = localStorage.getItem("lang") || "de";
if (!I18N[LANG]) LANG = "de";
let BASE_TITLE = I18N[LANG].title;

function tr(key) {
  return (I18N[LANG] && I18N[LANG][key]) || I18N.de[key] || key;
}

let CURRENT = null;

function setLoadingTitle(isLoading) {
  const t = isLoading ? `${BASE_TITLE} ${tr("loading")}` : BASE_TITLE;
  document.title = t;
  const h = document.getElementById("main-title");
  if (h) h.textContent = t;
}

function applyLanguageUI() {
  document.documentElement.lang = LANG;
  BASE_TITLE = tr("title");
  const l = document.getElementById("lbl-lang");
  if (l) l.textContent = tr("lang");
  const seed = document.getElementById("seed");
  if (seed) seed.placeholder = tr("seedPlaceholder");
  const bSeed = document.getElementById("gen-seed");
  if (bSeed) bSeed.textContent = tr("genSeed");
  const bRandom = document.getElementById("gen-random");
  if (bRandom) bRandom.textContent = tr("genRandom");
  const bCheck = document.getElementById("check");
  if (bCheck) bCheck.textContent = tr("check");
  const c = document.getElementById("lbl-circuit");
  if (c) c.textContent = tr("circuit");
  const i = document.getElementById("lbl-inputs");
  if (i) i.textContent = tr("inputs");
  const p = document.getElementById("lbl-parts");
  if (p) p.textContent = tr("partials");
  const sl = document.getElementById("lbl-seed");
  if (sl) sl.textContent = tr("seed");
  setLoadingTitle(false);
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function parseSeed(text) {
  const s = String(text || "").trim();
  if (/^\d+$/.test(s)) return Number(s);
  return Math.floor(Math.random() * 900000) + 100000;
}

function fmtIdx(name) {
  const lead = (name.match(/[A-Za-z]+/) || [""])[0];
  const idx = (name.match(/\d+/) || [""])[0];
  return idx ? `${lead}<sub>${idx}</sub>` : name;
}

const SI = { "-12": "p", "-9": "n", "-6": "u", "-3": "m", "0": "", "3": "k", "6": "M", "9": "G" };

function fmtSI(x, unit) {
  const v = Number(x);
  if (!isFinite(v) || v === 0) return `0 ${unit}`;
  const sign = v < 0 ? "-" : "";
  let a = Math.abs(v);
  let exp3 = Math.floor(Math.log10(a) / 3) * 3;
  exp3 = Math.max(-12, Math.min(9, exp3));
  let scaled = a / Math.pow(10, exp3);
  if (scaled >= 1000 && exp3 < 9) {
    exp3 += 3;
    scaled /= 1000;
  }
  return `${sign}${scaled.toPrecision(4).replace(/\.?0+$/, "")} ${SI[String(exp3)]}${unit}`;
}

function pickFrom(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function generateValues(seed, topo) {
  const rng = mulberry32(seed >>> 0);
  const vChoices = [1, 5, 12, 24, 230, 400];
  const iChoices = [1, 16, 32, 50];
  const rChoices = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];

  const sources = (topo.sources || []).map((s) => {
    if (s.type === "V") return { ...s, value: pickFrom(rng, vChoices), unit: "V" };
    return { ...s, value: pickFrom(rng, iChoices), unit: "A" };
  });

  const resistorIds = topo.resistor_ids || [];
  const resistors = resistorIds.map((rid) => ({ id: rid, value: pickFrom(rng, rChoices) }));
  return { sources, resistors };
}

function renderInputs(mode, targetId) {
  const sym = mode === "I" ? "I" : "V";
  const unit = mode === "I" ? "A" : "V";
  const kindPart = mode === "I" ? tr("partialCurrent") : tr("partialVoltage");
  const kindTotal = mode === "I" ? tr("totalCurrent") : tr("totalVoltage");

  document.getElementById("lbl-p1").innerHTML = `${kindPart} ${sym}<sub>${targetId},1</sub> [${unit}]:`;
  document.getElementById("lbl-p2").innerHTML = `${kindPart} ${sym}<sub>${targetId},2</sub> [${unit}]:`;
  document.getElementById("lbl-gt").innerHTML = `${kindTotal} ${sym}<sub>${targetId}</sub> [${unit}]:`;

  for (const id of ["in-p1", "in-p2", "in-gt"]) {
    const el = document.getElementById(id);
    el.value = "";
    el.classList.remove("ok", "bad");
  }
  document.getElementById("check-status").textContent = "";
}

function edgeKey(a, b) {
  const sa = `${a[0]},${a[1]}`;
  const sb = `${b[0]},${b[1]}`;
  return sa < sb ? `${sa}|${sb}` : `${sb}|${sa}`;
}

class DSU {
  constructor() { this.p = new Map(); }
  find(x) {
    if (!this.p.has(x)) this.p.set(x, x);
    let r = this.p.get(x);
    if (r !== x) {
      r = this.find(r);
      this.p.set(x, r);
    }
    return r;
  }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra !== rb) this.p.set(rb, ra);
  }
}

function gaussSolve(A, b) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    if (Math.abs(M[pivot][col]) < 1e-14) throw new Error("Singuläres Gleichungssystem");
    if (pivot !== col) [M[pivot], M[col]] = [M[col], M[pivot]];

    const div = M[col][col];
    for (let c = col; c <= n; c++) M[col][c] /= div;

    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      if (Math.abs(f) < 1e-18) continue;
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  return M.map((row) => row[n]);
}

function buildAndSolve(topo, values, activeSourceId = null) {
  const sourceType = new Map((topo.sources || []).map((s) => [s.id, s.type]));
  const sourceVal = new Map((values.sources || []).map((s) => [s.id, Number(s.value)]));
  const resistorVal = new Map((values.resistors || []).map((r) => [r.id, Number(r.value)]));

  const dsu = new DSU();
  const components = topo.component_map || [];
  const wireEdges = topo.wire_edges || [];

  const allNodes = new Set();
  function nodeStr(n) { return `${n[0]},${n[1]}`; }

  for (const w of wireEdges) {
    const a = nodeStr(w[0]), b = nodeStr(w[1]);
    dsu.union(a, b);
    allNodes.add(a); allNodes.add(b);
  }

  // Source deactivation for partial circuits
  for (const c of components) {
    const id = c.id;
    const a = nodeStr(c.edge[0]), b = nodeStr(c.edge[1]);
    allNodes.add(a); allNodes.add(b);
    if (id.startsWith("R")) continue;
    if (activeSourceId === null || id === activeSourceId) continue;
    const t = sourceType.get(id);
    if (t === "V") dsu.union(a, b); // short
    // current source => open (removed later)
  }

  const elems = [];
  for (const c of components) {
    const id = c.id;
    const a0 = nodeStr(c.edge[0]), b0 = nodeStr(c.edge[1]);
    const a = dsu.find(a0), b = dsu.find(b0);

    if (id.startsWith("R")) {
      const R = resistorVal.get(id);
      elems.push({ kind: "R", id, a, b, value: R });
      continue;
    }

    // source
    if (activeSourceId !== null && id !== activeSourceId) {
      const t = sourceType.get(id);
      if (t === "I") continue; // open
      continue; // V already shorted via DSU
    }

    const t = sourceType.get(id);
    const val = sourceVal.get(id);
    elems.push({ kind: t, id, a, b, value: val });
  }

  const nodes = [...new Set([...allNodes].map((n) => dsu.find(n)))].sort();
  if (!nodes.length) throw new Error("Keine Knoten");
  const gnd = nodes[0];
  const nodeVars = nodes.filter((n) => n !== gnd);
  const n = nodeVars.length;

  const vsrc = elems.filter((e) => e.kind === "V");
  const m = vsrc.length;
  const N = n + m;
  if (N === 0) throw new Error("Leeres System");

  const idxNode = new Map(nodeVars.map((v, i) => [v, i]));
  const idxV = new Map(vsrc.map((v, i) => [v.id, n + i]));

  const A = Array.from({ length: N }, () => Array(N).fill(0));
  const z = Array(N).fill(0);

  function ni(node) {
    return node === gnd ? -1 : idxNode.get(node);
  }

  for (const e of elems) {
    const ia = ni(e.a), ib = ni(e.b);

    if (e.kind === "R") {
      const g = 1 / e.value;
      if (ia >= 0) A[ia][ia] += g;
      if (ib >= 0) A[ib][ib] += g;
      if (ia >= 0 && ib >= 0) {
        A[ia][ib] -= g;
        A[ib][ia] -= g;
      }
      continue;
    }

    if (e.kind === "I") {
      // Vorzeichenkorrektur wie offline/lcapy:
      // Quellenwert wird mit invertierter Richtung in die KCL eingebracht.
      if (ia >= 0) z[ia] += e.value;
      if (ib >= 0) z[ib] -= e.value;
      continue;
    }

    if (e.kind === "V") {
      const k = idxV.get(e.id);
      if (ia >= 0) { A[ia][k] += 1; A[k][ia] += 1; }
      if (ib >= 0) { A[ib][k] -= 1; A[k][ib] -= 1; }
      z[k] += e.value;
    }
  }

  const x = gaussSolve(A, z);

  function vNode(node) {
    if (node === gnd) return 0;
    return x[idxNode.get(node)] || 0;
  }

  const vals = {};
  for (const e of elems) {
    const va = vNode(e.a), vb = vNode(e.b);
    const v = va - vb;
    let i = 0;
    if (e.kind === "R") i = v / e.value;
    else if (e.kind === "I") i = -e.value;
    else if (e.kind === "V") i = x[idxV.get(e.id)] || 0;
    vals[e.id] = { V: v, I: i };
  }

  return vals;
}

function computeExpected(topo, values, mode, targetId) {
  const srcIds = (topo.sources || []).map((s) => s.id);
  const full = buildAndSolve(topo, values, null);
  const p1 = buildAndSolve(topo, values, srcIds[0]);
  const p2 = buildAndSolve(topo, values, srcIds[1]);

  const pick = (vals) => {
    const e = vals[targetId] || { V: 0, I: 0 };
    return mode === "I" ? e.I : e.V;
  };

  return {
    part1: pick(p1),
    part2: pick(p2),
    total: pick(full),
    full,
    p1,
    p2,
    srcIds,
  };
}

function withinTol(user, ref) {
  const absRef = Math.abs(ref);
  const tol = Math.max(1e-12, 0.01 * absRef);
  // Vorzeichen muss stimmen (außer echter 0-Referenz).
  if (absRef > 1e-12 && Math.sign(user) !== Math.sign(ref)) return false;
  return Math.abs(user - ref) <= tol;
}

function parseNum(v) {
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

function checkAnswers() {
  if (!CURRENT || !CURRENT.expected) return;

  const p1 = parseNum(document.getElementById("in-p1").value);
  const p2 = parseNum(document.getElementById("in-p2").value);
  const gt = parseNum(document.getElementById("in-gt").value);

  const fields = [
    ["in-p1", p1, CURRENT.expected.part1],
    ["in-p2", p2, CURRENT.expected.part2],
    ["in-gt", gt, CURRENT.expected.total],
  ];

  let allOk = true;
  for (const [id, u, r] of fields) {
    const el = document.getElementById(id);
    el.classList.remove("ok", "bad");
    const ok = Number.isFinite(u) && withinTol(u, r);
    if (!ok) allOk = false;
    el.classList.add(ok ? "ok" : "bad");
  }

  const st = document.getElementById("check-status");
  st.innerHTML = allOk
    ? `<span style="color:#2e7d32">${tr("checkOk")}</span>`
    : `<span style="color:#c62828">${tr("checkBad")}</span>`;

  try {
    renderSolutionsAfterCheck();
  } catch (e) {
    st.innerHTML += `<br><span style="color:#c62828">Error: ${e}</span>`;
  }
}

function valueCell(v, unit) {
  if (!Number.isFinite(v)) return "-";
  return fmtSI(v, unit);
}

function renderSolutionsAfterCheck() {
  if (!CURRENT || !CURRENT.expected) return;
  const { topo, mode, targetId, expected } = CURRENT;
  const rid = targetId;
  const baseSym = mode === "I" ? "I" : "V";
  const qsym1 = `${baseSym}<sub>${rid},1</sub>`;
  const qsym2 = `${baseSym}<sub>${rid},2</sub>`;
  const qsym = `${baseSym}<sub>${rid}</sub>`;
  const unit = mode === "I" ? "A" : "V";

  const srcIds = expected.srcIds || [];
  const [s1, s2] = srcIds;
  const p1Rel = ((mode === "V" ? topo.part_png_v : topo.part_png_i) || []).find((x) => x.active_source === s1)?.png;
  const p2Rel = ((mode === "V" ? topo.part_png_v : topo.part_png_i) || []).find((x) => x.active_source === s2)?.png;
  document.getElementById("part1").src = p1Rel ? `../superposition_topologies_50_clean/${p1Rel}` : "";
  document.getElementById("part2").src = p2Rel ? `../superposition_topologies_50_clean/${p2Rel}` : "";
  if (!p1Rel || !p2Rel) {
    const st = document.getElementById("check-status");
    st.innerHTML += `<br><span style='color:#c62828'>${tr("partialImagesMissing")}</span>`;
  }

  const src1Lbl = s1 ? fmtIdx(s1) : (LANG === "en" ? "Source 1" : "Quelle 1");
  const src2Lbl = s2 ? fmtIdx(s2) : (LANG === "en" ? "Source 2" : "Quelle 2");
  document.getElementById("solution").innerHTML =
    `<b>${tr("solutionTitle")}</b><br>` +
    `${qsym1} (${tr("only")} ${src1Lbl} ${tr("active")}): <b>${fmtSI(expected.part1, unit)}</b><br>` +
    `${qsym2} (${tr("only")} ${src2Lbl} ${tr("active")}): <b>${fmtSI(expected.part2, unit)}</b><br>` +
    `${qsym} (${tr("totalShort")}): <b>${fmtSI(expected.total, unit)}</b>`;

  const ids = new Set([
    ...Object.keys(expected.full || {}),
    ...Object.keys(expected.p1 || {}),
    ...Object.keys(expected.p2 || {}),
  ]);
  const order = [...ids].sort((a, b) => {
    const pa = (a.match(/[A-Za-z]+/) || [""])[0];
    const pb = (b.match(/[A-Za-z]+/) || [""])[0];
    const ia = Number((a.match(/\d+/) || ["0"])[0]);
    const ib = Number((b.match(/\d+/) || ["0"])[0]);
    const ga = (pa === "V" || pa === "I") ? 0 : 1;
    const gb = (pb === "V" || pb === "I") ? 0 : 1;
    if (ga !== gb) return ga - gb;
    if (pa !== pb) return pa.localeCompare(pb);
    return ia - ib;
  });

  let html = `<b>${tr("resultsTitle")}</b><br><br>`;
  html += '<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;">';
  html += '<tr><th>Element</th><th>V,1 [V]</th><th>I,1 [A]</th><th>V,2 [V]</th><th>I,2 [A]</th><th>V [V]</th><th>I [A]</th></tr>';
  for (const id of order) {
    const a = expected.p1[id] || {};
    const b = expected.p2[id] || {};
    const c = expected.full[id] || {};
    html += `<tr><td><b>${fmtIdx(id)}</b></td>` +
      `<td>${valueCell(a.V, "V")}</td><td>${valueCell(a.I, "A")}</td>` +
      `<td>${valueCell(b.V, "V")}</td><td>${valueCell(b.I, "A")}</td>` +
      `<td>${valueCell(c.V, "V")}</td><td>${valueCell(c.I, "A")}</td></tr>`;
  }
  html += "</table>";
  document.getElementById("table").innerHTML = html;
}

function renderCase(seed, db) {
  const count = db.items.length;
  const idx = ((Math.abs(seed) % count) + count) % count;
  const topo = db.items[idx];

  const mode = seed % 2 === 0 ? "V" : "I";
  const srcTypes = (topo.sources || []).map((s) => s.type);
  const nV = srcTypes.filter((t) => t === "V").length;
  const nI = srcTypes.filter((t) => t === "I").length;
  let srcMix = LANG === "en" ? "sources" : "Quellen";
  if (nV === 2) srcMix = LANG === "en" ? "2x V sources" : "2x V Quellen";
  else if (nI === 2) srcMix = LANG === "en" ? "2x I sources" : "2x I Quellen";
  else if (nV === 1 && nI === 1) srcMix = LANG === "en" ? "I+V sources" : "I+V Quellen";
  const imgRel = mode === "V" ? topo.png_v : topo.png_i;
  const vals = generateValues(seed, topo);

  const srcHtml = vals.sources.map((s) => `${fmtIdx(s.id)}: ${fmtSI(s.value, s.unit)}`).join("<br>");
  const rHtml = vals.resistors.map((r) => `${fmtIdx(r.id)}: ${fmtSI(r.value, "Ohm")}`).join("<br>");

  const rid = topo.target_resistor_id || "R3";
  const rlbl = fmtIdx(rid);
  const qname = mode === "I"
    ? (LANG === "en"
      ? `the current I<sub>${rid},1</sub> and I<sub>${rid},2</sub> through ${rlbl}`
      : `den Strom I<sub>${rid},1</sub> beziehungsweise I<sub>${rid},2</sub> durch ${rlbl}`)
    : (LANG === "en"
      ? `the voltage U<sub>${rid},1</sub> and U<sub>${rid},2</sub> across ${rlbl}`
      : `die Spannung U<sub>${rid},1</sub> beziehungsweise U<sub>${rid},2</sub> über ${rlbl}`);
  const partWord = mode === "I" ? (LANG === "en" ? "partial currents" : "Teilströme") : (LANG === "en" ? "partial voltages" : "Teilspannungen");
  const part1 = mode === "I" ? `I<sub>${rid},1</sub>` : `V<sub>${rid},1</sub>`;
  const part2 = mode === "I" ? `I<sub>${rid},2</sub>` : `V<sub>${rid},2</sub>`;
  const overWord = mode === "I" ? (LANG === "en" ? "through" : "durch") : (LANG === "en" ? "across" : "über");
  const qsym = mode === "I" ? `I<sub>${rid}</sub>` : `V<sub>${rid}</sub>`;
  const totalWord = mode === "I" ? (LANG === "en" ? "the total current" : "den Gesamtstrom") : (LANG === "en" ? "the total voltage" : "die Gesamtspannung");

  document.getElementById("status").innerHTML =
    `Seed ${seed} → Topologie ${topo.topology_id} (${mode}${LANG === "en" ? " task" : "-Aufgabe"}) (${srcMix})`;
  document.getElementById("values").innerHTML = `<b>${tr("valuesSources")}</b><br>${srcHtml}<br><br><b>${tr("valuesResistors")}</b><br>${rHtml}`;
  document.getElementById("tasks").innerHTML =
    `<b>${tr("tasks")}</b><br>` +
    (LANG === "en"
      ? `1) Draw the two superposed partial circuits. In both partial circuits, label at least the sources and ${qname}.<br>` +
        `2) Compute for both partial circuits the ${partWord} ${part1} and ${part2} ${overWord} ${rlbl} (with source 1 active use ${part1}, with source 2 active use ${part2}).<br>` +
        `3) Compute ${totalWord} ${qsym} for the full circuit using superposition.`
      : `1) Zeichne die zwei zu überlagernden Teilschaltungen. Beschrifte in beiden Teilschaltungen mindestens die Quellen und ${qname}.<br>` +
        `2) Berechne für beide Teilschaltungen die ${partWord} ${part1} und ${part2} ${overWord} ${rlbl} (mit aktivierter Quelle 1 gilt ${part1}, mit aktivierter Quelle 2 gilt ${part2}).<br>` +
        `3) Berechne ${totalWord} ${qsym} für die Gesamtschaltung durch Anwendung des Überlagerungssatzes.`);

  document.getElementById("schematic").src = `../superposition_topologies_50_clean/${imgRel}`;
  document.getElementById("part1").src = "";
  document.getElementById("part2").src = "";
  document.getElementById("solution").innerHTML = "";
  document.getElementById("table").innerHTML = "";
  renderInputs(mode, rid);

  CURRENT = {
    seed,
    topo,
    mode,
    values: vals,
    targetId: rid,
    expected: computeExpected(topo, vals, mode, rid),
  };
}

async function init() {
  applyLanguageUI();
  setLoadingTitle(true);
  const status = document.getElementById("status");
  try {
    status.textContent = tr("loadingTopo");
    const res = await fetch(`${TOPO_JSON}?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const db = await res.json();
    if (!db.items || !db.items.length) throw new Error(tr("noTopo"));

    const langSel = document.getElementById("lang");
    if (langSel) {
      langSel.value = LANG;
      langSel.onchange = () => {
        LANG = langSel.value === "en" ? "en" : "de";
        localStorage.setItem("lang", LANG);
        applyLanguageUI();
        if (CURRENT) renderCase(CURRENT.seed, db);
      };
    }

    document.getElementById("gen-seed").onclick = () => {
      const seed = parseSeed(document.getElementById("seed").value);
      document.getElementById("seed").value = String(seed);
      renderCase(seed, db);
    };

    document.getElementById("gen-random").onclick = () => {
      const seed = parseSeed("");
      document.getElementById("seed").value = String(seed);
      renderCase(seed, db);
    };

    document.getElementById("check").onclick = checkAnswers;
    hookEnterCheck(checkAnswers);

    const seed = parseSeed("");
    document.getElementById("seed").value = String(seed);
    renderCase(seed, db);
    setLoadingTitle(false);
  } catch (e) {
    status.innerHTML = `<span class="warn">${tr("error")}: ${e}</span>`;
    setLoadingTitle(false);
  }
}

function hookEnterCheck(fn) {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const t = e.target;
    if (!t) return;
    const tag = (t.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") {
      e.preventDefault();
      fn();
    }
  });
}

init();
