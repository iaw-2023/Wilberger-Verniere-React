import React, { useEffect } from 'react';
import { useState } from 'react';
import './funciones.css';
import axios from 'axios';
 

function Funciones() {

    const [funcion, setFuncion] = useState([])
    const [error, setError] = useState(null);

    const fetchFuncion = () => {
        return axios.get('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/funciones')
            .then((response) => {
                setFuncion(response.data.data);
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
                    <table className="tabla dark:text-gray-400">
                        <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="tablaH">
                                    Pelicula:
                                </th>
                                <th scope="col" className="tablaH">
                                    Fecha:
                                </th>
                                <th scope="col" className="tablaH">
                                    Hora:
                                </th>
                                <th scope="col" className="tablaH">
                                    Sala numero:
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { funcion && funcion.length>0 && funcion.map((funcionObj,index) => (
                                <tr className="tablaRow">
                                    <th className="tablaH"> {funcionObj.Pelicula}      </th>
                                    <th className="tablaH"> {funcionObj.Fecha}         </th>
                                    <th className="tablaH"> {funcionObj.Hora}          </th>
                                    <th className="tablaH"> {funcionObj.NroSala}       </th>
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
