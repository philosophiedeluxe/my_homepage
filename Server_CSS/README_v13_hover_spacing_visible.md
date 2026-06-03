# Server_CSS v13 - sichtbarer Hover-/Spacing-Fix

Basis: vom Nutzer hochgeladener aktueller Stand `Server_CSS(2).zip`.

Änderungen:

- `fixes.css` bleibt entfernt.
- Single-Aufruf über `jellyfin_custom.css` bleibt erhalten.
- `hover_clean.css` wurde deutlich stärker überschrieben.
- Tab-/Hover-Hintergrund wird nicht mehr auf dem gesamten Tab-Button gezeichnet.
- Sichtbare Aktiv-/Hover-Fläche wird über einen flacheren Pseudo-Layer erzeugt.
- Vollflächige Hintergründe aus `effects_cinematic.css` werden für Tabs konsequent neutralisiert.
- Abschnittstitel wie `Meine Medien` bekommen sichtbar mehr Luft zur oberen Leiste.
- Keine Änderungen an Card-Grids, Posterbildern, Detailseiten-Positionierung oder `fixes.css`.

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=13');
```
