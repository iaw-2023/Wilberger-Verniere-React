import '../../master.css';
import styles from "./compras.module.css";

import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { dataContext } from "../context/dataContext";
import apiClient from '../../Services/api';

  
function Compras() {
  const [compra, setCompra] = useState([]);
  const [error, setError] = useState(null);
  const { setCompraElegida} = useContext(dataContext);

  useEffect(() => {
    fetchCompras();
  },[]);  

  console.log(sessionStorage.getItem('userEmail'));

  const fetchCompras = () => 
  {
    return apiClient.get("/rest/compras/asociadas", {
      params: {
        'email': sessionStorage.getItem('userEmail')
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    })
        .then((response) => {
            setCompra(response.data.data);
            setError(null);
        }).catch(setError);
  }

  if (error) return<p>OCURRIO UN ERROR AL PEDIR LAS COMPRAS</p>

  return (
    <div className={styles.comprasFormDiv}>
      <table className="tabla">
        <thead className="tablaHead tablaOscuro">
          <tr>
            <th scope="col" className="tablaHeadElem">Observaciones:</th>
            <th scope="col" className="tablaHeadElem">Fecha Creacion:</th>
            <th scope="col" className="tablaHeadElem">Accion:</th>
          </tr>
        </thead>
        <tbody>
          { compra && compra.length>0 && compra.map((compraObj,index) => (
            <tr className="tablaRow" key={index}>
              <th className="tablaBodyElem"> {compraObj.Observaciones} </th>
              <th className="tablaBodyElem"> {compraObj.FechaCompra} </th>
              <th className="tablaBodyElem"> 
                  <Link to='/ComprasAsociadas' 
                  onClick={ setCompraElegida(compraObj) }>
                    Ordenes Asociadas
                  </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Compras