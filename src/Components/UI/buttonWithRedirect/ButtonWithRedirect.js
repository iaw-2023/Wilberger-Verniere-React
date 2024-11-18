import { Link } from "react-router-dom";
import styles from "./ButtonWithRedirect.module.css";

export default function ButtonWithRedirect({
    redirectUrl,
    type,
    buttonText,
    onClick
}) {

    const getButtonStyle = () => {
        switch (type) {
            case "cancelar":
                return "btnCancelar";
            case "confirmar":
                return "btnConfirmar";
            case "login":
                return "btnLogin";
            case "mercadoPago":
                return "btnMercadoPago";
            default:
                return "btnDefault";
        };
    }

    const buttonStyle = getButtonStyle();

    return (
        <Link to={redirectUrl} className={`${styles.btnBase} ${styles[buttonStyle]}`} type={type} onClick={onClick}>
            {buttonText}
        </Link>
    );
}