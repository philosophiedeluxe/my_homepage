import { DEFAULT_LANG, SUPPORTED_LANGS, getLocale } from "./js/i18n.js?v=20260713-quality12";
import { setupProgressiveWebApp } from "./js/pwa.js?v=20260713-quality12";
import { setupDeveloperOperatingLayer } from "./js/recruiter-mode.js?v=20260713-quality12";
import { setupAccessibility } from "./js/accessibility.js?v=20260713-quality12";
import { scheduleNonCriticalWork, setupPerformanceGuards } from "./js/performance.js?v=20260713-quality12";

(async function () {
  const translations = {};
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
    es: { short: "ES", nativeName: "Español", nextLabel: "Siguiente idioma", switchLabel: "Cambiar idioma", currentLabel: "Actual" },
    ja: { short: "JP", nativeName: "日本語", nextLabel: "次の言語", switchLabel: "言語を切り替え", currentLabel: "現在" }
  };
  const CONSENT_STORAGE_KEY = "pk-cookie-consent";
  const CONSENT_VERSION = 1;
  const PWA_SERVICE_WORKER_URL = "./sw.js";
  const PORTFOLIO_BOOT_SESSION_KEY = "pk-portfolio-boot-seen";
  const FIRST_TIME_GUIDE_SESSION_KEY = "pk-first-time-guide-seen";
  const HERO_AVATAR_SESSION_KEY = "pk-iconic-avatar-hero";
  let scrollTicking = false;
  let lastScrolledState = null;
  let heroHeight = hero ? Math.max(hero.offsetHeight, 1) : 1;
  let lastHeroFrame = "";
  let languageTransformReady = false;
  let languageTransformTimer = null;
  let languageTransformFrame = null;
  const LANGUAGE_MORPH_DURATION = 2140;
  const LANGUAGE_MORPH_ELEMENT_STAGGER = 10;
  const LANGUAGE_MORPH_MAX_DELAY = 160;
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
    if (value.startsWith("es")) return "es";
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
    const currentDisplay = langToggle.querySelector("[data-lang-current]");
    if (currentDisplay) currentDisplay.textContent = currentMeta.short;

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
      es: { open: "Abrir menú", close: "Cerrar menú" },
      ja: { open: "メニューを開く", close: "メニューを閉じる" }
    };
    const dict = labels[lang] || labels.de;
    return open ? dict.close : dict.open;
  }

  function applyTranslations(lang, options = {}) {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    if (!options.deferText) {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (dict[key]) element.textContent = dict[key];
      });

      document.querySelectorAll("[data-i18n-rich]").forEach((element) => {
        const key = element.dataset.i18nRich;
        if (dict[key]) element.innerHTML = dict[key];
      });
    }

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

  async function ensureTranslations(lang) {
    const cleanLang = sanitizeLang(lang);
    if (!translations[cleanLang]) {
      try {
        translations[cleanLang] = await getLocale(cleanLang);
      } catch (error) {
        // Navigation and local HTML must remain usable when an optional locale is unavailable offline.
        translations[cleanLang] = translations[DEFAULT_LANG] || {};
      }
    }
    return translations[cleanLang];
  }

  function stripLanguageMarkup(value) {
    const container = document.createElement("div");
    container.innerHTML = String(value || "");
    return container.textContent || "";
  }

  function completeLanguageTransform(signal, toLang, onComplete) {
    applyTranslations(toLang);
    refreshAccentReflections(toLang);
    root.classList.remove("language-transform-active");
    signal?.classList.add("is-fading");
    languageTransformTimer = window.setTimeout(() => {
      signal?.remove();
    }, 260);
    if (typeof onComplete === "function") onComplete(toLang);
  }

  function playLanguageTransform(fromLang, toLang, onComplete) {
    const cleanFromLang = sanitizeLang(fromLang);
    const cleanToLang = sanitizeLang(toLang);

    if (reduceMotion.matches || cleanFromLang === cleanToLang) {
      applyTranslations(cleanToLang);
      refreshAccentReflections(cleanToLang);
      if (typeof onComplete === "function") onComplete(cleanToLang);
      return;
    }

    if (languageTransformFrame) {
      window.cancelAnimationFrame(languageTransformFrame);
      languageTransformFrame = null;
    }
    if (languageTransformTimer) {
      window.clearTimeout(languageTransformTimer);
      languageTransformTimer = null;
    }

    const existing = document.querySelector("[data-language-transform]");
    if (existing) existing.remove();

    const targets = visibleLanguageTargets(cleanFromLang, cleanToLang);
    const fromMeta = LANG_META[cleanFromLang] || LANG_META[DEFAULT_LANG];
    const toMeta = LANG_META[cleanToLang] || LANG_META[DEFAULT_LANG];

    const signal = document.createElement("div");
    signal.className = "language-transform-signal";
    signal.dataset.languageTransform = "true";
    signal.setAttribute("aria-hidden", "true");
    signal.innerHTML = `
      <span>LANGUAGE TRANSFORM</span>
      <b>${fromMeta.short} <i></i> ${toMeta.short}</b>
      <em>${toMeta.nativeName}</em>
    `;

    document.body.appendChild(signal);
    root.classList.add("language-transform-active");

    morphVisibleLanguageText(cleanToLang, targets, () => {
      completeLanguageTransform(signal, cleanToLang, onComplete);
    });

    if (typeof emitPortfolioCursorCode === "function") {
      emitPortfolioCursorCode(`L:${toMeta.short}`, 900, "is-dev-lang-code");
    }
  }

  function visibleLanguageTargets(fromLang, toLang) {
    const fromDict = translations[fromLang] || translations[DEFAULT_LANG];
    const toDict = translations[toLang] || translations[DEFAULT_LANG];
    const selectors = [
      "[data-i18n]",
      "[data-i18n-rich]"
    ];

    return [...document.querySelectorAll(selectors.join(","))]
      .filter((element) => {
        if (element.closest(".print-resume-document")) return false;
        if (element.closest(".language-toggle")) return false;
        if (element.closest("[data-language-transform]")) return false;
        if (element.closest("[data-language-static]")) return false;
        if (element.closest(".tech-stream, .tech-stream__track, .tech-stream__group")) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight;
      })
      .slice(0, 42)
      .map((element, index) => {
        const isRich = Boolean(element.dataset.i18nRich);
        const key = isRich ? element.dataset.i18nRich : element.dataset.i18n;
        const sourceValue = isRich ? stripLanguageMarkup(fromDict[key]) : fromDict[key];
        const targetValue = toDict[key];
        const source = String(sourceValue || element.textContent || "");
        const target = String(isRich ? stripLanguageMarkup(targetValue) : targetValue || "");
        return {
          element,
          key,
          isRich,
          targetMarkup: targetValue,
          source,
          target,
          delay: Math.min(index * LANGUAGE_MORPH_ELEMENT_STAGGER, LANGUAGE_MORPH_MAX_DELAY)
        };
      })
      .filter((entry) => entry.target && entry.source !== entry.target);
  }

  function transformLanguageText(source, target, progress, seed = 0) {
    const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const sourceChars = [...String(source || "")];
    const targetChars = [...String(target || "")];
    const length = Math.max(sourceChars.length, targetChars.length, 1);
    const safeProgress = Math.min(Math.max(progress, 0), 1);
    const glyphTick = Math.floor(safeProgress * 11);
    const output = [];

    for (let index = 0; index < length; index += 1) {
      const fromChar = sourceChars[index] || "";
      const toChar = targetChars[index] || "";
      const position = length <= 1 ? 0 : index / (length - 1);
      const charStart = 0.01 + position * 0.34;
      const charDuration = 0.58;
      const local = Math.min(Math.max((safeProgress - charStart) / charDuration, 0), 1);
      const targetIsPunctuation = /[.,:;!?·()&/|]/.test(toChar);
      const sourceIsSpace = /\s/.test(fromChar);
      const targetIsSpace = /\s/.test(toChar || fromChar);
      const glyph = glyphs[(index * 5 + seed * 11 + glyphTick) % glyphs.length];

      if (local <= 0) {
        output.push(fromChar || toChar);
        continue;
      }

      if (sourceIsSpace && targetIsSpace) {
        output.push(" ");
        continue;
      }

      if (targetIsPunctuation && local > 0.54) {
        output.push(toChar);
        continue;
      }

      if (local < 0.24) {
        output.push((index + glyphTick + seed) % 4 === 0 ? glyph : (fromChar || glyph));
        continue;
      }

      if (local < 0.56) {
        output.push(glyph);
        continue;
      }

      if (local < 0.78 && toChar && !/\s/.test(toChar) && !targetIsPunctuation) {
        output.push((index + glyphTick + seed) % 5 === 0 ? glyph : toChar);
        continue;
      }

      output.push(toChar);
    }

    return output.join("").replace(/[ 	]{2,}/g, " ").trimEnd();
  }

  function easeLanguageProgress(value) {
    return Math.min(Math.max(value, 0), 1);
  }

  function morphVisibleLanguageText(lang, targets, onComplete) {
    const cleanLang = sanitizeLang(lang);
    const started = performance.now();
    const duration = LANGUAGE_MORPH_DURATION;

    targets.forEach(({ element }) => {
      element.classList.add("language-morphing-text");
    });

    function frame(now) {
      const elapsed = now - started;
      let done = true;

      targets.forEach((entry, index) => {
        const rawLocal = Math.min(Math.max((elapsed - entry.delay) / duration, 0), 1);
        const local = easeLanguageProgress(rawLocal);
        if (local < 1) done = false;

        if (local < 0.92) {
          entry.element.textContent = transformLanguageText(entry.source, entry.target, local, index);
        } else if (entry.isRich) {
          entry.element.innerHTML = entry.targetMarkup;
        } else {
          entry.element.textContent = entry.target;
        }
      });

      if (!done) {
        languageTransformFrame = window.requestAnimationFrame(frame);
        return;
      }

      targets.forEach(({ element }) => {
        element.classList.remove("language-morphing-text");
      });
      languageTransformFrame = null;
      if (typeof onComplete === "function") onComplete(cleanLang);
    }

    languageTransformFrame = window.requestAnimationFrame(frame);
  }

  function refreshAccentReflections(lang) {
    document.querySelectorAll(".accent-word").forEach((word) => {
      const accentText = word.textContent.trim().toLocaleLowerCase(lang);
      const isSoftware = accentText === "software" || accentText === "ソフトウェア";
      if (isSoftware && (document.body.classList.contains("vita-page") || document.querySelector(".hero"))) {
        word.dataset.reflection = word.textContent;
      } else {
        delete word.dataset.reflection;
      }
    });
  }

  async function setLang(lang, updateUrl = false) {
    const nextLang = sanitizeLang(lang);
    const previousLang = sanitizeLang(document.documentElement.dataset.lang || DEFAULT_LANG);
    const shouldAnimateLanguage = languageTransformReady && nextLang !== previousLang;

    await ensureTranslations(nextLang);
    await ensureTranslations(previousLang);

    const finishLanguageChange = (finishedLang) => {
      const cleanFinishedLang = sanitizeLang(finishedLang);
      if (updateUrl) updateLangUrl(cleanFinishedLang);
      document.dispatchEvent(new CustomEvent("pk:lang-change", { detail: { lang: cleanFinishedLang } }));
    };

    storeLang(nextLang);
    if (shouldAnimateLanguage) {
      playLanguageTransform(previousLang, nextLang, finishLanguageChange);
    } else {
      applyTranslations(nextLang);
      refreshAccentReflections(nextLang);
      finishLanguageChange(nextLang);
    }

    languageTransformReady = true;
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
    let contextFrame = 0;
    let nextX = -80;
    let nextY = -80;
    let pointerX = -80;
    let pointerY = -80;
    let pointerTarget = null;
    let firefoxTextModeUntil = 0;
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
      pointerTarget = null;
      firefoxTextModeUntil = 0;
      if (contextFrame) window.cancelAnimationFrame(contextFrame);
      contextFrame = 0;
      window.clearTimeout(idleTimer);
      if (!forcedCodeTimer) setCursorCode("</>");
    }

    function updateCursorContext() {
      contextFrame = 0;
      if (!pointerTarget) return;
      const targetElement = elementFromEventTarget(pointerTarget);
      const textControl = targetElement?.closest(textControlSelector);
      const actionElement = textControl ? null : targetElement?.closest(actionSelector);
      let detectedTextInfo = textControl
        ? { isText: true, keyword: "", keywordClass: "" }
        : textInfoAtPoint(pointerX, pointerY, pointerTarget);
      const now = performance.now();
      if (isFirefox && detectedTextInfo.isText) {
        firefoxTextModeUntil = now + 96;
      } else if (isFirefox && !actionElement && now < firefoxTextModeUntil) {
        detectedTextInfo = { ...detectedTextInfo, isText: true };
      }
      const textInfo = actionElement
        ? { ...detectedTextInfo, isText: false }
        : detectedTextInfo;

      currentKeyword = textInfo.keyword;
      currentKeywordClass = textInfo.keywordClass || "";
      nextX = pointerX - (textInfo.isText ? 7 : 3);
      nextY = pointerY - (textInfo.isText ? 15 : 2);
      cursor.classList.toggle("is-action", Boolean(actionElement));
      cursor.classList.toggle("is-text", Boolean(textInfo.isText));
      cursor.classList.toggle("is-keyword", Boolean(currentKeyword) && !forcedCodeTimer && !cursor.classList.contains("is-idle"));
      if (!forcedCodeTimer && !cursor.classList.contains("is-idle")) {
        setCursorCode(currentKeyword || "</>", currentKeyword ? currentKeywordClass || "is-keyword" : "");
      }
      resetIdleTimer();
      if (!frame) frame = window.requestAnimationFrame(renderCursor);
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

      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerTarget = event.target;
      nextX = pointerX - 3;
      nextY = pointerY - 2;
      cursor.classList.add("is-visible");
      if (!frame) frame = window.requestAnimationFrame(renderCursor);
      if (!contextFrame) contextFrame = window.requestAnimationFrame(updateCursorContext);
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
      ".vita-decision-console",
      ".skill-evolution-node",
      ".trust-chain-panel",
      ".profile-fit-matrix",
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
    let languagePointerCloseTimer = null;
    const keepLanguageMenuOpen = () => {
      window.clearTimeout(languagePointerCloseTimer);
      langToggle.classList.add("is-pointer-open");
    };
    const releaseLanguageMenuOpen = () => {
      window.clearTimeout(languagePointerCloseTimer);
      languagePointerCloseTimer = window.setTimeout(() => {
        langToggle.classList.remove("is-pointer-open");
      }, 160);
    };

    langToggle.addEventListener("pointerenter", keepLanguageMenuOpen);
    langToggle.addEventListener("pointerleave", releaseLanguageMenuOpen);
    langToggle.addEventListener("focusin", keepLanguageMenuOpen);
    langToggle.addEventListener("focusout", releaseLanguageMenuOpen);

    langToggle.addEventListener("click", async (event) => {
      const option = event.target.closest("[data-lang-option]");
      if (!option || !langToggle.contains(option)) return;
      const selectedLang = sanitizeLang(option.dataset.langOption);
      if (selectedLang === (document.documentElement.dataset.lang || DEFAULT_LANG)) return;
      await setLang(selectedLang, true);
      langToggle.classList.remove("is-pointer-open");
      langToggle.blur();
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
    addReveal(".system-profile-panel, .stack-console, .skill-graph, .vita-decision-console, .profile-fit-row, .trust-chain-panel, .certificate-header > div", "up");
    addReveal(".section-heading, .page-hero > *, .legal-page > section, .legal-page > .legal-note", "up");
    addReveal(".project-card, .stack-grid article, .profile-grid article, .skill-evolution-node, .trust-chain-steps span, .timeline-skills li, .timeline-playback, .timeline-item, .credential-list li, .oracle-badge-card, .proof-card", "up", true);

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

  function setupHeroAvatarEgg() {
    const avatarSources = {
      src: "./image/iconic-avatar-960.jpg?v=20260710-pwaapp14",
      srcset: "./image/iconic-avatar-720.jpg?v=20260710-pwaapp14 720w, ./image/iconic-avatar-960.jpg?v=20260710-pwaapp14 960w",
      alt: "Stilisiertes Hero-Portrait mit Iconic Avatar"
    };

    const originalSources = heroImage ? {
      src: heroImage.getAttribute("src") || "",
      srcset: heroImage.getAttribute("srcset") || "",
      alt: heroImage.getAttribute("alt") || ""
    } : null;

    function readState() {
      try {
        return sessionStorage.getItem(HERO_AVATAR_SESSION_KEY) === "1";
      } catch (error) {
        return false;
      }
    }

    function writeState(active) {
      try {
        sessionStorage.setItem(HERO_AVATAR_SESSION_KEY, active ? "1" : "0");
      } catch (error) {
        // Session storage can be unavailable in hardened browser contexts.
      }
    }

    function setHeroAvatar(active, announce = false) {
      writeState(active);
      root.classList.toggle("iconic-avatar-active", active);

      if (!heroImage || !originalSources) {
        if (active && announce) window.location.href = `${localizedPageHref("./index.html")}#profil`;
        return;
      }

      if (announce) {
        heroImage.classList.remove("is-hero-avatar-switching");
        root.classList.remove("iconic-avatar-boot");
        window.requestAnimationFrame(() => heroImage.classList.add("is-hero-avatar-switching"));
        window.requestAnimationFrame(() => root.classList.add("iconic-avatar-boot"));
      }

      if (active) {
        heroImage.setAttribute("src", avatarSources.src);
        heroImage.setAttribute("srcset", avatarSources.srcset);
        heroImage.setAttribute("alt", avatarSources.alt);
      } else {
        heroImage.setAttribute("src", originalSources.src);
        heroImage.setAttribute("srcset", originalSources.srcset);
        heroImage.setAttribute("alt", originalSources.alt);
      }

      if (announce) {
        window.setTimeout(() => {
          heroImage.classList.remove("is-hero-avatar-switching");
          root.classList.remove("iconic-avatar-boot");
        }, 1180);
      }
      if (announce) emitPortfolioCursorCode(active ? "ICONIC" : "HERO", 1500, "is-dev-signal");
    }

    document.addEventListener("pk:toggle-iconic-avatar", () => setHeroAvatar(!readState(), true));
    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      const isShortcut = (event.ctrlKey || event.metaKey) && event.altKey && key === "i";
      if (!isShortcut) return;
      if (event.target?.closest?.("input, textarea, select, [contenteditable=''], [contenteditable='true'], [role='textbox']")) return;
      event.preventDefault();
      setHeroAvatar(!readState(), true);
    });

    setHeroAvatar(readState(), false);
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
        context: "ctrl + rechtsklick entsperrt das Kontextmenü",
        mobile: "hint: Menü und Signal Index halten die versteckten Routen",
        close: "Hinweis schließen"
      },
      en: {
        title: "signal hint",
        command: "hint: press Ctrl + K for commands",
        context: "ctrl + right click unlocks the context menu",
        mobile: "hint: menu and Signal Index hold the hidden routes",
        close: "Close hint"
      },
      es: {
        title: "signal hint",
        command: "hint: pulsa Ctrl + K para comandos",
        context: "ctrl + clic derecho desbloquea el menú contextual",
        mobile: "hint: menú y Signal Index contienen rutas ocultas",
        close: "Cerrar pista"
      },
      ja: {
        title: "signal hint",
        command: "hint: Ctrl + K でコマンド",
        context: "ctrl + right click でcontext menu",
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
        github: ["GitHub", "Repo öffnen"],
        avatar: ["Avatar Hero", "Session-Toggle"],
        runtime: ["App Runtime", "PWA Dashboard"]
      },
      en: {
        title: "PK_CURSOR_MENU",
        console: ["Dev Console", "Toggle panel"],
        copy: ["Copy Link", "Share route"],
        print: ["Print Resume", "PDF/print"],
        mail: ["Mail Phil", "Contact"],
        github: ["GitHub", "Open repo"],
        avatar: ["Avatar Hero", "Session toggle"],
        runtime: ["App Runtime", "PWA dashboard"]
      },
      es: {
        title: "PK_CURSOR_MENU",
        console: ["Dev Console", "Cambiar panel"],
        copy: ["Copiar enlace", "Compartir ruta"],
        print: ["Imprimir Vita", "PDF/print"],
        mail: ["Mail a Phil", "Contacto"],
        github: ["GitHub", "Abrir repo"],
        avatar: ["Avatar Hero", "Toggle sesión"],
        runtime: ["App Runtime", "PWA dashboard"]
      },
      ja: {
        title: "PK_CURSOR_MENU",
        console: ["Dev Console", "パネル切替"],
        copy: ["リンクコピー", "ルート共有"],
        print: ["経歴を印刷", "PDF/印刷"],
        mail: ["メール", "連絡"],
        github: ["GitHub", "リポジトリ"],
        avatar: ["Avatar Hero", "Session切替"],
        runtime: ["App Runtime", "PWA dashboard"]
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
      <button type="button" data-cursor-command="avatar">
        <span>06</span><b></b><em></em>
      </button>
      <button type="button" data-cursor-command="runtime">
        <span>07</span><b></b><em></em>
      </button>
    `;
    document.body.appendChild(contextMenu);

    const closeButton = consolePanel.querySelector(".secret-dev-console__close");
    let consoleVisible = false;
    let contextVisible = false;
    let contextPointerOpenedAt = 0;

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
      if (!finePointer.matches) return;
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

    function isCursorContextTrigger(event) {
      return event.ctrlKey && !event.target?.closest?.(typingSelector);
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
        return;
      }

      if (command === "avatar") {
        document.dispatchEvent(new CustomEvent("pk:toggle-iconic-avatar"));
        return;
      }

      if (command === "runtime") {
        document.dispatchEvent(new CustomEvent("pk:pwa-runtime-open"));
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (event.button !== 2 || !isCursorContextTrigger(event)) return;
      contextPointerOpenedAt = Date.now();
      event.__pkContextMenuOpened = true;
      openContextMenu(event);
    }, { capture: true });

    document.addEventListener("contextmenu", (event) => {
      if (!isCursorContextTrigger(event)) return;
      if (Date.now() - contextPointerOpenedAt < 700) {
        event.preventDefault();
        return;
      }
      openContextMenu(event);
    });

    document.addEventListener("pointerdown", (event) => {
      if (event.__pkContextMenuOpened) return;
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
        ".vita-decision-console",
        ".profile-fit-row",
        ".skill-evolution-node",
        ".trust-chain-panel",
        ".trust-chain-steps span",
        ".timeline-skills > li",
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
  setupAccessibility();
  setupPerformanceGuards();
  await setLang(getInitialLang());
  setupHeroCursor();
  setupPortfolioStartup(shouldRunPortfolioBoot);
  setupHeroAvatarEgg();
  setupProgressiveWebApp({ root, finePointer, defaultLang: DEFAULT_LANG, localizedPageHref, serviceWorkerUrl: PWA_SERVICE_WORKER_URL });
  setupFirstTimeGuide(shouldRunPortfolioBoot);
  setupTiltCards();
  setupActiveNavigation();
  scheduleNonCriticalWork(() => {
    if (reduceMotion.matches) return;
    setupTechStream();
    setupSignalCanvas();
    setupSignalFlicker();
  });
  setupSecretDevConsole();
  setupSignalManualAccess();
  setupDeveloperOperatingLayer({
    root,
    defaultLang: DEFAULT_LANG,
    translations,
    reduceMotion,
    localizedPageHref,
    printVita,
    emitCursorCode: emitPortfolioCursorCode
  });
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
