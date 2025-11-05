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
    de: {
      "nav.vita":        "Vita",
      "nav.impressum":   "Impressum",
      "nav.datenschutz": "Datenschutz",

      "home.metaTitle":  "Phil Kirchner - Softwareentwickler",
      "hero.title":      "Ich bin Phil",
      "hero.subtitle":   "Freut mich, dass du da bist!",
      "hero.mail":       "Schreib mir gerne eine Mail",
      "home.intro":
        "Meine berufliche Reise begann mit meiner Ausbildung zum Koch im Jahr 2003. " +
        "Über die Jahre habe ich verschiedene Positionen durchlaufen.<br><br>" +
        "Im Jahr 2011 entschied ich mich für eine Weiterentwicklung meiner Fähigkeiten und übernahm die Verantwortung als Purchasing Agent, " +
        "bevor ich schließlich von 2016 bis 2021 die Position des Purchasing Supervisors innehatte. " +
        "Während meiner Zeit in dieser Rolle habe ich Erfahrungen in verschiedenen Bereichen gesammelt.<br><br>" +
        "Meine Leidenschaft für Technologie führte mich 2023 zu einer Umschulung als Fachinformatiker Anwendungsentwicklung bei der WBS Training in München. " +
        "Seitdem habe ich meine Fähigkeiten in den Bereichen Agile Scrum Master, Agile Scrum Product Owner und Projektmanagement (PRINCE2®) erweitert. " +
        "Meine IT-Kenntnisse erstrecken sich über verschiedene Software- und Programmiersprachen wie Java, PL/SQL, JavaScript, Angular und HTML/CSS; " +
        "außerdem kenne ich mich natürlich auch mit MS Office, Confluence, Jira, IntelliJ IDEA und GitHub aus.<br><br>" +
        "Abseits meiner beruflichen Tätigkeiten bin ich ein begeisterter Technik-Enthusiast und Filmliebhaber. " +
        "Mein Interesse an fortschrittlicher Technologie spiegelt sich nicht nur in meiner beruflichen Entwicklung, sondern auch in meiner Freizeit wider.<br><br>" +
        "Mit diesem Webauftritt möchte ich mich dir vorstellen.<br>",
      
      "vita.title":      "Meine persönliche \nEntwicklung",
      "vita.subtitle":   "\"Ich betrachte meine berufliche Karriere \nals eine Reise\"",
      "vita.skills":     "Kenntnisse:\n",
      "vita.gastro":     "Gastronomielaufbahn - <br>Munich Airport Marriott Hotel", // HTML wegen data-i18n-html
      "vita.certificates": "Zertifikate",
      "vita.back":       "Zurück zur Startseite, \n... schreib mir wenn dir gefällt was du gelesen hast.",
      "vita.job1.h4":    "Softwareentwickler - <br>Pragmatis GmbH",
      "vita.job2.h4":    "Praktikum Softwareentwickler - <br>Europa Möbel-Verbund",
      "vita.job3.h4":    "Ausbildung Fachinformatiker AE - <br>WBS GRUPPE",
      "vita.job4.h4":    "Purchasing - <br>Munich Airport Marriott Hotel",
  
      // NEU/ergänzt für diese Seite:
      "vita.metaTitle":  "Phil Kirchner - Softwareentwickler",
  
      "vita.job1.p":
        "Dez. 2023 – Heute<br><br>" +
        "Neufahrn bei Freising, Bayern, DE<br><br>" +
        "<strong>Kenntnisse:</strong><br>" +
        "Oracle APEX · PL/SQL · JavaScript · HTML · Cascading Style Sheets (CSS) · Rest Data Source · Restful Services · Oracle DB",
  
      "vita.job2.p":
        "Sept. 2022 – Apr. 2023<br><br>" +
        "Fahrenzhausen, Bayern, DE<br><br>" +
        "<strong>Kenntnisse:</strong><br>" +
        "Java · SQL · Datenbanken · Git · Kanban · Confluence · JIRA · Teamwork · DBMS · Webentwicklung · Vaadin · MVC-Architektur · Spring Framework · Spring Boot · Unified Modeling Language (UML)",
  
      "vita.job3.p":
        "Aug. 2021 – Juni 2023<br><br>" +
        "Freising, Bayern, DE<br><br>" +
        "<strong>Kenntnisse:</strong><br>" +
        "Objektorientierte Programmierung (OOP) · Software-Entwurfsmuster · Java · SQL · Datenbanken · Agile Methoden · IT-Strategie · DBMS · Green IT · HTML · CSS · Microsoft SQL Server",
  
      "vita.job4.p":
        "Supervisor Einkauf<br>Juni 2016 – Aug. 2021<br><br>" +
        "Purchasing Agent<br>Juni 2015 – Juni 2016<br><br>" +
        "Food And Beverage Trainee<br>Feb. 2014 – Juni 2015",
  
      "vita.gastro.p":
        "Chef de Partie<br>Juni 2011 – Feb. 2014<br><br>" +
        "Demi Chef De Partie<br>Sept. 2007 – Juni 2011<br><br>" +
        "Commis de cuisine<br>Juli 2006 – Sept. 2007<br><br>" +
        "Ausbildung zum Koch<br>Sept. 2003 – Juli 2006",
  
      "vita.certificates.p":
        "2021 – 2023<br><br>" +
        "· EXIN Agile Scrum Master<br>" +
        "· EXIN Agile Scrum Product Owner<br>" +
        "· PRINCE2® 6th Edition Foundation in Project Management<br>" +
        "· PRINCE2® 6th Edition Practitioner in Project Management<br>" +
        "· ITIL® V4 Foundation",
  
      // Datenschutz / Impressum (unverändert aus deinem Snippet)
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

      "home.metaTitle":  "Phil Kirchner - Software Developer",
      "hero.title":      "I’m Phil",
      "hero.subtitle":   "Happy you’re here!",
      "hero.mail":       "Drop me an email",
      "home.intro":
        "My professional journey began with my chef apprenticeship in 2003. " +
        "Over the years, I have held various positions.<br><br>" +
        "In 2011, I chose to further develop my skills and took on responsibility as a Purchasing Agent, " +
        "before serving as Purchasing Supervisor from 2016 to 2021. " +
        "During that time, I gained experience across different areas.<br><br>" +
        "My passion for technology led me in 2023 to retrain as an IT Specialist for Application Development at WBS Training in Munich. " +
        "Since then, I have expanded my skills as an Agile Scrum Master, Agile Scrum Product Owner, and in project management (PRINCE2®). " +
        "My IT knowledge spans various software and programming languages such as Java, PL/SQL, JavaScript, Angular, and HTML/CSS; " +
        "I am also comfortable with MS Office, Confluence, Jira, IntelliJ IDEA, and GitHub.<br><br>" +
        "Outside of work, I am a technology enthusiast and movie lover. " +
        "My interest in advanced technology is reflected not only in my professional development but also in my spare time.<br><br>" +
        "With this website, I would like to introduce myself to you.<br>",
  
      "vita.title":      "My Personal \nDevelopment",
      "vita.subtitle":   "\"I see my professional career \nas a journey\"",
      "vita.skills":     "Skills:\n",
      "vita.gastro":     "Culinary Career - <br>Munich Airport Marriott Hotel", // HTML wegen data-i18n-html
      "vita.certificates": "Certificates",
      "vita.back":       "Back to homepage,\n... drop me a line if you liked what you read.",
      "vita.job1.h4":    "Software Developer - <br>Pragmatis GmbH",
      "vita.job2.h4":    "Software Developer Internship - <br>Europa Möbel-Verbund",
      "vita.job3.h4":    "Apprenticeship IT Specialist (AE) - <br>WBS GROUP",
      "vita.job4.h4":    "Purchasing - <br>Munich Airport Marriott Hotel",
  
      // NEU/ergänzt für diese Seite:
      "vita.metaTitle":  "Phil Kirchner - Software Developer",
  
      "vita.job1.p":
        "Dec 2023 – Today<br><br>" +
        "Neufahrn near Freising, Bavaria, DE<br><br>" +
        "<strong>Skills:</strong><br>" +
        "Oracle APEX · PL/SQL · JavaScript · HTML · Cascading Style Sheets (CSS) · REST Data Source · RESTful Services · Oracle DB",
  
      "vita.job2.p":
        "Sep 2022 – Apr 2023<br><br>" +
        "Fahrenzhausen, Bavaria, DE<br><br>" +
        "<strong>Skills:</strong><br>" +
        "Java · SQL · Databases · Git · Kanban · Confluence · JIRA · Teamwork · DBMS · Web development · Vaadin · MVC architecture · Spring Framework · Spring Boot · Unified Modeling Language (UML)",
  
      "vita.job3.p":
        "Aug 2021 – Jun 2023<br><br>" +
        "Freising, Bavaria, DE<br><br>" +
        "<strong>Skills:</strong><br>" +
        "Object-oriented programming (OOP) · Design patterns · Java · SQL · Databases · Agile methods · IT strategy · DBMS · Green IT · HTML · CSS · Microsoft SQL Server",
  
      "vita.job4.p":
        "Purchasing Supervisor<br>Jun 2016 – Aug 2021<br><br>" +
        "Purchasing Agent<br>Jun 2015 – Jun 2016<br><br>" +
        "Food and Beverage Trainee<br>Feb 2014 – Jun 2015",
  
      "vita.gastro.p":
        "Chef de Partie<br>Jun 2011 – Feb 2014<br><br>" +
        "Demi Chef de Partie<br>Sep 2007 – Jun 2011<br><br>" +
        "Commis de cuisine<br>Jul 2006 – Sep 2007<br><br>" +
        "Apprenticeship as Cook<br>Sep 2003 – Jul 2006",
  
      "vita.certificates.p":
        "2021 – 2023<br><br>" +
        "· EXIN Agile Scrum Master<br>" +
        "· EXIN Agile Scrum Product Owner<br>" +
        "· PRINCE2® 6th Edition Foundation in Project Management<br>" +
        "· PRINCE2® 6th Edition Practitioner in Project Management<br>" +
        "· ITIL® V4 Foundation",
  
      // Privacy / Imprint (unverändert aus deinem Snippet)
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
