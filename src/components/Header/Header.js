import React, { Component } from 'react';
import RealNavbar from '../Navbar/Navbar';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../shared/image/logo.png';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <>
      <RealNavbar />
      <Navbar bg='primary' variant='dark'>
        <a href='/tienda'>
          <Navbar.Brand>
            <img
              alt='Logo'
              src={logo}
              width='55'
              height='55'
              className='d-inline-block align-top'
            />
            <span className='headerTitle'>{this.props.title}</span>
          </Navbar.Brand>
        </a>
      </Navbar>
      </>

    );
  }
}
