import React from 'react'


function ordenes() {
  return (
    <div>
      <div>Aca se muestra la lista de compras a confirmar</div>
      <form action="https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/compras/crear" method='PUT' enctype="multipart/form-data">
        <div className='tabla-ordenes'></div>
        <button type='submit'>Confirmar</button>
      </form>
    </div>
  )
}

export default ordenes
