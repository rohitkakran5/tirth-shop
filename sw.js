// VastraPOS offline cache.
// - The app page is fetched fresh when online (so new versions show up), and from the cache when
//   offline or when the network is too slow (after 3 seconds).
// - Other app files are served from the cache and refreshed in the background.
// - Firebase, Google sign-in and every non-GET request are never touched by this worker.
const CACHE = 'vastrapos-v5';
const CORE = [
  './', './index.html', './manifest.json', './firebase.js',
  './lib/qrcode.min.js', './lib/JsBarcode.all.min.js', './lib/html5-qrcode.min.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function saveCopy(request, response) {
  if (response && response.ok && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE).then((c) => c.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isPage = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html');
  if (isPage) {
    event.respondWith(new Promise((resolve) => {
      let done = false;
      const fromCache = () => caches.match(req, { ignoreSearch: true })
        .then((r) => r || caches.match('./index.html'))
        .then((r) => r || new Response('Offline – open the app once with internet first.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
      const timer = setTimeout(() => { if (!done) { done = true; resolve(fromCache()); } }, 3000);
      fetch(req).then((r) => {
        saveCopy(req, r);
        if (!done) { done = true; clearTimeout(timer); resolve(r.ok ? r : fromCache().then((c) => (c.status === 503 ? r : c))); }
      }).catch(() => { if (!done) { done = true; clearTimeout(timer); resolve(fromCache()); } });
    }));
    return;
  }

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const network = fetch(req).then((r) => saveCopy(req, r)).catch(() => cached);
      return cached || network;
    })
  );
});
