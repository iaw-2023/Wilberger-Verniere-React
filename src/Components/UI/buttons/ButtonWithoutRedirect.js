import styles from "./Button.module.css";
import { Button } from 'react-bootstrap';

export default function ButtonWithoutRedirect({
    type,
    buttonText,
    onClick,
    disabled
}) {

    const getButtonStyle = () => {
        switch (type) {
            case "cancelar":
                return "btnCancelar";
            case "confirmar":
                return "btnConfirmar";
            case "login":
                if (disabled) { return "btnLoginDisabled"; }
                return "btnLogin";
            case "mercadoPago":
                return "btnMercadoPago";
            default:
                return "btnDefault";
        };
    }

    const buttonStyle = getButtonStyle();

    return (
        <Button className={`${styles.btnBase} ${styles[buttonStyle]}`} onClick={onClick} disabled={disabled}>
            {buttonText}
        </Button>
    );
}