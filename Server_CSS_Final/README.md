# Server_CSS_Apple

## Designkonzept

Ein dunkles Jellyfin-Theme mit Graphitflächen, Systemschrift und Apple-Blau. Eine durchgängige Liquid-Glass-Navigationsleiste trägt die Bedienung; die MUI-Hauptlinks bleiben flach, Menüs nutzen dezente Trennlinien. Poster und Videos bleiben scharf und unverändert. Das SRVR-Wortlogo sitzt auf dem geprüften Startseiten-Link und auf der Anmeldung.

## Jellyfin-Version

- Der öffentliche Server-Info-Endpunkt meldete bei der letzten Prüfung Jellyfin Server 12.3.0.
- Der lokale Server-Quellcode jellyfin-12.4 meldet AssemblyVersion 12.4.0.
- CSS-Selektoren wurden gegen Jellyfin-Web v12.3 und v12.4 geprüft. Der genaue Web-Build des laufenden Servers ist nicht bestätigt.

## Installation

Lade diesen gesamten Ordner als Geschwister von Server_CSS_Final in das Stammverzeichnis deines my_homepage-Repositories. Füge in Jellyfin unter Dashboard → Branding → Benutzerdefinierter CSS-Code ein:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS_Apple/jellyfin_custom.css?v=3');
```

Speichern und Jellyfin Web neu laden. jellyfin_custom.css ist der vollständige CSS-Einstieg. ServerLogo_long_noBG.png muss daneben im selben Ordner liegen.

## Technische Besonderheiten

- CSS-only, ohne JavaScript, zusätzliche Stylesheet-Imports oder externe Schriftdateien.
- Jellyfin behält Layout, Navigation, Player und Eventbehandlung.
- Native Cover-Einrückung auf Detailseiten bleibt erhalten; mobile Detailinhalte berücksichtigen Safe-Area-Abstände.
- Loginformular ist auf 27rem begrenzt. Episoden-Play- und Aktionsknöpfe sind kompakter; die Aktionsspalte erhält eigenen Platz.
- Glasunschärfe gilt nur für Navigation, Menüs, Dialoge und Player-Steuerflächen. Medien erhalten keine globalen Filter.
- Reduced Motion, Reduced Transparency, erhöhte Kontraste, Forced Colors und Tastaturfokus werden berücksichtigt.

## Prüfung und bekannte Einschränkungen

Die Selektoren wurden mit Jellyfin-Web v12.3/v12.4-Quellcode und dem sichtbaren Toolbar-DOM des Servers abgeglichen. Der lexikalische Struktur-Scan des v3-Stands fand 227 Regel- und At-Rule-Blöcke mit ausgeglichener Syntax; 50 Tokens sind definiert und verwendet, externe Stylesheet- und Schriftimporte gibt es nicht. Der Scan ist kein Browser-CSSOM-Parser. Eine visuelle Prüfung von v3 im laufenden Server ist noch nicht erfolgt; die Screenshots zeigen den vorherigen veröffentlichten Stand. Der exakte Web-Build des Servers ist unbekannt und Jellyfin-Updates können DOM-Klassen ändern.

## Wartung

Server_CSS_Apple.css im Projektstamm ist die Autorenversion; jellyfin_custom.css muss bytegenau damit übereinstimmen. Nach Änderungen beide Dateien abgleichen und den Parameter v=3 in Jellyfin-Aufruf und Logo-URL gemeinsam erhöhen. Server_CSS_Final und die Jellyfin-Quellen bleiben unverändert.
