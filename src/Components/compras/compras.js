import axios from "axios";
import "./compras.css";
import React, { useState } from 'react'


function compras() {
  const [compra, setCompra] = useState([]);
  const [error, setError] = useState(null);
  const [textEmail, setTextEmail] = useState(null);

  const fetchCompras = (textEmail) => 
  {
    return axios.get('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/compras/asociadas', {
      params: {
        textEmail
      }
    })
        .then((response) => {
            setCompra(response.data.data);
            setError(null);
        }).catch(setError);
  }

  if (error) return<p>OCURRIO UN ERROR AL PEDIR LAS COMPRAS</p>

  const handleTextEmail = (event) => 
  {
    event.preventDefault();
    console.log(event.target.value);
    setTextEmail(event.target.value);
  }

  return (
    <div className="form-div">
      <form className="formulario" onSubmit={ () => fetchCompras(textEmail) }>
        <input type="text" className="input-email" value={textEmail} onChange={handleTextEmail}/>
        <button type="submit" className="boton-enviar">Enviar</button>
      </form>
      <table className="tabla dark:text-gray-400">
          <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="tablaH">Observaciones:</th>
              <th scope="col" className="tablaH">Accion:</th>
            </tr>
          </thead>
          <tbody>
            { compra && compra.length>0 && compra.map((compraObj,index) => (
              <tr className="tablaRow" key={index}>
                <th className="tablaH"> {compraObj.Observaciones} </th>
                <th className="tablaH"> 
                    <Button className="lista-orden">Ordenes Asociadas</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default compras
