# Server_CSS v12 - Clean Hover + sichtbares Spacing

Basis: vom Nutzer hochgeladener aktueller Stand `Server_CSS(2).zip`.

## Änderung

- `fixes.css` bleibt entfernt.
- Zentraler Single-Aufruf bleibt erhalten.
- `hover_clean.css` wurde gezielt angepasst.
- Aktive/Hover-Tabs werden jetzt stärker überschrieben, inklusive `background`, `background-image`, `border`, `outline` und `box-shadow`.
- Die sichtbare Tab-Fläche wird über `::before` mit stärkerem vertikalem Inset gezeichnet.
- Abschnittstitel wie `Meine Medien` bekommen zusätzlich `padding-top`, nicht nur `margin-top`, damit die Änderung sichtbar greift.

## Jellyfin-Aufruf

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=12');
```
