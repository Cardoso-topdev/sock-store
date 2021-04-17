import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Home, MonetizationOn, Inbox, StoreMallDirectory, Category } from '@material-ui/icons';
// import shopIcon from './image/shop.png';
// import Navbar from 'react-bootstrap/Navbar';
// import logo from '../../shared/image/logo.png';
import { Navbar, Nav } from 'react-bootstrap';
import shoppingCart from './image/shopping-cart.png';
import shoppingCartWithItems from './image/shoppingCartWithItems.png';
// import contact from './image/contact.png';
// import whoAreWe from './image/whoAreWe.png';

import Webapi from '../../api/Webapi';

import './navbar.css';

export default class NavbarLanding extends Component {
  api = new Webapi();
  state = {
    imgCarrito: shoppingCart,
  };
  id = null;

  itemsInCarrito = async () => {
    let carritoSetted = await this.api.isCarritoSetted();
    this.setState({
      imgCarrito: carritoSetted ? shoppingCartWithItems : shoppingCart,
    });
  };

  componentDidMount() {
    this.id = setInterval(() => {
      this.itemsInCarrito();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand className="logo-text" href="/">
            Tu Calcetín
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/">
                  <p className="navtxt">Inicio</p>
              </Nav.Link>
              <Nav.Link href="/tienda">
                  <p className="navtxt">Tienda</p>
              </Nav.Link>
              <Nav.Link href='/tienda/18'>
                  <p className="navtxt">Paquetes</p>
              </Nav.Link>
              <Nav.Link href='/tienda/24'>
                  <p className="navtxt">Ofertas</p>
              </Nav.Link>
              <Nav.Link href='/quienes-somos'>
                  <p className="navtxt">Quiénes Somos</p>
              </Nav.Link>
              <Nav.Link href='/contacto'>
                  <p className="navtxt">Contacto</p>
              </Nav.Link>
            </Nav>
            <Nav>
              <div className="link-car">
                <Link to='/carrito'>
                  <div className="img-container">
                    <img src={this.state.imgCarrito} alt='Carrito' />
                  </div>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className="hidden-car">
            <Link to='/carrito'>
              <div className="img-container">
                <img src={this.state.imgCarrito} alt='Carrito' />
              </div>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Navbar>
      </>
    );
  }
}
