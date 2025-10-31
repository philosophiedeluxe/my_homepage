// nav.js – steuert Mobile/Desktop, Offen/Zu, und "scrolled"
(function () {
  const BREAKPOINT = 900; // px

  // Jahr im Footer (falls vorhanden)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.querySelector("header");
  const nav    = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const list   = document.getElementById("primary-nav");
  if (!header || !nav || !toggle || !list) return;

  const mq = window.matchMedia(`(max-width:${BREAKPOINT}px)`);

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    list.dataset.open = open ? "true" : "false";
  }

  function applyMode() {
    const mobile = mq.matches;
    header.classList.toggle("is-mobile", mobile);
    header.classList.toggle("is-desktop", !mobile);
    // bei Moduswechsel immer schließen, damit kein „hängender“ Zustand bleibt
    setOpen(false);
  }

  // Init + reagieren auf Breakpoint-Wechsel
  applyMode();
  if (mq.addEventListener) mq.addEventListener("change", applyMode);
  else window.addEventListener("resize", applyMode); // Fallback

  // Toggle-Button
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  // Klick außerhalb schließt
  document.addEventListener("click", (e) => {
    if (list.dataset.open !== "true") return;
    if (!e.target.closest(".nav")) setOpen(false);
  });

  // ESC schließt
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Link-Klick schließt (nur mobil relevant)
  list.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  // Header leicht „verdichten“, wenn gescrolled
  let ticking = false;
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
})();
