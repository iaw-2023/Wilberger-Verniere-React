import React, { useEffect } from 'react';
import { useState } from 'react';
import './peliculas.css';
import axios from 'axios';

// data = Obtener datos de la API

function peliculas() {
  
  const [pelicula, setPelicula] = useState([])

  const fetchPelicula = () => {
      return axios.get('https://vercel-deploy-test-jtuw53plx-wilbergermatias.vercel.app/rest/peliculas')
          .then((response) => setPelicula(response.data));
  }

  useEffect(() => {
      fetchPelicula();
  },[])

  return (
    <div>
      <div>Menu Peliculas</div>
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Genero:
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { pelicula && pelicula.length>0 && pelicula.map((peliculaObj,index) => (
                            <tr>
                                <th> {peliculaObj.Nombre}   </th>
                                <th> {peliculaObj.Genero}   </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default peliculas
