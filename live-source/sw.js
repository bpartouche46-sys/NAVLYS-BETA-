/**
 * NAVLYS — Service Worker (scope racine)
 *
 * Rend NAVLYS installable et ouvrable hors réseau, SANS jamais figer le code.
 *   - Pages (navigations) + JS  → NETWORK-FIRST (toujours frais ; cache = secours hors-ligne)
 *   - Images / médias           → stale-while-revalidate
 *   - Installation résiliente : un fichier manquant ne casse pas l'install.
 *
 * ⚠️ Leçon gravée (2026-07-01) : un cache-first sur navlys-alive.js figeait
 * l'ancien code sur les téléphones → les correctifs n'arrivaient jamais.
 * Bump de VERSION à chaque changement = purge immédiate des vieux caches.
 */

const VERSION = 'navlys-v1.3.4';
const SHELL_CACHE = `${VERSION}-shell`;
const IMG_CACHE = `${VERSION}-img`;

const SHELL_FILES = [
  '/',
  '/adhesion',
  '/profil',
  '/idee',
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

// --- Installation : préchargement du shell (chaque fichier indépendamment) ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.all(SHELL_FILES.map((f) => cache.add(f).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

// --- Activation : purge de TOUS les caches d'une autre version ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// --- Routing ---
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // On ne gère que notre propre origine (les API Supabase restent en réseau direct)
  if (url.origin !== self.location.origin) return;

  const isDoc = event.request.mode === 'navigate' || event.request.destination === 'document';
  const isScript = event.request.destination === 'script' || url.pathname.endsWith('.js');

  // Code & pages : toujours frais → network-first (cache = secours hors-ligne)
  if (isDoc || isScript) {
    event.respondWith(networkFirst(event.request, SHELL_CACHE));
    return;
  }
  // Images / médias : rapides → stale-while-revalidate
  if (event.request.destination === 'image' || url.pathname.startsWith('/media/')) {
    event.respondWith(staleWhileRevalidate(event.request, IMG_CACHE));
    return;
  }
  // Reste : network-first prudent
  event.respondWith(networkFirst(event.request, SHELL_CACHE));
});

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (_err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Hors mer — réseau indisponible.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  const networkFetch = fetch(request).then((response) => {
    if (response && response.ok) {
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
