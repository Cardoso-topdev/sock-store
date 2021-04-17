import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

import logo from '../../shared/image/logo.png';
import mastercard from './images/cc-mastercard-brands.svg';
import paypal from './images/cc-paypal-brands.svg';
import visa from './images/cc-visa-brands.svg';
import store from './images/store-solid.svg';

export default () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className='logo-container'>
            <img className="sock-logo" src={logo} alt='logo' />
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <ul className="footer-links">
              <li>
              <HashLink to='/terminosyaviso#cambiosYDevoluciones'
             className='linkTerminosYCondiciones'  >
             Cambios y Devoluciones
           </HashLink>
              </li>
              <li>
              <Link to='/terminosyaviso' className='linkTerminosYCondiciones'>
                Términos y Aviso de privacidad </Link>
              </li>
              <li>
                <a href='https://mayoristas.tucalcetin.com.mx' >
                  Ingreso
                </a>
              </li>
              <li className="pay-methods">
                <img
                  width='32px'
                  height='32px'
                  src={paypal}
                  alt='Logo de PayPal'
                />
                <img
                  width='32px'
                  height='32px'
                  src={mastercard}
                  alt='mastercard'
                  color="white"
                />
                <img
                  width='32px'
                  height='32px'
                  src={visa}
                  alt='visa'
                />
                <img
                  width='32px'
                  height='32px'
                  src={store}
                  alt='Icono de tienda'
                />
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <ul className="footer-links">
              <li>Queremos saber de ti</li>
              <li>Teléfono: +52 312 225 6192</li>
              <li>E-mail: contacto@tucalcetin.com.mx</li>
            </ul>
          </div>

        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2020
              <p>Empresa 100% mexicana. Diseños únicos y creativos hechos por nosotros</p>
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
              <li>Síguenos en:</li>
              <li>
              <a className="dribbble"
                href='https://www.instagram.com/tucalcetin/'
                target='_blank'
                rel='noopener noreferrer'
               >
                <FontAwesomeIcon icon={faInstagram} />
               </a>
              </li>
              <li><a className="facebook"
              href='https://www.facebook.com/tucalcetin'
              target='_blank'
              rel='noopener noreferrer'
              >
                 <FontAwesomeIcon icon={faFacebook} />
                </a></li> 
            </ul>
          </div>
        </div>
      </div>
</footer>
  );
};
