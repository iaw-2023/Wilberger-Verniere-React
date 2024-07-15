import '../../master.css';
import styles from "./carrito.module.css";

import React, { useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import { dataContext } from '../context/dataContext';
import { useContext } from 'react';
import { PagoTarjetaModal } from '../mercadoPagoTarjeta/pagoTarjetaModal';

function Ordenes() {
  const {carrito, cancelarOrden, limpiarCompra, confirmarCompra } = useContext(dataContext);
  const [observaciones, SetObservaciones] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const handleSubmitObservaciones = (event) => 
  {
    event.preventDefault();
    if(event.target.value) {SetObservaciones(event.target.value);}
    else { SetObservaciones(""); }
    console.log(observaciones);
  }

  const getCurrentDate = (separator='-') => 
  {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
  }

  const openModal = () => { setModalIsOpen(true); }
  const closeModal = () => { setModalIsOpen(false); }

  console.log(carrito);
  console.log(sessionStorage.getItem('userEmail'));

  return (
    <div className='wrapper'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className={styles.carritoInputWrapper}>
          <div className={styles.carritoObservaciones}>
            <div className={styles.carritoObservacionesText}>Observaciones:</div>   
            <input type="text" className={styles.carritoInputObservaciones} value={observaciones} onChange={handleSubmitObservaciones}/>
          </div>
        </div>
        <table className="tabla dark:text-gray-400">
          <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="tablaH">Pelicula:</th>
              <th scope="col" className="tablaH">Fecha:</th>
              <th scope="col" className="tablaH">Hora:</th>
              <th scope="col" className="tablaH">Sala numero:</th>
              <th scope="col" className="tablaH">Tickets Comprados:</th>
              <th scope="col" className="tablaH">Accion:</th>
            </tr>
          </thead>
          <tbody>
            { carrito && carrito.length>0 && carrito.map((carritoObj, index) => (
              <tr className="tablaRow" key={index}>
                <th className="tablaH"> {carritoObj.Pelicula}      </th>
                <th className="tablaH"> {carritoObj.Fecha}         </th>
                <th className="tablaH"> {carritoObj.Hora}          </th>
                <th className="tablaH"> {carritoObj.NroSala}       </th>
                <th className="tablaH"> {carritoObj.NroTickets}    </th>
                <th className="tablaH"> 
                    <Button className={styles.carritoBotonQuitarOrden} onClick={ ()=>cancelarOrden(index) }>Quitar</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonGroup className={styles.carritoBotonGroup}>
        { carrito && carrito.length>0 &&
          <Button className={styles.carritoBotonCancelar} onClick={ ()=>limpiarCompra() }>Eliminar Compra</Button>
        }
        { carrito && carrito.length>0 && 
          <Button className={styles.carritoBotonEnviar} onClick={ ()=>confirmarCompra(observaciones, sessionStorage.getItem('userEmail'), getCurrentDate()) }>Confirmar Compra</Button>
        }
        { carrito && carrito.length>0 && 
           <div>
            <Button className={styles.carritoBotonMP} onClick={openModal}>Pagar con MercadoPago</Button>
            <PagoTarjetaModal isOpen={modalIsOpen} onRequestClose={closeModal}/>
           </div>
        }
      </ButtonGroup>
    </div>
  )
}

export default Ordenes