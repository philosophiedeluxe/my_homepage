# Server_CSS_Apple

CSS-only Apple-Liquid-Glass-Theme für Jellyfin. Eine zusammenhängende dunkle Glasnavigation und flache Menüzeilen rahmen scharfe Medienbilder ein. SRVR-Branding, Detailseiten, Episoden, Playbuttons, Track-Auswahl, Dialoge und Formulare teilen ein einheitliches Designsystem.

## Installation

Lade diesen vollständigen Ordner Server_CSS_Apple als Geschwister von Server_CSS_Final in das Stammverzeichnis des Repositories my_homepage. CSS und ServerLogo_long_noBG.png müssen nebeneinander liegen.

Jellyfin Dashboard → Branding → Benutzerdefinierter CSS-Code:

<code>@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS_Apple/jellyfin_custom.css?v=4');</code>

Nach dem Speichern Jellyfin Web neu laden. v4 sorgt für eine frische CSS- und Logo-URL gegenüber dem bisherigen v3-Cache.

## Geprüfte Basis und Grenzen

Die Live-DOM-Selektoren wurden am Jellyfin-Server geprüft; die Oberfläche zeigte Serverversion 12.3. Der genaue Web-Bundle-Build ist nicht bestätigt. jellyfin-12.4 ist lokaler Servercode, kein Jellyfin-Web-Quellcode.

Detailseiten halten den Jellyfin-Posterabstand von 32,45 % der Viewportbreite ein. Das 26rem-Folgenraster aus Server_CSS_Final bleibt erhalten; die Aktionsspalte ist auf 44px verbreitert, damit Play-, Gesehen- und Favoritenknöpfe nicht rechts abgeschnitten werden. Alle Play-Overlays verwenden dieselbe 44px-Kreisform. Systemschrift, Tastaturfokus, Reduced Motion, Reduced Transparency und Forced Colors werden berücksichtigt. Native Select-Popup-Menüs können je nach Browser und Betriebssystem anders aussehen.

v4 ist noch nicht live visuell geprüft: Der Browser lud bei der Prüfung weiterhin den gespeicherten v3-Aufruf. Auch der öffentliche GitHub-Stand der Upload-Datei enthielt noch ältere Regeln. Server_CSS_Apple.css und jellyfin_custom.css sind die Autorenversion und Upload-Kopie und müssen bytegenau übereinstimmen. Server_CSS_Final und Jellyfin-Kerndateien bleiben unverändert.
