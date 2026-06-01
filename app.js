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
      "nav.linkedin": "LinkedIn",
      "nav.imprint": "Impressum",
      "nav.privacy": "Datenschutz",

      "hero.eyebrow": "Softwareentwickler aus Freising",
      "hero.title": "Ich baue <span class=\"accent-word\">Software</span>, die Prozesse nicht nur digitalisiert, sondern <span class=\"accent-word\">antreibt</span>.",
      "hero.text": "Ich komme aus operativer Verantwortung: Einkauf, Prozesse und Teams kenne ich aus der Praxis. Heute entwickle ich Anwendungen mit Oracle APEX, PL/SQL, JavaScript und Java. Diese Mischung ist mein Vorteil: Technik, die nicht nur läuft, sondern im Alltag Wirkung zeigt.",
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
      "project.apex.title": "Oracle-nahe Anwendungsentwicklung",
      "project.apex.text": "Fokus auf Oberflächen, Datenmodelle und Abläufe rund um Oracle APEX, PL/SQL, REST Data Sources und strukturierte Datenhaltung.",
      "project.java.title": "Java, SQL und saubere Grundarchitektur",
      "project.java.text": "Ausbildung und Praxis mit Java, SQL, Spring Boot, MVC, Vaadin, Git, Jira, Confluence und modellgetriebener Softwareentwicklung.",

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

      "vita.eyebrow": "Vita",
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

      "nav.profile": "Profile",
      "nav.projects": "Projects",
      "nav.stack": "Stack",
      "nav.vita": "Resume",
      "nav.linkedin": "LinkedIn",
      "nav.imprint": "Legal Notice",
      "nav.privacy": "Privacy",

      "hero.eyebrow": "Software developer from Freising",
      "hero.title": "I build <span class=\"accent-word\">software</span> that does not just digitize work. It <span class=\"accent-word\">drives</span> it.",
      "hero.text": "I come from operational responsibility: I know purchasing, processes and teams from hands-on work. Today I build applications with Oracle APEX, PL/SQL, JavaScript and Java. That mix is my edge: technology that does not just run, but creates impact in daily work.",
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
      "project.apex.title": "Oracle-centered application development",
      "project.apex.text": "Focus on interfaces, data models and workflows around Oracle APEX, PL/SQL, REST Data Sources and structured data management.",
      "project.java.title": "Java, SQL and clean fundamentals",
      "project.java.text": "Training and practice with Java, SQL, Spring Boot, MVC, Vaadin, Git, Jira, Confluence and model-driven software development.",

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

      "vita.eyebrow": "Resume",
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
    }
  };

  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("primary-nav");
  const langToggle = document.getElementById("lang-toggle");
  const root = document.documentElement;
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-visual img");
  const heroScrollDim = document.querySelector(".hero-scroll-dim");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isFirefox = navigator.userAgent.includes("Firefox");
  const supportsScrollTimeline = CSS.supports("animation-timeline: scroll()");
  const LANG_STORAGE_KEY = "lang";
  const CONSENT_STORAGE_KEY = "pk-cookie-consent";
  const CONSENT_VERSION = 1;
  let scrollTicking = false;
  let lastScrolledState = null;
  let heroHeight = hero ? Math.max(hero.offsetHeight, 1) : 1;
  let lastHeroFrame = "";

  function sanitizeLang(lang) {
    const value = String(lang || "").toLowerCase();
    if (SUPPORTED_LANGS.includes(value)) return value;
    if (value.startsWith("en")) return "en";
    if (value.startsWith("de")) return "de";
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

  function setLang(lang, updateUrl = false) {
    const nextLang = sanitizeLang(lang);
    storeLang(nextLang);
    applyTranslations(nextLang);
    if (updateUrl) updateLangUrl(nextLang);
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
      setLang(current === "de" ? "en" : "de", true);
      setNavOpen(false);
    });
  }

  document.querySelectorAll("[data-print-vita]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const lang = document.documentElement.dataset.lang || DEFAULT_LANG;
      const previousTitle = document.title;
      document.title = lang === "en" ? "Phil_Kirchner_Resume" : "Phil_Kirchner_Vita";
      window.print();
      window.setTimeout(() => {
        document.title = previousTitle;
      }, 250);
    });
  });

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

    if (heroImage && !supportsScrollTimeline) {
      const frame = progress.toFixed(isFirefox ? 2 : 3);
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
    addReveal(".split-section .text-stack, .contact-actions", "right");
    addReveal(".section-heading, .page-hero > *, .legal-page > section, .legal-page > .legal-note", "up");
    addReveal(".project-card, .stack-grid article, .profile-grid article, .timeline-item, .credential-list li, .oracle-badge-card, .proof-card", "up", true);

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    document.querySelectorAll(".reveal-item").forEach((element) => observer.observe(element));
  }
 
  addCookieSettingsLink();
  setupCertificateLightbox();
  setLang(getInitialLang());
  window.addEventListener("resize", measureHero, { passive: true });
  window.addEventListener("orientationchange", measureHero, { passive: true });
  if (hero && "ResizeObserver" in window) {
    new ResizeObserver(measureHero).observe(hero);
  }
  updateScrollState();
  setupScrollReveals();
  openCookieBanner();
})();
