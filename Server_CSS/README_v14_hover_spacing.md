# Server_CSS v14 – sichtbarer Abstand unter Header

Basis: v13 visible hover spacing.

Änderungen:
- `fixes.css` bleibt entfernt.
- Single-Aufruf bleibt erhalten.
- Clean-Hover-Design aus v13 bleibt erhalten.
- Abstand zwischen oberer Header-Leiste und dem ersten Abschnittstitel wie `Meine Medien` sichtbar erhöht.
- Für breite Desktop-Fenster wird der von `header_transparent.css` gesetzte Startseiten-Offset von 68px auf 88px angehoben.
- Zusätzlich bekommt der erste Abschnittstitel einen robusten `margin-top`.

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=14');
```
