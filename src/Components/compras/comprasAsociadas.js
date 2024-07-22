import '../../master.css';
import styles from "./compras.module.css";

import React, { useContext } from 'react'
import { dataContext } from "../context/dataContext";


function ComprasAsociadas() {
  const { compraElegida } = useContext(dataContext);

  return (
    <div className={styles.comprasFormDiv}>
      <table className="tabla dark:text-gray-400">
          <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="tablaH">Pelicula:</th>
              <th scope="col" className="tablaH">Fecha:</th>
              <th scope="col" className="tablaH">Hora:</th>
              <th scope="col" className="tablaH">Sala:</th>
              <th scope="col" className="tablaH">Tickets Comprados:</th>
            </tr>
          </thead>
          <tbody>
            { compraElegida.Compras && compraElegida.Compras.length>0 && compraElegida.Compras.map((compraObj,index) => (
              <tr className="tablaRow" key={index}>
                <th className="tablaH"> {compraObj.Funcion.Pelicula} </th>
                <th className="tablaH"> {compraObj.Funcion.Fecha} </th>
                <th className="tablaH"> {compraObj.Funcion.Hora} </th>
                <th className="tablaH"> {compraObj.Funcion.NroSala} </th>
                <th className="tablaH"> {compraObj.NroTickets} </th>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default ComprasAsociadas
