"use client";

import { Link } from 'react-router-dom';
import "./navbar.css";
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';

function NavBar() {

    const { handleLogOut} = useContext(dataContext);
    console.log(sessionStorage.getItem('userNombre'));
    const islogin = sessionStorage.getItem('login') || false;

    return (
      <>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/funciones">Estrenos</Link>
          <Link to="/peliculas">Peliculas</Link>
          <Link to="/generos">Generos</Link>
          { islogin && <Link to="/compras">Compras</Link> }
          { islogin && <Link to="/carrito" className="carrito">🛒</Link> }
          { !islogin &&  
            <div className='infoCuenta'>
              <Link to="/usuariosIniciar" className="usuarioInicio">Ingresar</Link>
              <Link to="/usuariosRegistrar" className="usuarioRegistrar">Registrarse</Link>
            </div> }
          { islogin &&  
            <div className='infoCuenta'>
              <div className='userNombre'> {sessionStorage.getItem('userNombre')} </div>
              <Link to="/" className="usuarioSalir" onClick={ handleLogOut }>LogOut</Link>
            </div> }
        </div>
      </>
    );
}

export default NavBar