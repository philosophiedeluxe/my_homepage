export const SUPPORTED_LANGS = ["de", "en", "es", "ja"];
export const DEFAULT_LANG = "de";

const localeLoaders = {
  de: () => import("./locales/de.js?v=20260713-quality13"),
  en: () => import("./locales/en.js?v=20260713-quality13"),
  es: () => import("./locales/es.js?v=20260713-quality13"),
  ja: () => import("./locales/ja.js?v=20260713-quality13")
};

const localeCache = new Map();

export async function getLocale(language) {
  const lang = SUPPORTED_LANGS.includes(language) ? language : DEFAULT_LANG;
  if (!localeCache.has(lang)) {
    localeCache.set(lang, localeLoaders[lang]().then((module) => module.default));
  }
  return localeCache.get(lang);
}
