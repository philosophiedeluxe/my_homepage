# QA and Deploy Checks

Run the lightweight local check before publishing:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1
```

For visual smoke screenshots:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-site.ps1 -Screenshots
```

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
5. Use `Shift + right click` and verify the custom context menu opens without stuck hover states.
6. Test context menu commands: Dev Console, Copy Link, Vita drucken, Mail and GitHub.
7. Switch DE, EN and JP and verify hidden links plus context menu labels update with the active language.
8. Type `matrix` and `boot`, then test the Konami code and section-number signals after the animation finishes.
9. Press `Ctrl + K` and verify the Command Palette can run Profile Trace, Stack focus, Recruiter Mode and Signal Index.
10. Click `trace profile` in the hero and verify trace nodes, terminal output and close behavior.
11. Click Live Skill Graph nodes in the stack section and verify the readout updates.
12. On `vita.html`, click `play timeline` and verify the timeline entries are highlighted one after another.
13. Print/PDF check: verify Command Palette, System Trace, Recruiter Mode, Skill Graph and Timeline Playback do not appear in the PDF output.
