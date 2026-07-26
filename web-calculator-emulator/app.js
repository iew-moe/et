const I18N = {
  de: {
    empty: 'Eingabe über Tasten oder Tastatur',
    syntax: 'Syntaxfehler',
    math: 'Mathematischer Fehler',
    mode: 'Nur im Komplex-Modus verfügbar',
    ok: 'Berechnet',
    deg: 'DEG',
    rad: 'RAD',
    noHistory: 'Noch keine Rechnung.',
    cursor: 'Cursormodus',
    pageTitle: `Taschenrechner`,
    backToOverview: `Zur Übungsübersicht`,
    languageLabel: `Sprache:`,
    calculatorAria: `Taschenrechner`,
    modeStackAria: `Rechen-, Winkel- und Ergebnisformat`,
    cursorPadAria: `Cursortasten`,
    olderCalculationAria: `Ältere Rechnung`,
    cursorLeftAria: `Cursor nach links`,
    cursorRightAria: `Cursor nach rechts`,
    newerCalculationAria: `Neuere Rechnung`,
    functionKeysAria: `Funktions- und Komplexzahlentasten`,
    imaginaryUnitAria: `Imaginäre Einheit i`,
    polarAngleAria: `Polarwinkel`,
    degreeAria: `Grad`,
    magnitudeAria: `Betrag`,
    argumentAria: `Argument oder Phase`,
    conjugateAria: `Konjugierte komplexe Zahl`,
    realPartAria: `Realteil`,
    imaginaryPartAria: `Imaginärteil`,
    toRectAria: `In Standardform a plus b i umwandeln`,
    toPolarAria: `In Polarform r Winkel theta umwandeln`,
    eulerNumberAria: `Eulersche Zahl e`,
    piAria: `Kreiszahl Pi`,
    powerAria: `Potenz x hoch y`,
    numberKeysAria: `Zahlen- und Rechentasten`,
    helpTitle: `Komplex-Modus für ET1`,
    helpText: `Dieser Teil-Emulator bildet keinen vollständigen wissenschaftlichen Rechner nach. Er trainiert die Bedienlogik für komplexe Zahlen: Eingabe der imaginären Einheit mit <code>i</code>, Polarform mit <code>∠</code>, Winkelmaß und Ergebnisformat.`,
    sourceIntro: `Quellen zur Bedienlogik: Hersteller-Kurzanleitung und Supportdokumentation zur Komplex-Anwendung. Links stehen unten.`,
    examplesTitle: `Beispiele`,
    exampleRect: `2+3i → kartesisch`,
    examplePolar: `5∠30 → Polarwert im Gradmaß`,
    exampleMultiply: `Multiplikation komplexer Zahlen`,
    exampleArgument: `Argument im Gradmaß bestimmen`,
    exampleMagnitude: `Betrag bestimmen`,
    exampleDivision: `Division komplexer Zahlen`,
    exampleEuler: `Eulerform 3·e<sup>−j·90°</sup>`,
    keyboardTitle: `Bedienung mit Tastatur`,
    keyboardText1: `Zahlen und <code>+ - * / ^ ( )</code> direkt eingeben. Die Tastatur akzeptiert <code>i</code> und <code>j</code> für die imaginäre Einheit; angezeigt wird einheitlich <code>i</code>. <code>e</code> steht für die Eulersche Zahl, <code>E</code> für <code>×10<sup>x</sup></code> und <code>°</code> für einen Gradwert, <code>Ans</code> oder <code>ANS</code> für das letzte Ergebnis, <code>@</code> oder <code>&lt;</code> für <code>∠</code>, <code>Enter</code> für EXE, <code>Backspace</code> für DEL und <code>Esc</code> für AC.`,
    keyboardText2: `Mit <code>↑</code>/<code>↓</code> frühere Rechnungen aufrufen und mit <code>←</code>/<code>→</code> den Ausdruck bearbeiten. Das letzte Ergebnis steht für Folgerechnungen als <code>Ans</code> bereit.`,
    historyTitle: `Verlauf`,
    manualTitle: `Hinweise aus der Anleitung`,
    manualMode: `Mit <code>Normal</code> und <code>Komplex</code> wird zwischen reellen und komplexen Berechnungen gewechselt.`,
    manualModeError: `Im Normalmodus erzeugen <code>i</code>, Polarform und komplexe Funktionen einen Modusfehler.`,
    manualApplication: `Beim Referenzrechner ist „Komplexe Zahlen“ ein eigener Anwendungsmodus.`,
    manualInput: `Komplexe Zahlen können als <code>a+bi</code> oder <code>r∠θ</code> eingegeben werden.`,
    manualCommands: `Direkte Befehle: Betrag, Argument, Konjugierte, Realteil, Imaginärteil sowie Umwandlung in Polar- und Standardform.`,
    manualAngle: `Das Winkelmaß wird im Setup zwischen Gradmaß und Bogenmaß umgestellt.`,
    manualDefaultFormat: `Die Setup-Umschaltung <code>a+bi / r∠θ</code> bestimmt das reguläre Ergebnisformat.`,
    manualOneShot: `Die schwarzen Tasten <code>→a+bi</code> und <code>→r∠θ</code> wandeln nur das aktuelle beziehungsweise nächste Ergebnis um und ändern die Setup-Einstellung nicht.`,
    manualCursor: `Die Cursortasten blättern durch den Rechnungsverlauf und öffnen Ausdrücke zur Bearbeitung; Ergebnisse werden über <code>Ans</code> weiterverwendet.`,
    sourceQuickGuide: `Referenz-Kurzanleitung (PDF)`,
    sourceArticle: `Hersteller-Fachbeitrag: Komplexe Zahlen (PDF)`,
    sourceComplexDocs: `Referenzdokumentation: Komplexe Zahlen`,
    sourceSettingsDocs: `Referenzdokumentation: Winkelmaß und Ergebnisformat`,
  },
  en: {
    empty: 'Enter with keys or keyboard',
    syntax: 'Syntax error',
    math: 'Math error',
    mode: 'Only available in complex mode',
    ok: 'Calculated',
    deg: 'DEG',
    rad: 'RAD',
    noHistory: 'No calculation yet.',
    cursor: 'Cursor mode',
    pageTitle: `Calculator`,
    backToOverview: `Back to exercise overview`,
    languageLabel: `Language:`,
    calculatorAria: `Calculator`,
    modeStackAria: `Calculation mode, angle unit, and result format`,
    cursorPadAria: `Cursor keys`,
    olderCalculationAria: `Older calculation`,
    cursorLeftAria: `Move cursor left`,
    cursorRightAria: `Move cursor right`,
    newerCalculationAria: `Newer calculation`,
    functionKeysAria: `Function and complex-number keys`,
    imaginaryUnitAria: `Imaginary unit i`,
    polarAngleAria: `Polar angle`,
    degreeAria: `Degrees`,
    magnitudeAria: `Magnitude`,
    argumentAria: `Argument or phase`,
    conjugateAria: `Complex conjugate`,
    realPartAria: `Real part`,
    imaginaryPartAria: `Imaginary part`,
    toRectAria: `Convert to rectangular form a plus b i`,
    toPolarAria: `Convert to polar form r angle theta`,
    eulerNumberAria: `Euler's number e`,
    piAria: `Number pi`,
    powerAria: `Raise x to the power y`,
    numberKeysAria: `Number and arithmetic keys`,
    helpTitle: `Complex mode for ET1`,
    helpText: `This partial emulator does not reproduce a complete scientific calculator. It provides practice with complex-number operations: entering the imaginary unit with <code>i</code>, polar form with <code>∠</code>, angle units, and result formats.`,
    sourceIntro: `Sources for the operating logic: the manufacturer's quick guide and support documentation for complex-number calculations. Links are provided below.`,
    examplesTitle: `Examples`,
    exampleRect: `2+3i → rectangular form`,
    examplePolar: `5∠30 → polar value in degrees`,
    exampleMultiply: `Multiply complex numbers`,
    exampleArgument: `Determine the argument in degrees`,
    exampleMagnitude: `Determine the magnitude`,
    exampleDivision: `Divide complex numbers`,
    exampleEuler: `Euler form 3·e<sup>−j·90°</sup>`,
    keyboardTitle: `Keyboard controls`,
    keyboardText1: `Enter numbers and <code>+ - * / ^ ( )</code> directly. The keyboard accepts <code>i</code> and <code>j</code> for the imaginary unit; the display always uses <code>i</code>. Use <code>e</code> for Euler's number, <code>E</code> for <code>×10<sup>x</sup></code>, <code>°</code> for a value in degrees, <code>Ans</code> or <code>ANS</code> for the previous result, <code>@</code> or <code>&lt;</code> for <code>∠</code>, <code>Enter</code> for EXE, <code>Backspace</code> for DEL, and <code>Esc</code> for AC.`,
    keyboardText2: `Use <code>↑</code>/<code>↓</code> to recall previous calculations and <code>←</code>/<code>→</code> to edit an expression. The previous result is available as <code>Ans</code> for subsequent calculations.`,
    historyTitle: `History`,
    manualTitle: `Manual notes`,
    manualMode: `Use <code>Normal</code> and <code>Complex</code> to switch between real and complex calculations.`,
    manualModeError: `In Normal mode, <code>i</code>, polar form, and complex functions produce a mode error.`,
    manualApplication: `On the reference calculator, “Complex” is a separate calculation mode.`,
    manualInput: `Complex numbers can be entered as <code>a+bi</code> or <code>r∠θ</code>.`,
    manualCommands: `Direct commands are available for magnitude, argument, conjugate, real part, imaginary part, and conversion to polar or rectangular form.`,
    manualAngle: `The angle unit can be switched between degrees and radians in the settings.`,
    manualDefaultFormat: `The <code>a+bi / r∠θ</code> setting determines the default result format.`,
    manualOneShot: `The black <code>→a+bi</code> and <code>→r∠θ</code> keys convert only the current or next result and do not change the default setting.`,
    manualCursor: `The cursor keys browse the calculation history and open expressions for editing; use <code>Ans</code> to reuse results.`,
    sourceQuickGuide: `Reference quick guide (PDF, German)`,
    sourceArticle: `Manufacturer article: Complex numbers (PDF, German)`,
    sourceComplexDocs: `Reference documentation: Complex numbers (German)`,
    sourceSettingsDocs: `Reference documentation: Angle unit and result format (German)`,
  },
};

let LANG = localStorage.getItem('lang') || 'de';
if (!I18N[LANG]) LANG = 'de';

const state = {
  expr: '',
  justEvaluated: false,
  calculatorMode: localStorage.getItem('fx991_calculator_mode') || 'complex',
  angleMode: localStorage.getItem('fx991_angle') || 'deg',
  resultFormat: localStorage.getItem('fx991_format') || 'rect',
  oneShotResultFormat: null,
  lastResultFormat: null,
  ans: { re: 0, im: 0 },
  lastResult: null,
  history: [],
  historyIndex: null,
  cursorMode: false,
  cursorPosition: 0,
};

function tr(key) {
  return (I18N[LANG] && I18N[LANG][key]) || I18N.de[key] || key;
}

function c(re, im = 0) {
  return { re, im };
}

class ModeError extends Error {
  constructor(message = 'Complex mode required') {
    super(message);
    this.name = 'ModeError';
  }
}

function add(a, b) { return c(a.re + b.re, a.im + b.im); }
function sub(a, b) { return c(a.re - b.re, a.im - b.im); }
function neg(a) { return c(-a.re, -a.im); }
function mul(a, b) { return c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); }
function div(a, b) {
  const den = b.re * b.re + b.im * b.im;
  if (den === 0) throw new Error('Division by zero');
  return c((a.re * b.re + a.im * b.im) / den, (a.im * b.re - a.re * b.im) / den);
}
function absC(a) { return Math.hypot(a.re, a.im); }
function argC(a) { return Math.atan2(a.im, a.re); }
function conj(a) { return c(a.re, -a.im); }
function expC(a) {
  const scale = Math.exp(a.re);
  return c(scale * Math.cos(a.im), scale * Math.sin(a.im));
}
function powC(a, b) {
  const magnitude = absC(a);
  if (magnitude === 0) {
    if (Math.abs(b.im) < 1e-12 && b.re > 0) return c(0);
    throw new Error('Invalid power');
  }
  const logA = c(Math.log(magnitude), argC(a));
  return expC(mul(b, logA));
}

function angleToRad(x) {
  return state.angleMode === 'deg' ? x * Math.PI / 180 : x;
}

function angleFromRad(x) {
  return state.angleMode === 'deg' ? x * 180 / Math.PI : x;
}

function polar(r, theta) {
  const rad = angleToRad(theta);
  return c(r * Math.cos(rad), r * Math.sin(rad));
}

function cleanSmall(x) {
  return Math.abs(x) < 1e-12 ? 0 : x;
}

const DISPLAY_SIGNIFICANT_DIGITS = 6;

function fmtNumber(x, significantDigits = DISPLAY_SIGNIFICANT_DIGITS) {
  const y = cleanSmall(x);
  if (!Number.isFinite(y)) return 'Error';
  if (Object.is(y, -0)) return '0';
  const abs = Math.abs(y);
  let s;
  if (abs !== 0 && (abs >= 1e10 || abs < 1e-6)) {
    s = y.toExponential(significantDigits - 1);
  } else {
    s = Number(y.toPrecision(significantDigits)).toString();
  }
  return s
    .replace(/(\.\d*?[1-9])0+(?=[eE]|$)/, '$1')
    .replace(/\.0+(?=[eE]|$)/, '')
    .replace('e+', 'E')
    .replace('e', 'E');
}

function formatRect(z) {
  const re = cleanSmall(z.re);
  const im = cleanSmall(z.im);
  if (im === 0) return fmtNumber(re);
  if (re === 0) return `${fmtNumber(im)}i`;
  const sign = im >= 0 ? '+' : '-';
  return `${fmtNumber(re)} ${sign} ${fmtNumber(Math.abs(im))}i`;
}

function formatPolar(z) {
  const r = absC(z);
  const theta = angleFromRad(argC(z));
  return `${fmtNumber(r)}∠${fmtNumber(theta)}${state.angleMode === 'deg' ? '°' : ''}`;
}

function formatResult(z, format = state.lastResultFormat || state.resultFormat) {
  if (state.calculatorMode === 'normal') return fmtNumber(z.re);
  return format === 'polar' ? formatPolar(z) : formatRect(z);
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

function formatExprText(expr) {
  return escapeHtml(expr)
    .replaceAll('*', '×')
    .replaceAll('/', '÷')
    .replaceAll('pi', 'π')
    .replaceAll('Ans', 'Ans')
    .replaceAll('Abs', '|')
    .replaceAll('Conjg', 'Conjg')
    .replaceAll('Arg', 'Arg')
    .replace(/(^|[^A-Za-z])j(?=$|[^A-Za-z])/gi, '$1i');
}

function exprHtml(expr) {
  if (!expr) return `<span class="muted">${tr('empty')}</span>`;
  return formatExprText(expr);
}

function editableExprHtml(expr) {
  let html;
  if (!state.cursorMode) {
    html = exprHtml(expr);
  } else {
    const position = Math.max(0, Math.min(state.cursorPosition, expr.length));
    const before = formatExprText(expr.slice(0, position));
    const after = formatExprText(expr.slice(position));
    html = `${before}<span class="input-cursor" aria-hidden="true"></span>${after}`;
  }

  if (state.oneShotResultFormat) {
    const command = state.oneShotResultFormat === 'polar' ? '→r∠θ' : '→a+bi';
    html += `<span class="output-command">${command}</span>`;
  }
  return html;
}

function resultTex(z, format = state.lastResultFormat || state.resultFormat) {
  if (!z) return '';
  if (state.calculatorMode === 'normal') return `\\(${fmtNumber(z.re)}\\)`;
  if (format === 'polar') {
    const r = fmtNumber(absC(z));
    const theta = fmtNumber(angleFromRad(argC(z)));
    return `\\(${r}\\angle ${theta}${state.angleMode === 'deg' ? '^{\\circ}' : ''}\\)`;
  }
  const re = cleanSmall(z.re);
  const im = cleanSmall(z.im);
  if (im === 0) return `\\(${fmtNumber(re)}\\)`;
  if (re === 0) return `\\(${fmtNumber(im)}i\\)`;
  const sign = im >= 0 ? '+' : '-';
  return `\\(${fmtNumber(re)} ${sign} ${fmtNumber(Math.abs(im))}i\\)`;
}

function tokenize(input) {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const start = i;
      i += 1;
      while (i < input.length && /[0-9.]/.test(input[i])) i += 1;
      if (input[i] === 'E') {
        i += 1;
        if (input[i] === '+' || input[i] === '-') i += 1;
        while (i < input.length && /[0-9]/.test(input[i])) i += 1;
      }
      const raw = input.slice(start, i);
      const value = Number(raw);
      if (!Number.isFinite(value)) throw new Error('Bad number');
      tokens.push({ type: 'num', value });
      continue;
    }
    if ('+-*/()∠°'.includes(ch)) {
      tokens.push({ type: ch });
      i += 1;
      continue;
    }
    if (ch === '^') {
      tokens.push({ type: '^' });
      i += 1;
      continue;
    }
    if (input.slice(i, i + 4) === 'Conj') {
      tokens.push({ type: 'func', value: 'Conjg' });
      i += input.slice(i, i + 5) === 'Conjg' ? 5 : 4;
      continue;
    }
    if (input.slice(i, i + 3) === 'Abs') {
      tokens.push({ type: 'func', value: 'Abs' });
      i += 3;
      continue;
    }
    if (input.slice(i, i + 3) === 'Arg') {
      tokens.push({ type: 'func', value: 'Arg' });
      i += 3;
      continue;
    }
    if (input.slice(i, i + 2) === 'Re') {
      tokens.push({ type: 'func', value: 'Re' });
      i += 2;
      continue;
    }
    if (input.slice(i, i + 2) === 'Im') {
      tokens.push({ type: 'func', value: 'Im' });
      i += 2;
      continue;
    }
    if (input.slice(i, i + 3).toLowerCase() === 'ans') {
      tokens.push({ type: 'ans' });
      i += 3;
      continue;
    }
    if (ch === 'π') {
      tokens.push({ type: 'num', value: Math.PI });
      i += 1;
      continue;
    }
    if (input.slice(i, i + 2).toLowerCase() === 'pi') {
      tokens.push({ type: 'num', value: Math.PI });
      i += 2;
      continue;
    }
    if (ch === 'e') {
      tokens.push({ type: 'num', value: Math.E });
      i += 1;
      continue;
    }
    if (ch.toLowerCase() === 'i' || ch.toLowerCase() === 'j') {
      tokens.push({ type: 'imag' });
      i += 1;
      continue;
    }
    throw new Error(`Unknown token ${ch}`);
  }
  return tokens;
}

function Parser(tokens) {
  this.tokens = tokens;
  this.pos = 0;
}

Parser.prototype.peek = function peek() {
  return this.tokens[this.pos] || null;
};

Parser.prototype.take = function take(type) {
  const token = this.peek();
  if (token && token.type === type) {
    this.pos += 1;
    return token;
  }
  return null;
};

Parser.prototype.must = function must(type) {
  const token = this.take(type);
  if (!token) throw new Error(`Expected ${type}`);
  return token;
};

Parser.prototype.parse = function parse() {
  const value = this.parseAdd();
  if (this.peek()) throw new Error('Unexpected input');
  return value;
};

Parser.prototype.parseAdd = function parseAdd() {
  let left = this.parseMul();
  while (this.peek() && (this.peek().type === '+' || this.peek().type === '-')) {
    const op = this.peek().type;
    this.pos += 1;
    const right = this.parseMul();
    left = op === '+' ? add(left, right) : sub(left, right);
  }
  return left;
};

Parser.prototype.startsPrimary = function startsPrimary(token) {
  return token && ['num', 'imag', 'ans', 'func', '('].includes(token.type);
};

Parser.prototype.parseMul = function parseMul() {
  let left = this.parsePolar();
  while (this.peek()) {
    const token = this.peek();
    if (token.type === '*' || token.type === '/') {
      this.pos += 1;
      const right = this.parsePolar();
      left = token.type === '*' ? mul(left, right) : div(left, right);
    } else if (this.startsPrimary(token)) {
      const right = this.parsePolar();
      left = mul(left, right);
    } else {
      break;
    }
  }
  return left;
};

Parser.prototype.parsePolar = function parsePolar() {
  let left = this.parseUnary();
  while (this.take('∠')) {
    const right = this.parseUnary();
    if (Math.abs(left.im) > 1e-12 || Math.abs(right.im) > 1e-12) {
      throw new Error('Polar parts must be real');
    }
    left = polar(left.re, right.re);
  }
  return left;
};

Parser.prototype.parseUnary = function parseUnary() {
  if (this.take('+')) return this.parseUnary();
  if (this.take('-')) return neg(this.parseUnary());
  return this.parsePower();
};

Parser.prototype.parsePower = function parsePower() {
  let value = this.parsePostfix();
  if (this.take('^')) {
    value = powC(value, this.parseUnary());
  }
  return value;
};

Parser.prototype.parsePostfix = function parsePostfix() {
  let value = this.parsePrimary();
  while (this.take('°')) {
    if (Math.abs(value.im) > 1e-12) throw new Error('Degree value must be real');
    value = c(value.re * Math.PI / 180);
  }
  return value;
};

Parser.prototype.parsePrimary = function parsePrimary() {
  const token = this.peek();
  if (!token) throw new Error('Missing value');
  if (token.type === 'num') {
    this.pos += 1;
    return c(token.value);
  }
  if (token.type === 'imag') {
    this.pos += 1;
    return c(0, 1);
  }
  if (token.type === 'ans') {
    this.pos += 1;
    return state.ans;
  }
  if (token.type === '(') {
    this.pos += 1;
    const value = this.parseAdd();
    this.must(')');
    return value;
  }
  if (token.type === 'func') {
    this.pos += 1;
    this.must('(');
    const value = this.parseAdd();
    this.must(')');
    if (token.value === 'Abs') return c(absC(value));
    if (token.value === 'Arg') return c(angleFromRad(argC(value)));
    if (token.value === 'Conjg') return conj(value);
    if (token.value === 'Re') return c(value.re);
    if (token.value === 'Im') return c(value.im);
  }
  throw new Error('Bad expression');
};

function evaluate(expr) {
  const tokens = tokenize(expr);
  if (state.calculatorMode === 'normal') {
    const hasComplexSyntax = tokens.some((token) =>
      token.type === 'imag'
      || token.type === '∠'
      || (token.type === 'func' && ['Arg', 'Conjg', 'Re', 'Im'].includes(token.value))
      || (token.type === 'ans' && Math.abs(state.ans.im) > 1e-12));
    if (hasComplexSyntax) throw new ModeError();
  }
  const result = new Parser(tokens).parse();
  if (state.calculatorMode === 'normal' && Math.abs(result.im) > 1e-12) {
    throw new ModeError();
  }
  return result;
}

function updateModeButtons() {
  const calculatorToggle = document.getElementById('calculator-mode-toggle');
  calculatorToggle.querySelector('[data-option="normal"]').classList.toggle(
    'selected', state.calculatorMode === 'normal');
  calculatorToggle.querySelector('[data-option="complex"]').classList.toggle(
    'selected', state.calculatorMode === 'complex');
  calculatorToggle.setAttribute('aria-pressed', String(state.calculatorMode === 'complex'));
  calculatorToggle.setAttribute(
    'aria-label',
    LANG === 'de'
      ? `Rechenmodus umschalten. Aktuell: ${state.calculatorMode === 'normal' ? 'Normal' : 'Komplex'}`
      : `Switch calculation mode. Current: ${state.calculatorMode === 'normal' ? 'Normal' : 'Complex'}`,
  );

  const angleToggle = document.getElementById('angle-mode-toggle');
  angleToggle.querySelector('[data-option="deg"]').classList.toggle(
    'selected', state.angleMode === 'deg');
  angleToggle.querySelector('[data-option="rad"]').classList.toggle(
    'selected', state.angleMode === 'rad');
  angleToggle.setAttribute('aria-pressed', String(state.angleMode === 'rad'));
  angleToggle.setAttribute(
    'aria-label',
    LANG === 'de'
      ? `Winkelmodus umschalten. Aktuell: ${state.angleMode === 'deg' ? 'Gradmaß' : 'Bogenmaß'}`
      : `Switch angle mode. Current: ${state.angleMode === 'deg' ? 'degrees' : 'radians'}`,
  );

  const resultFormatToggle = document.getElementById('result-format-toggle');
  resultFormatToggle.querySelector('[data-option="rect"]').classList.toggle(
    'selected', state.resultFormat === 'rect');
  resultFormatToggle.querySelector('[data-option="polar"]').classList.toggle(
    'selected', state.resultFormat === 'polar');
  resultFormatToggle.setAttribute('aria-pressed', String(state.resultFormat === 'polar'));
  resultFormatToggle.setAttribute(
    'aria-label',
    LANG === 'de'
      ? `Reguläres Ergebnisformat umschalten. Aktuell: ${state.resultFormat === 'rect' ? 'a plus b i' : 'r Winkel theta'}`
      : `Switch default result format. Current: ${state.resultFormat === 'rect' ? 'a plus b i' : 'r angle theta'}`,
  );
  document.getElementById('angle-indicator').textContent = state.angleMode === 'deg' ? tr('deg') : tr('rad');
  document.getElementById('calculator-mode-indicator').textContent =
    state.calculatorMode === 'normal' ? 'NORMAL' : 'COMPLEX';
  document.getElementById('format-indicator').textContent = state.calculatorMode === 'normal'
    ? 'REAL'
    : (state.resultFormat === 'rect' ? 'a+bi' : 'r∠θ');
}

function render() {
  document.getElementById('input-display').innerHTML = editableExprHtml(state.expr);
  const resultDisplay = document.getElementById('result-display');
  const resultText = state.lastResult ? formatResult(state.lastResult) : '';
  resultDisplay.innerHTML = state.lastResult ? resultTex(state.lastResult) : '';
  resultDisplay.classList.toggle('compact', resultText.length > 20 && resultText.length <= 28);
  resultDisplay.classList.toggle('very-compact', resultText.length > 28);
  document.getElementById('message-display').textContent = state.cursorMode
    ? tr('cursor')
    : (state.lastResult ? tr('ok') : tr('empty'));
  document.getElementById('cursor-mode-indicator').hidden = !state.cursorMode;
  updateModeButtons();
  renderHistory();
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([document.getElementById('result-display')]).catch(() => {});
  }
}

function renderHistory() {
  const el = document.getElementById('history');
  if (!state.history.length) {
    el.textContent = tr('noHistory');
    return;
  }
  el.classList.remove('muted');
  el.innerHTML = state.history.slice(-8).reverse().map((item) => `
    <div class="history-item">
      <div>${exprHtml(item.expr)}</div>
      <strong>= ${escapeHtml(item.result)}</strong>
    </div>
  `).join('');
}

function insertText(text) {
  if (text === 'j' || text === 'J') text = 'i';
  if (state.justEvaluated) {
    const continuesWithAns = ['+', '-', '*', '/', '^', '^2', '^-1'].includes(text);
    state.expr = continuesWithAns ? `Ans${text}` : text;
    state.justEvaluated = false;
    state.cursorMode = false;
    state.historyIndex = null;
    state.cursorPosition = state.expr.length;
    state.oneShotResultFormat = null;
  } else if (state.cursorMode) {
    state.expr = `${state.expr.slice(0, state.cursorPosition)}${text}${state.expr.slice(state.cursorPosition)}`;
    state.cursorPosition += text.length;
    state.historyIndex = null;
  } else {
    state.expr += text;
    state.cursorPosition = state.expr.length;
  }
  state.lastResult = null;
  state.lastResultFormat = null;
  render();
}

function clearAll() {
  state.expr = '';
  state.lastResult = null;
  state.lastResultFormat = null;
  state.oneShotResultFormat = null;
  state.justEvaluated = false;
  state.cursorMode = false;
  state.cursorPosition = 0;
  state.historyIndex = null;
  render();
}

function backspace() {
  state.justEvaluated = false;
  if (state.oneShotResultFormat) {
    state.oneShotResultFormat = null;
    render();
    return;
  }
  const position = state.cursorMode ? state.cursorPosition : state.expr.length;
  if (position === 0) return;
  const beforeCursor = state.expr.slice(0, position);
  const names = ['Conjg(', 'Abs(', 'Arg(', 'Re(', 'Im(', '^-1', '^2'];
  let deleteLength = beforeCursor.slice(-3).toLowerCase() === 'ans' ? 3 : 1;
  for (const name of names) {
    if (beforeCursor.endsWith(name)) {
      deleteLength = name.length;
      break;
    }
  }
  state.expr = `${state.expr.slice(0, position - deleteLength)}${state.expr.slice(position)}`;
  state.cursorPosition = position - deleteLength;
  state.lastResult = null;
  state.lastResultFormat = null;
  state.historyIndex = null;
  render();
}

function toggleSign() {
  if (state.justEvaluated) {
    state.expr = '-(Ans)';
    state.lastResult = null;
    state.lastResultFormat = null;
    state.justEvaluated = false;
    state.cursorMode = false;
    state.cursorPosition = state.expr.length;
    state.historyIndex = null;
    render();
    return;
  }
  if (!state.expr) {
    insertText('-');
    return;
  }
  state.expr = `-(${state.expr})`;
  state.cursorPosition = state.expr.length;
  state.historyIndex = null;
  state.lastResult = null;
  state.lastResultFormat = null;
  render();
}

function loadHistoryEntry(index) {
  const item = state.history[index];
  if (!item) return;
  state.expr = item.expr;
  state.lastResult = item.value ? c(item.value.re, item.value.im) : null;
  state.lastResultFormat = item.format || state.resultFormat;
  state.oneShotResultFormat = null;
  state.justEvaluated = false;
  state.cursorMode = true;
  state.cursorPosition = state.expr.length;
  state.historyIndex = index;
  render();
}

function moveCursor(direction) {
  if (direction === 'up' || direction === 'down') {
    if (!state.history.length) {
      if (state.expr) {
        state.cursorMode = true;
        state.cursorPosition = state.expr.length;
        state.justEvaluated = false;
        render();
      }
      return;
    }

    const newestIndex = state.history.length - 1;
    let targetIndex;
    if (state.historyIndex === null) {
      const newestIsDisplayed = state.justEvaluated
        && state.expr === state.history[newestIndex].expr;
      targetIndex = direction === 'up' && newestIsDisplayed && newestIndex > 0
        ? newestIndex - 1
        : newestIndex;
    } else {
      const offset = direction === 'up' ? -1 : 1;
      targetIndex = Math.max(0, Math.min(newestIndex, state.historyIndex + offset));
    }
    loadHistoryEntry(targetIndex);
    return;
  }

  if (!state.expr && state.history.length) {
    loadHistoryEntry(state.history.length - 1);
  } else if (!state.cursorMode) {
    state.cursorMode = true;
    state.cursorPosition = state.expr.length;
    state.historyIndex = null;
    state.justEvaluated = false;
  }

  if (direction === 'left') {
    state.cursorPosition = Math.max(0, state.cursorPosition - 1);
  } else if (direction === 'right') {
    state.cursorPosition = Math.min(state.expr.length, state.cursorPosition + 1);
  }
  render();
}

function setAngle(mode) {
  state.angleMode = mode;
  localStorage.setItem('fx991_angle', mode);
  render();
}

function setCalculatorMode(mode) {
  state.calculatorMode = mode;
  state.lastResult = null;
  state.lastResultFormat = null;
  state.oneShotResultFormat = null;
  state.justEvaluated = false;
  state.history = [];
  state.historyIndex = null;
  state.cursorMode = false;
  state.cursorPosition = state.expr.length;
  localStorage.setItem('fx991_calculator_mode', mode);
  render();
}

function setFormat(format) {
  state.resultFormat = format;
  state.oneShotResultFormat = null;
  localStorage.setItem('fx991_format', format);
  render();
}

function applyOutputFormatCommand(format) {
  if (state.calculatorMode !== 'complex') {
    document.getElementById('message-display').textContent = tr('mode');
    return;
  }
  if (state.lastResult && state.justEvaluated) {
    state.lastResultFormat = format;
    const latest = state.history[state.history.length - 1];
    if (latest && latest.expr === state.expr) {
      latest.format = format;
      latest.result = formatResult(state.lastResult, format);
    }
    render();
    return;
  }
  if (!state.expr.trim()) return;
  state.oneShotResultFormat = format;
  render();
}

function runEval() {
  if (!state.expr.trim()) return;
  try {
    const result = evaluate(state.expr);
    const outputFormat = state.oneShotResultFormat || state.resultFormat;
    state.ans = result;
    state.lastResult = result;
    state.lastResultFormat = outputFormat;
    state.oneShotResultFormat = null;
    state.justEvaluated = true;
    state.cursorMode = false;
    state.cursorPosition = state.expr.length;
    state.historyIndex = null;
    state.history.push({
      expr: state.expr,
      value: c(result.re, result.im),
      format: outputFormat,
      result: formatResult(result, outputFormat),
    });
    if (state.history.length > 50) state.history.shift();
    document.getElementById('message-display').textContent = tr('ok');
    render();
  } catch (err) {
    state.lastResult = null;
    state.justEvaluated = false;
    document.getElementById('result-display').textContent = 'Math ERROR';
    document.getElementById('message-display').textContent =
      err instanceof ModeError
        ? tr('mode')
        : (err && /Division|Polar|Degree/.test(err.message) ? tr('math') : tr('syntax'));
  }
}

function handleAction(action, value) {
  if (action === 'insert') insertText(value);
  if (action === 'clear') clearAll();
  if (action === 'back') backspace();
  if (action === 'toggle-sign') toggleSign();
  if (action === 'eval') runEval();
  if (action === 'to-format') applyOutputFormatCommand(value);
  if (action === 'cursor') moveCursor(value);
}

function applyLanguage() {
  document.documentElement.lang = LANG;
  document.getElementById('lang').value = LANG;
  document.title = tr('pageTitle');
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = tr(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = tr(element.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    element.setAttribute('aria-label', tr(element.dataset.i18nAria));
  });
  render();
}

document.getElementById('keys').addEventListener('click', (event) => {
  const btn = event.target.closest('button');
  if (!btn) return;
  handleAction(btn.dataset.action, btn.dataset.value);
});

document.getElementById('angle-mode-toggle').addEventListener('click', () => {
  setAngle(state.angleMode === 'deg' ? 'rad' : 'deg');
});

document.getElementById('calculator-mode-toggle').addEventListener('click', () => {
  setCalculatorMode(state.calculatorMode === 'normal' ? 'complex' : 'normal');
});

document.getElementById('result-format-toggle').addEventListener('click', () => {
  setFormat(state.resultFormat === 'rect' ? 'polar' : 'rect');
});

document.querySelectorAll('[data-example]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.dataset.calcMode && btn.dataset.calcMode !== state.calculatorMode) {
      setCalculatorMode(btn.dataset.calcMode);
    }
    if (btn.dataset.angleMode && btn.dataset.angleMode !== state.angleMode) {
      setAngle(btn.dataset.angleMode);
    }
    if (btn.dataset.resultFormat && btn.dataset.resultFormat !== state.resultFormat) {
      setFormat(btn.dataset.resultFormat);
    }
    state.expr = btn.dataset.example;
    state.lastResult = null;
    state.lastResultFormat = null;
    state.oneShotResultFormat = null;
    state.justEvaluated = false;
    state.cursorMode = false;
    state.cursorPosition = state.expr.length;
    state.historyIndex = null;
    render();
  });
});

document.getElementById('lang').addEventListener('change', (event) => {
  LANG = event.target.value === 'en' ? 'en' : 'de';
  localStorage.setItem('lang', LANG);
  applyLanguage();
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  const key = event.key;
  if (key.startsWith('Arrow')) {
    event.preventDefault();
    moveCursor(key.slice(5).toLowerCase());
    return;
  }
  if (/^[0-9]$/.test(key) || ['+', '-', '*', '/', '^', '(', ')', '.', '°'].includes(key)) {
    event.preventDefault();
    insertText(key);
    return;
  }
  if (key === ',') {
    event.preventDefault();
    insertText('.');
    return;
  }
  if (key === 'i' || key === 'I') {
    event.preventDefault();
    insertText('i');
    return;
  }
  if (key === 'j' || key === 'J') {
    event.preventDefault();
    insertText('j');
    return;
  }
  if (key === 'e') {
    event.preventDefault();
    insertText('e');
    return;
  }
  if (key === 'E') {
    event.preventDefault();
    insertText('E');
    return;
  }
  if (/^[ans]$/i.test(key)) {
    event.preventDefault();
    insertText(key);
    return;
  }
  if (key === 'p') {
    event.preventDefault();
    insertText('π');
    return;
  }
  if (key === '@' || key === '<') {
    event.preventDefault();
    insertText('∠');
    return;
  }
  if (key === 'Enter') {
    event.preventDefault();
    runEval();
    return;
  }
  if (key === 'Backspace') {
    event.preventDefault();
    backspace();
    return;
  }
  if (key === 'Escape') {
    event.preventDefault();
    clearAll();
  }
});

applyLanguage();

if (document.documentElement.classList.contains('embed-mode') && window.parent !== window) {
  let reportFrame = 0;
  const reportEmbeddedHeight = () => {
    cancelAnimationFrame(reportFrame);
    reportFrame = requestAnimationFrame(() => {
      const calculator = document.querySelector('.calculator');
      if (!calculator) return;
      const bodyStyle = getComputedStyle(document.body);
      const height = calculator.getBoundingClientRect().bottom
        + (Number.parseFloat(bodyStyle.paddingBottom) || 0);
      window.parent.postMessage({ type: 'et-calculator-height', height: Math.ceil(height) }, '*');
    });
  };

  window.addEventListener('load', reportEmbeddedHeight);
  window.addEventListener('resize', reportEmbeddedHeight);
  if (window.ResizeObserver) {
    new ResizeObserver(reportEmbeddedHeight).observe(document.querySelector('.calculator'));
  }
  reportEmbeddedHeight();
}
