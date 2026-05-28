(function () {
  const SUPPORTED_LANGS = ["de", "en"];
  const DEFAULT_LANG = "de";

  const translations = {
    de: {
      "meta.home.title": "Phil Kirchner - Softwareentwickler",
      "meta.home.description": "Portfolio von Phil Kirchner: Softwareentwicklung, Oracle APEX, PL/SQL, JavaScript, Java und strukturierte Produktarbeit.",
      "meta.vita.title": "Phil Kirchner - Vita",
      "meta.vita.description": "Vita von Phil Kirchner: Softwareentwicklung, Oracle APEX, PL/SQL, Java, Ausbildung, Zertifikate und berufliche Stationen.",
      "meta.imprint.title": "Phil Kirchner - Impressum",
      "meta.privacy.title": "Phil Kirchner - Datenschutz",

      "nav.profile": "Profil",
      "nav.projects": "Projekte",
      "nav.stack": "Stack",
      "nav.vita": "Vita",
      "nav.imprint": "Impressum",
      "nav.privacy": "Datenschutz",

      "hero.eyebrow": "Softwareentwickler aus Freising",
      "hero.title": "Ich baue <span class=\"accent-word\">Software</span>, die Prozesse nicht nur digitalisiert, sondern <span class=\"accent-word\">antreibt</span>.",
      "hero.text": "Ich komme aus operativer Verantwortung, habe Einkauf, Prozesse und Teams von innen gesehen und entwickle heute Anwendungen mit Oracle APEX, PL/SQL, JavaScript und Java. Genau diese Mischung macht mich stark: Technik, die nicht nur läuft, sondern im Alltag Sinn ergibt.",
      "hero.mail": "Kontakt aufnehmen",
      "hero.vita": "Vita ansehen",
      "facts.focus.label": "Fokus",
      "facts.focus.value": "Business Apps",
      "facts.stack.label": "Stack",
      "facts.mode.label": "Arbeitsweise",
      "facts.mode.value": "Agil & strukturiert",

      "position.eyebrow": "Was mich unterscheidet",
      "position.title": "Ich denke <span class=\"accent-word\">Software</span> nicht nur vom Code aus.",
      "position.p1": "Vor der IT war ich viele Jahre in Küche, Einkauf und Verantwortung unterwegs. Ich kenne Druck, Übergaben, Prioritäten, Lieferketten, Abstimmungen und die Momente, in denen ein gutes Tool den Unterschied macht.",
      "position.p2": "Deshalb interessieren mich besonders Anwendungen, die Prozesse sichtbar machen, Daten sauber führen und Menschen im Arbeitsfluss entlasten.",

      "projects.eyebrow": "Projekt-Spotlights",
      "projects.title": "Arbeiten, die zeigen, wie ich <span class=\"accent-word\">denke</span>.",
      "project.home.title": "Modernisierte persönliche Homepage",
      "project.home.text": "Eine statische, schnelle Portfolio-Seite mit klarer Positionierung, responsivem Layout, DE/EN-Umschaltung und verbessertem SEO-Fundament.",
      "project.apex.title": "Oracle-nahe Anwendungsentwicklung",
      "project.apex.text": "Fokus auf Oberflächen, Datenmodelle und Abläufe rund um Oracle APEX, PL/SQL, REST Data Sources und strukturierte Datenhaltung.",
      "project.java.title": "Java, SQL und saubere Grundarchitektur",
      "project.java.text": "Ausbildung und Praxis mit Java, SQL, Spring Boot, MVC, Vaadin, Git, Jira, Confluence und modellgetriebener Softwareentwicklung.",

      "stack.eyebrow": "Kompetenzprofil",
      "stack.title": "Technik, Methoden und <span class=\"accent-word\">Erfahrung</span> in einem Profil.",
      "stack.dev.title": "Entwicklung",
      "stack.product.title": "Produkt & Prozess",
      "stack.tools.title": "Tools",

      "contact.eyebrow": "Nächster Schritt",
      "contact.title": "Lass uns über <span class=\"accent-word\">Software</span> sprechen, die im echten Betrieb trägt.",
      "contact.mail": "Mail schreiben",
      "contact.linkedin": "LinkedIn öffnen",

      "vita.eyebrow": "Vita",
      "vita.title": "Eine Laufbahn zwischen Praxis, Verantwortung und <span class=\"accent-word\">Software</span>.",
      "vita.intro": "Meine berufliche Reise begann in der Gastronomie und führte über Einkauf, Prozessverantwortung und Projektarbeit in die Softwareentwicklung. Diese Stationen sind für mich kein Bruch, sondern mein Fundament.",
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
      "vita.contact.title": "Wenn das <span class=\"accent-word\">Profil</span> passt, freue ich mich über eine Nachricht.",
      "vita.back": "Zur Startseite",

      "imprint.eyebrow": "Anbieterkennzeichnung",
      "imprint.title": "<span class=\"accent-word\">Impressum</span>",
      "imprint.owner": "Webseitenbetreiber",
      "imprint.contact": "Kontakt",
      "imprint.responsible": "Verantwortlich für den Inhalt",
      "imprint.note": "Diese Seite ist eine private Portfolio-Homepage.",

      "privacy.eyebrow": "Datenschutz",
      "privacy.title": "<span class=\"accent-word\">Datenschutzerklärung</span>",
      "privacy.intro": "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Portfolio-Website verarbeitet werden.",
      "privacy.controller": "Verantwortliche Stelle",
      "privacy.access": "Zugriffsdaten",
      "privacy.access.text": "Beim Aufruf dieser Website können durch den Hosting-Anbieter technisch notwendige Zugriffsdaten verarbeitet werden, zum Beispiel IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem, Referrer-URL und angeforderte Dateien. Diese Daten dienen der sicheren und fehlerfreien Bereitstellung der Website.",
      "privacy.contact": "Kontaktaufnahme",
      "privacy.contact.text": "Wenn Sie per E-Mail Kontakt aufnehmen, werden die übermittelten Angaben zur Bearbeitung der Anfrage verarbeitet. Die Daten werden nicht ohne Einwilligung weitergegeben.",
      "privacy.fonts": "Schriftarten und Analyse",
      "privacy.fonts.text": "Diese Website nutzt Systemschriftarten und verzichtet derzeit auf Analytics, Tracking-Skripte und Cookies.",
      "privacy.links": "Externe Links",
      "privacy.links.text": "Diese Website verlinkt auf externe Profile, insbesondere GitHub, LinkedIn und Instagram. Beim Öffnen dieser Links gelten die Datenschutzbestimmungen der jeweiligen Anbieter.",
      "privacy.rights": "Ihre Rechte",
      "privacy.rights.text": "Sie haben im Rahmen der gesetzlichen Bestimmungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Außerdem besteht ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde.",
      "privacy.legal": "Rechtsgrundlagen",
      "privacy.legal.text": "Die Verarbeitung erfolgt, soweit einschlägig, auf Grundlage von Art. 6 Abs. 1 DSGVO, insbesondere berechtigtem Interesse an einer sicheren Websitebereitstellung sowie zur Bearbeitung freiwilliger Kontaktanfragen.",
      "privacy.note": "Hinweis: Diese Erklärung ist bewusst schlank gehalten. Bei zusätzlichem Tracking, Formularen oder Analytics sollte sie vor Veröffentlichung juristisch geprüft und erweitert werden."
    },

    en: {
      "meta.home.title": "Phil Kirchner - Software Developer",
      "meta.home.description": "Portfolio of Phil Kirchner: software development, Oracle APEX, PL/SQL, JavaScript, Java and structured product thinking.",
      "meta.vita.title": "Phil Kirchner - Resume",
      "meta.vita.description": "Resume of Phil Kirchner: software development, Oracle APEX, PL/SQL, Java, education, certificates and professional experience.",
      "meta.imprint.title": "Phil Kirchner - Legal Notice",
      "meta.privacy.title": "Phil Kirchner - Privacy",

      "nav.profile": "Profile",
      "nav.projects": "Projects",
      "nav.stack": "Stack",
      "nav.vita": "Resume",
      "nav.imprint": "Legal Notice",
      "nav.privacy": "Privacy",

      "hero.eyebrow": "Software developer from Freising",
      "hero.title": "I build <span class=\"accent-word\">software</span> that does not just digitize work. It <span class=\"accent-word\">drives</span> it.",
      "hero.text": "I come from operational responsibility, have seen purchasing, processes and teams from the inside, and now build applications with Oracle APEX, PL/SQL, JavaScript and Java. That mix is my strength: technology that does not just run, but makes sense in daily work.",
      "hero.mail": "Get in touch",
      "hero.vita": "View resume",
      "facts.focus.label": "Focus",
      "facts.focus.value": "Business apps",
      "facts.stack.label": "Stack",
      "facts.mode.label": "Mode",
      "facts.mode.value": "Agile & structured",

      "position.eyebrow": "What sets me apart",
      "position.title": "I do not think about <span class=\"accent-word\">software</span> only from the code outward.",
      "position.p1": "Before IT, I spent many years in kitchens, purchasing and responsibility. I know pressure, handovers, priorities, supply chains, coordination and the moments when a good tool changes the day.",
      "position.p2": "That is why I care about applications that make processes visible, keep data clean and help people stay in their flow.",

      "projects.eyebrow": "Project spotlights",
      "projects.title": "Work that shows how I <span class=\"accent-word\">think</span>.",
      "project.home.title": "Modernized personal homepage",
      "project.home.text": "A static, fast portfolio site with clearer positioning, responsive layout, DE/EN language switching and a stronger SEO foundation.",
      "project.apex.title": "Oracle-centered application development",
      "project.apex.text": "Focus on interfaces, data models and workflows around Oracle APEX, PL/SQL, REST Data Sources and structured data management.",
      "project.java.title": "Java, SQL and clean fundamentals",
      "project.java.text": "Training and practice with Java, SQL, Spring Boot, MVC, Vaadin, Git, Jira, Confluence and model-driven software development.",

      "stack.eyebrow": "Skill profile",
      "stack.title": "Technology, methods and <span class=\"accent-word\">experience</span> in one profile.",
      "stack.dev.title": "Development",
      "stack.product.title": "Product & process",
      "stack.tools.title": "Tools",

      "contact.eyebrow": "Next step",
      "contact.title": "Let's talk about <span class=\"accent-word\">software</span> that holds up in real operations.",
      "contact.mail": "Write an email",
      "contact.linkedin": "Open LinkedIn",

      "vita.eyebrow": "Resume",
      "vita.title": "A career between practice, responsibility and <span class=\"accent-word\">software</span>.",
      "vita.intro": "My professional journey began in hospitality and moved through purchasing, process responsibility and project work into software development. These stages are not a break in my story; they are the foundation.",
      "vita.timeline.eyebrow": "Stations",
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
      "vita.contact.title": "If the <span class=\"accent-word\">profile</span> fits, I would be happy to hear from you.",
      "vita.back": "Back home",

      "imprint.eyebrow": "Legal information",
      "imprint.title": "<span class=\"accent-word\">Legal Notice</span>",
      "imprint.owner": "Website owner",
      "imprint.contact": "Contact",
      "imprint.responsible": "Responsible for content",
      "imprint.note": "This page is a private portfolio homepage.",

      "privacy.eyebrow": "Privacy",
      "privacy.title": "<span class=\"accent-word\">Privacy Policy</span>",
      "privacy.intro": "This privacy policy explains which personal data may be processed when visiting this portfolio website.",
      "privacy.controller": "Controller",
      "privacy.access": "Access data",
      "privacy.access.text": "When this website is accessed, the hosting provider may process technically necessary access data such as IP address, date and time, browser type, operating system, referrer URL and requested files. This data is used to provide the website securely and reliably.",
      "privacy.contact": "Contact",
      "privacy.contact.text": "If you contact me by email, the submitted information is processed to handle the request. The data is not shared without consent.",
      "privacy.fonts": "Fonts and analytics",
      "privacy.fonts.text": "This website uses system fonts and currently does not use analytics, tracking scripts or cookies.",
      "privacy.links": "External links",
      "privacy.links.text": "This website links to external profiles, especially GitHub, LinkedIn and Instagram. When opening those links, the privacy policies of the respective providers apply.",
      "privacy.rights": "Your rights",
      "privacy.rights.text": "Within the scope of applicable law, you have rights to access, rectification, erasure, restriction of processing, data portability and objection to certain processing. You may also lodge a complaint with a competent supervisory authority.",
      "privacy.legal": "Legal bases",
      "privacy.legal.text": "Processing is based, where applicable, on Art. 6(1) GDPR, especially legitimate interest in providing a secure website and handling voluntary contact requests.",
      "privacy.note": "Note: This policy is intentionally lean. If tracking, forms or analytics are added, it should be legally reviewed and expanded before publication."
    }
  };

  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("primary-nav");
  const langToggle = document.getElementById("lang-toggle");
  const root = document.documentElement;
  const hero = document.querySelector(".hero");
  let scrollTicking = false;

  function sanitizeLang(lang) {
    const value = String(lang || "").toLowerCase();
    if (SUPPORTED_LANGS.includes(value)) return value;
    if (value.startsWith("en")) return "en";
    if (value.startsWith("de")) return "de";
    return DEFAULT_LANG;
  }

  function getStoredLang() {
    try {
      return localStorage.getItem("lang");
    } catch (error) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem("lang", lang);
    } catch (error) {
      // Storage can fail in strict privacy modes; the page still works.
    }
  }

  function getInitialLang() {
    const params = new URLSearchParams(window.location.search);
    return sanitizeLang(getStoredLang() || params.get("lang") || navigator.language || DEFAULT_LANG);
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
    if (langToggle) {
      langToggle.setAttribute("aria-label", lang === "de" ? "Sprache wechseln" : "Switch language");
    }
  }

  function setLang(lang) {
    const nextLang = sanitizeLang(lang);
    storeLang(nextLang);
    applyTranslations(nextLang);
  }

  function setNavOpen(open) {
    if (!navToggle || !navList) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
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
    langToggle.addEventListener("click", () => {
      const current = document.documentElement.dataset.lang || DEFAULT_LANG;
      setLang(current === "de" ? "en" : "de");
      setNavOpen(false);
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  function updateScrollState() {
    const y = window.scrollY || window.pageYOffset || 0;
    const heroHeight = hero ? Math.max(hero.offsetHeight, 1) : 1;
    const progress = Math.min(1, Math.max(0, y / heroHeight));
    root.style.setProperty("--hero-scroll", progress.toFixed(3));
    root.style.setProperty("--hero-shift-x", `${(-18 * progress).toFixed(2)}px`);
    root.style.setProperty("--hero-shift-y", `${(34 * progress).toFixed(2)}px`);
    root.style.setProperty("--hero-scale", (1.02 + 0.045 * progress).toFixed(4));
    root.style.setProperty("--hero-saturation", (1 - 0.08 * progress).toFixed(4));
    root.style.setProperty("--hero-brightness", (1 - 0.08 * progress).toFixed(4));
    root.dataset.scrolled = y > 24 ? "true" : "false";
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

  setLang(getInitialLang());
  updateScrollState();
})();
