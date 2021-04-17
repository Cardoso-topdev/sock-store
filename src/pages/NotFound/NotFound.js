import React, { Component } from 'react';
import Logo from '../../shared/image/logo.png';
import './NotFound.css';

import { Link } from 'react-router-dom';
import initFacebookPixel from '../../components/FacebookPixel';

export default class NotFound extends Component {
  componentDidMount() {
    initFacebookPixel();
  }
  render() {
    return (
      <div className='notFoundWrapper'>
        <img src={Logo} alt='logo'></img>
        <h1>Página no encontrada</h1>
        <Link to='/tienda'>Regresar a la tienda</Link>
      </div>
    );
  }
}
