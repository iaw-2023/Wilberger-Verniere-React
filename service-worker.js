const { preload } = require("react-dom");

const addResourcesToCache = async (resources) => {
  const cache = await caches.open('mi-cache');
  await cache.addAll(resources)
}

const putInCache = async(request,response) => {
  const cache = await caches.open('mi-cache');
  await cache.put(request,response);
}

const cacheFirst = async ({request, preloadResponsePromise, fallbackUrl}) =>{
  const responseFromCache = await caches.match(request);
  if (responseFromCache){
    return responseFromCache;
  }

  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request,preloadResponse.clone());
    return preloadResponse;
  }

  try {
    const responseFromNetwork = await fetch(requst.clone());
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('mi-cache').then(cache => {
        return cache.addAll([
          './',
          '/public/icons/webCinesIcon.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });