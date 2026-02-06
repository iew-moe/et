const I18N = {

  de: {

    title: "Übung: Elektrischer Leiter",

    loading: "[... loading ...]",

    lang: "Sprache:",

    seed: "Seed:",

    seedPlaceholder: "leer = random",

    genSeed: "Generieren (Seed)",

    genRandom: "Generieren (Random)",

    given: "Gegeben",

    tasks: "Aufgaben",

    inputs: "Eingaben",

    solution: "Musterlösung",

    check: "Prüfen",

    ok: "Alle Eingaben innerhalb 1% Toleranz.",

    bad: "Mindestens eine Eingabe ist außerhalb 1% Toleranz.",

    nature: "Leiter ist:",

    warm: "Warmleiter",

    cold: "Kaltleiter",

    geomUnknown: "Querschnitt: A zu dimensionieren",

    srcV: "Spannungsquelle",

    srcI: "Stromquelle",

    geomRoundR: "Querschnitt rund: Radius r =",

    geomRoundD: "Querschnitt rund: Durchmesser d =",

    geomSquareA: "Querschnitt quadratisch: Seitenlänge a =",

    material: "Material",

    rho: "rho (20°C)",

    alpha: "alpha",

    length: "Leiterlänge L",

    t0: "T<sub>0</sub> = 20°C",

    t1: "T<sub>1</sub> =",

    source: "Quelle",

    currentDensity: "Vorgegebene Stromdichte S<sub>0</sub>",

    load: "Verbraucher RV",

    inputsTitle: "Eingaben",

    tasksTitle: "Aufgaben",

    inputsFormula: "Formelaufgabe (symbolisch, keine Eingabe)",

    taskFormula: "Stelle die Formel für den Widerstand R<sub>L</sub>(T<sub>0</sub>) (in Abhängigkeit von Geometrie und Materialdaten) und für den Strom I<sub>0</sub>(T<sub>0</sub>) (abhängig von Quelle, R<sub>L</sub>{RV}) auf.",

    taskDimA: "Dimensioniere den Leiterquerschnitt A für die vorgegebene Stromdichte S<sub>0</sub> (A/mm²).",

    taskR20: "Berechne den Leiterwiderstand R<sub>L</sub> bei T<sub>0</sub> = 20°C.",

    taskS0: "Berechne die Stromdichte S<sub>0</sub> im Leiter bei T<sub>0</sub>.",

    taskI0: "Berechne den Strom I<sub>0</sub> durch den Leiter bei T<sub>0</sub>.",

    taskVRL: "Berechne die Spannung V<sub>R_L</sub> über dem Leiter bei T<sub>0</sub>.",

    taskPL: "Berechne die Wirkleistung P<sub>L</sub> im Leiter bei T<sub>0</sub>.",

    taskPV: "Berechne die Wirkleistung P<sub>V</sub> im Verbraucher bei T<sub>0</sub>.",

    taskP0: "Berechne die von der Quelle abgegebene Leistung P<sub>0</sub> bei T<sub>0</sub>.",

    taskRT: "Berechne den Leiterwiderstand R<sub>L</sub> bei T<sub>1</sub>.",

    taskType: "Handelt es sich um einen Warm- oder Kaltleiter?",

    inR20: "R<sub>L</sub>(T<sub>0</sub>) [Ohm]",

    inS0: "Stromdichte S<sub>0</sub> [A/mm²]",

    inI0: "Strom I<sub>0</sub>(T<sub>0</sub>) [A]",

    inVRL: "Spannung V<sub>R_L</sub>(T<sub>0</sub>) [V]",

    inA: "Dimensionierter Querschnitt A [mm²]",

    inPL: "Verlustleistung Leiter P<sub>L</sub>(T<sub>0</sub>) [W]",

    inPV: "Leistung Verbraucher P<sub>V</sub>(T<sub>0</sub>) [W]",

    inP0: "Quellenleistung P<sub>0</sub>(T<sub>0</sub>) [W]",

    inRT: "R<sub>L</sub>(T<sub>1</sub>) [Ohm]",

    solR20: "R<sub>L</sub>(T<sub>0</sub>) =",

    solS0: "S<sub>0</sub> =",

    solI0: "I<sub>0</sub>(T<sub>0</sub>) =",

    solVRL: "V<sub>R_L</sub>(T<sub>0</sub>) =",

    solA: "A (dimensioniert, T<sub>0</sub>) =",

    solPL: "P<sub>L</sub>(T<sub>0</sub>) =",

    solPV: "P<sub>V</sub>(T<sub>0</sub>) =",

    solP0: "P<sub>0</sub>(T<sub>0</sub>) =",

    solRT: "R<sub>L</sub>(T<sub>1</sub>) =",

    solType: "Typ:",

  },

  en: {

    title: "Exercise: Electrical Conductor",

    loading: "[... loading ...]",

    lang: "Language:",

    seed: "Seed:",

    seedPlaceholder: "empty = random",

    genSeed: "Generate (Seed)",

    genRandom: "Generate (Random)",

    given: "Given",

    tasks: "Tasks",

    inputs: "Inputs",

    solution: "Worked solution",

    check: "Check",

    ok: "All inputs are within 1% tolerance.",

    bad: "At least one input is outside 1% tolerance.",

    nature: "Conductor is:",

    warm: "Warm conductor",

    cold: "Cold conductor",

    geomUnknown: "Cross-section: A to dimension",

    srcV: "Voltage source",

    srcI: "Current source",

    geomRoundR: "Round cross-section: radius r =",

    geomRoundD: "Round cross-section: diameter d =",

    geomSquareA: "Square cross-section: side a =",

    material: "Material",

    rho: "rho (20°C)",

    alpha: "alpha",

    length: "Conductor length L",

    t0: "T<sub>0</sub> = 20°C",

    t1: "T<sub>1</sub> =",

    source: "Source",

    currentDensity: "Given current density S<sub>0</sub>",

    load: "Load RV",

    inputsTitle: "Inputs",

    tasksTitle: "Tasks",

    inputsFormula: "Formula task (symbolic, no input)",

    taskFormula: "Write the formula for R<sub>L</sub>(T<sub>0</sub>) (geometry/material) and for I<sub>0</sub>(T<sub>0</sub>) (from source, R<sub>L</sub>{RV}).",

    taskDimA: "Dimension the cross-sectional area A for the given current density S<sub>0</sub> (A/mm²).",

    taskR20: "Compute the conductor resistance R<sub>L</sub> at T<sub>0</sub> = 20°C.",

    taskS0: "Compute the current density S<sub>0</sub> at T<sub>0</sub>.",

    taskI0: "Compute the current I<sub>0</sub> at T<sub>0</sub>.",

    taskVRL: "Compute the voltage V<sub>R_L</sub> across the conductor at T<sub>0</sub>.",

    taskPL: "Compute real power P<sub>L</sub> in the conductor at T<sub>0</sub>.",

    taskPV: "Compute real power P<sub>V</sub> in the load at T<sub>0</sub>.",

    taskP0: "Compute source power P<sub>0</sub> at T<sub>0</sub>.",

    taskRT: "Compute conductor resistance R<sub>L</sub> at T<sub>1</sub>.",

    taskType: "Is the conductor a warm or cold conductor?",

    inR20: "R<sub>L</sub>(T<sub>0</sub>) [Ohm]",

    inS0: "Current density S<sub>0</sub> [A/mm²]",

    inI0: "Current I<sub>0</sub>(T<sub>0</sub>) [A]",

    inVRL: "Voltage V<sub>R_L</sub>(T<sub>0</sub>) [V]",

    inA: "Dimensioned area A [mm²]",

    inPL: "Conductor loss P<sub>L</sub>(T<sub>0</sub>) [W]",

    inPV: "Load power P<sub>V</sub>(T<sub>0</sub>) [W]",

    inP0: "Source power P<sub>0</sub>(T<sub>0</sub>) [W]",

    inRT: "R<sub>L</sub>(T<sub>1</sub>) [Ohm]",

    solR20: "R<sub>L</sub>(T<sub>0</sub>) =",

    solS0: "S<sub>0</sub> =",

    solI0: "I<sub>0</sub>(T<sub>0</sub>) =",

    solVRL: "V<sub>R_L</sub>(T<sub>0</sub>) =",

    solA: "A (dimensioned, T<sub>0</sub>) =",

    solPL: "P<sub>L</sub>(T<sub>0</sub>) =",

    solPV: "P<sub>V</sub>(T<sub>0</sub>) =",

    solP0: "P<sub>0</sub>(T<sub>0</sub>) =",

    solRT: "R<sub>L</sub>(T<sub>1</sub>) =",

    solType: "Type:",

  },

};



let LANG = localStorage.getItem("lang") || "de";

if (!I18N[LANG]) LANG = "de";

let BASE_TITLE = I18N[LANG].title;

let CURRENT = null;



function tr(key) {
  return (I18N[LANG] && I18N[LANG][key]) || I18N.de[key] || key;
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("exerciseProgress") || "{}");
  } catch {
    return {};
  }
}

function saveProgress(p) {
  localStorage.setItem("exerciseProgress", JSON.stringify(p));
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

  const lblSeed = document.getElementById("lbl-seed");

  if (lblSeed) lblSeed.textContent = tr("seed");

  const lblSol = document.getElementById("lbl-solution");

  if (lblSol) lblSol.textContent = tr("solution");

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



const MATERIALS = [

  { name: "Kupfer", rho: 0.0178, alpha: 0.0039 },

  { name: "Aluminium", rho: 0.0282, alpha: 0.0040 },

];

const L_VALUES = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];

const V_VALUES = [1, 5, 12, 24, 230, 400];

const I_VALUES = [1, 2, 5, 10, 16, 20, 32, 50];

const RL_VALUES = [0.5, 1, 2, 5, 10, 20, 50, 100];

const GEOM_VALUES_MM = [0.5, 1, 2, 5, 10, 20];

const S_TARGET_VALUES = [0.1, 0.2, 0.5, 1, 2, 5, 10];



function areaFromGeom(kind, valMm) {

  if (kind === "r") return Math.PI * valMm * valMm;

  if (kind === "d") return Math.PI * Math.pow(valMm / 2, 2);

  return valMm * valMm;

}



function describeGeometry(c) {

  const kind = c.geom_kind;

  const val = c.geom_val_mm;

  if (!kind || !val) return tr("geomUnknown");

  if (kind === "r") return `${tr("geomRoundR")} ${fmtNum(val)} mm`;

  if (kind === "d") return `${tr("geomRoundD")} ${fmtNum(val)} mm`;

  return `${tr("geomSquareA")} ${fmtNum(val)} mm`;

}



function fmtNum(x, sig = 4) {

  let s = Number(x).toPrecision(sig);

  if (s.indexOf("e") === -1 && s.indexOf(".") >= 0) {

    s = s.replace(/0+$/, "").replace(/\.$/, "");

  }

  return s;

}



function fmtOhm(x) {

  const v = Math.abs(x);

  if (v >= 1e6) return `${fmtNum(x / 1e6)} MOhm`;

  if (v >= 1e3) return `${fmtNum(x / 1e3)} kOhm`;

  if (v > 0 && v < 1) return `${fmtNum(x * 1e3)} mOhm`;

  return `${fmtNum(x)} Ohm`;

}



function fmtLenM(x) {

  if (x >= 1) return `${fmtNum(x)} m`;

  if (x >= 1e-2) return `${fmtNum(x * 100)} cm`;

  return `${fmtNum(x * 1000)} mm`;

}



function formatTemp(t) {

  return `${Math.round(t)}°C`;

}



function solveCase(c) {

  const rho = c.material.rho;

  const alpha = c.material.alpha;

  const L = c.L_m;

  const T1 = c.T_C;

  const RL = c.RL_ohm;

  const A = c.mode === "basis" ? c.A_mm2 : c.A_dim_mm2;



  const R20 = rho * L / A;

  const RT = R20 * (1 + alpha * (T1 - 20));



  let I20;

  let U0T0;

  if (c.source_type === "V") {

    const U0 = c.source_value;

    I20 = U0 / (R20 + RL);

    U0T0 = U0;

  } else {

    const I0 = c.source_value;

    I20 = I0;

    U0T0 = I20 * (R20 + RL);

  }



  const S20 = I20 / A;

  const V_RL0 = I20 * R20;

  const P_leiter = I20 * I20 * R20;

  const P_load = I20 * I20 * RL;

  const P0 = U0T0 * I20;



  return {

    A_mm2: A,

    R20,

    RT,

    I20,

    U0T: U0T0,

    V_RL0,

    S20,

    P_leiter,

    P_load,

    P0,

    leiter_typ: alpha > 0 ? "Kaltleiter" : "Warmleiter",

  };

}



function generateCase(seedText) {

  const seed = parseSeed(seedText);

  const rng = mulberry32(seed >>> 0);



  for (let i = 0; i < 500; i++) {

    const mode = rng() < 0.5 ? "basis" : "dimension";

    const material = MATERIALS[Math.floor(rng() * MATERIALS.length)];

    const L_m = L_VALUES[Math.floor(rng() * L_VALUES.length)];

    const T_C = Math.floor((rng() * 126 - 25) / 5) * 5 + -25;



    if (mode === "basis") {

      const geom_kind = ["r", "d", "x"][Math.floor(rng() * 3)];

      const geom_val_mm = GEOM_VALUES_MM[Math.floor(rng() * GEOM_VALUES_MM.length)];

      const A_mm2 = areaFromGeom(geom_kind, geom_val_mm);

      const source_type = rng() < 0.5 ? "V" : "I";

      const source_value = source_type === "V"

        ? V_VALUES[Math.floor(rng() * V_VALUES.length)]

        : I_VALUES[Math.floor(rng() * I_VALUES.length)];

      const with_load = rng() < 0.5;

      const RL_ohm = with_load ? RL_VALUES[Math.floor(rng() * RL_VALUES.length)] : 0;



      const c = {

        seed, mode, material, L_m, T_C,

        geom_kind, geom_val_mm, A_mm2,

        source_type, source_value, RL_ohm,

      };

      const r = solveCase(c);

      if (!(1e-3 < r.R20 && r.R20 < 1e6)) continue;

      if (!(0.01 <= r.S20 && r.S20 <= 50)) continue;

      c.result = r;

      return c;

    }



    // dimension mode

    const source_type = "V";

    const source_value = V_VALUES[Math.floor(rng() * V_VALUES.length)];

    const RL_ohm = RL_VALUES[Math.floor(rng() * RL_VALUES.length)];

    const S_target = S_TARGET_VALUES[Math.floor(rng() * S_TARGET_VALUES.length)];

    const rhoL = material.rho * L_m;

    const A_dim = (source_value / S_target - rhoL) / RL_ohm;

    if (!(0.05 <= A_dim && A_dim <= 400)) continue;



    const c = {

      seed, mode, material, L_m, T_C,

      source_type, source_value, RL_ohm,

      S_target, A_dim_mm2: A_dim,

    };

    const r = solveCase(c);

    if (!(1e-3 < r.R20 && r.R20 < 1e6)) continue;

    c.result = r;

    return c;

  }



  throw new Error("Keine gültige Aufgabe gefunden.");

}



function schematicName(c) {

  const src = c.source_type === "V" ? "V" : "I";

  const load = c.RL_ohm > 0 ? "with_load" : "no_load";

  return `../schematics/leiter_topologies_clean/leiter_${src}_${load}.png`;

}



function renderValues(c) {

  const r = c.result;

  const srcText = c.source_type === "V"

    ? `${tr("srcV")} V<sub>0</sub> = ${fmtNum(c.source_value)} V`

    : `${tr("srcI")} I<sub>0</sub> = ${fmtNum(c.source_value)} A`;



  const lines = [

    `<div class="section-title">${tr("given")}</div>`,

    `- Seed: ${c.seed}<br>`,

    `- ${tr("material")}: ${c.material.name}<br>`,

    `- ${tr("rho")}: ${fmtNum(c.material.rho)} Ohm·mm²/m<br>`,

    `- ${tr("alpha")}: ${fmtNum(c.material.alpha)} 1/K<br>`,

    `- ${tr("length")}: ${fmtLenM(c.L_m)}<br>`,

    `- ${tr("t0")}<br>`,

    `- ${tr("t1")} ${formatTemp(c.T_C)}<br>`,

    `- ${describeGeometry(c)}<br>`,

    `- ${tr("source")}: ${srcText}<br>`,

  ];

  if (c.mode === "dimension") {

    lines.push(`- ${tr("currentDensity")}: ${fmtNum(c.S_target)} A/mm²<br>`);

  }

  if (c.RL_ohm > 0) {

    lines.push(`- ${tr("load")}: ${fmtOhm(c.RL_ohm)}<br>`);

  }

  document.getElementById("values").innerHTML = lines.join("");

}



function renderTasks(c) {

  const tasks = [];

  const hasLoad = c.RL_ohm > 0;

  if (c.mode === "dimension") {

    const rv = hasLoad ? (LANG === "en" ? " and R<sub>V</sub>" : " und R<sub>V</sub>") : "";

    tasks.push(tr("taskFormula").replace("{RV}", rv));

    tasks.push(tr("taskDimA"));

    tasks.push(tr("taskR20"));

    tasks.push(tr("taskS0"));

    tasks.push(tr("taskI0"));

  } else {

    tasks.push(tr("taskR20"));

    tasks.push(tr("taskS0"));

    if (c.source_type === "V") {

      tasks.push(tr("taskI0"));

    } else {

      tasks.push(tr("taskVRL"));

    }

  }

  tasks.push(tr("taskPL"));

  if (hasLoad) {

    tasks.push(tr("taskPV"));

    tasks.push(tr("taskP0"));

    tasks.push(tr("taskRT"));

    tasks.push(tr("taskType"));

  } else {

    tasks.push(tr("taskP0"));

    tasks.push(tr("taskRT"));

    tasks.push(tr("taskType"));

  }

  document.getElementById("tasks").innerHTML =

    `<div class="section-title">${tr("tasksTitle")}</div>` + tasks.map((t, i) => `${i + 1}) ${t}<br>`).join("");

}



function makeInputRow(label, id) {

  return `<div class="row"><label class="label">${label}</label><input id="${id}" /></div>`;

}



function renderInputs(c) {

  const hasLoad = c.RL_ohm > 0;

  const rows = [];

  let n = 1;

  if (c.mode === "basis") {

    rows.push(makeInputRow(`${n++}) ${tr("inR20")}:`, "in_R20"));

    rows.push(makeInputRow(`${n++}) ${tr("inS0")}:`, "in_S20"));

    if (c.source_type === "V") {

      rows.push(makeInputRow(`${n++}) ${tr("inI0")}:`, "in_I0"));

    } else {

      rows.push(makeInputRow(`${n++}) ${tr("inVRL")}:`, "in_VRL"));

    }

  } else {

    rows.push(`<div class="row"><div class="label"><b>${n++}) ${tr("inputsFormula")}</b></div></div>`);

    rows.push(makeInputRow(`${n++}) ${tr("inA")}:`, "in_A"));

    rows.push(makeInputRow(`${n++}) ${tr("inR20")}:`, "in_R20"));

    rows.push(makeInputRow(`${n++}) ${tr("inS0")}:`, "in_S20"));

    rows.push(makeInputRow(`${n++}) ${tr("inI0")}:`, "in_I0"));

  }

  rows.push(makeInputRow(`${n++}) ${tr("inPL")}:`, "in_PL"));

  if (hasLoad) rows.push(makeInputRow(`${n++}) ${tr("inPV")}:`, "in_PV"));

  rows.push(makeInputRow(`${n++}) ${tr("inP0")}:`, "in_P0"));

  rows.push(makeInputRow(`${n++}) ${tr("inRT")}:`, "in_RT"));

  rows.push(

    `<div class="row"><label class="label" id="lbl-nature">${n++}) ${tr("nature")}</label>` +

    `<select id="nature"><option value="Warmleiter">${tr("warm")}</option>` +

    `<option value="Kaltleiter">${tr("cold")}</option></select></div>`

  );



  document.getElementById("inputs").innerHTML =

    `<div class="section-title">${tr("inputsTitle")}</div>` + rows.join("");

}



function renderSolution(c) {

  const r = c.result;

  const hasLoad = c.RL_ohm > 0;

  const lines = [];

  if (c.mode === "basis") {

    lines.push(`- ${tr("solR20")} ${fmtOhm(r.R20)}<br>`);

    lines.push(`- ${tr("solS0")} ${fmtNum(r.S20)} A/mm²<br>`);

    if (c.source_type === "V") {

      lines.push(`- ${tr("solI0")} ${fmtNum(r.I20)} A<br>`);

    } else {

      lines.push(`- ${tr("solVRL")} ${fmtNum(r.V_RL0)} V<br>`);

    }

  } else {

    lines.push(`- ${tr("solA")} ${fmtNum(r.A_mm2)} mm²<br>`);

    lines.push(`- ${tr("solR20")} ${fmtOhm(r.R20)}<br>`);

    lines.push(`- ${tr("solS0")} ${fmtNum(r.S20)} A/mm²<br>`);

    lines.push(`- ${tr("solI0")} ${fmtNum(r.I20)} A<br>`);

  }

  lines.push(`- ${tr("solPL")} ${fmtNum(r.P_leiter)} W<br>`);

  if (hasLoad) lines.push(`- ${tr("solPV")} ${fmtNum(r.P_load)} W<br>`);

  lines.push(`- ${tr("solP0")} ${fmtNum(r.P0)} W<br>`);

  lines.push(`- ${tr("solRT")} ${fmtOhm(r.RT)}<br>`);

  const typTxt = r.leiter_typ === "Warmleiter" ? tr("warm") : tr("cold");

  lines.push(`- ${tr("solType")} ${typTxt}`);

  document.getElementById("solution").innerHTML = lines.join("");

}



function clearChecks() {

  for (const id of ["in_R20", "in_S20", "in_I0", "in_VRL", "in_A", "in_PL", "in_PV", "in_P0", "in_RT"]) {

    const el = document.getElementById(id);

    if (!el) continue;

    el.classList.remove("ok", "bad");

  }

  document.getElementById("check-status").textContent = "";

}



function okTol(user, ref) {

  if (ref === 0) return user === 0;

  if (user === 0) return false;

  if ((user > 0) !== (ref > 0)) return false;

  const tol = 0.01 * Math.abs(ref);

  return Math.abs(user - ref) <= tol;

}



function checkAll() {

  if (!CURRENT) return;

  const c = CURRENT;

  const r = c.result;

  const hasLoad = c.RL_ohm > 0;

  let allOk = true;
  let okCount = 0;
  let totalCount = 0;



  function check(id, ref) {

    const el = document.getElementById(id);

    if (!el) return true;

    const val = Number(el.value);

    const ok = okTol(val, ref);

    el.classList.toggle("ok", ok);

    el.classList.toggle("bad", !ok);
    totalCount += 1;
    if (ok) okCount += 1;

    return ok;

  }



  if (c.mode === "basis") {

    allOk = check("in_R20", r.R20) && allOk;

    allOk = check("in_S20", r.S20) && allOk;

    if (c.source_type === "V") {

      allOk = check("in_I0", r.I20) && allOk;

    } else {

      allOk = check("in_VRL", r.V_RL0) && allOk;

    }

  } else {

    allOk = check("in_A", r.A_mm2) && allOk;

    allOk = check("in_R20", r.R20) && allOk;

    allOk = check("in_S20", r.S20) && allOk;

    allOk = check("in_I0", r.I20) && allOk;

  }

  allOk = check("in_PL", r.P_leiter) && allOk;

  if (hasLoad) allOk = check("in_PV", r.P_load) && allOk;

  allOk = check("in_P0", r.P0) && allOk;

  allOk = check("in_RT", r.RT) && allOk;



  const typ = document.getElementById("nature");

  const okTyp = typ && typ.value === r.leiter_typ;

  if (typ) {

    typ.classList.toggle("ok", okTyp);

    typ.classList.toggle("bad", !okTyp);

    totalCount += 1;
    if (okTyp) okCount += 1;
  }

  allOk = allOk && okTyp;



  document.getElementById("check-status").textContent = allOk ? tr("ok") : tr("bad");
  if (totalCount > 0) {
    const percent = Math.round((okCount / totalCount) * 100);
    updateProgress("leiter", String(c.seed), percent);
  }

}



function renderAll(c) {

  CURRENT = c;

  renderValues(c);

  renderTasks(c);

  renderInputs(c);

  renderSolution(c);

  clearChecks();

  document.getElementById("nature").value = c.result.leiter_typ;



  const img = document.getElementById("schematic");

  img.src = schematicName(c);

  document.getElementById("schematic-msg").textContent = "";

}



function generate(seedText) {

  setLoadingTitle(true);

  try {

    const c = generateCase(seedText);

    document.getElementById("seed").value = String(c.seed);

    renderAll(c);

  } catch (err) {

    document.getElementById("values").textContent = `${tr("error")}: ${err}`;

  } finally {

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



document.getElementById("lang").value = LANG;

applyLanguageUI();

document.getElementById("lang").addEventListener("change", (e) => {

  LANG = e.target.value;

  localStorage.setItem("lang", LANG);

  applyLanguageUI();

  if (CURRENT) renderAll(CURRENT);

});



document.getElementById("gen-seed").addEventListener("click", () => generate(document.getElementById("seed").value));

document.getElementById("gen-random").addEventListener("click", () => generate(""));

document.getElementById("check").addEventListener("click", checkAll);

hookEnterCheck(checkAll);



generate("");

