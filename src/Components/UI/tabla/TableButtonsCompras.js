import styles from "./tabla.module.css";
import ButtonWithRedirect from "../buttonWithRedirect/ButtonWithRedirect";

export default function TableButtonsCompras(
    compra
) {
    const setCompraElegida = (compraElegida) => {
        sessionStorage.setItem("compraElegida", JSON.stringify(compraElegida));
    }

    return (
        <td key={"Accion"} data-label="Accion:" className={styles.tableBodyCell}>
            <ButtonWithRedirect
                type="default"
                buttonText="Ordenes Asociadas"
                redirectUrl='/ComprasAsociadas'
                onClick={setCompraElegida(compra)}
            />
        </td >
    )
}