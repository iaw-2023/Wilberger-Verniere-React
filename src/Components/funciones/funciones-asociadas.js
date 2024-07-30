import '../../master.css';
import styles from './funciones.module.css';

import React, { useContext, useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { dataContext } from '../context/dataContext';
import apiClient from '../../Services/api';

function FuncionesAsociadas() {
    const {peliculaElegida, promptComprar} = useContext(dataContext);
    const [error, setError] = useState(null);
    const [funcion, setFuncion] = useState([])

    const fetchFuncion = () => {
        return apiClient.get("/rest/funciones/asociadas", { 
            params: {
                'Id': peliculaElegida.Id,
            }
        })
            .then((response) => {
                setFuncion(response.data.data);
                setError(null);
            }).catch(setError);
    }

    useEffect(() => {
        console.log("Pelicula elegida: ",peliculaElegida);
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
                        { funcion && funcion.length>0 && funcion.map((funcionObj,index) => {
                            const tablaParcial = (
                                <>
                                    <th className="tablaBodyElem"> {funcionObj.Pelicula} </th>
                                    <th className="tablaBodyElem"> {funcionObj.Fecha} </th>
                                    <th className="tablaBodyElem"> {funcionObj.Hora} </th>
                                    <th className="tablaBodyElem"> {funcionObj.NroSala} </th>
                                    <th className="tablaBodyElem"> {funcionObj.AsientosDisponible} </th>
                                </>
                            );
                            return(
                                <tr className={funcionObj.AsientosDisponible > 0 ? "tablaRow" : styles.sinAsientos} key={index}>
                                    {tablaParcial}
                                    <th className="tablaBodyElem">
                                        {funcionObj.AsientosDisponible > 0 ? (
                                            <Button className="button" onClick={() => promptComprar(funcionObj)}>Comprar</Button>
                                        ) : (
                                            "ENTRADAS AGOTADAS"
                                        )}
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FuncionesAsociadas