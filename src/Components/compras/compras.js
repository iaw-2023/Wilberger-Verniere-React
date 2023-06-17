
import "./compras.css";
import React, { useState } from 'react'


function compras() {
  const [text, SetText] = useState("");
  const handleSubmit= (event) => {
    event.preventDefault();
    console.log(event.target.value);
    SetText(event.target.value);
  }

  return (
    <div className="form-div">
      <form className="formulario" onSubmit={handleSubmit}>
        <input type="text" className="input-email"/>
        <button type="submit" className="boton-enviar">Enviar</button>
      </form>
      <h1>
        {text} 
        {/* Cambiar que cuando oprima boton ahora se muestre una tabla con
        compras asociadas a ese email */}
      </h1>
    </div>
  )
}

export default compras
