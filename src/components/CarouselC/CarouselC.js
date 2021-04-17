import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Webapi from '../../api/Webapi';

import imgborreguitos from './images/borreguitos.jpg';
import imgborreguitoshombre from './images/borreguitos_modelo_hombre.jpg';
import imgborreguitosmujer from './images/borreguitos_modelo_mujer.jpg';

import './CarouselC.css';

export default function CarouselC(props) {
  const api = new Webapi();
  return (
    <Carousel interval={5000}>
      {props.img.length
        ? props.img.map((i, index) => (
            <Carousel.Item key={index}>
              <div
                className='img d-block w-100'
                style={{
                  background: `url(${api.resolverUrlImagen(i.nombreImagen)})`,
                }}
              ></div>
            </Carousel.Item>
          ))
        : [imgborreguitos, imgborreguitoshombre, imgborreguitosmujer].map(
            (i, index) => <Carousel img={i} />
          )}
    </Carousel>
  );
}
