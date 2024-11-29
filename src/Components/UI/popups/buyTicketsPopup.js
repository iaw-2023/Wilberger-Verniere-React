import React, { useState } from "react";
import ButtonWithoutRedirect from "../buttons/ButtonWithoutRedirect";
import styles from "./popup.module.css";

export default function BuyTicketsPopup(
    props
) {
    const [errorMsg, setErrorMsg] = useState("");
    const { popupVisible, popupText, availableTickets, funcionElegida, onAccept, onClose } = props;

    const checkTicketAmount = () => {
        const inputValue = document.getElementById("cantidadTickets").value;
        if (inputValue === "" || isNaN(inputValue) || inputValue <= 0) {
            setErrorMsg("La cantidad de tickets debe ser un numero mayor a 0");
            return;
        }
        if (inputValue <= availableTickets) {
            setErrorMsg("");
            onAccept(funcionElegida, inputValue);
        } else {
            setErrorMsg("No hay suficientes tickets disponibles, ingrese una cantidad menor a " + availableTickets);
        }
    };

    const onClickClose = () => {
        setErrorMsg("");
        onClose();
    }

    return (
        <div>
            {popupVisible &&
                <div className={styles.popupBackgroundContainer}>
                    <div className={styles.popupContainer} >
                        <div className={styles.popupTextContainer}>
                            <p for="cantidadTickets" className={styles.popupTextContainerText}>
                                {popupText}
                            </p>
                            <input
                                className={styles.popupTextContainerInput}
                                placeholder="Ingrese la cantidad de tickets"
                                id="cantidadTickets"
                                type="number"
                                inputMode="numeric"
                            />
                            {errorMsg &&
                                <p className={styles.popupTextContainerErrorMessage}>
                                    {errorMsg}
                                </p>
                            }
                        </div>
                        <div className={styles.popupButtonsContainer}>
                            <ButtonWithoutRedirect
                                type="confirmar"
                                buttonText="Comprar tickets"
                                onClick={checkTicketAmount}
                            />
                            <ButtonWithoutRedirect
                                type="cancelar"
                                buttonText="Cerrar"
                                onClick={onClickClose}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}