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
