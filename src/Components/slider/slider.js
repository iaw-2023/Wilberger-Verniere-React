import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import './slider.css';
import Image from 'next/image';

function Slider({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    console.log('selected index: ', selectedIndex)
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
    <Carousel activeIndex={index}
              onSelect={handleSelect}
              nextIcon={<span aria-hidden="true" className="carousel-control-next-icon changed" />}
    >
      {slides.map((slide) => (
        
        <Carousel.Item key={slide.image} interval={slide.interval}>
          <Image
            className="d-block w-95"
            src={slide.image}
            alt="First slide"
            width = "1020"
            height = "600"
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.subTitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
        
      ))}
    </Carousel>
    </div>
  );
}

export default Slider;


