// app.js – I18N (DE/EN) + optionales Nav-Collapse (defensiv verdrahtet)
(function () {
  const BREAKPOINT   = 900;                 // px
  const SUPPORTED    = ["de", "en"];
  const DEFAULT_LANG = "de";

  // --- Selektoren (dürfen auch mal null sein) ---
  const header = document.querySelector("header");
  const nav    = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const list   = document.getElementById("primary-nav");
  const langBtn= document.getElementById("lang-toggle");

  // --- I18N Wörterbuch ---
  const I18N = {
    de: {
      "nav.vita":        "Vita",
      "nav.impressum":   "Impressum",
      "nav.datenschutz": "Datenschutz",
      "hero.title":      "Ich bin Phil",
      "hero.subtitle":   "Freut mich, dass du da bist!",
      "hero.mail":       "Schreib mir gerne eine Mail",
      "vita.title": "Meine persönliche Entwicklung",
      "vita.subtitle": "\"Ich betrachte meine berufliche Karriere als eine Reise\"",
      "vita.skills": "Kenntnisse:",
      "vita.gastro": "Gastronomielaufbahn - \nMunich Airport Marriott Hotel",
      "vita.apprenticeship": "Ausbildung zum Koch",
      "vita.certificates": "Zertifikate",
      "vita.back": "Zurück zur Startseite, \n... schreib mir wenn dir gefällt was du gelesen hast.",
    },
    en: {
      "nav.vita":        "Resume",
      "nav.impressum":   "Legal Notice",
      "nav.datenschutz": "Privacy",
      "hero.title":      "I’m Phil",
      "hero.subtitle":   "Happy you’re here!",
      "hero.mail":       "Drop me an email"
      "vita.title": "My Personal Development",
      "vita.subtitle": "\"I see my professional career as a journey\"",
      "vita.skills": "Skills:",
      "vita.gastro": "Culinary Career - \nMunich Airport Marriott Hotel",
      "vita.apprenticeship": "Apprenticeship as a Cook",
      "vita.certificates": "Certificates",
      "vita.back": "Back to homepage,\n... drop me a line if you liked what you read."
    }
  };

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
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const txt = dict[key];
      if (typeof txt === "string") el.textContent = txt;
    });
    // ARIA für den Sprachbutton (falls vorhanden)
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

  // --- Initiale Sprache setzen (IMMER, unabhängig von der Nav) ---
  setLang(getInitialLang());

  // --- Sprach-Button verdrahten (falls vorhanden) ---
  if (langBtn){
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute("data-lang") || DEFAULT_LANG;
      setLang(current === "de" ? "en" : "de");
      // Mobiles Menü danach schließen (falls vorhanden & offen)
      if (list && list.dataset.open === "true") setOpen(false);
    });
  }

  // =================== Nav-Collapse (optional) ===================
  if (header && nav && toggle && list){
    const mq = window.matchMedia(`(max-width:${BREAKPOINT}px)`);

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      list.dataset.open = open ? "true" : "false";
    }

    function applyMode() {
      const mobile = mq.matches;
      header.classList.toggle("is-mobile", mobile);
      header.classList.toggle("is-desktop", !mobile);
      setOpen(false); // Zustand resetten
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
      if (e.key === "Escape") { setOpen(false); toggle.focus(); }
    });

    list.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
  }
})();
