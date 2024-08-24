import React from 'react'
import styles from './footer.module.css'


function Footer() {
  return (
    <div>
      <div className ="container">
        <div className={styles.footer}>
          Esta pagina se desarrollo por estudiantes de la Universidad Nacional del Sur (UNS), en el cursado de la materia Ingenieria de Aplicaciones Web.
          <br></br>
          Este sitio fue creado utilizando React.
        </div>
        <a href="https://react.dev">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="react-logo"
            className={styles.logo}
          />
        </a>
      </div>
    </div>
  )
}

export default Footer
