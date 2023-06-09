import React, { useEffect } from 'react';
import { useState } from 'react';
import './funciones.css';
import axios from 'axios';
 

function Funciones() {

    const [funcion, setFuncion] = useState([])
    const [error, setError] = useState(null);

    const fetchFuncion = () => {
        return axios.get('https://vercel-deploy-test-921bwpfuo-wilbergermatias.vercel.app/rest/funciones')
            .then((response) => {
                setFuncion(response.data);
                setError(null);
            }).catch(setError);
    }

    useEffect(() => {
        fetchFuncion();
    },[]);

    if (error) return<p> OCURRIO UN ERROR AL PEDIR LAS FUNCIONES</p>
    
    return (
        <div>
            <div>Menu Funciones</div>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Pelicula:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hora:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sala numero:
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { funcion && funcion.length>0 && funcion.map((funcionObj,index) => (
                                <tr>
                                    <th> {funcionObj.Pelicula}      </th>
                                    <th> {funcionObj.Fecha}         </th>
                                    <th> {funcionObj.Hora}          </th>
                                    <th> {funcionObj.NroSala}       </th>
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

export default Funciones
