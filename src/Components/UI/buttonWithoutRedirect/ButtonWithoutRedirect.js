import styles from "./ButtonWithoutRedirect.module.css";
import {Button} from 'react-bootstrap';

export default function ButtonWithoutRedirect({
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
        <Button className={`${styles.btnBase} ${styles[buttonStyle]}`} type={type} onClick={onClick}>
            {buttonText}
        </Button>
    );
}