import '../../master.css';
import styles from "./carrito.module.css";

import React, { useEffect, useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import { dataContext } from '../context/dataContext';
import { useContext } from 'react';

function Ordenes() {
  const { cancelarOrden, limpiarCompra, confirmarCompra, pagarconMP } = useContext(dataContext);
  const [CARRITO_JSON, setCarrito] = useState(JSON.parse(sessionStorage.getItem('carrito')) || [])
  const [observacionesCompra, setObservacionesCompra] = useState('');

  useEffect(() => {
    setObservacionesCompra("");
  }, []);

  const actualizarCarrito = () => {
    const carr_JSON = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setCarrito(carr_JSON);
    console.log("Se actualizo el carrito en carrito.js", carr_JSON);
  }

  const confirmarCompraCarrito = async (observaciones, email, fechaCompra) => {
    try{
      await confirmarCompra(observaciones, email, fechaCompra);
      actualizarCarrito();
    } catch (error){
      console.error("Error al confirmar compra: ",error);
    }
    
  }

  const limpiarCompraCarrito = () => {
    limpiarCompra();
    actualizarCarrito();
  }

  const cancelarOrdenCarrito = (index) => {
    cancelarOrden(index);
    actualizarCarrito();
  }

  const pagarconMPCarrito = () => {
    pagarconMP();
    actualizarCarrito();
  }

  const handleSubmitObservaciones = (event) => 
  {
    event.preventDefault();
    setObservacionesCompra(event.target.value);
    console.log("observacionesCompra: ", observacionesCompra);
  }

  const getCurrentDate = (separator='-') => 
  {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
  }

  console.log("Carrito JSON: ",CARRITO_JSON);
  console.log("Guardo en sessionStorage: ",sessionStorage.getItem('userEmail'));

  return (
    <div className='wrapper'>
      <div className="tabla_container">
        <div className={styles.carritoInputWrapper}>
          <div className={styles.carritoObservaciones}>
            <label for="observaciones-texto" className={styles.carritoObservacionesText}>Observaciones:</label>   
            <input id="observaciones-texto" type="text" 
              className={styles.carritoInputObservaciones} 
              value={observacionesCompra} 
              onChange={handleSubmitObservaciones}
            />
          </div>
        </div>
        <table className="tabla">
          <thead className="tablaHead tablaOscuro">
            <tr>
              <th scope="col" className="tablaHeadElem">Pelicula:</th>
              <th scope="col" className="tablaHeadElem">Fecha:</th>
              <th scope="col" className="tablaHeadElem">Hora:</th>
              <th scope="col" className="tablaHeadElem">Sala numero:</th>
              <th scope="col" className="tablaHeadElem">Tickets Comprados:</th>
              <th scope="col" className="tablaHeadElem">Accion:</th>
            </tr>
          </thead>
          <tbody>
            { CARRITO_JSON.length>0 ? (
                CARRITO_JSON.map((carritoObj, index) => (
                  <tr className="tablaRow" key={index}>
                    <td className="tablaBodyElem"> {carritoObj.Pelicula}      </td>
                    <td className="tablaBodyElem"> {carritoObj.Fecha}         </td>
                    <td className="tablaBodyElem"> {carritoObj.Hora}          </td>
                    <td className="tablaBodyElem"> {carritoObj.NroSala}       </td>
                    <td className="tablaBodyElem"> {carritoObj.NroTickets}    </td>
                    <td className="tablaBodyElem"> 
                        <Button 
                        className={`button button_cancelar`} 
                        onClick={ ()=>cancelarOrdenCarrito(index) }>
                          Quitar
                        </Button>
                    </td>
                  </tr>
                ))
              ) : (<p>No hay items en el carrito.</p>)
            }
          </tbody>
        </table>
        { CARRITO_JSON.length>0 ? (
          <ButtonGroup className={styles.carritoBotonGroup}>
            <Button className={`button button_cancelar`} onClick={ ()=>limpiarCompraCarrito() }>Eliminar Compra</Button>
            <Button className={`button button_confirmar`} 
              onClick={ ()=>confirmarCompraCarrito(observacionesCompra, sessionStorage.getItem('userEmail'), getCurrentDate()) }>
              Confirmar Compra
            </Button>
            <Button className={`button button_mp`} onClick={ ()=>pagarconMPCarrito() }>Pagar con MercadoPago</Button>
          </ButtonGroup>
          ) : ("")
        }
      </div>
    </div>
  )
}

export default Ordenes