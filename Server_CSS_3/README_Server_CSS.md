# Server_CSS_3 – Aurora Obsidian

Eigenständiges Jellyfin-Theme auf Basis einer bereinigten Kopie von Server_CSS_2.

Aktueller Stand: **Aurora Obsidian V1**

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS_3/jellyfin_custom.css?v=1');
```

## Gestaltungsprinzip

- Obsidian-Schwarz als ruhige Bühne für Cover und Backdrops.
- Aqua und Violett als prismatische Akzente, nicht als flächige Hintergrundfarbe.
- Dünne Glasflächen mit klaren Kanten statt dominanter Schatten.
- Einheitliche Status-, Fortschritts- und Fokuszustände.
- Player-Stapelung bleibt vom Theme getrennt und wird durch `player_video_safety.css` geschützt.

## Architektur

- `jellyfin_custom.css`: einziger Jellyfin-Einstiegspunkt.
- `aurora_obsidian.css`: vollständige Aurora-Oberflächen-, Karten-, Dialog- und Formularschicht.
- `aurora_player.css`: reine Akzentgestaltung für Player-Steuerungen.
- `player_video_safety.css`: ausschließlich sichere Player-Ebenen und Transparenzregeln.
- `REFERENCE_ANALYSIS.md`: dokumentierte Selektoren und Grenzen aus den Referenzprojekten.
