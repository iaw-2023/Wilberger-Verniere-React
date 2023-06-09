import React from 'react'

function carouselItem(props) {
  return (
    <div>
        <div className={props.name} data-bs-interval="5000">
            <img src={props.route} className="d-block w-30" alt="imagen"></img>
        </div>
    </div>
  )
}

export default carouselItem
