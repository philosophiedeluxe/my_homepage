# QA and Deploy Checks

Run the lightweight local check before publishing:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1
```

For visual smoke screenshots:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1 -Screenshots
```

The screenshot mode validates that Chrome actually writes `_qa_*.png` files. If it fails with `Screenshot was not created`, run it from a normal local PowerShell session where Chrome headless is allowed to create files in the repository root.

Firefox profiling pass:

1. Open `index.html` in Firefox.
2. Open `about:profiling`.
3. Use the Web Developer preset.
4. Start recording, scroll from Hero to Vita/Project sections and back, then stop.
5. Check whether time is dominated by Paint, Layout or JavaScript before changing effects.

Hidden interface checks:

1. Open `signals.html` directly and verify that the page uses the same dark technical interface style.
2. Confirm `signals.html` has `noindex` metadata and is not listed in the primary navigation.
3. Use the small footer signal link and the Secret Dev Console link to reach the Signal Index.
4. Press `Ctrl + Alt + D` and verify the Secret Dev Console opens, closes and keeps inert behavior while closed.
5. Use `Ctrl + right click` and verify the custom context menu opens without stuck hover states.
6. Test context menu commands: Dev Console, Copy Link, Vita drucken, Mail, GitHub and Avatar Hero.
7. Switch DE, EN, ES and JP and verify hidden links plus context menu labels update with the active language.
8. Type `matrix` and `boot`, then test the Konami code and section-number signals after the animation finishes.
9. Press `Ctrl + K` and verify the Command Palette can run Profile Trace, Stack focus, Recruiter Mode, Avatar Hero and Signal Index.
10. After a fresh session boot, verify the small First-Time Guide appears once and can open the Command Palette.
11. Click `trace profile` in the hero and verify trace nodes, terminal output, close behavior and node navigation.
12. Run Recruiter Mode and verify best-fit roles, skill matrix, PDF export, copy-mail and GitHub action.
13. Click Live Skill Graph nodes in the stack section and verify the readout updates.
14. On `vita.html`, click each timeline entry and verify the station log expands/collapses. Then click `play timeline` and verify the entries open and highlight one after another.
15. Mobile smoke: check nav, Command Palette, trace overlay, Recruiter Mode, certificate lightbox and cookie panel at a narrow viewport.
16. Social preview: run `tools\render-social-card.ps1` after visual copy changes and inspect `image\social-card.jpg`.
17. Press `Ctrl + Alt + I` and verify the Iconic Hero switches only for the current browser session.
18. Print/PDF check: verify Command Palette, System Trace, Recruiter Mode, Skill Graph, First-Time Guide, Timeline Playback and expanded timeline logs do not appear in the PDF output.

PWA checks:

1. Run `powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1` and confirm manifest and service worker checks pass.
2. Serve the repository through `python -m http.server 8000` or publish to GitHub Pages; service workers do not run from `file://`.
3. In Chrome or Edge DevTools, open Application > Manifest and confirm name, icons, start URL, scope and installability.
4. Install the app and verify it opens in standalone mode without browser chrome.
5. After one successful online load, switch DevTools Network to Offline and reload `index.html`; the cached page or `offline.html` fallback should appear.
6. After changing cached files, bump the cache version in HTML asset URLs, `manifest.webmanifest` and `sw.js`.
