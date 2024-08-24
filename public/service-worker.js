const CACHE_WEBCINES = "webCines-cache-v1"
const INSTALL_CACHE = [
  '/',
  '/funciones',
  '/peliculas',
  '/generos',
  '/paginaErrorPWA',
  '../app/background.jpg',
  './icons/webCinesIcon.png'
];

//Cuando se activa se borran los SW viejos
self.addEventListener("activate", (event) => {
  const CACHE = [CACHE_WEBCINES];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_WEBCINES).then((cache) => {
      return cache.addAll(INSTALL_CACHE)
      .catch(error => {
        console.log("Error install PWA: ", error);
      });
    })
  );
});

const deNetwork = (request, timeout) => 
  new Promise((fulfill, reject) => {
    if (!navigator.onLine) {
      return reject();
    }

    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
      actualizar(request);
    }, reject);
  });

const deCache = request =>
  caches
    .open(CACHE_WEBCINES)
    .then(cache =>
      cache
        .match(request)
        .then(matching => matching || cache.match("/paginaErrorPWA"))
    );

const actualizar = request =>
  caches
    .open(CACHE_WEBCINES)
    .then(cache =>
      fetch(request)
        .then(response => cache.put(request,response))
        .catch(error => console.log("Error actualizar PWA: ",error))
    );

self.addEventListener('fetch', event => {
  event.respondWith(
    deNetwork(event.request,5000).catch(() => deCache(event.request))
  );
  event.waitUntil(actualizar(event.request));
});

  

/* self.addEventListener('fetch', (event) => {
  // Pedidos API
  if (event.request.url.startsWith('https://wilberger-verniere-laravel-zxwy')) {
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
              cache.put(event.request, respuestaACache).catch((error) => {
                console.error("Fallo en cachear respuesta: ", error);
                return caches.match("/");
              });
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
          }).catch((error) => {
            console.error("Fetch fallo: ", error);
            return caches.match("/");
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
            cache.put(event.request, respuestaACache).catch((error) => {
              console.error("Fallo en cachear respuesta: ", error);
              return caches.match("/");
            });
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
        }).catch((error) => {
          console.error("Fetch fallo: ", error);
          return caches.match("/");
        });
      })
    );
  }
}); */