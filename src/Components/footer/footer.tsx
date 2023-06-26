import React from 'react'
import './footer.css'


function Footer() {
  return (
    <div>
      <div className ="container">
        <div className="footer">
          Este sitio fue creado utilizando React.
        </div>
        <a href="https://react.dev">
          <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="react-logo"
          className="logo"
          />
        </a>
      </div>
    </div>
  )
}

export default Footer
