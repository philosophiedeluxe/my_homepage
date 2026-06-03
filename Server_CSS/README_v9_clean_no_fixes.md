# Server_CSS v9 clean - ohne fixes.css

Dieser Stand entfernt `fixes.css` vollständig aus dem Jellyfin-CSS-Aufruf.

## Zweck

- zentraler Single-Aufruf bleibt erhalten
- `fixes.css` wird nicht mehr geladen
- `fixes.css` ist nicht mehr im Paket enthalten
- keine neuen Detailseiten-Layoutkorrekturen
- Effekte bleiben über `effects_cinematic.css` als letzte optische Schicht aktiv

## Jellyfin-Aufruf

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=14');
```

## Reihenfolge

`jellyfin_custom.css` lädt die CSS-Dateien ohne `fixes.css` in der bisherigen stabilen Reihenfolge.

`effects_cinematic.css` bleibt am Ende.
