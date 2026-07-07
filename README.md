# phil.osophie.deluxe

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-6C00A1?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-static-111111?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-responsive-111111?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-111111?style=for-the-badge&logo=javascript)

A modern, four-language portfolio website for a software developer with a strong focus on Oracle APEX, PL/SQL, JavaScript and business-oriented application development.

The project is intentionally built as a lightweight static site: no framework, no build step, no external runtime dependencies, no analytics and no tracking.

## Live Site

```text
https://philosophiedeluxe.github.io/my_homepage/
```

## Preview

![Portfolio Preview](./image/social-card.jpg)

## About the Project

This homepage presents the professional profile of Phil Kirchner as a software developer with practical experience in business processes, data-driven applications and Oracle-based development.

The site combines a clean dark visual style with a technical portfolio structure. It is designed for fast loading, clear navigation and direct presentation of relevant skills, projects, certificates and contact channels.

## Core Features

- Responsive portfolio homepage for desktop, tablet and mobile
- Interactive signal canvas with a Firefox-aware render budget
- Scroll progress, active section navigation and responsive pointer-reactive depth effects
- Global custom code cursor with dynamic text-cursor mode and keyword-aware labels
- Animated technology stream and visual project modules
- German, English, Spanish and Japanese language switch
- Dedicated Vita / Resume page with recruiter signal console, skill evolution layer, trust chain and bootable experience logs
- Browser-based PDF export for German, English, Spanish and Japanese profile versions
- Print-optimized A4 layout for complete one-page PDF generation with language-aware document titles
- Project spotlight section with optimized tilt cards, mini terminal simulations and restrained glow feedback
- Technology stack overview
- Certificate section with visual assets
- Certificate lightbox for larger proof previews
- SEO basics with canonical URLs, OpenGraph metadata and Twitter Card metadata
- JSON-LD structured data for better search engine context
- Privacy-friendly setup without analytics or marketing cookies
- Local consent handling for cookie and language preferences
- Dedicated legal pages for Impressum and Datenschutz
- Custom 404 page
- Hidden Easter eggs for developer-oriented discovery interactions
- Hidden Signal Index page as an internal Easter Egg manual
- Developer Operating Layer with System Trace, Command Palette, Recruiter Mode, Live Skill Graph and Bootable Vita playback
- Session-only Iconic Mode with avatar hero, hacker palette and terminal typography
- Installable Progressive Web App with manifest, service worker, app icons, offline fallback and runtime status panel
- Service Worker update notification with `new build available` reload flow
- Adaptive runtime labels for standalone mode, color scheme, cache state and Iconic Mode
- Lightweight QA script for local JS, HTML, `srcset`, certificate, CSS asset and PWA installability checks
- GitHub Pages compatible without build process

## Tech Stack

| Area | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Hosting | GitHub Pages |
| PWA | Web App Manifest, Service Worker, offline fallback |
| SEO | Meta tags, OpenGraph, Twitter Cards, JSON-LD, sitemap.xml, robots.txt |
| PDF Export | Browser print dialog with dedicated print CSS |
| QA | PowerShell check script |

## Project Structure

```text
.
├── index.html              # Main portfolio page
├── vita.html               # Vita / Resume page with PDF print support
├── impressum.html          # Legal notice
├── datenschutz.html        # Privacy policy
├── signals.html            # Hidden Signal Index / Easter Egg manual
├── 404.html                # Custom not-found page
├── offline.html            # PWA offline fallback
├── manifest.webmanifest    # Installable Web App metadata
├── sw.js                   # Service Worker and static cache strategy
├── style.css               # Complete styling including responsive and print layouts
├── app.js                  # Language switch, navigation, consent logic, animations, PDF print logic
├── sitemap.xml             # Sitemap for search engines
├── robots.txt              # Search engine crawling hints
├── QA.md                   # Local QA instructions
├── ROADMAP.md              # Project roadmap and design notes
├── tools/
│   ├── check-site.ps1      # Lightweight local validation script
│   ├── render-social-card.ps1
│   └── social-card.html    # Deterministic OpenGraph card source
└── image/
    ├── social-card.jpg     # OpenGraph / preview image
    ├── iconic.jpg          # Main visual asset
    ├── iconic-720.jpg      # Responsive image variant
    ├── iconic-960.jpg      # Responsive image variant
    ├── iconic-avatar.jpg   # Fullsize Iconic Mode source asset, kept out of the PWA precache
    ├── iconic-avatar-720.jpg # Session-only Iconic Mode hero source
    ├── iconic-avatar-960.jpg # Session-only Iconic Mode hero source
    ├── profile-avatar.jpg  # Header / graph avatar
    ├── pwa/                # Generated install icons and maskable app icons
    └── Cert/               # Certificate images and badges
```

## Progressive Web App

The homepage is installable as a Progressive Web App on supported browsers and platforms. GitHub Pages provides the required HTTPS layer; the repository provides the app metadata and local caching layer.

PWA files:

- `manifest.webmanifest` defines app name, scope, start URL, display mode, theme colors, shortcuts and icons.
- `sw.js` precaches the static portfolio shell and serves cached assets when available.
- `offline.html` is a styled fallback for navigation requests while offline.
- `image/pwa/` contains the generated PNG app icons, favicon sizes and maskable variants.
- The Command Palette contains `PWA Runtime`, which opens a small technical status panel for installability, standalone mode, cache readiness, update state, color scheme and Iconic Mode.
- When a new service worker build is waiting, the page shows a terminal-style update toast with a reload action.

Installed PWA name note: browsers read the app name from `manifest.webmanifest`, but an already installed Windows/Chrome/Edge app may keep the old shortcut name until the app is reinstalled or the browser refreshes its installed-web-app metadata. The manifest link is cache-busted so new installs pick up `phil.osophie.deluxe` immediately.

Important deployment note: whenever `style.css`, `app.js`, core HTML or relevant assets change, bump the cache version in the HTML query strings, `manifest.webmanifest` and `sw.js`. This prevents installed instances from holding an old interface shell too long.

## Design Direction

The visual concept is dark, precise and technical. Purple is used as a controlled accent color, while animated signal lines, restrained grid structures and responsive depth effects create a distinctive developer identity.

Key design principles:

- clean dark interface
- reduced but recognizable technical aesthetic
- expressive motion with reduced-motion and browser-specific fallbacks
- strong typography and clear section hierarchy
- portfolio content first, decoration second
- mobile-first interaction behavior
- accessible navigation and readable contrast

## Interaction System

The site uses a global custom cursor and a set of controlled pointer effects. These effects are intentionally desktop-only and respect `prefers-reduced-motion`. Touch devices keep the native interaction model.

### Custom Cursor

The cursor is generated in `app.js` by `setupHeroCursor()` and styled in `style.css` with the `.hero-code-cursor` family of selectors. Despite the original function name, the cursor is now global and no longer limited to the hero section.

Cursor states:

| State | Trigger | Behavior |
| --- | --- | --- |
| Default | normal page surface | code-shaped pointer with cyan/magenta/core layers |
| Action | links, buttons and interactive controls | stronger split-layer action state |
| Text | readable text, text inputs and contenteditable areas | smaller I-beam cursor in the same visual style |
| Idle | pointer remains still for about 12 seconds | temporary sleeping cursor code |
| Keyword | selected technical words | temporary context label such as `SQL`, `APEX`, `DB`, `JS`, `AI`, `FLOW` or `{PK}` |

Technical keyword reactions are now range-based. The cursor checks the actual text rectangle under the pointer instead of loosely scanning the surrounding paragraph. This makes the signal more stable on dense text, buttons, links, card titles and multi-word terms. Supported terms include `Phil Kirchner`, `Phil`, `Kirchner`, `PK`, `Oracle APEX`, `Oracle DB`, `Oracle`, `APEX`, `PL/SQL`, `SQL`, `SQL Server`, `Microsoft SQL Server`, `JavaScript`, `JS`, `TypeScript`, `TS`, `Java`, `HTML`, `CSS`, `JSON`, `XML`, `XSD`, `KI`, `AI`, `Git`, `GitHub`, `REST`, `RESTful`, `RESTful Services`, `REST Data Sources`, `API`, `Endpoint`, `DBMS`, `Datenbank`, `Datenmodell`, `Datenhaltung`, `Spring`, `Spring Boot`, `Vaadin`, `MVC`, `UML`, `OOP`, `Scrum`, `Kanban`, `Product Owner`, `PRINCE2`, `ITIL`, `Jira`, `Confluence`, `IntelliJ`, `MS Office`, `Software`, `Anwendungsentwicklung`, `Prozess`, `Workflow`, `Arbeitsfluss` and `Abläufe`. Hovering the name/brand signal uses the special cursor label `{PK}`.

### Tilt Cards and Glow

The tilt system is handled in `setupTiltCards()` and now covers project cards, stack cards, hero quick facts, Vita profile cards, the recruiter signal console, skill evolution cards, trust-chain panel, timeline entries and credential rows. Existing project and stack cards still use `data-tilt-card`; the remaining supported cards are registered at runtime with `.tilt-card-effect`. The logic writes CSS variables to the hovered card:

```text
--tilt-x
--tilt-y
--glow-x
--glow-y
```

During pointer movement, the card receives `.is-tilting`, which removes transform lag while preserving a smooth reset on pointer leave. Compact and very wide cards use reduced tilt strength so the motion stays controlled. The glow is deliberately restrained and sits below the content layer so the visual effect does not reduce text readability.

## Easter Eggs

The Easter eggs are intentionally subtle. They are implemented in `setupEasterEggs()` and are meant as hidden interface details, not primary navigation.

| Easter Egg | Trigger | Result |
| --- | --- | --- |
| Portfolio Boot | first page visit per session | short boot overlay, signal cut and staged interface unlock |
| Hero Terminal Unlock | directly after the session boot | hero headline appears briefly as a glitch-code layer and resolves into readable text |
| Navigation Boot | directly after the boot sequence | brand, navigation links and language switcher enter in staggered order |
| Cursor Handshake | after the boot reveal | custom cursor reports `INIT`, `AUTH` and `READY` before normal operation |
| First-Time Guide | once per session after the interface boot | subtle terminal hint for `Ctrl + K`, hidden routes and the custom context menu |
| Developer Mode | `ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A` | stronger developer state with large `PK_DEV_TERMINAL`, scan/grid overlay, outlined interface modules, typed shell-style output and cursor code `{PK}` |
| Cursor Sleep | leave the mouse still for about 12 seconds | cursor switches into an idle/sleeping state |
| Hero Terminal | keep the hero section visible for about 7 seconds | hidden terminal line appears in the hero area |
| Matrix Rain | type `matrix` on the keyboard | temporary Matrix-style rain overlay |
| DOM Comment | inspect the HTML source or DevTools DOM | hidden signal-layer comments are present |
| Section Signals | click decorative section numbers such as `01`, `02`, `03`, `04` | section number glows, content briefly fades/reboots, cards/data panels jitter and a thin scan line crosses the section without changing the section background |
| Language DEV Mode | click the `DE/EN/ES/JP` toggle 6 times quickly | temporary `DEV` language-state hint plus code-style monospace UI treatment |
| Boot Sequence | rare first page visit per session, or type `boot` on the keyboard | cinematic full-page startup overlay with large terminal window, typed boot commands, hidden page surface and staggered reveal of nav, hero, buttons and main content |
| Keyword Cursor | hover selected technology words or the name | cursor label changes contextually; name/brand hover emits `{PK}` |
| Secret Theme Shift | hold `Shift` and click the `PK` branding | temporary alternate theme shift |
| Secret Dev Console | press `Ctrl` + `Alt` + `D`, or use the cursor context menu | internal console with route, build info, stack, links and access to the Signal Index |
| Cursor Context Menu | hold `Ctrl` and right-click | custom command menu with Dev Console, copy link, Vita print, mail, GitHub and Avatar Hero actions |
| Signal Index | open the small footer signal or the Dev Console link | hidden `signals.html` page listing the known interaction signals; marked `noindex` and intentionally omitted from the main navigation |
| System Trace | click `trace profile` in the hero or run it from `Ctrl + K` | scans profile areas as `PROFILE_NODE`, `DELIVERY_MODULES`, `CAPABILITY_GRAPH`, `EXPERIENCE_LOG` and `TRUST_CHAIN` with animated links, terminal output and clickable navigation nodes |
| Command Palette | press `Ctrl + K` | command interface for profile trace, resume, stack focus, recruiter mode, mail, GitHub, Avatar Hero, Signal Index and Vita print |
| PWA Runtime | run `PWA Runtime` from the command palette | opens install/update/cache/standalone status for the installable app shell |
| Iconic Mode | `Ctrl + Alt + I`, Command Palette or Cursor Context Menu | switches the hero portrait and unlocks a session-only hacker interface theme with terminal typography, green signal colors and sharper panels |
| Live Skill Graph | click nodes in the stack section | capability graph emits short readouts for APEX, PL/SQL, JavaScript, data models, processes and delivery |
| Recruiter Mode | run `Recruiter Mode` from the command palette | decision panel with fit, differentiator, proof points, best-fit roles, skill matrix, PDF export and copy-mail |
| Bootable Vita | click `play timeline` on the Vita page | plays the career timeline as an `EXPERIENCE_LOG`, opens the station logs and focuses entries one after another |

The effects are session-safe and temporary. They do not store analytics, do not call external services and do not change the content model of the site. Section-number triggers are invisible buttons positioned directly over the decorative numbers, so the Easter egg remains discoverable through the number itself and does not create layout spacing. The Boot Sequence appears once per session, while the hidden keyboard trigger `boot` exists so the startup animation can be tested deterministically. The Signal Index is deliberately discoverable through hidden interface routes instead of the primary navigation.

## Social Preview

The OpenGraph preview image is generated from `tools/social-card.html` so the layout is deterministic and text stays exact. Re-render it with:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\render-social-card.ps1
```

The output is written to `image/social-card.jpg`.

## Vita and PDF Export

The Vita page includes a dedicated print mode for generating complete PDF files directly through the browser. The visual web version intentionally has more character: a recruiter signal console, profile-fit matrix, skill evolution cards, animated trust chain and clickable bootable timeline entries with station-specific skill tags. These interface layers are excluded from the print document so the exported PDF stays compact and clean.

The recruiter-facing layer is intentionally substance-first: it explains why the path from gastronomy, purchasing and process responsibility into software development matters, where the profile fits, where it does not fit, and which proof chain supports that claim.

The print implementation uses:

- a separate print-only CV structure
- A4-specific CSS rules
- reduced spacing and controlled typography
- hidden website-only elements during printing
- language-aware document titles
- four-language localization with dedicated DE/EN/ES/JP dictionaries, query-parameter URLs and Japanese font fallbacks where needed
- layout stabilization before `window.print()`
- the cursor context menu action `Vita drucken`

This keeps the exported PDF complete, compact and independent from the visual website layout.

## Privacy Approach

The site avoids unnecessary external dependencies.

- no analytics
- no tracking scripts
- no marketing cookies
- no external font loading
- local storage only for consent and optional language preference
- service worker cache only for static app shell and portfolio assets
- transparent privacy and legal pages

## Local Usage

The project can be opened directly in the browser because it is a static website.

Recommended local test server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## QA Checks

A lightweight PowerShell check script is included:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1
```

For the deeper local PWA audit:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1 -Pwa
```

The `-Pwa` mode checks manifest installability fields, icon sizes, maskable icons, service-worker update/offline hooks, page-level PWA metadata and JSON-LD presence on the profile pages.

Optional visual smoke screenshots:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1 -Screenshots
```

Screenshot mode requires local Chrome headless file output. It fails deliberately if the `_qa_*.png` files are not created.

Manual checks before publishing:

- test homepage on desktop and mobile
- open and close mobile navigation
- switch language between DE, EN, ES and JP
- test Vita PDF export in all four languages
- verify Impressum and Datenschutz links
- verify LinkedIn and GitHub links
- check cookie settings flow
- test `Ctrl + K`, `Ctrl + right click`, `Ctrl + Alt + D`, `Ctrl + Alt + I`, `trace profile`, Recruiter Mode and `play timeline`
- verify installability in Chrome or Edge via DevTools Application / Manifest
- test PWA offline fallback after one successful online load
- test Firefox, Chrome and Edge rendering

## Deployment

The project is ready for GitHub Pages.

Expected publishing setup:

```text
Repository Settings
→ Pages
→ Deploy from branch
→ main / root
```

No package installation, build command or deployment pipeline is required.

## Roadmap

Planned or possible future improvements:

- add real project case studies with screenshots and repository links
- extract i18n texts from `app.js` into separate JSON files
- add WebP / AVIF image variants
- add automated GitHub Action for link and syntax checks
- extend project cards with measurable outcomes

## Author

**Phil Kirchner**  
Software Developer · Oracle APEX · PL/SQL · JavaScript

```text
GitHub:   https://github.com/philosophiedeluxe
LinkedIn: https://www.linkedin.com/in/phil-kirchner/
Website:  https://philosophiedeluxe.github.io/my_homepage/
```

## License

This is a personal portfolio project. Content, images and personal branding assets are not intended for reuse without permission.


### Language switcher

The navigation uses a compact animated language selector for German, English, Spanish and Japanese. `DE`, `EN`, `ES` and `JP` are direct selection buttons exposed through a hover/focus dropdown instead of a pure cycle toggle. The active language is visibly highlighted inside the selector without an additional status dot. The selector keeps the dark glass/interface look and uses `#f0a83a` for the language-control border, active segment and signal underline so it matches the warm system accents used elsewhere in the navigation.
