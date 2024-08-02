self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',
        '/app/layout.tsx','/app/page.tsx',
        '/src/Components/carrito/carrito.js',
        '/src/Components/compras/compras.js', '/src/Components/compras/comprasAsociadas.js',
        '/src/Components/funciones/funciones.js','/src/Components/funciones/funciones-asociadas.js',
        '/src/Components/generos/generos.js',
        '/src/Components/mercadoPagoTarjeta/pagoTarjeta.js',
        '/src/Components/navbar/navbar.js',
        '/src/Components/peliculas/peliculas.js','/src/Components/peliculas/peliculas-informacion.js',
        '/src/Components/slider/slider.js',
        '/src/Components/usuarios/usuariosIniciar.js', '/src/Components/usuarios/usuariosRegistrar.js',
        '/src/Components/welcome/welcome.js',
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