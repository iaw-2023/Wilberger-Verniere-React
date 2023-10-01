"use client";

import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';

function NavBar() {

    const { login, setLogin, setEmailActivo, setUsuarioActivo, usuarioActivo } = useContext(dataContext);
    const navigate = useNavigate();

    const handleLogOut = () =>
    {
      setLogin(false);
      setUsuarioActivo("");
      setEmailActivo("");

      localStorage.removeItem("authToken");

      navigate("/");
    } 

    return (
      <>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/funciones">Estrenos</Link>
          <Link to="/peliculas">Peliculas</Link>
          <Link to="/generos">Generos</Link>
          { login && <Link to="/compras">Compras</Link> }
          { login && <Link to="/carrito" className="carrito">🛒</Link> }
          { !login && <Link to="/usuariosIniciar" className="usuarioInicio">Ingresar</Link> }
          { !login && <Link to="/usuariosRegistrar" className="usuarioRegistrar">Registrarse</Link> }
          { login &&  
            <div className='nombreUsuario'> 
              {usuarioActivo} 
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