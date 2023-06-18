import React, { useEffect } from 'react';
import { useState } from 'react';
import './peliculas.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function peliculas() {
  
  const [pelicula, setPelicula] = useState([]);
  const [error, setError] = useState(null);

  const fetchPelicula = () => {
      return axios.get('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/peliculas')
          .then((response) => {
            setPelicula(response.data.data);
            setError(null);
        }).catch(setError);
  }

  useEffect(() => {
      fetchPelicula();
  },[])

  if (error) return<p> OCURRIO UN ERROR AL PEDIR LAS PELICULAS</p>

  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="tabla dark:text-gray-400">
                <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* <th scope="col" className="tablaH">Imagen: </th> */}
                        <th scope="col" className="tablaH">Nombre: </th>
                        <th scope="col" className="tablaH">Genero: </th>
                        {/* <th scope="col" className="tablaH">Accion: </th> */}
                    </tr>
                </thead>
                <tbody>
                    { pelicula && pelicula.length>0 && pelicula.map((peliculaObj,index) => (
                        <tr className="tablaRow" key={index}>
                            {/* <th className="tablaH"> {peliculaObj.Imagen}   </th> */}
                            <th className="tablaH"> {peliculaObj.Nombre}   </th>
                            <th className="tablaH">  {peliculaObj.Genero}   </th>
                            {/* <Link to={"/funciones/${peliculaObj.Nombre}/${peliculaObj.Genero}"}>Ver funciones</Link> */}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default peliculas
