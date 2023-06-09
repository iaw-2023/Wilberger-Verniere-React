import React from 'react'
import './footer.css'


function footer() {
  return (
    <div>
      <div className="footer">
        Este sitio fue creado utilizando React.
      </div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="react-logo"
        className="logo"
      />
    </div>
  )
}

export default footer
