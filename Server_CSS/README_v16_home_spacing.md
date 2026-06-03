# Server_CSS v16 - Home Spacing Fix

Basis: v13 sichtbares Clean-Hover-Design.

Änderung:
- Neue Datei: `home_spacing.css`
- `home_spacing.css` wird als letzte CSS-Schicht nach `hover_clean.css` geladen.
- Der Abstand wird nicht mehr über `#indexPage margin-top` oder `h2.sectionTitle margin-top` korrigiert.
- Stattdessen wird der tatsächliche Startseiten-Abschnitt adressiert:
  `#homeTab > .sections.homeSectionsContainer > .verticalSection.section0`

Grund:
- `Meine Medien` liegt direkt im ersten `.verticalSection.section0`.
- Margin auf dem `h2` kann am Parent kollabieren oder von Jellyfin überschrieben werden.
- Padding auf dem tatsächlichen Parent ist stabiler und sichtbar.

Jellyfin-Aufruf:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS/jellyfin_custom.css?v=16');
```
