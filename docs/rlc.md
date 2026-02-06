# Übung: Komplexe Wechselstromrechnung – Zeigerdiagramm (RLC)

## Ziel
Interaktive Übung zur komplexen RLC‑Schaltung (AC). Zufällige Bauteilwerte, Aufgabenstellung, Eingaben, Prüfen mit Toleranz, Anzeige von Zeigerwerten und Phasordiagramm.

## Anforderungen (aus der Umsetzung)
- R, L, C, V, f werden zufällig gewählt; Seed‑basiert reproduzierbar.
- Aufgaben: Z_C, Z_L, kombinierte Impedanz (z. B. Z_par), Gesamtimpedanz Z, |I| und Phase.
- Prüfen mit Toleranz pro Feld (1 %); Vorzeichen muss stimmen.
- Zeigerdiagramm inkl. Spannungs‑ und Stromvektoren, unterschiedliche Farben, Achsen/Skalierung mit „Kästchen“‑Maßstab.
- Ergebnisse/Zeigerwerte tabellarisch (Kartesisch & Polar), inkl. Einheiten.
- UI deutsch/englisch (i18n), Seed‑Eingabe, Generieren‑Buttons, Prüfen‑Button, Fortschritts‑Tracking (localStorage).

## Offline (Notebook)
- Notebook: `rlc_exam_multi.ipynb`.
- Rechenlogik: `rlc_core.py` (Python).
- Phasor‑Plot via matplotlib, Schematik via lcapy (Circuitikz) → PNG.
 - lcapy‑Layout: per vordefinierter Netlist mit Richtungshinweisen (up/down/left/right) und Pfeilen; Knotensymbole aus, Werte/Labels an Bauteilen, Quellenpfeile aktiv.

## Online (Web)
- Web‑App: `web-rlc/` (HTML/JS) + `rlc_core.py` wird via Pyodide geladen.
- Phasor‑PNG wird in Pyodide erzeugt und als Base64 angezeigt.
- Schaltplan‑PNG wird aus `schematics/` geladen (vorgerendert).
- i18n‑Umschaltung (DE/EN), Fortschritt via localStorage.
- Vor dem Deploy müssen die Schaltplan‑PNGs offline mit lcapy erzeugt und mit ins Repo committed werden (Online kein Circuitikz).
 - Benötigt online: Pyodide + matplotlib; lcapy/Circuitikz funktioniert online nicht.

## Assets/Dateien
- Web: `web-rlc/index.html`, `web-rlc/app.js`.
- Core: `rlc_core.py`.
- Schematics: `schematics/*.png`.

## Seed‑Logik
- Seed steuert Bauteilwerte deterministisch; Random‑Button erzeugt neuen Seed.
- Seed ist in UI sichtbar und wird für Fortschritt (Task‑ID) verwendet.

## Hinweise
- Online: kein LaTeX/Circuitikz → nur vorgerenderte PNGs.
- Encoding in HTML/JS muss UTF‑8 sein (Umlaute).
- Bauteilwerte werden als SI‑Werte gespeichert und in der UI mit Präfixen formatiert (m, µ/u, n, k, M, …).
- Pfeilrichtungen in lcapy: Standard‑Konventionen gelten (Spannungspfeil zeigt von „+“ nach „–“ des Bauteils, Strompfeil in Richtung positiver Stromzählrichtung). Bei Vergleich mit LTspice/anderen Tools ggf. Vorzeichen prüfen.
- Hinweis: Quellströme können bezogen auf extern eingezeichnete Strompfeile eine andere Richtung/Vorzeichenkonvention haben; bei Abgleich stets die interne Zählrichtung verwenden.
- Intern wird das RLC‑Netzwerk per komplexer Impedanzen berechnet (Z_R, Z_L=jωL, Z_C=1/(jωC)) und dann algebraisch kombiniert (Seriell/Parallel).
