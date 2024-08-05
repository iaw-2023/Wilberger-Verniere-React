import '../../master.css';
import styles from "./carrito.module.css";

import React, { useEffect, useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import { dataContext } from '../context/dataContext';
import { useContext } from 'react';

function Ordenes() {
  const {carrito, cancelarOrden, limpiarCompra, confirmarCompra, pagarconMP, observacionesCompra, setObservacionesCompra } = useContext(dataContext);
  //const [observaciones, SetObservaciones] = useState("");
  
  useEffect(() => {
    setObservacionesCompra("");
  }, []);

  const handleSubmitObservaciones = (event) => 
  {
    event.preventDefault();
    if(event.target.value) {
      //SetObservaciones(event.target.value);
      setObservacionesCompra(event.target.value);
    }
    else { 
      //SetObservaciones(""); 
      setObservacionesCompra("");
    }
    console.log("observacionesCompra: ",observacionesCompra);
  }

  const getCurrentDate = (separator='-') => 
  {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
  }

  console.log("Carrito: ",carrito);
  console.log("Guardo en sessionStorage: ",sessionStorage.getItem('userEmail'));

  return (
    <div className='wrapper'>
      <div className="tabla_container">
        <div className={styles.carritoInputWrapper}>
          <div className={styles.carritoObservaciones}>
            <label for="observaciones-texto" className={styles.carritoObservacionesText}>Observaciones:</label>   
            <input id="observaciones-texto" type="text" className={styles.carritoInputObservaciones} value={observacionesCompra} onChange={handleSubmitObservaciones}/>
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
            { carrito && carrito.length>0 && carrito.map((carritoObj, index) => (
              <tr className="tablaRow" key={index}>
                <td className="tablaBodyElem"> {carritoObj.Pelicula}      </td>
                <td className="tablaBodyElem"> {carritoObj.Fecha}         </td>
                <td className="tablaBodyElem"> {carritoObj.Hora}          </td>
                <td className="tablaBodyElem"> {carritoObj.NroSala}       </td>
                <td className="tablaBodyElem"> {carritoObj.NroTickets}    </td>
                <td className="tablaBodyElem"> 
                    <Button 
                    className={`button button_cancelar`} 
                    onClick={ ()=>cancelarOrden(index) }>
                      Quitar
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonGroup className={styles.carritoBotonGroup}>
        { carrito && carrito.length>0 &&
          <Button className={`button button_cancelar`} 
          onClick={ ()=>limpiarCompra() }>
            Eliminar Compra
          </Button>
        }
        { carrito && carrito.length>0 && 
          <Button className={`button button_confirmar`}
          onClick={ ()=>confirmarCompra(observacionesCompra, sessionStorage.getItem('userEmail'), getCurrentDate()) }>
            Confirmar Compra
          </Button>
        }
        { carrito && carrito.length>0 && 
          <Button className={`button button_mp`} 
          onClick={ ()=>pagarconMP() }>
            Pagar con MercadoPago
          </Button>
        }
      </ButtonGroup>
    </div>
  )
}

export default Ordenes