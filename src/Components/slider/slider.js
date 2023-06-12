import Script from 'next/script';
import React from 'react'
import CarouselItem from './carouselItem'
/*
* Este codigo fue tomado de la pagina de ejemplos de componentes bootstrap
* link: https://getbootstrap.com/docs/5.2/components/carousel/#usage
*/
function slider() {
  return (
    <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
        <div className="carousel-inner">
            <CarouselItem name ={"carousel-item active"} route={"../images/im1.jpg"}/>
            <CarouselItem name ={"carousel-item"} route={"../images/im2.jpg"}/>
            <CarouselItem name ={"carousel-item"} route={"../images/im3.jpg"}/>
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


