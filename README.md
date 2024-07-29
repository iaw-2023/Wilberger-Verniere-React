This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sobre nuestra pagina

Esta pagina se creo utilizando el framework Nextj, en conjunto con react y bootstrap.


## deploy

Por familiaridad se eligio utilizar a vercel como la plataforma para el deploy de esta aplicacion.

- [Deploy en vercel](https://wilberger-verniere-react.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs) - documentacion de Nextjs.
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - documentacion de Bootstrap v5.3

## Comentarios adicionales

- Por como se resolvio las rutas de nuestra aplicacion single-page, hay errores visuales en la interfaz que la hacen verse menos atractiva que la version montada localmente en localhost:3000 sin este cambio.
- Otro problema proveniente de las rutas es el carousel estatico en la pagina principal.
- Las imagenes del carousel estan guardadas en un objeto json local al proyecto, pero representan la idea de mostrar posters de peliculas, los cuales podrian traerse de la base de datos de Supabase

## API-Mercado-Pago
Usamos variables globales para observaciones inputadas en carrito de compras.

## Servicio-web-js
Usamos Open Movie Database para obtener informacion de peliculas, como reseñas o portadas

## Responsive-js
Hacemos paginas responsive para celulares(576px), tablets(577px a 768px), laptops pequeñas(769px a 992px), computadoras de escritorio(993px a 1200px) y grandes computadoras(1201px)