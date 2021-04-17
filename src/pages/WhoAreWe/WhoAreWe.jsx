import React, { useEffect } from 'react';

import Header from '../../components/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeamCard from '../../components/TeamCard/TeamCard';
import initFacebookPixel from '../../components/FacebookPixel';

import './WhoAreWe.css';
import fullScreenVideo from './img/fullscreenVideo.mp4';

import logoVideo from './img/videoLogoActualizado.mp4';
import jonathanPhoto from './img/jonathanPhoto.jpg';
import germanPhoto from './img/germanPhoto.jpg';
import dianaPhoto from './img/dianaPhoto.jpg';

export default function WhoAreWe() {
  useEffect(() => {
    initFacebookPixel();
  }, []);
  return (
    <>
      <Header title='Quiénes Somos' />
      <header className='v-header header_container'>
        <div className='fullscreen-video-wrap'>
          <video
            src={fullScreenVideo}
            autoPlay
            loop
            className='video_desktop'
            muted
            playsInline
          ></video>
          <video
            src={fullScreenVideo}
            autoPlay
            loop
            className='video_mobile'
            muted
            playsInline
          ></video>
        </div>
      </header>
      <Container className='container_logo_texto'>
        <Row className='vl_container my-4 box_shadow_light'>
          <Col xs={12} md={5}>
            <video
              src={logoVideo}
              autoPlay
              loop
              className='video_logo'
              muted
              playsInline
            ></video>
          </Col>
          <Col xs={12} md={7}>
            <div>
              <h3 className='text-center my-3 font-weight-bold'>
                ¿Quiénes Somos?
              </h3>
              <p className='px-4 text-justify text-dark text_fs_medium main_text hyphentation'>
                Nos dimos cuenta de lo que necesitaban tus pies, nos
                comprometimos a reformar la industria de la moda del calcetín,
                tenemos la creencia de que el calcetín al ser ropa interior es
                el reflejo del interior de la persona, una extensión de la
                personalidad, es por eso que tenemos una amplia gama de diseños
                que son para todos, nuestros calcetines se adaptan a cualquier
                persona, son únicos en calidad y precio.
                <br />
                Somos una empresa comprometida a darte la mejor atención
                buscamos convertir tu compra en una experiencia, más que estar
                pagando sólo por un par de calcetines, estas pagando por TU
                CALCETÍN.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className='font-weight-bold mt-4'>Nuestro Equipo</h3>
          </Col>
        </Row>
      </Container>
      <TeamCard
        name='Jonathan Solis Ceballos'
        profession='Ingeniero de Software'
        picture={jonathanPhoto}
        fbLink='https:
        instaLink='
        description='Estudiante de la carrera de Ingeniería de Software, actualmente trabajo de freelancer haciendo páginas webs responsivas, rápidas y con un buen diseño que aportan valor a los clientes, uso tecnologías emergentes y busco mejorar la calidad del producto todos los días.'
      />
      <TeamCard
        name='Germán Tenorio'
        profession='Fotógrafo de tu calcetín'
        picture={germanPhoto}
        fbLink='https:
        instaLink='
        description='La Fotografía Comercial con la que se trabaja tiene como objetivo presentar eficazmente las características relevantes de un producto o servicio de una manera atractiva o emotiva llegando a interior del espectador.'
      />
      <TeamCard
        name='Diana Karime Coria Sánchez'
        profession='Diseñadora gráfica e ilustradora'
        picture={dianaPhoto}
        fbLink='https:
        instaLink='
        description='Estudiante de la carrera de diseño gráfico, hago ilustraciones de forma digital y manual. Me interesa el branding, el diseño editorial, lettering e identidad corporativa. Me gusta crear infografias digitales animadas y experimentar con programas de animación.'
      />
    </>
  );
}
