import MERCADOPAGO_API_KEY from "../../config/mercadopago";

//https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md VER PAGINA EJEMPLO
function pagoTarjeta() {

    <script src="https://sdk.mercadopago.com/js/v2"></script>

    const mp = new MercadoPago(MERCADOPAGO_API_KEY, { locale: 'es-AR' });
    const brickCardPayment = mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
        initialization: {
          amount: 100,
          payer: {
            email: "",
          },
        },
        callbacks: {
          onReady: () => {
            // handle form ready
          },
          onSubmit: (cardData) => {
            return new Promise((resolve, reject) => {
              fetch("/process_payment", {
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

    return(
        <div>
            { brickCardPayment }
        </div>
    )
}

export default pagoTarjeta();