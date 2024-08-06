import '../../master.css';
import styles from "./carrito.module.css";

import React, { useEffect } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import { dataContext } from '../context/dataContext';
import { useContext } from 'react';

function Ordenes() {
  const { cancelarOrden, limpiarCompra, confirmarCompra, pagarconMP } = useContext(dataContext);
  const CARRITO_JSON = JSON.parse(sessionStorage.getItem('carrito')) || [];
  const [observacionesCompra, setObservacionesCompra] = useState('');

  useEffect(() => {
    setObservacionesCompra("");
  }, []);

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
              <ul>
                { CARRITO_JSON.map((carritoObj, index) => (
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
                <ButtonGroup className={styles.carritoBotonGroup}>
                  <Button className={`button button_cancelar`} onClick={ ()=>limpiarCompra() }>Eliminar Compra</Button>
                  <Button className={`button button_confirmar`} 
                    onClick={ ()=>confirmarCompra(observacionesCompra, sessionStorage.getItem('userEmail'), getCurrentDate()) }>
                    Confirmar Compra
                  </Button>
                  <Button className={`button button_mp`} onClick={ ()=>pagarconMP() }>Pagar con MercadoPago</Button>
                </ButtonGroup>
              </ul>
              ) : (<p>No hay items en el carrito.</p>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Ordenes