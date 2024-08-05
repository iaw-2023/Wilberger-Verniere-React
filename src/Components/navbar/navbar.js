"use client";

import styles from "./navbar.module.css";

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';
import { Button } from "react-bootstrap";

function NavBar() {

    const { handleLogOut } = useContext(dataContext);
    console.log("Guardo en sessionStorage: ", sessionStorage.getItem('userNombre'));
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
          <Link className={styles.navBarContainerElem} to="/" >Home</Link>
          <Link className={styles.navBarContainerElem} to="/funciones" >Estrenos</Link>
          <Link className={styles.navBarContainerElem} to="/peliculas" >Peliculas</Link>
          <Link className={styles.navBarContainerElem} to="/generos" >Generos</Link>
          { islogin && <Link className={styles.navBarContainerElem} to="/compras" >Compras</Link> }
          { islogin && <Link className={styles.navBarContainerElem} to="/carrito" >🛒</Link> }
          { !islogin &&  
            <div className={styles.infoCuentaContainer}>
              <Link className={styles.navBarContainerElem} to="/usuariosIniciar"  >Ingresar</Link>
              <Link className={styles.navBarContainerElem} to="/usuariosRegistrar"  >Registrarse</Link>
            </div> }
          { islogin &&  
            <div className={styles.infoCuentaContainer}>
              <div className={`${styles.navBarContainerElem} ${styles.userNombre}`}> {sessionStorage.getItem('userNombre')} </div>
              <Link className={styles.navBarContainerElem} onClick={ handleLogOut } to="/" >LogOut</Link>
            </div> }
        </div>
      </div>
    );
}

export default NavBar