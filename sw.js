const CACHE_NAME = "neck-shoulder-pwa-v14";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=14",
  "./app.js?v=14",
  "./assets/exercises/chin-tuck.png",
  "./assets/exercises/upper-trap-stretch.png",
  "./assets/exercises/levator-scapulae-stretch.png",
  "./assets/exercises/doorway-pec-stretch.png",
  "./assets/exercises/cross-body-shoulder-stretch.png",
  "./assets/exercises/child-pose-lat-stretch.png",
  "./assets/exercises/cat-cow.png",
  "./assets/exercises/thread-the-needle.png",
  "./assets/exercises/chair-thoracic-extension.png",
  "./assets/exercises/wall-angels.png",
  "./assets/exercises/rest.png",
  "./manifest.webmanifest",
  "./assets/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});
