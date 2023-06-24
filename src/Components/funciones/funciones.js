import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './funciones.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { dataContext } from '../context/dataContext';

function Funciones() {
    const [funcion, setFuncion] = useState([])
    const [error, setError] = useState(null);
    const {promptComprar} = useContext(dataContext);

    const fetchFuncion = () => {
        return axios.get('https://wilberger-verniere-laravel-zxwy-kw6w8m4ps-iawv.vercel.app/rest/funciones')
            .then((response) => {
                setFuncion(response.data.data);
                setError(null);
            }).catch(setError);
    }

    useEffect(() => {
        fetchFuncion();
    },[]);

    if (error) return<p>OCURRIO UN ERROR AL PEDIR LAS FUNCIONES</p>

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="tabla dark:text-gray-400">
                    <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="tablaH">Pelicula:</th>
                            <th scope="col" className="tablaH">Fecha:</th>
                            <th scope="col" className="tablaH">Hora:</th>
                            <th scope="col" className="tablaH">Sala numero:</th>
                            {/* <th scope="col" className="tablaH">Asientos Disponibles:</th> */}
                            <th scope="col" className="tablaH">Accion:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { funcion && funcion.length>0 && funcion.map((funcionObj,index) => (
                            <tr className="tablaRow" key={index}>
                                <th className="tablaH"> {funcionObj.Pelicula}      </th>
                                <th className="tablaH"> {funcionObj.Fecha}         </th>
                                <th className="tablaH"> {funcionObj.Hora}          </th>
                                <th className="tablaH"> {funcionObj.NroSala}       </th>
                                {/* <th className="tablaH"> {funcionObj.LugaresDisponibles}       </th> */}
                                <th className="tablaH"> 
                                    <Button className="añadir-ticket" onClick={ ()=>promptComprar(funcionObj) }>Comprar</Button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Funciones