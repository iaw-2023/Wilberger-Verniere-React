"use client";

import { Link } from 'react-router-dom';

function NavBar() {
    return (
      <>
        <div class="topnav">
          <Link class="navbutton active" to="/">Home</Link>
          <Link class="navbutton" to="/funciones">Estrenos</Link>
          <Link class="navbutton" to="/peliculas">Peliculas</Link>
          <Link class="navbutton" to="/generos">Generos</Link>
        </div> 
      </>
    );
}

export default NavBar