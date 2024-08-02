self.addEventListener('install', event => {
  try{
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/',
        ]);
      })
    );
  } catch (error){
    console.log("Error en addAll: ", error);
  }
  
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