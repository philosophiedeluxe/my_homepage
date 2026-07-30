# Referenzanalyse – Server_CSS_3

## Primäre Basis: Abyss

`abyss-jellyfin-main/abyss.css` deckt in einer konsistenten Schicht Basis, Typografie, Header, Drawer, Dialoge, Karten, Statusanzeigen, Player, Detailseiten, Login, Dashboard und responsive Breakpoints ab. Es ist deshalb die direkte Grundlage von Server_CSS_3.

Die Übernahme erfolgt über den vom Projekt dokumentierten jsDelivr-Import. Die lokale Schicht verändert weder Positionslogik noch Größenberechnungen von Abyss.

## Ausgewertete Projekte

- `infinitv-main`: aktuelle Unterteilung in Player-, Karten-, Seiten- und Systemschichten.
- `JellySkin-master`: Karten-Hierarchie, Login-Struktur und Interaktionszustände.
- `Flow-main`: Navigation, Detailseiten, Statusindikatoren und Dashboard-Selektoren.
- `finity-main`: zentrale Farbvariablen und wiederverwendbare Oberflächen.
- `better-jellyfin-ui-main`: Trickplay-/Kapitel-Selektoren.

## Verbindliche Strukturregeln

### Player

Die echte Player-Hierarchie besteht aus `#videoOsdPage`, `.videoPlayerContainer`, `.videoOsdBottom` und `.osdControls`.

- `#videoOsdPage` bleibt vollständig transparent.
- `.videoPlayerContainer` definiert ausschließlich die Ladefläche.
- `.videoOsdBottom` bleibt frei von großflächigen Hintergründen.
- Nur `.osdControls` darf eine kompakte Bedienoberfläche erhalten.

Damit kann keine Theme-Fläche den dekodierten Videoframe überdecken.

### Karten

Die Referenzen trennen Bild und Information über `.cardBox`, `.cardScalable`, `.cardImageContainer`, `.cardPadder` und `.cardFooter`.

- Visuelle Regeln gelten nur in Bibliotheken, Startseiten und Detailseiten.
- Bildeditoren, Nutzerkarten und administrative Karten werden nicht pauschal verändert.
- Personen- und Crew-Karten bleiben auf `#itemDetailPage`, `.peopleSection` und `.castSection` begrenzt.

### Detailseiten

Verlässliche Anker sind `#itemDetailPage`, `.detailPagePrimaryContainer`, `.detailPageSecondaryContainer`, `.detailPageWrapperContainer` und `.detailRibbon`.

- Keine festen Breiten oder negativen Offsets.
- Keine Desktop-Regel wird ungesichert auf mobile Ansichten übertragen.

### Navigation und Dialoge

Relevante Selektoren: `.mainDrawer`, `.mainDrawer-scrollContainer`, `.navMenuOption`, `.actionSheet`, `.dialog` und `.dialog-container`.

Die Gestaltung verändert nur Oberflächen, Abstände und Zustände. Positionierung, Scroll-Verhalten und Klick-Ebenen bleiben Jellyfin überlassen.

### Fortschritt und Status

Relevante Selektoren: `.playedIndicator`, `.countIndicator`, `.itemProgressBar`, `.itemProgressBarForeground`, `.progressring-spiner` und `.sliderMarker`.

Alle erhalten dieselbe Akzentlogik. Die zugrunde liegende Wiedergabe- oder Statusfunktion bleibt unberührt.
