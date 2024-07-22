import '../../master.css';
import styles from './peliculas.module.css';

import React, { useContext, useEffect } from 'react';
import { dataContext } from '../context/dataContext';


function PeliculasInformacion(){

    const { 
        peliculaElegida, 
        obtenerInfoPeliculaChatGPT, respuestaChatGPT, errorRespuestaChatGPT, 
        obtenerInfoPeliculaOpenMovie, respuestaOpenMovie, errorRespuestaOpenMovie, 
    } = useContext(dataContext);

    console.log(peliculaElegida);

    const fetchInfo = () =>
    { 
        obtenerInfoPeliculaChatGPT(peliculaElegida.Nombre);
        obtenerInfoPeliculaOpenMovie(peliculaElegida.Nombre);
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    return (
        <article>
            <h1 className={styles.nombreHeader}>
                Nombre: 
                <p className={styles.peliculasNombreTexto}>{peliculaElegida.Nombre}</p>
            </h1>
            <h2 className={styles.peliculasSinopsisHeader}>
                Sinopsis: 
                { respuestaChatGPT && respuestaChatGPT.length>0 && (<p className={styles.peliculasSinopsisTexto}>{respuestaChatGPT}</p>) }
                { errorRespuestaChatGPT && errorRespuestaChatGPT.length>0 && (<p className={styles.peliculasErrorChatGPT}>{errorRespuestaChatGPT}</p>) }
            </h2>
            <h3 className={styles.peliculasPortadaHeader}>
                Portada:
                { peliculaElegida.Imagen ? <img src={peliculaElegida.Imagen}/> 
                    : respuestaOpenMovie.Poster ? <p>Imagen obtenida de Open Movie DB <img src={ respuestaOpenMovie.Poster }/></p> 
                        : <p>Error al obtener la portada de Open Movie DB</p> }
            </h3>
            <h3 className={styles.peliculasReseñasHeader}>
                Reseñas:
                Reseñas OpenMovie DB
            </h3>
        </article>
    )
};

export default PeliculasInformacion