"use client";

import styles from "./navbar.module.css";

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';
import { Button } from "react-bootstrap";

function NavBar() {

    const { handleLogOut } = useContext(dataContext);
    console.log(sessionStorage.getItem('userNombre'));
    const islogin = sessionStorage.getItem('login') || false;

    const handleMenuButton = () => {
        let navBarContainer = document.getElementById('navBarContainer');
        if (navBarContainer.style.display == "none"){
          navBarContainer.style.display="flex";
        }
        else{
          navBarContainer.style.display="none";
        }
        return;
    }

    return (
      <div className={styles.navContainer}>
        <div className={styles.navBarToggleContainer}>
          <Button className={styles.navBarToggleButton} onClick={ handleMenuButton }>Menu</Button>
        </div>
        <div id="navBarContainer" className={styles.navBarContainer}>
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
      </div>
    );
}

export default NavBar