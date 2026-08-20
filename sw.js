const CACHE = "mesaflow-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./v2.css",
  "./management.css",
  "./js/config.js",
  "./js/app.js",
  "./js/v2.js",
  "./js/management.js",
  "./assets/grao-icon.svg",
  "./manifest.webmanifest"
];
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request)));
});
