import '../../master.css';
import styles from "./compras.module.css";

import React, { useContext } from 'react'
import { dataContext } from "../context/dataContext";


function ComprasAsociadas() {
  const { compraElegida } = useContext(dataContext);

  return (
    <div className={styles.comprasFormDiv}>
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
              <th className="tablaBodyElem"> {compraObj.Funcion.Pelicula} </th>
              <th className="tablaBodyElem"> {compraObj.Funcion.Fecha} </th>
              <th className="tablaBodyElem"> {compraObj.Funcion.Hora} </th>
              <th className="tablaBodyElem"> {compraObj.Funcion.NroSala} </th>
              <th className="tablaBodyElem"> {compraObj.NroTickets} </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComprasAsociadas
