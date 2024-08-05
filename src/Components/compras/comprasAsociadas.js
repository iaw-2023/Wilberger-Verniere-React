import '../../master.css';

import React, { useContext } from 'react'
import { dataContext } from "../context/dataContext";


function ComprasAsociadas() {
  const { compraElegida } = useContext(dataContext);

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
          { compraElegida.Compras && compraElegida.Compras.length>0 && compraElegida.Compras.map((compraObj,index) => (
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
