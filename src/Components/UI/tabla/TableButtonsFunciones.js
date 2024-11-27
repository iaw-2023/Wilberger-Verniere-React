import { useContext } from "react";
import { dataContext } from "../../context/dataContext";
import ButtonWithoutRedirect from "../buttonWithoutRedirect/ButtonWithoutRedirect";
import styles from "./tabla.module.css";

export default function TableButtonsFunciones(
    funcion
) {
    const { promptComprar } = useContext(dataContext);

    return (
        <td key={"Accion"} data-label="Accion:" className={styles.tableBodyCell}>
            {funcion.AsientosDisponible > 0 ? (
                <ButtonWithoutRedirect
                    type="default"
                    buttonText="Comprar"
                    onClick={() => promptComprar(funcion)}
                />
            ) : (
                "ENTRADAS AGOTADAS"
            )}
        </td>
    )
}