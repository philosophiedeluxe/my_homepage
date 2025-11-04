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

  // --- I18N Wörterbuch ---
  const I18N = {
    // ... dein Dictionary unverändert ...
    de: {
      "nav.vita":        "Vita",
      "nav.impressum":   "Impressum",
      "nav.datenschutz": "Datenschutz",
      "hero.title":      "Ich bin Phil",
      "hero.subtitle":   "Freut mich, dass du da bist!",
      "hero.mail":       "Schreib mir gerne eine Mail",
      
      "vita.title": "Meine persönliche \nEntwicklung",
      "vita.subtitle": "\"Ich betrachte meine berufliche Karriere \nals eine Reise\"",
      "vita.skills": "Kenntnisse:\n",
      "vita.gastro": "Gastronomielaufbahn - \nMunich Airport Marriott Hotel",
      "vita.certificates": "Zertifikate",
      "vita.back": "Zurück zur Startseite, \n... schreib mir wenn dir gefällt was du gelesen hast.",
      "vita.job1.h4": "Softwareentwickler - <br>Pragmatis GmbH",
      "vita.job2.h4": "Praktikum Softwareentwickler - <br>Europa Möbel-Verbund",
      "vita.job3.h4": "Ausbildung Fachinformatiker AE - <br>WBS GRUPPE",
      "vita.job4.h4": "Purchasing - <br>Munich Airport Marriott Hotel",
      
      "privacy.metaTitle": "Phil Kirchner - Datenschutz",
      "privacy.title": "Datenschutz­erklärung",
      "privacy.overview": "Datenschutz auf einen Blick",
      "privacy.section1": "1. Allgemeine Hinweise",
      "privacy.section2": "2. Datenerfassung auf dieser Website",
      "privacy.who": "Wer ist verantwortlich für die Datenerfassung auf dieser Website?",
      "privacy.howCollect": "Wie erfasse ich Ihre Daten?",
      "privacy.whyUse": "Wofür nutze ich Ihre Daten?",
      "privacy.rights": "Welche Rechte haben Sie bezüglich Ihrer Daten?",
      "privacy.tools": "3. Analyse-Tools und Tools von Drittanbietern",
      "privacy.controller": "4. Hinweis zur verantwortlichen Stelle",
      "privacy.controllerIntro": "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
      "privacy.retention": "5. Speicherdauer",
      "privacy.legalBases": "6. Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung",
      "privacy.withdraw": "7. Widerruf Ihrer Einwilligung zur Datenverarbeitung",
      "privacy.objection": "8. Widerspruchsrecht (Art. 21 DSGVO)",
      "privacy.complaint": "9. Beschwerderecht bei der zuständigen Aufsichtsbehörde",
      "privacy.portability": "Recht auf Datenübertragbarkeit",
      "privacy.accessRectifyErase": "10. Auskunft, Löschung und Berichtigung",
      "privacy.restrict": "11. Recht auf Einschränkung der Verarbeitung",
      "privacy.collectionOnSite": "Datenerfassung auf dieser Website",
      "privacy.request": "12. Anfrage per E-Mail, Telefon oder Telefax",
      "privacy.source": "Quelle:",
      "privacy.back": "Zurück zur Startseite,\n... liest du dir doch eh nicht wirklich durch",
      
      "imprint.metaTitle": "Phil Kirchner - Impressum",
      "imprint.title": "Impressum",
      "imprint.owner": "Webseitenbetreiber",
      "imprint.more": "Brauchst du mehr Informationen über mich?",
      "imprint.back": "Zurück zur Startseite,\n... wenn du alle infos hast die du brauchst"
    },
    en: {
      "nav.vita":        "Resume",
      "nav.impressum":   "Legal Notice",
      "nav.datenschutz": "Privacy",
      "hero.title":      "I’m Phil",
      "hero.subtitle":   "Happy you’re here!",
      "hero.mail":       "Drop me an email",
      
      "vita.title": "My Personal \nDevelopment",
      "vita.subtitle": "\"I see my professional career \nas a journey\"",
      "vita.skills": "Skills:\n",
      "vita.gastro": "Culinary Career - \nMunich Airport Marriott Hotel",
      "vita.certificates": "Certificates",
      "vita.back": "Back to homepage,\n... drop me a line if you liked what you read.",
      "vita.job1.h4": "Software Developer - <br>Pragmatis GmbH",
      "vita.job2.h4": "Software Developer Internship - <br>Europa Möbel-Verbund",
      "vita.job3.h4": "Apprenticeship IT Specialist (AE) - <br>WBS GROUP",
      "vita.job4.h4": "Purchasing - <br>Munich Airport Marriott Hotel",

      "privacy.metaTitle": "Phil Kirchner - Privacy",
      "privacy.title": "Privacy Policy",
      "privacy.overview": "Privacy at a glance",
      "privacy.section1": "1. General information",
      "privacy.section2": "2. Data collection on this website",
      "privacy.who": "Who is responsible for data processing on this website?",
      "privacy.howCollect": "How do I collect your data?",
      "privacy.whyUse": "What do I use your data for?",
      "privacy.rights": "What rights do you have regarding your data?",
      "privacy.tools": "3. Analytics and third-party tools",
      "privacy.controller": "4. Information about the controller",
      "privacy.controllerIntro": "The controller responsible for data processing on this website is:",
      "privacy.retention": "5. Storage duration",
      "privacy.legalBases": "6. Legal bases for processing",
      "privacy.withdraw": "7. Withdrawal of your consent",
      "privacy.objection": "8. Right to object (Art. 21 GDPR)",
      "privacy.complaint": "9. Right to lodge a complaint with a supervisory authority",
      "privacy.portability": "Right to data portability",
      "privacy.accessRectifyErase": "10. Access, erasure and rectification",
      "privacy.restrict": "11. Right to restriction of processing",
      "privacy.collectionOnSite": "Data collection on this website",
      "privacy.request": "12. Requests by email, phone or fax",
      "privacy.source": "Source:",
      "privacy.back": "Back to homepage,\n... be honest, you weren’t going to read it anyway",
      "imprint.metaTitle": "Phil Kirchner - Legal Notice",
      "imprint.title": "Legal Notice",
      "imprint.owner": "Website owner",
      "imprint.more": "Need more information about me?",
      "imprint.back": "Back to homepage,\n... if you’ve got all the info you need"
    }
  };

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
  setLang(getInitialLang());

  // --- Sprach-Button verdrahten ---
  if (langBtn){
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute("data-lang") || DEFAULT_LANG;
      setLang(current === "de" ? "en" : "de");
      setOpen(false); // Menü ggf. schließen (no-op, wenn keine Nav)
    });
  }

function setOpenHeight(label){
  if (!label) return;
  const h   = label.scrollHeight;                       // natürliche Inhaltshöhe
  const cap = Math.round(Math.min(h, window.innerHeight * 0.8)); // Deckel ~80vh
  label.style.setProperty('--card-open-h', cap + 'px');
}

// Initial: jedem Label einen Startwert geben
radios.forEach(r => {
  const label = r.nextElementSibling;
  setOpenHeight(label);

  // WICHTIG: nach dem Umschalten erst im nächsten Frame messen
  r.addEventListener('change', () => {
    const lbl = r.nextElementSibling;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpenHeight(lbl));
    });
  });
});

// Beim Load den aktuell geöffneten nochmals korrekt setzen
const initiallyChecked = document.querySelector('input[name="slide"]:checked');
if (initiallyChecked) {
  requestAnimationFrame(() => setOpenHeight(initiallyChecked.nextElementSibling));
}

// Bei Resize nur für die offene Karte neu messen
window.addEventListener('resize', () => {
  const checked = document.querySelector('input[name="slide"]:checked');
  if (checked) setOpenHeight(checked.nextElementSibling);
});


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
