import '../../master.css';
import styles from './peliculas.module.css';

import React, { useContext, useEffect } from 'react';
import { dataContext } from '../context/dataContext';


function PeliculasInformacion(){

    const {  
        obtenerInfoPeliculaChatGPT, respuestaChatGPT, errorRespuestaChatGPT, 
        obtenerInfoPeliculaOpenMovie, respuestaOpenMovie, errorRespuestaOpenMovie, 
    } = useContext(dataContext);

    const PELICULA_ELEGIDA_JSON = JSON.parse(sessionStorage.getItem("peliculaElegida"));

    const fetchInfo = () =>
    { 
        console.log("Pelicula elegida JSON: ",PELICULA_ELEGIDA_JSON); 
        obtenerInfoPeliculaChatGPT(PELICULA_ELEGIDA_JSON.Nombre);
        obtenerInfoPeliculaOpenMovie(PELICULA_ELEGIDA_JSON.Nombre);
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    return (
        <article className={styles.peliculaArticulo}>
            <div className={styles.peliculaInfoContainer}>
                <div className={styles.peliculaNombreContainer}>
                    <div>
                        <h1 className={styles.peliculasHeader}>Nombre:</h1>
                        <p className={styles.peliculasTexto}>{PELICULA_ELEGIDA_JSON.Nombre}</p>
                    </div>
                    <div className="Sinopsis">
                        <h2 className={styles.peliculasHeader}>Sinopsis: </h2>
                        { respuestaChatGPT && respuestaChatGPT.length>0 && 
                            (<p className={styles.peliculasTexto}>
                                {respuestaChatGPT}
                            </p>)}
                        { errorRespuestaChatGPT && errorRespuestaChatGPT.length>0 && 
                            (<p className={`${styles.peliculasTexto} ${styles.peliculasError}`}>
                                {errorRespuestaChatGPT}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles.peliculasPortadaContainer}>
                    <h3 className={styles.peliculasHeader}>Portada:</h3>
                    <div className={styles.peliculaPortada}>
                    { PELICULA_ELEGIDA_JSON.Imagen ? 
                        <img className={styles.peliculasPortadaContainerImagen} src={PELICULA_ELEGIDA_JSON.Imagen} alt={`Portada de la pelicula: ${PELICULA_ELEGIDA_JSON.Nombre}`}/> 
                        : respuestaOpenMovie.Poster ? 
                            <div>
                                <img className={styles.peliculasPortadaContainerImagen} src={respuestaOpenMovie.Poster} alt={`Portada de la pelicula: ${PELICULA_ELEGIDA_JSON.Nombre}`}/>
                                <p>Imagen obtenida de Open Movie DB</p></div> 
                            : <p className={`${styles.peliculasTexto} ${styles.peliculasError}`}>Error al obtener la portada de Open Movie DB</p> 
                    }
                    </div>
                </div>
            </div>
            <div className={styles.peliculasReseñaContainer}>
                <h4 className={styles.peliculasHeader}>Reseñas:</h4>
                { respuestaOpenMovie.Ratings ?
                    respuestaOpenMovie.Ratings.length>0 ?
                    <table className="tabla">
                        <thead className="tablaHead tablaOscuro">
                            <tr>
                                <th scope="col" className="tablaHeadElem">Origen:</th>
                                <th scope="col" className="tablaHeadElem">Valoracion:</th>
                            </tr>
                        </thead>
                        <tbody>
                            { respuestaOpenMovie.Ratings.map((reseñaObj, index) => (
                            <tr className="tablaRow" key={index}>
                                <td data-label="Origen:" className="tablaBodyElem"> {reseñaObj.Source} </td>
                                <td data-label="Valoracion:" className="tablaBodyElem"> {reseñaObj.Value} </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    : <p className={`${styles.peliculasTexto} ${styles.peliculasError}`}>No hay reseñas para esta pelicula</p>
                : errorRespuestaOpenMovie
                }
            </div>
        </article>
    )
};

export default PeliculasInformacion