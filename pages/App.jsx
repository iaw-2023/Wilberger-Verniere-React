"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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
  const FuncionesAsociadas = require('../src/Components/funciones/funciones-asociadas').default;
  const ComprasAsociadas = require('../src/Components/compras/comprasAsociadas').default;

  return (
    <div>
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
            <Route path="/generos" element={<Generos />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/comprasAsociadas" element={<ComprasAsociadas />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
          {/* <div className= "page-footer">
            <Footer/>
          </div> */}
        </DataProvider>
      </HashRouter>
    </div>
  );
}
