/** Command palette, recruiter mode, skill graph and career trace UI. */
export function setupDeveloperOperatingLayer({ root, defaultLang, translations, reduceMotion, localizedPageHref, printVita, emitCursorCode }) {
  const DEFAULT_LANG = defaultLang;
  const emitPortfolioCursorCode = emitCursorCode;
    const labels = {
      de: {
        paletteTitle: "PK_COMMAND_PALETTE",
        paletteHint: "Befehl suchen oder direkt ausführen",
        close: "Schließen",
        trace: "Run Profile Trace",
        traceHint: "Profil als Systemfluss scannen",
        vita: "Vita öffnen",
        vitaHint: "Zur Entwickler-Vita wechseln",
        stack: "Stack anzeigen",
        stackHint: "Capability Graph fokussieren",
        recruiter: "Recruiter Mode",
        recruiterHint: "Klares Entscheidungsprofil öffnen",
        mail: "Mail kopieren",
        mailHint: "Kontaktadresse in die Zwischenablage",
        github: "GitHub öffnen",
        githubHint: "Profil in neuem Tab",
        signals: "Signal Index",
        signalsHint: "Easter-Egg-Manual öffnen",
        print: "Vita drucken",
        printHint: "PDF/Print auslösen",
        avatar: "Avatar Hero",
        avatarHint: "Iconic Mode für diese Session umschalten",
        pwa: "PWA Runtime",
        pwaHint: "Install-, Offline- und Update-Status anzeigen",
        pwaCache: "Check Cache",
        pwaCacheHint: "Offline-Shell und lokale Routen prüfen",
        pwaReload: "Reload Build",
        pwaReloadHint: "Aktuellen App-Build neu laden",
        pwaSnapshot: "Copy Profile Snapshot",
        pwaSnapshotHint: "Kompaktes Profil in die Zwischenablage",
        pwaDiagnostic: "Run Offline Diagnostic",
        pwaDiagnosticHint: "Cache-Status und Runtime-Modus prüfen",
        traceTitle: "PROFILE_TRACE",
        traceSubtitle: "Scanning profile graph",
        traceComplete: "trace complete",
        recruiterTitle: "RECRUITER_MODE",
        recruiterClose: "Mode schließen",
        recruiterFit: "Wofür ich gut passe",
        recruiterFitText: "Business-nahe Anwendungen, Oracle APEX, saubere Datenmodelle und Workflows, die im Betrieb wirklich genutzt werden.",
        recruiterEdge: "Warum das Profil anders ist",
        recruiterEdgeText: "Operative Erfahrung aus Einkauf, Gastronomie und Prozessverantwortung plus technische Umsetzung mit APEX, PL/SQL, JavaScript und Java.",
        recruiterProof: "Belege",
        recruiterProofText: "Oracle Certified Professional, agile Projektrollen, ITIL/PRINCE2 und ein konsequent gepflegtes Portfolio.",
        recruiterPrint: "PDF speichern",
        recruiterMail: "Mail kopieren",
        recruiterGithub: "GitHub",
        recruiterRoles: "Best fit",
        recruiterRoleApex: "APEX Developer",
        recruiterRoleBusiness: "Business Apps",
        recruiterRoleProcess: "Data & Process UI",
        recruiterMatrix: "Skill-Matrix",
        recruiterMatrixApex: "Oracle APEX",
        recruiterMatrixPlsql: "PL/SQL",
        recruiterMatrixJs: "JavaScript",
        recruiterMatrixProcess: "Prozesssicht",
        recruiterMatrixDelivery: "Delivery",
        recruiterMatrixData: "Datenmodelle",
        timelineDone: "timeline playback complete"
      },
      en: {
        paletteTitle: "PK_COMMAND_PALETTE",
        paletteHint: "Search or run a command",
        close: "Close",
        trace: "Run Profile Trace",
        traceHint: "Scan profile as a system flow",
        vita: "Open Resume",
        vitaHint: "Switch to the developer resume",
        stack: "Show Stack",
        stackHint: "Focus the capability graph",
        recruiter: "Recruiter Mode",
        recruiterHint: "Open the decision profile",
        mail: "Copy Mail",
        mailHint: "Copy contact address",
        github: "Open GitHub",
        githubHint: "Profile in a new tab",
        signals: "Signal Index",
        signalsHint: "Open the Easter Egg manual",
        print: "Print Resume",
        printHint: "Trigger PDF/print",
        avatar: "Avatar Hero",
        avatarHint: "Toggle the iconic hero for this session",
        pwa: "PWA Runtime",
        pwaHint: "Show install, offline and update status",
        pwaCache: "Check Cache",
        pwaCacheHint: "Inspect offline shell and local routes",
        pwaReload: "Reload Build",
        pwaReloadHint: "Reload the current app build",
        pwaSnapshot: "Copy Profile Snapshot",
        pwaSnapshotHint: "Copy a compact profile summary",
        pwaDiagnostic: "Run Offline Diagnostic",
        pwaDiagnosticHint: "Check cache status and runtime mode",
        traceTitle: "PROFILE_TRACE",
        traceSubtitle: "Scanning profile graph",
        traceComplete: "trace complete",
        recruiterTitle: "RECRUITER_MODE",
        recruiterClose: "Close mode",
        recruiterFit: "Where I fit",
        recruiterFitText: "Business-focused applications, Oracle APEX, clean data models and workflows that actually work in operations.",
        recruiterEdge: "Why the profile is different",
        recruiterEdgeText: "Operational experience in purchasing, hospitality and process responsibility plus implementation with APEX, PL/SQL, JavaScript and Java.",
        recruiterProof: "Proof points",
        recruiterProofText: "Oracle Certified Professional, agile project roles, ITIL/PRINCE2 and a deliberately maintained portfolio.",
        recruiterPrint: "Save PDF",
        recruiterMail: "Copy mail",
        recruiterGithub: "GitHub",
        recruiterRoles: "Best fit",
        recruiterRoleApex: "APEX Developer",
        recruiterRoleBusiness: "Business Apps",
        recruiterRoleProcess: "Data & Process UI",
        recruiterMatrix: "Skill matrix",
        recruiterMatrixApex: "Oracle APEX",
        recruiterMatrixPlsql: "PL/SQL",
        recruiterMatrixJs: "JavaScript",
        recruiterMatrixProcess: "Process view",
        recruiterMatrixDelivery: "Delivery",
        recruiterMatrixData: "Data models",
        timelineDone: "timeline playback complete"
      },
      es: {
        paletteTitle: "PK_COMMAND_PALETTE",
        paletteHint: "Buscar o ejecutar comando",
        close: "Cerrar",
        trace: "Run Profile Trace",
        traceHint: "Escanear el perfil como flujo de sistema",
        vita: "Abrir Vita",
        vitaHint: "Ir a la vita de desarrollador",
        stack: "Mostrar Stack",
        stackHint: "Enfocar el capability graph",
        recruiter: "Recruiter Mode",
        recruiterHint: "Abrir perfil de decisión",
        mail: "Copiar mail",
        mailHint: "Copiar dirección de contacto",
        github: "Abrir GitHub",
        githubHint: "Perfil en una pestaña nueva",
        signals: "Signal Index",
        signalsHint: "Abrir manual de easter eggs",
        print: "Imprimir Vita",
        printHint: "Lanzar PDF/print",
        avatar: "Avatar Hero",
        avatarHint: "Alternar iconic hero para esta sesión",
        pwa: "PWA Runtime",
        pwaHint: "Mostrar estado de instalación, offline y updates",
        pwaCache: "Check Cache",
        pwaCacheHint: "Revisar offline shell y rutas locales",
        pwaReload: "Reload Build",
        pwaReloadHint: "Recargar build actual de la app",
        pwaSnapshot: "Copy Profile Snapshot",
        pwaSnapshotHint: "Copiar resumen compacto del perfil",
        pwaDiagnostic: "Run Offline Diagnostic",
        pwaDiagnosticHint: "Comprobar cache y modo runtime",
        traceTitle: "PROFILE_TRACE",
        traceSubtitle: "Scanning profile graph",
        traceComplete: "trace complete",
        recruiterTitle: "RECRUITER_MODE",
        recruiterClose: "Cerrar modo",
        recruiterFit: "Dónde encajo",
        recruiterFitText: "Aplicaciones cercanas al negocio, Oracle APEX, modelos de datos limpios y workflows que realmente funcionan en operación.",
        recruiterEdge: "Por qué el perfil es diferente",
        recruiterEdgeText: "Experiencia operativa en compras, gastronomía y responsabilidad de procesos, más implementación con APEX, PL/SQL, JavaScript y Java.",
        recruiterProof: "Evidencias",
        recruiterProofText: "Oracle Certified Professional, roles ágiles de proyecto, ITIL/PRINCE2 y un portfolio mantenido con intención.",
        recruiterPrint: "Guardar PDF",
        recruiterMail: "Copiar mail",
        recruiterGithub: "GitHub",
        recruiterRoles: "Best fit",
        recruiterRoleApex: "APEX Developer",
        recruiterRoleBusiness: "Business Apps",
        recruiterRoleProcess: "Data & Process UI",
        recruiterMatrix: "Skill matrix",
        recruiterMatrixApex: "Oracle APEX",
        recruiterMatrixPlsql: "PL/SQL",
        recruiterMatrixJs: "JavaScript",
        recruiterMatrixProcess: "Visión de proceso",
        recruiterMatrixDelivery: "Delivery",
        recruiterMatrixData: "Modelos de datos",
        timelineDone: "timeline playback complete"
      },
      ja: {
        paletteTitle: "PK_COMMAND_PALETTE",
        paletteHint: "コマンドを検索または実行",
        close: "閉じる",
        trace: "Run Profile Trace",
        traceHint: "プロフィールをSystem Flowとしてスキャン",
        vita: "経歴を開く",
        vitaHint: "Developer Resumeへ移動",
        stack: "Stack表示",
        stackHint: "Capability Graphをフォーカス",
        recruiter: "Recruiter Mode",
        recruiterHint: "判断用プロフィールを開く",
        mail: "Mailコピー",
        mailHint: "連絡先をコピー",
        github: "GitHubを開く",
        githubHint: "新しいタブでプロフィール",
        signals: "Signal Index",
        signalsHint: "Easter Egg Manualを開く",
        print: "経歴を印刷",
        printHint: "PDF/Printを実行",
        avatar: "Avatar Hero",
        avatarHint: "このSessionだけIconic Modeを切替",
        pwa: "PWA Runtime",
        pwaHint: "Install、Offline、Update状態を表示",
        pwaCache: "Check Cache",
        pwaCacheHint: "Offline ShellとLocal Routeを確認",
        pwaReload: "Reload Build",
        pwaReloadHint: "現在のApp Buildを再読込",
        pwaSnapshot: "Copy Profile Snapshot",
        pwaSnapshotHint: "短いProfile Summaryをコピー",
        pwaDiagnostic: "Run Offline Diagnostic",
        pwaDiagnosticHint: "Cache StatusとRuntime Modeを確認",
        traceTitle: "PROFILE_TRACE",
        traceSubtitle: "profile graphをスキャン中",
        traceComplete: "trace complete",
        recruiterTitle: "RECRUITER_MODE",
        recruiterClose: "Modeを閉じる",
        recruiterFit: "合う領域",
        recruiterFitText: "Business Apps、Oracle APEX、クリーンなデータモデル、実運用で使われるWorkflow。",
        recruiterEdge: "違い",
        recruiterEdgeText: "購買、飲食業、プロセス責任の現場経験と、APEX、PL/SQL、JavaScript、Javaによる実装力。",
        recruiterProof: "根拠",
        recruiterProofText: "Oracle Certified Professional、Agile Project Role、ITIL/PRINCE2、継続的に整備されたPortfolio。",
        recruiterPrint: "PDF保存",
        recruiterMail: "Mailコピー",
        recruiterGithub: "GitHub",
        recruiterRoles: "Best fit",
        recruiterRoleApex: "APEX Developer",
        recruiterRoleBusiness: "Business Apps",
        recruiterRoleProcess: "Data & Process UI",
        recruiterMatrix: "Skill Matrix",
        recruiterMatrixApex: "Oracle APEX",
        recruiterMatrixPlsql: "PL/SQL",
        recruiterMatrixJs: "JavaScript",
        recruiterMatrixProcess: "Process View",
        recruiterMatrixDelivery: "Delivery",
        recruiterMatrixData: "Data Models",
        timelineDone: "timeline playback complete"
      }
    };

    const skillReadouts = {
      de: {
        APEX: "Oracle APEX verbindet UI, Daten und operative Abläufe.",
        PLSQL: "PL/SQL hält Logik nah an sauberen Oracle-Datenmodellen.",
        JS: "JavaScript ergänzt Interaktion, Feedback und schlanke Frontend-Logik.",
        DATA: "Datenmodelle machen Prozesse nachvollziehbar und belastbar.",
        PROCESS: "Prozesssicht sorgt dafür, dass Software im Alltag trägt.",
        METHOD: "Scrum, Product Ownership und Kanban geben Anforderungen eine lieferbare Struktur.",
        DELIVERY: "Scrum, PRINCE2 und ITIL verbinden Umsetzung mit Betrieb."
      },
      en: {
        APEX: "Oracle APEX connects UI, data and operational workflows.",
        PLSQL: "PL/SQL keeps logic close to clean Oracle data models.",
        JS: "JavaScript adds interaction, feedback and lean frontend logic.",
        DATA: "Data models make processes transparent and reliable.",
        PROCESS: "Process thinking keeps software useful in daily work.",
        METHOD: "Scrum, Product Ownership and Kanban turn requirements into deliverable structure.",
        DELIVERY: "Scrum, PRINCE2 and ITIL connect implementation with operations."
      },
      es: {
        APEX: "Oracle APEX conecta UI, datos y workflows operativos.",
        PLSQL: "PL/SQL mantiene la lógica cerca de modelos Oracle limpios.",
        JS: "JavaScript añade interacción, feedback y lógica frontend ligera.",
        DATA: "Los modelos de datos vuelven los procesos trazables y fiables.",
        PROCESS: "La mirada de proceso mantiene el software útil en el día a día.",
        METHOD: "Scrum, Product Ownership y Kanban convierten requisitos en estructura entregable.",
        DELIVERY: "Scrum, PRINCE2 e ITIL conectan implementación con operación."
      },
      ja: {
        APEX: "Oracle APEXはUI、Data、Operational Workflowを接続します。",
        PLSQL: "PL/SQLはLogicをOracle Data Modelの近くに保ちます。",
        JS: "JavaScriptはInteraction、Feedback、Frontend Logicを加えます。",
        DATA: "Data ModelはProcessを見える化し、信頼できるものにします。",
        PROCESS: "Process ThinkingはSoftwareを日常業務で使えるものにします。",
        METHOD: "Scrum、Product Ownership、Kanbanが要件を届けられる構造にします。",
        DELIVERY: "Scrum、PRINCE2、ITILが実装と運用をつなぎます。"
      }
    };

    const traceLogs = [
      "> scanning profile...",
      "> PROFILE_NODE resolved",
      "> DELIVERY_MODULES linked",
      "> CAPABILITY_GRAPH online",
      "> EXPERIENCE_LOG connected",
      "> TRUST_CHAIN valid",
      "> oracle/apex capability confirmed",
      "> process background detected",
      "> delivery profile: business software"
    ];
    const traceLogNodeMap = [0, 0, 1, 2, 3, 4, 2, 3, 1];

    const mailAddress = "phil.kirchner.999@googlemail.com";
    let palette = null;
    let paletteTrigger = null;
    let recruiterPanel = null;
    let recruiterTrigger = null;
    let traceOverlay = null;
    let traceTrigger = null;
    let traceTimers = [];
    let timelinePanel = null;

    function dict() {
      return labels[document.documentElement.dataset.lang || DEFAULT_LANG] || labels[DEFAULT_LANG];
    }

    function commandDefinitions() {
      return [
        { id: "trace", code: "01", action: () => runSystemTrace() },
        { id: "vita", code: "02", action: () => { window.location.href = localizedPageHref("./vita.html"); } },
        { id: "stack", code: "03", action: () => focusStackGraph() },
        { id: "recruiter", code: "04", action: () => toggleRecruiterMode(true) },
        { id: "mail", code: "05", action: () => copyMailAddress() },
        { id: "github", code: "06", action: () => window.open("https://github.com/philosophiedeluxe", "_blank", "noreferrer") },
        { id: "signals", code: "07", action: () => { window.location.href = localizedPageHref("./signals.html"); } },
        { id: "print", code: "08", action: () => printVita() },
        { id: "avatar", code: "09", action: () => document.dispatchEvent(new CustomEvent("pk:toggle-iconic-avatar")) },
        { id: "pwa", code: "10", action: () => document.dispatchEvent(new CustomEvent("pk:pwa-runtime-open")) },
        { id: "pwaCache", code: "11", action: () => document.dispatchEvent(new CustomEvent("pk:pwa-cache-check")) },
        { id: "pwaReload", code: "12", action: () => document.dispatchEvent(new CustomEvent("pk:pwa-reload-build")) },
        { id: "pwaSnapshot", code: "13", action: () => document.dispatchEvent(new CustomEvent("pk:pwa-copy-snapshot")) },
        { id: "pwaDiagnostic", code: "14", action: () => document.dispatchEvent(new CustomEvent("pk:pwa-offline-diagnostic")) }
      ];
    }

    function clearTraceTimers() {
      traceTimers.forEach((timer) => window.clearTimeout(timer));
      traceTimers = [];
    }

    function createPalette() {
      if (palette) return palette;
      palette = document.createElement("aside");
      palette.className = "command-palette";
      palette.setAttribute("aria-hidden", "true");
      palette.inert = true;
      document.body.appendChild(palette);
      return palette;
    }

    function escapeAttr(value) {
      return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    }

    function renderPalette(filter = "") {
      const panel = createPalette();
      const copy = dict();
      const normalized = filter.trim().toLowerCase();
      const commands = commandDefinitions().filter((command) => {
        const title = copy[command.id] || command.id;
        const hint = copy[`${command.id}Hint`] || "";
        return !normalized || `${title} ${hint} ${command.id}`.toLowerCase().includes(normalized);
      });

      panel.innerHTML = `
        <div class="command-palette__dialog" role="dialog" aria-modal="true" aria-label="${copy.paletteTitle}">
          <div class="command-palette__bar">
            <span aria-hidden="true"><b></b><b></b><b></b></span>
            <strong>${copy.paletteTitle}</strong>
            <button type="button" data-command-close aria-label="${copy.close}">×</button>
          </div>
          <label class="command-palette__search">
            <span>&gt;</span>
            <input type="search" value="${escapeAttr(filter)}" placeholder="${escapeAttr(copy.paletteHint)}" data-command-search>
          </label>
          <div class="command-palette__list">
            ${commands.map((command) => `
              <button type="button" data-command-run="${command.id}">
                <span>${command.code}</span>
                <b>${copy[command.id]}</b>
                <em>${copy[`${command.id}Hint`]}</em>
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }

    function openPalette() {
      paletteTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      renderPalette();
      palette.classList.add("is-visible");
      palette.setAttribute("aria-hidden", "false");
      palette.inert = false;
      root.classList.add("command-palette-open");
      emitPortfolioCursorCode("CMD", 1000, "is-dev-signal");
      window.setTimeout(() => palette.querySelector("[data-command-search]")?.focus({ preventScroll: true }), 40);
    }

    function closePalette() {
      if (!palette) return;
      palette.classList.remove("is-visible");
      palette.setAttribute("aria-hidden", "true");
      palette.inert = true;
      root.classList.remove("command-palette-open");
      paletteTrigger?.focus({ preventScroll: true });
      paletteTrigger = null;
    }

    async function copyMailAddress() {
      try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
          await navigator.clipboard.writeText(mailAddress);
        } else {
          const field = document.createElement("textarea");
          field.value = mailAddress;
          field.setAttribute("readonly", "");
          field.style.position = "fixed";
          field.style.left = "-9999px";
          document.body.appendChild(field);
          field.select();
          document.execCommand("copy");
          field.remove();
        }
        emitPortfolioCursorCode("COPY", 1200, "is-dev-lang-code");
      } catch (error) {
        window.location.href = `mailto:${mailAddress}`;
      }
    }

    function buildTraceOverlay() {
      const copy = dict();
      const compactTrace = window.matchMedia("(max-width: 680px)").matches;
      const nodes = compactTrace ? [
        { key: "PROFILE_NODE", x: 25, y: 8, target: "#profil", href: "./index.html#profil" },
        { key: "DELIVERY_MODULES", x: 50, y: 22, target: "#projekte", href: "./index.html#projekte" },
        { key: "CAPABILITY_GRAPH", x: 28, y: 41, target: "#stack", href: "./index.html#stack" },
        { key: "EXPERIENCE_LOG", x: 67, y: 38, target: "#timeline-title", href: "./vita.html#timeline-title" },
        { key: "TRUST_CHAIN", x: 78, y: 13, target: "#cert-title", href: "./vita.html#cert-title" }
      ] : [
        { key: "PROFILE_NODE", x: 18, y: 23, target: "#profil", href: "./index.html#profil" },
        { key: "DELIVERY_MODULES", x: 40, y: 37, target: "#projekte", href: "./index.html#projekte" },
        { key: "CAPABILITY_GRAPH", x: 25, y: 66, target: "#stack", href: "./index.html#stack" },
        { key: "EXPERIENCE_LOG", x: 58, y: 58, target: "#timeline-title", href: "./vita.html#timeline-title" },
        { key: "TRUST_CHAIN", x: 82, y: 27, target: "#cert-title", href: "./vita.html#cert-title" }
      ];
      const points = nodes.map((node) => `${node.x},${node.y}`).join(" ");
      const overlay = document.createElement("aside");
      overlay.className = "system-trace-overlay";
      overlay.setAttribute("aria-hidden", "true");
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", copy.traceTitle);
      overlay.innerHTML = `
        <svg class="system-trace-overlay__paths" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="${points}" />
        </svg>
        <div class="system-trace-overlay__nodes">
          ${nodes.map((node, index) => `
            <button type="button" data-trace-node="${node.key}" data-trace-target="${node.target}" data-trace-href="${node.href}" style="--trace-x:${node.x}%;--trace-y:${node.y}%;--trace-delay:${index * 180}ms">
              <b>${String(index + 1).padStart(2, "0")}</b>${node.key}
            </button>
          `).join("")}
        </div>
        <div class="system-trace-terminal">
          <div class="system-trace-terminal__bar">
            <span aria-hidden="true"><b></b><b></b><b></b></span>
            <strong>${copy.traceTitle}</strong>
            <button type="button" data-trace-close aria-label="${copy.close}">×</button>
          </div>
          <p>${copy.traceSubtitle}</p>
          <pre data-trace-log></pre>
          <small>${copy.traceComplete}</small>
        </div>
      `;
      return overlay;
    }

    function runSystemTrace() {
      traceTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      clearTraceTimers();
      traceOverlay?.remove();
      traceOverlay = buildTraceOverlay();
      document.body.appendChild(traceOverlay);
      const activeOverlay = traceOverlay;
      root.classList.add("system-trace-active");
      traceOverlay.classList.add("is-visible");
      traceOverlay.setAttribute("aria-hidden", "false");
      emitPortfolioCursorCode("TRACE", 1500, "is-dev-signal");
      const log = activeOverlay.querySelector("[data-trace-log]");
      window.setTimeout(() => activeOverlay.querySelector("[data-trace-close]")?.focus({ preventScroll: true }), 0);
      traceLogs.forEach((line, index) => {
        traceTimers.push(window.setTimeout(() => {
          if (traceOverlay !== activeOverlay || !log.isConnected) return;
          log.textContent += `${line}\n`;
          log.scrollTop = log.scrollHeight;
          const nodeIndex = traceLogNodeMap[index] ?? 0;
          const node = activeOverlay.querySelectorAll(".system-trace-overlay__nodes button")[nodeIndex];
          node?.classList.add("is-hot");
          window.setTimeout(() => node?.classList.remove("is-hot"), 760);
        }, 260 + index * 430));
      });
      traceTimers.push(window.setTimeout(() => {
        if (traceOverlay !== activeOverlay) return;
        activeOverlay.classList.add("is-complete");
        emitPortfolioCursorCode("VALID", 1500, "is-signal-code");
      }, 260 + traceLogs.length * 430));
    }

    function closeSystemTrace() {
      clearTraceTimers();
      traceOverlay?.classList.remove("is-visible");
      root.classList.remove("system-trace-active");
      const overlay = traceOverlay;
      traceOverlay = null;
      window.setTimeout(() => {
        overlay?.remove();
        traceTrigger?.focus({ preventScroll: true });
        traceTrigger = null;
      }, 240);
    }

    function navigateTraceNode(trigger) {
      const targetSelector = trigger.dataset.traceTarget;
      const href = trigger.dataset.traceHref;
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      closeSystemTrace();
      emitPortfolioCursorCode("GOTO", 900, "is-dev-lang-code");

      window.setTimeout(() => {
        if (target) {
          target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
          return;
        }

        if (href) {
          const [path, hash = ""] = href.split("#");
          const localized = localizedPageHref(path || "./index.html");
          window.location.href = hash ? `${localized}#${hash}` : localized;
        }
      }, 180);
    }

    function renderRecruiterPanel() {
      const copy = dict();
      recruiterPanel.innerHTML = `
        <div class="recruiter-mode-panel__bar">
          <span aria-hidden="true"><b></b><b></b><b></b></span>
          <strong>${copy.recruiterTitle}</strong>
          <button type="button" data-recruiter-close aria-label="${copy.close}">×</button>
        </div>
        <div class="recruiter-mode-panel__grid">
          <article><p>01</p><h3>${copy.recruiterFit}</h3><span>${copy.recruiterFitText}</span></article>
          <article><p>02</p><h3>${copy.recruiterEdge}</h3><span>${copy.recruiterEdgeText}</span></article>
          <article><p>03</p><h3>${copy.recruiterProof}</h3><span>${copy.recruiterProofText}</span></article>
        </div>
        <div class="recruiter-mode-panel__decision">
          <section>
            <p>${copy.recruiterRoles}</p>
            <div class="recruiter-role-stack">
              <span>${copy.recruiterRoleApex}</span>
              <span>${copy.recruiterRoleBusiness}</span>
              <span>${copy.recruiterRoleProcess}</span>
            </div>
          </section>
          <section>
            <p>${copy.recruiterMatrix}</p>
            <div class="recruiter-skill-matrix">
              <span><b>${copy.recruiterMatrixApex}<em>94%</em></b><i style="--level:94%"></i></span>
              <span><b>${copy.recruiterMatrixPlsql}<em>88%</em></b><i style="--level:88%"></i></span>
              <span><b>${copy.recruiterMatrixJs}<em>78%</em></b><i style="--level:78%"></i></span>
              <span><b>${copy.recruiterMatrixProcess}<em>92%</em></b><i style="--level:92%"></i></span>
              <span><b>${copy.recruiterMatrixDelivery}<em>84%</em></b><i style="--level:84%"></i></span>
              <span><b>${copy.recruiterMatrixData}<em>90%</em></b><i style="--level:90%"></i></span>
            </div>
          </section>
        </div>
        <div class="recruiter-mode-panel__actions">
          <button class="button button-primary" type="button" data-recruiter-print>${copy.recruiterPrint}</button>
          <button class="button button-secondary" type="button" data-recruiter-mail>${copy.recruiterMail}</button>
          <a class="button button-ghost" href="https://github.com/philosophiedeluxe" target="_blank" rel="noopener noreferrer">${copy.recruiterGithub}</a>
          <button class="button button-secondary" type="button" data-recruiter-close>${copy.recruiterClose}</button>
        </div>
      `;
    }

    function toggleRecruiterMode(forceOpen) {
      const visible = forceOpen ?? !root.classList.contains("recruiter-mode-active");
      if (!recruiterPanel) {
        recruiterPanel = document.createElement("aside");
        recruiterPanel.className = "recruiter-mode-panel";
        recruiterPanel.setAttribute("role", "dialog");
        recruiterPanel.setAttribute("aria-modal", "true");
        recruiterPanel.setAttribute("aria-hidden", "true");
        recruiterPanel.inert = true;
        document.body.appendChild(recruiterPanel);
        recruiterPanel.addEventListener("click", (event) => {
          if (event.target.closest("[data-recruiter-close]")) toggleRecruiterMode(false);
          if (event.target.closest("[data-recruiter-print]")) printVita();
          if (event.target.closest("[data-recruiter-mail]")) copyMailAddress();
        });
      }
      if (visible) recruiterTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : recruiterTrigger;
      renderRecruiterPanel();
      root.classList.toggle("recruiter-mode-active", visible);
      recruiterPanel.classList.toggle("is-visible", visible);
      recruiterPanel.setAttribute("aria-hidden", visible ? "false" : "true");
      recruiterPanel.inert = !visible;
      if (visible) {
        window.setTimeout(() => recruiterPanel.querySelector("[data-recruiter-close]")?.focus({ preventScroll: true }), 0);
        emitPortfolioCursorCode("FIT", 1400, "is-dev-signal");
      } else {
        recruiterTrigger?.focus({ preventScroll: true });
        recruiterTrigger = null;
      }
    }

    function focusStackGraph() {
      const stack = document.querySelector("#stack, .stack-section");
      if (!stack) {
        window.location.href = `${localizedPageHref("./index.html")}#stack`;
        return;
      }
      stack.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
      stack.classList.add("skill-graph-focus");
      emitPortfolioCursorCode("GRAPH", 1300, "is-dev-lang-code");
      window.setTimeout(() => stack.classList.remove("skill-graph-focus"), 3600);
    }

    function setupSkillGraph() {
      const graph = document.querySelector(".skill-graph");
      if (!graph) return;
      const readout = graph.querySelector("[data-skill-readout]");
      let signalTimer = null;
      let readoutTimer = null;
      graph.querySelectorAll("[data-skill-node]").forEach((node) => {
        node.setAttribute("aria-pressed", "false");
        node.addEventListener("click", () => {
          const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
          const skill = node.dataset.skillNode;
          graph.querySelectorAll(".is-active").forEach((item) => {
            item.classList.remove("is-active");
            item.setAttribute("aria-pressed", "false");
          });
          node.classList.add("is-active");
          node.setAttribute("aria-pressed", "true");
          graph.dataset.activeSkill = skill;
          graph.classList.remove("is-signal-active");
          void graph.offsetWidth;
          graph.classList.add("is-signal-active");
          window.clearTimeout(signalTimer);
          signalTimer = window.setTimeout(() => graph.classList.remove("is-signal-active"), 1800);

          if (readout) {
            readout.textContent = (skillReadouts[lang] || skillReadouts[DEFAULT_LANG])[skill] || "capability graph online";
            readout.classList.remove("is-updated");
            void readout.offsetWidth;
            readout.classList.add("is-updated");
            window.clearTimeout(readoutTimer);
            readoutTimer = window.setTimeout(() => readout.classList.remove("is-updated"), 1500);
          }
          emitPortfolioCursorCode(skill, 1100, "is-signal-code");
        });
      });
    }

    function setTimelineItemExpanded(item, expanded) {
      item.classList.toggle("is-expanded", expanded);
      item.setAttribute("aria-expanded", expanded ? "true" : "false");
      item.querySelector(".timeline-item__log")?.setAttribute("aria-hidden", expanded ? "false" : "true");
    }

    function setupTimelineCards() {
      document.querySelectorAll(".timeline-item").forEach((item) => {
        item.querySelector(".timeline-item__log")?.setAttribute("aria-hidden", "true");
        item.addEventListener("click", () => {
          setTimelineItemExpanded(item, !item.classList.contains("is-expanded"));
          emitPortfolioCursorCode("LOG", 850, "is-signal-code");
        });
        item.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          setTimelineItemExpanded(item, !item.classList.contains("is-expanded"));
          emitPortfolioCursorCode("LOG", 850, "is-signal-code");
        });
      });
    }

    function runVitaPlayback() {
      const items = Array.from(document.querySelectorAll(".timeline-item"));
      if (!items.length) return;
      timelinePanel?.remove();
      timelinePanel = document.createElement("aside");
      timelinePanel.className = "timeline-playback-console";
      timelinePanel.innerHTML = `<strong>EXPERIENCE_LOG</strong><pre></pre>`;
      document.body.appendChild(timelinePanel);
      const output = timelinePanel.querySelector("pre");
      root.classList.add("vita-playback-active");
      items.forEach((item) => item.classList.remove("is-playing"));
      items.forEach((item, index) => {
        window.setTimeout(() => {
          items.forEach((entry) => entry.classList.remove("is-playing"));
          item.classList.add("is-playing");
          setTimelineItemExpanded(item, true);
          const time = item.querySelector("time")?.textContent?.trim() || `step ${index + 1}`;
          const title = item.querySelector("h3")?.textContent?.trim() || "experience node";
          output.textContent += `> ${time} :: ${title}\n`;
          output.scrollTop = output.scrollHeight;
          emitPortfolioCursorCode(String(index + 1).padStart(2, "0"), 700, "is-dev-signal");
        }, index * 920);
      });
      window.setTimeout(() => {
        items.forEach((entry) => entry.classList.remove("is-playing"));
        root.classList.remove("vita-playback-active");
        output.textContent += `> ${dict().timelineDone}\n`;
        window.setTimeout(() => timelinePanel?.remove(), 3600);
      }, items.length * 920 + 760);
    }

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-system-trace-trigger]")) runSystemTrace();
      if (event.target.closest("[data-vita-playback]")) runVitaPlayback();
      if (event.target.closest("[data-trace-close]")) closeSystemTrace();
      const traceNode = event.target.closest("[data-trace-node]");
      if (traceNode) {
        navigateTraceNode(traceNode);
        return;
      }
      if (
        traceOverlay &&
        event.target.closest(".system-trace-overlay") &&
        !event.target.closest(".system-trace-terminal") &&
        !event.target.closest(".system-trace-overlay__nodes")
      ) {
        closeSystemTrace();
      }
    });

    document.addEventListener("pk:run-system-trace", runSystemTrace);

    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        openPalette();
        return;
      }
      if (key === "escape") {
        closePalette();
        closeSystemTrace();
        toggleRecruiterMode(false);
      }
    });

    document.addEventListener("pk:open-command-palette", openPalette);

    document.addEventListener("input", (event) => {
      if (!event.target.matches("[data-command-search]")) return;
      renderPalette(event.target.value);
      window.setTimeout(() => {
        const search = palette?.querySelector("[data-command-search]");
        search?.focus({ preventScroll: true });
        search?.setSelectionRange(search.value.length, search.value.length);
      }, 0);
    });

    document.addEventListener("click", (event) => {
      if (!palette?.classList.contains("is-visible")) return;
      if (event.target.closest("[data-command-close]")) {
        closePalette();
        return;
      }
      const commandButton = event.target.closest("[data-command-run]");
      if (commandButton) {
        const command = commandDefinitions().find((item) => item.id === commandButton.dataset.commandRun);
        closePalette();
        command?.action();
        return;
      }
      if (event.target === palette) closePalette();
    });

    document.addEventListener("pk:lang-change", () => {
      if (palette?.classList.contains("is-visible")) renderPalette(palette.querySelector("[data-command-search]")?.value || "");
      if (recruiterPanel?.classList.contains("is-visible")) renderRecruiterPanel();
    });

    setupSkillGraph();
    setupTimelineCards();
}
