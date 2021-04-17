import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import './Card.css';

import ofertaImg from '../../pages/Tienda/img/ofertas-vector.png';
import navideñoImg from '../CardList/img/NAVIDEÑO negro.png';
import profesionalesImg from '../../pages/Tienda/img/profesionales-vector.png';
import arteImg from '../../pages/Tienda/img/somos-arte-vector.png';
import glotonesImg from '../../pages/Tienda/img/comida-vector.png';
import salvajesImg from '../../pages/Tienda/img/animales-vector.png';
import chidosImg from '../../pages/Tienda/img/chidos-vector.png';
import veganosImg from '../../pages/Tienda/img/saludables-vector.png';
import geoImg from '../../pages/Tienda/img/geometricos-vector.png';
import paqueteImg from '../../pages/Tienda/img/paquetes-vector.png';
import deportivoImg from '../../pages/Tienda/img/deportivos-vector.png';

const catImages = {
  'Profesionales ': profesionalesImg,
  'Comida ': glotonesImg,
  'Animales': salvajesImg,
  'Los chidos': chidosImg,
  'Saludables ': veganosImg,
  'Paquetes': paqueteImg,
  'Geométricos ': geoImg,
  'Somos arte ': arteImg,
  'Navideños': navideñoImg,
  'Ofertas': ofertaImg,
  'Deportivos': deportivoImg
}

export default class CardC extends Component {
  render() {
    return (
      <div className='cardContainer' onClick={this.props.onClick}>
        <Card
          className={`bsCard ${this.props.isSelected && 'bsCardSelected'}`}
          id={this.props.id}
        >
          <Card.Title>{this.props.cardTitle}</Card.Title>
          <img src={catImages[this.props.cardTitle]} />
        </Card>
      </div>
    );
  }
}
