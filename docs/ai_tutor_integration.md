# KI-Tutor für statische Lehr-Webseiten

Stand: 9. August 2026

Diese Anleitung beschreibt die Architektur des ET-KI-Tutors und wie eine andere KI einen vergleichbaren Tutor in ein statisches HTML-Live-Skript integrieren kann. Sie enthält bewusst keine persönlichen Domains, Konto-IDs, API-Schlüssel oder Passwörter und kann in ein öffentliches GitHub-Repository aufgenommen werden.

## Zielbild

Der Tutor soll Studierende bei einer konkreten Aufgabe oder einem Abschnitt des Live-Skripts unterstützen. Er soll zuerst diagnostizieren, wo das Verständnisproblem liegt, dann schrittweise Hinweise geben und die vollständige Lösung erst bei entsprechend hohem Hilfebedarf entwickeln.

Die Architektur besteht aus drei Teilen:

1. **Statisches Frontend:** HTML, CSS und JavaScript, beispielsweise auf GitHub Pages.
2. **Cloudflare Worker:** öffentlich erreichbarer Backend-Endpunkt, der Eingaben prüft, den Systemprompt ergänzt und die Modell-API aufruft.
3. **Anthropic API:** Claude-Modell; der API-Schlüssel ist ausschließlich als verschlüsseltes Worker-Secret gespeichert.

```text
Browser / GitHub Pages
        |
        | POST: Frage + aktueller Seitenkontext + kurzer Chatverlauf
        v
Cloudflare Worker
        |
        | API-Aufruf mit serverseitigem Systemprompt und Secret
        v
Anthropic Messages API
```

Der Browser darf den Anthropic-API-Schlüssel niemals erhalten. GitHub Pages ist statisch und kann ein Secret nicht schützen; deshalb ist der Worker erforderlich.

## Benötigte Konten

- **Anthropic Console/API:** API-Schlüssel und separates API-Guthaben. Ein Claude-App-Abonnement oder Guthaben in der Desktop-App ist nicht automatisch API-Guthaben.
- **Cloudflare:** Hosting und Deployment des Workers über Wrangler.
- **Optional GitHub:** Hosting des statischen Live-Skripts über GitHub Pages.

Offizielle Einstiege:

- Anthropic Console: <https://platform.claude.com/>
- Anthropic API-Dokumentation: <https://docs.anthropic.com/en/api/overview>
- Cloudflare Workers: <https://developers.cloudflare.com/workers/>
- Wrangler: <https://developers.cloudflare.com/workers/wrangler/>
- Cloudflare Secrets: <https://developers.cloudflare.com/workers/configuration/secrets/>

## Bestehende Referenzimplementierung in diesem Repository

Diese Dateien bilden den vorhandenen ET-Tutor:

```text
shared/tutor.js             Chat-Widget, Kontextabruf, Verlauf, MathJax
shared/tutor.css            Größe, Position, responsive Darstellung
worker/tutor-worker.js      CORS, Validierung, Prompt, Anthropic-Aufruf
worker/tutor-context.js     didaktische Regeln und Fachkontext
worker/wrangler.toml        Worker-Name und nicht geheime Konfiguration
web-*/index.html            Konfiguration und Einbindung des Widgets
web-*/app.js                konkreter dynamischer Aufgabenkontext
```

Für ein neues Projekt ist ein **eigener Worker** empfehlenswert. So bleiben Prompt, erlaubte Origin, Deployment und Kostenkontrolle unabhängig von der ET-Übungsseite.

## Datenfluss der vorhandenen Lösung

Das Widget sendet eine POST-Anfrage an den Worker:

```json
{
  "message": "Ich verstehe den Übergang im dritten Schritt nicht.",
  "context": {
    "exerciseId": "lecture_script",
    "lang": "de",
    "section": {},
    "visibleContentText": "...",
    "dynamicState": {},
    "userInputs": {},
    "checkResult": null
  },
  "helpLevel": 1,
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Der Worker:

1. prüft HTTP-Methode, Origin, Inhaltsgröße und JSON,
2. übernimmt nur ausdrücklich erlaubte Kontextfelder und kürzt lange Texte,
3. ergänzt serverseitig didaktische Regeln und Fachkontext,
4. begrenzt Hilfestufe und Chatverlauf,
5. ruft die Anthropic Messages API auf,
6. gibt nur eine kleine Antwort wie `{ "answer": "..." }` zurück.

Die didaktischen Kernregeln müssen im Worker liegen. Regeln im Browser können verändert werden und sind daher nicht verbindlich.

## Schritt 1: Frontend-Dateien übernehmen

Als Ausgangspunkt können `shared/tutor.js` und `shared/tutor.css` kopiert werden. Im neuen Projekt sollten sie beispielsweise unter `shared/` liegen.

In jede Seite, auf der der Tutor erscheinen soll, kommen die Styles und Skripte:

```html
<link rel="stylesheet" href="./shared/tutor.css">

<!-- Seiteninhalt und projektspezifisches app.js zuerst laden. -->
<script src="./app.js"></script>
<script>
  window.ET_TUTOR_CONFIG = {
    exerciseId: "lecture_script",
    exerciseTitle: "Titel des Live-Skripts",
    workerUrl: "https://<WORKER-NAME>.<ACCOUNT-SUBDOMAIN>.workers.dev",
    referenceUrl: "./references.html"
  };
</script>
<script src="./shared/tutor.js"></script>
```

Relative Pfade müssen an die Verzeichnisstruktur des neuen Projekts angepasst werden. Die Worker-URL ist öffentlich und darf im Frontend stehen; der API-Schlüssel darf dort nicht stehen.

## Schritt 2: Aktuellen Seitenkontext liefern

Das Widget ruft beim Absenden `window.getEtTutorContext()` auf. Die Funktion muss den **aktuellen** Zustand zurückgeben, nicht nur den Zustand beim Laden der Seite.

Empfohlenes Grundmuster für ein Live-Skript:

```js
window.getEtTutorContext = function () {
  return {
    exerciseId: "lecture_script",
    lang: document.documentElement.lang === "en" ? "en" : "de",
    title: document.title,
    section: {
      id: currentSection.id,
      title: currentSection.title,
      learningObjectives: currentSection.learningObjectives,
    },
    visibleContentText: document.querySelector("main")?.innerText || "",
    definitions: currentSection.definitions,
    equations: currentSection.equations,
    dynamicState: getCurrentDemoState(),
    userInputs: collectRelevantInputs(),
    checkResult: lastCheckResult,
    diagramDescription: currentSection.diagramDescription || null,
    allowedReferences: currentSection.references || [],
  };
};
```

Die Feldnamen dürfen angepasst werden. Dann muss `compactContext()` im Worker dieselben Felder ausdrücklich übernehmen.

### Kontext für dynamische Inhalte

Bei zufälligen Werten, Simulationen oder interaktiven Diagrammen müssen immer die aktuell dargestellten Daten übergeben werden, beispielsweise:

```js
dynamicState: {
  frequencyHz: 1000,
  resistanceOhm: 220,
  selectedMode: "phasor",
  displayedCurve: "voltage",
}
```

Der Tutor darf nicht versuchen, diese Werte aus einem Screenshot oder aus früheren Nachrichten zu erraten.

### Kontext für Bilder und Diagramme

Der vorhandene Tutor übermittelt keine Bilder an das Modell. Alle lösungsrelevanten Bildinformationen müssen zusätzlich maschinenlesbar vorliegen:

- Schaltung als Netlist oder Knoten-/Zweigliste,
- Diagramm als Achsen, Größen, Kurven und markierte Punkte,
- Geometrie als Maße und Beziehungen,
- Ablaufgrafik als geordnete Schritte und Verbindungen.

Beispiel:

```js
diagramDescription: {
  type: "phasor_diagram",
  axes: { x: "real", y: "imaginary" },
  vectors: [
    { symbol: "U", magnitude: 5, phaseDeg: 0 },
    { symbol: "I", magnitude: 0.2, phaseDeg: -35 },
  ],
}
```

### Formelsammlungen und Referenzen

Eine URL im Kontext macht deren Inhalt dem Modell nicht automatisch zugänglich. Relevante Notation, Definitionen und Formeln müssen daher entweder:

- im serverseitigen Fachkontext stehen,
- als begrenzter, passender Ausschnitt im Seitenkontext mitgesendet werden oder
- durch eine bewusst implementierte serverseitige Retrieval-Funktion geladen werden.

Für ein Live-Skript ist es meist am robustesten, pro Abschnitt nur die tatsächlich benötigten Definitionen und Formeln strukturiert mitzugeben.

## Schritt 3: Didaktischen Prompt anpassen

`worker/tutor-context.js` trennt gemeinsame Regeln vom projektspezifischen Fachkontext. Für das Live-Skript sollten die ET-spezifischen Inhalte entfernt und durch dessen Lernziele, Notation und typische Fehlvorstellungen ersetzt werden.

Empfohlene verbindliche Regeln:

- Kommuniziere wertschätzend, inklusiv, barrierefrei und auf Augenhöhe.
- Frage zuerst nach dem bisherigen Ansatz oder identifiziere anhand der Eingabe den ersten Fehler.
- Gib pro Antwort höchstens einen nächsten sinnvollen Hinweis.
- Verrate keine vollständige Lösung auf niedrigen Hilfestufen.
- Verwende ausschließlich Werte und Strukturen aus dem übergebenen Kontext.
- Erfinde keine Informationen aus Bildern, Diagrammen oder nicht sichtbaren Abschnitten.
- Nutze TeX für Formeln: `$...$` inline und `$$...$$` abgesetzt.
- Antworte in der Sprache des Seitenkontexts.
- Entwickle bei wiederholtem Hilfebedarf schrittweise konkretere Hilfen.

Bewährte Hilfestufen:

```text
0: gezielte Diagnosefrage
1: kleiner konzeptioneller Hinweis ohne Rechnung
2: passender Ansatz oder passende Formel
3: genau der nächste Rechenschritt mit den aktuellen Werten
4: schrittweise Herleitung mit Begründung jedes Schritts
```

Die Hilfestufe ist eine Orientierung, keine Berechtigung zum Offenlegen versteckter Prüfungs- oder Bewertungslösungen.

## Schritt 4: Worker konfigurieren

Beispiel für `worker/wrangler.toml`:

```toml
name = "lecture-script-tutor"
main = "tutor-worker.js"
compatibility_date = "<YYYY-MM-DD>"

[vars]
ALLOWED_ORIGIN = "https://<GITHUB-OWNER>.github.io"
ANTHROPIC_MODEL = "<CURRENT-ANTHROPIC-MODEL-ID>"

[secrets]
required = ["ANTHROPIC_API_KEY"]
```

`ALLOWED_ORIGIN` und der Modellname sind keine Geheimnisse. Der API-Schlüssel darf weder hier noch in einer anderen versionierten Datei stehen.

Wenn das Live-Skript unter einer Projekt-Unterseite liegt, bleibt die Origin normalerweise nur Schema plus Host, beispielsweise `https://<GITHUB-OWNER>.github.io`, ohne Pfad.

## Schritt 5: Konten verbinden und deployen

Voraussetzungen: Node.js mit `npx`, ein Cloudflare-Konto, ein Anthropic-API-Schlüssel und API-Guthaben.

```powershell
cd worker
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy --dry-run
npx wrangler deploy
```

Bei `wrangler secret put` wird der Schlüssel interaktiv eingegeben. Er darf nicht als Befehlsargument, in einem Screenshot oder in einem Chat erscheinen.

Nach dem Deployment gibt Wrangler die Worker-URL aus. Diese URL wird als `workerUrl` in der Frontend-Konfiguration eingetragen. Änderungen an `tutor-worker.js`, `tutor-context.js` oder `wrangler.toml` erfordern anschließend ein erneutes Worker-Deployment. Reine Frontend-Änderungen werden über das Hosting des Live-Skripts veröffentlicht.

## Schritt 6: Lokale Secrets und Kontodaten ausschließen

Mindestens diese Einträge gehören in `.gitignore`:

```gitignore
worker/.wrangler/
worker/.dev.vars*
worker/.env*
node_modules/
```

Für lokale Entwicklung kann der Schlüssel in `worker/.dev.vars` stehen:

```dotenv
ANTHROPIC_API_KEY=<LOCAL-SECRET>
```

Diese Datei niemals committen. Vor jedem Push prüfen:

```powershell
git status
git diff --cached
git grep -n "ANTHROPIC_API_KEY"
git ls-files worker/.wrangler worker/.dev.vars worker/.env
```

Beim vorletzten Befehl sind Verweise auf den Variablennamen normal; ein Schlüsselwert darf nie erscheinen. Der letzte Befehl darf keine lokalen Wrangler- oder Secret-Dateien als versionierte Dateien zeigen.

## Schritt 7: CORS und Missbrauchsschutz

Der Worker soll nur POST und OPTIONS akzeptieren und Browseranfragen anderer Origins ablehnen. Für Produktion sollte ein fehlender oder abweichender `Origin`-Header abgelehnt werden, sofern keine andere vertrauenswürdige Zugriffsmethode benötigt wird.

CORS schützt jedoch nicht vor direkten, nicht browserbasierten Aufrufen und ist keine Authentifizierung. Für eine stark besuchte öffentliche Seite zusätzlich prüfen:

- Cloudflare Rate Limiting oder WAF-Regeln,
- Turnstile bei erkennbarem Missbrauch,
- begrenzte Eingabe-, Kontext-, Verlaufs- und Ausgabelängen,
- ein kostengünstiges geeignetes Modell,
- Kostenüberwachung und bewusst konfigurierte API-Guthaben-/Reload-Einstellungen,
- keine detaillierten Provider-Fehler oder Secrets in Browserantworten.

Für lokale Tests die HTML-Datei nicht direkt als `file://` öffnen. Stattdessen einen lokalen HTTP-Server verwenden und eine gesonderte Entwicklungs-Origin beziehungsweise Worker-Umgebung konfigurieren.

## Schritt 8: Datenschutz und Datenminimierung

Jede Tutorfrage, der übermittelte Seitenkontext und der kurze Chatverlauf werden an den Worker und anschließend an den Modellanbieter gesendet. Deshalb:

- keine Namen, E-Mail-Adressen, Matrikelnummern oder Analytics-IDs mitsenden,
- keine unnötigen DOM-Inhalte oder versteckten Lehrkraftnotizen übertragen,
- nur für die aktuelle Hilfestellung relevante Eingaben senden,
- institutionelle Datenschutz- und Freigabeprozesse prüfen,
- transparent machen, dass Antworten KI-generiert und fachlich zu prüfen sind.

Der vorhandene ET-Tutor speichert den Chat nur im Arbeitsspeicher der Browserseite. Beim Neuladen ist der Verlauf weg; der Worker besitzt keine Chatdatenbank.

## Schritt 9: Darstellung und Barrierefreiheit

Das vorhandene Widget:

- erzeugt DOM-Knoten mit `textContent` statt ungeprüftem Modell-HTML,
- unterstützt Absätze, Listen und `**fett**`,
- lädt MathJax für TeX-Formeln,
- besitzt Lade-, Fehler- und deaktivierte Sendezustände,
- ist per Tastatur bedienbar und auf Mobilgeräten begrenzt,
- lässt sich über die linke obere Ecke skalieren.

Beim Einsatz einer vollständigen Markdown-Bibliothek muss Modell-HTML weiterhin sanitisiert werden. Außerdem sollten Fokusführung, Kontrast, sichtbare Labels, sinnvolle ARIA-Namen und Screenreader-Ausgabe getestet werden.

## Schritt 10: Abnahmetests

Vor der Veröffentlichung mindestens prüfen:

1. Der API-Schlüssel ist weder in den ausgelieferten Dateien noch in Git enthalten.
2. Die freigegebene Online-Origin erhält Antworten; eine fremde Origin erhält HTTP 403.
3. Der Kontext enthält den aktuell sichtbaren Abschnitt und aktuelle dynamische Werte.
4. Bildrelevante Informationen liegen strukturiert vor.
5. Eine falsche Eingabe führt zunächst zu Diagnose oder kleinem Hinweis, nicht zur Musterlösung.
6. Wiederholte Hilfefragen erhöhen die Konkretheit nachvollziehbar.
7. TeX wird inline und abgesetzt korrekt dargestellt.
8. Deutsch/Englisch und Umlaute funktionieren.
9. Widget, Eingabe, Fokus und Scrollen funktionieren auf Desktop und Mobilgerät.
10. Provider-, Netzwerk- und Guthabenfehler erscheinen als verständliche, nicht sensible Fehlermeldung.

Technische Syntaxprüfungen:

```powershell
node --check shared\tutor.js
node --check worker\tutor-worker.js
node --check worker\tutor-context.js
cd worker
npx wrangler deploy --dry-run
```

## Typische Fehler

- API-Schlüssel direkt im Frontend oder in `wrangler.toml` ablegen.
- Nur die sichtbare HTML-Aufgabe senden, aber dynamische Werte oder Diagrammstruktur vergessen.
- Annehmen, dass das Modell eine verlinkte Formelsammlung automatisch gelesen hat.
- Eine Lösung im Client verstecken, sie aber vollständig und ungeschützt im Tutor-Kontext mitsenden.
- Didaktische Regeln nur im veränderbaren Browsercode definieren.
- Unbegrenzten Verlauf oder den gesamten DOM senden und dadurch Kosten sowie Datenschutzrisiken erhöhen.
- CORS mit Zugriffsschutz oder Kostenkontrolle verwechseln.
- Worker-Code ändern, aber nur GitHub Pages und nicht den Worker neu deployen.

## Übergabe-Prompt für eine andere KI

Der folgende Text kann im neuen Live-Skript-Projekt an eine Coding-KI übergeben werden:

```text
Lies zuerst docs/ai_tutor_integration.md vollständig und untersuche danach die Struktur dieses Projekts.

Baue einen sokratischen KI-Tutor in das statische HTML-Live-Skript ein. Verwende ein Frontend-Widget und einen separaten Cloudflare Worker als Proxy zur Anthropic Messages API. Kein API-Schlüssel und keine persönliche Konto- oder Domaininformation darf im Frontend, Quellcode, Git-Verlauf oder in der Dokumentation stehen.

Anforderungen:
- Übernimm das Konzept von shared/tutor.js und shared/tutor.css oder implementiere eine gleichwertige, barrierearme Lösung.
- Implementiere window.getEtTutorContext(), das beim Absenden den aktuell sichtbaren Abschnitt, Lernziele, relevante Definitionen/Formeln, dynamische Zustände und Eingaben liefert.
- Beschreibe lösungsrelevante Bilder und Diagramme zusätzlich strukturiert; rate keine Informationen aus Bildern.
- Implementiere im Worker Feld-Whitelisting, Längenbegrenzungen, exakte Origin-Prüfung, kurze History und begrenzte Ausgabe.
- Lege den sokratischen Systemprompt und Fachkontext serverseitig ab. Pro Antwort höchstens ein nächster Hinweis; volle Lösung erst bei hohem Hilfebedarf.
- Rendere Formeln sicher mit MathJax. Füge kein ungeprüftes Modell-HTML in den DOM ein.
- Verwende Platzhalter für Worker-URL, Origin und Modell-ID. Das Secret heißt ANTHROPIC_API_KEY und wird ausschließlich mit Wrangler beziehungsweise im Cloudflare-Dashboard gesetzt.
- Ergänze .gitignore für .wrangler, .dev.vars, .env und node_modules.
- Teste Syntax, Kontextaktualität, CORS, Fehlerzustände, didaktische Eskalation, Formeldarstellung, Tastaturbedienung und Mobilansicht.

Dokumentiere am Ende exakt:
1. welche Dateien geändert oder erstellt wurden,
2. welche Platzhalter die projektverantwortliche Person ersetzen muss,
3. welche Wrangler-Befehle für Secret und Deployment auszuführen sind,
4. welche Dateien sicher zu GitHub gepusht werden können.
```
