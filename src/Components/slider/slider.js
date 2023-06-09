import React from 'react'
/*
* Este codigo fue tomado de la pagina de ejemplos de componentes bootstrap
* link: https://getbootstrap.com/docs/5.2/components/carousel/#usage
*/
function slider() {
  return (
    <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
                <img src="../images/im1.jpg" className="d-block w-30" alt="..."></img>
            </div>
            <div className="carousel-item">
                <img src="../images/im2.jpg" className="d-block w-30" alt="..."></img>
            </div>
            <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."></img>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default slider
