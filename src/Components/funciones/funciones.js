import '../../master.css';
import styles from './funciones.module.css';

import React, { useContext, useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { dataContext } from '../context/dataContext';
import apiClient from '../../Services/api';

function Funciones() {
    const [funcion, setFuncion] = useState([])
    const [error, setError] = useState(null);
    const {promptComprar} = useContext(dataContext);

    const fetchFuncion = () => {
        return apiClient.get("/rest/funciones")
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
            <div className="tabla_container">
                <table className="tabla">
                    <thead className="tablaHead tablaOscuro">
                        <tr>
                            <th scope="col" className="tablaHeadElem">Pelicula:</th>
                            <th scope="col" className="tablaHeadElem">Fecha:</th>
                            <th scope="col" className="tablaHeadElem">Hora:</th>
                            <th scope="col" className="tablaHeadElem">Sala numero:</th>
                            <th scope="col" className="tablaHeadElem">Asientos Disponibles:</th>
                            <th scope="col" className="tablaHeadElem">Accion:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { funcion && funcion.length>0 ? (
                            funcion.map((funcionObj,index) => {
                                const tablaParcial = (
                                    <>
                                        <td data-label="Pelicula:" className="tablaBodyElem"> {funcionObj.Pelicula} </td>
                                        <td data-label="Fecha:" className="tablaBodyElem"> {funcionObj.Fecha} </td>
                                        <td data-label="Hora:" className="tablaBodyElem"> {funcionObj.Hora} </td>
                                        <td data-label="Sala numero:" className="tablaBodyElem"> {funcionObj.NroSala} </td>
                                        <td data-label="Asientos Disponibles:" className="tablaBodyElem"> {funcionObj.AsientosDisponible} </td>
                                    </>
                                );
                                return(
                                    <tr className={`tablaRow ${funcionObj.AsientosDisponible > 0 ? '' : styles.sinAsientos}`} key={index}>
                                        {tablaParcial}
                                        <td data-label="Accion:" className="tablaBodyElem">
                                            {funcionObj.AsientosDisponible > 0 ? (
                                                <Button className="button" onClick={() => promptComprar(funcionObj) }>Comprar</Button>
                                            ) : (
                                                "ENTRADAS AGOTADAS"
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                            ) 
                            : (
                                <tr>
                                    <td colspan="6" className="alertaDiv">NO HAY FUNCIONES DISPONBILES</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Funciones