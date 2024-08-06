import '../../master.css';

import React, { useEffect } from 'react'
import { useState } from 'react';
import apiClient from '../../Services/api';

function listaPeliculas(arregloPeliculas){
    if (arregloPeliculas.length < 1){
        return "No hay peliculas asociadas a este genero"
    }
    else {
        let arregloRet = [];
        let j=0; 
        arregloRet[j]="[ "; j++;
        for (let i = 0; i<arregloPeliculas.length; i++){
            if (i>0) { arregloRet[j]=","; j++; }
            arregloRet[j]=arregloPeliculas[i].nombre + "\n"; j++;
        }
        arregloRet[j]=" ]";
        return arregloRet;
    }
}

function Generos() {

  const [genero, setGenero] = useState([]);
  const [error, setError] = useState(null);

  const fetchGenero = () => {
      return apiClient.get("/rest/generos")
          .then((response) => {
            setGenero(response.data.data);
            setError(null);
        }).catch(setError);
  }

  useEffect(() => {
      fetchGenero();
  },[]);

  if (error) return <p> OCURRIO UN ERROR AL PEDIR LOS GENEROS </p>

  return (
    <div>
        <div className="tabla_container">
            <table className="tabla">
                <thead className="tablaHead tablaOscuro">
                    <tr>
                        <th scope="col" className="tablaHeadElem">Nombre: </th>
                        <th scope="col" className="tablaHeadElem">Peliculas: </th>
                    </tr>
                </thead>
                <tbody>
                    { genero && genero.length>0 ? (
                        genero.map((generoObj,index) => (
                            <tr className="tablaRow" key={index}>
                                <td data-label="Nombre:" className="tablaBodyElem"> {generoObj.Nombre} </td>
                                <td data-label="Peliculas:" className="tablaBodyElem"> { listaPeliculas(generoObj.Peliculas) } </td>
                            </tr>
                            ))
                        ) 
                        : (
                            <tr>
                                <td colspan="2" className="alertaDIV">"NO HAY GENEROS DISPONBILES"</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Generos
