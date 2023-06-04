import Link from 'next/link'

function NavBar() {
    return (
      <>
        <div class="topnav">
          <Link class="navbutton active" href="/">Home</Link>
          <Link class="navbutton" href="/funciones">Estrenos</Link>
          <Link class="navbutton" href="/peliculas">Peliculas</Link>
          <Link class="navbutton" href="/generos">Generos</Link>
        </div> 
      </>
    );
}

export default NavBar