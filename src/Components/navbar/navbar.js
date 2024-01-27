"use client";

import { Link } from 'react-router-dom';
import "./navbar.css";
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';

function NavBar() {

    const { handleLogOut} = useContext(dataContext);
    console.log(sessionStorage.getItem('userNombre'));

    return (
      <>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/funciones">Estrenos</Link>
          <Link to="/peliculas">Peliculas</Link>
          <Link to="/generos">Generos</Link>
          { sessionStorage.getItem('login') && <Link to="/compras">Compras</Link> }
          { sessionStorage.getItem('login') && <Link to="/carrito" className="carrito">🛒</Link> }
          { !sessionStorage.getItem('login') &&  
            <div className='infoCuenta'>
              <Link to="/usuariosIniciar" className="usuarioInicio">Ingresar</Link>
              <Link to="/usuariosRegistrar" className="usuarioRegistrar">Registrarse</Link>
            </div> }
          { sessionStorage.getItem('login') &&  
            <div className='infoCuenta'>
              <div className='userNombre'> {sessionStorage.getItem('userNombre')} </div>
              <Link to="/" className="usuarioSalir" onClick={ handleLogOut }>LogOut</Link>
            </div> }
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