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
                    : respuestaOpenMovie.data.Poster ? <p>Imagen obtenida de Open Movie DB <img src={ respuestaOpenMovie.data.Poster }/></p> 
                        : <p>Error al obtener la portada de Open Movie DB</p> }
            </h3>
            <h3 className={styles.peliculasReseñasHeader}>
                Reseñas:
                { respuestaOpenMovie.Ratings && respuestaOpenMovie.Ratings.length>0 ?
                    <table className="tabla dark:text-gray-400">
                        <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="tablaH">Origen:</th>
                                <th scope="col" className="tablaH">Valoracion:</th>
                            </tr>
                        </thead>
                        <tbody>
                            { respuestaOpenMovie.Ratings.map((reseñaObj, index) => (
                            <tr className="tablaRow" key={index}>
                                <th className="tablaH"> {reseñaObj.Source}      </th>
                                <th className="tablaH"> {reseñaObj.Value}         </th>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    : errorRespuestaOpenMovie
                }
            </h3>
        </article>
    )
};

export default PeliculasInformacion