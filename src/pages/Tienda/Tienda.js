import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import CardList from '../../components/CardList/CardList';
import ItemList from '../../components/ItemList/ItemList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import initFacebookPixel from '../../components/FacebookPixel';
import { MemoizedBannerDiscount } from './MemoizedBannerDiscount';

import Image from 'react-bootstrap/Image';

import imgSomosArte from './img/somosarte.png';
import imgMysteryBoxBanner from './img/mysteryBoxBanner.png';

import geoImgDesk from './img/geo-desk.gif';
import geoImgTablet from './img/geo-tablet.gif';
import geoImgMobile from './img/geo-mobile.gif';
import gordoImgDesk from './img/comida-desk.gif';
import gordoImgTablet from './img/comida-tablet.gif';
import gordoImgMobile from './img/comida-mobile.gif';
import chidosImgDesk from './img/chidos-desk.gif';
import chidosImgTablet from './img/chidos-tablet.gif';
import chidosImgMobile from './img/chidos-mobile.gif';
import navidadImgDesk from './img/navidad-desk.png';
import navidadImgTablet from './img/navidad-tablet.png';
import navidadImgMobile from './img/navidad-mobile.png';
import ofertasImgDesk from './img/ofertas-desk.gif';
import ofertasImgTablet from './img/ofertas-tablet.gif';
import ofertasImgMobile from './img/ofertas-mobile.gif';
import paquetesImgDesk from './img/paquetes-desk.gif';
import paquetesImgTablet from './img/paquetes-tablet.gif';
import paquetesImgMobile from './img/paquetes-mobile.gif';
import profImgDesk from './img/prof-desk.gif';
import profImgTablet from './img/prof-tablet.gif';
import profImgMobile from './img/prof-mobile.gif';
import salvajesImgDesk from './img/animales-desk.gif';
import salvajesImgTablet from './img/animales-tablet.gif';
import salvajesImgMobile from './img/animales-mobile.gif';
import arteImgDesk from './img/arte-desk.gif';
import arteImgTablet from './img/arte-tablet.gif';
import arteImgMobile from './img/arte-mobile.gif';
import veganosImgDesk from './img/veganos-desk.gif';
import veganosImgTablet from './img/veganos-tablet.gif';
import veganosImgMobile from './img/veganos-mobile.gif';
import defaultImgDesk from './img/default-desk.png';
import defaultImgTablet from './img/default-tablet.png';
import defaultImgMobile from './img/default-mobile.png';
import deportivosImgDesk from './img/deportivos-desk.gif';
import deportivosImgTablet from './img/deportivos-tablet.gif';
import deportivosImgMobile from './img/deportivos-mobile.gif';
import deskVid from '../../shared/videos/1600x200.mp4';
import tabletVid from '../../shared/videos/1024x200.mp4';
import mobileVid from '../../shared/videos/500x150.mp4';

import geoImg from './img/encabezado-geo.png';
import comidaImg from './img/encabezado-comida.png';
import animalesImg from './img/encabezado-animales.png';
import chidosImg from './img/encabezado-chidos.png';
import ofertasImg from './img/encabezado-ofertas.png';
import todosImg from './img/encabezado-todos.png';
import saludablesImg from './img/encabezado-saludables.png';
import profImg from './img/encabezado-profesionales.png';
import deportivosImg from './img/encabezado-deportivos.png';

const imgsObject = {
  '19desk': geoImgDesk,
  '19tablet': geoImgTablet,
  '19mobile': geoImgMobile,
  '14desk': gordoImgDesk,
  '14tablet': gordoImgTablet,
  '14mobile': gordoImgMobile,
  '16desk': chidosImgDesk,
  '16tablet': chidosImgTablet,
  '16mobile': chidosImgMobile,
  '23desk': navidadImgDesk,
  '23tablet': navidadImgTablet,
  '23mobile': navidadImgMobile,
  '24desk': ofertasImgDesk,
  '24tablet': ofertasImgTablet,
  '24mobile': ofertasImgMobile,
  '18desk': paquetesImgDesk,
  '18tablet': paquetesImgTablet,
  '18mobile': paquetesImgMobile,
  '12desk': profImgDesk,
  '12tablet': profImgTablet,
  '12mobile': profImgMobile,
  '15desk': salvajesImgDesk,
  '15tablet': salvajesImgTablet,
  '15mobile': salvajesImgMobile,
  '22desk': arteImgDesk,
  '22tablet': arteImgTablet,
  '22mobile': arteImgMobile,
  '17desk': veganosImgDesk,
  '17tablet': veganosImgTablet,
  '17mobile': veganosImgMobile,
  '30desk': deportivosImgDesk,
  '30tablet': deportivosImgTablet,
  '30mobile': deportivosImgMobile,
  'desk': defaultImgDesk,
  'tablet': defaultImgTablet,
  'mobile': defaultImgMobile,
}

const headImages = {
  19: geoImg,
  14: comidaImg,
  16: chidosImg,
  24: ofertasImg,
  12: profImg,
  15: animalesImg,
  17: saludablesImg,
  18: imgMysteryBoxBanner,
  22: imgSomosArte,
  30: deportivosImg,
  0: todosImg
}
export default class Tienda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coleccionId: 9,
      colectionName: null,
      screenWidth: null
    };
    this.itemList = React.createRef();
  }

  componentDidMount() {
    initFacebookPixel();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    const size = window.innerWidth > 700 ? (
      window.innerWidth > 1200 ? 'desk' : 'tablet'
    ) : 'mobile';
    if (size !== this.state.screenWidth)
      this.setState({ screenWidth: size });
  }

  handleClick = (cardClicked) => {
    if (cardClicked) {
      this.setState({
        coleccionId: cardClicked.id,
        colectionName: cardClicked.children[0].innerText,
      });
      this.props.history.push(`/tienda/${cardClicked.id}`);
      this.itemList.current.handleFetchCalcetines(cardClicked.id);
    }
  };

  setScroll() {
    let scrollY = localStorage.getItem('shopScroll');
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }
  }

  setHeroImg = () => imgsObject[`${this.props.match.params.id || ''}${this.state.screenWidth}`]
  
  setHeroVideo = () => {
    const { screenWidth } = this.state;
    if (screenWidth === "desk") return deskVid
    else if (screenWidth === "tablet") return tabletVid
    else return mobileVid
  }

  setHeadImg = () => headImages[this.props.match.params.id || 0]

  render() {
    return (
      <>
        <Header title='Tienda' />
        <MemoizedBannerDiscount />
        {
          this.props.match.params.id
            ? <div className="plp-hero" style={{background: `url(${this.setHeroImg()})`}}></div>
            : <video src={this.setHeroVideo()} width="100%" muted autoPlay loop playsInline />
        }
        <CardList
          onClick={this.handleClick}
          urlColectionId={this.props.match.params.id}
        />
        <div className="encabezado">
          <img src={this.setHeadImg()} />
        </div>

        <ItemList
          coleccionId={this.state.coleccionId}
          ref={this.itemList}
          setScroll={this.setScroll}
          urlColectionId={this.props.match.params.id}
        />
      </>
    );
  }
}
