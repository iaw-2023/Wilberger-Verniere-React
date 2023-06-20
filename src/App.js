import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from './Components/welcome/welcome'
import Funciones from './Components/funciones/funciones'
import Peliculas from './Components/peliculas/peliculas'
import Generos from './Components/generos/generos'
import Carrito from './Components/carrito/carrito'
import NavBar from './Components/navbar/navbar'
import Footer from './Components/footer/footer'
import DataProvider from './Components/context/dataContext'
import Compras from './Components/compras/compras'
import FuncionesAsociadas from './Components/funciones/funciones-asociadas'
import ComprasAsociadas from './Components/compras/comprasAsociadas'

function App() {
  return (
    <DataProvider>
      <div className="navigation-menu">
        <NavBar/>
      </div>
      <Routes>
        <Route path="/" element={ <Welcome/>} />
        <Route path="/funciones" element={ <Funciones/> } />
        <Route path="/funcionesAsociadas" element={ <FuncionesAsociadas/> } />
        <Route path="/peliculas" element={<Peliculas/>} />
        <Route path="/generos" element={<Generos/>} />
        <Route path="/compras" element={<Compras/>} />
        <Route path="/comprasAsociadas" element={ <ComprasAsociadas/> } />
        <Route path="/carrito" element={<Carrito/>} />
      </Routes>
      {/* <div className= "page-footer">
        <Footer/>
      </div> */}
    </DataProvider>
  )
}

export default App