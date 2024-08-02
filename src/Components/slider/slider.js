import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import styles from './slider.module.css';

function Slider({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    console.log('selected index: ', selectedIndex)
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel activeIndex={index} onSelect={handleSelect} nextIcon={<span aria-hidden="true" className={styles.carouselnextImageIcon} />}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.image} interval={slide.interval}>
            <img className={styles.carouselImage}
              src={slide.image}
              alt={`Portada de la pelicula: ${slide.title}`}
            />
            <Carousel.Caption>
              <div className={styles.carouselCaptionContainer}>
                <div className={styles.carouselTitleCaption}>{slide.title}</div>
                <div className={styles.CarouselSubtitleCaption}>{slide.subTitle}</div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;