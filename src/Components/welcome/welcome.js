import Slider from '../slider/slider'
import slides from '../slider/mock.json'

function Welcome() {
    return (
      <>
        <h1>Bienvenido</h1>
        <p>Elija una opcion en la barra de navegacion.</p>
        <div className = "image-slider">
          <Slider slides = {slides}/>
        </div>
      </>
    );
}

export default Welcome