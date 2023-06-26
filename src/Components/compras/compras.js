import axios from "axios";
import "./compras.css";
import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { dataContext } from "../context/dataContext";

//{ compra && compra.length>0 && compra.map((compraObj: {Observaciones: String | null | undefined; FechaCompra: String},index) => (
  
function Compras() {
  const [compra, setCompra] = useState([]);
  const [error, setError] = useState(null);
  const [textEmail, setTextEmail] = useState("");
  const { setCompraElegida } = useContext(dataContext);

  const fetchCompras = () => 
  {
    console.log("SE ENVIO PEDIDO: ", textEmail)
    return axios.get('https://wilberger-verniere-laravel-zxwy-kw6w8m4ps-iawv.vercel.app/rest/compras/asociadas', {
      params: {
        'email': textEmail
      }
    })
        .then((response) => {
            setCompra(response.data.data);
            setError(null);
        }).catch(setError);
  }

  if (error) return<p>OCURRIO UN ERROR AL PEDIR LAS COMPRAS</p>

  //const handleTextEmail = (event: { preventDefault: () => void; target: { value: string; }; }) => 
  const handleTextEmail = (event) => 
  {
    event.preventDefault();
    console.log(event.target.value);
    setTextEmail(event.target.value);
  }

  return (
    <div className="form-div">
      <div className="formulario" onClick={ () => fetchCompras() }>
        Email:
        <input type="text" className="input-email" value={textEmail} onChange={handleTextEmail}/>
        { textEmail && <button className="boton-enviar">Enviar</button>}
      </div>
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