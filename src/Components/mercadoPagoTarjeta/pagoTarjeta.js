import MERCADOPAGO_API_KEY from "../../config/mercadopago";
import React, { useContext, useEffect } from 'react';
import { dataContext } from '../context/dataContext';
import apiClient from "../../Services/api";

function PagoTarjeta() {

  const { confirmarCompra, observacionesCompra } = useContext(dataContext);
  const inicializacionMercadoPago = () =>
  {
    const scriptMercadoPago = document.createElement("script");
    scriptMercadoPago.src = "https://sdk.mercadopago.com/js/v2";
    scriptMercadoPago.async = true;
    scriptMercadoPago.onload = () => initializeBrick();
    document.body.appendChild(scriptMercadoPago);

    return () => {
      document.body.removeChild(scriptMercadoPago);
    };
  }
  const getCurrentDate = (separator='-') => 
  {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
      
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
  }
  

  useEffect(() => {
    inicializacionMercadoPago();
  }, []);

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
              fetch(apiClient+"/process_payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cardData),
              })
                .then((response) => response.json())
                .then((response) => {
                  // get payment result
                  console.log("Resolve: ",response)
                  resolve();
                  console.log("Se confirma la compra con tarjeta");
                  confirmarCompra(observacionesCompra + "- PAGO TARJETA MP", sessionStorage.getItem('userEmail'), getCurrentDate());
                })
                .catch((error) => {
                  // get payment result error
                  console.log("Error pago: ",error);
                  reject();
                });
            });
          },
          onError: (error) => {
            // handle error
            console.log("Error :",error);
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

  return(
      <div>
            <div id="cardPaymentBrick_container"></div>
      </div>
  )
}

export default PagoTarjeta