import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { MemoizedBannerDiscount } from '../Tienda/MemoizedBannerDiscount';

import { Carousel } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Swal from 'sweetalert2';
import ReactPixel from 'react-facebook-pixel';

import FlipNumbers from "react-flip-numbers";

import { Slider } from '@lifarl/react-scroll-snap-slider';

import Webapi from '../../api/Webapi';

// import imgParallax1 from './img/parallax1-desk.png';
// import imgParallax2 from './img/parallax2-desk.png';
// import imgParallax3 from './img/parallax3-desk.png';
// import imgParallax4 from './img/parallax4-desk.png';
// import imgParallax5 from './img/parallax5-desk.png';
import imgParallax6 from './img/parallax6-desk.png';
import imgParallaxs2 from './img/parallax-s2-desk.png';
import imgParallaxs3 from './img/parallax-s3-desk.png';
// import imgParallaxTablet1 from './img/parallax1-tablet.png';
// import imgParallaxTablet2 from './img/parallax2-tablet.png';
// import imgParallaxTablet3 from './img/parallax3-tablet.png';
// import imgParallaxTablet4 from './img/parallax4-tablet.png';
// import imgParallaxTablet5 from './img/parallax5-tablet.png';
import imgParallaxTablet6 from './img/parallax6-tablet.png';
import imgParallaxTablets2 from './img/parallax-s2-tablet.png';
import imgParallaxTablets3 from './img/parallax-s3-tablet.png';
// import imgParallaxMobile1 from './img/parallax1-mobile.png';
// import imgParallaxMobile2 from './img/parallax2-mobile.png';
// import imgParallaxMobile3 from './img/parallax3-mobile.png';
// import imgParallaxMobile4 from './img/parallax4-mobile.png';
// import imgParallaxMobile5 from './img/parallax5-mobile.png';
import imgParallaxMobile6 from './img/parallax6-mobile.png';
import imgParallaxMobiles2 from './img/parallax-s2-mobile.png';
import imgParallaxMobiles3 from './img/parallax-s3-mobile.png';

import imgCatDesk1 from './img/cat1-desk.png';
import imgCatDesk2 from './img/cat2-desk.png';
import imgCatDesk3 from './img/cat3-desk.png';
import imgCatDesk4 from './img/cat4-desk.png';
import imgCatDesk5 from './img/cat5-desk.png';

import imgCatTablet1 from './img/cat1-tablet.png';
import imgCatTablet2 from './img/cat2-tablet.png';
import imgCatTablet3 from './img/cat3-tablet.png';
import imgCatTablet4 from './img/cat4-tablet.png';
import imgCatTablet5 from './img/cat5-tablet.png';

import imgCatMobile1 from './img/cat1-mobile.png';
import imgCatMobile2 from './img/cat2-mobile.png';
import imgCatMobile3 from './img/cat3-mobile.png';
import imgCatMobile4 from './img/cat4-mobile.png';
import imgCatMobile5 from './img/cat5-mobile.png';

import gif from './img/gif-tu-calcetin.gif';
import ellipsis from './img/ellipsis-h-solid.svg';
import cart from './img/shopping-cart-solid.svg';
import money from './img/money-bill-wave-solid.svg';
import info from '../ItemDetails/images/info.svg';

import mayoreoImg from './img/mayoreo.png';
import paquetesImg from './img/paquetes.png';
import modaImg from './img/moda.png';

import envioImg from './img/vector-envio.png';
import servicioImg from './img/vector-servicio.png';
import regaloImg from './img/vector-regalo.png';
import pagoImg from './img/vector-pago.png';
import logoWhatsapp from './img/wap-img.png';
import socks from './img/socks-solid.svg';
import smile from './img/smile-beam-regular.svg';

import './Landing.css';

import initFacebookPixel from '../../components/FacebookPixel';

const items1 = [
  {
    nombre: "Honey",
    id: 197,
    img: "fcbbc054-d355-4cae-8ab1-4a07050e58bc.jpg",
    itemPrice: 150,
    collectionId: 19,
    variante: {
      id: 312,
      talla: "22 - 30"
    }
  },
  {
    nombre: "Ponle aguacate",
    id: 126,
    img: "00b9cd89-7fa2-4657-9007-4dc9318f018c.jpg",
    itemPrice: 150,
    collectionId: 17,
    variante: {
      id: 231,
      talla: "unitall"
    }
  },
  {
    nombre: "Lleva lugares",
    id: 123,
    img: "a6ccb5b6-4a18-4139-b96e-fad83eb67baf.jpg",
    itemPrice: 150,
    collectionId: 16,
    variante: {
      id: 228,
      talla: "25 - 32"
    }
  },
  {
    nombre: "Los Rockstars",
    id: 195,
    img: "5e8882fe-8d52-4937-888a-cc9cd0478cf1.jpg",
    itemPrice: 150,
    collectionId: 30,
    variante: {
      id: 306,
      talla: "22 - 30"
    }
  },
  {
    nombre: "Los exactos",
    id: 102,
    img: "fe580f82-4f08-43b3-bd62-9c8758aadb9d.jpg",
    itemPrice: 150,
    collectionId: 12,
    variante: {
      id: 208,
      talla: "22 - 30"
    }
  }
]

const items2 = [
  {
    nombre: "Emprendetines",
    id: 164,
    img: "551ecc95-5919-4234-adfd-b82ab1167bb4.jpeg",
    itemPrice: 150,
    collectionId: 15,
    variante: {
      id: 262,
      talla: "25 - 32"
    }
  },
  {
    nombre: "Tinmones",
    id: 106,
    img: "fc03d071-3e1a-4b05-b5a0-c34dbdeb6249.jpg",
    itemPrice: 150,
    collectionId: 15,
    variante: {
      id: 212,
      talla: "25 - 32"
    }
  },
  {
    nombre: "Piecicletas",
    id: 202,
    img: "b15618e3-b9fc-4d77-b6a8-1d9e2e7c8509.jpg",
    itemPrice: 150,
    collectionId: 16,
    variante: {
      id: 317,
      talla: "25 - 32"
    }
  },
  {
    nombre: "Reyes de las olas",
    id: 201,
    img: "b7180dba-b453-4c48-b040-d7ecc9656fb9.jpeg",
    itemPrice: 150,
    collectionId: 16,
    variante: {
      id: 316,
      talla: "25 - 32"
    }
  },
  {
    nombre: "Krueger",
    id: 198,
    img: "8f3ba880-fe5a-4acc-8398-5804a4e6a8aa.jpg",
    itemPrice: 150,
    collectionId: 19,
    variante: {
      id: 313,
      talla: "22 - 30"
    }
  }
]

const api = new Webapi();

const catArr = [
  {
    url: "tienda/19",
    type: "Geometricos",
    images: {
      desk: imgCatDesk1,
      tablet: imgCatTablet1,
      mobile: imgCatMobile1
    }
  },
  {
    url: "tienda/30",
    type: "deportivos",
    images: {
      desk: imgCatDesk2,
      tablet: imgCatTablet2,
      mobile: imgCatMobile2
    }
  },
  {
    url: "tienda/15",
    type: "animales",
    images: {
      desk: imgCatDesk3,
      tablet: imgCatTablet3,
      mobile: imgCatMobile3
    }
  },
  {
    url: "tienda/17",
    type: "saludables",
    images: {
      desk: imgCatDesk4,
      tablet: imgCatTablet4,
      mobile: imgCatMobile4
    }
  },
  {
    url: "tienda/15",
    type: "animales",
    images: {
      desk: imgCatDesk5,
      tablet: imgCatTablet5,
      mobile: imgCatMobile5
    }
  }
]

const Landing = () => {
  const [screen, setScreen] = useState("desk")
  const [random, setRandom] = useState(Math.floor(Math.random() * 4000) + 5000)
  const handleResponsive = ({ desk, tablet, mobile }) => {
    if(screen === "desk")
      return desk
      else if (screen === "tablet")
        return tablet
      return mobile
  }
  const updateWindowDimensions = () => {
    const size = window.innerWidth > 700 ? (
      window.innerWidth > 1200 ? 'desk' : 'tablet'
    ) : 'mobile';
    if (size !== screen)
      setScreen(size);
  }
  
  useEffect(() => {
    initFacebookPixel();
    if(window) {
      window.addEventListener('resize', updateWindowDimensions);
      updateWindowDimensions()
    }
  }, []);

  const handleClickAgregarCarrito = async (item) => {
    const { nombre, id, itemPrice, colectionId } = item;
    const { id: varianteId, talla } = item.variante;

    await api.establecerElementoCarrito(
      id,
      varianteId,
      1
    );

    ReactPixel.track('AddToCart', { data: item });

    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        currencyCode: 'MXN',
        add: {
          products: [
            {
              name: nombre,
              id,
              price: itemPrice,
              brand: 'Tu Calcetin',
              category: colectionId,
              variant: talla,
              quantity: 1,
            },
          ],
        },
      },
    });

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: 'Yay! Tus calcetines están en el carrito',
  });
  }

  const handleClickComprarAhora = async (item) => {
    const { id: varianteId, talla } = item.variante;
    const { nombre, id, itemPrice, colectionId } = item;
    await api.establecerElementoCarrito(
      id,
      varianteId,
      1
    );
    const carrito = await api.obtenerCarrito();
    window.dataLayer.push({
      event: 'buyNow',
      ecommerce: {
        currencyCode: 'MXN',
        add: {
          products: [
            {
              name: nombre,
              id,
              price: itemPrice,
              brand: 'Tu Calcetin',
              category: colectionId,
              variant: talla,
              quantity: 1,
            },
          ],
        },
      },
    });
    window.location.replace(`/carrito/${carrito.id}/pedido`)
  };

  const CardComponent = ({ item }) => (
    <div className="card-component">
      <div className="card-component-img-container">
        <img src={api.resolverUrlImagen(item.img)} className="card-component-img" />
      </div>
      <div className="card-component-button-container">
        <div
          className="card-component-button"
          onClick={() => handleClickComprarAhora(item)}
        >
          <img src={money} className="card-component-button-img" />
        </div>
        <div
          className="card-component-button"
          onClick={() => handleClickAgregarCarrito(item)}
        >
          <img src={cart} className="card-component-button-img" />
        </div>
        <a href={`/tienda/item/${item.id}`}>
          <div
            className="card-component-button"
          >
            <img src={ellipsis} className="card-component-button-img" />
          </div>
        </a>
      </div>
    </div>
  )

  return (
    <div>
      <Navbar />
      <div className="banner-container">
        <MemoizedBannerDiscount />
      </div>

      <Carousel indicators={false} className="section-shadow">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={handleResponsive(catArr[0].images)}
            alt={catArr[0].type}
          />
          <Carousel.Caption style={{ textAlign: "left" }}>
            <a className="categories-button-container" href={catArr[0].url}>
              <button className="categories-button">Ir a colección</button>
            </a> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={handleResponsive(catArr[1].images)}
            alt={catArr[1].type}
          />
          <Carousel.Caption style={{ textAlign: "right" }}>
            <a className="categories-button-container" href={catArr[1].url}>
              <button className="categories-button">Ir a colección</button>
            </a> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={handleResponsive(catArr[2].images)}
            alt={catArr[2].type}
          />
          <Carousel.Caption style={{ textAlign: "left" }}>
            <a className="categories-button-container" href={catArr[2].url}>
              <button className="categories-button">Ir a colección</button>
            </a> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={handleResponsive(catArr[3].images)}
            alt={catArr[3].type}
          />
          <Carousel.Caption style={{ textAlign: "right" }}>
            <a className="categories-button-container" href={catArr[3].url}>
              <button className="categories-button">Ir a colección</button>
            </a> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={handleResponsive(catArr[4].images)}
            alt={catArr[4].type}
          />
          <Carousel.Caption style={{ textAlign: "left" }}>
            <a className="categories-button-container" href={catArr[4].url}>
              <button className="categories-button">Ir a colección</button>
            </a> 
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
      <Parallax blur={0} bgImage={handleResponsive({
        desk: imgParallax6,
        tablet: imgParallaxTablet6,
        mobile: imgParallaxMobile6
      })} bgImageAlt="the cat" strength={screen=== "desk"?200:50} style={{height: screen==="desk"?400 : screen === "tablet" ? 300 : 150}} 
        renderLayer={() => (
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%"
            }}
          >
            <img src={gif} style={{ width: "20%", maxWidth: 350, minWidth: 150 }} />
          </div>
      )} />

      <div className="cards-container section-shadow">
        <h2>Lo más nuevo</h2>
        <Slider
          slideWidth={screen === "tablet" || screen === "mobile" ? 200 : 300}
        >
          {
            items1.map(item => <CardComponent item={item} key={item.nombre} />)
          }
        </Slider>
      </div>

      <Parallax blur={0} bgImage={handleResponsive({
        desk: imgParallaxs2,
        tablet: imgParallaxTablets2,
        mobile: imgParallaxMobiles2
      })} bgImageAlt="the cat" strength={screen=== "desk"?200:50} style={{height: screen==="desk"?400 : screen === "tablet" ? 300 : 150}} />

      <Carousel controls={false} className="section-shadow">
        <Carousel.Item>
          <div className="info-container">
            <div className="img-section">
              <img
                className="d-block w-100"
                src={mayoreoImg}
                alt="Second slide"
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
            <div className="info-section">
              <h3 style={{ marginBottom: 30 }}>Mayoreo</h3>
              <p style= {{ maxWidth: 400, fontSize: 20 }}>¿Quieres ser un Socksio? Tenemos un esquema de mayoreo con ganancias superiores al 50% sobre el precio de venta, distribuye calcetines en tu estado, pide más información a nuestro equipo de atención al cliente.</p>
              {/* Link a "Contacto" */}
              <a href="/contacto" style={{ fontSize: 16, color: "#000000", backgroundColor: "#F8F8F8", padding: "10px 15px", borderRadius: 4 }} >Contacto</a>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="info-container">
            <div className="img-section">
              <img
                className="d-block w-100"
                src={paquetesImg}
                alt="Second slide"
                style={{ objectFit: "contain", height: "100%" }}
              />
            </div>
            <div className="info-section">
              <h3 style={{ marginBottom: 30 }}>Paquetes Personalizados</h3>
              <p style= {{ maxWidth: 400, fontSize: 20 }}>Tenemos paquetes a la medida de calcetines para cualquier ocasión seguramente podrás armar el combo de tus favoritos a un precio especial y con un empaque especial, arma tu box de 3, 5 o 7 pares y ¡listo!</p>
              {/* Link a "paquetes" */}
              <a href="/tienda/18"  style={{ fontSize: 16, color: "#000000", backgroundColor: "#F8F8F8", padding: "10px 15px", borderRadius: 4 }}>Ver más</a>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="info-container">
            <div className="img-section">
              <img
                className="d-block w-100"
                src={modaImg}
                alt="Second slide"
                style={{ objectFit: "contain", height: "100%" }}
              />
            </div>
            <div className="info-section">
              <h3 style={{ marginBottom: 30 }}>Moda sustentable</h3>
              <p style= {{ maxWidth: 400, fontSize: 20 }}> Dile adiós al fast Fashion con Tu Calcetín, las fibras que utilizamos son responsables con el medio ambiente, no sólo te verás bien, te sentirás mejor y cuidaras a nuestra madre tierra en cada paso, prueba nuestros calcetines de fibra de bambú y algodón reciclado.</p>
              {/* Link a "tienda" */}
              <a href="tienda"  style={{ fontSize: 16, color: "#000000", backgroundColor: "#F8F8F8", padding: "10px 15px", borderRadius: 4 }}>Ver más</a>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <Parallax blur={0} bgImage={handleResponsive({
        desk: imgParallaxs3,
        tablet: imgParallaxTablets3,
        mobile: imgParallaxMobiles3
      })} bgImageAlt="the cat" strength={screen=== "desk"? 200:50} style={{height: screen==="desk"?400 : screen === "tablet" ? 300 : 150}} />

      <div className="cards-container">
        <h2>Los favoritos de la semana</h2>
        <Slider
          slideWidth={screen === "tablet" || screen === "mobile" ? 200 : 300}
        >
          {
            items2.map(item => <CardComponent  item={item} key={item.nombre} />)
          }
        </Slider>
      </div>

      <div className="extra-info-container">
        <div className="section-item">
          <div>
            <img style={{ marginRight: 10 }} src={envioImg} />
          </div>
          <div>
            <h6>ENVÍO NACIONAL</h6>
            <p>Lo ponemos en la puerta de tu casa.</p>
          </div>
        </div>
        <div className="section-item">
          <div>
            <img style={{ marginRight: 10 }} src={servicioImg} />
          </div>
          <div>
            <h6>SERVICIO</h6>
            <p>Te atendemos por WhatsApp y nuestras redes sociales oficiales.</p>
          </div>
        </div>
        <div className="section-item">
          <div>
            <img style={{ marginRight: 10 }} src={regaloImg} />
          </div>
          <div>
            <h6>CAJA DE REGALO
              <OverlayTrigger
                placement='top'
                overlay={
                  <Tooltip>
                    Sujeto a disponibilidad
                  </Tooltip>
                }
              >
                <img
                  className='infoIcon'
                  src={info}
                  alt='Icono de información para las tallas'
                />
              </OverlayTrigger>
            </h6>
            <p>Recibe tu pedido en un empaque único.</p>
          </div>
        </div>
        <div className="section-item">
          <div>
            <img style={{ marginRight: 10 }} src={pagoImg} />
          </div>
          <div>
            <h6>PAGO SEGURO</h6>
            <p>Aceptamos todos los medios de pago.</p>
          </div>
        </div>
      </div>

      <div style={{ justifyContent: "center", display: "flex", marginTop: 100, marginBottom: 200 }}>
      <table>
          <tbody>
            <tr>
              <td><h5 style={{ margin: "5px 10px", paddingBottom: 50 }}>Calcetines vendidos</h5></td>
              <td style={{ paddingBottom: 50 }}><img src={socks} style={{ width: 40 }} /></td>
              <td style={{ paddingLeft: "40px", paddingBottom: 50 }}><FlipNumbers
                play
                color="#329af0"
                background="#f0f0f0"
                width={35}
                height={35}
                numbers={String(random)}
              /></td>
            </tr>
            <tr>
              <td><h5 style={{ margin: "5px 10px" }}>Clientes felices</h5></td>
              <td><img src={smile} style={{ width: 40 }} /></td>
              <td style={{ paddingLeft: "40px" }}><FlipNumbers
                play
                color="#329af0"
                background="#f0f0f0"
                width={35}
                height={35}
                numbers={String(random)}
              /></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <a
        onClick={() => ReactPixel.track('Lead', { title: "whatsapp message redirect" } )}
        href="https://api.whatsapp.com/send?phone=523122256192&text=Hola,%20me%20%20interesan%20sus%20productos,%20vengo%20de%20tucalcetin.com.mx"
        target="_blank"
        style={{ position: "fixed", bottom: "20%", right: 0, zIndex: 2 }}
      >
        <img
          src={logoWhatsapp}
          alt='Whatsapp Icon'
          className="wap-icon"
        />
      </a>
    </div>
  );
}

export default Landing
