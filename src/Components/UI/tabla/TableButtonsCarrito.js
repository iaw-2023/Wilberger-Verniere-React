import ButtonWithoutRedirect from "../buttonWithoutRedirect/ButtonWithoutRedirect";
import styles from "./tabla.module.css";

export default function TableButtonsCarrito(
    index,
    onClickCancelarOrden
) {
    return (
        <td key={"Accion"} data-label="Accion:" className={styles.tableBodyCell}>
            <ButtonWithoutRedirect
                type="cancelar"
                buttonText="Quitar"
                onClick={() => onClickCancelarOrden(index)}
            />
        </td>
    )
}