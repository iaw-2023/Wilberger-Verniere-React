const STATIC_CACHE = 'static-cache-v1';
const PAGES_CACHE = 'pages-cache-v1';
const CSS_CACHE = 'css-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll([
          '/'
        ]);
      }),
      caches.open(PAGES_CACHE).then((cache) => {
        return cache.addAll([
          '/app/page.tsx'
        ])
        .catch(error => {
          console.log("Error PAGES_CACHE: ", error)
        });
      }),
      caches.open(CSS_CACHE).then((cache) => {
        return cache.addAll([
          '/app/globals.css'
        ])
        .catch(error => {
          console.log("Error CSS_CACHE: ", error)
        });
      })
    ])
  );
});

self.addEventListener('fetch', event => {
  try {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
  catch (error) {
    console.log("Error en fetch: ", error)
  }
});