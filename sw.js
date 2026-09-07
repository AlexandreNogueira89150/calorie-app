const CACHE = 'calories-v4';

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

  // On laisse le nouveau SW attendre :
  // l'application affichera un popup à l'utilisateur.
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE)
          .map(k => caches.delete(k))
      )
    )
  );

  self.clients.claim();
});

// Message envoyé par index.html quand l'utilisateur clique
// sur "Mettre à jour".
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const isAppFile =
    e.request.destination === 'document' ||
    e.request.destination === 'script' ||
    e.request.destination === 'style';

  if (isAppFile) {
    // Pour l'application : réseau en priorité.
    // Cela évite de rester bloqué sur une vieille version.
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

  // Pour les autres ressources : cache en priorité.
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request))
  );
});
