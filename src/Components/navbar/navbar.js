"use client";

import styles from "./navbar.module.css";

import { NavLink } from 'react-router-dom';
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
          <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/funciones">Estrenos</NavLink>
          <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/peliculas">Peliculas</NavLink>
          <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/generos">Generos</NavLink>
          { islogin && <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/compras">Compras</NavLink> }
          { islogin && <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/carrito">🛒</NavLink> }
          { !islogin &&  
            <div className={styles.infoCuentaContainer}>
              <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/usuariosIniciar">Ingresar</NavLink>
              <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} to="/usuariosRegistrar">Registrarse</NavLink>
            </div> }
          { islogin &&  
            <div className={styles.infoCuentaContainer}>
              <div className={`${styles.navBarContainerElem} ${styles.userNombre}`}> {sessionStorage.getItem('userNombre')} </div>
              <NavLink className={({ isActive }) => `${styles.navBarContainerElem} ${isActive ? styles.active : ""}`} onClick={ handleLogOut } to="/">LogOut</NavLink>
            </div> }
        </div>
      </div>
    );
}

export default NavBar