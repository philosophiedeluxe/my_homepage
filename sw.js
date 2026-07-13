const PK_PORTFOLIO_CACHE = "pk-portfolio-cache-20260713-quality7";
const PK_PORTFOLIO_OFFLINE_URL = "./offline.html";

const PRECACHE_ASSETS = [
  "./",
  "./index.html",
  "./vita.html",
  "./signals.html",
  "./impressum.html",
  "./datenschutz.html",
  "./404.html",
  PK_PORTFOLIO_OFFLINE_URL,
  "./style.css?v=20260713-quality7",
  "./styles/base.css?v=20260713-quality7",
  "./styles/components.css?v=20260713-quality7",
  "./styles/features.css?v=20260713-quality7",
  "./styles/responsive-print.css?v=20260713-quality7",
  "./app.js?v=20260713-quality7",
  "./js/i18n.js?v=20260713-quality7",
  "./js/pwa.js?v=20260713-quality7",
  "./js/recruiter-mode.js?v=20260713-quality7",
  "./js/accessibility.js?v=20260713-quality7",
  "./js/performance.js?v=20260713-quality7",
  "./js/locales/de.js?v=20260713-quality7",
  "./manifest.webmanifest?v=20260710-pwaapp14",
  "./image/pwa/favicon-32.png?v=20260710-pwaapp14",
  "./image/pwa/favicon-48.png?v=20260710-pwaapp14",
  "./image/profile-avatar.jpg?v=20260710-pwaapp14",
  "./image/iconic-720.jpg?v=20260616-1",
  "./image/iconic-960.jpg?v=20260616-1",
  "./image/iconic.jpg?v=20260616-1",
  "./image/iconic-avatar-720.jpg?v=20260710-pwaapp14",
  "./image/iconic-avatar-960.jpg?v=20260710-pwaapp14",
  "./image/social-card.jpg?v=20260710-pwaapp14",
  "./image/no_signal.jpg?v=20260616-1",
  "./image/pwa/icon-192.png?v=20260710-pwaapp14",
  "./image/pwa/icon-512.png?v=20260710-pwaapp14",
  "./image/pwa/maskable-192.png?v=20260710-pwaapp14",
  "./image/pwa/maskable-512.png?v=20260710-pwaapp14",
  "./image/pwa/apple-touch-icon.png?v=20260710-pwaapp14",
  "./image/Cert/1689164479048.jpg",
  "./image/Cert/1691131621481.jpg",
  "./image/Cert/1691131621482.jpg",
  "./image/Cert/1693824977797.jpg",
  "./image/Cert/1694604154051.jpg",
  "./image/Cert/badges/APEX24CDOCP.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PK_PORTFOLIO_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== PK_PORTFOLIO_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

function isNavigationRequest(request) {
  return request.mode === "navigate" || (
    request.method === "GET" &&
    request.headers.get("accept")?.includes("text/html")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(PK_PORTFOLIO_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(PK_PORTFOLIO_OFFLINE_URL)))
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cached) => cached || fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(PK_PORTFOLIO_CACHE).then((cache) => cache.put(request, copy));
        return response;
      }))
      .catch(() => Response.error())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
