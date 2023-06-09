import React, { useEffect } from 'react'
import { useState } from 'react';
import './generos.css';
import axios from 'axios';

function Generos() {

  const [genero, setGenero] = useState([])

  const fetchGenero = () => {
      return axios.get('https://vercel-deploy-test-jtuw53plx-wilbergermatias.vercel.app/rest/generos')
          .then((response) => setGenero(response.data));
  }

  useEffect(() => {
      fetchGenero();
  },[])

  return (
    <div>
      <div>Menu Generos</div>
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Peliculas:
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { genero && genero.length>0 && genero.map((generoObj,index) => (
                            <tr>
                                <th> {generoObj.Nombre}            </th>
                                <th> {generoObj.Peliculas}         </th>
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

export default Generos
