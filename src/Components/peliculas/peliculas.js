import '../../master.css';

import React, { useEffect } from 'react';
import { useState } from 'react';
import apiClient from '../../Services/api';
import ButtonWithRedirect from '../UI/buttons/ButtonWithRedirect';

function Peliculas() {

    const [pelicula, setPelicula] = useState([]);
    const [error, setError] = useState(null);

    const fetchPelicula = () => {
        return apiClient.get("/rest/peliculas")
            .then((response) => {
                setPelicula(response.data.data);
                setError(null);
            }).catch(setError);
    }

    useEffect(() => {
        fetchPelicula();
    }, [])

    if (error) return <p> OCURRIO UN ERROR AL PEDIR LAS PELICULAS</p>

    return (
        <div>
            <div className="tabla_container">
                <table className="tabla">
                    <thead className="tablaHead tablaOscuro">
                        <tr>
                            <th scope="col" className="tablaHeadElem">Nombre: </th>
                            <th scope="col" className="tablaHeadElem">Genero: </th>
                            <th scope="col" className="tablaHeadElem">Accion: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pelicula && pelicula.length > 0 ? (
                            pelicula.map((peliculaObj, index) => (
                                <tr className="tablaRow" key={index}>
                                    <td data-label="Nombre:" className="tablaBodyElem"> {peliculaObj.Nombre} </td>
                                    <td data-label="Genero:" className="tablaBodyElem"> {peliculaObj.Genero} </td>
                                    <td data-label="Accion:" className="tablaBodyElem">
                                        <ButtonWithRedirect
                                            type="default"
                                            buttonText="Ver Informacion"
                                            redirectUrl='/peliculasInformacion'
                                            onClick={() => sessionStorage.setItem("peliculaElegida", JSON.stringify(peliculaObj))}
                                        />
                                        <ButtonWithRedirect
                                            type="default"
                                            buttonText="Ver Funciones"
                                            redirectUrl='/funcionesAsociadas'
                                            onClick={() => sessionStorage.setItem("peliculaElegida", JSON.stringify(peliculaObj))}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="alertaDiv">NO HAY PELICULAS DISPONBILES</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Peliculas
