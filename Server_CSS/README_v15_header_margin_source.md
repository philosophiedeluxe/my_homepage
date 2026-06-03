# Server_CSS v15 – Header-Abstand direkt an der Quelle korrigiert

Basis: v14.

## Änderung

Der Abstand zwischen der oberen Jellyfin-Header-Leiste und dem ersten Inhaltsblock wurde nicht mehr nur nachträglich in `hover_clean.css` überschrieben, sondern direkt in `header_transparent.css` korrigiert.

Betroffene Quelle:

```css
#indexPage,
#moviesPage,
#tvRecommendedPage,
#musicRecommendedPage
```

## Werte

Desktop breit:

```css
margin-top: 92px;
```

vorher:

```css
margin-top: 68px;
```

Kompaktere Breiten:

```css
margin-top: 154px;
```

vorher:

```css
margin-top: 130px;
```

## Nicht geändert

- `fixes.css` bleibt entfernt.
- Single-Aufruf bleibt erhalten.
- Hover-Design aus v13/v14 bleibt erhalten.
- Keine Card-Grid-Änderungen.
- Keine Poster-/Bildcontainer-Änderungen.
- Keine Detailseiten-Layoutkorrekturen.
