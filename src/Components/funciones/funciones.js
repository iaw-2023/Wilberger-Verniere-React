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
                        { funcion && funcion.length>0 && funcion.map((funcionObj,index) => {
                            if (funcionObj.AsientosDisponible>0) {
                                return <tr className="tablaRow" key={index}>
                                    <th className="tablaBodyElem"> {funcionObj.Pelicula}      </th>
                                    <th className="tablaBodyElem"> {funcionObj.Fecha}         </th>
                                    <th className="tablaBodyElem"> {funcionObj.Hora}          </th>
                                    <th className="tablaBodyElem"> {funcionObj.NroSala}       </th>
                                    <th className="tablaBodyElem"> {funcionObj.AsientosDisponible}       </th>
                                    <th className="tablaBodyElem"> 
                                        <Button className={`button`} onClick={ ()=>promptComprar(funcionObj) }>Comprar</Button>
                                    </th>
                                </tr>
                            }
                            else {
                                return <tr className={styles.sinAsientos} key={index}>
                                    <th className="tablaBodyElem"> {funcionObj.Pelicula}      </th>
                                    <th className="tablaBodyElem"> {funcionObj.Fecha}         </th>
                                    <th className="tablaBodyElem"> {funcionObj.Hora}          </th>
                                    <th className="tablaBodyElem"> {funcionObj.NroSala}       </th>
                                    <th className="tablaBodyElem"> {funcionObj.AsientosDisponible}       </th>
                                    <th className="tablaBodyElem"> 
                                        ENTRADAS AGOTADAS
                                    </th>
                                </tr>
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Funciones