# Übung: Reihen‑ und Parallelschaltung

## Ziel
Kombinationen aus R, L oder C (2–4 Elemente) zwischen Klemmen A–B. Gesucht: Ersatzgröße (R_AB, L_AB oder C_AB) abhängig vom Bauteiltyp.

## Anforderungen (aus der Umsetzung)
- Bauteiltyp: rein R oder rein L oder rein C (pro Aufgabe ein Typ).
- Anzahl: 2–4 Elemente.
- Alle seriell/parallel‑Varianten inkl. Mischformen.
- Einheiten mit gleichem Präfix pro Aufgabe (z. B. alle kΩ oder µF).
- Prüfen mit 1 % Toleranz pro Eingabe.
- Schaltplan‑PNG, Klemmen A/B sichtbar.
- i18n (DE/EN), Fortschritt via localStorage.

## Offline (Notebook)
- Notebook: `parallel_series.ipynb`.
- Schaltplan‑PNG via lcapy.
- Exportskript: `parallel_series_export_topos.py` generiert alle Topologie‑PNGs (R/L/C Varianten).
 - lcapy‑Layout: Topologie‑Netlisten pro Variante, Klemmen A/B markiert, Knotensymbole deaktiviert, keine Pfeile nötig.

## Online (Web)
- Web‑App: `web-parallel-series/` (HTML/JS).
- PNGs aus `schematics/parallel_series_topos_clean/`.
- Seed bestimmt Topologie + Werte (kein lcapy online).
- Vor dem Deploy Exportskript offline ausführen und die PNGs committen.
 - Benötigt online: nur HTML/JS; lcapy/Circuitikz/LaTeX nicht verfügbar.

## Assets/Dateien
- Web: `web-parallel-series/index.html`, `web-parallel-series/app.js`.
- Topologien: `schematics/parallel_series_topos_clean/*.png`.

## Hinweise
- Encoding UTF‑8 für Umlaute.
- Online nur PNG, keine LaTeX‑Abhängigkeit.
- Bauteilwerte werden als SI gespeichert und mit einheitlichen Präfixen pro Aufgabe angezeigt.
- Ersatzwerte werden algebraisch per Serien/Parallel‑Regeln berechnet (keine numerische Netzwerkanalyse nötig).
