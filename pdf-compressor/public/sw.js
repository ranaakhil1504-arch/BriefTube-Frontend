// Service Worker for PWA support
//
// v2 changes (mobile fix):
// - Bumped CACHE_NAME so returning mobile users (especially anyone who did
//   "Add to Home Screen") actually get this update instead of being stuck
//   forever on whatever was cached the first time they visited.
// - Added self.skipWaiting() + clients.claim() so a new deployment takes
//   over immediately instead of waiting for every tab/PWA instance to be
//   fully closed and reopened — on mobile people almost never fully close
//   a PWA, so without this they could stay on a broken old version indefinitely.
// - The old fetch handler was cache-first for EVERY request, including PDF
//   uploads and API calls (POST requests to the backend). We now only let
//   the service worker handle simple same-origin GET requests, and always
//   go straight to the network for anything else (uploads, API calls,
//   cross-origin requests). This avoids the service worker interfering
//   with the compress/upload requests, which is more likely to misbehave
//   on mobile browsers.
const CACHE_NAME = 'docmint-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
];


// Install event - cache assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate event - clean old caches and take control immediately
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - only cache same-origin GET requests for static app shell
// files. Everything else (PDF upload/compress/download calls to the
// backend API, any non-GET request) bypasses the cache entirely.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return; // let the browser handle it normally, don't touch API calls
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      }).catch(() => cached);

      // Network-first for the app shell so updates show up promptly;
      // fall back to cache only if the network fails (offline support).
      return networkFetch || cached;
    })
  );
});
