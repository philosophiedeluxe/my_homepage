// app.js – Nav (Collapse) + I18N (DE/EN) mit Persistenz
(function () {
  const BREAKPOINT = 900;
  const SUPPORTED = ["de", "en"];
  const DEFAULT_LANG = "de";

  const header = document.querySelector("header");
  const nav    = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const list   = document.getElementById("primary-nav");
  const langBtn= document.getElementById("lang-toggle");
  if (!header || !nav || !toggle || !list || !langBtn) return;

  // --- I18N Wörterbuch (klein anfangen, später erweitern) ---
  const I18N = {
    de: {
      "nav.vita": "Vita",
      "nav.impressum": "Impressum",
      "nav.datenschutz": "Datenschutz",
      "hero.title": "Ich bin Phil",
      "hero.subtitle": "Freut mich, dass du da bist!",
      "hero.mail": "Schreib mir gerne eine Mail"
    },
    en: {
      "nav.vita": "Resume",
      "nav.impressum": "Legal Notice",
      "nav.datenschutz": "Privacy",
      "hero.title": "I’m Phil",
      "hero.subtitle": "Happy you’re here!",
      "hero.mail": "Drop me an email"
    }
  };

  function sanitizeLang(l){
    l = (l || "").toLowerCase();
    if (SUPPORTED.includes(l)) return l;
    // Browser-Sprache grob auf de/en mappen
    if (l.startsWith("de")) return "de";
    if (l.startsWith("en")) return "en";
    return DEFAULT_LANG;
  }

  function applyTranslations(lang){
    const dict = I18N[lang] || {};
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const txt = dict[key];
      if (typeof txt === "string") {
        // Für Links/Buttons reicht textContent (sicherer als innerHTML)
        el.textContent = txt;
      }
    });
    // Button-Label/ARIA
    langBtn.setAttribute("aria-label",
      lang === "de" ? "Sprache umschalten (Deutsch/Englisch)" : "Switch language (English/German)");
  }

  function getInitialLang(){
    const stored = localStorage.getItem("lang");
    if (stored) return sanitizeLang(stored);
    const qp = new URLSearchParams(location.search).get("lang");
    if (qp) return sanitizeLang(qp);
    return sanitizeLang(navigator.language);
  }

  function setLang(lang){
    lang = sanitizeLang(lang);
    localStorage.setItem("lang", lang);
    applyTranslations(lang);
  }

  // --- Nav Collapse (dein bestehendes Verhalten) ---
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

  // --- Language switch ---
  // Initial setzen
  setLang(getInitialLang());

  // Toggle DE <-> EN
  langBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const current = document.documentElement.getAttribute("data-lang") || DEFAULT_LANG;
    const next = current === "de" ? "en" : "de";
    setLang(next);
    // Im mobilen Menü darf es anschließend zugehen
    if (list.dataset.open === "true") setOpen(false);
  });
})();
