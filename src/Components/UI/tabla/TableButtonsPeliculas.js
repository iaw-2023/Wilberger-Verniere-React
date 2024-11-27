import ButtonWithRedirect from "../buttonWithRedirect/ButtonWithRedirect";
import styles from "./tabla.module.css";

export default function TableButtonsPeliculas(
    pelicula
) {
    const setPeliculaElegida = (peliculaElegida) => {
        sessionStorage.setItem("peliculaElegida", JSON.stringify(peliculaElegida));
    }

    return (
        <td key={"Accion"} data-label="Accion:" className={styles.tablaBodyCell}>
            <ButtonWithRedirect
                type="default"
                buttonText="Ver Informacion"
                redirectUrl='/peliculasInformacion'
                onClick={() => setPeliculaElegida(pelicula)}
            />
            <ButtonWithRedirect
                type="default"
                buttonText="Ver Funciones"
                redirectUrl='/funcionesAsociadas'
                onClick={() => setPeliculaElegida(pelicula)}
            />
        </td>
    )
}