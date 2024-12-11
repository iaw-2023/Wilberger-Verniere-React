import React from "react";
import ButtonWithoutRedirect from "../buttons/ButtonWithoutRedirect";
import styles from "./popup.module.css";

export default function ResponseMPPopup(
    props
) {
    const { popupVisible, popupText, onClose } = props;

    return (
        <div>
            {popupVisible &&
                <div className={styles.popupBackgroundContainer}>
                    <div className={styles.popupContainer} >
                        <div className={styles.popupTextContainer}>
                            <p className={styles.popupTextContainerText}>
                                {popupText}
                            </p>
                        </div>
                        <div className={styles.popupButtonsContainer}>
                            <ButtonWithoutRedirect
                                type="confirmar"
                                buttonText="Aceptar"
                                onClick={onClose}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}