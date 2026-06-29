(function () {
  const SUPPORTED_LANGS = ["de", "en", "ja"];
  const DEFAULT_LANG = "de";

  const signalCardTranslations = {
    de: {
      "signals.label.trigger": "Trigger",
      "signals.label.effect": "Effekt",
      "signals.card.boot.kicker": "SESSION",
      "signals.card.boot.title": "Portfolio Boot",
      "signals.card.boot.trigger": "Erster Seitenaufruf pro Session",
      "signals.card.boot.effect": "Kurzes Boot-Overlay mit Signal-Cut, danach Nav-Boot, Cursor-Handshake und Hero-Unlock.",
      "signals.card.unlock.kicker": "HERO",
      "signals.card.unlock.title": "Terminal Unlock",
      "signals.card.unlock.trigger": "Direkt nach dem Session-Boot",
      "signals.card.unlock.effect": "Die Headline erscheint kurz als Code-Layer und rastet dann in echten Text ein.",
      "signals.card.firstGuide.kicker": "HINT",
      "signals.card.firstGuide.title": "First-Time Guide",
      "signals.card.firstGuide.trigger": "Einmal pro Session nach dem Interface-Boot",
      "signals.card.firstGuide.effect": "Zeigt einen kleinen Terminal-Hinweis auf Command Palette und versteckte Routen.",
      "signals.card.handshake.kicker": "CURSOR",
      "signals.card.handshake.title": "Handshake",
      "signals.card.handshake.trigger": "Nach dem Boot-Reveal",
      "signals.card.handshake.effect": "Der Custom Cursor meldet nacheinander <code>INIT</code>, <code>AUTH</code> und <code>READY</code>.",
      "signals.card.context.kicker": "SHIFT + RIGHT CLICK",
      "signals.card.context.title": "Cursor Context Menu",
      "signals.card.context.trigger": "<kbd>Shift</kbd> + Rechtsklick",
      "signals.card.context.effect": "Öffnet ein eigenes Command-Menü mit Dev Console, Copy Link, Vita drucken, Mail und GitHub.",
      "signals.card.console.kicker": "SECRET",
      "signals.card.console.title": "Dev Console",
      "signals.card.console.trigger": "<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd> oder Cursor-Menü",
      "signals.card.console.effect": "Öffnet eine interne Mini-Konsole mit Route, Build, Stack-Hinweisen und verstecktem Signal-Link.",
      "signals.card.keyword.kicker": "TEXT SURFACE",
      "signals.card.keyword.title": "Keyword Cursor",
      "signals.card.keyword.trigger": "Hover auf technische Begriffe wie APEX, SQL, JavaScript, REST oder Software",
      "signals.card.keyword.effect": "Der Cursor zeigt kontextuelle Kurzsignale wie <code>APEX</code>, <code>SQL</code>, <code>FLOW</code> oder <code>{PK}</code>.",
      "signals.card.sleep.kicker": "IDLE",
      "signals.card.sleep.title": "Cursor Sleep",
      "signals.card.sleep.trigger": "Maus bleibt etwa 12 Sekunden still",
      "signals.card.sleep.effect": "Der Cursor wechselt in einen kleinen Sleep-Code-Zustand und wacht bei Bewegung wieder auf.",
      "signals.card.dwell.kicker": "DWELL",
      "signals.card.dwell.title": "Hero Terminal",
      "signals.card.dwell.trigger": "Hero bleibt etwa 7 Sekunden sichtbar",
      "signals.card.dwell.effect": "Eine kurze Terminal-Zeile erscheint im Hero und sendet ein Cursor-Signal.",
      "signals.card.number.kicker": "SECTION",
      "signals.card.number.title": "Number Signals",
      "signals.card.number.trigger": "Klick auf dekorative Abschnittsnummern wie <code>01</code> bis <code>04</code>",
      "signals.card.number.effect": "Nummer, Cards und Content rebooten kurz mit Scan- und Daten-Jump-Effekt.",
      "signals.card.matrix.kicker": "KEYBOARD",
      "signals.card.matrix.title": "Matrix Rain",
      "signals.card.matrix.trigger": "<code>matrix</code> tippen",
      "signals.card.matrix.effect": "Ein temporärer Matrix-Overlay läuft über die Seite und blendet danach selbst aus.",
      "signals.card.manualBoot.kicker": "KEYBOARD",
      "signals.card.manualBoot.title": "Manual Boot",
      "signals.card.manualBoot.trigger": "<code>boot</code> tippen",
      "signals.card.manualBoot.effect": "Startet die lange interne Boot-Sequenz mit Terminalausgabe und Interface-Reveal.",
      "signals.card.konami.kicker": "KONAMI",
      "signals.card.konami.title": "Developer Mode",
      "signals.card.konami.trigger": "<code>↑ ↑ ↓ ↓ ← → ← → B A</code>",
      "signals.card.konami.effect": "Aktiviert die große Developer-Konsole, Grid-Overlay, Modul-Outlines und typed Shell Output.",
      "signals.card.lang.kicker": "LANG",
      "signals.card.lang.title": "Language DEV Mode",
      "signals.card.lang.trigger": "Sprachschalter sechsmal schnell anklicken",
      "signals.card.lang.effect": "Temporärer DEV-Sprachzustand mit monospace Interface-Treatment.",
      "signals.card.theme.kicker": "BRAND",
      "signals.card.theme.title": "Theme Shift",
      "signals.card.theme.trigger": "<kbd>Shift</kbd> halten und auf das PK-Branding klicken",
      "signals.card.theme.effect": "Ein kurzer alternativer Chroma-Zustand verschiebt die Farbwelt der Seite.",
      "signals.card.dom.kicker": "SOURCE",
      "signals.card.dom.title": "DOM Signal",
      "signals.card.dom.trigger": "DevTools oder HTML-Quelltext öffnen",
      "signals.card.dom.effect": "Ein versteckter Kommentar markiert die aktivierte Signal-Schicht.",
      "signals.card.trace.kicker": "PROFILE GRAPH",
      "signals.card.trace.title": "System Trace",
      "signals.card.trace.trigger": "<code>trace profile</code> im Hero oder Command Palette",
      "signals.card.trace.effect": "Scant PROFILE_NODE, DELIVERY_MODULES, CAPABILITY_GRAPH, EXPERIENCE_LOG und TRUST_CHAIN als klickbare Systemroute.",
      "signals.card.palette.kicker": "COMMAND",
      "signals.card.palette.title": "Command Palette",
      "signals.card.palette.trigger": "<kbd>Ctrl</kbd> + <kbd>K</kbd>",
      "signals.card.palette.effect": "Öffnet ein schnelles Portfolio-Command-Interface für Trace, Vita, Stack, Recruiter Mode, Mail, GitHub und Signal Index.",
      "signals.card.skillGraph.kicker": "CAPABILITY",
      "signals.card.skillGraph.title": "Live Skill Graph",
      "signals.card.skillGraph.trigger": "Skill-Knoten im Stack-Bereich anklicken",
      "signals.card.skillGraph.effect": "Verbindet APEX, PL/SQL, JavaScript, Datenmodelle, Prozesse und Delivery mit kurzen Capability-Signalen.",
      "signals.card.recruiter.kicker": "DECISION MODE",
      "signals.card.recruiter.title": "Recruiter Mode",
      "signals.card.recruiter.trigger": "Command Palette: Recruiter Mode",
      "signals.card.recruiter.effect": "Blendet eine Entscheidungsansicht mit Passung, Profil-Unterschied, Belegen, Skill-Matrix, PDF und Copy-Mail ein.",
      "signals.card.vitaPlayback.kicker": "EXPERIENCE LOG",
      "signals.card.vitaPlayback.title": "Bootable Vita",
      "signals.card.vitaPlayback.trigger": "<code>play timeline</code> auf der Vita-Seite",
      "signals.card.vitaPlayback.effect": "Spielt die Timeline als Log ab und fokussiert die beruflichen Stationen nacheinander."
    },
    en: {
      "signals.label.trigger": "Trigger",
      "signals.label.effect": "Effect",
      "signals.card.boot.kicker": "SESSION",
      "signals.card.boot.title": "Portfolio Boot",
      "signals.card.boot.trigger": "First page view per session",
      "signals.card.boot.effect": "Short boot overlay with signal cut, followed by nav boot, cursor handshake and hero unlock.",
      "signals.card.unlock.kicker": "HERO",
      "signals.card.unlock.title": "Terminal Unlock",
      "signals.card.unlock.trigger": "Right after the session boot",
      "signals.card.unlock.effect": "The headline appears as a code layer for a moment, then locks into readable text.",
      "signals.card.firstGuide.kicker": "HINT",
      "signals.card.firstGuide.title": "First-Time Guide",
      "signals.card.firstGuide.trigger": "Once per session after the interface boot",
      "signals.card.firstGuide.effect": "Shows a small terminal hint for the Command Palette and hidden routes.",
      "signals.card.handshake.kicker": "CURSOR",
      "signals.card.handshake.title": "Handshake",
      "signals.card.handshake.trigger": "After the boot reveal",
      "signals.card.handshake.effect": "The custom cursor reports <code>INIT</code>, <code>AUTH</code> and <code>READY</code> in sequence.",
      "signals.card.context.kicker": "SHIFT + RIGHT CLICK",
      "signals.card.context.title": "Cursor Context Menu",
      "signals.card.context.trigger": "<kbd>Shift</kbd> + right click",
      "signals.card.context.effect": "Opens a custom command menu with Dev Console, Copy Link, print resume, mail and GitHub.",
      "signals.card.console.kicker": "SECRET",
      "signals.card.console.title": "Dev Console",
      "signals.card.console.trigger": "<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd> or cursor menu",
      "signals.card.console.effect": "Opens an internal mini console with route, build, stack notes and a hidden Signal link.",
      "signals.card.keyword.kicker": "TEXT SURFACE",
      "signals.card.keyword.title": "Keyword Cursor",
      "signals.card.keyword.trigger": "Hover technical words like APEX, SQL, JavaScript, REST or software",
      "signals.card.keyword.effect": "The cursor shows contextual short signals like <code>APEX</code>, <code>SQL</code>, <code>FLOW</code> or <code>{PK}</code>.",
      "signals.card.sleep.kicker": "IDLE",
      "signals.card.sleep.title": "Cursor Sleep",
      "signals.card.sleep.trigger": "Mouse stays still for about 12 seconds",
      "signals.card.sleep.effect": "The cursor switches into a small sleep-code state and wakes up on movement.",
      "signals.card.dwell.kicker": "DWELL",
      "signals.card.dwell.title": "Hero Terminal",
      "signals.card.dwell.trigger": "Hero remains visible for about 7 seconds",
      "signals.card.dwell.effect": "A short terminal line appears in the hero and sends a cursor signal.",
      "signals.card.number.kicker": "SECTION",
      "signals.card.number.title": "Number Signals",
      "signals.card.number.trigger": "Click decorative section numbers such as <code>01</code> to <code>04</code>",
      "signals.card.number.effect": "Number, cards and content briefly reboot with scan and data-jump effects.",
      "signals.card.matrix.kicker": "KEYBOARD",
      "signals.card.matrix.title": "Matrix Rain",
      "signals.card.matrix.trigger": "Type <code>matrix</code>",
      "signals.card.matrix.effect": "A temporary Matrix overlay runs across the page and fades itself out.",
      "signals.card.manualBoot.kicker": "KEYBOARD",
      "signals.card.manualBoot.title": "Manual Boot",
      "signals.card.manualBoot.trigger": "Type <code>boot</code>",
      "signals.card.manualBoot.effect": "Starts the long internal boot sequence with terminal output and interface reveal.",
      "signals.card.konami.kicker": "KONAMI",
      "signals.card.konami.title": "Developer Mode",
      "signals.card.konami.trigger": "<code>↑ ↑ ↓ ↓ ← → ← → B A</code>",
      "signals.card.konami.effect": "Activates the large developer console, grid overlay, module outlines and typed shell output.",
      "signals.card.lang.kicker": "LANG",
      "signals.card.lang.title": "Language DEV Mode",
      "signals.card.lang.trigger": "Click the language switcher six times quickly",
      "signals.card.lang.effect": "Temporary DEV language state with monospace interface treatment.",
      "signals.card.theme.kicker": "BRAND",
      "signals.card.theme.title": "Theme Shift",
      "signals.card.theme.trigger": "Hold <kbd>Shift</kbd> and click the PK branding",
      "signals.card.theme.effect": "A short alternate chroma state shifts the page color system.",
      "signals.card.dom.kicker": "SOURCE",
      "signals.card.dom.title": "DOM Signal",
      "signals.card.dom.trigger": "Open DevTools or the HTML source",
      "signals.card.dom.effect": "A hidden comment marks the activated signal layer.",
      "signals.card.trace.kicker": "PROFILE GRAPH",
      "signals.card.trace.title": "System Trace",
      "signals.card.trace.trigger": "<code>trace profile</code> in the hero or Command Palette",
      "signals.card.trace.effect": "Scans PROFILE_NODE, DELIVERY_MODULES, CAPABILITY_GRAPH, EXPERIENCE_LOG and TRUST_CHAIN as a clickable system route.",
      "signals.card.palette.kicker": "COMMAND",
      "signals.card.palette.title": "Command Palette",
      "signals.card.palette.trigger": "<kbd>Ctrl</kbd> + <kbd>K</kbd>",
      "signals.card.palette.effect": "Opens a fast portfolio command interface for trace, resume, stack, recruiter mode, mail, GitHub and Signal Index.",
      "signals.card.skillGraph.kicker": "CAPABILITY",
      "signals.card.skillGraph.title": "Live Skill Graph",
      "signals.card.skillGraph.trigger": "Click skill nodes in the stack section",
      "signals.card.skillGraph.effect": "Connects APEX, PL/SQL, JavaScript, data models, processes and delivery through short capability signals.",
      "signals.card.recruiter.kicker": "DECISION MODE",
      "signals.card.recruiter.title": "Recruiter Mode",
      "signals.card.recruiter.trigger": "Command Palette: Recruiter Mode",
      "signals.card.recruiter.effect": "Shows a decision view with fit, profile difference, proof points, skill matrix, PDF and copy mail.",
      "signals.card.vitaPlayback.kicker": "EXPERIENCE LOG",
      "signals.card.vitaPlayback.title": "Bootable Resume",
      "signals.card.vitaPlayback.trigger": "<code>play timeline</code> on the resume page",
      "signals.card.vitaPlayback.effect": "Plays the timeline as a log and focuses the professional stations one after another."
    },
    ja: {
      "signals.label.trigger": "トリガー",
      "signals.label.effect": "エフェクト",
      "signals.card.boot.kicker": "SESSION",
      "signals.card.boot.title": "Portfolio Boot",
      "signals.card.boot.trigger": "セッションごとの初回ページ表示",
      "signals.card.boot.effect": "短いBootオーバーレイとSignal Cutのあと、Nav Boot、Cursor Handshake、Hero Unlockが続きます。",
      "signals.card.unlock.kicker": "HERO",
      "signals.card.unlock.title": "Terminal Unlock",
      "signals.card.unlock.trigger": "Session Bootの直後",
      "signals.card.unlock.effect": "見出しが一瞬コードレイヤーとして表示され、その後読みやすいテキストにロックされます。",
      "signals.card.firstGuide.kicker": "HINT",
      "signals.card.firstGuide.title": "First-Time Guide",
      "signals.card.firstGuide.trigger": "Interface Boot後、Sessionごとに一度",
      "signals.card.firstGuide.effect": "Command Paletteとhidden routesへの小さなTerminal Hintを表示します。",
      "signals.card.handshake.kicker": "CURSOR",
      "signals.card.handshake.title": "Handshake",
      "signals.card.handshake.trigger": "Boot Revealの後",
      "signals.card.handshake.effect": "Custom Cursorが順番に<code>INIT</code>、<code>AUTH</code>、<code>READY</code>を表示します。",
      "signals.card.context.kicker": "SHIFT + RIGHT CLICK",
      "signals.card.context.title": "Cursor Context Menu",
      "signals.card.context.trigger": "<kbd>Shift</kbd> + 右クリック",
      "signals.card.context.effect": "Dev Console、Copy Link、Vita印刷、Mail、GitHubを含む独自のCommand Menuを開きます。",
      "signals.card.console.kicker": "SECRET",
      "signals.card.console.title": "Dev Console",
      "signals.card.console.trigger": "<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd> またはCursor Menu",
      "signals.card.console.effect": "Route、Build、Stack情報、隠しSignal Linkを含む内部Mini Consoleを開きます。",
      "signals.card.keyword.kicker": "TEXT SURFACE",
      "signals.card.keyword.title": "Keyword Cursor",
      "signals.card.keyword.trigger": "APEX、SQL、JavaScript、REST、Softwareなどの技術語にホバー",
      "signals.card.keyword.effect": "Cursorが<code>APEX</code>、<code>SQL</code>、<code>FLOW</code>、<code>{PK}</code>などの短い信号を表示します。",
      "signals.card.sleep.kicker": "IDLE",
      "signals.card.sleep.title": "Cursor Sleep",
      "signals.card.sleep.trigger": "マウスが約12秒静止",
      "signals.card.sleep.effect": "Cursorが小さなSleep-Code状態に入り、動きで復帰します。",
      "signals.card.dwell.kicker": "DWELL",
      "signals.card.dwell.title": "Hero Terminal",
      "signals.card.dwell.trigger": "Heroが約7秒表示されたまま",
      "signals.card.dwell.effect": "Hero内に短いTerminal行が現れ、Cursor Signalを送ります。",
      "signals.card.number.kicker": "SECTION",
      "signals.card.number.title": "Number Signals",
      "signals.card.number.trigger": "<code>01</code>から<code>04</code>の装飾セクション番号をクリック",
      "signals.card.number.effect": "番号、Cards、Contentが短くrebootし、scanとdata-jumpの効果が入ります。",
      "signals.card.matrix.kicker": "KEYBOARD",
      "signals.card.matrix.title": "Matrix Rain",
      "signals.card.matrix.trigger": "<code>matrix</code> と入力",
      "signals.card.matrix.effect": "一時的なMatrix Overlayがページ上を流れ、自動でフェードアウトします。",
      "signals.card.manualBoot.kicker": "KEYBOARD",
      "signals.card.manualBoot.title": "Manual Boot",
      "signals.card.manualBoot.trigger": "<code>boot</code> と入力",
      "signals.card.manualBoot.effect": "Terminal出力とInterface Revealを含む長い内部Boot Sequenceを開始します。",
      "signals.card.konami.kicker": "KONAMI",
      "signals.card.konami.title": "Developer Mode",
      "signals.card.konami.trigger": "<code>↑ ↑ ↓ ↓ ← → ← → B A</code>",
      "signals.card.konami.effect": "大きなDeveloper Console、Grid Overlay、Module Outline、typed shell outputを有効化します。",
      "signals.card.lang.kicker": "LANG",
      "signals.card.lang.title": "Language DEV Mode",
      "signals.card.lang.trigger": "Language Switcherを素早く6回クリック",
      "signals.card.lang.effect": "monospace Interface Treatment付きの一時的なDEV言語状態になります。",
      "signals.card.theme.kicker": "BRAND",
      "signals.card.theme.title": "Theme Shift",
      "signals.card.theme.trigger": "<kbd>Shift</kbd>を押しながらPK Brandingをクリック",
      "signals.card.theme.effect": "短い代替Chroma状態でページの色調が切り替わります。",
      "signals.card.dom.kicker": "SOURCE",
      "signals.card.dom.title": "DOM Signal",
      "signals.card.dom.trigger": "DevToolsまたはHTML Sourceを開く",
      "signals.card.dom.effect": "有効化されたSignal Layerを示す隠しコメントがあります。",
      "signals.card.trace.kicker": "PROFILE GRAPH",
      "signals.card.trace.title": "System Trace",
      "signals.card.trace.trigger": "Heroの<code>trace profile</code> またはCommand Palette",
      "signals.card.trace.effect": "PROFILE_NODE、DELIVERY_MODULES、CAPABILITY_GRAPH、EXPERIENCE_LOG、TRUST_CHAINをクリック可能なSystem Routeとしてスキャンします。",
      "signals.card.palette.kicker": "COMMAND",
      "signals.card.palette.title": "Command Palette",
      "signals.card.palette.trigger": "<kbd>Ctrl</kbd> + <kbd>K</kbd>",
      "signals.card.palette.effect": "Trace、経歴、Stack、Recruiter Mode、Mail、GitHub、Signal Indexへ素早くアクセスするCommand Interfaceです。",
      "signals.card.skillGraph.kicker": "CAPABILITY",
      "signals.card.skillGraph.title": "Live Skill Graph",
      "signals.card.skillGraph.trigger": "StackセクションのSkill Nodeをクリック",
      "signals.card.skillGraph.effect": "APEX、PL/SQL、JavaScript、Data Model、Process、Deliveryを短いCapability Signalで接続します。",
      "signals.card.recruiter.kicker": "DECISION MODE",
      "signals.card.recruiter.title": "Recruiter Mode",
      "signals.card.recruiter.trigger": "Command Palette: Recruiter Mode",
      "signals.card.recruiter.effect": "Fit、Profile Difference、Proof Points、Skill Matrix、PDF、Copy Mailを含む判断ビューを表示します。",
      "signals.card.vitaPlayback.kicker": "EXPERIENCE LOG",
      "signals.card.vitaPlayback.title": "Bootable Vita",
      "signals.card.vitaPlayback.trigger": "Vitaページの<code>play timeline</code>",
      "signals.card.vitaPlayback.effect": "TimelineをLogとして再生し、職務経歴の各Stationを順番にフォーカスします。"
    }
  };

  const translations = {
    de: {
      "meta.home.title": "Phil Kirchner - Softwareentwickler",
      "meta.home.description": "Portfolio von Phil Kirchner: Softwareentwicklung, Oracle APEX, PL/SQL, JavaScript, Java und strukturierte Produktarbeit.",
      "meta.vita.title": "Phil Kirchner - Vita",
      "meta.vita.description": "Vita von Phil Kirchner: Softwareentwicklung, Oracle APEX, PL/SQL, Java, Ausbildung, Zertifikate und berufliche Stationen.",
      "meta.imprint.title": "Phil Kirchner - Impressum",
      "meta.privacy.title": "Phil Kirchner - Datenschutz",
      "meta.signals.title": "Phil Kirchner - Signal Index",
      "meta.signals.description": "Verstecktes Interface-Handbuch der Portfolio-Seite: Easter Eggs, Tastenkombinationen, Cursor-Signale und geheime UI-Protokolle.",
      "meta.404.title": "Phil Kirchner - Seite nicht gefunden",
      "meta.404.description": "Diese Portfolio-Seite wurde nicht gefunden.",

      "nav.profile": "Profil",
      "nav.projects": "Projekte",
      "nav.stack": "Stack",
      "nav.vita": "Vita",
      "nav.linkedin": "LinkedIn",
      "nav.imprint": "Impressum",
      "nav.privacy": "Datenschutz",
      "nav.signals": "Signal Index",

      "signals.eyebrow": "Verstecktes Interface",
      "signals.title": "Signal Index / <span class=\"accent-word\">Easter Egg Manual</span>",
      "signals.intro": "Diese Seite sammelt die absichtlich versteckten Interaktionen der Homepage. Nichts davon ist notwendig, aber alles davon gehört zur Identität des Interfaces.",
      "signals.status": "Nicht im Hauptmenü · über Footer-Signal oder Dev Console erreichbar",
      "signals.catalog.eyebrow": "Discovery-Protokoll",
      "signals.catalog.title": "Alle bekannten <span class=\"accent-word\">Signale</span>",
      "signals.note.title": "Hinweis",
      "signals.note.text": "Alle Effekte sind lokal, temporär und respektieren reduzierte Bewegung. Es werden keine externen Dienste, kein Tracking und keine Analytics ausgelöst.",
      "signals.back": "Zurück zur Homepage",
      ...signalCardTranslations.de,
      "trace.entry": "trace profile",
      "vita.playback": "play timeline",

      "error.eyebrow": "404",
      "error.title": "Diese Seite gibt es hier nicht.",
      "error.text": "Der Link ist entweder veraltet oder die Seite wurde verschoben. Die Startseite, Vita und Kontaktwege sind weiterhin erreichbar.",
      "error.home": "Zur Startseite",

      "hero.eyebrow": "Softwareentwickler aus Freising",
      "hero.title": "Ich baue <span class=\"accent-token\"><span class=\"accent-word\">Software</span><span class=\"accent-punctuation\">,</span></span> die Prozesse nicht nur digitalisiert, sondern <span class=\"accent-token\"><span class=\"accent-word\">antreibt</span><span class=\"accent-punctuation\">.</span></span>",
      "hero.text": "Ich komme aus operativer Verantwortung: Einkauf, Prozesse und Teams kenne ich aus der Praxis. Heute entwickle ich Anwendungen mit Oracle APEX, PL/SQL, JavaScript und Java. Diese Mischung ist mein Vorteil: Technik, die nicht nur läuft, sondern im Alltag Wirkung zeigt.",
      "hero.status": "Verfügbar für Austausch",
      "hero.mail": "Kontakt aufnehmen",
      "hero.vita": "Vita ansehen",
      "facts.focus.label": "Fokus",
      "facts.focus.value": "Business Apps",
      "facts.stack.label": "Stack",
      "facts.mode.label": "Arbeitsweise",
      "facts.mode.value": "Agil & strukturiert",

      "position.eyebrow": "Was mich unterscheidet",
      "position.title": "Ich denke <span class=\"accent-word\">Software</span> nicht nur vom Code aus.",
      "position.p1": "Bevor ich in die IT gewechselt bin, habe ich viele Jahre in der Gastronomie, im Einkauf und in Prozessverantwortung gearbeitet. Ich kenne Druck, Übergaben, Prioritäten, Lieferketten, Abstimmungen und die Momente, in denen ein gutes Tool den Unterschied macht.",
      "position.p2": "Deshalb entwickle ich besonders gerne Anwendungen, die Prozesse sichtbar machen, Daten sauber führen und Menschen im Arbeitsfluss entlasten.",

      "projects.eyebrow": "Projekt-Spotlights",
      "projects.title": "Arbeiten, die zeigen, wie ich <span class=\"accent-word\">denke</span>.",
      "project.home.title": "Modernisierte persönliche Homepage",
      "project.home.text": "Eine statische, schnelle Portfolio-Seite mit klarer Positionierung, responsivem Layout, DE/EN-Umschaltung und verbessertem SEO-Fundament.",
      "project.home.result": "Statisch · zweisprachig · ohne Build-Schritt",
      "project.apex.title": "Oracle-nahe Anwendungsentwicklung",
      "project.apex.text": "Fokus auf Oberflächen, Datenmodelle und Abläufe rund um Oracle APEX, PL/SQL, REST Data Sources und strukturierte Datenhaltung.",
      "project.apex.result": "Datengetrieben · workfloworientiert · robust",
      "project.java.title": "Java, SQL und saubere Grundarchitektur",
      "project.java.text": "Ausbildung und Praxis mit Java, SQL, Spring Boot, MVC, Vaadin, Git, Jira, Confluence und modellgetriebener Softwareentwicklung.",
      "project.java.result": "Modular · nachvollziehbar · teamfähig",

      "stack.eyebrow": "Kompetenzprofil",
      "stack.title": "Technik, Methoden und <span class=\"accent-word\">Erfahrung</span> in einem Profil.",
      "stack.dev.kicker": "Entwicklung",
      "stack.dev.title": "Business-nahe Anwendungen",
      "stack.product.kicker": "Produkt & Prozess",
      "stack.product.title": "Struktur für echte Abläufe",
      "stack.tools.kicker": "Tools",
      "stack.tools.title": "Werkzeuge für Lieferung",

      "contact.eyebrow": "Nächster Schritt",
      "contact.title": "Lass uns über <span class=\"accent-word\">Software</span> sprechen, die im echten Betrieb trägt.",
      "contact.mail": "Mail schreiben",
      "contact.linkedin": "LinkedIn öffnen",
      "contact.status": "Offen für fachlichen Austausch und passende Projekte.",

      "vita.eyebrow": "Vita",
      "vita.status.focus": "Aktueller Fokus: Oracle APEX & PL/SQL",
      "vita.status.apps": "Business Apps mit operativem Fokus",
      "vita.status.experience": "Softwareentwicklung seit 2021",
      "vita.status.certified": "Oracle Certified Professional",
      "vita.title": "Eine Laufbahn aus Praxis, Verantwortung und <span class=\"accent-word\">Software</span>.",
      "vita.intro": "Mein beruflicher Weg begann in der Gastronomie und führte über Einkauf, Prozessverantwortung und Projektarbeit in die Softwareentwicklung. Diese Stationen sind für mich kein Bruch, sondern ein Fundament.",
      "vita.focus.eyebrow": "Entwicklerprofil",
      "vita.focus.title": "Ich verbinde <span class=\"accent-word\">Entwicklung</span>, Daten und Prozessrealität.",
      "vita.focus.apps.kicker": "APEX Anwendungen",
      "vita.focus.apps.title": "Business Apps",
      "vita.focus.apps.text": "Ich entwickle Anwendungen nah am operativen Alltag: Oberflächen, Datenmodelle, Validierungen, Workflows und Integrationen.",
      "vita.focus.oracle.kicker": "Daten & Oracle",
      "vita.focus.oracle.title": "Oracle-Fokus",
      "vita.focus.oracle.text": "Oracle APEX, PL/SQL, REST Data Sources und Oracle DB sind mein aktueller Schwerpunkt in der täglichen Entwicklung.",
      "vita.focus.delivery.kicker": "Lieferung & Betrieb",
      "vita.focus.delivery.title": "Lieferfähigkeit",
      "vita.focus.delivery.text": "Scrum, Product Ownership, PRINCE2 und ITIL helfen mir, Anforderungen, Umsetzung und Betrieb zusammenzudenken.",
      "vita.timeline.eyebrow": "Stationen",
      "vita.timeline.title": "Beruflicher <span class=\"accent-word\">Verlauf</span>",
      "vita.job1.title": "Softwareentwickler - Pragmatis GmbH",
      "vita.job1.text": "Neufahrn bei Freising. Entwicklung mit Oracle APEX, PL/SQL, JavaScript, HTML, CSS, REST Data Sources, RESTful Services und Oracle DB.",
      "vita.job2.title": "Praktikum Softwareentwicklung - Europa Möbel-Verbund",
      "vita.job2.text": "Praxis mit Java, SQL, Datenbanken, Git, Kanban, Confluence, Jira, Vaadin, MVC, Spring Framework, Spring Boot und UML.",
      "vita.job3.title": "Ausbildung Fachinformatiker Anwendungsentwicklung - WBS Gruppe",
      "vita.job3.text": "Schwerpunkte: OOP, Software-Entwurfsmuster, Java, SQL, Datenbanken, agile Methoden, DBMS, HTML, CSS und Microsoft SQL Server.",
      "vita.job4.title": "Purchasing - Munich Airport Marriott Hotel",
      "vita.job4.text": "Purchasing Agent und Purchasing Supervisor mit Verantwortung für Beschaffung, Abstimmung, operative Abläufe und verlässliche Prozesse.",
      "vita.job5.title": "Gastronomielaufbahn - Munich Airport Marriott Hotel",
      "vita.job5.text": "Ausbildung zum Koch, Commis de Cuisine, Demi Chef de Partie, Chef de Partie und Food and Beverage Trainee.",
      "vita.cert.eyebrow": "Zertifikate",
      "vita.cert.title": "Methodik und<br><span class=\"accent-word\">Projektverständnis</span>",
      "vita.cert.oracle": "Oracle APEX Cloud Developer Professional",
      "vita.cert.media": "Credential Stack",
      "vita.cert.media.title": "Nachweise, die mein Profil technisch einordnen.",
      "vita.cert.media.text": "Oracle-Entwicklung, agile Projektarbeit, IT-Service-Verständnis und formale Anwendungsentwicklung als belastbare Grundlage für Business-nahe Software.",
      "vita.cert.oracle.meta": "Oracle University · Professional",
      "vita.cert.wbs.meta": "WBS Training · IHK-Kontext",
      "vita.cert.agile.meta": "GFN · Scrum Master & Product Owner",
      "vita.cert.prince.meta": "GFN · PRINCE2 Projektleitung",
      "vita.cert.itil.meta": "GFN · ITIL Foundation",
      "vita.contact.title": "Wenn das <span class=\"accent-word\">Profil</span> passt, freue ich mich über eine Nachricht.",
      "vita.pdf": "Vita als PDF speichern",
      "vita.print.role": "Softwareentwickler · Oracle APEX · PL/SQL · JavaScript",
      "vita.print.summary": "Business-nahe Softwareentwicklung mit Fokus auf Oracle APEX, saubere Datenmodelle, praxistaugliche Oberflächen und Prozesse, die im operativen Alltag funktionieren.",
      "vita.print.location": "Freising, Deutschland",
      "vita.job1.date": "Dez. 2023 - Heute",
      "vita.job2.date": "Sept. 2022 - Apr. 2023",
      "vita.job3.date": "Aug. 2021 - Juni 2023",
      "vita.job4.date": "2015 - 2021",
      "vita.job5.date": "2003 - 2015",
      "vita.back": "Zur Startseite",

      "imprint.eyebrow": "Anbieterkennzeichnung",
      "imprint.title": "<span class=\"accent-word\">Impressum</span>",
      "imprint.owner": "Webseitenbetreiber",
      "imprint.contact": "<span class=\"accent-word\">Kontakt</span>",
      "imprint.responsible": "Verantwortlich für den Inhalt",
      "imprint.note": "Diese Seite ist eine private Portfolio-Homepage.",

      "privacy.eyebrow": "Datenschutz",
      "privacy.title": "<span class=\"accent-word\">Datenschutzerklärung</span>",
      "privacy.intro": "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Portfolio-Website verarbeitet werden.",
      "privacy.controller": "Verantwortliche Stelle",
      "privacy.access": "Hosting und Zugriffsdaten",
      "privacy.access.text": "Diese Website wird über GitHub Pages bereitgestellt. Beim Besuch können technisch notwendige Zugriffsdaten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Abrufs, Browser- und Geräteinformationen, Referrer-URL sowie angeforderte Dateien. GitHub gibt an, dass IP-Adressen von Besuchern von GitHub-Pages-Websites unabhängig vom Login-Status aus Sicherheitsgründen protokolliert werden. Die Verarbeitung dient der sicheren, stabilen und fehlerfreien Bereitstellung dieser Website.",
      "privacy.contact": "Kontaktaufnahme",
      "privacy.contact.text": "Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten Angaben zur Bearbeitung der Anfrage verarbeitet. Dazu gehören insbesondere Ihre E-Mail-Adresse, der Inhalt Ihrer Nachricht und die dabei entstehenden Kommunikationsdaten. Die Daten werden nicht ohne Einwilligung weitergegeben.",
      "privacy.fonts": "Cookies und lokale Speicherung",
      "privacy.fonts.text": "Diese Website verwendet Systemschriftarten und verzichtet auf Analytics, Marketing-Cookies und Tracking-Skripte. Zur Anzeige des Cookie-Hinweises wird die getroffene Auswahl lokal im Browser gespeichert. Diese Speicherung ist technisch notwendig, damit die Auswahl nicht bei jedem Seitenaufruf erneut abgefragt wird. Wenn Sie zustimmen, kann zusätzlich die gewählte Sprache lokal gespeichert werden. Sie können die Auswahl jederzeit über den Link „Cookie-Einstellungen“ im Footer ändern.",
      "privacy.links": "Externe Links",
      "privacy.links.text": "Diese Website verlinkt auf externe Profile und Dienste, insbesondere LinkedIn, GitHub und Instagram. Erst beim Öffnen dieser Links verlassen Sie diese Website; anschließend gelten die Datenschutzbestimmungen der jeweiligen Anbieter.",
      "privacy.rights": "Ihre Rechte",
      "privacy.rights.text": "Sie haben im Rahmen der gesetzlichen Bestimmungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Außerdem besteht ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde.",
      "privacy.legal": "Rechtsgrundlagen",
      "privacy.legal.text": "Die Verarbeitung erfolgt, soweit einschlägig, auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO wegen des berechtigten Interesses an einer sicheren und stabilen Websitebereitstellung sowie auf Grundlage von Art. 6 Abs. 1 lit. b oder lit. f DSGVO zur Bearbeitung freiwilliger Kontaktanfragen. Die optionale Speicherung der Sprachwahl erfolgt auf Grundlage Ihrer Einwilligung.",
      "privacy.note": "Stand: 29. Mai 2026. Diese Erklärung ist bewusst auf den aktuellen Umfang dieser statischen Portfolio-Website beschränkt. Bei zusätzlichem Tracking, Formularen, eingebetteten Inhalten oder Analytics sollte sie vor Veröffentlichung juristisch geprüft und erweitert werden.",

      "cookie.eyebrow": "Datenschutz",
      "cookie.title": "Cookie-Einstellungen",
      "cookie.text": "Keine Analytics, keine Marketing-Cookies. Optional kann die Sprachwahl gespeichert werden.",
      "cookie.necessary.title": "Notwendige Speicherung",
      "cookie.necessary.text": "Speichert deine Cookie-Auswahl und sorgt dafür, dass die Seite zuverlässig funktioniert.",
      "cookie.preferences.title": "Komfortspeicherung",
      "cookie.preferences.text": "Merkt sich deine gewählte Sprache für den nächsten Besuch.",
      "cookie.acceptAll": "Alle akzeptieren",
      "cookie.save": "Auswahl speichern",
      "cookie.necessaryOnly": "Nur notwendige",
      "cookie.privacy": "Datenschutz ansehen",
      "cookie.settings": "Cookie-Einstellungen",
      "cookie.optionsLabel": "Cookie-Kategorien"
    },

    en: {
      "meta.home.title": "Phil Kirchner - Software Developer",
      "meta.home.description": "Portfolio of Phil Kirchner: software development, Oracle APEX, PL/SQL, JavaScript, Java and structured product thinking.",
      "meta.vita.title": "Phil Kirchner - Resume",
      "meta.vita.description": "Resume of Phil Kirchner: software development, Oracle APEX, PL/SQL, Java, education, certificates and professional experience.",
      "meta.imprint.title": "Phil Kirchner - Legal Notice",
      "meta.privacy.title": "Phil Kirchner - Privacy",
      "meta.signals.title": "Phil Kirchner - Signal Index",
      "meta.signals.description": "Hidden interface manual of the portfolio site: Easter eggs, shortcuts, cursor signals and secret UI protocols.",
      "meta.404.title": "Phil Kirchner - Page not found",
      "meta.404.description": "This portfolio page was not found.",

      "nav.profile": "Profile",
      "nav.projects": "Projects",
      "nav.stack": "Stack",
      "nav.vita": "Resume",
      "nav.linkedin": "LinkedIn",
      "nav.imprint": "Legal Notice",
      "nav.privacy": "Privacy",
      "nav.signals": "Signal Index",

      "signals.eyebrow": "Hidden interface",
      "signals.title": "Signal Index / <span class=\"accent-word\">Easter Egg Manual</span>",
      "signals.intro": "This page collects the deliberately hidden interactions of the homepage. None of them is required, but all of them belong to the identity of the interface.",
      "signals.status": "Not in the main menu · reachable through footer signal or Dev Console",
      "signals.catalog.eyebrow": "Discovery protocol",
      "signals.catalog.title": "All known <span class=\"accent-word\">signals</span>",
      "signals.note.title": "Note",
      "signals.note.text": "All effects are local, temporary and respect reduced motion. No external services, tracking or analytics are triggered.",
      "signals.back": "Back to homepage",
      ...signalCardTranslations.en,
      "trace.entry": "trace profile",
      "vita.playback": "play timeline",

      "error.eyebrow": "404",
      "error.title": "This page does not exist here.",
      "error.text": "The link is either outdated or the page has been moved. The homepage, resume and contact options are still available.",
      "error.home": "Back home",

      "hero.eyebrow": "Software developer from Freising",
      "hero.title": "I build <span class=\"accent-token\"><span class=\"accent-word\">software</span></span> that does not just digitize work. It <span class=\"accent-token\"><span class=\"accent-word\">drives</span></span> it.",
      "hero.text": "I come from operational responsibility: I know purchasing, processes and teams from hands-on work. Today I build applications with Oracle APEX, PL/SQL, JavaScript and Java. That mix is my edge: technology that does not just run, but creates impact in daily work.",
      "hero.status": "Open to conversations",
      "hero.mail": "Get in touch",
      "hero.vita": "View resume",
      "facts.focus.label": "Focus",
      "facts.focus.value": "Business apps",
      "facts.stack.label": "Stack",
      "facts.mode.label": "Mode",
      "facts.mode.value": "Agile & structured",

      "position.eyebrow": "What sets me apart",
      "position.title": "I do not think about <span class=\"accent-word\">software</span> only from the code outward.",
      "position.p1": "Before moving into IT, I spent many years in hospitality, purchasing and process responsibility. I know pressure, handovers, priorities, supply chains, coordination and the moments when a good tool changes the day.",
      "position.p2": "That is why I like building applications that make processes visible, keep data clean and help people stay in their flow.",

      "projects.eyebrow": "Project spotlights",
      "projects.title": "Work that shows how I <span class=\"accent-word\">think</span>.",
      "project.home.title": "Modernized personal homepage",
      "project.home.text": "A static, fast portfolio site with clearer positioning, responsive layout, DE/EN language switching and a stronger SEO foundation.",
      "project.home.result": "Static · bilingual · no build step",
      "project.apex.title": "Oracle-centered application development",
      "project.apex.text": "Focus on interfaces, data models and workflows around Oracle APEX, PL/SQL, REST Data Sources and structured data management.",
      "project.apex.result": "Data-driven · workflow-focused · robust",
      "project.java.title": "Java, SQL and clean fundamentals",
      "project.java.text": "Training and practice with Java, SQL, Spring Boot, MVC, Vaadin, Git, Jira, Confluence and model-driven software development.",
      "project.java.result": "Modular · transparent · team-ready",

      "stack.eyebrow": "Skill profile",
      "stack.title": "Technology, methods and <span class=\"accent-word\">experience</span> in one profile.",
      "stack.dev.kicker": "Development",
      "stack.dev.title": "Business-focused applications",
      "stack.product.kicker": "Product & process",
      "stack.product.title": "Structure for real workflows",
      "stack.tools.kicker": "Tools",
      "stack.tools.title": "Tools for delivery",

      "contact.eyebrow": "Next step",
      "contact.title": "Let's talk about <span class=\"accent-word\">software</span> that holds up in real operations.",
      "contact.mail": "Write an email",
      "contact.linkedin": "Open LinkedIn",
      "contact.status": "Open to technical conversations and suitable projects.",

      "vita.eyebrow": "Resume",
      "vita.status.focus": "Current focus: Oracle APEX & PL/SQL",
      "vita.status.apps": "Business apps with an operational focus",
      "vita.status.experience": "Software development since 2021",
      "vita.status.certified": "Oracle Certified Professional",
      "vita.title": "A career built from hands-on work, responsibility and <span class=\"accent-word\">software</span>.",
      "vita.intro": "My career began in hospitality and moved through purchasing, process responsibility and project work into software development. These stages are not a detour; they are the foundation.",
      "vita.focus.eyebrow": "Developer profile",
      "vita.focus.title": "I connect <span class=\"accent-word\">development</span>, data and process reality.",
      "vita.focus.apps.kicker": "APEX applications",
      "vita.focus.apps.title": "Business apps",
      "vita.focus.apps.text": "I build applications close to day-to-day operations: interfaces, data models, validations, workflows and integrations.",
      "vita.focus.oracle.kicker": "Data & Oracle",
      "vita.focus.oracle.title": "Oracle focus",
      "vita.focus.oracle.text": "Oracle APEX, PL/SQL, REST Data Sources and Oracle DB are my current focus in daily development work.",
      "vita.focus.delivery.kicker": "Delivery & operations",
      "vita.focus.delivery.title": "Delivery mindset",
      "vita.focus.delivery.text": "Scrum, Product Ownership, PRINCE2 and ITIL help me connect requirements, implementation and operations.",
      "vita.timeline.eyebrow": "Experience",
      "vita.timeline.title": "Professional <span class=\"accent-word\">path</span>",
      "vita.job1.title": "Software Developer - Pragmatis GmbH",
      "vita.job1.text": "Neufahrn near Freising. Development with Oracle APEX, PL/SQL, JavaScript, HTML, CSS, REST Data Sources, RESTful Services and Oracle DB.",
      "vita.job2.title": "Software Development Internship - Europa Möbel-Verbund",
      "vita.job2.text": "Practice with Java, SQL, databases, Git, Kanban, Confluence, Jira, Vaadin, MVC, Spring Framework, Spring Boot and UML.",
      "vita.job3.title": "Apprenticeship IT Specialist for Application Development - WBS Group",
      "vita.job3.text": "Focus areas: OOP, software design patterns, Java, SQL, databases, agile methods, DBMS, HTML, CSS and Microsoft SQL Server.",
      "vita.job4.title": "Purchasing - Munich Airport Marriott Hotel",
      "vita.job4.text": "Purchasing Agent and Purchasing Supervisor with responsibility for procurement, coordination, operations and reliable processes.",
      "vita.job5.title": "Culinary career - Munich Airport Marriott Hotel",
      "vita.job5.text": "Apprenticeship as cook, Commis de Cuisine, Demi Chef de Partie, Chef de Partie and Food and Beverage Trainee.",
      "vita.cert.eyebrow": "Certificates",
      "vita.cert.title": "Methods and<br><span class=\"accent-word\">project understanding</span>",
      "vita.cert.oracle": "Oracle APEX Cloud Developer Professional",
      "vita.cert.media": "Credential stack",
      "vita.cert.media.title": "Credentials that frame my technical profile.",
      "vita.cert.media.text": "Oracle development, agile project work, IT service understanding and formal application development as a solid foundation for business-focused software.",
      "vita.cert.oracle.meta": "Oracle University · Professional",
      "vita.cert.wbs.meta": "WBS Training · IHK context",
      "vita.cert.agile.meta": "GFN · Scrum Master & Product Owner",
      "vita.cert.prince.meta": "GFN · PRINCE2 project leadership",
      "vita.cert.itil.meta": "GFN · ITIL Foundation",
      "vita.contact.title": "If the <span class=\"accent-word\">profile</span> fits, I would be happy to hear from you.",
      "vita.pdf": "Save resume as PDF",
      "vita.print.role": "Software Developer · Oracle APEX · PL/SQL · JavaScript",
      "vita.print.summary": "Business-focused software development with a focus on Oracle APEX, clean data models, practical interfaces and processes that work in day-to-day operations.",
      "vita.print.location": "Freising, Germany",
      "vita.job1.date": "Dec 2023 - Present",
      "vita.job2.date": "Sep 2022 - Apr 2023",
      "vita.job3.date": "Aug 2021 - Jun 2023",
      "vita.job4.date": "2015 - 2021",
      "vita.job5.date": "2003 - 2015",
      "vita.back": "Back home",

      "imprint.eyebrow": "Legal information",
      "imprint.title": "<span class=\"accent-word\">Legal Notice</span>",
      "imprint.owner": "Website owner",
      "imprint.contact": "<span class=\"accent-word\">Contact</span>",
      "imprint.responsible": "Responsible for content",
      "imprint.note": "This page is a private portfolio homepage.",

      "privacy.eyebrow": "Privacy",
      "privacy.title": "<span class=\"accent-word\">Privacy Policy</span>",
      "privacy.intro": "This privacy policy explains which personal data may be processed when visiting this portfolio website.",
      "privacy.controller": "Controller",
      "privacy.access": "Hosting and access data",
      "privacy.access.text": "This website is hosted on GitHub Pages. When visiting it, technically necessary access data may be processed, especially IP address, date and time of access, browser and device information, referrer URL and requested files. GitHub states that IP addresses of visitors to GitHub Pages websites are logged for security purposes, regardless of whether visitors are signed in. This processing serves the secure, stable and reliable delivery of this website.",
      "privacy.contact": "Contact",
      "privacy.contact.text": "If you contact me by email, the information you provide is processed to handle the request. This especially includes your email address, the content of your message and the resulting communication data. The data is not shared without consent.",
      "privacy.fonts": "Cookies and local storage",
      "privacy.fonts.text": "This website uses system fonts and does not use analytics, marketing cookies or tracking scripts. To display the cookie notice, your selected choice is stored locally in the browser. This storage is technically necessary so the choice does not need to be requested again on every page view. If you consent, the selected language can also be stored locally. You can change the choice at any time through the “Cookie settings” link in the footer.",
      "privacy.links": "External links",
      "privacy.links.text": "This website links to external profiles and services, especially LinkedIn, GitHub and Instagram. Only when opening those links do you leave this website; the privacy policies of the respective providers then apply.",
      "privacy.rights": "Your rights",
      "privacy.rights.text": "Within the scope of applicable law, you have rights to access, rectification, erasure, restriction of processing, data portability and objection to certain processing. You may also lodge a complaint with a competent supervisory authority.",
      "privacy.legal": "Legal bases",
      "privacy.legal.text": "Processing is based, where applicable, on Art. 6(1)(f) GDPR due to the legitimate interest in providing a secure and stable website and on Art. 6(1)(b) or (f) GDPR for handling voluntary contact requests. Optional storage of the language choice is based on your consent.",
      "privacy.note": "Last updated: May 29, 2026. This policy is intentionally limited to the current scope of this static portfolio website. If tracking, forms, embedded content or analytics are added, it should be legally reviewed and expanded before publication.",

      "cookie.eyebrow": "Privacy",
      "cookie.title": "Cookie settings",
      "cookie.text": "No analytics, no marketing cookies. Optionally, your language choice can be saved.",
      "cookie.necessary.title": "Necessary storage",
      "cookie.necessary.text": "Stores your cookie choice and keeps the website working reliably.",
      "cookie.preferences.title": "Preference storage",
      "cookie.preferences.text": "Remembers your selected language for your next visit.",
      "cookie.acceptAll": "Accept all",
      "cookie.save": "Save selection",
      "cookie.necessaryOnly": "Necessary only",
      "cookie.privacy": "View privacy policy",
      "cookie.settings": "Cookie settings",
      "cookie.optionsLabel": "Cookie categories"
    },
    ja: {
      "meta.home.title": "Phil Kirchner - ソフトウェア開発者",
      "meta.home.description": "Phil Kirchnerのポートフォリオ：ソフトウェア開発、Oracle APEX、PL/SQL、JavaScript、Java、構造化されたプロダクトワーク。",
      "meta.vita.title": "Phil Kirchner - 経歴",
      "meta.vita.description": "Phil Kirchnerの経歴：ソフトウェア開発、Oracle APEX、PL/SQL、Java、教育、認定資格、職務経験。",
      "meta.imprint.title": "Phil Kirchner - 法的表示",
      "meta.privacy.title": "Phil Kirchner - プライバシー",
      "meta.signals.title": "Phil Kirchner - Signal Index",
      "meta.signals.description": "ポートフォリオサイトの隠しインターフェース手帳：Easter Egg、ショートカット、カーソル信号、秘密のUIプロトコル。",
      "meta.404.title": "Phil Kirchner - ページが見つかりません",
      "meta.404.description": "このポートフォリオページは見つかりませんでした。",
      "nav.profile": "プロフィール",
      "nav.projects": "プロジェクト",
      "nav.stack": "スタック",
      "nav.vita": "経歴",
      "nav.linkedin": "LinkedIn",
      "nav.imprint": "法的表示",
      "nav.privacy": "プライバシー",
      "nav.signals": "Signal Index",

      "signals.eyebrow": "隠しインターフェース",
      "signals.title": "Signal Index / <span class=\"accent-word\">Easter Egg Manual</span>",
      "signals.intro": "このページは、ホームページに意図的に隠されたインタラクションをまとめたものです。必須ではありませんが、インターフェースの個性を作る要素です。",
      "signals.status": "メインメニュー非表示 · フッター信号またはDev Consoleからアクセス",
      "signals.catalog.eyebrow": "Discovery protocol",
      "signals.catalog.title": "既知の<span class=\"accent-word\">信号</span>",
      "signals.note.title": "注意",
      "signals.note.text": "すべてのエフェクトはローカルかつ一時的で、reduced motionを尊重します。外部サービス、トラッキング、Analyticsは実行されません。",
      "signals.back": "トップへ戻る",
      ...signalCardTranslations.ja,
      "trace.entry": "trace profile",
      "vita.playback": "timeline再生",

      "error.eyebrow": "404",
      "error.title": "このページはここにはありません。",
      "error.text": "リンクが古いか、ページが移動された可能性があります。トップページ、経歴、連絡手段は引き続き利用できます。",
      "error.home": "トップへ戻る",
      "hero.eyebrow": "Freisingのソフトウェア開発者",
      "hero.title": "私は、プロセスをデジタル化するだけでなく、業務を前へ動かす<span class=\"accent-token\"><span class=\"accent-word\">ソフトウェア</span><span class=\"accent-punctuation\">を</span></span>作ります。",
      "hero.text": "私の出発点は現場での責任です。購買、プロセス、チーム運営を実務として理解しています。現在はOracle APEX、PL/SQL、JavaScript、Javaでアプリケーションを開発しています。この組み合わせが私の強みです。単に動く技術ではなく、日々の業務で効果を出す技術です。",
      "hero.status": "技術的な対話を歓迎",
      "hero.mail": "連絡する",
      "hero.vita": "経歴を見る",
      "facts.focus.label": "フォーカス",
      "facts.focus.value": "Business Apps",
      "facts.stack.label": "スタック",
      "facts.mode.label": "進め方",
      "facts.mode.value": "アジャイル & 構造的",
      "position.eyebrow": "私の違い",
      "position.title": "私は<span class=\"accent-word\">ソフトウェア</span>をコードだけから考えません。",
      "position.p1": "ITへ移る前、私は長年、飲食業、購買、プロセス責任の現場で働いてきました。プレッシャー、引き継ぎ、優先順位、サプライチェーン、調整、そして良いツールが差を生む瞬間を知っています。",
      "position.p2": "だからこそ、プロセスを見える化し、データを正しく扱い、人の業務フローを軽くするアプリケーションを作ることに強い関心があります。",
      "projects.eyebrow": "プロジェクト・スポットライト",
      "projects.title": "私の<span class=\"accent-word\">考え方</span>が見える仕事。",
      "project.home.title": "個人ホームページのモダナイズ",
      "project.home.text": "明確なポジショニング、レスポンシブレイアウト、DE/EN/JP切替、改善されたSEO基盤を備えた、静的で高速なポートフォリオサイト。",
      "project.home.result": "静的 · 三言語対応 · ビルド不要",
      "project.apex.title": "Oracle中心のアプリケーション開発",
      "project.apex.text": "Oracle APEX、PL/SQL、REST Data Sources、構造化されたデータ管理を中心に、UI、データモデル、業務フローへフォーカス。",
      "project.apex.result": "データ駆動 · ワークフロー重視 · 堅牢",
      "project.java.title": "Java、SQL、クリーンな基礎設計",
      "project.java.text": "Java、SQL、Spring Boot、MVC、Vaadin、Git、Jira、Confluence、モデル駆動のソフトウェア開発に関する教育と実務経験。",
      "project.java.result": "モジュール化 · 追跡可能 · チーム対応",
      "stack.eyebrow": "スキルプロファイル",
      "stack.title": "技術、方法論、<span class=\"accent-word\">経験</span>を一つのプロフィールに。",
      "stack.dev.kicker": "開発",
      "stack.dev.title": "業務に近いアプリケーション",
      "stack.product.kicker": "プロダクト & プロセス",
      "stack.product.title": "実際の業務フローのための構造",
      "stack.tools.kicker": "ツール",
      "stack.tools.title": "デリバリーを支えるツール",
      "contact.eyebrow": "次のステップ",
      "contact.title": "実運用で耐えられる<span class=\"accent-word\">ソフトウェア</span>について話しましょう。",
      "contact.mail": "メールを書く",
      "contact.linkedin": "LinkedInを開く",
      "contact.status": "技術的な対話と適切なプロジェクトにオープンです。",
      "vita.eyebrow": "経歴",
      "vita.status.focus": "現在のフォーカス：Oracle APEX & PL/SQL",
      "vita.status.apps": "現場起点のBusiness Apps",
      "vita.status.experience": "2021年からソフトウェア開発",
      "vita.status.certified": "Oracle Certified Professional",
      "vita.title": "現場経験、責任、そして<span class=\"accent-word\">ソフトウェア</span>から成るキャリア。",
      "vita.intro": "私のキャリアは飲食業から始まり、購買、プロセス責任、プロジェクト業務を経てソフトウェア開発へ進みました。これらは遠回りではなく、私の土台です。",
      "vita.focus.eyebrow": "開発者プロフィール",
      "vita.focus.title": "私は<span class=\"accent-word\">開発</span>、データ、そして現場のプロセスをつなぎます。",
      "vita.focus.apps.kicker": "APEXアプリケーション",
      "vita.focus.apps.title": "Business Apps",
      "vita.focus.apps.text": "日々の業務に近いアプリケーションを開発します。UI、データモデル、バリデーション、ワークフロー、連携が対象です。",
      "vita.focus.oracle.kicker": "データ & Oracle",
      "vita.focus.oracle.title": "Oracleフォーカス",
      "vita.focus.oracle.text": "Oracle APEX、PL/SQL、REST Data Sources、Oracle DBが、現在の日々の開発における中心です。",
      "vita.focus.delivery.kicker": "デリバリー & 運用",
      "vita.focus.delivery.title": "届け切る力",
      "vita.focus.delivery.text": "Scrum、Product Ownership、PRINCE2、ITILは、要件、実装、運用をつなげて考えるための基盤です。",
      "vita.timeline.eyebrow": "職務経験",
      "vita.timeline.title": "職務<span class=\"accent-word\">経歴</span>",
      "vita.job1.title": "ソフトウェア開発者 - Pragmatis GmbH",
      "vita.job1.text": "Neufahrn bei Freising。Oracle APEX、PL/SQL、JavaScript、HTML、CSS、REST Data Sources、RESTful Services、Oracle DBによる開発。",
      "vita.job2.title": "ソフトウェア開発インターン - Europa Möbel-Verbund",
      "vita.job2.text": "Java、SQL、データベース、Git、Kanban、Confluence、Jira、Vaadin、MVC、Spring Framework、Spring Boot、UMLの実務経験。",
      "vita.job3.title": "アプリケーション開発 Fachinformatiker 職業訓練 - WBS Gruppe",
      "vita.job3.text": "重点領域：OOP、ソフトウェア設計パターン、Java、SQL、データベース、アジャイル手法、DBMS、HTML、CSS、Microsoft SQL Server。",
      "vita.job4.title": "購買 - Munich Airport Marriott Hotel",
      "vita.job4.text": "Purchasing AgentおよびPurchasing Supervisorとして、調達、調整、運用フロー、信頼できるプロセスを担当。",
      "vita.job5.title": "飲食業でのキャリア - Munich Airport Marriott Hotel",
      "vita.job5.text": "調理師見習い、Commis de Cuisine、Demi Chef de Partie、Chef de Partie、Food and Beverage Trainee。",
      "vita.cert.eyebrow": "認定資格",
      "vita.cert.title": "方法論と<br><span class=\"accent-word\">プロジェクト理解</span>",
      "vita.cert.oracle": "Oracle APEX Cloud Developer Professional",
      "vita.cert.media": "Credential Stack",
      "vita.cert.media.title": "技術プロフィールを裏づける認定。",
      "vita.cert.media.text": "Oracle開発、アジャイルなプロジェクトワーク、ITサービス理解、正式なアプリケーション開発教育。業務に近いソフトウェアのための実用的な基盤です。",
      "vita.cert.oracle.meta": "Oracle University · Professional",
      "vita.cert.wbs.meta": "WBS Training · IHK context",
      "vita.cert.agile.meta": "GFN · Scrum Master & Product Owner",
      "vita.cert.prince.meta": "GFN · PRINCE2 project leadership",
      "vita.cert.itil.meta": "GFN · ITIL Foundation",
      "vita.contact.title": "この<span class=\"accent-word\">プロフィール</span>が合うなら、ぜひご連絡ください。",
      "vita.pdf": "経歴をPDFで保存",
      "vita.print.role": "ソフトウェア開発者 · Oracle APEX · PL/SQL · JavaScript",
      "vita.print.summary": "Oracle APEX、クリーンなデータモデル、実用的なUI、現場で機能するプロセスに焦点を当てた業務寄りのソフトウェア開発。",
      "vita.print.location": "Freising, Germany",
      "vita.job1.date": "2023年12月 - 現在",
      "vita.job2.date": "2022年9月 - 2023年4月",
      "vita.job3.date": "2021年8月 - 2023年6月",
      "vita.job4.date": "2015年 - 2021年",
      "vita.job5.date": "2003年 - 2015年",
      "vita.back": "トップへ戻る",
      "imprint.eyebrow": "法的表示",
      "imprint.title": "<span class=\"accent-word\">法的表示</span>",
      "imprint.owner": "サイト運営者",
      "imprint.contact": "<span class=\"accent-word\">連絡先</span>",
      "imprint.responsible": "コンテンツ責任者",
      "imprint.note": "このページは個人のポートフォリオサイトです。",
      "privacy.eyebrow": "プライバシー",
      "privacy.title": "<span class=\"accent-word\">プライバシーポリシー</span>",
      "privacy.intro": "このプライバシーポリシーは、このポートフォリオサイトを訪問した際に処理される可能性のある個人データについて説明します。",
      "privacy.controller": "管理者",
      "privacy.access": "ホスティングとアクセスデータ",
      "privacy.access.text": "このWebサイトはGitHub Pagesで提供されています。訪問時には、技術的に必要なアクセスデータが処理される場合があります。特にIPアドレス、アクセス日時、ブラウザおよびデバイス情報、リファラーURL、要求されたファイルなどです。GitHubは、GitHub Pagesサイト訪問者のIPアドレスをログイン状態に関係なくセキュリティ目的で記録するとしています。この処理は、Webサイトを安全かつ安定して提供するためのものです。",
      "privacy.contact": "連絡",
      "privacy.contact.text": "メールで連絡する場合、送信された情報は問い合わせ対応のために処理されます。これには、メールアドレス、メッセージ内容、およびその後の通信データが含まれます。データは同意なく第三者へ提供されません。",
      "privacy.fonts": "Cookieとローカル保存",
      "privacy.fonts.text": "このWebサイトはシステムフォントを使用し、Analytics、マーケティングCookie、トラッキングスクリプトは使用しません。Cookie通知の表示のため、選択内容はブラウザにローカル保存されます。これは毎回選択を求めないために技術的に必要です。同意した場合、選択した言語もローカル保存できます。フッターの「Cookie設定」リンクからいつでも変更できます。",
      "privacy.links": "外部リンク",
      "privacy.links.text": "このWebサイトはLinkedIn、GitHub、Instagramなどの外部プロフィールやサービスへリンクしています。これらのリンクを開いた場合のみ、このWebサイトを離れ、各提供者のプライバシーポリシーが適用されます。",
      "privacy.rights": "あなたの権利",
      "privacy.rights.text": "適用法の範囲内で、アクセス、訂正、削除、処理制限、データポータビリティ、および特定の処理への異議申立ての権利があります。また、管轄の監督機関へ苦情を申し立てることもできます。",
      "privacy.legal": "法的根拠",
      "privacy.legal.text": "処理は、該当する場合、安全で安定したWebサイト提供という正当な利益に基づくGDPR第6条第1項(f)、および任意の問い合わせ対応に関するGDPR第6条第1項(b)または(f)に基づきます。任意の言語選択の保存は同意に基づきます。",
      "privacy.note": "最終更新：2026年5月29日。このポリシーは、現在の静的ポートフォリオサイトの範囲に意図的に限定しています。トラッキング、フォーム、埋め込みコンテンツ、Analyticsを追加する場合は、公開前に法的確認と拡張が必要です。",
      "cookie.eyebrow": "プライバシー",
      "cookie.title": "Cookie設定",
      "cookie.text": "AnalyticsやマーケティングCookieは使用しません。任意で言語選択を保存できます。",
      "cookie.necessary.title": "必要な保存",
      "cookie.necessary.text": "Cookieの選択を保存し、Webサイトを安定して動作させます。",
      "cookie.preferences.title": "快適化の保存",
      "cookie.preferences.text": "次回訪問時のために選択した言語を記憶します。",
      "cookie.acceptAll": "すべて許可",
      "cookie.save": "選択を保存",
      "cookie.necessaryOnly": "必要なものだけ",
      "cookie.privacy": "プライバシーを見る",
      "cookie.settings": "Cookie設定",
      "cookie.optionsLabel": "Cookieカテゴリ"
    }
  };

  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("primary-nav");
  const langToggle = document.getElementById("lang-toggle");
  const root = document.documentElement;
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-visual img");
  const heroScrollDim = document.querySelector(".hero-scroll-dim");
  const signalCanvas = document.querySelector(".signal-canvas");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const isFirefox = navigator.userAgent.includes("Firefox");
  const supportsScrollTimeline = CSS.supports("animation-timeline: scroll()");
  const LANG_STORAGE_KEY = "lang";
  const LANG_META = {
    de: { short: "DE", nativeName: "Deutsch", nextLabel: "Nächste Sprache", switchLabel: "Sprache wechseln", currentLabel: "Aktuell" },
    en: { short: "EN", nativeName: "English", nextLabel: "Next language", switchLabel: "Switch language", currentLabel: "Current" },
    ja: { short: "JP", nativeName: "日本語", nextLabel: "次の言語", switchLabel: "言語を切り替え", currentLabel: "現在" }
  };
  const CONSENT_STORAGE_KEY = "pk-cookie-consent";
  const CONSENT_VERSION = 1;
  const PORTFOLIO_BOOT_SESSION_KEY = "pk-portfolio-boot-seen";
  const FIRST_TIME_GUIDE_SESSION_KEY = "pk-first-time-guide-seen";
  let scrollTicking = false;
  let lastScrolledState = null;
  let heroHeight = hero ? Math.max(hero.offsetHeight, 1) : 1;
  let lastHeroFrame = "";
  const shouldRunPortfolioBoot = (() => {
    if (reduceMotion.matches) return false;
    try {
      return sessionStorage.getItem(PORTFOLIO_BOOT_SESSION_KEY) !== "1";
    } catch (error) {
      return false;
    }
  })();

  if (shouldRunPortfolioBoot) {
    root.classList.add("portfolio-boot-active", "portfolio-nav-boot", "portfolio-hero-locked");
  }

  const scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  scrollProgress.setAttribute("aria-hidden", "true");
  document.body.prepend(scrollProgress);

  function sanitizeLang(lang) {
    const value = String(lang || "").toLowerCase();
    if (SUPPORTED_LANGS.includes(value)) return value;
    if (value.startsWith("en")) return "en";
    if (value.startsWith("de")) return "de";
    if (value.startsWith("ja") || value.startsWith("jp")) return "ja";
    return DEFAULT_LANG;
  }

  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function removeStoredLang() {
    try {
      localStorage.removeItem(LANG_STORAGE_KEY);
    } catch (error) {
      // Storage can fail in strict privacy modes; the page still works.
    }
  }

  function getCookieConsent() {
    try {
      const value = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!value) return null;
      const consent = JSON.parse(value);
      if (consent && consent.version === CONSENT_VERSION) return consent;
    } catch (error) {
      return null;
    }
    return null;
  }

  function hasPreferenceConsent() {
    return Boolean(getCookieConsent()?.preferences);
  }

  function storeLang(lang) {
    if (!hasPreferenceConsent()) {
      removeStoredLang();
      return;
    }

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (error) {
      // Storage can fail in strict privacy modes; the page still works.
    }
  }

  function getInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const storedLang = hasPreferenceConsent() ? getStoredLang() : null;
    return sanitizeLang(params.get("lang") || storedLang || navigator.language || DEFAULT_LANG);
  }

  function updateLangUrl(lang) {
    if (!("history" in window)) return;
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState({}, "", url);
  }

  function getNextLang(lang) {
    const currentIndex = SUPPORTED_LANGS.indexOf(sanitizeLang(lang));
    return SUPPORTED_LANGS[(currentIndex + 1) % SUPPORTED_LANGS.length] || DEFAULT_LANG;
  }

  function updateLanguageToggleState(lang) {
    if (!langToggle) return;
    const currentLang = sanitizeLang(lang);
    const currentMeta = LANG_META[currentLang] || LANG_META[DEFAULT_LANG];

    langToggle.dataset.currentLang = currentLang;
    langToggle.dataset.currentLabel = currentMeta.nativeName;
    langToggle.title = `${currentMeta.currentLabel}: ${currentMeta.nativeName}`;
    langToggle.setAttribute(
      "aria-label",
      `${currentMeta.switchLabel}. ${currentMeta.currentLabel}: ${currentMeta.nativeName}.`
    );

    langToggle.querySelectorAll("[data-lang-option]").forEach((option) => {
      const optionLang = sanitizeLang(option.dataset.langOption);
      const optionMeta = LANG_META[optionLang] || LANG_META[DEFAULT_LANG];
      const isActive = optionLang === currentLang;
      option.dataset.active = isActive ? "true" : "false";
      option.setAttribute("aria-pressed", isActive ? "true" : "false");
      option.setAttribute("aria-label", `${optionMeta.nativeName} ${isActive ? `(${currentMeta.currentLabel})` : ""}`.trim());
      option.disabled = isActive;
    });
  }

  function getMenuLabel(open) {
    const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
    const labels = {
      de: { open: "Menü öffnen", close: "Menü schließen" },
      en: { open: "Open menu", close: "Close menu" },
      ja: { open: "メニューを開く", close: "メニューを閉じる" }
    };
    const dict = labels[lang] || labels.de;
    return open ? dict.close : dict.open;
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dict[key]) element.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-rich]").forEach((element) => {
      const key = element.dataset.i18nRich;
      if (dict[key]) element.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const mappings = element.dataset.i18nAttr.split(",");
      mappings.forEach((mapping) => {
        const [attr, key] = mapping.split(":").map((part) => part.trim());
        if (attr && key && dict[key]) element.setAttribute(attr, dict[key]);
      });
    });

    document.title = dict[document.querySelector("title[data-i18n]")?.dataset.i18n] || document.title;
    updateLanguageToggleState(lang);
    if (navToggle) {
      navToggle.setAttribute("aria-label", getMenuLabel(navToggle.getAttribute("aria-expanded") === "true"));
    }
  }

  function setLang(lang, updateUrl = false) {
    const nextLang = sanitizeLang(lang);
    storeLang(nextLang);
    applyTranslations(nextLang);
    document.querySelectorAll(".accent-word").forEach((word) => {
      const accentText = word.textContent.trim().toLocaleLowerCase(nextLang);
      const isSoftware = accentText === "software" || accentText === "ソフトウェア";
      if (isSoftware && (document.body.classList.contains("vita-page") || document.querySelector(".hero"))) {
        word.dataset.reflection = word.textContent;
      } else {
        delete word.dataset.reflection;
      }
    });
    if (updateUrl) updateLangUrl(nextLang);
    document.dispatchEvent(new CustomEvent("pk:lang-change", { detail: { lang: nextLang } }));
  }

  function localizedPageHref(path, lang = document.documentElement.dataset.lang || DEFAULT_LANG) {
    const cleanLang = sanitizeLang(lang);
    const suffix = cleanLang === DEFAULT_LANG ? "" : `?lang=${encodeURIComponent(cleanLang)}`;
    return `${path}${suffix}`;
  }

  function setupSignalManualAccess() {
    const footerLinks = document.querySelector(".footer div");
    if (footerLinks && !footerLinks.querySelector("[data-signal-route-link]")) {
      const link = document.createElement("a");
      link.className = "footer-signal-link";
      link.href = "./signals.html";
      link.dataset.signalRouteLink = "true";
      link.dataset.i18n = "nav.signals";
      link.textContent = (translations[document.documentElement.dataset.lang || DEFAULT_LANG] || translations[DEFAULT_LANG])["nav.signals"];
      footerLinks.appendChild(link);
    }

    function updateSignalLinks(lang = document.documentElement.dataset.lang || DEFAULT_LANG) {
      const dict = translations[sanitizeLang(lang)] || translations[DEFAULT_LANG];
      document.querySelectorAll("[data-signal-route-link]").forEach((link) => {
        link.href = localizedPageHref("./signals.html", lang);
        if (link.dataset.i18n === "nav.signals") link.textContent = dict["nav.signals"];
      });
      document.querySelectorAll("[data-signal-home-link]").forEach((link) => {
        link.href = localizedPageHref("./index.html", lang);
      });
    }

    updateSignalLinks();
    document.addEventListener("pk:lang-change", (event) => updateSignalLinks(event.detail?.lang));
  }

  function saveCookieConsent(preferences, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const consent = {
      necessary: true,
      preferences: Boolean(preferences),
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      // If storage is blocked, the visitor can still use the page.
    }

    if (consent.preferences) {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, document.documentElement.dataset.lang || DEFAULT_LANG);
      } catch (error) {
        // Storage can fail in strict privacy modes; the page still works.
      }
    } else {
      removeStoredLang();
    }

    hideCookieBanner();
  }

  function hideCookieBanner() {
    const banner = document.querySelector("[data-pk-consent-banner]");
    if (!banner) return;
    banner.hidden = true;
    banner.dataset.visible = "false";
    document.dispatchEvent(new CustomEvent("pk:cookie-consent-hidden"));
  }

  function openCookieBanner(force = false) {
    if (!force && getCookieConsent()) return;
    // Neutral PK-prefixed data attributes avoid generic cookie-consent filters hiding the full page.
    const existingBanner = document.querySelector("[data-pk-consent-banner]");
    if (existingBanner) {
      const preferencesInput = existingBanner.querySelector("[data-pk-consent-preferences]");
      if (preferencesInput) preferencesInput.checked = Boolean(getCookieConsent()?.preferences);
      existingBanner.hidden = false;
      window.requestAnimationFrame(() => {
        existingBanner.dataset.visible = "true";
      });
      return;
    }

    const consent = getCookieConsent();
    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.dataset.pkConsentBanner = "";
    banner.dataset.visible = "false";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-labelledby", "cookie-consent-title");
    banner.innerHTML = `
      <div class="cookie-consent__card">
        <div class="cookie-consent__intro">
          <p class="eyebrow" data-i18n="cookie.eyebrow">Datenschutz</p>
          <h2 id="cookie-consent-title" data-i18n="cookie.title">Cookie-Einstellungen</h2>
          <p data-i18n="cookie.text">Keine Analytics, keine Marketing-Cookies. Optional kann die Sprachwahl gespeichert werden.</p>
        </div>
        <label class="cookie-option cookie-option--compact">
          <input type="checkbox" data-pk-consent-preferences>
          <span>
            <strong data-i18n="cookie.preferences.title">Komfortspeicherung</strong>
            <small data-i18n="cookie.preferences.text">Merkt sich deine gewählte Sprache für den nächsten Besuch.</small>
          </span>
        </label>
        <div class="cookie-consent__actions">
          <button class="button button-primary" type="button" data-pk-consent-accept-all data-i18n="cookie.acceptAll">Alle akzeptieren</button>
          <button class="button button-secondary" type="button" data-pk-consent-save data-i18n="cookie.save">Auswahl speichern</button>
          <button class="button button-ghost" type="button" data-pk-consent-necessary data-i18n="cookie.necessaryOnly">Nur notwendige</button>
        </div>
        <a class="cookie-consent__privacy" href="./datenschutz.html" data-i18n="cookie.privacy">Datenschutz ansehen</a>
      </div>
    `;

    document.body.appendChild(banner);
    const preferencesInput = banner.querySelector("[data-pk-consent-preferences]");
    preferencesInput.checked = Boolean(consent?.preferences);

    banner.querySelector("[data-pk-consent-accept-all]").addEventListener("click", (event) => saveCookieConsent(true, event));
    banner.querySelector("[data-pk-consent-save]").addEventListener("click", (event) => saveCookieConsent(preferencesInput.checked, event));
    banner.querySelector("[data-pk-consent-necessary]").addEventListener("click", (event) => saveCookieConsent(false, event));

    applyTranslations(document.documentElement.dataset.lang || DEFAULT_LANG);
    window.requestAnimationFrame(() => {
      banner.dataset.visible = "true";
    });
  }

  function addCookieSettingsLink() {
    const footerLinks = document.querySelector(".footer div");
    if (!footerLinks || footerLinks.querySelector("[data-pk-consent-settings]")) return;

    const button = document.createElement("button");
    button.className = "footer-link-button";
    button.type = "button";
    button.dataset.pkConsentSettings = "";
    button.dataset.i18n = "cookie.settings";
    button.textContent = "Cookie-Einstellungen";
    button.addEventListener("click", () => openCookieBanner(true));
    footerLinks.appendChild(button);
  }

  function setupCertificateLightbox() {
    const triggers = document.querySelectorAll("[data-cert-open]");
    if (!triggers.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "cert-lightbox";
    lightbox.dataset.open = "false";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-labelledby", "cert-lightbox-title");
    lightbox.innerHTML = `
      <div class="cert-lightbox__dialog" role="document">
        <div class="cert-lightbox__bar">
          <p class="cert-lightbox__title" id="cert-lightbox-title"></p>
          <button class="cert-lightbox__close" type="button" aria-label="Nachweis schließen">×</button>
        </div>
        <div class="cert-lightbox__stage">
          <img class="cert-lightbox__image" alt="">
        </div>
      </div>
    `;

    document.body.appendChild(lightbox);

    const title = lightbox.querySelector(".cert-lightbox__title");
    const image = lightbox.querySelector(".cert-lightbox__image");
    const closeButton = lightbox.querySelector(".cert-lightbox__close");
    let lastFocus = null;

    function closeLightbox() {
      lightbox.dataset.open = "false";
      document.body.classList.remove("modal-open");
      image.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    }

    function openLightbox(trigger) {
      lastFocus = trigger;
      const src = trigger.dataset.certSrc;
      const certTitle = trigger.dataset.certTitle || trigger.querySelector("img")?.alt || "";
      image.src = src;
      image.alt = certTitle;
      title.textContent = certTitle;
      lightbox.dataset.open = "true";
      document.body.classList.add("modal-open");
      closeButton.focus();
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => openLightbox(trigger));
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.dataset.open === "true") closeLightbox();
    });
  }

  function setupHeroCursor() {
    if (reduceMotion.matches || !finePointer.matches) return;

    const cursor = document.createElement("div");
    const code = document.createElement("span");
    const actionSelector = [
      "a",
      "button",
      "select",
      "summary",
      "input[type='button']",
      "input[type='submit']",
      "input[type='reset']",
      "input[type='checkbox']",
      "input[type='radio']",
      "input[type='range']",
      "input[type='color']",
      "input[type='file']",
      "[role='button']",
      "[tabindex]:not([tabindex='-1'])"
    ].join(", ");
    const textControlSelector = [
      "textarea",
      "input:not([type])",
      "input[type='text']",
      "input[type='email']",
      "input[type='search']",
      "input[type='password']",
      "input[type='tel']",
      "input[type='url']",
      "input[type='number']",
      "input[type='date']",
      "input[type='datetime-local']",
      "input[type='month']",
      "input[type='time']",
      "input[type='week']",
      "[contenteditable='']",
      "[contenteditable='true']",
      "[role='textbox']"
    ].join(", ");
    const keywordSignals = [
      { pattern: /\bPhil\s+Kirchner\b/i, label: "{PK}", className: "is-name-signal" },
      { pattern: /\bPhil\b|\bKirchner\b|\bPK\b/i, label: "{PK}", className: "is-name-signal" },
      { pattern: /\bOracle\s+APEX\b/i, label: "APEX", className: "is-app-keyword" },
      { pattern: /\bOracle\s+DB\b/i, label: "DB", className: "is-db-keyword" },
      { pattern: /\bREST\s+Data\s+Sources?\b/i, label: "RDS", className: "is-api-keyword" },
      { pattern: /\bRESTful\s+Services?\b/i, label: "API", className: "is-api-keyword" },
      { pattern: /\bMicrosoft\s+SQL\s+Server\b/i, label: "SQL", className: "is-db-keyword" },
      { pattern: /\bSQL\s+Server\b/i, label: "SQL", className: "is-db-keyword" },
      { pattern: /\bPL\s*\/\s*SQL\b/i, label: "PLSQL", className: "is-db-keyword" },
      { pattern: /\bAPEX\b/i, label: "APEX", className: "is-app-keyword" },
      { pattern: /\bOracle(?:[-\s]nahe)?\b/i, label: "DB", className: "is-db-keyword" },
      { pattern: /\bSQL\b/i, label: "SQL", className: "is-db-keyword" },
      { pattern: /\bJavaScript\b|\bVanilla\s+JS\b|\bJS\b/i, label: "JS", className: "is-code-keyword" },
      { pattern: /\bTypeScript\b|\bTS\b/i, label: "TS", className: "is-code-keyword" },
      { pattern: /\bJava\b/i, label: "JAVA", className: "is-code-keyword" },
      { pattern: /\bHTML\b/i, label: "HTML", className: "is-code-keyword" },
      { pattern: /\bCSS\b/i, label: "CSS", className: "is-code-keyword" },
      { pattern: /\bJSON\b/i, label: "JSON", className: "is-api-keyword" },
      { pattern: /\bXML\b|\bXSD\b/i, label: "XML", className: "is-api-keyword" },
      { pattern: /\bKI\b|\bAI\b|\bKünstliche\s+Intelligenz\b/i, label: "AI", className: "is-ai-keyword" },
      { pattern: /\bGitHub\b/i, label: "GH", className: "is-tool-keyword" },
      { pattern: /\bGit\b/i, label: "GIT", className: "is-tool-keyword" },
      { pattern: /\bREST(?:ful)?\b|\bAPI\b|\bEndpoint\w*\b/i, label: "API", className: "is-api-keyword" },
      { pattern: /\bDBMS\b|\bDatenbanken?\b|\bDatenmodell\w*\b|\bDatenhaltung\b|\bData\s+Sources?\b/i, label: "DATA", className: "is-db-keyword" },
      { pattern: /\bSpring\s+Boot\b|\bSpring\s+Framework\b|\bSpring\b/i, label: "BOOT", className: "is-code-keyword" },
      { pattern: /\bVaadin\b|\bMVC\b|\bUML\b|\bOOP\b|\bArchitektur\w*\b|\bGrundarchitektur\b/i, label: "ARCH", className: "is-code-keyword" },
      { pattern: /\bScrum\s+Master\b|\bProduct\s+Owner(?:ship)?\b|\bScrum\b|\bKanban\b|\bPRINCE2\b|\bITIL\b|\bagil\w*\b/i, label: "FLOW", className: "is-flow-keyword" },
      { pattern: /\bJira\b|\bConfluence\b|\bIntelliJ(?:\s+IDEA)?\b|\bMS\s+Office\b|\bMicrosoft\s+Office\b/i, label: "TOOL", className: "is-tool-keyword" },
      { pattern: /\bSoftware(?:entwicklung)?\b|\bAnwendungsentwicklung\b|\bAnwendungen\b/i, label: "SW", className: "is-code-keyword" },
      { pattern: /\bProzess\w*\b|\bWorkflow\w*\b|\bLiefer\w*\b|\bArbeitsfluss\b|\bAbläufe\b/i, label: "FLOW", className: "is-flow-keyword" }
    ];

    cursor.className = "hero-code-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.innerHTML = `
      <span class="hero-code-cursor__layer hero-code-cursor__layer--cyan"></span>
      <span class="hero-code-cursor__layer hero-code-cursor__layer--magenta"></span>
      <span class="hero-code-cursor__layer hero-code-cursor__layer--core"></span>
      <span class="hero-code-cursor__text hero-code-cursor__text--cyan"></span>
      <span class="hero-code-cursor__text hero-code-cursor__text--magenta"></span>
      <span class="hero-code-cursor__text hero-code-cursor__text--core"></span>
    `;
    code.className = "hero-code-cursor__code";
    code.textContent = "</>";
    cursor.appendChild(code);
    document.body.appendChild(cursor);
    root.classList.add("has-hero-cursor");

    let frame = 0;
    let nextX = -80;
    let nextY = -80;
    let idleTimer = 0;
    let forcedCodeTimer = 0;
    let lastForcedClass = "";
    let currentKeyword = "";
    let currentKeywordClass = "";
    const idleDelay = 12000;

    function textPositionFromPoint(x, y) {
      if (document.caretPositionFromPoint) {
        const position = document.caretPositionFromPoint(x, y);
        return position ? { node: position.offsetNode, offset: position.offset } : null;
      }

      if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(x, y);
        return range ? { node: range.startContainer, offset: range.startOffset } : null;
      }

      return null;
    }

    function isReadableTextNode(node) {
      return Boolean(
        node &&
        node.nodeType === Node.TEXT_NODE &&
        node.textContent &&
        node.textContent.trim().length > 0
      );
    }

    function readableTextNodesIn(element, limit = 28) {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) return [];
      if (element === document.body || element === document.documentElement) return [];

      const nodes = [];
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            return isReadableTextNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
      );

      while (nodes.length < limit) {
        const node = walker.nextNode();
        if (!node) break;
        nodes.push(node);
      }

      return nodes;
    }

    function nearestReadableTextNode(node) {
      if (!node) return null;
      if (isReadableTextNode(node)) return node;

      const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      return readableTextNodesIn(element, 1)[0] || null;
    }

    function pointInRect(rect, x, y, tolerance = 1.5) {
      return Boolean(
        rect &&
        x >= rect.left - tolerance &&
        x <= rect.right + tolerance &&
        y >= rect.top - tolerance &&
        y <= rect.bottom + tolerance
      );
    }

    function pointTouchesTextNode(node, x, y) {
      if (!isReadableTextNode(node)) return false;
      const range = document.createRange();
      try {
        range.selectNodeContents(node);
        return Array.from(range.getClientRects()).some((rect) => pointInRect(rect, x, y, 2));
      } finally {
        range.detach?.();
      }
    }

    function globalKeywordPattern(pattern) {
      const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
      return new RegExp(pattern.source, flags);
    }

    function signalFromMatch(signal) {
      return { label: signal.label, className: signal.className || "is-keyword" };
    }

    function keywordSignalAtOffset(node, offset) {
      if (!isReadableTextNode(node)) return null;
      const source = node.textContent || "";
      const safeOffset = Math.max(0, Math.min(Number.isFinite(offset) ? offset : 0, source.length));

      for (const signal of keywordSignals) {
        const pattern = globalKeywordPattern(signal.pattern);
        let match;
        while ((match = pattern.exec(source))) {
          const start = match.index;
          const end = start + match[0].length;
          if (safeOffset >= start - 1 && safeOffset <= end + 1) return signalFromMatch(signal);
          if (match[0].length === 0) pattern.lastIndex += 1;
        }
      }

      return null;
    }

    function keywordSignalAtPointInTextNode(node, x, y) {
      if (!isReadableTextNode(node)) return null;
      const source = node.textContent || "";
      const range = document.createRange();

      try {
        for (const signal of keywordSignals) {
          const pattern = globalKeywordPattern(signal.pattern);
          let match;
          while ((match = pattern.exec(source))) {
            const start = match.index;
            const end = start + match[0].length;
            if (end <= start) {
              pattern.lastIndex += 1;
              continue;
            }

            range.setStart(node, start);
            range.setEnd(node, end);
            if (Array.from(range.getClientRects()).some((rect) => pointInRect(rect, x, y, 3))) {
              return signalFromMatch(signal);
            }
          }
        }
      } finally {
        range.detach?.();
      }

      return null;
    }

    function elementFromEventTarget(target) {
      if (!target) return null;
      return target.nodeType === Node.ELEMENT_NODE ? target : target.parentElement;
    }

    function textInfoAtPoint(x, y, target) {
      const position = textPositionFromPoint(x, y);
      const directNode = nearestReadableTextNode(position?.node);
      const candidates = [];

      if (directNode) candidates.push(directNode);

      const targetElement = elementFromEventTarget(target) || document.elementFromPoint(x, y);
      for (const node of readableTextNodesIn(targetElement)) {
        if (!candidates.includes(node)) candidates.push(node);
      }

      for (const node of candidates) {
        if (!pointTouchesTextNode(node, x, y)) continue;

        const signal = keywordSignalAtPointInTextNode(node, x, y) ||
          (node === directNode ? keywordSignalAtOffset(node, position?.offset || 0) : null);

        return {
          isText: true,
          keyword: signal?.label || "",
          keywordClass: signal?.className || ""
        };
      }

      return {
        isText: false,
        keyword: "",
        keywordClass: ""
      };
    }

    function renderCursor() {
      cursor.style.setProperty("--cursor-x", `${nextX}px`);
      cursor.style.setProperty("--cursor-y", `${nextY}px`);
      frame = 0;
    }

    function setCursorCode(value, className = "") {
      code.textContent = value || "</>";
      if (lastForcedClass) cursor.classList.remove(lastForcedClass);
      lastForcedClass = className;
      if (className) cursor.classList.add(className);
    }

    function resetCursorCode() {
      window.clearTimeout(forcedCodeTimer);
      setCursorCode(currentKeyword || "</>", currentKeyword ? currentKeywordClass || "is-keyword" : "");
    }

    function resetIdleTimer() {
      window.clearTimeout(idleTimer);
      cursor.classList.remove("is-idle");
      if (!forcedCodeTimer) resetCursorCode();
      idleTimer = window.setTimeout(() => {
        if (!cursor.classList.contains("is-visible")) return;
        cursor.classList.add("is-idle");
        if (!forcedCodeTimer) setCursorCode("</zZ>", "is-idle-code");
      }, idleDelay);
    }

    function hideCursor() {
      cursor.classList.remove("is-visible", "is-action", "is-text", "is-clicking", "is-idle", "is-keyword");
      currentKeyword = "";
      currentKeywordClass = "";
      window.clearTimeout(idleTimer);
      if (!forcedCodeTimer) setCursorCode("</>");
    }

    document.addEventListener("pk:cursor-code", (event) => {
      const detail = event.detail || {};
      const value = typeof detail.code === "string" ? detail.code : "</>";
      const duration = Number.isFinite(detail.duration) ? detail.duration : 2600;
      const className = typeof detail.className === "string" ? detail.className : "is-forced-code";
      window.clearTimeout(forcedCodeTimer);
      setCursorCode(value, className);
      forcedCodeTimer = window.setTimeout(() => {
        forcedCodeTimer = 0;
        resetCursorCode();
      }, duration);
    });

    document.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;

      const targetElement = elementFromEventTarget(event.target);
      const textControl = targetElement?.closest(textControlSelector);
      const actionElement = textControl ? null : targetElement?.closest(actionSelector);
      const detectedTextInfo = textControl
        ? { isText: true, keyword: "", keywordClass: "" }
        : textInfoAtPoint(event.clientX, event.clientY, event.target);
      const textInfo = actionElement
        ? { ...detectedTextInfo, isText: false }
        : detectedTextInfo;
      const isTextCursor = Boolean(textInfo.isText);
      currentKeyword = textInfo.keyword;
      currentKeywordClass = textInfo.keywordClass || "";

      nextX = event.clientX - (isTextCursor ? 7 : 3);
      nextY = event.clientY - (isTextCursor ? 15 : 2);
      cursor.classList.add("is-visible");
      cursor.classList.toggle("is-action", Boolean(actionElement));
      cursor.classList.toggle("is-text", isTextCursor);
      cursor.classList.toggle("is-keyword", Boolean(currentKeyword) && !forcedCodeTimer && !cursor.classList.contains("is-idle"));
      if (!forcedCodeTimer && !cursor.classList.contains("is-idle")) {
        setCursorCode(currentKeyword || "</>", currentKeyword ? currentKeywordClass || "is-keyword" : "");
      }
      resetIdleTimer();
      if (!frame) frame = window.requestAnimationFrame(renderCursor);
    }, { passive: true });

    document.addEventListener("pointerleave", hideCursor);

    window.addEventListener("blur", hideCursor);

    document.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "touch") cursor.classList.add("is-clicking");
    }, { passive: true });

    window.addEventListener("pointerup", () => {
      cursor.classList.remove("is-clicking");
    }, { passive: true });
  }

  function setupTiltCards() {
    if (reduceMotion.matches || !finePointer.matches) return;

    const tiltTargets = [
      "[data-tilt-card]",
      ".quick-facts > div",
      ".profile-grid > article",
      ".timeline-item",
      ".credential-list > li"
    ].join(", ");

    document.querySelectorAll(tiltTargets).forEach((card) => {
      card.classList.add("tilt-card-effect");

      let frame = 0;
      let resetTimer = 0;
      let nextX = 0;
      let nextY = 0;
      let glowX = 50;
      let glowY = 50;

      function applyTilt() {
        card.style.setProperty("--tilt-x", `${nextX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${nextY.toFixed(2)}deg`);
        card.style.setProperty("--glow-x", `${glowX.toFixed(1)}%`);
        card.style.setProperty("--glow-y", `${glowY.toFixed(1)}%`);
        frame = 0;
      }

      function updateTilt(event) {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
        const compactFactor = rect.height < 100 ? 0.68 : 1;
        const wideFactor = rect.width > 900 ? 0.82 : 1;
        const strength = compactFactor * wideFactor;

        nextX = (0.5 - y) * 5.4 * strength;
        nextY = (x - 0.5) * 6.4 * strength;
        glowX = x * 100;
        glowY = y * 100;

        if (!frame) frame = window.requestAnimationFrame(applyTilt);
      }

      card.addEventListener("pointerenter", (event) => {
        window.clearTimeout(resetTimer);
        card.classList.add("is-tilting");
        updateTilt(event);
      }, { passive: true });

      card.addEventListener("pointermove", updateTilt, { passive: true });

      card.addEventListener("pointerleave", () => {
        window.clearTimeout(resetTimer);
        if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }

        card.classList.remove("is-tilting");
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--glow-x", "50%");
        card.style.setProperty("--glow-y", "50%");
        resetTimer = window.setTimeout(() => {
          card.style.removeProperty("--tilt-x");
          card.style.removeProperty("--tilt-y");
          card.style.removeProperty("--glow-x");
          card.style.removeProperty("--glow-y");
        }, 260);
      }, { passive: true });
    });
  }

  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
    const targets = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    if (!targets.length) return;

    const linkById = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    const visibleSections = new Map();

    function updateActiveLink() {
      let activeId = "";
      let activeRatio = -1;
      visibleSections.forEach((ratio, id) => {
        if (ratio > activeRatio) {
          activeRatio = ratio;
          activeId = id;
        }
      });
      links.forEach((link) => {
        link.dataset.active = String(link === linkById.get(activeId));
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });
      updateActiveLink();
    }, {
      rootMargin: "-18% 0px -62% 0px",
      threshold: [0.01, 0.2, 0.45]
    });

    targets.forEach((target) => observer.observe(target));
  }

  function setupTechStream() {
    const track = document.querySelector(".tech-stream__track");
    const firstGroup = track?.querySelector(".tech-stream__group");
    if (!track || !firstGroup || reduceMotion.matches || typeof track.animate !== "function") return;

    const groupTemplate = firstGroup.cloneNode(true);
    let streamAnimation = null;
    let resizeFrame = 0;
    const pixelsPerSecond = 38;

    function startStream() {
      Array.from(track.children).slice(1).forEach((group) => group.remove());
      const groupWidth = firstGroup.getBoundingClientRect().width;
      if (!groupWidth) return;

      const streamWidth = track.parentElement?.getBoundingClientRect().width || window.innerWidth;
      const requiredGroups = Math.max(3, Math.ceil(streamWidth / groupWidth) + 2);
      for (let index = 1; index < requiredGroups; index += 1) {
        track.appendChild(groupTemplate.cloneNode(true));
      }

      const previousDuration = streamAnimation?.effect?.getTiming().duration;
      const previousProgress = previousDuration && streamAnimation.currentTime
        ? Number(streamAnimation.currentTime) / previousDuration
        : 0;

      streamAnimation?.cancel();
      const duration = (groupWidth / pixelsPerSecond) * 1000;
      streamAnimation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${-groupWidth}px, 0, 0)` }
        ],
        {
          duration,
          iterations: Infinity,
          easing: "linear"
        }
      );
      streamAnimation.currentTime = previousProgress * duration;
    }

    function scheduleMeasurement() {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        startStream();
      });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleMeasurement).catch(scheduleMeasurement);
    } else {
      scheduleMeasurement();
    }

    if ("ResizeObserver" in window) {
      new ResizeObserver(scheduleMeasurement).observe(firstGroup);
    }
    window.addEventListener("resize", scheduleMeasurement, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (!streamAnimation) return;
      if (document.hidden) streamAnimation.pause();
      else streamAnimation.play();
    });
  }

  function setupSignalCanvas() {
    if (!signalCanvas || !hero || reduceMotion.matches) return;
    const context = signalCanvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let nodes = [];
    let heroVisible = true;
    let animationFrame = 0;
    let lastFrame = 0;
    const frameInterval = isFirefox ? 33 : 16;

    function createNodes() {
      const count = width < 720 ? 14 : (isFirefox ? 18 : 26);
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (index % 3 === 0 ? 0.2 : 0.12),
        vy: (Math.random() - 0.5) * (index % 4 === 0 ? 0.18 : 0.1),
        size: index % 5 === 0 ? 1.7 : 1
      }));
    }

    function resizeCanvas() {
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      ratio = Math.min(window.devicePixelRatio || 1, isFirefox ? 1 : 1.5);
      signalCanvas.width = Math.round(width * ratio);
      signalCanvas.height = Math.round(height * ratio);
      signalCanvas.style.width = `${width}px`;
      signalCanvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createNodes();
    }

    function render(timestamp) {
      animationFrame = window.requestAnimationFrame(render);
      if (!heroVisible || document.hidden || timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 145) continue;
          context.strokeStyle = `rgba(98, 214, 208, ${(1 - distance / 145) * 0.13})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }

        context.fillStyle = node.size > 1 ? "rgba(240, 168, 58, 0.72)" : "rgba(98, 214, 208, 0.58)";
        context.beginPath();
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
      }, { threshold: 0.02 });
      observer.observe(hero);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener("pagehide", () => {
      window.cancelAnimationFrame(animationFrame);
    }, { once: true });
  }

  function setNavOpen(open) {
    if (!navToggle || !navList) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", getMenuLabel(open));
    navList.dataset.open = open ? "true" : "false";
    document.body.classList.toggle("nav-open", open);
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });

    navList.addEventListener("click", (event) => {
      if (event.target.closest("a")) setNavOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavOpen(false);
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", (event) => {
      const option = event.target.closest("[data-lang-option]");
      if (!option || !langToggle.contains(option)) return;
      const selectedLang = sanitizeLang(option.dataset.langOption);
      if (selectedLang === (document.documentElement.dataset.lang || DEFAULT_LANG)) return;
      setLang(selectedLang, true);
      setNavOpen(false);
    });
  }

  function waitForPrintLayout() {
    const fontsReady = document.fonts?.ready?.catch ? document.fonts.ready.catch(() => null) : Promise.resolve();
    return fontsReady.then(() => new Promise((resolve) => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    }));
  }

  async function printVita() {
    if (!document.body.classList.contains("vita-page")) {
      const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
      const target = new URL("./vita.html", window.location.href);
      target.searchParams.set("print", "1");
      if (lang !== DEFAULT_LANG) target.searchParams.set("lang", lang);
      window.location.href = target.href;
      return;
    }

    const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
    const previousTitle = document.title;
    let cleanupDone = false;

    function cleanupPrintState() {
      if (cleanupDone) return;
      cleanupDone = true;
      document.title = previousTitle;
      document.body.classList.remove("vita-print-mode");
      window.removeEventListener("afterprint", cleanupPrintState);
    }

    document.title = lang === "en" ? "Phil_Kirchner_Resume" : lang === "ja" ? "Phil_Kirchner_Rirekisho" : "Phil_Kirchner_Vita";
    document.body.classList.add("vita-print-mode");
    window.addEventListener("afterprint", cleanupPrintState);

    await waitForPrintLayout();
    window.print();
    window.setTimeout(cleanupPrintState, 10000);
  }

  document.querySelectorAll("[data-print-vita]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      await printVita();
    });
  });

  if (document.body.classList.contains("vita-page") && new URLSearchParams(window.location.search).get("print") === "1") {
    window.addEventListener("load", () => {
      if ("history" in window) {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("print");
        window.history.replaceState({}, "", cleanUrl);
      }
      window.setTimeout(() => printVita(), 420);
    }, { once: true });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  function measureHero() {
    heroHeight = hero ? Math.max(hero.offsetHeight, 1) : 1;
    updateScrollState();
  }

  function updateScrollState() {
    const y = window.scrollY || window.pageYOffset || 0;
    const progress = Math.min(1, Math.max(0, y / heroHeight));
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, y / scrollable)).toFixed(4)})`;

    if (heroImage && !supportsScrollTimeline) {
      const frame = progress.toFixed(3);
      if (frame !== lastHeroFrame) {
        const shiftX = (-18 * progress).toFixed(2);
        const shiftY = (34 * progress).toFixed(2);
        const scale = (1.02 + 0.045 * progress).toFixed(4);
        heroImage.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${scale})`;
        if (heroScrollDim) heroScrollDim.style.opacity = (0.72 * progress).toFixed(3);
        lastHeroFrame = frame;
      }
    }

    const scrolledState = y > 24 ? "true" : "false";
    if (scrolledState !== lastScrolledState) {
      root.dataset.scrolled = scrolledState;
      lastScrolledState = scrolledState;
    }

    scrollTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(updateScrollState);
    },
    { passive: true }
  );
  
  function addReveal(selector, direction, stagger = false) {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal-item");
      element.dataset.reveal = direction;
      element.style.setProperty("--reveal-delay", stagger ? `${Math.min(index * 90, 270)}ms` : "0ms");
    });
  }

  function setupScrollReveals() {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

    addReveal(".quick-facts > div", "up", true);
    addReveal(".split-section > div:first-child, .contact-section > div:first-child", "left");
    addReveal(".split-section .text-stack > p, .contact-actions", "right");
    addReveal(".system-profile-panel, .stack-console, .skill-graph, .certificate-header > div", "up");
    addReveal(".section-heading, .page-hero > *, .legal-page > section, .legal-page > .legal-note", "up");
    addReveal(".project-card, .stack-grid article, .profile-grid article, .timeline-playback, .timeline-item, .credential-list li, .oracle-badge-card, .proof-card", "up", true);

    root.classList.add("reveal-ready");

    const revealState = new WeakMap();

    function shouldReveal(entry) {
      const rect = entry.boundingClientRect;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const entersComfortZone = rect.top < viewportHeight * 0.86 && rect.bottom > viewportHeight * 0.1;
      return entry.isIntersecting && (entry.intersectionRatio >= 0.08 || entersComfortZone);
    }

    function shouldConceal(entry) {
      const rect = entry.boundingClientRect;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const aboveViewport = rect.bottom < viewportHeight * 0.04;
      const belowViewport = rect.top > viewportHeight * 0.96;
      return (!entry.isIntersecting || entry.intersectionRatio <= 0.01) && (aboveViewport || belowViewport);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = revealState.get(entry.target) === true;

          if (!isVisible && shouldReveal(entry)) {
            revealState.set(entry.target, true);
            entry.target.classList.add("is-visible");
            return;
          }

          if (isVisible && shouldConceal(entry)) {
            revealState.set(entry.target, false);
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { rootMargin: "8% 0px 8% 0px", threshold: [0, 0.01, 0.08, 0.16, 0.32] }
    );

    document.querySelectorAll(".reveal-item").forEach((element) => observer.observe(element));
  }

  function setupSignalFlicker() {
    const signal = document.querySelector(".hero-scanline");
    if (!signal || reduceMotion.matches) return;

    let triggerTimer = 0;
    let cleanupTimer = 0;

    function scheduleFlicker(minDelay = 2400, spread = 8800) {
      const delay = minDelay + Math.random() * spread;
      window.clearTimeout(triggerTimer);
      triggerTimer = window.setTimeout(triggerFlicker, delay);
    }

    function triggerFlicker() {
      if (document.hidden) {
        scheduleFlicker(900);
        return;
      }

      const roll = Math.random();
      const className = roll < 0.46
        ? "is-glitching-a"
        : roll < 0.86
          ? "is-glitching-b"
          : "is-glitching-a is-glitching-b";

      signal.classList.remove("is-glitching-a", "is-glitching-b");
      className.split(" ").forEach((name) => signal.classList.add(name));

      window.clearTimeout(cleanupTimer);
      cleanupTimer = window.setTimeout(() => {
        signal.classList.remove("is-glitching-a", "is-glitching-b");
      }, 780);

      scheduleFlicker();
    }

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) scheduleFlicker(400, 1200);
    });

    scheduleFlicker(650, 1800);
  }

  function emitPortfolioCursorCode(code, duration = 700, className = "is-dev-signal") {
    document.dispatchEvent(new CustomEvent("pk:cursor-code", {
      detail: { code, duration, className }
    }));
  }

  function setupPortfolioStartup(runBoot) {
    const heroTitle = document.querySelector(".hero-title, .interior-hero h1, .page-hero h1, .legal-hero h1");
    if (heroTitle) {
      const source = (heroTitle.textContent || "").replace(/\s+/g, " ").trim();
      const glyphs = "01{}[]<>/\\|#$%&";
      const scrambled = Array.from(source).map((char, index) => {
        if (/\s/.test(char)) return " ";
        if (/[.,:;!?-]/.test(char)) return char;
        return glyphs[(char.charCodeAt(0) + index * 7) % glyphs.length];
      }).join("");
      heroTitle.dataset.bootText = scrambled || "PK_PORTFOLIO_UNLOCK";
    }

    if (!runBoot) return;

    try {
      sessionStorage.setItem(PORTFOLIO_BOOT_SESSION_KEY, "1");
    } catch (error) {
      root.classList.remove("portfolio-boot-active", "portfolio-nav-boot", "portfolio-hero-locked");
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "portfolio-boot-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="portfolio-boot-overlay__panel">
        <span class="portfolio-boot-overlay__scan" aria-hidden="true"></span>
        <p class="portfolio-boot-overlay__kicker">session handshake</p>
        <strong>PK_PORTFOLIO_BOOT</strong>
        <ul>
          <li>loading profile...</li>
          <li>oracle/apex/plsql/js connected</li>
          <li>interface unlock ready</li>
        </ul>
        <i></i>
      </div>
    `;
    document.body.appendChild(overlay);

    window.setTimeout(() => overlay.classList.add("is-visible"), 30);
    window.setTimeout(() => root.classList.add("portfolio-boot-cut"), 1180);
    window.setTimeout(() => {
      overlay.classList.add("is-complete");
    }, 1320);
    window.setTimeout(() => overlay.classList.add("is-fading"), 1640);
    window.setTimeout(() => {
      overlay.remove();
      root.classList.remove("portfolio-boot-active", "portfolio-boot-cut");
      root.classList.add("portfolio-boot-reveal");
      emitPortfolioCursorCode("INIT", 560, "is-dev-signal");
    }, 1920);
    window.setTimeout(() => emitPortfolioCursorCode("AUTH", 580, "is-dev-lang-code"), 2320);
    window.setTimeout(() => root.classList.add("portfolio-hero-unlock"), 2360);
    window.setTimeout(() => emitPortfolioCursorCode("READY", 840, "is-signal-code"), 2760);
    window.setTimeout(() => {
      root.classList.remove(
        "portfolio-nav-boot",
        "portfolio-hero-locked",
        "portfolio-boot-reveal",
        "portfolio-hero-unlock"
      );
    }, 3740);
  }

  function setupFirstTimeGuide(runAfterBoot) {
    if (reduceMotion.matches || document.body.classList.contains("legal-page")) return;

    try {
      if (sessionStorage.getItem(FIRST_TIME_GUIDE_SESSION_KEY) === "1") return;
      sessionStorage.setItem(FIRST_TIME_GUIDE_SESSION_KEY, "1");
    } catch (error) {
      return;
    }

    const guideLabels = {
      de: {
        title: "signal hint",
        command: "hint: Strg + K öffnet Befehle",
        context: "shift + rechtsklick entsperrt das Kontextmenü",
        mobile: "hint: Menü und Signal Index halten die versteckten Routen",
        close: "Hinweis schließen"
      },
      en: {
        title: "signal hint",
        command: "hint: press Ctrl + K for commands",
        context: "shift + right click unlocks the context menu",
        mobile: "hint: menu and Signal Index hold the hidden routes",
        close: "Close hint"
      },
      ja: {
        title: "signal hint",
        command: "hint: Ctrl + K でコマンド",
        context: "shift + right click でcontext menu",
        mobile: "hint: menu と Signal Index にhidden routes",
        close: "ヒントを閉じる"
      }
    };

    const guide = document.createElement("aside");
    guide.className = "first-time-guide";
    guide.setAttribute("role", "status");
    guide.setAttribute("aria-live", "polite");

    function renderGuide() {
      const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
      const copy = guideLabels[lang] || guideLabels[DEFAULT_LANG];
      const secondLine = finePointer.matches ? copy.context : copy.mobile;
      guide.innerHTML = `
        <div class="first-time-guide__bar">
          <span aria-hidden="true"><b></b><b></b><b></b></span>
          <strong>${copy.title}</strong>
          <button type="button" data-first-guide-close aria-label="${copy.close}">×</button>
        </div>
        <button class="first-time-guide__line" type="button" data-first-guide-command>&gt; ${copy.command}</button>
        <p class="first-time-guide__line">&gt; ${secondLine}</p>
      `;
    }

    renderGuide();
    document.body.appendChild(guide);

    const showDelay = runAfterBoot ? 4200 : 1400;
    let hideTimer = null;
    let removeTimer = null;

    function beginGuideVisibility() {
      if (!guide.isConnected || guide.classList.contains("is-visible")) return;
      guide.classList.add("is-visible");
      hideTimer = window.setTimeout(() => guide.classList.add("is-fading"), 9400);
      removeTimer = window.setTimeout(() => guide.remove(), 9900);
    }

    function showWhenSurfaceIsClear() {
      const cookieVisible = document.querySelector("[data-pk-consent-banner][data-visible='true']:not([hidden])");
      if (!cookieVisible) {
        beginGuideVisibility();
        return;
      }

      document.addEventListener("pk:cookie-consent-hidden", () => {
        window.setTimeout(beginGuideVisibility, 620);
      }, { once: true });
    }

    const showTimer = window.setTimeout(showWhenSurfaceIsClear, showDelay);

    function closeGuide() {
      window.clearTimeout(showTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
      guide.classList.add("is-fading");
      window.setTimeout(() => guide.remove(), 240);
    }

    guide.addEventListener("click", (event) => {
      if (event.target.closest("[data-first-guide-close]")) {
        closeGuide();
        return;
      }
      if (event.target.closest("[data-first-guide-command]")) {
        closeGuide();
        document.dispatchEvent(new CustomEvent("pk:open-command-palette"));
      }
    });

    document.addEventListener("pk:lang-change", renderGuide);
  }

  function setupSecretDevConsole() {
    const typingSelector = "input, textarea, select, [contenteditable=''], [contenteditable='true'], [role='textbox']";
    const route = document.body.classList.contains("vita-page")
      ? "vita"
      : document.body.classList.contains("legal-page")
        ? "legal"
        : "index";
    const version = document.querySelector("script[src*='app.js']")?.src.match(/[?&]v=([^&]+)/)?.[1] || "local";
    const mailLink = document.querySelector("a[href^='mailto:']")?.getAttribute("href") || "mailto:kontakt@phil-kirchner.dev";
    const githubLink = document.querySelector("a[href*='github.com']")?.getAttribute("href") || "https://github.com/philosophiedeluxe";
    const linkedinLink = document.querySelector("a[href*='linkedin.com']")?.getAttribute("href") || "https://www.linkedin.com/";
    const contextMenuLabels = {
      de: {
        title: "PK_CURSOR_MENU",
        console: ["Dev Console", "Panel wechseln"],
        copy: ["Link kopieren", "Route teilen"],
        print: ["Vita drucken", "PDF/Print"],
        mail: ["Mail schreiben", "Kontakt"],
        github: ["GitHub", "Repo öffnen"]
      },
      en: {
        title: "PK_CURSOR_MENU",
        console: ["Dev Console", "Toggle panel"],
        copy: ["Copy Link", "Share route"],
        print: ["Print Resume", "PDF/print"],
        mail: ["Mail Phil", "Contact"],
        github: ["GitHub", "Open repo"]
      },
      ja: {
        title: "PK_CURSOR_MENU",
        console: ["Dev Console", "パネル切替"],
        copy: ["リンクコピー", "ルート共有"],
        print: ["経歴を印刷", "PDF/印刷"],
        mail: ["メール", "連絡"],
        github: ["GitHub", "リポジトリ"]
      }
    };

    const consolePanel = document.createElement("aside");
    consolePanel.className = "secret-dev-console";
    consolePanel.setAttribute("aria-hidden", "true");
    consolePanel.setAttribute("aria-label", "Secret developer console");
    consolePanel.inert = true;
    consolePanel.innerHTML = `
      <div class="secret-dev-console__bar">
        <span class="secret-dev-console__lights" aria-hidden="true"><b></b><b></b><b></b></span>
        <strong>PK_DEV_CONSOLE</strong>
        <button class="secret-dev-console__close" type="button" aria-label="Konsole schließen">×</button>
      </div>
      <div class="secret-dev-console__grid">
        <span>route::<b>${route}</b></span>
        <span>build::<b>${version}</b></span>
        <span>mode::<b>static</b></span>
      </div>
      <pre class="secret-dev-console__output">pk@portfolio:~$ stack --profile
[ok] oracle apex / plsql / javascript / java
[ok] business apps / data / delivery
[ok] pdf mode isolated

pk@portfolio:~$ hint
type: boot, matrix, theme
shortcut: ctrl + alt + d</pre>
      <div class="secret-dev-console__links">
        <a href="./signals.html" data-signal-route-link="true" data-i18n="nav.signals">signals</a>
        <a href="${mailLink}">mail</a>
        <a href="${linkedinLink}" target="_blank" rel="noreferrer">linkedin</a>
        <a href="${githubLink}" target="_blank" rel="noreferrer">github</a>
      </div>
    `;
    document.body.appendChild(consolePanel);

    const contextMenu = document.createElement("nav");
    contextMenu.className = "cursor-context-menu";
    contextMenu.setAttribute("aria-hidden", "true");
    contextMenu.setAttribute("aria-label", "Cursor command menu");
    contextMenu.inert = true;
    contextMenu.innerHTML = `
      <div class="cursor-context-menu__bar">
        <span aria-hidden="true"><b></b><b></b><b></b></span>
        <strong>PK_CURSOR_MENU</strong>
      </div>
      <button type="button" data-cursor-command="console">
        <span>01</span><b></b><em></em>
      </button>
      <button type="button" data-cursor-command="copy">
        <span>02</span><b></b><em></em>
      </button>
      <button type="button" data-cursor-command="print">
        <span>03</span><b></b><em></em>
      </button>
      <button type="button" data-cursor-command="mail">
        <span>04</span><b></b><em></em>
      </button>
      <button type="button" data-cursor-command="github">
        <span>05</span><b></b><em></em>
      </button>
    `;
    document.body.appendChild(contextMenu);

    const closeButton = consolePanel.querySelector(".secret-dev-console__close");
    let consoleVisible = false;
    let contextVisible = false;

    function clearContextMenuHover() {
      contextMenu.querySelectorAll(".is-hovered").forEach((item) => item.classList.remove("is-hovered"));
    }

    function updateContextMenuLabels(lang = document.documentElement.dataset.lang || DEFAULT_LANG) {
      const labels = contextMenuLabels[sanitizeLang(lang)] || contextMenuLabels[DEFAULT_LANG];
      contextMenu.querySelector(".cursor-context-menu__bar strong").textContent = labels.title;
      contextMenu.querySelectorAll("[data-cursor-command]").forEach((button) => {
        const commandLabels = labels[button.dataset.cursorCommand];
        if (!commandLabels) return;
        button.querySelector("b").textContent = commandLabels[0];
        button.querySelector("em").textContent = commandLabels[1];
        button.setAttribute("aria-label", `${commandLabels[0]} - ${commandLabels[1]}`);
      });
    }

    function closeContextMenu() {
      contextVisible = false;
      clearContextMenuHover();
      contextMenu.classList.remove("is-visible");
      contextMenu.setAttribute("aria-hidden", "true");
      contextMenu.inert = true;
      root.classList.remove("cursor-context-open");
      if (contextMenu.contains(document.activeElement)) document.activeElement.blur();
    }

    function placeContextMenu(clientX, clientY) {
      const margin = 14;
      contextMenu.style.left = "0px";
      contextMenu.style.top = "0px";
      contextMenu.classList.add("is-measuring");
      const rect = contextMenu.getBoundingClientRect();
      contextMenu.classList.remove("is-measuring");
      const width = rect.width || 260;
      const height = rect.height || 290;
      const x = Math.min(Math.max(clientX + 16, margin), window.innerWidth - width - margin);
      const y = Math.min(Math.max(clientY + 16, margin), window.innerHeight - height - margin);
      contextMenu.style.left = `${Math.round(x)}px`;
      contextMenu.style.top = `${Math.round(y)}px`;
    }

    function openContextMenu(event) {
      if (reduceMotion.matches || !finePointer.matches) return;
      event.preventDefault();
      updateContextMenuLabels();
      placeContextMenu(event.clientX, event.clientY);
      contextVisible = true;
      clearContextMenuHover();
      contextMenu.classList.add("is-visible");
      contextMenu.setAttribute("aria-hidden", "false");
      contextMenu.inert = false;
      root.classList.add("cursor-context-open");
      emitPortfolioCursorCode("MENU", 1200, "is-dev-signal");
    }

    async function copyText(value) {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return true;
      }

      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      field.style.top = "0";
      document.body.appendChild(field);
      field.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } finally {
        field.remove();
      }
      if (!copied) throw new Error("copy failed");
      return true;
    }

    function setConsoleVisible(visible) {
      consoleVisible = visible;
      consolePanel.classList.toggle("is-visible", visible);
      consolePanel.setAttribute("aria-hidden", visible ? "false" : "true");
      consolePanel.inert = !visible;
      root.classList.toggle("secret-console-open", visible);
      if (visible) {
        emitPortfolioCursorCode("CON", 1300, "is-dev-signal");
        closeButton?.focus({ preventScroll: true });
      }
    }

    closeButton?.addEventListener("click", () => setConsoleVisible(false));
    updateContextMenuLabels();
    document.addEventListener("pk:lang-change", (event) => updateContextMenuLabels(event.detail?.lang));

    contextMenu.addEventListener("pointermove", (event) => {
      if (!contextVisible) return;
      const button = event.target.closest("[data-cursor-command]");
      clearContextMenuHover();
      if (button && contextMenu.contains(button)) button.classList.add("is-hovered");
    });

    contextMenu.addEventListener("pointerleave", clearContextMenuHover);

    contextMenu.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-cursor-command]");
      if (!button) return;
      const command = button.dataset.cursorCommand;
      closeContextMenu();

      if (command === "console") {
        setConsoleVisible(!consoleVisible);
        return;
      }

      if (command === "copy") {
        try {
          await copyText(window.location.href.split("#")[0]);
          emitPortfolioCursorCode("COPY", 1150, "is-dev-lang-code");
        } catch (error) {
          emitPortfolioCursorCode("ERR", 1150, "is-theme-signal");
        }
        return;
      }

      if (command === "print") {
        emitPortfolioCursorCode("PDF", 1150, "is-dev-lang-code");
        await printVita();
        return;
      }

      if (command === "mail") {
        window.location.href = mailLink;
        return;
      }

      if (command === "github") {
        window.open(githubLink, "_blank", "noreferrer");
      }
    });

    document.addEventListener("contextmenu", (event) => {
      if (!event.shiftKey || event.target?.closest?.(typingSelector)) return;
      openContextMenu(event);
    });

    document.addEventListener("pointerdown", (event) => {
      if (!contextVisible || contextMenu.contains(event.target)) return;
      closeContextMenu();
    }, { capture: true });

    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      const isShortcut = (event.ctrlKey || event.metaKey) && event.altKey && key === "d";
      if (isShortcut) {
        event.preventDefault();
        setConsoleVisible(!consoleVisible);
        return;
      }
      if (event.key === "Escape" && consoleVisible) {
        setConsoleVisible(false);
        return;
      }
      if (event.key === "Escape" && contextVisible) {
        closeContextMenu();
        return;
      }
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.target?.closest?.(typingSelector)) return;
    });
  }
 

  function setupDeveloperOperatingLayer() {
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
    let recruiterPanel = null;
    let traceOverlay = null;
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
        { id: "print", code: "08", action: () => printVita() }
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
      const nodes = [
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
      clearTraceTimers();
      traceOverlay?.remove();
      traceOverlay = buildTraceOverlay();
      document.body.appendChild(traceOverlay);
      const activeOverlay = traceOverlay;
      root.classList.add("system-trace-active");
      traceOverlay.classList.add("is-visible");
      emitPortfolioCursorCode("TRACE", 1500, "is-dev-signal");
      const log = activeOverlay.querySelector("[data-trace-log]");
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
      window.setTimeout(() => overlay?.remove(), 240);
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
              <span><b>${copy.recruiterMatrixApex}</b><i style="--level:94%"></i></span>
              <span><b>${copy.recruiterMatrixPlsql}</b><i style="--level:88%"></i></span>
              <span><b>${copy.recruiterMatrixJs}</b><i style="--level:78%"></i></span>
              <span><b>${copy.recruiterMatrixProcess}</b><i style="--level:92%"></i></span>
              <span><b>${copy.recruiterMatrixDelivery}</b><i style="--level:84%"></i></span>
              <span><b>${copy.recruiterMatrixData}</b><i style="--level:90%"></i></span>
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
        recruiterPanel.setAttribute("aria-hidden", "true");
        recruiterPanel.inert = true;
        document.body.appendChild(recruiterPanel);
        recruiterPanel.addEventListener("click", (event) => {
          if (event.target.closest("[data-recruiter-close]")) toggleRecruiterMode(false);
          if (event.target.closest("[data-recruiter-print]")) printVita();
          if (event.target.closest("[data-recruiter-mail]")) copyMailAddress();
        });
      }
      renderRecruiterPanel();
      root.classList.toggle("recruiter-mode-active", visible);
      recruiterPanel.classList.toggle("is-visible", visible);
      recruiterPanel.setAttribute("aria-hidden", visible ? "false" : "true");
      recruiterPanel.inert = !visible;
      if (visible) emitPortfolioCursorCode("FIT", 1400, "is-dev-signal");
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
      graph.querySelectorAll("[data-skill-node]").forEach((node) => {
        node.addEventListener("click", () => {
          const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
          graph.querySelectorAll(".is-active").forEach((item) => item.classList.remove("is-active"));
          node.classList.add("is-active");
          readout.textContent = (skillReadouts[lang] || skillReadouts[DEFAULT_LANG])[node.dataset.skillNode] || "capability graph online";
          emitPortfolioCursorCode(node.dataset.skillNode, 1000, "is-signal-code");
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
  }

  function setupEasterEggs() {
    const typedInputSelector = "input, textarea, select, [contenteditable=''], [contenteditable='true'], [role='textbox']";
    const bootLines = [
      "pk_boot.sequence :: cold-start",
      "mount /interface --visual --safe",
      "scan nav.hero.buttons --reveal",
      "hydrate cursor_module --custom",
      "resolve signal_layers --ok",
      "unlock profile_surface --visible",
      "startup complete :: welcome phil"
    ];
    const sectionMessages = {
      "01": "identity layer touched",
      "02": "timeline trace opened",
      "03": "runtime stack indexed",
      "04": "handshake protocol ready"
    };
    const terminalMessages = [
      "> signal found: phil.kirchner",
      "> compiling personality layer...",
      "> access granted"
    ];
    const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let konamiBuffer = [];
    let typedBuffer = "";
    let toastTimer = 0;
    let terminalTimer = 0;
    let devModeTimer = 0;
    let themeTimer = 0;
    let devLangTimer = 0;
    let matrixRunning = false;
    let devTypingTimers = [];
    let bootTypingTimers = [];
    let bootRunning = false;

    document.body.appendChild(document.createComment(" PK_SIGNAL_LAYER::EASTER_EGGS_ARMED "));

    const toast = document.createElement("div");
    toast.className = "easter-toast";
    toast.setAttribute("aria-hidden", "true");
    document.body.appendChild(toast);

    const terminal = hero ? document.createElement("div") : null;
    if (terminal) {
      terminal.className = "easter-terminal";
      terminal.setAttribute("aria-hidden", "true");
      hero.appendChild(terminal);
    }

    const devHud = document.createElement("div");
    devHud.className = "easter-dev-hud";
    devHud.setAttribute("aria-hidden", "true");
    devHud.innerHTML = `
      <div class="easter-dev-hud__bar">
        <span class="easter-dev-hud__lights" aria-hidden="true"><b></b><b></b><b></b></span>
        <strong>PK_DEV_TERMINAL</strong>
        <em>armed</em>
      </div>
      <div class="easter-dev-hud__meta">
        <span>route::<b>${document.body.classList.contains("vita-page") ? "vita" : "index"}</b></span>
        <span>cursor::<b>custom</b></span>
        <span>signal::<b>writable</b></span>
      </div>
      <pre class="easter-dev-hud__terminal" aria-hidden="true"></pre>
      <i class="easter-dev-hud__meter"></i>
    `;
    document.body.appendChild(devHud);
    const devTerminal = devHud.querySelector(".easter-dev-hud__terminal");

    function isTypingTarget(target) {
      return Boolean(target && target.closest && target.closest(typedInputSelector));
    }

    function emitCursorCode(code, duration = 2600, className = "is-forced-code") {
      document.dispatchEvent(new CustomEvent("pk:cursor-code", {
        detail: { code, duration, className }
      }));
    }

    function showToast(message, duration = 2600) {
      toast.textContent = message;
      toast.classList.add("is-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
      }, duration);
    }

    function flashTerminal(message, duration = 3600) {
      if (!terminal) return;
      terminal.textContent = message;
      terminal.classList.add("is-visible");
      window.clearTimeout(terminalTimer);
      terminalTimer = window.setTimeout(() => {
        terminal.classList.remove("is-visible");
      }, duration);
    }

    function clearDevTerminalTyping() {
      devTypingTimers.forEach((timer) => window.clearTimeout(timer));
      devTypingTimers = [];
    }

    function queueDevTerminalStep(callback, delay) {
      const timer = window.setTimeout(callback, delay);
      devTypingTimers.push(timer);
      return timer;
    }

    function renderDevTerminalText(text, cursor = true) {
      if (!devTerminal) return;
      devTerminal.textContent = cursor ? `${text}█` : text;
      devTerminal.scrollTop = devTerminal.scrollHeight;
    }

    function typeDevTerminalLine(state, line, done) {
      let index = 0;
      const writeNext = () => {
        index += 1;
        renderDevTerminalText(`${state.text}${line.slice(0, index)}`, true);
        if (index < line.length) {
          const pace = line[index - 1] === " " ? 34 : 16 + Math.random() * 18;
          queueDevTerminalStep(writeNext, pace);
          return;
        }
        state.text += `${line}\n`;
        renderDevTerminalText(state.text, true);
        queueDevTerminalStep(done, 115 + Math.random() * 110);
      };
      writeNext();
    }

    function startDevTerminalTyping() {
      if (!devTerminal) return;
      clearDevTerminalTyping();
      const route = document.body.classList.contains("vita-page") ? "vita" : "index";
      const lines = [
        "pk@portfolio:~$ whoami",
        "phil.kirchner // software developer",
        `pk@portfolio:~$ cd /var/www/${route}`,
        "pk@portfolio:/var/www$ ls -la signal_layers",
        "cursor.custom     hero.signal     section.reboot     theme.shift",
        `pk@portfolio:/var/www$ grep -n "Oracle|APEX|SQL|REST" ./profile.md`,
        "match: business apps | oracle apex | pl/sql | javascript | rest data sources",
        "pk@portfolio:/var/www$ ./arm-interface --mode developer --safe",
        "interface: armed",
        "cursor: {PK}",
        "scan-layer: online",
        "pk@portfolio:/var/www$ tail -f ./runtime.log",
        "[ok] hidden routes indexed",
        "[ok] easter triggers synchronized",
        "[ok] portfolio system writable"
      ];
      const state = { text: "" };
      let lineIndex = 0;
      const nextLine = () => {
        if (lineIndex >= lines.length) {
          renderDevTerminalText(`${state.text}\npk@portfolio:/var/www$ _`, false);
          return;
        }
        const line = lines[lineIndex];
        lineIndex += 1;
        const isCommand = line.startsWith("pk@portfolio");
        if (isCommand) {
          typeDevTerminalLine(state, line, nextLine);
          return;
        }
        state.text += `${line}\n`;
        renderDevTerminalText(state.text, true);
        queueDevTerminalStep(nextLine, 180 + Math.random() * 180);
      };
      renderDevTerminalText("booting pk developer shell...\n", true);
      state.text = "booting pk developer shell...\n";
      queueDevTerminalStep(nextLine, 360);
    }
    function clearBootSequenceTyping() {
      bootTypingTimers.forEach((timer) => window.clearTimeout(timer));
      bootTypingTimers = [];
    }

    function queueBootSequenceStep(callback, delay) {
      const timer = window.setTimeout(callback, delay);
      bootTypingTimers.push(timer);
      return timer;
    }

    function renderBootSequenceText(output, text, cursor = true) {
      if (!output) return;
      output.textContent = cursor ? `${text}█` : text;
      output.scrollTop = output.scrollHeight;
    }

    function typeBootSequenceLine(output, state, line, done) {
      let index = 0;
      const writeNext = () => {
        index += 1;
        renderBootSequenceText(output, `${state.text}${line.slice(0, index)}`, true);
        if (index < line.length) {
          const char = line[index - 1];
          const pace = char === " " ? 24 : 10 + Math.random() * 18;
          queueBootSequenceStep(writeNext, pace);
          return;
        }
        state.text += `${line}\n`;
        renderBootSequenceText(output, state.text, true);
        queueBootSequenceStep(done, 115 + Math.random() * 150);
      };
      writeNext();
    }

    function startBootSequenceTyping(boot, forced = false) {
      const output = boot.querySelector(".easter-boot-sequence__output");
      const status = boot.querySelector(".easter-boot-sequence__status b");
      const state = { text: "" };
      let lineIndex = 0;
      const route = document.body.classList.contains("vita-page") ? "vita" : "index";
      const lines = [
        `pk@startup:~$ init --route=${route} --mode=${forced ? "manual" : "rare"}`,
        "[bios] pointer layer detected .......... OK",
        "[bios] nav shell handshake ............. OK",
        "[bios] hero surface offline -> waking .. OK",
        "pk@startup:~$ scan --targets nav,hero,actions,cards",
        "target.nav ............... found",
        "target.hero .............. found",
        "target.buttons ........... found",
        "target.signal-layer ...... armed",
        "pk@startup:~$ decrypt ./profile/phil.kirchner",
        "identity: PHIL KIRCHNER",
        "stack: ORACLE_APEX | PL_SQL | JAVASCRIPT | SQL | REST",
        "pk@startup:~$ reveal --main-elements --stagger=120ms",
        "interface visibility: restoring",
        "cursor module: synchronized",
        "startup sequence complete"
      ];

      const nextLine = () => {
        if (lineIndex === 8) {
          root.classList.add("easter-boot-revealing");
          if (status) status.textContent = "revealing";
        }
        if (lineIndex >= lines.length) {
          if (status) status.textContent = "complete";
          renderBootSequenceText(output, `${state.text}\npk@startup:~$ _`, false);
          return;
        }
        const line = lines[lineIndex];
        lineIndex += 1;
        const isCommand = line.startsWith("pk@startup");
        if (isCommand) {
          typeBootSequenceLine(output, state, line, nextLine);
          return;
        }
        state.text += `${line}\n`;
        renderBootSequenceText(output, state.text, true);
        queueBootSequenceStep(nextLine, 155 + Math.random() * 165);
      };

      renderBootSequenceText(output, "powering visual interface...\n", true);
      state.text = "powering visual interface...\n";
      queueBootSequenceStep(nextLine, 480);
    }

    function runBootSequence(forced = false) {
      if (bootRunning) return;
      bootRunning = true;
      clearBootSequenceTyping();
      document.querySelector(".easter-boot-sequence")?.remove();

      const boot = document.createElement("div");
      boot.className = "easter-boot-sequence";
      boot.setAttribute("aria-hidden", "true");
      boot.innerHTML = `
        <div class="easter-boot-sequence__grid" aria-hidden="true"></div>
        <div class="easter-boot-sequence__terminal">
          <div class="easter-boot-sequence__bar">
            <span class="easter-boot-sequence__lights" aria-hidden="true"><b></b><b></b><b></b></span>
            <strong>PK_STARTUP_SEQUENCE</strong>
            <em>${forced ? "manual trigger" : "rare session boot"}</em>
          </div>
          <div class="easter-boot-sequence__meta">
            <span>route::<b>${document.body.classList.contains("vita-page") ? "vita" : "index"}</b></span>
            <span>visibility::<b>locked</b></span>
            <span class="easter-boot-sequence__status">status::<b>booting</b></span>
          </div>
          <pre class="easter-boot-sequence__output" aria-hidden="true"></pre>
          <div class="easter-boot-sequence__modules" aria-hidden="true">
            <span>nav</span><span>hero</span><span>cursor</span><span>buttons</span><span>signal</span>
          </div>
          <i class="easter-boot-sequence__meter"></i>
        </div>
      `;
      document.body.appendChild(boot);
      root.classList.add("easter-boot-active");
      showToast(forced ? "manual boot sequence" : "hidden boot sequence", 2600);
      emitCursorCode("BOOT", 10200, "is-dev-signal");

      window.setTimeout(() => boot.classList.add("is-visible"), 40);
      window.setTimeout(() => root.classList.add("easter-boot-scan"), 720);
      startBootSequenceTyping(boot, forced);
      queueBootSequenceStep(() => root.classList.add("easter-boot-revealing"), 3800);
      queueBootSequenceStep(() => boot.classList.add("is-complete"), 10100);
      queueBootSequenceStep(() => boot.classList.add("is-fading"), 11650);
      queueBootSequenceStep(() => {
        clearBootSequenceTyping();
        boot.remove();
        root.classList.remove("easter-boot-active", "easter-boot-scan", "easter-boot-revealing");
        bootRunning = false;
      }, 12480);
    }


    function pulseHeroSignal() {
      if (!hero || reduceMotion.matches) return;
      hero.classList.remove("easter-hero-pulse");
      window.requestAnimationFrame(() => {
        hero.classList.add("easter-hero-pulse");
        window.setTimeout(() => hero.classList.remove("easter-hero-pulse"), 900);
      });
    }

    function triggerDeveloperMode() {
      window.clearTimeout(devModeTimer);
      root.classList.add("easter-dev-mode", "easter-dev-boot");
      devHud.classList.add("is-visible");
      showToast("developer mode unlocked", 3600);
      flashTerminal("> developer shell attached // local interface only", 5200);
      emitCursorCode("{PK}", 6200, "is-dev-signal");
      startDevTerminalTyping();
      pulseHeroSignal();
      window.setTimeout(() => root.classList.remove("easter-dev-boot"), 1600);
      devModeTimer = window.setTimeout(() => {
        root.classList.remove("easter-dev-mode", "easter-dev-boot");
        devHud.classList.remove("is-visible");
        clearDevTerminalTyping();
      }, 24000);
    }

    function resizeMatrix(canvas, context, columns) {
      const ratio = Math.min(window.devicePixelRatio || 1, isFirefox ? 1.25 : 1.75);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns.length = Math.ceil(window.innerWidth / 18);
      for (let i = 0; i < columns.length; i += 1) {
        columns[i] = Math.random() * -window.innerHeight;
      }
    }

    function runMatrixRain() {
      if (matrixRunning) return;
      matrixRunning = true;
      showToast("matrix rain injected", 3000);
      flashTerminal("> matrix layer active", 3600);
      emitCursorCode("MTRX", 3600, "is-matrix-signal");

      if (reduceMotion.matches) {
        window.setTimeout(() => { matrixRunning = false; }, 900);
        return;
      }

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const columns = [];
      const glyphs = "01{}[]<>/\\|#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let frame = 0;
      let startTime = performance.now();
      canvas.className = "easter-matrix-rain";
      document.body.appendChild(canvas);

      resizeMatrix(canvas, context, columns);
      const resizeHandler = () => resizeMatrix(canvas, context, columns);
      window.addEventListener("resize", resizeHandler, { passive: true });

      function paint(now) {
        const elapsed = now - startTime;
        context.fillStyle = "rgba(16, 17, 20, 0.18)";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        context.font = "14px ui-monospace, SFMono-Regular, Consolas, monospace";
        context.fillStyle = "rgba(98, 214, 208, 0.72)";

        columns.forEach((y, index) => {
          const x = index * 18;
          const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
          context.fillText(glyph, x, y);
          columns[index] = y > window.innerHeight + Math.random() * 140 ? 0 : y + 18;
        });

        if (elapsed > 7800) canvas.classList.add("is-fading");
        if (elapsed < 8400) {
          frame = window.requestAnimationFrame(paint);
        } else {
          window.cancelAnimationFrame(frame);
          window.removeEventListener("resize", resizeHandler);
          canvas.remove();
          matrixRunning = false;
        }
      }

      frame = window.requestAnimationFrame(paint);
    }

    function setupHeroDwellTerminal() {
      if (!hero || !terminal) return;

      let dwellTimer = 0;
      let shown = false;
      let heroActive = false;
      const dwellDelay = 7000;

      const reveal = () => {
        if (shown || !heroActive || document.hidden) return;
        shown = true;
        const message = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
        flashTerminal(message, 5000);
        emitCursorCode("SIG", 3200, "is-signal-code");
      };

      const isHeroVisible = () => {
        const rect = hero.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        return visibleHeight > Math.min(rect.height * 0.18, 220);
      };

      const arm = () => {
        if (shown) return;
        window.clearTimeout(dwellTimer);
        heroActive = isHeroVisible();
        if (heroActive && !document.hidden) dwellTimer = window.setTimeout(reveal, dwellDelay);
      };

      const disarm = () => {
        heroActive = false;
        window.clearTimeout(dwellTimer);
      };

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          const active = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.18);
          if (active) arm();
          else disarm();
        }, { threshold: [0, 0.18, 0.56] });

        observer.observe(hero);
      } else {
        window.addEventListener("scroll", arm, { passive: true });
        window.addEventListener("resize", arm, { passive: true });
      }

      hero.addEventListener("pointerenter", arm, { passive: true });
      hero.addEventListener("focusin", arm);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) disarm();
        else arm();
      });
      window.setTimeout(arm, 120);
    }

    function setupSectionNumberTriggers() {
      const sectionAnimationTargets = [
        ".section-heading",
        ".text-stack",
        ".system-profile-panel",
        ".quick-facts > div",
        ".project-card",
        ".stack-console",
        ".stack-grid > article",
        ".profile-grid > article",
        ".timeline-item",
        ".credential-list > li",
        ".proof-card",
        ".oracle-badge-card",
        ".certificate-showcase",
        ".contact-actions > *",
        ".contact-status"
      ].join(", ");

      document.querySelectorAll("[data-section-index]").forEach((section) => {
        if (section.querySelector(":scope > .easter-section-trigger")) return;
        const index = section.dataset.sectionIndex || "";
        section.classList.add("has-easter-section-trigger");

        const trigger = document.createElement("button");
        trigger.className = "easter-section-trigger";
        trigger.type = "button";
        trigger.dataset.sectionSignal = index;
        trigger.setAttribute("aria-label", `Signal ${index}`);
        trigger.textContent = index;
        trigger.addEventListener("click", () => {
          const items = Array.from(section.querySelectorAll(sectionAnimationTargets));
          items.forEach((item, itemIndex) => {
            item.style.setProperty("--easter-delay", `${Math.min(itemIndex * 48, 336)}ms`);
          });
          section.classList.remove("easter-section-pulse");
          section.offsetHeight;
          window.requestAnimationFrame(() => {
            section.classList.add("easter-section-pulse");
          });
          showToast(`section ${index} signal`, 2600);
          flashTerminal(`> ${sectionMessages[index] || "section signal touched"}`, 3600);
          emitCursorCode(`S${index}`, 2900, "is-section-signal");
          window.setTimeout(() => {
            section.classList.remove("easter-section-pulse");
          }, 1300);
        });
        section.appendChild(trigger);
      });
    }

    function setupLanguageToggleEgg() {
      if (!langToggle) return;
      let clicks = [];
      langToggle.addEventListener("click", () => {
        const now = Date.now();
        clicks = clicks.filter((time) => now - time < 3600);
        clicks.push(now);
        if (clicks.length < 6) return;
        clicks = [];
        window.clearTimeout(devLangTimer);
        langToggle.classList.add("is-easter-dev-lang");
        root.classList.add("easter-dev-language-mode");
        showToast("language pack: DEV", 3200);
        flashTerminal("> language layer switched to DEV // monospace runtime", 4200);
        emitCursorCode("DEV", 3800, "is-dev-lang-code");
        devLangTimer = window.setTimeout(() => {
          langToggle.classList.remove("is-easter-dev-lang");
          root.classList.remove("easter-dev-language-mode");
        }, 6400);
      });
    }

    function setupThemeShift() {
      const brand = document.querySelector(".brand");
      if (!brand) return;
      brand.addEventListener("click", (event) => {
        if (!event.shiftKey) return;
        event.preventDefault();
        window.clearTimeout(themeTimer);
        root.classList.add("easter-theme-shift");
        showToast("secret theme shift", 3000);
        flashTerminal("> chroma protocol shifted", 3600);
        emitCursorCode("SYS", 3600, "is-theme-signal");
        themeTimer = window.setTimeout(() => root.classList.remove("easter-theme-shift"), 10000);
      });
    }

    function maybeRunBootSequence() {
      if (reduceMotion.matches) return;
      try {
        if (sessionStorage.getItem(PORTFOLIO_BOOT_SESSION_KEY) === "1") return;
        if (sessionStorage.getItem("pk-boot-sequence-seen") === "1") return;
        sessionStorage.setItem("pk-boot-sequence-seen", "1");
      } catch (error) {
        return;
      }

      if (Math.random() > 0.045) return;
      window.setTimeout(() => runBootSequence(false), 620);
    }

    document.addEventListener("keydown", (event) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();
      konamiBuffer.push(key);
      if (konamiBuffer.length > konami.length) konamiBuffer.shift();
      if (konamiBuffer.length === konami.length && konamiBuffer.every((value, index) => value === konami[index])) {
        triggerDeveloperMode();
        konamiBuffer = [];
      }

      if (/^[a-z]$/.test(key)) {
        typedBuffer = `${typedBuffer}${key}`.slice(-12);
        if (typedBuffer.endsWith("matrix")) {
          runMatrixRain();
          typedBuffer = "";
        } else if (typedBuffer.endsWith("boot")) {
          runBootSequence(true);
          typedBuffer = "";
        }
      }
    });

    setupHeroDwellTerminal();
    setupSectionNumberTriggers();
    setupLanguageToggleEgg();
    setupThemeShift();
    maybeRunBootSequence();
  }

  addCookieSettingsLink();
  setupCertificateLightbox();
  setLang(getInitialLang());
  setupHeroCursor();
  setupPortfolioStartup(shouldRunPortfolioBoot);
  setupFirstTimeGuide(shouldRunPortfolioBoot);
  setupTiltCards();
  setupActiveNavigation();
  setupTechStream();
  setupSignalCanvas();
  setupSignalFlicker();
  setupSecretDevConsole();
  setupSignalManualAccess();
  setupDeveloperOperatingLayer();
  setupEasterEggs();
  if (window.location.hash) {
    window.addEventListener("load", () => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        window.setTimeout(() => {
          const previousScrollBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = "auto";
          target.scrollIntoView({ block: "start" });
          window.requestAnimationFrame(() => {
            root.style.scrollBehavior = previousScrollBehavior;
          });
        }, 80);
      }
    }, { once: true });
  }
  window.addEventListener("resize", measureHero, { passive: true });
  window.addEventListener("orientationchange", measureHero, { passive: true });
  if (hero && "ResizeObserver" in window) {
    new ResizeObserver(measureHero).observe(hero);
  }
  updateScrollState();
  setupScrollReveals();
  openCookieBanner();
})();
