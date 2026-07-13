const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

function getActiveModal() {
  return document.querySelector(
    ".command-palette.is-visible [role='dialog'], .cert-lightbox[data-open='true'], [role='dialog'][aria-modal='true']:not([aria-hidden='true'])"
  );
}

function trapModalFocus(event) {
  if (event.key !== "Tab") return;
  const modal = getActiveModal();
  if (!modal) return;

  const targets = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((element) => !element.hasAttribute("inert") && element.getClientRects().length > 0);
  if (!targets.length) {
    event.preventDefault();
    modal.focus({ preventScroll: true });
    return;
  }

  const first = targets[0];
  const last = targets[targets.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
}

export function setupAccessibility() {
  const main = document.querySelector("main");
  if (main && !main.id) main.id = "main-content";

  if (main && !document.querySelector(".skip-link")) {
    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = `#${main.id}`;
    skipLink.textContent = "Zum Inhalt springen";
    document.body.prepend(skipLink);
  }

  document.addEventListener("keydown", (event) => {
    document.documentElement.classList.add("using-keyboard");
    trapModalFocus(event);
  });
  document.addEventListener("pointerdown", () => document.documentElement.classList.remove("using-keyboard"), { passive: true });
}
