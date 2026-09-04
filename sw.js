const CACHE = 'calories-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Toujours chercher la dernière version de l'application
  // sur le réseau pour les fichiers HTML/JS/CSS.
  const isAppFile =
    e.request.destination === 'document' ||
    e.request.destination === 'script' ||
    e.request.destination === 'style';

  if (isAppFile) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => {
              cache.put(e.request, clone);
            });
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Pour les autres ressources : cache d'abord.
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => {
              cache.put(e.request, clone);
            });
          }
          return response;
        })
        .catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});
