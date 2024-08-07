const CACHE_WEBCINES = "webCines-cache-v1"
const INSTALL_CACHE = [
  '/',
  '../app/background.jpg',
  './icons/webCinesIcon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_WEBCINES).then((cache) => {
        return cache.addAll(INSTALL_CACHE)
        .catch(error => {
          console.log("Error INSTALL_CACHE: ", error)
        });
      })
    ])
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) { return response; }
        return fetch(event.request).then((response) => {
          if (!response || response.status != 200 || response.type != 'basic') {
            return response;
          }
          const respuestaACache = response.clone();
          caches.open(CACHE_WEBCINES).then((cache) => {
            cache.put(event.request, respuestaACache);
          });
          return response;
        });
      })
    );
});

self.addEventListener("activate", (event) => {
  const CACHE = [CACHE_WEBCINES];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (CACHE.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});