// app.js – Nav: Mobile/Desktop, Offen/Zu, Scroll-Lock, Resilienz
(function () {
  const BREAKPOINT = 900; // px

  const header = document.querySelector("header");
  const nav    = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const list   = document.getElementById("primary-nav");
  if (!header || !nav || !toggle || !list) return;

  const mq = window.matchMedia(`(max-width:${BREAKPOINT}px)`);

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      list.dataset.open = "true";
      document.documentElement.classList.add("nav-open");
    } else {
      list.dataset.open = "false";
      document.documentElement.classList.remove("nav-open");
    }
  }

  function applyMode() {
    const mobile = mq.matches;
    header.classList.toggle("is-mobile", mobile);
    header.classList.toggle("is-desktop", !mobile);
    // beim Moduswechsel immer schließen
    setOpen(false);
  }

  // Init + reagieren auf Breakpoint/Orientation
  applyMode();
  (mq.addEventListener ? mq.addEventListener("change", applyMode)
                       : window.addEventListener("resize", applyMode));
  window.addEventListener("orientationchange", applyMode);

  // Toggle
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  // Outside click -> schließen (nur wenn offen)
  document.addEventListener("click", (e) => {
    if (list.dataset.open !== "true") return;
    if (!e.target.closest(".nav")) setOpen(false);
  });

  // ESC -> schließen
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { setOpen(false); toggle.focus(); }
  });

  // Link-Klick -> schließen (mobil)
  list.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
})();
