/* === FIXED TOPBAR – zweizeilig mobil, ohne Burger, robust bei 100svh-Header === */
:root{ --nav-h: 56px; } /* Höhe der Leiste (Desktop). Bei Bedarf tweaken. */

/* Leiste selbst: immer oben, volle Breite */
.nav{
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(0,0,0,.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255,255,255,.08);
}

/* Falls zuvor ein ::before-Fullbleed aktiv war: hart deaktivieren */
.nav::before{ content: none !important; }

/* Inhalt der Leiste im Grid (Brand | Links) */
.nav > .container-wide,
header > .container-wide .nav { /* falls Markup <nav class="nav"> direkt in container-wide liegt */
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: .5rem 1rem;
  padding: .65rem clamp(20px, 5vw, 64px);
  min-width: 0;
}

/* Links rechtsbündig, etwas Luft am Rand */
.nav-list{
  list-style: none;
  display: flex;
  gap: .75rem 1rem;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-self: end;
  padding-inline-end: clamp(8px, 2vw, 24px);
}
.nav-list a{
  color: inherit;
  text-decoration: none;
  font-weight: 300;
  padding: .25rem .5rem;
  border-radius: 6px;
}
.nav-list a:hover,
.nav-list a:focus-visible{ background: rgba(255,255,255,.08); }
.nav-divider{ opacity:.6; }

/* Den Platz unter der fixed Topbar freihalten */
header{ padding-top: var(--nav-h); }

/* ===== Mobile: zweizeilig, horizontales Scrollen, Burger AUS ===== */
@media (max-width: 900px){
  .nav-toggle{ display: none !important; } /* Burger weg */

  .nav > .container-wide,
  header > .container-wide .nav{
    grid-template-columns: 1fr;   /* Brand oben */
    grid-auto-rows: auto;
    row-gap: .25rem;
  }

  /* Linkzeile unten: scrollbar statt Klappmenü */
  .nav-list{
    justify-self: start;
    gap: .5rem .75rem;
    overflow: auto hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .nav-list::-webkit-scrollbar{ display: none; }

  /* Alle Reste von "Collapsing" hart ausschalten */
  .nav-list[data-collapsible="true"]{
    position: static !important;
    max-height: none !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}

/* Brand (Kosmetik) */
.brand{
  font-family: 'Syncopate', sans-serif;
  font-size: 1.05rem;
  letter-spacing: .5px;
  color: inherit;
  text-decoration: none;
}
