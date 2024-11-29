import '../../master.css';
import styles from './funciones.module.css';

import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from '../context/dataContext';
import apiClient from '../../Services/api';
import ButtonWithoutRedirect from '../UI/buttons/ButtonWithoutRedirect';
import BuyTicketsPopup from '../UI/popups/buyTicketsPopup';

function Funciones() {
    const [funcion, setFuncion] = useState([])
    const [error, setError] = useState(null);
    const [popupTicketsVisible, setPopupTicketsVisible] = useState(false);
    const [funcionElegida, setFuncionElegida] = useState({});
    const { comprar } = useContext(dataContext);

    const fetchFuncion = () => {
        return apiClient.get("/rest/funciones")
            .then((response) => {
                setFuncion(response.data.data);
                setError(null);
            }).catch(setError);
    }

    useEffect(() => {
        fetchFuncion();
    }, []);



    const onClickComprar = (funcion) => {
        console.log("Abrir popup comprar tickets");
        setFuncionElegida(funcion);
        setPopupTicketsVisible(true);
    }

    const onClickBuyTickets = (funcion, cantidadTickets) => {
        comprar(funcion, cantidadTickets);
        setPopupTicketsVisible(false);
    }

    const onClosePopup = () => setPopupTicketsVisible(false);

    if (error) return <p>OCURRIO UN ERROR AL PEDIR LAS FUNCIONES</p>

    return (
        <div>
            <div className="tabla_container">
                <table className="tabla">
                    <thead className="tablaHead tablaOscuro">
                        <tr>
                            <th scope="col" className="tablaHeadElem">Pelicula:</th>
                            <th scope="col" className="tablaHeadElem">Fecha:</th>
                            <th scope="col" className="tablaHeadElem">Hora:</th>
                            <th scope="col" className="tablaHeadElem">Sala numero:</th>
                            <th scope="col" className="tablaHeadElem">Asientos Disponibles:</th>
                            <th scope="col" className="tablaHeadElem">Accion:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcion && funcion.length > 0 ? (
                            funcion.map((funcionObj, index) => {
                                const tablaParcial = (
                                    <>
                                        <td data-label="Pelicula:" className="tablaBodyElem"> {funcionObj.Pelicula} </td>
                                        <td data-label="Fecha:" className="tablaBodyElem"> {funcionObj.Fecha} </td>
                                        <td data-label="Hora:" className="tablaBodyElem"> {funcionObj.Hora} </td>
                                        <td data-label="Sala numero:" className="tablaBodyElem"> {funcionObj.NroSala} </td>
                                        <td data-label="Asientos Disponibles:" className="tablaBodyElem"> {funcionObj.AsientosDisponible} </td>
                                    </>
                                );
                                return (
                                    <tr className={`tablaRow ${funcionObj.AsientosDisponible > 0 ? '' : styles.sinAsientos}`} key={index}>
                                        {tablaParcial}
                                        <td data-label="Accion:" className="tablaBodyElem">
                                            {funcionObj.AsientosDisponible > 0 ? (
                                                <ButtonWithoutRedirect
                                                    type="default"
                                                    buttonText="Comprar"
                                                    onClick={() => onClickComprar(funcionObj)}
                                                />
                                            ) : (
                                                "ENTRADAS AGOTADAS"
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        )
                            : (
                                <tr>
                                    <td colSpan="6" className="alertaDiv">NO HAY FUNCIONES DISPONBILES</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <BuyTicketsPopup
                popupVisible={popupTicketsVisible}
                popupText={"Ingrese la cantidad de tickets que desea comprar, hay " + funcionElegida.AsientosDisponible + " asientos disponibles"}
                availableTickets={funcionElegida.AsientosDisponible}
                funcionElegida={funcionElegida}
                onAccept={(funcion, cantidadTickets) => onClickBuyTickets(funcion, cantidadTickets)}
                onClose={onClosePopup}
            />
        </div>
    )
}

export default Funciones