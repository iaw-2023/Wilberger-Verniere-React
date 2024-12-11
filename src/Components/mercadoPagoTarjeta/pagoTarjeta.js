import MERCADOPAGO_API_KEY from "../../config/mercadopago";
import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from '../context/dataContext';
import apiClient from "../../Services/api";
import { useNavigate } from "react-router-dom";
import ResponseMPPopup from "../UI/popups/responseMPPopup";

function PagoTarjeta() {

  const { confirmarCompra, observacionesCompra } = useContext(dataContext);
  const [errorMPPopupVisible, setErrorMPPopupVisible] = useState(false);
  const [errorMPPopupText, setErrorMPPopupText] = useState("");

  const navigate = useNavigate();

  const inicializacionMercadoPago = () => {
    const scriptMercadoPago = document.createElement("script");
    scriptMercadoPago.src = "https://sdk.mercadopago.com/js/v2";
    scriptMercadoPago.async = true;
    scriptMercadoPago.onload = () => initializeBrick();
    document.body.appendChild(scriptMercadoPago);

    return () => {
      document.body.removeChild(scriptMercadoPago);
    };
  }
  const getCurrentDate = (separator = '-') => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
  }

  useEffect(() => {
    inicializacionMercadoPago();
  }, []);

  const handleResponseMP = (resolve, response) => {
    switch (response.data.status) {
      case "approved":
        console.log("Se confirma la compra con tarjeta");
        setErrorMPPopupVisible(false);
        setErrorMPPopupText("");
        resolve();
        confirmarCompra(observacionesCompra + "- PAGO TARJETA MP", sessionStorage.getItem('userEmail'), getCurrentDate());
        navigate("/carrito");
        break;
      case "in_process":
        setErrorMPPopupText("Se esta procesando tu pago");
        setErrorMPPopupVisible(true);
        break;
      case "pending":
        setErrorMPPopupText("El pago esta pendiente");
        setErrorMPPopupVisible(true);
        break;
      case "rejected":
        resolveErrorText(response.data.status_detail);
        setErrorMPPopupVisible(true);
        break;
      default:
        resolveErrorText("El estado de la respuesta es desconocido");
        setErrorMPPopupVisible(true);
        break;
    }
  }

  const resolveErrorText = (responseStatus) => {
    let text = "";
    switch (responseStatus) {
      case "cc_rejected_insufficient_amount":
        text = "Tu tarjeta no tiene fondos suficientes.";
        break;
      case "cc_rejected_blacklist":
        text = "Tu tarjeta ha sido rechazada.";
        break;
      case "cc_rejected_bad_filled_date":
        text = "La fecha de vencimiento es incorrecta.";
        break;
      case "cc_rejected_bad_filled_other":
        text = "La informacion de tu tarjeta es incorrecta.";
        break;
      case "cc_rejected_max_attempts":
        text = "Has superado el limite de intentos.";
        break;
      case "payment_method_not_allowed":
        text = "El medio de pago seleccionado no esta permitido.";
        break;
      default:
        text = "Error al realizar el pago con tarjeta.";
    }
    setErrorMPPopupText(text);
  }

  const initializeBrick = () => {
    const mp = new MercadoPago(MERCADOPAGO_API_KEY, { locale: 'es-AR' });
    mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
      initialization: {
        amount: 100,
        payer: {
          email: sessionStorage.getItem('userEmail'),
        },
      },
      callbacks: {
        onReady: () => {
          // handle form ready
        },
        onSubmit: (cardData) => {
          return new Promise((resolve, reject) => {
            console.log("CardData: ",cardData);
            const payload = {
              ...cardData,
              cardholderName: cardData.first_name,
            };
            console.log("Payload: ", payload);
            apiClient.post("rest/process_payment",
              payload,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
              })
              .then((response) => {
                console.log("Resolve: ", response)
                handleResponseMP(resolve, response);
              })
              .catch((error) => {
                // get payment result error
                console.log("Error pago: ", error);
                reject();
              });
          });
        },
        onError: (error) => {
          // handle error
          console.log("Error :", error);
        },
      },
      customization: {
        visual: {
          style: {
            customVariables: {
              theme: 'default',
            }
          }
        },
        paymentMethods: {
          maxInstallments: 1,
        }
      },
    });
  }

  const onClosePopup = () => {
    setErrorMPPopupVisible(false);
    setErrorMPPopupText("");
    console.log("No se realizo el pago con tarjeta");
    navigate("/carrito");
  }

  return (
    <div>
      <div id="cardPaymentBrick_container"></div>
      <ResponseMPPopup
        popupVisible={errorMPPopupVisible}
        onClose={onClosePopup}
        popupText={errorMPPopupText}
      />
    </div>
  )
}

export default PagoTarjeta