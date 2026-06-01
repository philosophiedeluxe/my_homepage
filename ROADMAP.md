# Homepage Roadmap

Stand: 01.06.2026

## Kurzfazit

Die Homepage ist jetzt eine moderne, statische Portfolio-Seite mit starkem Hero, integriertem Portrait-Hintergrund, DE/EN-Umschaltung, GitHub-Verlinkung, sauberer Navigation und rechtlichen Unterseiten. Der Stil ist bewusst reduziert, dunkel, technisch und klar.

## Aktueller Stand

- Statischer Stack mit HTML, CSS und Vanilla JavaScript.
- Vier Hauptseiten: Startseite, Vita, Impressum, Datenschutz.
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

## Offene sinnvolle naechste Schritte

### Prio A

- Echte Projektkarten mit Links, Screenshots und GitHub-Repositories fuellen.
- Optional ein eigenes OpenGraph-Bild fuer Social Sharing erstellen.
- Projektkarten mit konkreten Case-Study-Details und sichtbaren Ergebnissen fuellen.

### Prio B

- I18N-Texte aus `app.js` in eigene JSON-Dateien auslagern.
- Wiederverwendbare HTML-Teile ueber Astro, Eleventy oder einen kleinen Build-Step einfuehren.
- Kleine GitHub Action fuer Linkcheck und HTML/CSS/JS-Syntaxchecks ergaenzen.

### Prio C

- Optional englische CV-PDF anbieten.
- Projektsektion um Case Studies erweitern.
- Medien in WebP/AVIF Varianten optimieren.

## QA-Checkliste nach Aenderungen

- Desktop: Startseite, Vita, Datenschutz, Impressum und 404 visuell pruefen.
- Mobile: Navigation oeffnen/schliessen, Hero-Buttons, Footer und Cookie-Banner pruefen.
- Cookie-Auswahl: `Alle akzeptieren`, `Auswahl speichern`, `Nur notwendige` und erneutes Oeffnen ueber Footer testen.
- Sprachwechsel: DE/EN auf Startseite, Vita und Datenschutz testen.
- Footer-Links: LinkedIn, GitHub, Impressum, Datenschutz und Cookie-Einstellungen pruefen.
- Externe Links: LinkedIn und GitHub in neuem Browserkontext pruefen.
- SEO: Canonical URLs, OpenGraph-Bild, `sitemap.xml`, `robots.txt` und JSON-LD pruefen.
- Vita-PDF: Auf DE und EN jeweils `Vita als PDF erstellen` pruefen und im Druckdialog `Als PDF speichern` testen.

## Design-Leitplanken

- Clean, dunkel, praezise und technisch bleiben.
- Keine ueberladenen Effekte, keine Marketing-Optik.
- Animationen nur als ruhige Signatur einsetzen, nicht als Ablenkung.
- Violett nur als Akzent verwenden, nicht als dominierende Flaeche.
- Label-Elemente konsistent halten: Navigation, Quick-Facts, Timeline-Daten und Karten-Kicker verwenden denselben technischen Stil.
- Eyebrow- und Sprach-/Brand-Akzente konsistent halten und nicht durch allgemeine Absatz-Regeln ueberschreiben lassen.
- Lange deutsche Begriffe immer explizit auf Chrome und Firefox pruefen.
