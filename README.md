# Phil Kirchner Portfolio

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-6C00A1?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-static-111111?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-responsive-111111?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-111111?style=for-the-badge&logo=javascript)

A modern, bilingual portfolio website for a software developer with a strong focus on Oracle APEX, PL/SQL, JavaScript and business-oriented application development.

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
- Scroll progress, active section navigation and pointer-reactive depth effects
- Animated technology stream and visual project modules
- German and English language switch
- Dedicated Vita / Resume page
- Browser-based PDF export for the German Vita and English Resume
- Print-optimized A4 layout for complete one-page PDF generation
- Project spotlight section
- Technology stack overview
- Certificate section with visual assets
- SEO basics with canonical URLs, OpenGraph metadata and Twitter Card metadata
- JSON-LD structured data for better search engine context
- Privacy-friendly setup without analytics or marketing cookies
- Local consent handling for cookie and language preferences
- Dedicated legal pages for Impressum and Datenschutz
- Custom 404 page
- Lightweight QA script for local checks
- GitHub Pages compatible without build process

## Tech Stack

| Area | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Hosting | GitHub Pages |
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
├── 404.html                # Custom not-found page
├── style.css               # Complete styling including responsive and print layouts
├── app.js                  # Language switch, navigation, consent logic, animations, PDF print logic
├── sitemap.xml             # Sitemap for search engines
├── robots.txt              # Search engine crawling hints
├── QA.md                   # Local QA instructions
├── ROADMAP.md              # Project roadmap and design notes
├── tools/
│   └── check-site.ps1      # Lightweight local validation script
└── image/
    ├── social-card.jpg     # OpenGraph / preview image
    ├── iconic.jpg          # Main visual asset
    ├── iconic-720.jpg      # Responsive image variant
    ├── iconic-960.jpg      # Responsive image variant
    └── Cert/               # Certificate images and badges
```

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

## Vita and PDF Export

The Vita page includes a dedicated print mode for generating complete PDF files directly through the browser.

The print implementation uses:

- a separate print-only CV structure
- A4-specific CSS rules
- reduced spacing and controlled typography
- hidden website-only elements during printing
- language-aware document titles
- layout stabilization before `window.print()`

This keeps the exported PDF complete, compact and independent from the visual website layout.

## Privacy Approach

The site avoids unnecessary external dependencies.

- no analytics
- no tracking scripts
- no marketing cookies
- no external font loading
- local storage only for consent and optional language preference
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

Optional visual smoke screenshots:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1 -Screenshots
```

Manual checks before publishing:

- test homepage on desktop and mobile
- open and close mobile navigation
- switch language between DE and EN
- test Vita PDF export in both languages
- verify Impressum and Datenschutz links
- verify LinkedIn and GitHub links
- check cookie settings flow
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
