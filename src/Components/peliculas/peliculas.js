import React from 'react'

// data = Obtener datos de la API

function peliculas() {
  return (
    <div className="tabla">
      <table>
        <tr>
          <th>Nombre</th>
          <th>Genero</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.nombre}</td>
              <td>{val.genero}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default peliculas
