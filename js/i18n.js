export const SUPPORTED_LANGS = ["de", "en", "es", "ja"];
export const DEFAULT_LANG = "de";

const localeLoaders = {
  de: () => import("./locales/de.js"),
  en: () => import("./locales/en.js"),
  es: () => import("./locales/es.js"),
  ja: () => import("./locales/ja.js")
};

const localeCache = new Map();

export async function getLocale(language) {
  const lang = SUPPORTED_LANGS.includes(language) ? language : DEFAULT_LANG;
  if (!localeCache.has(lang)) {
    localeCache.set(lang, localeLoaders[lang]().then((module) => module.default));
  }
  return localeCache.get(lang);
}
