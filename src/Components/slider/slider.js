import React from 'react'
/*
* Este codigo fue tomado de la pagina de ejemplos de componentes bootstrap
* link: https://getbootstrap.com/docs/5.2/components/carousel/#usage
*/
function slider() {
  return (
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
                <img src="../images/im1.jpg" class="d-block w-100" alt="..."></img>
            </div>
            <div class="carousel-item">
                <img src="../images/im2.jpg" class="d-block w-100" alt="..."></img>
            </div>
            <div class="carousel-item">
                <img src="..." class="d-block w-100" alt="..."></img>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default slider
