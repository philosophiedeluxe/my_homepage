# Homepage Roadmap

Stand: 01.07.2026

## Kurzfazit

Die Homepage ist jetzt eine moderne, statische Portfolio-Seite mit starkem Hero, integriertem Portrait-Hintergrund, DE/EN/ES/JP-Umschaltung, GitHub-Verlinkung, sauberer Navigation und rechtlichen Unterseiten. Der Stil ist bewusst reduziert, dunkel, technisch und klar.

## Aktueller Stand

- Statischer Stack mit HTML, CSS und Vanilla JavaScript.
- Hauptseiten: Startseite, Vita, Impressum, Datenschutz, 404 und versteckter Signal Index.
- Versteckte Signal-Index-Seite als bewusst nicht prominent verlinktes Easter-Egg-Handbuch.
- GitHub Pages kompatibel ohne Build-Schritt.
- Responsives Layout mit mobiler Navigation.
- Hero mit Hintergrundbild, Verlauf und Signal-Linie, die sich von links nach rechts aufbaut und wieder zurueckzieht.
- Violetter Akzent `#6C00A1` fuer markante Woerter und Interaktion.
- Einheitlicher technischer Label-Stil fuer Navigation, Quick-Facts, Timeline-Daten und Karten-Kicker.
- Einheitlicher Akzent-Stil fuer Eyebrow-Zeilen, Sprachumschalter und Brand-Text.
- SEO-Basics, OpenGraph und JSON-LD fuer die Startseite.
- Datenschutzfreundlich ohne externe Fonts, Analytics oder Tracking.
- Cookie-Hinweis mit lokaler, neutral benannter Consent-Speicherung und Footer-Link fuer spaetere Aenderungen.
- Firefox-freundlicher Performance-Pass fuer Hero-Parallax, Reveal-Animationen, Glas-Effekte und Full-Bleed-Sektionsbaender.
- Kleinere Hero-Bildvarianten fuer responsive Auslieferung per `srcset`.
- Eigene Social-Preview-Grafik fuer OpenGraph/Twitter Cards.
- Vita mit fokussiertem Entwicklerprofil, Oracle-APEX-Zertifikat und Zertifikatsgalerie erweitert.
- Hreflang-Strategie fuer DE/EN/ES/JP-URLs ueber Query-Parameter ergaenzt.
- Kleiner lokaler QA-Workflow fuer Syntax, lokale Referenzen, Sitemap und optionale Screenshots ergaenzt.
- Interaktives Signal-Canvas mit reduziertem Render-Budget fuer Firefox ergaenzt.
- Scroll-Fortschritt, aktive Abschnittsnavigation und Pointer-Reaktionen ergaenzt.
- Animierter Technologie-Stream und visuelle Projektmodule ergaenzt.
- Projekt- und Stack-Karten mit kontrollierter Tiefenreaktion aufgewertet.
- Vita-PDF als sprachabhaengiger, einseitiger A4-Lebenslauf verfeinert.
- Cinematic Boot Sequence, Hero-Terminal-Unlock, gestaffelter Navigations-Boot und Cursor-Handshake ergaenzt.
- Secret Dev Console, Shift-Rechtsklick-Kontextmenue und Signal Index als versteckte Entwickler-Schicht ergaenzt.
- Developer Operating Layer ergaenzt: System Trace, Command Palette, Recruiter Mode, Live Skill Graph, Projekt-Mini-Simulationen, Iconic Hero und Bootable Vita mit aufklappbaren Experience Logs.

## Erledigte Verbesserungen

- Alte splitartige Hero-Darstellung durch full-bleed Hintergrundbild ersetzt.
- Headline geschaerft und als akzentuierter Rich Text umgesetzt.
- GitHub in Navigation, Footer und Kontaktbereich eingebunden.
- LinkedIn in Navigation, Hero, Footer und Kontaktbereich prominenter eingebunden.
- Vita-PDF dynamisch ueber die Browser-Druckfunktion vorbereitet, damit Inhalt und Sprache aus der aktuellen Vita-Seite kommen.
- Datenschutztext auf GitHub Pages Hosting, lokale Speicherung und externe Profile abgestimmt.
- `sitemap.xml`, Canonical URLs, absolute OpenGraph-Bilder, Twitter Card Tags und WebSite JSON-LD ergaenzt.
- Cache-Busting fuer `style.css` und `app.js` eingefuehrt.
- 404-Seite im gemeinsamen Layout mit Navigation, Footer und klaren Rueckwegen aufgewertet.
- Uebergrosse Headline-Skalierung korrigiert.
- Problematische Zeilenumbrueche bei langen deutschen Ueberschriften entschaerft.
- Google Fonts entfernt.
- `404.html` und `robots.txt` ergaenzt.
- Alte Roadmap-Datei umbenannt und aktualisiert.

## Erledigte Feinschliff-Anpassungen am Design

- Unerwuenschte violette Einfaerbung des ersten Buchstabens bei `h3` entfernt.
- `.eyebrow` gegen ueberschreibende Absatz-Regeln abgesichert, damit Eyebrow-Zeilen auf allen Seiten gleich wirken.
- Labels `Fokus`, `Stack` und `Arbeitsweise` optisch an die Karten-Kicker wie `Portfolio`, `Business Apps` und `Backend` angepasst.
- Pulsierende Hero-Signal-Linie durch eine Aufbau-Animation ersetzt: links starten, nach rechts aufbauen, kurz halten, wieder nach links zurueckziehen.
- Hintergrundflaeche der Hero-Signal-Linie entfernt, damit nur die aktive animierte Linie sichtbar bleibt.
- Navigationspunkte `Profil`, `Projekte`, `Stack`, `Vita`, `GitHub`, `Impressum` und `Datenschutz` auf den technischen Label-Stil vereinheitlicht.
- Sprachumschalter `DE / EN` auf den Eyebrow-/Akzent-Stil gebracht und lesbar gehalten.
- Brand-Mark `PK` an den Navigationsstil angepasst.
- Brand-Text `Phil Kirchner` an den Sprachumschalter-Stil angepasst.
- Zertifikats-Ueberschrift auf der Vita-Seite sauber umbrochen, sodass `Projektverstaendnis` vollstaendig in der zweiten Zeile steht.
- Timeline-Daten auf der Vita-Seite optisch an den Navigationsstil angepasst.
- Scroll-Parallax schreibt keine CSS-Variablen mehr pro Frame, sondern bewegt Bild und Overlay direkt mit gecachter Hero-Hoehe.
- Animierter Hero-Bildfilter durch ein leichteres Overlay-Dimming ersetzt, damit Firefox weniger neu malen muss.
- Full-Bleed-Sektionshintergruende von grossen `box-shadow`/`clip-path` Flaechen auf guenstigere Pseudo-Elemente umgestellt.
- Reveal-Elemente animieren weiterhin beim Rein- und Rausscrollen, damit die Seite beim Zurueckscrollen lebendig bleibt.
- Die dauerhaft laufende Hero-Signal-Linie nutzt einen statischen Glow statt animiertem Schatten.
- Cookie-Hinweis kompakter gemacht, damit der erste Hero-Eindruck weniger stark ueberdeckt wird.
- Signal Index (`signals.html`) als `noindex`-Seite im gleichen Interface-Stil angelegt und ueber Footer-Signal sowie Dev Console erreichbar gemacht.
- Easter-Egg-Dokumentation erweitert: Boot, Cursor, Kontextmenue, Dev Console, Section Signals, Keyboard-Triggers und versteckte Route sind nachvollziehbar dokumentiert.
- Command Palette (`Ctrl+K`) als schneller Zugriff auf Trace, Vita, Stack, Recruiter Mode, Mail, GitHub und Signal Index umgesetzt.
- System Trace visualisiert die Profilpositionierung als technische Scan-Schicht mit Nodes, Linien und Terminal-Protokoll.
- Skill Graph im Stack-Bereich und Timeline-Playback auf der Vita-Seite ergaenzt.
- Timeline-Kacheln auf der Vita-Seite als klickbare Experience Logs erweitert.
- Iconic Hero als sessionbasierter Avatar-Hero-Schalter ergaenzt.
- QA-Skript erweitert: prueft lokale `href`/`src`, `srcset`, Zertifikatsdatenquellen, CSS-Asset-URLs, Sitemap und JavaScript-Syntax.

## Offene sinnvolle naechste Schritte

### Prio A

- Echte Projektkarten mit Links, Screenshots und GitHub-Repositories fuellen.
- Projektkarten mit konkreten Case-Study-Details und sichtbaren Ergebnissen fuellen.

### Prio B

- I18N-Texte aus `app.js` in eigene JSON-Dateien auslagern.
- Wiederverwendbare HTML-Teile ueber Astro, Eleventy oder einen kleinen Build-Step einfuehren.
- Kleine GitHub Action fuer Linkcheck und HTML/CSS/JS-Syntaxchecks ergaenzen.

### Prio C

- Projektsektion um Case Studies erweitern.
- Medien in WebP/AVIF Varianten optimieren.

## QA-Checkliste nach Aenderungen

- Desktop: Startseite, Vita, Datenschutz, Impressum und 404 visuell pruefen.
- Hidden Route: `signals.html` visuell pruefen, Footer-Signal und Dev-Console-Link testen.
- Mobile: Navigation oeffnen/schliessen, Hero-Buttons, Footer und Cookie-Banner pruefen.
- Cookie-Auswahl: `Alle akzeptieren`, `Auswahl speichern`, `Nur notwendige` und erneutes Oeffnen ueber Footer testen.
- Sprachwechsel: DE/EN/ES/JP auf Startseite, Vita, Signal Index und Datenschutz testen.
- Easter Eggs: `Ctrl+Alt+D`, `Shift + Rechtsklick`, `matrix`, `boot`, Konami-Code und Section-Number-Klicks kurz pruefen.
- Developer OS: `Ctrl+K`, `trace profile`, `Recruiter Mode`, Stack-Skill-Nodes und `play timeline` pruefen.
- Kontextmenue: Dev Console, Copy Link, Vita drucken, Mail, GitHub und Avatar Hero pruefen.
- Footer-Links: LinkedIn, GitHub, Impressum, Datenschutz und Cookie-Einstellungen pruefen.
- Externe Links: LinkedIn und GitHub in neuem Browserkontext pruefen.
- SEO: Canonical URLs, OpenGraph-Bild, `sitemap.xml`, `robots.txt` und JSON-LD pruefen.
- Vita-PDF: Auf DE, EN, ES und JP jeweils `Vita als PDF erstellen` pruefen und im Druckdialog `Als PDF speichern` testen.

## Design-Leitplanken

- Clean, dunkel, praezise und technisch bleiben.
- Keine ueberladenen Effekte, keine Marketing-Optik.
- Animationen nur als ruhige Signatur einsetzen, nicht als Ablenkung.
- Violett nur als Akzent verwenden, nicht als dominierende Flaeche.
- Label-Elemente konsistent halten: Navigation, Quick-Facts, Timeline-Daten und Karten-Kicker verwenden denselben technischen Stil.
- Eyebrow- und Sprach-/Brand-Akzente konsistent halten und nicht durch allgemeine Absatz-Regeln ueberschreiben lassen.
- Lange deutsche Begriffe immer explizit auf Chrome und Firefox pruefen.
