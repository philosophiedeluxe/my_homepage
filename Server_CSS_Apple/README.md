# Server_CSS_Apple

## Designkonzept

Dunkles Graphit, Systemschrift und Apple-Blau. Liquid Glass bleibt auf Navigation, Drawer, Menüs, Dialogen und Player-Steuerungen. Poster, Listen und Metadaten bleiben scharf; Metadatenlinks verwenden matte, umbrechende Chips. Das SRVR-Logo bildet den farbigen Markenakzent.

## Version und Quellen

- Der öffentliche Info-Endpunkt des Live-Servers meldet Jellyfin Server 12.3.0.
- Der lokale Server-Quellcode `jellyfin-12.4` meldet `AssemblyVersion("12.4.0")`, enthält aber keinen Git-Verlauf und keinen Jellyfin-Web-Quellcode.
- Selektoren wurden gegen die Jellyfin-Web-Tags [v12.3](https://github.com/jellyfin/jellyfin-web/tree/v12.3) und [v12.4](https://github.com/jellyfin/jellyfin-web/tree/v12.4) geprüft. Der installierte Web-Build des Live-Servers ist nicht genau feststellbar.

## Installation

Lade diesen vollständigen Ordner als Geschwister von `Server_CSS_Final` in das Stammverzeichnis des Repositories `my_homepage` hoch. Füge dann in Jellyfin Dashboard → Branding → Custom CSS diese Zeile ein:

```css
@import url('https://philosophiedeluxe.github.io/my_homepage/Server_CSS_Apple/jellyfin_custom.css?v=2');
```

Die Datei `jellyfin_custom.css` ist das vollständige Theme. `ServerLogo_long_noBG.png` liefert das Header- und Loginlogo. Das Logo kann erst geladen werden, nachdem dieser Ordner auf GitHub Pages veröffentlicht wurde.

## Technische Besonderheiten

- CSS-only, ohne externe Schriftdateien oder weitere Stylesheet-Imports.
- Responsive Abstände und Dialoggrößen; horizontale Navigation scrollt bei schmalen Ansichten.
- `backdrop-filter` ist auf die funktionale Ebene beschränkt und hat einen deckenden Fallback. Poster und Videos werden nicht global gefiltert.
- Safe-Area-Abstände, Tastaturfokus, erhöhte Kontraste sowie reduzierte Bewegung und Transparenz werden berücksichtigt.
- Die Detailseitenkorrektur ersetzt Jellyfins übergroßen 32vw-Posterabstand. Metadaten-Chips berücksichtigen die von Jellyfin erzeugten Komma-Textknoten und erhalten das lokalisierte Tags-Label.

## Bekannte Einschränkungen

Der genaue Jellyfin-Web-Build des Live-Servers ist unbekannt. Das neue Theme wurde nicht auf dem Server installiert; Desktop-, Tablet-, Mobil-, Dialog- und Playeransichten brauchen nach dem Upload eine Sichtprüfung im Ziel-Webclient. Ein Jellyfin-Update kann verwendete DOM-Klassen ändern.

## Wartung

`Server_CSS_Apple.css` im Projektstamm ist die Autorenversion; diese `jellyfin_custom.css` muss bytegenau damit übereinstimmen. Nach CSS-Änderungen die Importversion `v=2` in Jellyfin und den Logo-URL-Parameter gemeinsam erhöhen. `Server_CSS_Final` bleibt unverändert.
