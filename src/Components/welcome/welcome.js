import styles from './welcome.module.css'

import Slider from '../slider/slider'
import slides from '../slider/mock.json'

function Welcome() {
    return (
      <div className={styles.sliderContainer}>
        <Slider slides={slides}/>
      </div>
    );
}

export default Welcome