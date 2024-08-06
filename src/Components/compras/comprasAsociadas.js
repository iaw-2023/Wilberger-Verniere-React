import '../../master.css';

import React from 'react'

function ComprasAsociadas() {
  
  const COMPRA_ELEGIDA_JSON = JSON.parse(sessionStorage.getItem("peliculaElegida"));

  return (
    <div className="tabla_container">
      <table className="tabla">
        <thead className="tablaHead tablaOscuro">
          <tr>
            <th scope="col" className="tablaHeadElem">Pelicula:</th>
            <th scope="col" className="tablaHeadElem">Fecha:</th>
            <th scope="col" className="tablaHeadElem">Hora:</th>
            <th scope="col" className="tablaHeadElem">Sala:</th>
            <th scope="col" className="tablaHeadElem">Tickets Comprados:</th>
          </tr>
        </thead>
        <tbody>
          { COMPRA_ELEGIDA_JSON.Compras && COMPRA_ELEGIDA_JSON.Compras.length>0 && COMPRA_ELEGIDA_JSON.Compras.map((compraObj,index) => (
            <tr className="tablaRow" key={index}>
              <td className="tablaBodyElem"> {compraObj.Funcion.Pelicula} </td>
              <td className="tablaBodyElem"> {compraObj.Funcion.Fecha} </td>
              <td className="tablaBodyElem"> {compraObj.Funcion.Hora} </td>
              <td className="tablaBodyElem"> {compraObj.Funcion.NroSala} </td>
              <td className="tablaBodyElem"> {compraObj.NroTickets} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComprasAsociadas
