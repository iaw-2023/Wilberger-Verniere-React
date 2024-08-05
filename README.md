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
Hacemos paginas responsive para celulares(576px), tablets(577px a 768px), laptops(769px a 992px), PCs de escritorio(993px a 1200px) y grandes computadoras(1201px)

## Pwa-js
https://developer.mozilla.org/en-US/docs/Web/Manifest
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
VER --> https://github.com/mdn/dom-examples/tree/main/service-worker/simple-service-worker

## Accesibilidad-js
https://www.w3.org/WAI/WCAG22/quickref/
    1.1 Text Alternatives
        1.1.1 Non-text Content
            Situacion A > Technique H37: Using alt attributes on img elements
            Situacion B > No situacion
            Situacion C > Technique H44: Using label elements to associate text labels with form controls
            Situacion D > No situacion
            Situacion E > No situacion
            Situacion F > Technique H67: Using null alt text and no title attribute on img elements for images that assistive technology should ignore
    1.4 Distingishable
        1.4.1 Use of Color
            Situacion A > G14: Ensuring that information conveyed by color differences is also available in text ("Entradas Agotadas")
            Situacion B > No situacion
        1.4.3 Contrast(Minimum)
            Situacion A > G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text --> https://juicystudio.com/services/luminositycontrastratio.php#specify
            Situacion B > No situacion
        1.4.4 Resize Text 
            G142: Using a technology that has commonly-available user agents that support zoom --> VER SI SE HACE
    2.1 KeyBoard Accesible
        2.1.1 Keyboard > G202: Ensuring keyboard control for all functionality 
            -> Hicimos que resalte los botones cuando hace focus (se mueve en la pestaña con "tab") como cuando hace hover del boton 
            -> VER SI ES SUFICIENTE HACER ESTO
        
    3.3 Input Assistance