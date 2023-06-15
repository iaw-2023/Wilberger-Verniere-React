import React, { useEffect } from 'react'
import { useState } from 'react';
import './generos.css';
import axios from 'axios';

function Generos() {

  const [genero, setGenero] = useState([]);
  const [error, setError] = useState(null);

  const fetchGenero = () => {
      return axios.get('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/generos')
          .then((response) => {
            setGenero(response.data.data);
            setError(null);
        }).catch(setError);
  }

  useEffect(() => {
      fetchGenero();
  },[]);

  if (error) return<p> OCURRIO UN ERROR AL PEDIR LOS GENEROS </p>

  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="tabla dark:text-gray-400">
                <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
                    <tr className='tablaRow'>
                        <th scope="col" className="tablaH">Nombre: </th>
                        <th scope="col" className="tablaH">Peliculas: </th>
                    </tr>
                </thead>
                <tbody>
                    { genero && genero.length>0 && genero.map((generoObj,index) => (
                        <tr className="tablaRow">
                            <th className="tablaH"> {generoObj.Nombre}            </th>
                            <th className="tablaH"> {generoObj.Peliculas}         </th>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Generos
