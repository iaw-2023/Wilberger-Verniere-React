"use client";

import styles from "./navbar.module.css";

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';

function NavBar() {

    const { handleLogOut} = useContext(dataContext);
    console.log(sessionStorage.getItem('userNombre'));
    const islogin = sessionStorage.getItem('login') || false;

    return (
      <div className={styles.navBarContainer}>
        <Link to="/" className={styles.navBarContainerElem}>Home</Link>
        <Link to="/funciones" className={styles.navBarContainerElem}>Estrenos</Link>
        <Link to="/peliculas" className={styles.navBarContainerElem}>Peliculas</Link>
        <Link to="/generos" className={styles.navBarContainerElem}>Generos</Link>
        { islogin && <Link to="/compras" className={styles.navBarContainerElem}>Compras</Link> }
        { islogin && <Link to="/carrito" className={styles.navBarContainerElem}>🛒</Link> }
        { !islogin &&  
          <div className={styles.infoCuentaContainer}>
            <Link to="/usuariosIniciar"  className={styles.navBarContainerElem}>Ingresar</Link>
            <Link to="/usuariosRegistrar"  className={styles.navBarContainerElem}>Registrarse</Link>
          </div> }
        { islogin &&  
          <div className={styles.infoCuentaContainer}>
            <div className={`${styles.navBarContainerElem} ${styles.userNombre}`}> {sessionStorage.getItem('userNombre')} </div>
            <Link to="/" className={styles.navBarContainerElem} onClick={ handleLogOut }>LogOut</Link>
          </div> }
      </div>
    );
}

export default NavBar