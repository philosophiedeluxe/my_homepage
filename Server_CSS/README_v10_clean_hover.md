# Server_CSS v10 clean hover

Basis: v9 clean no fixes.

## Änderungen

- `fixes.css` bleibt entfernt.
- Single-Aufruf bleibt erhalten.
- Neue Datei: `hover_clean.css`.
- `hover_clean.css` wird nach `effects_cinematic.css` geladen und überschreibt nur Hover-/Aktivzustände.
- Alte starke Glow-Regeln in `hoverglow.css` wurden entschärft.
- Keine Detailseiten-Layoutkorrekturen.
- Keine Änderungen an Grid, Card-Breiten, Card-Abständen oder Posterbildern.

## Jellyfin-Aufruf

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=10');
```

## Ziel

Ruhigere Hover-Effekte:

- weniger Neon-Glow
- keine starken blauen Blockflächen in Tabs
- dezente aktive Fläche mit feiner Akzentlinie
- Cards behalten Tiefe, aber weniger Leuchten
- Buttons und Menüs wirken flacher und cleaner
