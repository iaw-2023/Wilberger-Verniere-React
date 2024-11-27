import { useContext } from "react";
import { dataContext } from "../../context/dataContext";
import ButtonWithoutRedirect from "../buttonWithoutRedirect/ButtonWithoutRedirect";
import styles from "./tabla.module.css";

export default function TableButtonsFuncionesAsociadas(
    funcionAsociada
) {
    const { promptComprar } = useContext(dataContext);

    return (
        <td key={"Accion"} data-label="Accion:" className={styles.tableBodyCell}>
            {funcionAsociada.AsientosDisponible > 0 ? (
                <ButtonWithoutRedirect
                    type="button"
                    buttonText="Comprar"
                    onClick={() => promptComprar(funcionAsociada)}
                />
            ) : (
                "ENTRADAS AGOTADAS"
            )}
        </td>
    )
}