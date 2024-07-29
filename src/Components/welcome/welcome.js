import styles from './welcome.module.css'

import Slider from '../slider/slider'
import slides from '../slider/mock.json'

function Welcome() {
    return (
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeTextContainer}>
          <h1>Bienvenido</h1>
          <p>Elija una opcion en la barra de navegacion.</p>
        </div>
        <div className={styles.sliderContainer}>
          <Slider slides={slides}/>
        </div>
      </div>
    );
}

export default Welcome