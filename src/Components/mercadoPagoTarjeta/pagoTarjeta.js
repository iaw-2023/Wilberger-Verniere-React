import Script from 'next/script';
import { MercadoPagoConfig } from 'mercadopago';


function pagoTarjeta() {

    const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

    const payment = new Payment(client);
    payment.create({body: req.body})
    .then(function(response) {
        const { status, status_detail, id } = response.body;
        res.status(response.status).json({ status, status_detail, id });
    }).catch(function(error) {
        console.error(error);
    });

    const script = () => {
        const mp = new MercadoPago('YOUR_PUBLIC_KEY', { locale: 'es-AR' });
        const bricksBuilder = mp.bricks();
        const renderCardPaymentBrick = async (bricksBuilder) => {
            const settings = {
                initialization: {
                    amount: 100, // monto a ser pago
                    payer: {
                        email: sessionStorage.getItem('userEmail'),
                    },
                },
                customization: {
                    visual: {
                        hideFormTitle: true,
                        style: {
                            customVariables: {
                                theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                            }
                        }
                    },
                        paymentMethods: {
                            maxInstallments: 1,
                        }
                },
                callbacks: {
                    onReady: () => {
                        // callback llamado cuando Brick esté listo
                    },
                    onSubmit: (cardFormData) => {
                        //  callback llamado cuando el usuario haga clic en el botón enviar los datos
                        //  ejemplo de envío de los datos recolectados por el Brick a su servidor
                        return new Promise((resolve, reject) => {
                        fetch("/process_payment", {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(cardFormData)
                        })
                            .then((response) => {
                            // recibir el resultado del pago
                            resolve();
                            })
                            .catch((error) => {
                            // tratar respuesta de error al intentar crear el pago
                            reject();
                            })
                        });
                    },
                    onError: (error) => {
                        // callback llamado para todos los casos de error de Brick
                    },
                },
            };
            window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        };
        renderCardPaymentBrick(bricksBuilder);
    }

    return(
        <div>
            <Script src="https://sdk.mercadopago.com/js/v2"></Script>
            <div id="cardPaymentBrick_container"></div>
            { ()=> script() }
        </div>
    )
}

export default pagoTarjeta();