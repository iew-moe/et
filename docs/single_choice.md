# Übung 5: Single-Choice Aufgabensammlung

## Zweck

Klausurnahes Training im Stil der LRT-Prüfungen: Single-Choice-Fragen mit genau einer richtigen Antwort, teils mit der Option „Keine der anderen Antwortmöglichkeiten ist korrekt".

## Aufbau

- `web-single-choice/index.html` — Seite nach dem Muster der übrigen Übungen (kein Schaltbild, daher keine PNGs nötig). Kein `Prüfen`-Button: jede Frage wird **sofort beim Anklicken einer Option ausgewertet**.
- `web-single-choice/app.js` — gesamte Logik inkl. fest eingebautem Fragenpool (`QUESTIONS`, DE/EN) und Themenliste (`TOPICS`).

## Themen-System (Didaktik)

- Der Pool ist in **11 Themen** gegliedert (`TOPICS`): Ohm/Leiter, Temperatur, Reihe/Parallel, Teilerregeln, Netzwerkanalyse/Ersatzquelle, Überlagerungssatz, Blindwiderstand/Impedanz, komplexe Rechnung, Wechselgrößen/Zeiger, Schwingkreis/Frequenzverhalten, Kondensator/Spule.
- Pro Durchgang (Seed) wird **je Thema genau eine Frage** gezogen → 11 Kurzfragen.
- **Ein Thema gilt als erledigt, wenn eine Frage daraus im ersten Versuch richtig beantwortet wurde.** Zwei localStorage-Strukturen:
  - `exerciseProgress.single_choice[topicId] = 0/100` — für den Fortschrittsring der Startseite (Anteil erledigter Themen); alle Themen werden beim Laden mit 0 initialisiert (Migration entfernt alte seed-basierte Schlüssel).
  - `singleChoiceTopicCounts[topicId] = n` — **Zähler**, wie oft im Thema im ersten Versuch richtig gelöst wurde (Gamification).
- Das Themen-Panel zeigt pro Thema Emoji + Zähler: ○ (0) · ✅ (1×) · 🌟 (2×) · 🚀 (ab 3×) · 🏆 (ab 5×) · 🦄 (ab 8×), plus Legende.
- **„Problemfälle" (Übungsbedarf):** `singleChoiceTopicFails[topicId]` zählt Fragen, die im **ersten Versuch falsch** beantwortet wurden — angezeigt mit eigenen Emojis: 😅 (1×) · 🙈 (2×) · 🌧️ (ab 3×) · 🧯 (ab 5×) · 🆘 (ab 8×), zweite Legendenzeile.
- **Badges an den Fragen:** Jede Frage trägt oben rechts ein kleines Themen-Badge `Thema · ✅×n 😅×f` (nur vorhandene Zähler), das beim Laden/Generieren und nach jeder Antwort aktualisiert wird (`updateQuestionBadges()`).

## Auswertungslogik pro Frage

- **Richtig angeklickt** → Frage wird gesperrt, grün markiert, und direkt unter der Frage erscheint die richtige Antwort mit Lösungsweg/Erklärung. War es der erste Versuch: Thema wird als erledigt markiert; sonst Hinweis, dass es nicht als erster Versuch zählt.
- **Falsch angeklickt** → Option rot markiert, weitere Versuche bleiben möglich. Der KI-Tutor wird geöffnet (per Klick auf dessen Toggle-Button, **ohne Änderung an `shared/tutor.js`**); beim ersten Fehlversuch wird zusätzlich eine Hilfebitte (Frage + gewählte Option) in das Eingabefeld **vorbefüllt** — abgesendet wird von den Studierenden selbst.
- `Musterlösung anzeigen` deckt alle noch unbeantworteten Fragen auf (ohne Wertung, „Aufgedeckt").

## Fragenpool

- **Konzeptfragen:** `{ id, topic, de: {q, opts, expl}, en: {q, opts, expl} }` (feste Texte).
- **Rechenfragen mit Zahlenwert-Varianten:** `{ id, topic, variants: [v1, v2, ...], tpl: { de: (v)=>({q, opts, expl}), en: (v)=>... } }` — der Seed wählt zusätzlich zur Frage eine Variante; die Werte/Einheiten je Variante sind handgeprüft „glatt". Aktuell haben 15 Rechenfragen je 4–5 Varianten (~70 Zahlenkombinationen).
- **Konvention: `opts[0]` bzw. `tpl(...).opts[0]` ist immer die richtige Antwort.** Die Anzeige-Reihenfolge wird seed-basiert permutiert.
- Dezimaltrennzeichen: Datenbasis mit Punkt, deutsche Anzeige per `num()`-Helfer mit Komma.
- **Notation wie in der Formelsammlung:** komplexe Größen/Zeiger unterstrichen (`<u>Z</u><sub>L</sub>`), Indizes als `<sub>`, Amplituden mit Dach (û), Effektivwerte als Großbuchstaben. Fragen/Optionen/Erklärungen dürfen HTML enthalten (für den Tutor werden Tags gestrippt).
- Neue Fragen ans Array anhängen und einem Thema zuordnen; neue Themen zusätzlich in `TOPICS` und in beiden `I18N[..].topics` eintragen.
- Inhaltliche Quelle: `KI_Formelsammlung/Klausurfragen_Pool_SingleChoice.md` (lokal, mit Lösungen und FS-Referenzen).

## Seed-Logik & Wiederholungsvermeidung

- `makeCase(seed)`: mulberry32-RNG wählt je Thema eine Frage+Variante („Kombo") und je Frage eine Options-Permutation.
- **Bereits gelöste Kombos werden vermieden:** Jede richtig beantwortete Aufgabe wird unter `singleChoiceSolvedTasks[id#variante]` gespeichert; bei der Auswahl wird zuerst aus den **ungelösten** Kombos des Themas gezogen (erst wenn alle gelöst sind, aus allen). Dadurch liefert derselbe Seed nach Lernfortschritt bewusst andere Aufgaben/Zahlenwerte.
- **Zähler-Regel:** `singleChoiceTopicCounts` erhöht sich nur bei einer **neuen** Kombo, die im ersten Versuch richtig gelöst wurde. Eine bereits früher gelöste Kombo gibt den Hinweis „bereits gelöst" und keinen weiteren Zähler.
- Sprachumschaltung regeneriert mit demselben Seed (gleiche Fragen, andere Sprache).
- **Adaptive Fragen-Reihenfolge:** Ohne jeden Fortschritt Standard-Themenreihenfolge. Sobald geübt wurde, werden die Themen beim Generieren nach Netto-Score (Belohnungen − Problemfälle) **aufsteigend** sortiert — schwächste/ungeübte Themen oben, am häufigsten richtig gelöste unten; Gleichstände werden seed-zufällig aufgelöst (damit nicht immer dasselbe Thema oben steht). Innerhalb eines Durchgangs bleibt die Reihenfolge stabil.

## Tutor

- `window.getEtTutorContext()` liefert `questions` (inkl. `wrongOptionsTried`, `correctOptionForTutor`, `explanationForTutor`), `activeQuestion` (zuletzt falsch beantwortete Frage), Themenstatus und `topicCounts`.
- Das Öffnen erfolgt rein DOM-seitig (Toggle-Klick + Vorbefüllen des Eingabefelds); **`shared/tutor.js` und der Worker werden von dieser Übung nicht verändert**.
- Offen (wird über VS Code/Codex am Tutor-Projekt gepflegt): Eintrag `single_choice` in `EXERCISE_CONTEXTS` von `worker/tutor-context.js` ergänzen und Worker deployen — Textvorschlag siehe Chat-Übergabe. Ohne den Eintrag nutzt der Tutor den generischen Kontext plus `getEtTutorContext()`-Daten (funktioniert, ist aber ohne die Regel „korrekte Option nicht verraten").
