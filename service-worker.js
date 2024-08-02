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
      addResourcesToCache([
          './',
          './app/layout.tsx','./app/page.tsx','./app/index.js',
          './src/Components/carrito/carrito.js',
          './src/Components/compras/compras.js', './src/Components/compras/comprasAsociadas.js',
          './src/Components/funciones/funciones.js','./src/Components/funciones/funciones-asociadas.js',
          './src/Components/generos/generos.js',
          './src/Components/mercadoPagoTarjeta/pagoTarjeta.js',
          './src/Components/navbar/navbar.js',
          './src/Components/peliculas/peliculas.js','./src/Components/peliculas/peliculas-informacion.js',
          './src/Components/slider/slider.js',
          './src/Components/usuarios/usuariosIniciar.js', './src/Components/usuarios/usuariosRegistrar.js',
          './src/Components/welcome/welcome.js',
          './public/icons/webCinesIcon.png'
        ])
      );
    });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackURL: './'
      })
    );
  });