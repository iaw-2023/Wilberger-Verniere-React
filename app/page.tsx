
import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import Footer from "../src/Components/footer/footer";


export default function welcome(){

  return(
    <main>
      <div>
        <div className="welcome-container">
          <h1>Bienvenido a WebCines!</h1>
        </div>
        <div className="content-container">
        <p></p>
        <p> Para cualquier consulta o necesidad puede contactarse con los desarrolladores de esta pagina en:</p>
        <ul>
          <li>Nombre: Wilberger Matias</li>
          <li>Email: email@example.com</li>
          <li>Name: Verniere Martin</li>
          <li>Email: email2@example.com</li>
        </ul>
        </div>
      </div>

        <div className = "link-container">
          <Link href="../App#">
            Visite nuestra pagina.
          </Link>
        </div>
        <Footer/>
    </main>
  )
}