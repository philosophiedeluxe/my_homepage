// app.js – I18N (DE/EN) + optionales Nav-Collapse (robust, ohne Scope-Falle)
(function () {
  const BREAKPOINT   = 900;
  const SUPPORTED    = ["de", "en"];
  const DEFAULT_LANG = "de";

  // --- DOM-Hooks (dürfen null sein) ---
  const header  = document.querySelector("header");
  const nav     = document.querySelector(".nav");
  const toggle  = document.querySelector(".nav-toggle");
  const list    = document.getElementById("primary-nav");
  const langBtn = document.getElementById("lang-toggle");

  const hasNav = !!(nav && toggle && list);

  const radios = document.querySelectorAll('input[name="slide"]');

  // --- Nav-Höhe -> CSS-Variable (für 100svh-Layout) ---
  function setNavHeightVar(){
    const h = nav ? Math.round(nav.getBoundingClientRect().height) : 56;
    document.documentElement.style.setProperty('--nav-h', `${h}px`);
  }
  setNavHeightVar();
  window.addEventListener('resize', setNavHeightVar);
  window.addEventListener('load', setNavHeightVar); // falls Webfonts nachladen
  // <-- KEINE zusätzliche schließende Klammer hier!

  // --- I18N Wörterbuch (ausgelagert in /i18n/*.json) ---
  const I18N = {};

  async function loadI18nDictionaries(){
    const loaders = SUPPORTED.map(async (lang) => {
      const resp = await fetch(`./i18n/${lang}.json`, { cache: "no-store" });
      if (!resp.ok) throw new Error(`I18N ${lang} not found`);
      I18N[lang] = await resp.json();
    });
    await Promise.all(loaders);
  }



   // --- Nav-Helper: jetzt TOP-LEVEL, damit überall sichtbar ---
    function setOpen(open){
      if(!hasNav) return;
      toggle.setAttribute("aria-expanded", String(open));
      list.dataset.open = open ? "true" : "false";
    }
  
    // --- I18N Helpers ---
    function sanitizeLang(l){
      l = (l || "").toLowerCase();
      if (SUPPORTED.includes(l)) return l;
      if (l.startsWith("de")) return "de";
      if (l.startsWith("en")) return "en";
      return DEFAULT_LANG;
    }
  
  function applyTranslations(lang){
    const dict = I18N[lang] || {};
    const html = document.documentElement;
    html.lang = lang;
    html.setAttribute("data-lang", lang);
  
    document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
      if (!key) return;
      const txt = dict[key];
      if (typeof txt !== "string") return;
  
      if (el.hasAttribute("data-i18n-html")) {
        // 1) \n -> <br>
        // 2) Nur <br> als HTML erlauben, alles andere strippen
        let s = txt.replace(/\n/g, "<br>");
        s = s.replace(/<(?!br\s*\/?>)[^>]+>/gi, ""); // alle Tags außer <br> entfernen
        el.innerHTML = s;
      } else {
        // Plain Text
        el.textContent = txt;
      }
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      if (!key) return;
      const txt = dict[key];
      if (typeof txt === "string") el.setAttribute("content", txt);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (!key) return;
      const txt = dict[key];
      if (typeof txt === "string") el.setAttribute("aria-label", txt);
    });
  
    if (langBtn){
      langBtn.setAttribute(
        "aria-label",
        lang === "de" ? "Sprache umschalten (Deutsch/Englisch)"
                      : "Switch language (English/German)"
      );
    }
  }

  function getInitialLang(){
    const stored = localStorage.getItem("lang");
    if (stored) return sanitizeLang(stored);
    const qp = new URLSearchParams(location.search).get("lang");
    if (qp) return sanitizeLang(qp);
    return sanitizeLang(navigator.language || navigator.userLanguage || DEFAULT_LANG);
  }

  function setLang(lang){
    lang = sanitizeLang(lang);
    localStorage.setItem("lang", lang);
    applyTranslations(lang);
  }

  // --- I18N initialisieren ---
  loadI18nDictionaries()
    .then(() => setLang(getInitialLang()))
    .catch(() => setLang(DEFAULT_LANG));

  // --- Sprach-Button verdrahten ---
  if (langBtn){
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute("data-lang") || DEFAULT_LANG;
      setLang(current === "de" ? "en" : "de");
      setOpen(false); // Menü ggf. schließen (no-op, wenn keine Nav)
    });
  }

// --- Cards: dynamische Open-Höhe robust setzen (kein Caching-32px mehr) ---
function recomputeOpenHeight(){
  // 1) ALLE Karten von alten Inline-Werten befreien, damit Fallback sofort greift
  document.querySelectorAll('label.card').forEach(l => {
    l.style.removeProperty('--card-open-h');
    l.classList.remove('is-measuring');
  });

  // 2) aktuell GEÖFFNETE Karte bestimmen
  const checked = document.querySelector('input[name="slide"]:checked');
  if (!checked) return;
  const lab = checked.nextElementSibling;
  if (!lab || !lab.classList || !lab.classList.contains('card')) return;

  // 3) kurz "Messmodus": Kinder nicht mehr begrenzen, dann messen
  lab.classList.add('is-measuring');

  // doppelte rAF: erst NACH dem Statewechsel + Styles messen
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const full = lab.scrollHeight;                            // echte Inhaltshöhe
      const cap  = Math.round(Math.min(full, window.innerHeight * 0.80)); // ~80vh Deckel
      // 4) Zielhöhe setzen und Messmodus beenden
      lab.style.setProperty('--card-open-h', cap + 'px');
      lab.classList.remove('is-measuring');
    });
  });
}

// Events verdrahten
if (radios && radios.length){
  radios.forEach(r => r.addEventListener('change', recomputeOpenHeight));
}

// Initial: falls eine Karte vorgewählt ist (c1 checked)
recomputeOpenHeight();

// Resize: offene Karte neu rechnen
window.addEventListener('resize', recomputeOpenHeight);


  // --- Optional: Nav-Collapse nur, wenn vorhanden ---
  if (hasNav){
    const mq = window.matchMedia(`(max-width:${BREAKPOINT}px)`);

    function applyMode() {
      const mobile = mq.matches;
      if (header){
        header.classList.toggle("is-mobile", mobile);
        header.classList.toggle("is-desktop", !mobile);
      }
      setOpen(false);
    }

    applyMode();
    (mq.addEventListener ? mq.addEventListener("change", applyMode)
                         : window.addEventListener("resize", applyMode));

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    document.addEventListener("click", (e) => {
      if (list.dataset.open !== "true") return;
      if (!e.target.closest(".nav")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { setOpen(false); toggle && toggle.focus(); }
    });

    list.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
  }
})();
