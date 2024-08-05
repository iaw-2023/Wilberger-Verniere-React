import '../../master.css';

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

  console.log("Guardo en sessionStorage: ", sessionStorage.getItem('userEmail'));

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
    <div className="tabla_container">
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
              <td data-label="Observaciones:" className="tablaBodyElem"> {compraObj.Observaciones} </td>
              <td data-label="Fecha Creacion:" className="tablaBodyElem"> {compraObj.FechaCompra} </td>
              <td data-label="Accion:" className="tablaBodyElem"> 
                  <Link to='/ComprasAsociadas'
                  className="button"
                  onClick={ setCompraElegida(compraObj) }>
                    Ordenes Asociadas
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Compras