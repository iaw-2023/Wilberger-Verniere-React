"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate } from 'react-router-dom';

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return null during server-side rendering
  }

  const HashRouter = require('react-router-dom').HashRouter;
  const Routes = require('react-router-dom').Routes;
  const Route = require('react-router-dom').Route;

  // Import other components dynamically
  const Welcome = require('../src/Components/welcome/welcome').default;
  const Funciones = require('../src/Components/funciones/funciones').default;
  const Peliculas = require('../src/Components/peliculas/peliculas').default;
  const Generos = require('../src/Components/generos/generos').default;
  const Carrito = require('../src/Components/carrito/carrito').default;
  const NavBar = require('../src/Components/navbar/navbar').default;
  const Footer = require('../src/Components/footer/footer').default;
  const DataProvider = require('../src/Components/context/dataContext').default;
  const Compras = require('../src/Components/compras/compras').default;
  const PeliculaInformacion = require('../src/Components/peliculas/peliculas-informacion').default;
  const FuncionesAsociadas = require('../src/Components/funciones/funciones-asociadas').default;
  const ComprasAsociadas = require('../src/Components/compras/comprasAsociadas').default;
  const UserIni = require('../src/Components/usuarios/usuariosIniciar').default;
  const UserReg = require('../src/Components/usuarios/usuariosRegistrar').default;
  const PagoTarjeta = require('../src/Components/mercadoPagoTarjeta/pagoTarjeta').default;
  const PWA = require('../src/Components/pwa/pwa').default;

  function ProteccionRoute({ element, isLogin }) {  
    if (isLogin || sessionStorage.getItem('authToken')) {
      return element;
    }
  
    return <Navigate to="/usuariosIniciar" />;
  }

  return (
    <div className="mainDiv">
      <HashRouter>
        <DataProvider>
          <div className="navigation-menu">
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/funciones" element={<Funciones />} />
            <Route path="/funcionesAsociadas" element={<FuncionesAsociadas />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/peliculasInformacion" element={<PeliculaInformacion />} />
            <Route path="/generos" element={<Generos />} />
            <Route path="/usuariosIniciar" element={<UserIni />} />
            <Route path="/usuariosRegistrar" element={<UserReg />} />

            <Route path="/compras" element={<ProteccionRoute element={<Compras />} />} />
            <Route path="/comprasAsociadas" element={<ProteccionRoute element={<ComprasAsociadas />} />} />
            <Route path="/carrito" element={<ProteccionRoute element={<Carrito />} />} />
            <Route path="/pagoTarjeta" element={<ProteccionRoute element={<PagoTarjeta />} />} />

            <Route path="/paginaErrorPWA" element={<PWA />} />
          </Routes>
        </DataProvider>
      </HashRouter>
    </div>
  );
}
