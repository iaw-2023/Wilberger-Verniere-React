import '../../master.css';

import React, { useEffect, useState } from 'react'
import apiClient from '../../Services/api';
import ButtonWithRedirect from '../UI/buttons/ButtonWithRedirect';


function Compras() {
  const [compra, setCompra] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompras();
  }, []);

  console.log("Guardo en sessionStorage: ", sessionStorage.getItem('userEmail'));

  const fetchCompras = () => {
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

  if (error) return <p>OCURRIO UN ERROR AL PEDIR LAS COMPRAS</p>

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
          {(compra && compra.length > 0) ?
            (compra.map((compraObj, index) => (
              <tr className="tablaRow" key={index}>
                <td data-label="Observaciones:" className="tablaBodyElem"> {compraObj.Observaciones} </td>
                <td data-label="Fecha Creacion:" className="tablaBodyElem"> {compraObj.FechaCompra} </td>
                <td data-label="Accion:" className="tablaBodyElem">
                  <ButtonWithRedirect
                    type="default"
                    buttonText="Ordenes Asociadas"
                    redirectUrl={`/ComprasAsociadas`}
                    onClick={() => sessionStorage.setItem("compraElegida", JSON.stringify(compraObj))}
                  />
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="3" className="alertaDiv">NO HAY COMPRAS ASOCIADAS A ESTA CUENTA</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Compras