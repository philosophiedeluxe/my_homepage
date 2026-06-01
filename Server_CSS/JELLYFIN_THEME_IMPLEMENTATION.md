# Jellyfin CSS – Premium Layout Update

## Umgesetzt

- Dynamisches Kartenlayout mit `clamp()`, variablen Abständen und Scroll-Snap.
- Stabilerer Fokuszustand für Tastatur/Fernbedienung, ohne starkes Layout-Springen.
- Hochwertigere Hover-Effekte: Lift, dezenter Accent-Ring, weicher Schatten statt hartem Neon-Glow.
- Cast-Karten in `smallercast.css` vollständig von vielen Breakpoints auf ein dynamisches System umgestellt.
- Episoden-Kompaktliste in `episodes_compactlist.css` auf Grid-/Clamp-basierte Ausrichtung umgestellt.
- Optionales Episoden-Grid in `episodes_grid.css` modernisiert.
- Header-Abstände in `header_transparent.css` von festen `margin-top`-Sprüngen auf dynamisches `padding-top` umgestellt.
- Detailseiten-Logo in `title_banner-logo.css` dynamischer ausgerichtet.
- Drawer/Navigation verbessert: dynamische Breite, weichere Hover-Zustände, sauberere Abstände.
- Glass-Effekte reduziert und stabilisiert, damit große Blur-Flächen weniger Performance kosten.
- Dark Theme bereinigt: `dark.css` überschreibt `--accent` nicht mehr hart auf Weiß.
- Login-Frame dynamisch skaliert und optisch stärker an das restliche Theme angepasst.
- `prefers-reduced-motion` berücksichtigt.

## Beibehalten

- Bestehende Import-Struktur.
- Bestehende Dateinamen.
- Externe Jellyfin-Einbindung über GitHub Pages.
- Inline-Accent-Override über `:root {--accent: ...}` bleibt nutzbar.

## Wichtig

Die Datei `dark.css` setzt `--accent` nicht mehr auf Weiß. Dadurch ist der externe Accent-Wert maßgeblich:

```css
:root {--accent: 98, 121, 205;}
```

Die aktive Episodenansicht bleibt `episodes_compactlist.css`. `episodes_grid.css` wurde nur als optionale Alternative verbessert.


## 2026-06-01 Detailseiten-Breitenfix

Behoben wurde ein Layoutsprung auf breiten Browserfenstern bei Jellyfin-Detailseiten. Betroffen waren insbesondere:

- `.detailPagePrimaryContent.padded-right`
- `.detailRibbon.padded-left.padded-right`

Die vorherige aspect-ratio-basierte Verschiebung wurde aus `fixes.css` entfernt. Die Detailseite verwendet jetzt in `title_banner-logo.css` zentrale Layout-Variablen für Posterbreite, Seitenabstand, Content-Abstand und maximale Inhaltsbreite. Dadurch bleiben Poster, Ribbon, Metadaten und Beschreibung auch bei voller Browserbreite stabil ausgerichtet.

## Detailseiten-Korrektur: Poster, Logo und Banner

- `base.css`: feste Positionierung des Detail-Posters entfernt. Das Poster scrollt jetzt mit der Detailseite und kann Episodenlisten nicht mehr überdecken.
- `title_banner-logo.css`: Detail-Poster, Detail-Logo, Ribbon und Primary-Content neu geschichtet. Das Logo setzt keine geerbten `top`-/`right`-/`height`-Werte mehr ein.
- `title_banner-logo.css`: kompakte Desktop-Breiten blenden das Poster aus und setzen den Inhalt wieder auf volle verfügbare Breite.
- `dark.css`: Banner-Overlay reduziert, damit das Backdrop-Bild sichtbar bleibt.
- `jellyfin_custom_css_final.css`: Backdrop-Filter und Detailseiten-Hintergrund entsprechend angepasst.
