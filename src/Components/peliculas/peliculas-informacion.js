import React, { useContext, useEffect } from 'react';
import './peliculas.css';
import '../../master.css';
import { dataContext } from '../context/dataContext';


function PeliculasInformacion(){

    const { peliculaElegida,obtenerInfoPeliculaChatGPT, respuestaChatGPT } = useContext(dataContext);

    console.log(peliculaElegida);

    const fetchInfo = () =>{ obtenerInfoPeliculaChatGPT(peliculaElegida.Nombre)};

    useEffect(() => {
        fetchInfo();
    },[]);

    return (
        <article>
            <h1 className="Nombre">
                Nombre: 
                <p className="nombre">{peliculaElegida.Nombre}</p>
            </h1>
                <h2 className="Sinopsis">
                    Sinopsis: 
                    { respuestaChatGPT && respuestaChatGPT.length>0 && (<p className="sinopsis">{respuestaChatGPT}</p>) }
                </h2>
                <h3 className="Portada">
                    Portada:
                    { peliculaElegida.Imagen }
                </h3>
        </article>
    )
};

export default PeliculasInformacion