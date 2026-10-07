// Service worker: permet fer servir Inclusia sense connexió.
// Estratègia "network first": sempre la versió més nova si hi ha xarxa; la memòria cau si no n'hi ha.
// Incrementa VERSION quan canviï la llista de fitxers.

const VERSION = 'v2';
const CACHE = `inclusia-${VERSION}`;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/styles.css',
  './assets/js/main.js',
  './assets/js/builder.js',
  './assets/js/io.js',
  './assets/js/placeholders.js',
  './assets/js/store.js',
  './assets/js/data/builder-blocks.js',
  './assets/js/data/digital.js',
  './assets/js/data/prompts.js',
  './assets/js/data/taxonomy.js',
  './assets/fonts/atkinson-hyperlegible-next.woff2',
  './assets/icons/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('inclusia-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => (await caches.match(request, { ignoreSearch: true })) ?? caches.match('./index.html')),
  );
});
