import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Webapi from '../../api/Webapi';
import Swal from 'sweetalert2';
import ReactPixel from 'react-facebook-pixel';

import './Item.css';

import * as Numeral from 'numeral';

export default class Item extends Component {
  state = {
    loading: false,
    redirect: false,
    carrito: null,
  };

  api = new Webapi();

  saveScrollStatus = () => {};

  handleClickAgregarCarrito = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { id: varianteId, calcetinId, talla } = this.props.variante;

    await this.api.establecerElementoCarrito(
      calcetinId,
      varianteId,
      1
    );

    ReactPixel.track('AddToCart', { data: this.props });

    const { itemName, itemId, itemPrice, coleccionId } = this.props;

    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        currencyCode: 'MXN',
        add: {
          products: [
            {
              name: itemName,
              id: itemId,
              price: itemPrice,
              brand: 'Tu Calcetin',
              category: coleccionId,
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

    this.setState({
      loading: false,
    });
  };

  handleClickComprarAhora = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { id: varianteId, calcetinId, talla } = this.props.variante;
    await this.api.establecerElementoCarrito(
      calcetinId,
      varianteId,
      1
    );
    this.carrito = await this.api.obtenerCarrito();
    const { itemName, itemId, itemPrice, coleccionId } = this.props;

    window.dataLayer.push({
      event: 'buyNow',
      ecommerce: {
        currencyCode: 'MXN',
        add: {
          products: [
            {
              name: itemName,
              id: itemId,
              price: itemPrice,
              brand: 'Tu Calcetin',
              category: coleccionId,
              variant: talla,
              quantity: 1,
            },
          ],
        },
      },
    });

    this.setState({
      loading: false,
      redirect: true
    });
  };

  render() {
    const { itemId, itemPrice, itemName, itemImage, isCustom } = this.props;
    const itemDiscount = this.props.itemDiscount || 0;
    const is2x1 = this.props.is2x1;
    const is3x2 = this.props.is3x2;
    const is4x3 = this.props.is4x3;

    return this.state.redirect
      ? <Redirect to={`/carrito/${this.carrito.id}/pedido`} />
      : (
        <div className='containerItem'>
          <div className='imageContainer'>
            <img src={itemImage} alt='Item de la tienda' loading='lazy' />
          </div>
          <div style={{ display: "flex" }}>
            <div className='itemNamePrice'>
              <h4>{itemName}</h4>
              <div className='d-flex flex-column'>
                <span className='itemPrice'>
                  {Numeral(itemPrice * (1 - itemDiscount / 100)).format(
                    '$0,0.00'
                  )}
                </span>
                <div className='d-flex flex-column justify-content-center'>
                  {itemDiscount > 0 && (
                    <span className='discount_percentaje'>
                      {itemDiscount}% OFF
                    </span>
                  )}
                  {is2x1 === 1 && (
                    <span className='discount_percentaje'>2x1</span>
                  )}
                  {is3x2 === 1 && (
                    <span className='discount_percentaje'>3x2</span>
                  )}
                  {is4x3 === 1 && (
                    <span className='discount_percentaje'>4x3</span>
                  )}
                </div>
              </div>
              {itemDiscount > 0 && (
                <span className='discount_price_line'>
                  <span className='discount_price discount_price_details'>
                    {Numeral(itemPrice).format('$0,0.00')}
                  </span>
                </span>
              )}
            </div>
            <div className='btnContainer' style={{ width: ' 35%' }}>
              <Link to={`/tienda/item/${itemId}`}>
                <button onClick={this.saveScrollStatus} className="show-more-btn">Ver más...</button>
              </Link>
              {
                !isCustom &&
                  <>
                    <button onClick={this.handleClickAgregarCarrito} className="add-to-cart-btn">¡Al carrito!</button>
                    <button onClick={this.handleClickComprarAhora} className="buy-btn">Comprar</button>
                  </>
              }
            </div>
          </div>
        </div>
      )
  }
}
