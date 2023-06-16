import React, { useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import "./carrito.css";
import { dataContext } from '../context/dataContext';
import { useContext } from 'react';
    
export function useComprar(compra, tickets) {
  const { carrito, setCarrito } = useContext(dataContext);

  setCarrito( () => {
    compra.NroTickets = tickets;
    let found = false;
    let index = 0;
    console.log("Buscando elemento en carrito");
    while (!found && index < carrito.length){
      let aux = carrito.at(index);
      if (aux.Pelicula == compra.Pelicula && aux.Fecha == compra.Fecha && aux.NroSala == compra.NroSala && aux.Hora == compra.Hora){
        aux.NroTickets += compra.NroTickets;
        found = true;
        console.log("Se encontro en carrito y se sumaron tickets");
      }
      index++;
    }
    if (!found){
      console.log("No se encontro, se agrego al carrito");
      carrito.push(compra);
    }   
    console.log(carrito);
  });
}

function cancelarOrden(index)
{ 
  const { carrito } = useContext(dataContext);
  carrito.splice(index,1); 
  console.log(carrito); 
}

function confirmarCompra()
{
  const { carrito } = useContext(dataContext);
  console.log("data: [");
  console.log("Observaciones: "+observaciones);
  console.log("Email: "+email);
  console.log("FechaCompra: "+fechaCompra);
  console.log("Compras: ");
  { carrito && carrito.length>0 && carrito.map((compraObj,index) => (
    console.log(index+": "),
    console.log("Pelicula: "+compraObj.Pelicula),
    console.log("NroTickets: "+compraObj.NroTickets),
    console.log("Fecha: "+compraObj.Fecha),
    console.log("Hora: "+compraObj.Hora)
  ))};
  console.log("]");
  /* axios.post(
    'https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/compras/crear',
    { todo lo relacionado a la compra }
  ) */
   
}

function limpiarCompra()
{ 
  const { carrito, setCarrito } = useContext(dataContext);
  setCarrito( () => {
    carrito.splice(0,carrito.length); 
    console.log(carrito);
  });
}

function ordenes() {
  const { carrito } = useContext(dataContext);

  const [email, SetEmail] = useState("");
  const handleSubmitEmail= (event) => {
    event.preventDefault();
    SetEmail(event.target.value);
  }
  const [observaciones, SetObservaciones] = useState("");
  const handleSubmitObservaciones= (event) => {
    event.preventDefault();
    SetObservaciones(event.target.value);
  }

  return (
    <div className='wrapper'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className='input-wrapper'>
          <div className="email">
            <div className='email-text'>Email:</div>   
            <input type="text" className="input-email" value={email} onChange={handleSubmitEmail}/>
          </div>
          <div className="observaciones">
            <div className='observaciones-text'>Observaciones:</div>   
            <input type="text" className="input-observaciones" value={observaciones} onChange={handleSubmitObservaciones}/>
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
            { carrito && carrito.length>0 && carrito.map((compra,index) => (
              <tr className="tablaRow" key={index}>
                <th className="tablaH"> {compra.Pelicula}      </th>
                <th className="tablaH"> {compra.Fecha}         </th>
                <th className="tablaH"> {compra.Hora}          </th>
                <th className="tablaH"> {compra.NroSala}       </th>
                <th className="tablaH"> {compra.NroTickets}    </th>
                <th className="tablaH"> 
                    <Button className="quitar-orden" onClick={ ()=>cancelarOrden(index) }>Quitar</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonGroup className='boton-group'>
        <Button className="boton-cancelar" onClick={ ()=>limpiarCompra() }>Eliminar Compra</Button>
        <Button className="boton-enviar" onClick={ ()=>confirmarCompra() }>Confirmar Compra</Button>
      </ButtonGroup>
    </div>
  )
}

export default ordenes