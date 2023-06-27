import React, { useEffect } from 'react'
import { useState } from 'react';
import './generos.css';
import '../../master.css';
import axios from 'axios';

function listaPeliculas(arregloPeliculas){
    if (arregloPeliculas.length < 1){
        return "No hay peliculas asociadas a este genero"
    }
    else {
        let arregloRet = [];
        let j=0; 
        arregloRet[j]="[ "; j++;
        for (let i = 0; i<arregloPeliculas.length; i++){
            //console.log("arregloPeliculas: ", arregloPeliculas[i]);
            if (i>0) { arregloRet[j]=","; j++; }
            arregloRet[j]=arregloPeliculas[i].nombre + "\n"; j++;
            //console.log("arregloRet: ", arregloRet[i])
        }
        arregloRet[j]=" ]";
        return arregloRet;
    }
}

function Generos() {

  const [genero, setGenero] = useState([]);
  const [error, setError] = useState(null);

  const fetchGenero = () => {
      return axios.get('https://wilberger-verniere-laravel-zxwy-kw6w8m4ps-iawv.vercel.app/rest/generos')
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
                    <tr>
                        <th scope="col" className="tablaH">Nombre: </th>
                        <th scope="col" className="tablaH">Peliculas: </th>
                    </tr>
                </thead>
                <tbody>
                    { genero && genero.length>0 && genero.map((generoObj,index) => (
                        <tr className="tablaRow" key={index}>
                            <th className="tablaH"> {generoObj.Nombre} </th>
                            <th className="tablaH"> {listaPeliculas(generoObj.Peliculas) } </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Generos
