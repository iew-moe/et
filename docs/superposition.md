# Übung: Überlagerungssatz (mehrere Quellen, R)

## Ziel
Superpositionsaufgabe mit zwei Quellen (U/I) und 3–5 Widerständen. Gesucht ist Spannung oder Strom an einem ausgewählten Widerstand. Teilschaltungen werden visualisiert und separat ausgewertet.

## Anforderungen (aus der Umsetzung)
- Zwei Quellen (jeweils Strom- oder Spannungsquelle), mehrere Widerstände.
- Topologien aus vordefinierten Netlisten (offline gerendert), Seed‑basiert ausgewählt.
- Iteration bei der Topologie‑Generierung, bis Zusatz‑Constraints erfüllt sind (z. B. keine Null‑Beiträge, keine degenerierten Fälle).
- Aufgaben: Teilschaltung 1/2 zeichnen, Teilspannungen/-ströme, Gesamtwert mittels Überlagerung.
- Prüfen mit 1 % Toleranz pro Eingabe; Vorzeichen muss stimmen.
- Ergebnislisten: Gesamt‑ und Teilwerte; Musterlösung am Ende.
- i18n (DE/EN) und Fortschritt via localStorage.

## Offline (Notebook)
- Notebook: `superposition_exam.ipynb`.
- Rechenlogik: `superposition_core.py`.
- Schaltplan‑PNG: lcapy/Circuitikz (offline erzeugt).
- Exportskript: `superposition_export_topoFigs.py` → PNG‑Topologien.
 - lcapy‑Layout: Netlisten aus Topologie‑Generator, Richtungshinweise (up/down/left/right) zur Kollisionsvermeidung; Quellenpfeile aktiv, Beschriftung je nach Aufgabe (Spannung/Strom) angepasst; Knotensymbole deaktiviert.

## Online (Web)
- Web‑App: `web-superposition/` (HTML/JS, ohne Pyodide).
- Nutzt vorgerenderte Topologie‑PNGs.
- Topologieauswahl aus `superposition_topologies_50_clean/schematics/`.
- Seed bestimmt: Topologie + Werte.
- Vor dem Deploy Exportskript offline ausführen und die PNGs committen (Online keine lcapy/LaTeX‑Generierung).
 - Benötigt online: nur HTML/JS; lcapy/Circuitikz/LaTeX nicht verfügbar.

## Assets/Dateien
- Web: `web-superposition/index.html`, `web-superposition/app.js`.
- Core: `superposition_core.py`.
- Topologien: `superposition_topologies_50_clean/schematics/*.png`.

## Seed‑Logik
- Seed wird in einen Topologie‑Index gemappt (Roll‑over), Werte deterministisch generiert.
- Für Online werden nur vorhandene Topologien verwendet.

## Hinweise
- Online nur PNG, kein Circuitikz.
- Encoding/Um­laute nur UTF‑8.
- Quellen‑ und Widerstandswerte werden als SI‑Werte gespeichert; Anzeige mit Präfixen.
- Für Strom/Spannungspfeile gilt lcapy‑Standardrichtung. Bei Vergleich mit handschriftlicher Konvention ggf. Vorzeichen beachten.
- Hinweis: Quellströme können bezogen auf extern eingezeichnete Strompfeile eine andere Richtung/Vorzeichenkonvention haben; bei Abgleich stets die interne Zählrichtung verwenden.
- Berechnung erfolgt per linearer Netzwerklösung (Knoten-/Maschenverfahren in lcapy/Sympy).
