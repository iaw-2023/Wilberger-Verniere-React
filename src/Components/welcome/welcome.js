import Slider from '../slider/slider'

function Welcome() {
    return (
      <>
        <h1>Bienvenido</h1>
        <p>Elija una opcion en la barra de navegacion.</p>
        <div className = "image-slider">
          <Slider/>
        </div>
      </>
    );
}

export default Welcome