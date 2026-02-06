# Übung: Elektrischer Leiter

## Ziel
Leiterwiderstand, Stromdichte, Temperaturabhängigkeit und Leistung. Varianten mit Spannungs‑ oder Stromquelle, optionalem Verbraucher‑Widerstand.

## Anforderungen (aus der Umsetzung)
- Geometrievarianten: r, d, quadratisch (Seite), oder A zu dimensionieren.
- Materialparameter: ρ, α (ASCII in UI), L, T0=20 °C, T1 variabel.
- Aufgaben bei T0 (immer), zusätzliche Aufgabe R_L(T1) vor Warm/Kalt‑Frage.
- Varianten:
  - Spannungsquelle + Leiter (+ optional Verbraucher R_V)
  - Stromquelle + Leiter (+ optional Verbraucher R_V)
  - Dimensionierungsaufgabe (A aus Stromdichte)
- Prüfen mit 1 % Toleranz pro Feld, Vorzeichen korrekt.
- i18n (DE/EN), Fortschritt via localStorage.

## Offline (Notebook)
- Notebook: `leiter_exam.ipynb`.
- Schaltplan‑PNG via lcapy (offline); 4 feste Varianten.
- Exportskript: `leiter_export_topoFigs.py` erzeugt die 4 PNGs.
 - lcapy‑Layout: feste Netlisten (Quelle links vertikal, Leiter oben, optional Verbraucher rechts), Strom-/Spannungspfeile aktiv, Knotensymbole aus.

## Online (Web)
- Web‑App: `web-leiter/` (HTML/JS, ohne Pyodide).
- Verwendet vorgerenderte PNGs aus `schematics/leiter_topologies_clean/`.
- Seed bestimmt Aufgaben‑Variante und Werte.
- Vor dem Deploy Exportskript offline ausführen und die 4 PNGs committen.
 - Benötigt online: nur HTML/JS; lcapy/Circuitikz/LaTeX nicht verfügbar.

## Assets/Dateien
- Web: `web-leiter/index.html`, `web-leiter/app.js`.
- Topologien: `schematics/leiter_topologies_clean/leiter_*.png`.

## Hinweise
- PNG‑Darstellung keine LaTeX‑Abhängigkeit online.
- Encoding in HTML/JS muss UTF‑8 (Umlaute).
- Werte/Einheiten werden intern in SI gehalten; Anzeige mit passenden Präfixen.
- Pfeilrichtungen in lcapy folgen Standard‑Konventionen; bei Quellen ggf. Vorzeichen in der Rechnung prüfen.
- Hinweis: Quellströme können bezogen auf extern eingezeichnete Strompfeile eine andere Richtung/Vorzeichenkonvention haben; bei Abgleich stets die interne Zählrichtung verwenden.
- Temperaturabhängigkeit: R(T)=R(T0)*(1+α*(T−T0)).
