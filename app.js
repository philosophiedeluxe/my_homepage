// app.js – Jahr + leichte Header-Komprimierung, KEIN Burger mehr
(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const header = document.querySelector("header");
  if (!header) return;

  // Optik beim Scrollen (kannst du weglassen, wenn du willst)
  let ticking = false;
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
})();
