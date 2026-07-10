export function scheduleNonCriticalWork(callback) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }
  window.setTimeout(callback, 160);
}

export function setupPerformanceGuards() {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncMotionPreference = () => {
    root.dataset.reducedMotion = reducedMotion.matches ? "true" : "false";
    document.dispatchEvent(new CustomEvent("pk:motion-preference-change", { detail: { reduced: reducedMotion.matches } }));
  };
  syncMotionPreference();
  reducedMotion.addEventListener?.("change", syncMotionPreference);

  const syncVisibility = () => {
    root.dataset.pageVisible = document.hidden ? "false" : "true";
    document.dispatchEvent(new CustomEvent("pk:visibility-change", { detail: { visible: !document.hidden } }));
  };
  syncVisibility();
  document.addEventListener("visibilitychange", syncVisibility, { passive: true });

  document.querySelectorAll("img:not([loading])").forEach((image) => {
    if (image.closest(".hero, .brand-mark")) return;
    image.loading = "lazy";
    image.decoding = "async";
  });
}
