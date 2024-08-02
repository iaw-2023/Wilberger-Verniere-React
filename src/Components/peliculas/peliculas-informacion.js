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

    const fetchInfo = () =>
    {
        console.log("Pelicula elegida: ",peliculaElegida); 
        obtenerInfoPeliculaChatGPT(peliculaElegida.Nombre);
        obtenerInfoPeliculaOpenMovie(peliculaElegida.Nombre);
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
                        <p className={styles.peliculasTexto}>{peliculaElegida.Nombre}</p>
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
                    { peliculaElegida.Imagen ? 
                        <img className={styles.peliculasPortadaContainerImagen} src={peliculaElegida.Imagen} alt={`Portada de la pelicula: ${peliculaElegida.Nombre}`}/> 
                        : respuestaOpenMovie.Poster ? 
                            <div>
                                <img className={styles.peliculasPortadaContainerImagen} src={respuestaOpenMovie.Poster} alt={`Portada de la pelicula: ${peliculaElegida.Nombre}`}/>
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
                                <th data-label="Origen:" className="tablaBodyElem"> {reseñaObj.Source}      </th>
                                <th data-label="Valoracion:" className="tablaBodyElem"> {reseñaObj.Value}         </th>
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