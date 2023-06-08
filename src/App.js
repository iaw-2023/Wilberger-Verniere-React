import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from './Components/welcome/welcome'
import Funciones from './Components/funciones/funciones'
import Peliculas from './Components/peliculas/peliculas'
import Generos from './Components/generos/generos'
import NavBar from './Components/navbar/navbar'

function App() {
  return (
    <div>
      <div className="navigation-menu">
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Welcome/>} />
          <Route path="/funciones" element={ <Funciones/> } />
          <Route path="/peliculas" element={<Peliculas/>} />
          <Route path="/generos" element={<Generos/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App