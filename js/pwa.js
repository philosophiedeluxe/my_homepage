/** Progressive Web App runtime and install/update controls. */
export function setupProgressiveWebApp({ root, finePointer, defaultLang, localizedPageHref, serviceWorkerUrl = "./sw.js" }) {
  const DEFAULT_LANG = defaultLang;
    const isLocalhost = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
    const secureRuntime = window.location.protocol === "https:" || isLocalhost;
    const displayStandalone = window.matchMedia("(display-mode: standalone)");
    const displayFullscreen = window.matchMedia("(display-mode: fullscreen)");
    const displayMinimalUi = window.matchMedia("(display-mode: minimal-ui)");
    let deferredInstallPrompt = null;
    let waitingWorker = null;
    let reloadingForUpdate = false;
    let runtimeDismissed = false;
    const status = {
      supported: "serviceWorker" in navigator,
      secure: secureRuntime,
      installable: false,
      installed: false,
      standalone: Boolean(window.navigator.standalone) || displayStandalone.matches || displayFullscreen.matches || displayMinimalUi.matches,
      controlled: Boolean(navigator.serviceWorker?.controller),
      cacheReady: false,
      updateReady: false,
      colorScheme: window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    };
    const labels = {
      de: {
        title: "POD_APP_RUNTIME",
        install: "App installieren",
        open: "Runtime anzeigen",
        reload: "Neu laden",
        ready: "offline cache ready",
        standby: "pwa standby",
        unsupported: "service worker offline",
        installable: "install app",
        installed: "standalone mode detected",
        controlled: "service worker active",
        update: "new build available",
        updated: "build switch armed",
        dark: "dark runtime",
        light: "light runtime",
        iconic: "iconic mode detected",
        appShell: "App Runtime",
        online: "online",
        offline: "offline shell active",
        standalone: "standalone",
        dashboard: "App Dashboard",
        cacheCheck: "Cache prüfen",
        snapshot: "Snapshot kopieren",
        diagnostic: "Offline Diagnose",
        appNav: "NAV",
        openProfile: "Profil",
        openVita: "Vita",
        openStack: "Stack",
        openTrace: "Trace",
        openCommand: "Command",
        cachedProfile: "cached profile available",
        cachedVita: "vita cached",
        cachedSignals: "signals cached",
        snapshotReady: "profile snapshot copied",
        diagnosticReady: "offline diagnostic complete",
        runtimeRestored: "runtime restored"
      },
      en: {
        title: "POD_APP_RUNTIME",
        install: "Install app",
        open: "Show runtime",
        reload: "Reload",
        ready: "offline cache ready",
        standby: "pwa standby",
        unsupported: "service worker offline",
        installable: "install app",
        installed: "standalone mode detected",
        controlled: "service worker active",
        update: "new build available",
        updated: "build switch armed",
        dark: "dark runtime",
        light: "light runtime",
        iconic: "iconic mode detected",
        appShell: "App Runtime",
        online: "online",
        offline: "offline shell active",
        standalone: "standalone",
        dashboard: "App Dashboard",
        cacheCheck: "Check cache",
        snapshot: "Copy snapshot",
        diagnostic: "Offline diagnostic",
        appNav: "NAV",
        openProfile: "Profile",
        openVita: "Resume",
        openStack: "Stack",
        openTrace: "Trace",
        openCommand: "Command",
        cachedProfile: "cached profile available",
        cachedVita: "resume cached",
        cachedSignals: "signals cached",
        snapshotReady: "profile snapshot copied",
        diagnosticReady: "offline diagnostic complete",
        runtimeRestored: "runtime restored"
      },
      es: {
        title: "POD_APP_RUNTIME",
        install: "Instalar app",
        open: "Mostrar runtime",
        reload: "Recargar",
        ready: "offline cache ready",
        standby: "pwa standby",
        unsupported: "service worker offline",
        installable: "install app",
        installed: "standalone mode detected",
        controlled: "service worker active",
        update: "new build available",
        updated: "build switch armed",
        dark: "dark runtime",
        light: "light runtime",
        iconic: "iconic mode detected",
        appShell: "App Runtime",
        online: "online",
        offline: "offline shell active",
        standalone: "standalone",
        dashboard: "App Dashboard",
        cacheCheck: "Comprobar cache",
        snapshot: "Copiar snapshot",
        diagnostic: "Diagnostico offline",
        appNav: "NAV",
        openProfile: "Perfil",
        openVita: "Vita",
        openStack: "Stack",
        openTrace: "Trace",
        openCommand: "Command",
        cachedProfile: "cached profile available",
        cachedVita: "vita cached",
        cachedSignals: "signals cached",
        snapshotReady: "profile snapshot copied",
        diagnosticReady: "offline diagnostic complete",
        runtimeRestored: "runtime restored"
      },
      ja: {
        title: "POD_APP_RUNTIME",
        install: "App install",
        open: "Runtime表示",
        reload: "Reload",
        ready: "offline cache ready",
        standby: "pwa standby",
        unsupported: "service worker offline",
        installable: "install app",
        installed: "standalone mode detected",
        controlled: "service worker active",
        update: "new build available",
        updated: "build switch armed",
        dark: "dark runtime",
        light: "light runtime",
        iconic: "iconic mode detected",
        appShell: "App Runtime",
        online: "online",
        offline: "offline shell active",
        standalone: "standalone",
        dashboard: "App Dashboard",
        cacheCheck: "Cache check",
        snapshot: "Snapshot copy",
        diagnostic: "Offline diagnostic",
        appNav: "NAV",
        openProfile: "Profile",
        openVita: "Vita",
        openStack: "Stack",
        openTrace: "Trace",
        openCommand: "Command",
        cachedProfile: "cached profile available",
        cachedVita: "vita cached",
        cachedSignals: "signals cached",
        snapshotReady: "profile snapshot copied",
        diagnosticReady: "offline diagnostic complete",
        runtimeRestored: "runtime restored"
      }
    };

    const runtime = document.createElement("aside");
    runtime.className = "pwa-runtime-panel";
    runtime.setAttribute("aria-live", "polite");
    runtime.setAttribute("aria-label", "PWA runtime status");
    runtime.innerHTML = `
      <div class="pwa-runtime-panel__bar">
        <span aria-hidden="true"><b></b><b></b><b></b></span>
        <strong></strong>
        <button type="button" data-pwa-runtime-dismiss aria-label="Runtime ausblenden">×</button>
      </div>
      <div class="pwa-runtime-panel__body">
        <p data-pwa-runtime-line></p>
        <div class="pwa-runtime-panel__chips" data-pwa-runtime-chips></div>
        <div class="pwa-runtime-panel__cache" data-pwa-cache-status></div>
      </div>
      <div class="pwa-runtime-panel__actions">
        <button type="button" data-pwa-install></button>
        <button type="button" data-pwa-reload></button>
        <button type="button" data-pwa-cache-check></button>
        <button type="button" data-pwa-snapshot></button>
        <button type="button" data-pwa-diagnostic></button>
      </div>
    `;
    document.body.appendChild(runtime);

    const appShell = document.createElement("aside");
    appShell.className = "pwa-app-shell";
    appShell.setAttribute("aria-hidden", "true");
    appShell.innerHTML = `
      <button type="button" class="pwa-app-shell__tab" data-pwa-shell-toggle aria-expanded="false" aria-label="App Runtime">
        <span>APP</span>
      </button>
      <button type="button" class="pwa-app-shell__main" data-pwa-dashboard aria-expanded="false">
        <span aria-hidden="true"></span>
        <strong data-pwa-app-title></strong>
        <em data-pwa-app-state></em>
      </button>
      <div class="pwa-app-shell__chips" data-pwa-app-chips></div>
    `;
    document.body.appendChild(appShell);
    let appShellExpanded = false;
    let appShellPointerStart = 0;
    let appShellHoverSuppressed = false;

    const bottomBar = document.createElement("nav");
    bottomBar.className = "pwa-bottom-bar";
    bottomBar.setAttribute("aria-label", "PWA Schnellnavigation");
    bottomBar.innerHTML = `
      <button type="button" class="pwa-bottom-bar__handle" data-pwa-nav-toggle aria-expanded="false">
        <span aria-hidden="true"></span>
        <b data-pwa-nav-title></b>
      </button>
      <a href="./index.html#profil" data-pwa-nav="profile"><span>01</span><b></b></a>
      <a href="./vita.html" data-pwa-nav="vita"><span>02</span><b></b></a>
      <a href="./index.html#stack" data-pwa-nav="stack"><span>03</span><b></b></a>
      <button type="button" data-pwa-nav="trace"><span>04</span><b></b></button>
      <button type="button" data-pwa-nav="command"><span>05</span><b></b></button>
    `;
    document.body.appendChild(bottomBar);
    let bottomNavExpanded = false;
    let bottomNavPointerStart = 0;
    let bottomNavHoverSuppressed = false;

    const resumeToast = document.createElement("div");
    resumeToast.className = "pwa-resume-toast";
    resumeToast.setAttribute("aria-live", "polite");
    document.body.appendChild(resumeToast);

    function copy() {
      return labels[document.documentElement.dataset.lang || DEFAULT_LANG] || labels[DEFAULT_LANG];
    }

    function updateRuntimeClasses() {
      root.classList.toggle("runtime-pwa-supported", status.supported);
      root.classList.toggle("runtime-pwa-secure", status.secure);
      root.classList.toggle("runtime-pwa-installable", status.installable);
      root.classList.toggle("runtime-pwa-installed", status.installed || status.standalone);
      root.classList.toggle("runtime-pwa-standalone", status.standalone);
      root.classList.toggle("runtime-pwa-controlled", status.controlled);
      root.classList.toggle("runtime-pwa-cache-ready", status.cacheReady);
      root.classList.toggle("runtime-pwa-update-ready", status.updateReady);
      root.classList.toggle("runtime-color-light", status.colorScheme === "light");
      root.classList.toggle("runtime-color-dark", status.colorScheme !== "light");
    }

    function statusLine() {
      const text = copy();
      if (!status.supported || !status.secure) return text.unsupported;
      if (status.updateReady) return text.update;
      if (!navigator.onLine) return text.offline;
      if (status.standalone || status.installed) return text.installed;
      if (status.installable) return text.installable;
      if (status.cacheReady || status.controlled) return text.ready;
      return text.standby;
    }

    function cacheStatusItems() {
      const text = copy();
      return [
        { key: "profile", label: text.cachedProfile, href: "./index.html" },
        { key: "vita", label: text.cachedVita, href: "./vita.html" },
        { key: "signals", label: text.cachedSignals, href: "./signals.html" }
      ];
    }

    function renderCacheStatus(results = null) {
      const holder = runtime.querySelector("[data-pwa-cache-status]");
      if (!holder) return;
      holder.innerHTML = cacheStatusItems().map((item) => {
        const state = results ? (results[item.key] ? "ok" : "miss") : "idle";
        return `<span data-cache-state="${state}"><b>${state}</b>${item.label}</span>`;
      }).join("");
    }

    function renderAppShell() {
      const text = copy();
      const active = status.standalone || status.installed;
      appShell.setAttribute("aria-hidden", active ? "false" : "true");
      bottomBar.setAttribute("aria-hidden", active ? "false" : "true");
      appShell.querySelector("[data-pwa-app-title]").textContent = text.appShell;
      appShell.querySelector("[data-pwa-app-state]").textContent = statusLine();
      const chips = [
        status.standalone ? text.standalone : null,
        navigator.onLine ? text.online : text.offline,
        status.cacheReady || status.controlled ? text.ready : text.standby
      ].filter(Boolean);
      appShell.querySelector("[data-pwa-app-chips]").innerHTML = chips.map((chip) => `<span>${chip}</span>`).join("");
      bottomBar.querySelector("[data-pwa-nav='profile'] b").textContent = text.openProfile;
      bottomBar.querySelector("[data-pwa-nav='vita'] b").textContent = text.openVita;
      bottomBar.querySelector("[data-pwa-nav='stack'] b").textContent = text.openStack;
      bottomBar.querySelector("[data-pwa-nav='trace'] b").textContent = text.openTrace;
      bottomBar.querySelector("[data-pwa-nav='command'] b").textContent = text.openCommand;
      bottomBar.querySelector("[data-pwa-nav-title]").textContent = text.appNav;
      bottomBar.classList.toggle("is-offline", !navigator.onLine);
      appShell.classList.toggle("is-offline", !navigator.onLine);
    }

    function setAppShellExpanded(expanded) {
      appShellExpanded = Boolean(expanded);
      appShell.classList.toggle("is-expanded", appShellExpanded);
      appShell.querySelectorAll("[data-pwa-shell-toggle], [data-pwa-dashboard]").forEach((button) => {
        button.setAttribute("aria-expanded", String(appShellExpanded));
      });
    }

    function setBottomNavExpanded(expanded) {
      bottomNavExpanded = Boolean(expanded);
      bottomBar.classList.toggle("is-expanded", bottomNavExpanded);
      bottomBar.setAttribute("aria-expanded", String(bottomNavExpanded));
      bottomBar.querySelector("[data-pwa-nav-toggle]")?.setAttribute("aria-expanded", String(bottomNavExpanded));
    }

    function showResumeToast(message) {
      if (!message || !(status.standalone || status.installed || !navigator.onLine)) return;
      if (status.standalone && !finePointer.matches) return;
      resumeToast.textContent = `> ${message}`;
      resumeToast.classList.add("is-visible");
      window.clearTimeout(showResumeToast.timer);
      showResumeToast.timer = window.setTimeout(() => resumeToast.classList.remove("is-visible"), 3200);
    }

    async function inspectCache() {
      const results = { profile: false, vita: false, signals: false };
      if (!("caches" in window)) return results;
      const items = cacheStatusItems();
      await Promise.all(items.map(async (item) => {
        try {
          const request = new Request(item.href, { cache: "reload" });
          results[item.key] = Boolean(await caches.match(request)) || Boolean(await caches.match(item.href));
        } catch (error) {
          results[item.key] = false;
        }
      }));
      return results;
    }

    async function checkCacheStatus(announce = true) {
      const results = await inspectCache();
      renderCacheStatus(results);
      if (announce) {
        runtime.querySelector("[data-pwa-runtime-line]").textContent = copy().diagnosticReady;
        showResumeToast(copy().diagnosticReady);
      }
      return results;
    }

    async function runOfflineDiagnostic() {
      const results = await inspectCache();
      renderCacheStatus(results);
      const routeState = Object.entries(results)
        .map(([route, cached]) => `${route}:${cached ? "cached" : "missing"}`)
        .join(" | ");
      const runtimeState = [
        status.secure ? "secure" : "insecure",
        status.supported ? "sw-supported" : "sw-unsupported",
        status.controlled ? "sw-controlled" : "sw-uncontrolled",
        navigator.onLine ? "online" : "offline"
      ].join(" | ");
      runtime.querySelector("[data-pwa-runtime-line]").textContent = `diagnostic :: ${runtimeState} :: ${routeState}`;
      showResumeToast(copy().diagnosticReady);
      return { ...results, runtimeState };
    }

    async function copyProfileSnapshot() {
      const snapshot = [
        "phil.osophie.deluxe",
        "Business Software | Oracle APEX | PL/SQL | JavaScript | Java",
        `route: ${window.location.pathname}${window.location.hash || ""}`,
        `runtime: ${status.standalone ? "standalone" : "browser"} / ${navigator.onLine ? "online" : "offline"}`,
        "fit: business apps, data quality, delivery, process-aware development"
      ].join("\n");
      try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
          await navigator.clipboard.writeText(snapshot);
        } else {
          const field = document.createElement("textarea");
          field.value = snapshot;
          field.setAttribute("readonly", "");
          field.style.position = "fixed";
          field.style.left = "-9999px";
          document.body.appendChild(field);
          field.select();
          document.execCommand("copy");
          field.remove();
        }
        showResumeToast(copy().snapshotReady);
        runtime.querySelector("[data-pwa-runtime-line]").textContent = copy().snapshotReady;
      } catch (error) {
        window.location.href = `mailto:phil.kirchner.999@googlemail.com?subject=Portfolio%20Snapshot&body=${encodeURIComponent(snapshot)}`;
      }
    }

    function renderRuntimePanel(forceVisible = false) {
      const text = copy();
      if (forceVisible) {
        runtimeDismissed = false;
        setAppShellExpanded(false);
      }
      runtime.querySelector(".pwa-runtime-panel__bar strong").textContent = text.title;
      runtime.querySelector("[data-pwa-runtime-line]").textContent = statusLine();
      const chips = [
        status.cacheReady || status.controlled ? text.controlled : text.standby,
        navigator.onLine ? text.online : text.offline,
        status.colorScheme === "light" ? text.light : text.dark,
        root.classList.contains("iconic-avatar-active") ? text.iconic : null
      ].filter(Boolean);
      runtime.querySelector("[data-pwa-runtime-chips]").innerHTML = chips.map((chip) => `<span>${chip}</span>`).join("");
      renderCacheStatus();
      const installButton = runtime.querySelector("[data-pwa-install]");
      const reloadButton = runtime.querySelector("[data-pwa-reload]");
      const cacheButton = runtime.querySelector("[data-pwa-cache-check]");
      const snapshotButton = runtime.querySelector("[data-pwa-snapshot]");
      const diagnosticButton = runtime.querySelector("[data-pwa-diagnostic]");
      installButton.textContent = text.install;
      reloadButton.textContent = text.reload;
      cacheButton.textContent = text.cacheCheck;
      snapshotButton.textContent = text.snapshot;
      diagnosticButton.textContent = text.diagnostic;
      installButton.hidden = !status.installable || status.standalone || status.installed;
      reloadButton.hidden = !status.updateReady;
      runtime.classList.toggle("is-update-ready", status.updateReady);
      runtime.classList.toggle("is-visible", forceVisible || (status.updateReady && !runtimeDismissed));
      updateRuntimeClasses();
      renderAppShell();
    }

    async function installApp() {
      if (!deferredInstallPrompt) {
        runtime.classList.add("is-visible");
        renderRuntimePanel(true);
        return;
      }
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice.catch(() => null);
      if (choice?.outcome === "accepted") {
        status.installed = true;
        status.installable = false;
        deferredInstallPrompt = null;
      }
      renderRuntimePanel(true);
    }

    function showUpdateAvailable(worker) {
      waitingWorker = worker;
      status.updateReady = true;
      runtimeDismissed = false;
      renderRuntimePanel(true);
    }

    function reloadToLatestBuild() {
      if (!waitingWorker) {
        window.location.reload();
        return;
      }
      reloadingForUpdate = true;
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      runtime.querySelector("[data-pwa-runtime-line]").textContent = copy().updated;
    }

    runtime.querySelector("[data-pwa-runtime-dismiss]").addEventListener("click", () => {
      runtimeDismissed = true;
      runtime.classList.remove("is-visible");
    });
    runtime.querySelector("[data-pwa-install]").addEventListener("click", installApp);
    runtime.querySelector("[data-pwa-reload]").addEventListener("click", reloadToLatestBuild);
    runtime.querySelector("[data-pwa-cache-check]").addEventListener("click", () => checkCacheStatus(true));
    runtime.querySelector("[data-pwa-snapshot]").addEventListener("click", copyProfileSnapshot);
    runtime.querySelector("[data-pwa-diagnostic]").addEventListener("click", runOfflineDiagnostic);
    appShell.addEventListener("click", (event) => {
      const runtimeButton = event.target.closest("[data-pwa-dashboard]");
      if (runtimeButton) {
        appShellHoverSuppressed = true;
        setAppShellExpanded(false);
        renderRuntimePanel(true);
        return;
      }
      if (!event.target.closest("[data-pwa-shell-toggle]")) return;
      const nextState = !appShellExpanded;
      appShellHoverSuppressed = !nextState;
      setAppShellExpanded(nextState);
    });
    appShell.addEventListener("pointerenter", () => {
      if (finePointer.matches && !appShellHoverSuppressed) setAppShellExpanded(true);
    });
    appShell.addEventListener("pointerleave", () => {
      appShellHoverSuppressed = false;
      if (finePointer.matches) setAppShellExpanded(false);
    });
    appShell.addEventListener("pointerdown", (event) => {
      appShellPointerStart = event.clientX;
    }, { passive: true });
    appShell.addEventListener("pointerup", (event) => {
      if (!appShellPointerStart) return;
      const delta = event.clientX - appShellPointerStart;
      if (delta < -18) {
        appShellHoverSuppressed = false;
        setAppShellExpanded(true);
      }
      if (delta > 18) {
        appShellHoverSuppressed = true;
        setAppShellExpanded(false);
      }
      appShellPointerStart = 0;
    }, { passive: true });
    bottomBar.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-pwa-nav-toggle]");
      if (toggle) {
        const nextState = !bottomNavExpanded;
        bottomNavHoverSuppressed = !nextState;
        setBottomNavExpanded(nextState);
        return;
      }
      if (event.target.closest("[data-pwa-nav='trace']")) {
        document.dispatchEvent(new CustomEvent("pk:run-system-trace"));
      }
      if (event.target.closest("[data-pwa-nav='command']")) {
        document.dispatchEvent(new CustomEvent("pk:open-command-palette"));
      }
      if (event.target.closest("[data-pwa-nav]")) setBottomNavExpanded(false);
    });
    bottomBar.addEventListener("pointerenter", () => {
      if (finePointer.matches && !bottomNavHoverSuppressed) setBottomNavExpanded(true);
    });
    bottomBar.addEventListener("pointerleave", () => {
      bottomNavHoverSuppressed = false;
      if (finePointer.matches) setBottomNavExpanded(false);
    });
    bottomBar.addEventListener("pointerdown", (event) => {
      bottomNavPointerStart = event.clientY;
    }, { passive: true });
    bottomBar.addEventListener("pointerup", (event) => {
      if (!bottomNavPointerStart) return;
      const delta = event.clientY - bottomNavPointerStart;
      if (delta < -24) {
        bottomNavHoverSuppressed = false;
        setBottomNavExpanded(true);
      }
      if (delta > 24) {
        bottomNavHoverSuppressed = true;
        setBottomNavExpanded(false);
      }
      bottomNavPointerStart = 0;
    }, { passive: true });
    document.addEventListener("pk:lang-change", () => renderRuntimePanel(runtime.classList.contains("is-visible")));
    document.addEventListener("pk:pwa-runtime-open", () => renderRuntimePanel(true));
    document.addEventListener("pk:pwa-cache-check", () => {
      renderRuntimePanel(true);
      checkCacheStatus(true);
    });
    document.addEventListener("pk:pwa-copy-snapshot", copyProfileSnapshot);
    document.addEventListener("pk:pwa-offline-diagnostic", () => {
      renderRuntimePanel(true);
      runOfflineDiagnostic();
    });
    document.addEventListener("pk:pwa-reload-build", reloadToLatestBuild);
    document.addEventListener("pk:pwa-install", installApp);
    document.addEventListener("pk:toggle-iconic-avatar", () => window.setTimeout(() => renderRuntimePanel(runtime.classList.contains("is-visible")), 40));
    document.addEventListener("pointerdown", (event) => {
      const target = event.target;
      if (appShellExpanded && !appShell.contains(target)) {
        appShellHoverSuppressed = false;
        setAppShellExpanded(false);
      }
      if (bottomNavExpanded && !bottomBar.contains(target)) {
        bottomNavHoverSuppressed = false;
        setBottomNavExpanded(false);
      }
    }, { capture: true });

    window.addEventListener("online", () => {
      renderRuntimePanel(runtime.classList.contains("is-visible"));
      showResumeToast(copy().online);
    });
    window.addEventListener("offline", () => {
      renderRuntimePanel(true);
      showResumeToast(copy().offline);
    });

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      status.installable = true;
      renderRuntimePanel(false);
    });

    window.addEventListener("appinstalled", () => {
      status.installed = true;
      status.installable = false;
      deferredInstallPrompt = null;
      renderRuntimePanel(true);
      showResumeToast(copy().runtimeRestored);
    });

    const updateDisplayMode = () => {
      status.standalone = Boolean(window.navigator.standalone) || displayStandalone.matches || displayFullscreen.matches || displayMinimalUi.matches;
      renderRuntimePanel(runtime.classList.contains("is-visible"));
      if (status.standalone) showResumeToast(copy().runtimeRestored);
    };
    [displayStandalone, displayFullscreen, displayMinimalUi].forEach((query) => query.addEventListener?.("change", updateDisplayMode));
    window.matchMedia("(prefers-color-scheme: light)").addEventListener?.("change", (event) => {
      status.colorScheme = event.matches ? "light" : "dark";
      renderRuntimePanel(runtime.classList.contains("is-visible"));
    });
    window.addEventListener("scroll", () => {
      if (appShellExpanded) {
        appShellHoverSuppressed = false;
        setAppShellExpanded(false);
      }
      if (bottomNavExpanded) {
        bottomNavHoverSuppressed = false;
        setBottomNavExpanded(false);
      }
    }, { passive: true });

    window.pkPwaRuntime = {
      getStatus: () => ({ ...status }),
      open: () => renderRuntimePanel(true),
      install: installApp,
      checkCache: checkCacheStatus,
      diagnose: runOfflineDiagnostic,
      copySnapshot: copyProfileSnapshot,
      reload: reloadToLatestBuild
    };

    renderRuntimePanel(false);
    setAppShellExpanded(false);
    setBottomNavExpanded(false);

    if (!status.supported || !status.secure) return;

    function registerServiceWorker() {
      navigator.serviceWorker.register(serviceWorkerUrl, { scope: "./" })
        .then((registration) => {
          const inspectRegistration = () => {
            status.controlled = Boolean(navigator.serviceWorker.controller);
            status.cacheReady = Boolean(registration.active || navigator.serviceWorker.controller);
            if (registration.waiting && navigator.serviceWorker.controller) showUpdateAvailable(registration.waiting);
            renderRuntimePanel(runtime.classList.contains("is-visible"));
          };

          inspectRegistration();
          navigator.serviceWorker.ready.then(() => {
            status.cacheReady = true;
            status.controlled = Boolean(navigator.serviceWorker.controller);
            renderRuntimePanel(runtime.classList.contains("is-visible"));
            checkCacheStatus(false);
            if (status.standalone) {
              showResumeToast(navigator.onLine ? copy().runtimeRestored : copy().offline);
            }
          });
          registration.addEventListener("updatefound", () => {
            const worker = registration.installing;
            if (!worker) return;
            worker.addEventListener("statechange", () => {
              if (worker.state === "installed" && navigator.serviceWorker.controller) showUpdateAvailable(worker);
            });
          });
          const requestUpdate = () => registration.update().catch(() => null);
          requestUpdate();
          window.setInterval(requestUpdate, 30 * 60 * 1000);
          document.addEventListener("visibilitychange", () => {
            if (!document.hidden) requestUpdate();
          }, { passive: true });
        })
        .catch(() => {
          // PWA support is progressive: the portfolio remains fully usable without it.
        });
    }

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker, { once: true });
    }

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!reloadingForUpdate) return;
      window.location.reload();
    });
  
}
