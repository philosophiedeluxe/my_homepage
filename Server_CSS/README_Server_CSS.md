# Server_CSS – Jellyfin Custom CSS

Dieses Repository enthält die Custom-CSS-Dateien für die optische Anpassung der Jellyfin-Oberfläche.

Aktueller stabiler Stand: **v18**

## Aktueller Jellyfin-Aufruf

In Jellyfin wird nur noch eine zentrale CSS-Datei geladen:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=18');
```

Die Datei `jellyfin_custom.css` ist der zentrale Einstiegspunkt. Alle weiteren CSS-Dateien werden dort in der kontrollierten Reihenfolge eingebunden.

## Aktueller Zielzustand

Der stabile Stand basiert auf folgender Kombination:

```text
v16 = v13 Clean-Hover-Design + home_spacing.css + kein fixes.css
```

Enthalten:

- zentrale Lade-Datei `jellyfin_custom.css`
- `fixes.css` vollständig entfernt
- cleane Hover-/Aktivzustände über `hover_clean.css`
- funktionierende Abstandskorrektur auf der Startseite über `home_spacing.css`
- optische Effekte über `effects_cinematic.css`
- keine riskanten Detailseiten-Layoutkorrekturen
- keine Änderungen an Card-Grids, Posterbildern oder dynamischer Card-Skalierung

## Wichtige Dateien

### `jellyfin_custom.css`

Zentraler Einstiegspunkt für Jellyfin.

Diese Datei lädt alle benötigten CSS-Dateien in der richtigen Reihenfolge. Dadurch muss in Jellyfin selbst nur eine einzige `@import`-Zeile gepflegt werden.

### `hover_clean.css`

Finale optische Korrekturschicht für Hover- und Aktivzustände.

Ziel:

- cleanere Tab-Hover
- weniger Neon-Glow
- keine massiven blauen Blockflächen
- dezente aktive Zustände
- flachere Buttons und Menüs
- Card-Hover bleibt sichtbar, aber ruhiger

Diese Datei muss nach den optischen Grunddateien geladen werden, damit sie vorherige Hover-Regeln zuverlässig überschreibt.

### `home_spacing.css`

Finale Abstandskorrektur für die Startseite.

Diese Datei korrigiert den Abstand zwischen oberer Header-Leiste und dem ersten Startseiten-Abschnitt `Meine Medien`.

Die Korrektur erfolgt bewusst nicht über `#indexPage` und nicht über `h2.sectionTitle`, sondern über den tatsächlichen Parent-Container:

```css
#homeTab > .sections.homeSectionsContainer > .verticalSection.section0
```

Grund:

- `Meine Medien` liegt direkt im ersten `.verticalSection.section0`.
- `margin-top` auf dem `h2` kann kollabieren oder von Jellyfin überschrieben werden.
- `padding-top` auf dem Parent ist stabiler und sichtbar.

### `effects_cinematic.css`

Optische Effekt-Schicht für Glow, Blur, Schatten und Glassmorphism.

Wichtig:

- keine Layoutkorrekturen
- keine Detailseiten-Positionierung
- keine Grid-Regeln
- keine Card-Breiten
- keine Posterbild-Filter

Diese Datei darf nur visuelle Eigenschaften enthalten, zum Beispiel:

```text
box-shadow
text-shadow
background
border
border-radius
filter
backdrop-filter
transition
```

Nicht enthalten sein sollten:

```text
padding
margin
left
right
top
bottom
width
height
position
transform für Layoutkorrekturen
```

### `fixes.css`

Diese Datei wurde ab v9 vollständig entfernt und wird nicht mehr geladen.

Grund:

- sie enthielt fehlerhafte Layoutkorrekturen
- sie beeinflusste Detailseiten und responsive Abstände zu stark
- spätere Korrekturen wurden bewusst ohne `fixes.css` umgesetzt

`fixes.css` sollte nicht erneut eingebunden werden.

## Entwicklungshistorie

### v18 – Detail Refinement

Basis: v17

- neue finale Schicht `detail_refinement.css`
- Episodenlisten als klar abgegrenzte, ruhige Informationseinheiten
- modernisierte Detailflächen, Metadatenfelder und Cast-Karten
- sichtbare, zurückhaltende Carousel- und Alphabetnavigation
- neutralerer Drawer mit eindeutiger aktiver Bibliothek
- kompaktere Logo- und Tab-Leiste bei kleineren Breiten
- keine Änderungen an Posterformaten, Bibliotheksgrids oder Player-Steuerung

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=18');
```

### v17 – Modern Refinement

Basis: v16

- neue finale Schicht `modern_refinement.css`
- ruhigeres, kontrastreicheres Oberflächensystem für Header, Drawer, Dialoge und Listen
- klar abgegrenzte Eingabefelder mit fokussiertem Akzentzustand
- einheitlichere Buttons und Bibliothekskacheln ohne Neon-Glow
- Cards erhalten eine zurückhaltende Tiefenstaffelung; Poster, Grid und responsive Maße bleiben unverändert
- Cache-Busting aller Imports auf `v=17`

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=17');
```

### v9 – Clean ohne `fixes.css`

- `fixes.css` vollständig entfernt
- zentraler Single-Aufruf bleibt erhalten
- keine neuen Detailseiten-Layoutkorrekturen
- `effects_cinematic.css` bleibt als letzte optische Schicht aktiv

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=9');
```

### v10 – Clean Hover

Basis: v9

- neue Datei `hover_clean.css`
- `hover_clean.css` wird nach `effects_cinematic.css` geladen
- alte starke Glow-Regeln in `hoverglow.css` entschärft
- keine Änderungen an Grid, Card-Breiten, Card-Abständen oder Posterbildern

Ziel:

- weniger Neon-Glow
- keine starken blauen Blockflächen in Tabs
- dezente aktive Fläche mit feiner Akzentlinie
- Cards behalten Tiefe, aber weniger Leuchten
- Buttons und Menüs wirken flacher und cleaner

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=10');
```

### v11 – Hover niedriger und erster Spacing-Versuch

Basis: v10

- Hover-/Aktiv-Flächen der Tabs optisch ca. 10% niedriger
- Touch-/Klick-Ziel der Tabs bleibt unverändert
- Abstand über Abschnittstiteln wie `Meine Medien` leicht erhöht
- keine Änderungen an Card-Grids, Posterbildern oder Detailseiten-Positionierung

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=11');
```

### v12 – stärker sichtbarer Hover-/Spacing-Versuch

Basis: aktueller Nutzerstand `Server_CSS(2).zip`

- `hover_clean.css` gezielter angepasst
- aktive/Hover-Tabs stärker überschrieben
- überschrieben wurden unter anderem:
  - `background`
  - `background-image`
  - `border`
  - `outline`
  - `box-shadow`
- sichtbare Tab-Fläche über `::before` mit stärkerem vertikalem Inset gezeichnet
- Abschnittstitel wie `Meine Medien` zusätzlich mit `padding-top` versehen

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=12');
```

### v13 – final brauchbares Clean-Hover-Design

Basis: aktueller Nutzerstand `Server_CSS(2).zip`

- `hover_clean.css` deutlich stärker überschrieben
- Tab-/Hover-Hintergrund wird nicht mehr auf dem gesamten Button gezeichnet
- sichtbare Aktiv-/Hover-Fläche wird über einen flacheren Pseudo-Layer erzeugt
- vollflächige Hintergründe aus `effects_cinematic.css` werden für Tabs konsequent neutralisiert
- keine Änderungen an Card-Grids, Posterbildern, Detailseiten-Positionierung oder `fixes.css`

Dieser Stand wurde als deutlich besser bewertet und ist die Basis für den finalen Hover-Zustand.

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=13');
```

### v14 – erster Header-Abstandsversuch

Basis: v13

- Clean-Hover-Design aus v13 bleibt erhalten
- Abstand zwischen oberer Header-Leiste und erstem Abschnittstitel wie `Meine Medien` sollte erhöht werden
- für breite Desktop-Fenster wurde der Startseiten-Offset von 68px auf 88px angehoben
- zusätzlich bekam der erste Abschnittstitel einen robusteren `margin-top`

Ergebnis:

- nicht ausreichend wirksam
- Ursache lag tiefer in der Startseitenstruktur

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=14');
```

### v15 – Header-Abstand direkt in `header_transparent.css`

Basis: v14

- Abstand wurde direkt in `header_transparent.css` korrigiert
- betroffen waren:
  - `#indexPage`
  - `#moviesPage`
  - `#tvRecommendedPage`
  - `#musicRecommendedPage`

Werte:

```css
/* breite Desktop-Ansicht */
margin-top: 92px;

/* kompaktere Breiten */
margin-top: 154px;
```

Vorher:

```css
/* breite Desktop-Ansicht */
margin-top: 68px;

/* kompaktere Breiten */
margin-top: 130px;
```

Ergebnis:

- weiterhin nicht zuverlässig sichtbar
- `Meine Medien` wurde nicht an der tatsächlichen wirksamen Stelle verschoben

### v16 – finaler Home-Spacing-Fix

Basis: v13 Clean-Hover-Design

- neue Datei `home_spacing.css`
- `home_spacing.css` wird als letzte CSS-Schicht nach `hover_clean.css` geladen
- Abstand wird nicht mehr über `#indexPage margin-top` korrigiert
- Abstand wird nicht mehr über `h2.sectionTitle margin-top` korrigiert
- stattdessen wird der tatsächliche Startseiten-Abschnitt adressiert:

```css
#homeTab > .sections.homeSectionsContainer > .verticalSection.section0
```

Kernlogik:

```css
html body #homeTab > .sections.homeSectionsContainer > .verticalSection.section0,
html body .pageTabContent#homeTab > .sections.homeSectionsContainer > .verticalSection.section0,
html body .homeSectionsContainer > .verticalSection.section0:first-child {
  padding-top: 26px !important;
  box-sizing: border-box !important;
}
```

Ergebnis:

- Abstand zwischen Header und `Meine Medien` greift sichtbar
- Hover-Design bleibt unverändert
- `fixes.css` bleibt entfernt
- keine negativen Auswirkungen auf Card-Grids, Posterbilder oder Detailseiten

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=16');
```

## Finale Struktur

Empfohlene Struktur im Repository:

```text
Server_CSS/
├── jellyfin_custom.css
├── jf_font.css
├── base.css
├── accentlist.css
├── rounding_circlehover.css
├── smallercast.css
├── episodes_compactlist.css
├── header_transparent.css
├── login_frame.css
├── fields_noborder.css
├── indicator_floating.css
├── dark.css
├── title_banner-logo.css
├── floating.css
├── hoverglow.css
├── glassy.css
├── effects_cinematic.css
├── hover_clean.css
├── home_spacing.css
├── modern_refinement.css
├── detail_refinement.css
└── README.md
```

Optional vorhandene, aber aktuell nicht aktive Datei:

```text
episodes_grid.css
```

Nicht mehr verwenden:

```text
fixes.css
```

## Import-Reihenfolge

`jellyfin_custom.css` sollte die Dateien in stabiler Reihenfolge laden:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jf_font.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/base.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/accentlist.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/rounding_circlehover.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/smallercast.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/episodes_compactlist.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/header_transparent.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/login_frame.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/fields_noborder.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/indicator_floating.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/dark.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/title_banner-logo.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/floating.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/hoverglow.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/glassy.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/effects_cinematic.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/hover_clean.css?v=16');
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/home_spacing.css?v=16');
```

Wichtig:

- `effects_cinematic.css` bleibt optische Effekt-Schicht.
- `hover_clean.css` überschreibt Hover-/Aktivzustände.
- `home_spacing.css` kommt ganz am Ende, damit der Abstand sicher greift.
- `fixes.css` wird nicht geladen.

## Wartungsregeln

### Layout und Effekte trennen

Optische Dateien dürfen keine grundlegenden Layoutkorrekturen enthalten.

`effects_cinematic.css` und `hover_clean.css` sollten keine Regeln enthalten für:

```text
Detailseiten-Positionierung
Grid-Breiten
Card-Skalierung
große margin-/padding-Korrekturen
absolute/fixed Layoutverschiebungen
```

### Änderungen klein halten

Neue Anpassungen sollten jeweils nur eine Schicht betreffen:

```text
Hover → hover_clean.css
Startseiten-Abstand → home_spacing.css
Header-Verhalten → header_transparent.css
Effekte → effects_cinematic.css
```

### Cache-Busting

Bei jeder produktiven Änderung die Versionsnummer im Jellyfin-Aufruf erhöhen:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=17');
```

Zusätzlich sollten die internen Imports in `jellyfin_custom.css` auf dieselbe Version gesetzt werden.

## Aktueller Status

`v16` ist der aktuelle stabile Stand.

Dieser Stand wurde erfolgreich getestet:

- Header-Abstand auf der Startseite greift sauber
- Hover-Design ist cleaner
- Cards und Posterbilder bleiben intakt
- dynamische Card-Skalierung bleibt erhalten
- `fixes.css` bleibt vollständig entfernt
