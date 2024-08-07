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

self.addEventListener('fetch', (event) => {
  // Pedidos API
  if (event.request.url.startsWith('https://wilberger-verniere-laravel-zxwy.vercel.app/')) {
    event.respondWith(
      caches.open(CACHE_WEBCINES).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            const respuestaConHeader = new Response(cachedResponse.body, {
              status: cachedResponse.status,
              statusText: cachedResponse.statusText,
              headers: new Headers({
                ...cachedResponse.headers,
                'X-Handled-By': 'ServiceWorker'
              })
            });
            return respuestaConHeader;
          }

          return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            const respuestaACache = networkResponse.clone();
            caches.open(CACHE_WEBCINES).then((cache) => {
              cache.put(event.request, respuestaACache);
            });

            const respuestaConHeader = new Response(networkResponse.body, {
              status: networkResponse.status,
              statusText: networkResponse.statusText,
              headers: new Headers({
                ...networkResponse.headers,
                'X-Handled-By': 'Network'
              })
            });
            return respuestaConHeader;
          });
        });
      })
    );
  } else {
    // Otros pedidos
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          const respuestaConHeader = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers({
              ...response.headers,
              'X-Handled-By': 'ServiceWorker'
            })
          });
          return respuestaConHeader;
        }

        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const respuestaACache = networkResponse.clone();
          caches.open(CACHE_WEBCINES).then((cache) => {
            cache.put(event.request, respuestaACache);
          });

          const respuestaConHeader = new Response(networkResponse.body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers: new Headers({
              ...networkResponse.headers,
              'X-Handled-By': 'Network'
            })
          });
          return respuestaConHeader;
        });
      })
    );
  }
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