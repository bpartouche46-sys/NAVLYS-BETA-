/**
 * NAVLYS — Service Worker (scope racine)
 *
 * Rend NAVLYS installable comme une appli mobile et ouvrable même hors réseau.
 *   - Shell (pages, logo, moteur vivant) → cache-first
 *   - Images                            → stale-while-revalidate
 *   - Installation résiliente : un fichier manquant ne casse pas l'install.
 */

const VERSION = 'navlys-v1.0.0';
const SHELL_CACHE = `${VERSION}-shell`;
const IMG_CACHE = `${VERSION}-img`;

const SHELL_FILES = [
  '/',
  '/cinema',
  '/finance',
  '/next-gen',
  '/assistance',
  '/navlys-alive.js',
  '/media/navlys_coin_animated.svg',
  '/media/navlys_favicon.svg',
  '/media/icon-192.svg',
  '/media/icon-512.svg',
];

// --- Installation : on précharge le shell (chaque fichier indépendamment) ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.all(
        SHELL_FILES.map((f) =>
          cache.add(f).catch(() => null) // un 404 ne doit pas tout casser
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// --- Activation : nettoyage des anciens caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// --- Routing ---
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // On ne gère que notre propre origine (les API Supabase restent en réseau direct)
  if (url.origin !== self.location.origin) return;

  if (event.request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(event.request, IMG_CACHE));
    return;
  }
  event.respondWith(cacheFirst(event.request, SHELL_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (_err) {
    return new Response('Hors mer — réseau indisponible.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  const networkFetch = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(cacheName).then((cache) => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached);
  return cached || networkFetch;
}

// --- Push : notification (ex. le cap du jour à 9 h) ---
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'NAVLYS';
  const options = {
    body: data.body || 'Ton cap du jour est posé.',
    icon: '/media/icon-192.svg',
    badge: '/media/icon-192.svg',
    tag: 'navlys',
    data: { url: data.url || '/' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      for (const c of clients) {
        if (c.url.includes(target) && 'focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
      return null;
    })
  );
});
