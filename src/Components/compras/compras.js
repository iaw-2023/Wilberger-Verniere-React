import "./compras.css";
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
    <div className="form-div">
      <table className="tabla dark:text-gray-400">
          <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="tablaH">Observaciones:</th>
              <th scope="col" className="tablaH">Fecha Creacion:</th>
              <th scope="col" className="tablaH">Accion:</th>
            </tr>
          </thead>
          <tbody>
            { compra && compra.length>0 && compra.map((compraObj,index) => (
              <tr className="tablaRow" key={index}>
                <th className="tablaH"> {compraObj.Observaciones} </th>
                <th className="tablaH"> {compraObj.FechaCompra} </th>
                <th className="tablaH"> 
                    <Link to='/ComprasAsociadas' className="lista-orden" onClick={ setCompraElegida(compraObj) }>Ordenes Asociadas</Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Compras