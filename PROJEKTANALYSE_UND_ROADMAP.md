# Projektanalyse Homepage (Stand: 22.04.2026)

## 1) Kurzfazit
Die Homepage ist eine solide statische Portfolio-Seite mit vier Hauptseiten (`index`, `vita`, `impressum`, `datenschutz`), responsivem Layout, DE/EN-Sprachumschaltung und moderner visueller Gestaltung. Für den nächsten Reifegrad fehlen vor allem Strukturierung (Wartbarkeit), automatisierte Qualitätssicherung und einige SEO-/Accessibility-Verbesserungen.

---

## 2) Ist-Analyse

### Architektur
- Klassischer statischer Stack: HTML + CSS + Vanilla JavaScript.
- Zentrale Styles in `style.css`.
- Zentrale Logik in `app.js` (Navigation, I18N, Kartenverhalten in Vita).

### Stärken
- Einheitliche Navigation über alle Seiten.
- Sprachumschaltung über `data-i18n`/`data-i18n-html` bereits integriert.
- Responsive Ansätze mit `svh`, `clamp()` und mobiloptimiertem Nav-Verhalten.
- Rechtstexte (Impressum/Datenschutz) vorhanden.

### Auffälligkeiten / Risiken
1. **Hohe Duplikation in HTML-Layouts**  
   Navigation und `<head>`-Struktur sind auf allen Seiten sehr ähnlich, was Wartungsaufwand erhöht.
2. **Monolithische JavaScript-Datei**  
   `app.js` enthält sehr viel Inline-Content (insb. I18N-Texte), dadurch sinkt Übersichtlichkeit.
3. **Metadaten inkonsistent**  
   `meta description` ist sehr generisch (`It´s me`) und teils nicht für alle Seiten gesetzt.
4. **Teilweise fehlende Sicherheits-/Best-Practice-Attribute bei externen Links**  
   `rel="noopener noreferrer"` ist nicht auf allen Seiten konsistent bei externen Links vorhanden.
5. **Fehlende Build-/Test-Pipeline**  
   Keine sichtbaren automatischen Checks (Linting, Linkcheck, HTML-Validation, Lighthouse CI).
6. **Skalierungsgrenze bei Content-Erweiterung**  
   Für zusätzliche Unterseiten/Blog/Projekte wird der manuelle Pflegeaufwand schnell hoch.

---

## 3) Priorisierte Verbesserungen

## Prio A (kurzfristig, hoher Nutzen)
1. **SEO-Basics je Seite verbessern**
   - Präzise `title` und `meta description` je Seite.
   - OpenGraph/Twitter-Metadaten ergänzen.
2. **Accessibility-Quick-Wins**
   - Fokuszustände für interaktive Elemente prüfen/verbessern.
   - `aria-label`-Texte auf EN bei Sprachwechsel mitwechseln.
   - Headline-Hierarchie und Landmarken final prüfen.
3. **Externe Links härten**
   - Konsistent `rel="noopener noreferrer"` ergänzen.

## Prio B (mittelfristig, Wartbarkeit)
4. **I18N auslagern**
   - Wörterbuch in eigene JSON-Dateien (`/i18n/de.json`, `/i18n/en.json`).
   - `app.js` reduziert auf reine Logik.
5. **Layout-Teile wiederverwendbar machen**
   - Bei statischem Hosting z. B. Build-Step (Eleventy, Astro oder Vite + Templating).
   - Alternativ serverseitige Includes, falls Hosting dies erlaubt.
6. **Code-Qualität automatisieren**
   - Prettier + HTMLHint + Stylelint + ESLint.
   - GitHub Action für PR-Checks.

## Prio C (strategisch, Erweiterungen)
7. **Content-Bereich erweitern**
   - Projekte/Case Studies mit Tech-Stack und Screenshots.
   - Zertifikate als strukturierte Sektion mit Download/Verifikation.
8. **Performance & Media**
   - Bildgrößen optimieren (`webp/avif`, responsive `srcset`).
   - Lazy Loading für nicht-kritische Bilder.
9. **Analytics datenschutzkonform**
   - Optionaler Consent-Banner + anonymisierte Metriken (z. B. Plausible/Matomo).

---

## 4) Vorschlag für Erweiterungen

### Feature-Ideen (Portfolio-Wirkung)
- **Projektgalerie** mit Filtern (Backend, Frontend, Datenbank, Zertifikate).
- **Kontaktbereich** mit Formular + Spam-Schutz (Honeypot/Cloudflare Turnstile).
- **Download-CV** in DE/EN als PDF.
- **Testimonials/Empfehlungen** (optional, wenn vorhanden).
- **Timeline** als Alternative/Ergänzung zur Radio-Card-Vita.

### Technische Erweiterungen
- `sitemap.xml` + `robots.txt`.
- Web App Manifest + bessere Favicons.
- Fehlerseite (`404.html`) für sauberes Routing auf statischem Hosting.

---

## 5) Umsetzungsplan (Roadmap)

### Phase 1 (1-2 Tage)
- SEO-Metadaten nachziehen.
- Externe Links vereinheitlichen.
- Kleine Accessibility-Korrekturen (Fokus, Labels).

### Phase 2 (2-4 Tage)
- I18N-Dateien auslagern.
- `app.js` in Module aufteilen (`nav.js`, `i18n.js`, `vita-cards.js`).
- Linting/Formatting einführen.

### Phase 3 (3-7 Tage)
- Projektsektion + Medienoptimierung.
- OG-Bild, strukturierte Daten (JSON-LD für Person/Website).
- Optional Analytics mit Datenschutz-Setup.

---

## 6) Konkrete nächste Schritte (empfohlen)
1. Start mit **Phase 1**, da schneller Mehrwert bei Sichtbarkeit und Professionalität.
2. Danach **Phase 2**, um spätere Features einfacher und risikoärmer umzusetzen.
3. Parallel Inhalte für **Projektsektion** sammeln (Screenshots, Kurzbeschreibungen, Tech-Stack).

Wenn gewünscht, kann als nächster Schritt direkt ein umsetzbarer Task-Backlog (`ToDo` mit Aufwand in Stunden) erstellt werden.
