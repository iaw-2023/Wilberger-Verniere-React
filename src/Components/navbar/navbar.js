"use client";

import { Link } from 'react-router-dom';
import "./navbar.css";

function NavBar() {
    return (
      <>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/funciones">Estrenos</Link>
          <Link to="/peliculas">Peliculas</Link>
          <Link to="/generos">Generos</Link>
          <Link to="/carrito" className="carrito">🛒</Link>
          {/* <div className="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search"></input>
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div> */}
        </div>
      </>
    );
}

export default NavBar