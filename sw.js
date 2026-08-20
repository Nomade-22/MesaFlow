const CACHE='mesaflow-v6';
const ASSETS=['./','./index.html','./styles.css?v=6','./js/config.js?v=6','./js/boot-v6.js?v=6','./v6.css.gz.b64?v=6','./js/app-v6.js.gz.b64?v=6','./manifest.webmanifest','./assets/grao-logo.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();if(new URL(e.request.url).origin===location.origin)caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});
