
# Formelsammlung — Einführung in die Elektrotechnik I

Reihenfolge und Formelnummerierung folgen exakt dem Skript. Skript-Seitenzahlen in Klammern.

---

# 1 Elektrischer Gleichstrom

## 1.1 Grundbegriffe

**Elementarladung** (S. 1) — kleinste elektrische Ladung

| | |
|---|---|
| Elektron | $q_- = -1{,}60218 \cdot 10^{-19}\ \mathrm{C}$ |
| Proton | $q_+ = +1{,}60218 \cdot 10^{-19}\ \mathrm{C}$ |

$$[q] = 1\ \mathrm{C}, \qquad 1\ \mathrm{C} = 1\ \mathrm{As}$$

- **Elektrostatik:** Lehre der ruhenden Ladungen
- **Elektrodynamik:** Lehre bewegter Ladungen

**Gesamtladung eines Körpers** (S. 2) — Maß für die Menge an überschüssigen Ladungsträgern

$$Q = \sum_n q, \qquad [Q] = 1\ \mathrm{As}$$

- $Q > 0$: Elektronenmangel
- $Q < 0$: Elektronenüberschuss

Ursache für die Bewegung von Ladungen: das elektrische Feld $\vec{E}$.

**Werkstoffklassifikation** (S. 3, Bändermodell): Leiter (Cu, Al), Halbleiter (Si, Ge), Nichtleiter (Papier). Vb: Valenzband, Lb: Leitungsband.

**Elektrisches Feld $\vec{E}$** (S. 4)

$$\boxed{\vec{F} = Q \cdot \vec{E}} \tag{1}$$

$$[\vec{E}] = 1\ \frac{\mathrm{N}}{\mathrm{As}} = 1\ \frac{\mathrm{V}}{\mathrm{m}}$$

$\vec{F}$: Kraft (auf die Ladung $Q$), $[F] = 1\ \mathrm{N}$

**Homogenes elektrisches Feld** (S. 6): parallele Feldlinien, $|\vec{E}| = E = \text{konst.}$

**Potential $\varphi$:** Fähigkeit, Arbeit zu leisten; $[\varphi] = 1\ \mathrm{V}$.

$$U = \varphi_1 - \varphi_2, \qquad \varphi_A - \varphi_B = U_{AB}$$

$U_{AB}$: Spannung zwischen A und B.

**Elektrische Spannung $U$** (S. 6), $[U] = 1\ \mathrm{V}$:

$$\boxed{U = E \cdot l} \tag{2}$$

**Elektrischer Strom** (S. 7): gerichtete Bewegung von Ladungsträgern.
Die positive Richtung des Stroms $I$ ist **entgegengesetzt** zur Bewegungsrichtung der Elektronen.

**Elektrische Stromstärke $I$**, $[I] = 1\ \mathrm{A}$:

$$\text{Gleichstrom (DC):}\quad \boxed{I = \frac{\Delta Q}{\Delta t}} \tag{3}$$

$$\text{Wechselstrom (AC):}\quad \boxed{i(t) = \frac{\mathrm{d}q(t)}{\mathrm{d}t}} \tag{4}$$

**Elektrische Stromdichte $S$** (S. 8) — Maß für die thermische Belastung:

$$\boxed{S = \frac{I}{A}} \tag{5} \qquad [S] = \frac{\mathrm{A}}{\mathrm{m}^2}$$

**Elektrischer Widerstand und das Ohmsche Gesetz** (S. 9–10)

$U \sim I \;\Rightarrow\; E \sim S$:

$$\boxed{S = \sigma \cdot E} \tag{6}$$

$\sigma$: spezifische Leitfähigkeit des Leiters.

Herleitung: $\dfrac{I}{A} = \sigma \dfrac{U}{l} \;\Rightarrow\; U = \underbrace{\dfrac{l}{\sigma \cdot A}}_{=:R} \cdot I$

**Ohmsches Gesetz:**

$$\boxed{U = R \cdot I} \tag{7}$$

$$\boxed{\rho = \frac{1}{\sigma}} \tag{8}$$

$$\boxed{R = \rho \cdot \frac{l}{A} = \frac{1}{\sigma}\cdot\frac{l}{A}} \tag{9} \qquad [R] = 1\ \Omega$$

- $R$: elektrischer Widerstand des Leiters, $[R] = 1\ \Omega$
- $l$: Länge des Leiters, $[l] = 1\ \mathrm{m}$
- $A$: Querschnittsfläche des Leiters, $[A] = 1\ \mathrm{m}^2$
- $\sigma$: spezifische Leitfähigkeit des Leitermaterials, $[\sigma] = 1\ \frac{\mathrm{S}}{\mathrm{m}} = \frac{1}{\Omega\mathrm{m}}$
- $\rho$: spezifischer Widerstand des Leitermaterials, $[\rho] = 1\ \Omega\mathrm{m}$

**Elektrischer Leitwert $G$** (S. 11):

$$\boxed{G = \frac{1}{R}} \tag{10} \qquad [G] = \frac{1}{\Omega} = 1\ \mathrm{Siemens\ (S)}$$

Am Widerstand: $U_R = R \cdot I$ (bei idealer Quelle gilt $U_R = U$).

**Temperaturabhängigkeit von $\rho$** (S. 12): $\rho = f(\vartheta) \Rightarrow R = f(\vartheta)$. Es gilt (bis 200 °C):

$$\boxed{R(\vartheta) = R_0 \cdot \left[1 + \alpha_0\,(\vartheta - \vartheta_0)\right]} \tag{11}$$

- $\vartheta$: Temperatur, $[\vartheta] = 1\ {}^{\circ}\mathrm{C}$
- $\vartheta_0$: Bezugstemperatur, üblicherweise 20 °C
- $\alpha_0$: Temperaturbeiwert bei $\vartheta_0$, $[\alpha_0] = \frac{1}{\mathrm{K}}$
- $R_0$: Widerstand bei $\vartheta_0$

**Klassifikation von Widerständen** (S. 13):

| $\alpha_0 > 0$ | $\alpha_0 < 0$ |
|---|---|
| $\vartheta \uparrow \;\rightarrow\; R \uparrow$ | $\vartheta \uparrow \;\rightarrow\; R \downarrow$ |
| Kaltleiter (PTC) | Heißleiter (NTC) |

**Elektrische Arbeit $W$ und Leistung $P$** (S. 14–17)

Allgemein:

$$W = \int_a^b \vec{F}(x) \cdot \mathrm{d}\vec{x}, \qquad [W] = 1\ \mathrm{J} = 1\ \mathrm{Nm}$$

Mathe (Skalarprodukt): $\vec{A}\cdot\vec{B} = |\vec{A}|\cdot|\vec{B}|\cdot\cos(\sphericalangle \vec{A},\vec{B})$; wenn $\sphericalangle \vec{A},\vec{B} = 0$, dann $\cos = 1$.

Fall A (Bewegung von a nach b, $\vec{F} \parallel \mathrm{d}\vec{x}$), mit $\vec{F}(x) = Q\cdot\vec{E}(x)$:

$$W_{a\to b} = Q \cdot E \cdot \Delta x = Q \cdot U > 0$$

(potentielle Energie wird in kinetische Energie umgewandelt)

Fall B (Bewegung von b nach a, gegen die Feldkraft):

$$W_{b\to a} = -Q \cdot U < 0$$

(potenzielle Energie der Ladung wird erhöht)

**Arbeit im elektrischen Feld:**

$$\boxed{W = Q \cdot U} \tag{12}$$

Leistung: $\dfrac{W}{t} = \dfrac{Q}{t}\cdot U$, mit $P := W/t$ und $I := Q/t$:

$$\boxed{P = U \cdot I} \tag{13} \qquad [P] = 1\ \mathrm{W\ (Watt)}$$

Nach Einsetzen des Ohmschen Gesetzes folgt:

$$\boxed{P = R\,I^2 \qquad \text{oder} \qquad P = \frac{U^2}{R}}$$

## 1.2 Kirchhoffsche Regeln

**Definitionen** (S. 18–20):
- **Knoten K:** Verzweigungsstelle, an der mindestens drei Ströme zu- bzw. abfließen
- **Zweig Z:** verbindet zwei Knoten
- **Masche M:** geschlossener Pfad; beginnt bei einem Knoten und endet dort. Umlaufsinn frei wählbar.

> **Schreibweise:** Großbuchstaben $K$, $Z$, $M$ bezeichnen die Objekte selbst (einen bestimmten Knoten, Zweig bzw. eine Masche). Kleinbuchstaben bezeichnen Anzahlen: $k$ = Anzahl der Knoten, $z$ = Anzahl der Zweige (vgl. Einsetzmethode in Abschnitt 1.3).

**Kirchhoffsche Knotenregel (KR)** (S. 21) — für jeden Knoten gilt:

$$\boxed{\sum_k I_k = 0} \tag{14}$$

> **Merksatz:** Die Summe aller Ströme, die in einen Knoten hinein- bzw. aus ihm herausfließen, ist gleich Null.

Zufließende Ströme: $+$, abfließende Ströme: $-$.
Beispiel: $+I_1 - I_2 - I_3 = 0$

**Kirchhoffsche Maschenregel (MR)** (S. 22) — in jeder Masche gilt:

$$\boxed{\sum_m U_m = 0} \tag{15}$$

> **Merksatz:** Die Summe aller Spannungen längs einer Masche (bei einem vollständigen Umlauf) ist gleich Null.

Spannungen im Umlaufsinn: $+$, entgegen dem Umlaufsinn: $-$.
Beispiel (S. 23): M I: $U_2 - U_q + U_1 = 0$; M II: $U_3 - U_2 = 0$; M III: $U_3 - U_q + U_1 = 0$

## 1.3 Einfache Gleichstromkreise

**Reihenschaltung** (S. 24–25)

MR I: $U_1 + U_2 + U_3 - U_q = 0 \;\Rightarrow\; I\,(R_1+R_2+R_3) = U_q = I\cdot R_E$

$R_E$: Ersatzwiderstand der Reihenschaltung

Reihenschaltung von $k$ Widerständen:

$$\boxed{R_E = R_1 + R_2 + R_3 + \ldots + R_k} \tag{16}$$

Wichtiger Sonderfall — Ersatzwiderstand **zweier in Reihe geschalteter** Widerstände:

$$\boxed{R_E = R_1 + R_2}$$

Merke: Eine Reihenschaltung **erhöht** den Gesamtwiderstand — $R_E$ ist größer als der größte Einzelwiderstand.

Für Leitwerte:

$$\frac{1}{G_E} = \frac{1}{G_1} + \frac{1}{G_2} + \frac{1}{G_3} + \ldots + \frac{1}{G_k}$$

**Spannungsteilerregel** (S. 25)

Allgemein: In der Reihenschaltung fließt durch alle Widerstände derselbe Strom $I$:

$$I = \frac{U_q}{R_E}, \qquad U_1 = R_1 \cdot I, \quad U_2 = R_2 \cdot I, \quad \ldots$$

Variante 1 — Teilspannung zu Gesamtspannung (hier für $R_1$; gilt analog für jeden Widerstand):

$$\boxed{\frac{U_1}{U_q} = \frac{R_1}{R_E}}$$

Variante 2 — Teilspannung zu Teilspannung:

$$\boxed{\frac{U_1}{U_2} = \frac{R_1}{R_2}}$$

Die Teilspannungen verhalten sich wie die zugehörigen Widerstände.

Beispiel — unbelasteter Spannungsteiler mit **zwei** Widerständen:

$$I = \frac{U_q}{R_1+R_2}, \qquad U_1 = U_q\cdot\frac{R_1}{R_1+R_2}, \qquad U_2 = U_q\cdot\frac{R_2}{R_1+R_2}, \qquad \frac{U_1}{U_2} = \frac{R_1}{R_2}$$

Reihenschaltungen werden genutzt, um eine hohe Spannung in niedrigere Teilspannungen zu unterteilen.

**Parallelschaltung** (S. 26)

MR: $U_1 = U_2 = U_3 = U_q$; KR: $I = I_1 + I_2 + I_3 = U_q\left(\frac{1}{R_1}+\frac{1}{R_2}+\frac{1}{R_3}\right) = U_q \cdot \frac{1}{R_E}$

Parallelschaltung von $k$ Widerständen:

$$\boxed{\frac{1}{R_E} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \ldots + \frac{1}{R_k}} \tag{17}$$

$$\boxed{G_E = G_1 + G_2 + G_3 + \ldots + G_k} \tag{18} \qquad R_E = \frac{1}{G_E}$$

Wichtiger Sonderfall — Ersatzwiderstand **zweier paralleler** Widerstände:

$$\boxed{R_E = \frac{R_1 \cdot R_2}{R_1 + R_2}}$$

Merke: Eine Parallelschaltung **reduziert** den Gesamtwiderstand — $R_E$ ist kleiner als der kleinste Einzelwiderstand.

**Stromteilerregel** (S. 26)

Allgemein: An allen parallelen Widerständen liegt dieselbe Spannung $U_q$:

$$I = \frac{U_q}{R_E}, \qquad I_1 = \frac{U_q}{R_1}, \quad I_2 = \frac{U_q}{R_2}, \quad \ldots$$

Variante 1 — Teilstrom zu Gesamtstrom (hier für $R_1$; gilt analog für jeden Widerstand):

$$\boxed{\frac{I_1}{I} = \frac{R_E}{R_1} = \frac{G_1}{G_E}} \tag{19}$$

Variante 2 — Teilstrom zu Teilstrom:

$$\boxed{\frac{I_1}{I_2} = \frac{R_2}{R_1}}$$

Die Teilströme verhalten sich **umgekehrt** wie die zugehörigen Widerstände — der kleinere Widerstand führt den größeren Strom.

Beispiel — Stromteiler mit **zwei** parallelen Widerständen:

$$I_1 = I\cdot\frac{R_E}{R_1} = I\cdot\frac{R_2}{R_1+R_2}, \qquad I_2 = I\cdot\frac{R_1}{R_1+R_2}, \qquad \frac{I_1}{I_2} = \frac{R_2}{R_1}$$

**Berechnungsregeln für Gleichstromkreise (Einsetzmethode)** (S. 27):
1. Ersatzschaltbild zeichnen
2. Strom- und Spannungszählpfeile eintragen
3. Kirchhoffsche Gesetze benutzen und Maschen- und Knotengleichungen entwickeln
4. Ohmsches Gesetz anwenden

In jedem Netzwerk gibt es $(k-1)$ unabhängige Knotengleichungen und $z-(k-1)$ unabhängige Maschengleichungen ($k$: Anzahl Knoten, $z$: Anzahl Zweige).

*(Die Skript-Einschübe „unbelasteter Spannungsteiler“ und „Parallelschaltung zweier Widerstände“ sind oben als Beispiele mit zwei Widerständen eingearbeitet.)*

**Aufgabe: Potentiometerschaltung** (S. 28–29)

Draht (Querschnitt $A$, Länge $l$, Leitfähigkeit $\sigma$), Abgriff bei $x$:

$$\frac{U_x}{U_q} = \frac{R_x}{R_E}, \qquad R_E = R_{ab} + R_{bc} = R_{ac} = \rho\,\frac{l}{A} = \frac{1}{\sigma}\cdot\frac{l}{A}, \qquad R_x = \frac{1}{\sigma}\cdot\frac{x}{A}$$

$$\boxed{U_x = U_q \cdot \frac{x}{l}}, \qquad 0 < \frac{x}{l} < 1$$

## 1.4 Quellen

**Ideale Spannungsquelle** (S. 30):

$$U_{ab} = U_q, \qquad U_{ab} \ne f(I), \qquad U = R_L \cdot I \;\Rightarrow\; I = \frac{U_q}{R_L}$$

$R_L$: veränderbarer Lastwiderstand, $[R_L] = 1\ \Omega$; $U$: Klemmenspannung, $[U] = 1\ \mathrm{V}$.

**Reale Spannungsquelle** (S. 31): $U_{ab} = R_L \cdot I$, aber $U_{ab} = f(I)$ (fallende Kennlinie).
- $U_0$: Leerlaufspannung der realen Quelle, $[U_0] = 1\ \mathrm{V}$
- $I_K$: Kurzschlussstrom, $[I_K] = 1\ \mathrm{A}$

**Betriebszustände** (S. 32):

| Leerlauf (offene Klemmen) | Kurzschluss |
|---|---|
| $R_L \to \infty$ | $R_L = 0$ |
| $I = 0$ | $U = 0$ |
| $U = U_0$ | $I = I_K$ |

**Ersatzschaltbild der realen Spannungsquelle** (S. 33)

Lineare Kennlinie $U = aI + b$; Leerlauf $\Rightarrow b = U_0$; Kurzschluss $\Rightarrow a = -\dfrac{U_0}{I_K} =: -R_i$:

$$\boxed{U = -\frac{U_0}{I_K}\cdot I + U_0} \tag{19}$$

$$\boxed{U = U_0 - R_i \cdot I} \tag{20} \qquad U_0 = U + R_i\cdot I$$

ESB: ideale Spannungsquelle $U_0$ in Reihe mit $R_i$ (ohmscher Innenwiderstand); $U_0$: Leerlaufspannung.

**Ideale Stromquelle** (S. 34):

$$I = I_q \ne f(U), \qquad U = R_L \cdot I_q$$

**Reale Stromquelle** (S. 35–36): $I$ sinkt mit steigender Spannung.

Ersatzschaltbild (Stromquelle $I_q$ parallel zu $R_i$):

$$\boxed{I = I_q - \frac{U}{R_i}}, \qquad R_i = \frac{U_0}{I_q}, \qquad I_q = I_K$$

**Quellenwandlung** (S. 37): Das ESB einer realen Spannungsquelle (**Thévenin-Darstellung:** ideale Spannungsquelle $U_0$ in Reihe mit $R_i$) kann in das ESB einer realen Stromquelle (**Norton-Darstellung:** ideale Stromquelle $I_q$ parallel zu $R_i$) umgewandelt werden und umgekehrt. Das Verhalten beider Schaltungen an den Klemmen a, b bezüglich Strom und Spannung ist gleich.

Der Innenwiderstand ist in beiden Darstellungen derselbe: $R_{i,\text{Thévenin}} = R_{i,\text{Norton}} = R_i$.

Spannungsquelle → Stromquelle (Thévenin → Norton), gegeben $U_0$ und $R_i$:

$$\boxed{I_q = \frac{U_0}{R_i} \;(= I_K), \qquad R_i \text{ unverändert — jetzt parallel zur Stromquelle}}$$

Stromquelle → Spannungsquelle (Norton → Thévenin), gegeben $I_q$ und $R_i$:

$$\boxed{U_0 = R_i \cdot I_q, \qquad R_i \text{ unverändert — jetzt in Reihe zur Spannungsquelle}}$$

## 1.5 Berechnungsmethoden von Gleichstromkreisen

Bisher: Einsetzmethode. Spezielle Methoden: Methode der Ersatzspannungsquelle, Überlagerungssatz (S. 38–39).

**Methode der Ersatzspannungsquelle** (S. 40–42) — besonders geeignet, wenn nur ein Zweig in einem komplizierten Netzwerk betrachtet wird.

- Schritt 1: Den Zweig mit gesuchten Größen herausnehmen.
- Schritt 2: Die restliche Schaltung als reale Spannungsquelle ($U_q'$, $R_i'$) modellieren.
- Schritt 3: Den entfernten Zweig wieder anschließen.

Bestimmung von $U_q'$ und $R_i'$:
1. Zweig virtuell herausnehmen, Leerlaufspannung berechnen: $U_{ab,0} = U_q'$
2. Klemmen a–b (virtuell) kurzschließen, Kurzschlussstrom $I_{ab,k}$ bestimmen
3. $$\boxed{R_i' = \frac{U_{ab,0}}{I_{ab,k}}}$$

Verwendete Formelzeichen:
- $U_q'$: Quellenspannung der Ersatzspannungsquelle, $[U_q'] = 1\ \mathrm{V}$; es gilt $U_q' = U_{ab,0}$
- $R_i'$: Innenwiderstand der Ersatzspannungsquelle, $[R_i'] = 1\ \Omega$
- $U_{ab,0}$: Leerlaufspannung zwischen den Klemmen a und b bei herausgenommenem Zweig (Index „0“ = Leerlauf), $[U_{ab,0}] = 1\ \mathrm{V}$
- $I_{ab,k}$: Kurzschlussstrom zwischen den (virtuell kurzgeschlossenen) Klemmen a und b (Index „k“ = Kurzschluss), $[I_{ab,k}] = 1\ \mathrm{A}$

Beispielschaltung ($U_q$ mit $R_i$, Teiler $R_1$, gesuchter Zweig $R_2$):

$$U_q' = U_{ab,0} = U_q\,\frac{R_1}{R_1+R_i}, \qquad I_{ab,k} = \frac{U_q}{R_i}, \qquad R_i' = \frac{R_1\cdot R_i}{R_1+R_i}$$

$$I_2 = \frac{U_q'}{R_2 + R_i'} = U_q \cdot \frac{R_1}{R_2 R_1 + R_2 R_i + R_1 R_i}$$

**Methode des Überlagerungssatzes** (S. 43–44)

- Gesamtwirkung = $\sum$ Einzelwirkungen der einzelnen Ursachen
- Voraussetzung: **lineare Netzwerke**
- Spannungsquellen werden bei der Einzelbetrachtung **kurzgeschlossen** (auf 0 V gesetzt)
- Stromquellen werden bei der Einzelbetrachtung **geöffnet** (Leerlauf, auf 0 A gesetzt)

> **Merksatz:** Alle zu deaktivierenden Quellen werden zu Null gesetzt — Spannungsquellen auf 0 V, Stromquellen auf 0 A. Daraus ergibt sich automatisch: Spannungsquelle → Kurzschluss, Stromquelle → Leerlauf.

> **Wichtig:** Überlagert werden dürfen nur Größen, die **linear** von den Quellengrößen abhängen — z. B. Ströme und Spannungen. **Nicht** überlagert werden dürfen nichtlinear abhängige Größen, z. B. Leistung ($P = U \cdot I \sim I^2$, quadratisch) und Energie.

Beispiel (zwei Quellen $U_1$, $U_2$): $I_1 = I_{11} + I_{12}$, $I_2 = I_{21} + I_{22}$, $I_3 = I_{31} + I_{32}$
**Empfehlung:** Die Strom- und Spannungszählpfeile in allen Einzelbetrachtungen unverändert wie in der ursprünglichen Schaltung belassen — dann lassen sich die Teillösungen direkt addieren (überlagern). Werden Zählpfeile in einer Einzelbetrachtung umgedreht (nicht zu empfehlen), müssen die betroffenen Teilgrößen beim Überlagern mit negativem Vorzeichen eingesetzt werden, z. B. $I_1 = I_{11} - I_{12}$, $I_2 = -I_{21} + I_{22}$.

---

# 2 Elektrischer Wechselstrom

> **Notation bei Wechselgrößen:**
> - Augenblicks-/Momentanwerte: Kleinbuchstaben — $u(t)$, $i(t)$, $p(t)$
> - Amplitudenwerte: Kleinbuchstaben mit Dach — $\hat{u}$, $\hat{i}$
> - Effektivwerte: Großbuchstaben — $U$, $I$
> - Zeiger und Vektoren: unterstrichenes Formelzeichen — $\underline{U}$ (Effektivwertzeiger), $\underline{\hat{u}}$ (Amplitudenwertzeiger); räumliche Feldvektoren tragen im Skript einen Pfeil ($\vec{E}$, $\vec{B}$)
> - Komplexe Größen: unterstrichenes Formelzeichen — $\underline{Z}$, $\underline{Y}$, $\underline{S}$
> - Beträge von Zeigern bzw. komplexen Größen: ohne Unterstrich — $|\underline{U}| = U$, $|\underline{Z}| = Z$

## 2.1 Allgemeine Definitionen

**Reine Wechselgrößen** (S. 44): $i(t)$ zeitlich veränderlich, periodisch mit Periodendauer $T$; Fläche A = Fläche B. $i(t)$: Augenblickwert.

Wechselstrom:

$$1)\quad i(t) = i(t + nT), \quad n = 1,2,\ldots \qquad\qquad 2)\quad \frac{1}{T}\int_0^T i(t)\,\mathrm{d}t = 0$$

Wechselspannung:

$$1)\quad u(t) = u(t + nT) \qquad\qquad 2)\quad \frac{1}{T}\int_0^T u(t)\,\mathrm{d}t = 0$$

**Mischgrößen** (S. 45): Überlagerung von Wechselstrom (WS) und Gleichstrom (GS):

$$\frac{1}{T}\int_0^T i(t)\,\mathrm{d}t \ne 0 \;\Rightarrow\; \text{keine reine Wechselgröße ($i(t)$ ist periodisch)}$$

**Sinusfunktion** (S. 46)

$$u(\alpha) = \hat{u}\sin(\alpha), \quad \alpha = \omega t$$

$$\boxed{u(t) = \hat{u} \cdot \sin(\omega t)} \tag{1}$$

$$\boxed{\omega = \frac{2\pi}{T}} \tag{2}$$

$$\boxed{\omega = 2\pi f} \tag{3} \qquad T = \frac{1}{f}$$

- $\omega$: Kreisfrequenz, $[\omega] = \frac{1}{\mathrm{s}}$
- $f$: Frequenz, $[f] = \frac{1}{\mathrm{s}} = 1\ \mathrm{Hz}$
- $T$: Periodendauer, $[T] = \mathrm{s}$
- $u(t)$: Momentanwert; $U$: Effektivwert; $\hat{u}$: Amplitudenwert; $\hat{u}_{pp}$: Spitze-Spitze-Wert

$$\boxed{U = \frac{\hat{u}}{\sqrt{2}}} \tag{4}$$

**Nullphasenverschiebung** (S. 47)

$$u(t) = \hat{u}\cdot\sin(\omega t + \varphi_u), \qquad i(t) = \hat{i}\cdot\sin(\omega t + \varphi_i)$$

$\varphi_u$, $\varphi_i$: Nullphasenverschiebung von $u(t)$ bzw. $i(t)$; zählt positiv, wenn der Pfeil in Richtung der positiven Winkelzählung zeigt.

**Phasenverschiebung $\varphi$**, $[\varphi] = 1\ \mathrm{rad}$:

$$\boxed{\varphi = \varphi_u - \varphi_i} \tag{5}$$

- $\varphi > 0$: Spannung eilt dem Strom **vor** (= Strom eilt der Spannung nach) — **induktives** Verhalten: ohmsch-induktiv für $0 < \varphi < \frac{\pi}{2}$, rein induktiv für $\varphi = +\frac{\pi}{2}$
- $\varphi < 0$: Spannung eilt dem Strom **nach** (= Strom eilt der Spannung vor) — **kapazitives** Verhalten: ohmsch-kapazitiv für $-\frac{\pi}{2} < \varphi < 0$, rein kapazitiv für $\varphi = -\frac{\pi}{2}$
- $\varphi = 0$: Spannung und Strom sind **in Phase** — **ohmsches** Verhalten

## 2.2 Berechnung von Wechselstromkreisen

Gültig sind alle Gesetze und Methoden der Gleichstromberechnung (S. 48):

$$u(t) = R\cdot i(t), \qquad \text{Maschenregel: } \sum_m u_m(t) = 0, \qquad \text{Knotenregel: } \sum_k i_k(t) = 0$$

**Problembetrachtung: Addition zweier Sinusspannungen gleicher Frequenz** (S. 49)

$u(t) = \hat{u}_1\sin(\omega t + \varphi_1) + \hat{u}_2\sin(\omega t + \varphi_2) = \hat{u}\sin(\omega t + \varphi)$, mit Additionstheorem:

$$\boxed{\hat{u} = \sqrt{\hat{u}_1^2 + \hat{u}_2^2 + 2\,\hat{u}_1\,\hat{u}_2\cos(\varphi_2 - \varphi_1)}} \tag{a}$$

$$\tan(\varphi) = \frac{\hat{u}_1\sin(\varphi_1) + \hat{u}_2\sin(\varphi_2)}{\hat{u}_1\cos(\varphi_1) + \hat{u}_2\cos(\varphi_2)}$$

**Idee: Vektorielle Betrachtung** (S. 50): $\vec{C} = \vec{A} + \vec{B}$:

$$|\vec{C}| = C = \sqrt{A^2 + B^2 + 2AB\cos(\varphi_1-\varphi_2)} \tag{b}$$

**Zeigerdarstellung von Wechselgrößen** (S. 51–52)

Rotierender Vektor („Zeiger") mit $\alpha(t) = \omega t$; Projektion: $\overline{OM} = \hat{u}\sin(\omega t_1)$; allgemein $y(t) = \hat{u}\sin(\omega t)$.

In der Elektrotechnik wird die Projektion auf die **y-Achse** verwendet, weil sie einer **Sinusfunktion** entspricht — die Sinusfunktion wird der Kosinusfunktion vorgezogen.

> **Drehsinn:** Zeiger rotieren im mathematisch positiven Drehsinn, d. h. **entgegen dem Uhrzeigersinn** (Gegenuhrzeigersinn); Winkel werden ebenfalls entgegen dem Uhrzeigersinn positiv gezählt.

- **Amplitudenwertzeiger** $\underline{\hat{u}}$: Länge $\hat{u}$, Winkel = Nullphasenwinkel gegen die Bezugsachse
- **Effektivwertzeiger** $\underline{U}$: Länge $U = \hat{u}/\sqrt{2}$

**Ohmscher Widerstand und Zeigerdarstellung** (S. 53)

$u_R(t) = R\cdot i_R(t)$: $\hat{u}_R\sin(\omega t + \varphi_u) = R\,\hat{i}_R\sin(\omega t + \varphi_i)$

$$\text{Amplitudenvergleich:}\quad \boxed{\hat{u}_R = R\cdot\hat{i}_R} \qquad \text{bzw. Effektivwerte:}\quad \boxed{U_R = R\cdot I_R} \tag{6}$$

$$\text{Phasenvergleich:}\quad \boxed{\varphi_u = \varphi_i \;\Rightarrow\; \varphi = \varphi_u - \varphi_i = 0} \tag{7}$$

**Kapazität $C$** (S. 54–56), $[C] = 1\ \mathrm{F} = 1\ \text{Farad}$; $C$: Speicher für elektrische Energie.

Grundgleichung der Kapazität:

$$\boxed{i_C(t) = C\,\frac{\mathrm{d}u_C(t)}{\mathrm{d}t}} \tag{8}$$

Mit $u_C(t) = \hat{u}_C\sin(\omega t + \varphi_u)$ folgt $i_C(t) = C\,\hat{u}_C\,\omega\cos(\omega t + \varphi_u) = C\,\hat{u}_C\,\omega\sin(\omega t + \varphi_u + \tfrac{\pi}{2})$:

$$\text{Amplitudenvergleich:}\quad \boxed{\hat{u}_C = \frac{1}{\omega C}\cdot\hat{i}_C} \qquad \text{bzw. Effektivwerte:}\quad \boxed{U_C = \frac{1}{\omega C}\cdot I_C} \tag{9, 11}$$

$$\text{Phasenvergleich:}\quad \boxed{\varphi_i = \varphi_u + \frac{\pi}{2}} \tag{10}$$

$$\boxed{X_C = \frac{1}{\omega C}} \tag{12} \qquad X_C: \text{kapazitiver Blindwiderstand},\ [X_C] = 1\ \Omega$$

Damit: $\hat{u}_C = X_C\cdot\hat{i}_C$ bzw. $U_C = X_C\cdot I_C$

$$\boxed{\varphi = \varphi_u - \varphi_i = -\frac{\pi}{2}} \tag{13}$$

Die Spannung am Kondensator eilt dem Strom durch den Kondensator um $\pi/2$ **nach**.

**Induktivität $L$** (S. 57–58), $[L] = 1\ \mathrm{H} = 1\ \text{Henry}$; $L$: Speicher für magnetische Energie.

Grundgleichung der Induktivität:

$$\boxed{u_L(t) = L\,\frac{\mathrm{d}i_L(t)}{\mathrm{d}t}} \tag{14}$$

Mit $i_L(t) = \hat{i}_L\sin(\omega t + \varphi_i)$: $\hat{u}_L\sin(\omega t + \varphi_u) = L\,\hat{i}_L\,\omega\sin(\omega t + \varphi_i + \tfrac{\pi}{2})$

$$\text{Amplitudenvergleich:}\quad \boxed{\hat{u}_L = \omega L\cdot\hat{i}_L} \qquad \text{bzw. Effektivwerte:}\quad \boxed{U_L = \omega L\cdot I_L} \tag{15, 16}$$

$$\text{Phasenvergleich:}\quad \boxed{\varphi_u = \varphi_i + \frac{\pi}{2}} \tag{17}$$

$$X_L = \omega L \qquad X_L: \text{induktiver Blindwiderstand},\ [X_L] = 1\ \Omega$$

Damit: $\hat{u}_L = X_L\cdot\hat{i}_L$ bzw. $U_L = X_L\cdot I_L$

$$\varphi = \varphi_u - \varphi_i = +\frac{\pi}{2} > 0$$

An einer Induktivität eilt die Spannung dem Strom um $\pi/2$ **vor** (bzw. der Strom eilt der Spannung um $\pi/2$ nach).

**Übersichtstabelle R, C, L** (S. 59):

| | Widerstand $R$ | Kapazität $C$ | Induktivität $L$ |
|---|---|---|---|
| Kenngleichung | $R = \rho\,\dfrac{l}{A}$ | $C = \varepsilon_0\,\varepsilon_r\,\dfrac{A}{l}$ | $L = \mu_0\,\mu_r\,\dfrac{A}{l}\cdot N^2$ |
| Strom–Spannung | $u_R(t) = R\, i_R(t)$ | $i_C(t) = C\,\dfrac{\mathrm{d}u_C(t)}{\mathrm{d}t}$ | $u_L(t) = L\,\dfrac{\mathrm{d}i_L(t)}{\mathrm{d}t}$ |
| Amplitudenverhältnis | $\hat{u}_R = R\cdot\hat{i}_R$ | $\hat{u}_C = \dfrac{1}{\omega C}\cdot\hat{i}_C$, $X_C = \dfrac{1}{\omega C}$ | $\hat{u}_L = \omega L\cdot\hat{i}_L$, $X_L = \omega L$ |
| Effektivwertverhältnis | $U_R = R\, I_R$ | $U_C = \dfrac{1}{\omega C}\, I_C$ | $U_L = \omega L\, I_L$ |
| Phase | $\varphi = 0$ | $\varphi = -\dfrac{\pi}{2}$ | $\varphi = +\dfrac{\pi}{2}$ |
| Komplexe Darstellung (S. 60) | $\underline{U}_R = R\,\underline{I}_R$ | $\underline{U}_C = \dfrac{-j}{\omega C}\,\underline{I}_C$ | $\underline{U}_L = j\omega L\,\underline{I}_L$ |
| Zeigerdiagramm (Effektivwertzeiger) | $\underline{I}_R \rightarrow$, $\underline{U}_R \rightarrow$ (gleichphasig) | $\underline{I}_C \rightarrow$, $\underline{U}_C \downarrow$ | $\underline{I}_L \rightarrow$, $\underline{U}_L \uparrow$ |

**RC-Schaltung (reelle Rechnung)** (S. 61–62)

*Reihenschaltung:* KR: $i(t) = i_R(t) = i_C(t) \Rightarrow \hat{i} = \hat{i}_C = \hat{i}_R$; MR: $u_R(t) + u_C(t) = u(t)$.
Zeiger: $\underline{\hat{u}}_R + \underline{\hat{u}}_C = \underline{\hat{u}}$ bzw. $\underline{U}_R + \underline{U}_C = \underline{U}$ (Vektoraddition! Nicht betragsmäßig.)

$$U^2 = U_R^2 + U_C^2 \;\Rightarrow\; U = \sqrt{U_R^2 + U_C^2} = \sqrt{(RI)^2 + \left(\tfrac{1}{\omega C}I\right)^2}$$

$$\boxed{Z = \sqrt{R^2 + \left(\frac{1}{\omega C}\right)^2}} \qquad Z: \text{Scheinwiderstand der RC-Reihenschaltung},\ [Z] = \Omega$$

$$\varphi = -\arctan\left(\frac{1}{\omega C R}\right), \qquad U = Z\cdot I, \qquad \hat{u} = Z\cdot\hat{i}$$

*Parallelschaltung* (S. 62): $u(t) = u_R(t) = u_C(t) \Rightarrow \underline{U} = \underline{U}_R = \underline{U}_C$; $\underline{I} = \underline{I}_C + \underline{I}_R$

$$I_R = \frac{U}{R}, \qquad I_C = U\,\omega C, \qquad I^2 = I_R^2 + I_C^2$$

$$I = U\sqrt{\frac{1}{R^2} + (\omega C)^2}, \qquad Z = \frac{1}{\sqrt{\frac{1}{R^2} + (\omega C)^2}}, \qquad \varphi = -\arctan\left(\frac{I_C}{I_R}\right) = -\arctan(\omega C R)$$

**RL-Schaltung** (S. 63–64)

*Reihenschaltung:*

$$Z = \sqrt{R^2 + (\omega L)^2}, \qquad \varphi = \arctan\left(\frac{\omega L}{R}\right)$$

*Parallelschaltung:*

$$Z = \frac{\omega L\cdot R}{\sqrt{R^2 + (\omega L)^2}}, \qquad \varphi = \arctan\left(\frac{R}{\omega L}\right)$$

### Exkurs: Komplexe Zahlen (S. 65–67)

Imaginäre Einheit: $j = \sqrt{-1}$.

> **Hinweis:** In der Elektrotechnik wird die imaginäre Einheit mit $j$ bezeichnet (statt $i$ wie in der Mathematik), um Verwechslungen mit dem Momentanwert des Stroms $i$ zu vermeiden.

> **Merksatz:** Die reelle und die imaginäre Achse ($j = \sqrt{-1}$) sind linear unabhängig; $j$ steht daher orthogonal (senkrecht) auf der reellen Achse und wirkt als Drehoperator ($+90°$).

Basis der komplexen Zahlenebene: Die Zahlen $1$ und $j$ bilden eine Basis der komplexen (Gaußschen) Zahlenebene — $1$ spannt die reelle Achse auf ($\rightarrow$), $j$ die imaginäre Achse ($\uparrow$).

Komplexe Zahl $\underline{Z}$:

- kartesisch: $\underline{Z} = a + jb = \mathrm{Re}\{\underline{Z}\} + j\,\mathrm{Im}\{\underline{Z}\}$
- Polarform: $\underline{Z} = r\cdot e^{j\varphi}$, Betrag $r = |\underline{Z}|$

Umrechnung:

$$|\underline{Z}| = \sqrt{a^2 + b^2}, \qquad \varphi = \arg(\underline{Z}) = \arctan\left(\frac{\mathrm{Im}\{\underline{Z}\}}{\mathrm{Re}\{\underline{Z}\}}\right), \qquad a = r\cos(\varphi), \qquad b = r\sin(\varphi)$$

Fallunterscheidung arctan:

$$\varphi = \arg(x + jy) = \begin{cases} \arctan(y/x) & x > 0,\ y\ \text{beliebig (Quadrant I, IV)} \\ \arctan(y/x) + \pi & x < 0,\ y \ge 0 \ \text{(II)} \\ \arctan(y/x) - \pi & x < 0,\ y < 0 \ \text{(III)} \\ +\pi/2 & x = 0,\ y > 0 \\ -\pi/2 & x = 0,\ y < 0 \\ \text{undefiniert} & \text{Ursprung} \end{cases}$$

Komplex konjugierte Zahl $\underline{Z}^*$:

$$\underline{Z}^* = a - jb = r\,e^{-j\varphi}, \qquad \underline{Z} + \underline{Z}^* = 2a, \qquad \underline{Z} - \underline{Z}^* = 2b\,j, \qquad \underline{Z}\cdot\underline{Z}^* = r^2 = |\underline{Z}|^2$$

Differentiation und Integration ($\underline{Z} = r\,e^{j\omega t}$):

$$\frac{\mathrm{d}\underline{Z}}{\mathrm{d}t} = j\omega\,\underline{Z} \quad \text{(„Ableiten“ = Multiplikation mit } j\omega\text{)}, \qquad \int \underline{Z}\,\mathrm{d}t = \frac{1}{j\omega}\,\underline{Z} = -j\,\frac{r}{\omega}\,e^{j\omega t}$$

- Multiplikation mit $j$: Drehung um $+90°$
- Hinweis: Multiplikation mit $-j = (-1)\cdot j$: Drehung um $+90°$ und Spiegelung am Ursprung (Skalierung mit $-1$) — insgesamt Drehung um $-90°$
- Division durch $j$: Drehung um $-90°$ (Division durch $j$ = Multiplikation mit $-j$)

### Komplexe Darstellung von Wechselgrößen (S. 68)

$u(t) = \hat{u}\sin(\omega t + \varphi_u)$; Effektivwertzeiger bei $t = 0$: $\underline{U} = a + jb = U e^{j\varphi_u}$.

Beliebiger Zeitpunkt:

$$\underline{U} = U\,e^{j(\varphi_u + \omega t)} = U\left[\cos(\varphi_u + \omega t) + j\sin(\varphi_u + \omega t)\right]$$

$$\mathrm{Im}\{\underline{U}\} = U\sin(\omega t + \varphi_u), \qquad \boxed{\mathrm{Im}\{\underline{U}\}\cdot\sqrt{2} = \hat{u}\sin(\omega t + \varphi_u) = u(t)}$$

### Komplexer Widerstand $\underline{Z}$ (Impedanz) — allgemeine Definition

Für jedes Bauelement bzw. jede Zusammenschaltung von Bauelementen gilt in komplexer Rechnung:

$$\boxed{\underline{U} = \underline{Z}\cdot\underline{I}} \quad \text{(komplexes Ohmsches Gesetz)} \qquad\Leftrightarrow\qquad \underline{Z} = \frac{\underline{U}}{\underline{I}}$$

Darin sind $\underline{U}$ und $\underline{I}$ die Effektivwertzeiger. Für die Beträge gilt entsprechend:

$$U = Z \cdot I \ \text{(Effektivwerte)}, \qquad \hat{u} = Z \cdot \hat{i} \ \text{(Amplitudenwerte)}$$

- $\underline{Z}$: **komplexer Widerstand (Impedanz)**, $[\underline{Z}] = 1\ \Omega$
- $Z = |\underline{Z}|$: **Scheinwiderstand** (Betrag der Impedanz, ohne Unterstrich), $[Z] = 1\ \Omega$
- Sonderfälle für die einzelnen Bauelemente: $\underline{Z}_R = R$, $\underline{Z}_C = \frac{1}{j\omega C}$, $\underline{Z}_L = j\omega L$ (siehe folgende Abschnitte)

### Komplexe Wechselstromrechnung: R, C, L

**Widerstand $R$** (S. 69):

$$u_R(t) = R\,i_R(t), \quad \hat{u}_R = R\,\hat{i}_R, \quad U_R = R\,I_R \;\Rightarrow\; \boxed{\underline{U}_R = R\cdot\underline{I}_R} \tag{18}$$

**Kapazität $C$** (S. 70–71):

$$\boxed{\underline{U}_C = \frac{1}{j\omega C}\,\underline{I}_C} \tag{19}$$

$$\boxed{\underline{Z}_C = \frac{1}{j\omega C} = -j\,\frac{1}{\omega C} = -j\,X_C} \tag{20}$$

$\underline{Z}_C$: komplexer kapazitiver Scheinwiderstand (Impedanz).

Frequenzabhängigkeit von $X_C = \frac{1}{\omega C}$, $\omega = 2\pi f$:

| $\omega \approx 0$ | $0 < \omega < \infty$ | $\omega \to \infty$ |
|---|---|---|
| $X_C \to \infty$ | $X_C = \frac{1}{\omega C}$ | $X_C \to 0$ |
| $i_C(t) \to 0$: offene Klemmen, **Leerlauf** | $i_C(t) = C\,\frac{\mathrm{d}u_C}{\mathrm{d}t}$ | $u_C(t) \to 0$: **Kurzschluss** |

**Induktivität $L$** (S. 72–73):

$$\boxed{\underline{U}_L = j\omega L\cdot\underline{I}_L} \tag{21}$$

$$\boxed{\underline{Z}_L = j\omega L = j\,X_L} \tag{22}$$

$\underline{Z}_L$: komplexer induktiver Scheinwiderstand.

Frequenzabhängigkeit von $X_L = \omega L$:

| $\omega \approx 0$ | $0 < \omega < \infty$ | $\omega \to \infty$ |
|---|---|---|
| $X_L \to 0$: **Kurzschluss** | $X_L = \omega L$ | $X_L \to \infty$: **Leerlauf** |

### RC-Reihenschaltung und komplexer Widerstand $\underline{Z}$ (S. 74–75)

MR I: $\underline{U}_R + \underline{U}_C - \underline{U} = 0$: $\;\underline{I}\left(R + \frac{1}{j\omega C}\right) = \underline{U}$

$$\underline{Z} = R + \frac{1}{j\omega C} = R - j\,\frac{1}{\omega C} \qquad \underline{Z}: \text{komplexer Widerstand (Impedanz) der RC-Reihenschaltung}$$

$$|\underline{Z}| = \sqrt{R^2 + \left(\frac{1}{\omega C}\right)^2} = Z \qquad (Z: \text{Scheinwiderstand})$$

$$\boxed{\underline{U} = \underline{Z}\cdot\underline{I}} \tag{23}$$

$$\boxed{U = Z\cdot I} \tag{24}$$

**Reihen- und Parallelschaltung von Impedanzen** (S. 76) — gilt allgemein für beliebige Impedanzen $\underline{Z}_1$, $\underline{Z}_2$:

$$\boxed{\text{Reihe:}\quad \underline{Z}_{12} = \underline{Z}_1 + \underline{Z}_2}$$

$$\boxed{\text{Parallel:}\quad \frac{1}{\underline{Z}_{12}} = \frac{1}{\underline{Z}_1} + \frac{1}{\underline{Z}_2} \qquad\Leftrightarrow\qquad \underline{Z}_{12} = \frac{\underline{Z}_1 \cdot \underline{Z}_2}{\underline{Z}_1 + \underline{Z}_2}}$$

Beispiel aus dem Skript — RC-Reihenschaltung: $\underline{Z}_{RC} = \underline{Z}_R + \underline{Z}_C$ mit $\underline{Z}_R = R$, $\underline{Z}_C = \frac{1}{j\omega C}$.

**Spannungs- und Stromteiler mit Impedanzen** — die Teilerregeln aus Abschnitt 1.3 gelten unverändert für komplexe Widerstände:

$$\text{Spannungsteiler (Reihenschaltung):}\quad \boxed{\frac{\underline{U}_1}{\underline{U}} = \frac{\underline{Z}_1}{\underline{Z}_1 + \underline{Z}_2}}$$

$$\text{Stromteiler (Parallelschaltung):}\quad \boxed{\frac{\underline{I}_1}{\underline{I}} = \frac{\underline{Z}_2}{\underline{Z}_1 + \underline{Z}_2}}$$

**Admittanz $\underline{Y}$ (komplexer Leitwert)** (S. 77):

$$\underline{U} = \underline{Z}\cdot\underline{I} \;\Rightarrow\; \underline{I} = \frac{1}{\underline{Z}}\cdot\underline{U}: \qquad \boxed{\underline{I} = \underline{Y}\cdot\underline{U}} \tag{25}$$

$$\underline{Y} = \underline{Y}_R + \underline{Y}_C \ \text{(parallel)}, \qquad \underline{Y}_R = \frac{1}{R}, \qquad \underline{Y}_C = j\omega C$$

$\underline{Y}$: Admittanz (komplexer Leitwert), $[Y] = 1\ \mathrm{S} = \frac{1}{\Omega}$

**RC-Reihenschaltung: Frequenzverhalten / Filter** (S. 78–81)

Gegeben $u(t) = \hat{u}\sin(\omega t)$, $\omega$ veränderlich; gesucht $u_{ab}(t)$ (Spannung an $C$):

- Niedrige Frequenzen ($\omega \to 0$): $\frac{1}{\omega C} \to \infty$, $i(t)\to 0$ ⇒ $u_{ab}(t) = u(t)$
- Hohe Frequenzen ($\omega \to \infty$): $\frac{1}{\omega C} \to 0$ (Kurzschluss) ⇒ $u_{ab}(t) = 0$

Grenzfrequenz:

$$\boxed{\omega_g = 2\pi f_g = \frac{1}{RC}}$$

- **Tiefpass-Filter:** Ausgang über $C$ (lässt niedrige Frequenzen durch)
- **Hochpass-Filter:** Ausgang über $R$ (lässt hohe Frequenzen durch)

## 2.3 Blind- und Wirkspannung, Blind- und Wirkstrom (S. 82)

$$\text{Wirkspannung:}\quad \hat{u}_W = \hat{u}\cos(\varphi) \;\rightarrow\; \boxed{U_W = U\cos\varphi} \tag{26}$$

$$\text{Blindspannung:}\quad \hat{u}_B = \hat{u}\sin(\varphi) \;\rightarrow\; \boxed{U_B = U\sin\varphi} \tag{27}$$

$$\text{Wirkstrom:}\quad \hat{i}_W = \hat{i}\cos(\varphi) \;\rightarrow\; \boxed{I_W = I\cos\varphi} \tag{28}$$

$$\text{Blindstrom:}\quad \hat{i}_B = \hat{i}\sin(\varphi) \;\rightarrow\; \boxed{I_B = I\sin\varphi} \tag{29}$$

## 2.4 Elektrische Leistung und Arbeit im Wechselstromkreis (S. 83–84)

$$\boxed{p(t) = u(t)\cdot i(t)} \tag{30} \qquad p(t): \text{Augenblickwert der Leistung},\ [p] = 1\ \mathrm{W}$$

$$\boxed{W = \int_{t_1}^{t_2} p(t)\,\mathrm{d}t} \tag{31} \qquad W: \text{Arbeit im Zeitintervall } (t_1 - t_2)\ \text{(„Energie")}$$

Für $u(t) = \hat{u}\sin(\omega t + \varphi_u)$, $i(t) = \hat{i}\sin(\omega t + \varphi_i)$, mit $\sin\alpha\sin\beta = \frac{\cos(\alpha-\beta) - \cos(\alpha+\beta)}{2}$:

$$p(t) = \frac{\hat{u}\,\hat{i}}{2}\left[\cos(\underbrace{\varphi_u - \varphi_i}_{\varphi}) - \cos(2\omega t + \varphi_u + \varphi_i)\right] = \underbrace{\frac{\hat{u}\,\hat{i}}{2}\cos\varphi}_{=P,\ \text{fester Wert}} - \underbrace{\frac{\hat{u}\,\hat{i}}{2}\cos(2\omega t + \varphi_u + \varphi_i)}_{\text{Frequenz doppelt so hoch}}$$

$$\boxed{p(t) = P + p_{2f}(t)} \tag{32}$$

$P$: arithmetischer Mittelwert von $p(t)$ = **Wirkleistung**:

$$P = \frac{1}{T}\int_0^T p(t)\,\mathrm{d}t = \frac{\hat{u}\,\hat{i}}{2}\cos\varphi = \frac{\hat{u}}{\sqrt{2}}\cdot\frac{\hat{i}}{\sqrt{2}}\cdot\cos\varphi$$

$$\boxed{P = U\cdot I\cdot\cos\varphi} \tag{33}$$

- $p(t) > 0$: $i(t)$, $u(t)$ gleiches Vorzeichen — Energie fließt von der Quelle zum Verbraucher
- $p(t) < 0$: verschiedene Vorzeichen — Energie fließt vom Verbraucher zur Quelle

**Wirk-, Blind- und Scheinleistung** (S. 85):

| Wirkleistung $P$ | Blindleistung $Q$ | Scheinleistung $S$ |
|---|---|---|
| $P = U\,I\cos\varphi$ (33) | $Q = U\,I\sin\varphi$ (34) | $S = U\cdot I$ (35) |
| Leistung, die wirklich verbraucht wird | Leistung, die zwischen Verbraucher und Quelle verschoben wird | nützlich zur Dimensionierung von Netzen und Schaltungen |
| $[P] = 1\ \mathrm{W}$ | $[Q] = 1\ \mathrm{VAR}$ (volt-ampere-reaktiv) | $[S] = 1\ \mathrm{VA}$ |

$\cos\varphi$: **Leistungsfaktor**. Leistungsdreieck: $S$ Hypotenuse, $P$ und $Q$ Katheten.

Übersicht (S. 86):

| | $R$ ($\varphi=0$) | $L$ ($\varphi=+\frac{\pi}{2}$) | $C$ ($\varphi=-\frac{\pi}{2}$) | Einheit |
|---|---|---|---|---|
| $P = UI\cos\varphi$ | $UI$ | $0$ | $0$ | W |
| $Q = UI\sin\varphi$ | $0$ | $UI$ | $-UI$ | VAR |
| $S = UI$ | $UI$ | $UI$ | $UI$ | VA |

**Komplexe Scheinleistung $\underline{S}$** (S. 87):

$$\underline{S} = P + jQ = UI\cos\varphi + jUI\sin\varphi = UI\,e^{j\varphi} = UI\,e^{j(\varphi_u - \varphi_i)} = \underbrace{U e^{j\varphi_u}}_{\underline{U}}\cdot\underbrace{I e^{-j\varphi_i}}_{\underline{I}^*}$$

$$\boxed{\underline{S} = \underline{U}\cdot\underline{I}^* = P + jQ} \tag{37}$$

> **Hinweis:** $\underline{I}^*$ ist der konjugiert komplexe Wert des Stromzeigers $\underline{I}$: aus $\underline{I} = I\,e^{j\varphi_i}$ wird $\underline{I}^* = I\,e^{-j\varphi_i}$ (Vorzeichenumkehr des Winkels bzw. des Imaginärteils, vgl. Exkurs Komplexe Zahlen).

**Effektivwert einer Wechselgröße** (S. 88–90)

Definition: gleichwertiger Gleichstrom $I$, der an $R$ die gleiche Leistung erbringt ($P_{DC} = P$):

$$P = \frac{1}{T}\int_0^T R\,i^2(t)\,\mathrm{d}t \stackrel{!}{=} R\cdot I_{DC}^2$$

$$\boxed{I = I_{DC} = \sqrt{\frac{1}{T}\int_0^T i^2(t)\,\mathrm{d}t}} \qquad \boxed{U = U_{DC} = \sqrt{\frac{1}{T}\int_0^T u^2(t)\,\mathrm{d}t}}$$

- $I$: Effektivwert des Stroms $i(t)$, $[I] = 1\ \mathrm{A}$
- $U$: Effektivwert der Spannung $u(t)$, $[U] = 1\ \mathrm{V}$

Beispiel sinusförmige Größen: $i(t) = \hat{i}\sin(\omega t)$, mit $\int_0^T \hat{i}^2\sin^2(\omega t)\,\mathrm{d}t = \hat{i}^2\,\frac{T}{2}$; analog für $u(t) = \hat{u}\sin(\omega t)$:

$$\boxed{I = \frac{\hat{i}}{\sqrt{2}}} \qquad \boxed{U = \frac{\hat{u}}{\sqrt{2}}}$$

## 2.5 Schwingkreise (S. 91–97)

Systeme mit mindestens zwei Energiespeichern. Reihen-RLC-Schwingkreis (L–R–C in Reihe), Parallel-RLC-Schwingkreis (L‖R‖C).

**RLC-Reihenschwingkreis** (S. 92)

$$u_R(t) + u_C(t) + u_L(t) = u(t) \;\Rightarrow\; \underline{U}_R + \underline{U}_C + \underline{U}_L = \underline{U} \;\Rightarrow\; \underline{\hat{u}}_R + \underline{\hat{u}}_C + \underline{\hat{u}}_L = \underline{\hat{u}}$$

Zeigerdiagramm (Amplitudenwertzeiger), z. B. für $\frac{1}{\omega C} > \omega L$ ($|\hat{u}_C| > |\hat{u}_L|$):

$$\hat{u}^2 = (R\,\hat{i})^2 + \left[\left(\omega L - \frac{1}{\omega C}\right)\hat{i}\right]^2 \;\Rightarrow\; \hat{u} = \hat{i}\,\sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}$$

$$\boxed{Z = \sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}} \qquad Z: \text{Scheinwiderstand der RLC-Reihenschaltung}$$

$$\boxed{\varphi = \arctan\left(\frac{\omega L - \frac{1}{\omega C}}{R}\right)}$$

**Umrechnung in Impedanz** (S. 94):

$$\underline{Z} = \underline{Z}_L + \underline{Z}_C + \underline{Z}_R = R + j\left(\omega L - \frac{1}{\omega C}\right), \qquad |\underline{Z}| = \sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2} = Z$$

$$\underline{I} = \frac{\underline{U}}{\underline{Z}} = \frac{\underline{U}}{R + j\left(\omega L - \frac{1}{\omega C}\right)}, \qquad |\underline{I}| = I = \frac{U}{\sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}}$$

$$\varphi_i = -\arctan\frac{\omega L - \frac{1}{\omega C}}{R} = \arctan\frac{\frac{1}{\omega C} - \omega L}{R}; \qquad \text{mit } \varphi_u = 0: \quad \varphi = \varphi_u - \varphi_i = \arctan\frac{\omega L - \frac{1}{\omega C}}{R}$$

Teilspannungen:

$$\underline{U}_R = R\,\underline{I}, \qquad \underline{U}_L = \underline{Z}_L\underline{I} = j\omega L\,\underline{I}, \qquad \underline{U}_C = \underline{Z}_C\,\underline{I} = -j\,\frac{1}{\omega C}\,\underline{I}$$

**Grobe Analyse der RLC-Reihenschaltung** (S. 95):

| $\omega$ | $\omega L$ | $1/\omega C$ | $Z$ | $\varphi$ | $I$ |
|---|---|---|---|---|---|
| $\omega \to 0$ | $0$ | $\infty$ | $\infty$ | $-\frac{\pi}{2}$ | $0\ \mathrm{A}$ |
| $\omega = \omega_0$ | $\omega_0 L$ | $\frac{1}{\omega_0 C}$ | $R$ | $0$ | $I = \frac{U}{R}$ |
| $\omega \to \infty$ | $\infty$ | $0$ | $\infty$ | $+\frac{\pi}{2}$ | $0\ \mathrm{A}$ |

$$I = \frac{U}{Z}$$

**Resonanzfrequenz $\omega_0$** — bei $\omega_0$ gilt $\mathrm{Im}\{\underline{Z}\} = 0$, d. h. $\omega_0 L = \frac{1}{\omega_0 C}$:

$$\boxed{\omega_0 = \frac{1}{\sqrt{LC}}, \qquad f_0 = \frac{1}{2\pi\sqrt{LC}}, \qquad \omega_0 = 2\pi f_0} \tag{40}$$

**Güte und Bandbreite** (S. 96):

$$\boxed{Q = \frac{1}{R}\sqrt{\frac{L}{C}}} \qquad Q: \text{Güte (dimensionslos)}$$

$$\boxed{Q = \frac{\omega_0}{\omega_2 - \omega_1}} \qquad \omega_2 - \omega_1: \text{Bandbreite (Grenzen bei } I_{max}/\sqrt{2})$$

Hinweis: $Q$ bezeichnet hier die (dimensionslose) Güte — nicht zu verwechseln mit der Blindleistung $Q$.

Bei Resonanz: $U = U_R$; Spannungsüberhöhung an L und C: $U_R = R\,I$, $U_L = \omega L\,I$, $U_C = \frac{1}{\omega C}\,I$ (S. 97).

---

# 3 Elektromagnetismus: magnetische und elektrische Felder

## 3.1 Kondensator

**Aufbau** (S. 98): zwei leitende Platten (Fläche $A$, Abstand $l$), dazwischen Isolator (Dielektrikum).

$$U = |\vec{E}|\cdot l, \qquad [U] = \mathrm{V},\quad [l] = \mathrm{m},\quad [E] = \frac{\mathrm{V}}{\mathrm{m}}$$

Empirisch ermittelt (S. 99): $Q \sim A\cdot E$:

$$\boxed{Q = \varepsilon_0\cdot\varepsilon_r\cdot A\cdot E} \tag{1}$$

- $\varepsilon_0$: Dielektrizitätskonstante im Vakuum, $\varepsilon_0 = 8{,}854\cdot 10^{-12}\ \frac{\mathrm{As}}{\mathrm{Vm}}$
- $\varepsilon_r$: Dielektrizitätszahl des Dielektrikums/Materials (dimensionslos); $\varepsilon_{r,\text{Vakuum}} = 1$

Mit $E = U/l$: $Q = \underbrace{\varepsilon_0\,\varepsilon_r\,A\,\frac{1}{l}}_{=:C}\cdot U$:

$$\boxed{Q = C\cdot U} \tag{2}$$

$$\boxed{C = \varepsilon_0\,\varepsilon_r\,\frac{A}{l}} \tag{3} \qquad C: \text{Kapazität des Kondensators},\ [C] = 1\ \mathrm{F}$$

**Kondensator an Wechselstrom/-spannung** (S. 100): $q(t) = C\cdot u(t)$, Ableitung nach $t$:

$$\boxed{i_C(t) = C\cdot\frac{\mathrm{d}u_C(t)}{\mathrm{d}t}} \tag{4}$$

**Laden eines Kondensators (Einschaltvorgang)** (S. 101–103)

Schaltung: Quelle $U$ — Schalter ($t=0$) — $R$ — $C$; Anfangsbedingung $u_C(t=0) = 0$.

Maschenregel: $u_R(t) + u_C(t) = U$ mit $u_R = R\,i$, $i = C\,\frac{\mathrm{d}u_C}{\mathrm{d}t}$:

$$\boxed{RC\cdot\frac{\mathrm{d}u_C(t)}{\mathrm{d}t} + u_C(t) = U} \tag{5} \qquad \text{(DGL 1. Ordnung)}$$

Lösung mit Ansatz $u_C(t) = \alpha_1 e^{-t/\tau} + \alpha_0$ und Randbedingung $u_C(0)=0$:

$$\boxed{u_C(t) = U\cdot\left(1 - e^{-t/\tau}\right)} \tag{6} \qquad \boxed{\tau = RC} \quad \tau: \text{Zeitkonstante},\ [\tau] = \mathrm{s}$$

$$\boxed{i(t) = \frac{U}{R}\cdot e^{-t/RC}} \tag{7}$$

(Bei $t = \tau$: 63 %, bei $t = 3\tau$: 95 % des Endwertes.)

**Entladevorgang** (S. 103):

$$u_C(t) = U\cdot e^{-t/\tau}, \qquad i_C(t) = -\frac{U}{R}\,e^{-t/\tau}$$

**Parallelschaltung von Kondensatoren** (S. 104): $Q = Q_1 + Q_2 + \dots + Q_k = U(C_1 + C_2 + \dots + C_k)$:

$$\boxed{C_E = C_1 + C_2 + \dots + C_k} \tag{8} \qquad C_E: \text{Ersatzkondensator bei Parallelschaltung}$$

**Reihenschaltung von Kondensatoren** (S. 105): $U = U_1 + U_2 + \dots + U_k$, $Q_1 = Q_2 = \dots = Q$:

$$\boxed{\frac{1}{C_E} = \frac{1}{C_1} + \frac{1}{C_2} + \dots + \frac{1}{C_k}} \tag{9} \qquad C_E: \text{Ersatzkondensator bei Reihenschaltung}$$

Beispiel — zwei Kondensatoren in Reihe:

$$\boxed{C_{12} = \frac{C_1 \cdot C_2}{C_1 + C_2}}$$

> **Achtung:** Bei $C$ ist es gegenüber $R$ und $L$ genau vertauscht — **Reihen**schaltung führt auf die Produkt-durch-Summe-Form, **Parallel**schaltung auf die einfache Summe ($C_E = C_1 + C_2$).

Merke: Parallelschaltung **erhöht** die Gesamtkapazität, Reihenschaltung **reduziert** sie — $C_E$ ist kleiner als die kleinste Einzelkapazität.

## 3.2 Magnetische Felder

**Grundlegende Begriffe** (S. 106):

- $\vec{H}$: magnetische Feldstärke, $\left[\frac{\mathrm{A}}{\mathrm{m}}\right]$
- $\vec{B}$: magnetische Flussdichte, $\left[\frac{\mathrm{Vs}}{\mathrm{m}^2}\right] = [\mathrm{T}]$ (Tesla)
- $\Phi$: magnetischer Fluss, $[\Phi] = 1\ \mathrm{Vs} = 1\ \mathrm{Wb}$ (Weber)

**Beziehung zwischen magn. Flussdichte und Feldstärke** (S. 107)

Allgemein gilt: $\vec{B} = f(\vec{H})$ — **Hysteresekurve** mit Neukurve und Sättigung:
- $B_r$: Remanenzflussdichte, $[B_r] = 1\ \mathrm{T}$
- $H_c$: Koerzitivfeldstärke, $[H_c] = 1\ \frac{\mathrm{A}}{\mathrm{m}}$

Im Vakuum gilt: $B = \mu_0\,H$ (linear).

**Magnetische Werkstoffe** (S. 108):
- Weichmagnetische Werkstoffe: schmale Hysterese, $H_c < 1\ \frac{\mathrm{kA}}{\mathrm{m}}$
- Hartmagnetische Werkstoffe (Permanentmagnete): $H_c$ oft sehr groß, $B_r > 1{,}2\ \mathrm{T}$

**Vereinfachung** (nur gültig für weichmagnetisches Material, linearer Bereich vor der Sättigung) (S. 109):

$$\boxed{B = \mu_0\cdot\mu_r\cdot H} \tag{10}$$

- $\mu_0$: Permeabilitätskonstante des Vakuums, $\mu_0 = 4\pi\cdot 10^{-7}\ \frac{\mathrm{Vs}}{\mathrm{Am}}$
- $\mu_r$: Permeabilitätszahl des Werkstoffs/Materials (dimensionslos)
- Beispiele: $\mu_{r,\text{Vakuum}} = 1$, $\mu_{r,\text{Luft}} \approx 1$, $\mu_{r,\text{Eisen}} \approx 1000$, $\mu_{r,\text{magn. Werkstoffe}} \approx 10000$

$$c_0 = \frac{1}{\sqrt{\varepsilon_0\cdot\mu_0}} \qquad (c_0: \text{Lichtgeschwindigkeit im Vakuum},\ [c_0] = 1\ \tfrac{\mathrm{m}}{\mathrm{s}})$$

**Beziehung zwischen magn. Fluss und Flussdichte** (S. 110)

Allgemein gilt:

$$\Phi = \iint_A \vec{B}\cdot\mathrm{d}\vec{A} = \iint_A |\vec{B}|\cdot|\mathrm{d}\vec{A}|\cdot\cos(\sphericalangle(\vec{B},\mathrm{d}\vec{A}))$$

Im homogenen Feld und senkrechten Flächen: $\Phi = B\cdot A\cdot\cos(\sphericalangle(\vec{B},\mathrm{d}\vec{A}))$:

$$\boxed{\Phi = B\cdot A} \tag{11} \qquad B = \frac{\Phi}{A}$$

**Elektromagnetismus — Durchflutungsgesetz** (S. 111)

$$\boxed{\oint_C \vec{H}\cdot\mathrm{d}\vec{s} = N\cdot I} \qquad N: \text{Anzahl der Leiter}$$

Beispiel gerader Leiter ($N = 1$), konzentrische Feldlinien:

$$\oint_C |\vec{H}|\,|\mathrm{d}\vec{s}|\cos(\sphericalangle(\vec{H},\mathrm{d}\vec{s})) = I \;\Rightarrow\; H\cdot 2\pi r = I \;\Rightarrow\; \boxed{H = \frac{I}{2\pi r}} \tag{13} \qquad r: \text{Abstand vom Leiter},\ [r] = 1\ \mathrm{m}$$

**Induktivität** (S. 112–113)

Beispiel Stabspule / Ringkernspule (Kern: weichmagnetisch mit hoher Permeabilität, $\mu_r \gg 1$; Kern Luft/Kunststoff → Luftspule):

$$\Phi = |\vec{B}|\cdot A, \qquad \Psi = N\cdot\Phi \qquad \Psi: \text{verketteter Fluss},\ [\Psi] = 1\ \mathrm{Vs}$$

Allgemein gilt $I \sim \Phi$, $N\cdot I \sim \Phi$:

$$\boxed{\Psi = L\cdot I \qquad\Leftrightarrow\qquad N\cdot\Phi = L\cdot I} \tag{16}$$

$L$: Induktivität, $[L] = 1\ \mathrm{H}$; $N$: Anzahl der Windungen.

Induktivität einer Stabspule (Länge $l$, Querschnitt $A$, $N$ Windungen):

$$\boxed{L = \mu_0\cdot\mu_r\cdot N^2\cdot\frac{A}{l} = N^2\cdot\Lambda} \tag{17} \qquad \Lambda = \mu_0\,\mu_r\,\frac{A}{l}: \text{magnetischer Leitwert},\ [\Lambda] = 1\ \mathrm{H} = 1\ \tfrac{\mathrm{Vs}}{\mathrm{A}}$$

**Induktivität und Wechselstrom** (S. 114)

$\Psi = L\cdot I$, $N\cdot\Phi = L\cdot I$; bei Wechselstrom $N\cdot\Phi(t) = L\cdot i(t)$, Ableitung nach $t$:

$$N\cdot\frac{\mathrm{d}\Phi(t)}{\mathrm{d}t} = L\cdot\frac{\mathrm{d}i(t)}{\mathrm{d}t} \;\Rightarrow\; \boxed{u(t) = L\cdot\frac{\mathrm{d}i(t)}{\mathrm{d}t}} \tag{18}$$

**Parallel- und Reihenschaltung von Induktivitäten** (S. 114):

$$\text{Parallelschaltung:}\quad \frac{1}{L_E} = \frac{1}{L_1} + \frac{1}{L_2} + \dots + \frac{1}{L_k} = \sum_k\frac{1}{L_k}$$

$$\text{Reihenschaltung:}\quad L_E = L_1 + L_2 + \dots + L_k = \sum_k L_k$$

Beispiel — zwei Induktivitäten:

$$\text{Parallel:}\quad \boxed{L_{12} = \frac{L_1 \cdot L_2}{L_1 + L_2}} \qquad\qquad \text{Reihe:}\quad \boxed{L_{12} = L_1 + L_2}$$

Merke: Reihenschaltung **erhöht** die Gesamtinduktivität, Parallelschaltung **reduziert** sie (wie beim Widerstand $R$).

**Laden und Entladung von Induktivitäten** (S. 114): siehe Skript S. 3-61 ff. (Verweis im Skript, analog zum RC-Verhalten mit Zeitkonstante).

---

## Konstanten (im Skript verwendet)

| Konstante | Wert |
|---|---|
| Elementarladung | $e = 1{,}60218\cdot 10^{-19}\ \mathrm{C}$ |
| Dielektrizitätskonstante Vakuum | $\varepsilon_0 = 8{,}854\cdot 10^{-12}\ \frac{\mathrm{As}}{\mathrm{Vm}}$ |
| Permeabilitätskonstante Vakuum | $\mu_0 = 4\pi\cdot 10^{-7}\ \frac{\mathrm{Vs}}{\mathrm{Am}}$ |
| Lichtgeschwindigkeit | $c_0 = \frac{1}{\sqrt{\varepsilon_0\,\mu_0}}$ |

## Notation (Übersicht)

| Bezeichnung | Beispiele | Schreibweise |
|---|---|---|
| Gleichgrößen (zeitlich konstant) | $U$, $I$ | Großbuchstaben |
| Wechselgrößen: Momentan-/Augenblickswert (zeitabhängig) | $u(t)$, $i(t)$, $p(t)$ | Kleinbuchstaben |
| Amplitudenwert (Scheitelwert) | $\hat{u}$, $\hat{i}$ | Kleinbuchstabe mit Dach |
| Effektivwert | $U = \hat{u}/\sqrt{2}$, $I = \hat{i}/\sqrt{2}$ | Großbuchstabe |
| Zeiger (Effektivwert- bzw. Amplitudenwertzeiger) | $\underline{U}$, $\underline{\hat{u}}$ | unterstrichenes Formelzeichen |
| Komplexe Größen | $\underline{Z}$, $\underline{Y}$, $\underline{S}$ | unterstrichenes Formelzeichen |
| Betrag eines Zeigers bzw. einer komplexen Größe | $\lvert\underline{Z}\rvert = Z$, $\lvert\underline{U}\rvert = U$ | ohne Unterstrich |
| Konjugiert komplexe Größe | $\underline{I}^*$ | hochgestellter Stern |
| (Raum-)Vektoren | $\vec{E}$, $\vec{B}$, $\vec{F}$ | Pfeil über dem Formelzeichen |

## Zeichnen von Zeigerdiagrammen (Vorgehen)

1. Maßstäbe für Spannung und Strom festlegen bzw. die vorgegebenen Maßstäbe verwenden.
2. Mit dem vorgegebenen Referenzzeiger beginnen (z. B. $\underline{U}_0$ auf der Bezugsachse).
3. Bei Schaltungen mit drei oder mehr Bauelementen: mit der elektrischen Größe beginnen, die für mehrere Bauelemente gemeinsam gilt — die Spannung der innersten Parallelschaltung bzw. der Strom der innersten Reihenschaltung.
4. Zeiger bauelementweise ergänzen: an $R$ sind $\underline{U}$ und $\underline{I}$ parallel ($\varphi = 0$); an $L$ eilt die Spannung dem Strom um $90°$ vor; an $C$ eilt die Spannung dem Strom um $90°$ nach.
5. Kirchhoff als Zeigeraddition nutzen: Maschenregel = Spannungszeiger vektoriell addieren, Knotenregel = Stromzeiger vektoriell addieren (Pfeilspitze an Pfeilende).
6. Kontrolle: Der Winkel zwischen Gesamtspannung und Gesamtstrom muss zur Phase $\varphi$ der Gesamtimpedanz passen; Winkelzählung entgegen dem Uhrzeigersinn.

## Taschenrechner

> **Tipp:** Einen Taschenrechner verwenden, der sich auf **komplexe Zahlen** umstellen lässt — damit lassen sich komplexe Zahlen direkt addieren, subtrahieren, multiplizieren und dividieren sowie Betrag und Phase berechnen und komplex konjugieren (Umrechnung kartesisch ↔ polar inklusive). Das erspart in der Klausur das manuelle Erweitern mit dem konjugierten Nenner.

---

Zuletzt aktualisiert: 7.7.2026

