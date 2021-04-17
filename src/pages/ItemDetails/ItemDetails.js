import React, { Component } from 'react';
import './ItemDetails.css';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';

import info from './images/info.svg';
import mastercard from './images/cc-mastercard-brands.svg';
import visa from './images/cc-visa-brands.svg';
import paypal from './images/cc-paypal-brands.svg';
import amex from './images/cc-amex-brands.svg';
import store from './images/store-solid.svg';
import spei from './images/spei-logo.png';
import imgX from './images/X.png';
import { Link } from 'react-router-dom';
import imgBambu from './images/bambu.png';
import imgAlgodon from './images/algodon.png';

import { InputNumber, Select } from 'antd';

import Webapi from '../../api/Webapi';

import { Redirect } from 'react-router-dom';

import * as Numeral from 'numeral';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ReactPixel from 'react-facebook-pixel';

import Swal from 'sweetalert2';
import CustomBox from '../../components/CustomBox';

const { Option } = Select;

export default class ItemDetails extends Component {
  state = {
    calcetin: null,
    variante: null,
    outOfStock: false,
    error: false,
    cantidad: 1,
    carrito: null,
    loading: false,
    redirect: false,
    customBoxProducts: [],
    selectedCustomProducts: [],
    images: [],
    imgSelected: 0,
  };
  rootCssLoaded = false;
  api = new Webapi();

  initFacebookPixel() {
    ReactPixel.pageView();
  }

  componentDidMount() {
    document.querySelector('#root').style.backgroundColor = '#e1e1e1';

    this.initFacebookPixel();
    const id = this.props.match.params.id;

    this.api.registrarVistaDeProducto(parseInt(id));
    
    this.api
    .obtenerCalcetin(id)
    .then((c) => {
      let defaultVariant = c.variantes.filter((el) => el.stock > 0)[0];
      let outOfStock = defaultVariant ? false : true;
      
        ReactPixel.track('ViewContent', { data: c })

        this.setState({
          calcetin: c,
          outOfStock,
          variante: defaultVariant ? defaultVariant : c.variantes[0],
        });
        this.getImages();

        if (c.customboxid) {
          this.getCustomBoxProducts();
        }

        window.dataLayer.push({
          ecommerce: {
            detail: {
              actionField: { list: 'Detalles del producto' },
              products: [
                {
                  name: c.nombre,
                  id: c.id,
                  price: c.precio,
                  brand: 'Tu Calcetin',
                  category: c.coleccionId,
                  variant: defaultVariant && defaultVariant.talla,
                },
              ],
            },
          },
        });
      })
      .catch((err) => {
        console.error(err);

        this.setState({
          error: true,
        });
      });
  }

  getImages = () => {
    const images = [];
    this.state.calcetin.imagenes.forEach(i => {
      images.push(this.api.resolverUrlImagen(i.nombreImagen))
    });
    this.setState({
      images
    })
  }

  getCustomBoxProducts = async () => {
    try {
      let customBoxProducts = await this.api.getCustomBoxProducts();
      customBoxProducts = Object.values(customBoxProducts);
      this.setState({
        customBoxProducts,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        error: true,
      });
    }
  };

  handleChangeVariante = (value) => {
    const variante = this.state.calcetin.variantes.find((v) => v.id === value);
    this.setState({
      variante,
    });
  };

  handleChangeCantidad = (value) => {
    this.setState({
      cantidad: value,
    });
  };

  handleClickAgregarCarrito = async (e, customBoxProduct = null) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    if (customBoxProduct) {
      await this.api.establecerCustomBoxCarrito(customBoxProduct);
    } else {
      await this.api.establecerElementoCarrito(
        this.state.calcetin.id,
        this.state.variante.id,
        this.state.cantidad
      );
    }

    ReactPixel.track('AddToCart', { data: this.state.calcetin });

    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        currencyCode: 'MXN',
        add: {
          products: [
            {
              name: this.state.calcetin.nombre,
              id: this.state.calcetin.id,
              price: this.state.calcetin.precio,
              brand: 'Tu Calcetin',
              category: this.state.calcetin.coleccionId,
              variant: this.state.variante.talla,
              quantity: this.state.cantidad,
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

  handleClickComprarAhora = async (e, customBoxProduct = null) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    if (customBoxProduct) {
      await this.api.establecerCustomBoxCarrito(customBoxProduct);
    } else {
      await this.api.establecerElementoCarrito(
        this.state.calcetin.id,
        this.state.variante.id,
        this.state.cantidad
      );
    }
    this.carrito = await this.api.obtenerCarrito();

    window.dataLayer.push({
      event: 'buyNow',
      ecommerce: {
        currencyCode: 'MXN',
        add: {
          products: [
            {
              name: this.state.calcetin.nombre,
              id: this.state.calcetin.id,
              price: this.state.calcetin.precio,
              brand: 'Tu Calcetin',
              category: this.state.calcetin.coleccionId,
              variant: this.state.variante.talla,
              quantity: this.state.cantidad,
            },
          ],
        },
      },
    });

    this.setState({
      loading: false,
      redirect: true,
    });
  };

  componentWillUnmount() {
    document.querySelector('#root').style.backgroundColor = 'white';
  }

  selectImage = (image) => {
    this.setState({ imgSelected: image })
  }

  render() {
    const { imgSelected, images } = this.state;
    const c = this.state.calcetin;
    return this.state.error ? (
      <Redirect to='/tienda/404' />
    ) : this.state.redirect ? (
      <Redirect to={`/carrito/${this.carrito.id}/pedido`} />
    ) : c && c.customboxid ? (
        <CustomBox
          c={c}
          handleClickAgregarCarrito={this.handleClickAgregarCarrito}
          outOfStock={this.state.outOfStock}
          handleClickComprarAhora={this.handleClickComprarAhora}
          customBoxProducts={this.state.customBoxProducts}
          loading={this.state.loading}
        />
    ) : (
      <div className='upperWrapper'>
        <Header title='Tienda' />
        
        <div className='containerItemDetails'>
          <div className='btnX'>
            <Link to='/tienda'>
              <img src={imgX} alt='X' />
            </Link>
          </div>
          {!c || this.state.loading ? (
            <Loader />
          ) : (
            <>
              <Row className="justify-content-md-center product-container">
                <Col md={1} className="mini-img-col">
                  {images.map((url, index) => (
                    <div className="mini-img-container" key={url}>
                      <img
                        src={url}
                        onClick={() => this.selectImage(index)}
                        className={imgSelected === index && 'active-image'}
                      />
                    </div>
                  ))}
                </Col>
                <Col xs={12} md={7}>
                  <div className="selected-img-container">
                    <img src={images[imgSelected]} />
                  </div>
                </Col>
                <Col xs={12} md={4} className='descriptionContainer'>
                  <h3 className='itemName'>{c.nombre}</h3>
                  <div className='d-flex'>
                    <span className='itemPrice'>
                      {Numeral(c.precio * (1 - c.descuento / 100)).format(
                        '$0,0.00'
                      )}
                    </span>
                    <div className='d-flex flex-column ml-2 justify-content-center'>
                      {c.descuento > 0 && (
                        <span className='discount_percentaje align-self-start'>
                          {c.descuento}% OFF
                        </span>
                      )}
                      {c.is2x1 === 1 && (
                        <span className='discount_percentaje align-self-start'>
                          Producto aplicable para 2x1
                        </span>
                      )}
                      {c.is3x2 === 1 && (
                        <span className='discount_percentaje align-self-start'>
                          Producto aplicable para 3x2
                        </span>
                      )}
                      {c.is4x3 === 1 && (
                        <span className='discount_percentaje'>
                          Producto aplicable para 4x3
                        </span>
                      )}
                    </div>
                  </div>
                  {c.descuento > 0 && (
                    <span className='discount_price_line padding-left-2'>
                      <span className='discount_price text-gray-black'>
                        {Numeral(c.precio).format('$0,0.00')}
                      </span>
                    </span>
                  )}
                  <div className='cartControllers'>
                    <div className='quantitySizeContainer'>
                      <div className='size'>
                        <div className='tooltipContainer'>
                          <h6>Talla</h6>
                          <OverlayTrigger
                            placement='top'
                            overlay={
                              <Tooltip>
                                CH: 20-25cm
                                <br />
                                M: 25-30cm
                                <br />
                                U: 20-30cm
                              </Tooltip>
                            }
                          >
                            <img
                              className='infoIcon'
                              src={info}
                              alt='Icono de información para las tallas'
                            />
                          </OverlayTrigger>
                        </div>
                        <Select
                          defaultValue={
                            this.state.variante && this.state.variante.id
                          }
                          style={{ width: 120 }}
                          size='large'
                          onChange={this.handleChangeVariante}
                        >
                          {c.variantes.map((v, i) => {
                            return (
                              <Option
                                key={i}
                                disabled={v.stock === 0}
                                value={v.id}
                              >
                                {v.talla}
                              </Option>
                            );
                          })}
                        </Select>
                        <span className='sku'>
                          SKU:{' '}
                          {this.state.variante && this.state.variante.sku}
                        </span>
                      </div>
                      <div className='quantity'>
                        <h6>Cantidad</h6>
                        <InputNumber
                          min={1}
                          max={
                            this.state.variante &&
                            this.state.variante.stock
                          }
                          value={this.state.cantidad}
                          onChange={this.handleChangeCantidad}
                          size='large'
                          type='number'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='btnsContainer'>
                    {this.state.outOfStock && (
                      <p className='text-center lead text-danger'>
                        No disponible por el momento
                      </p>
                    )}
                    <button
                      onClick={this.handleClickAgregarCarrito}
                      className='btnAddToCart btn-rounded'
                      disabled={this.state.outOfStock}
                    >
                      Agregar al Carrito
                    </button>
                    <button
                      onClick={this.handleClickComprarAhora}
                      className='btnBuyNow btn-rounded'
                      disabled={this.state.outOfStock}
                    >
                      Comprar Ahora
                    </button>
                  </div>
                  <div className="iconos-pagos">
                    <h5 style={{ fontWeight: "bold", textAlign: "center" }}>FORMAS DE PAGO</h5>
                    <h6>Tarjetas</h6>
                    <div>
                      <img src={mastercard} />
                      <img src={visa} />
                      <img src={amex} />
                    </div>
                    <h6>Paypal</h6>
                    <div>
                      <img src={paypal} />
                    </div>
                    <h6>Tiendas</h6>
                    <div>
                      <img src={store} />
                    </div>
                    <h6>SPEI</h6>
                    <div>
                      <img src={spei} style={{ height: 20 }} />
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="product-details-container">

                <div className='cartControllersContainer'>
                  <div className='itemDescription'>
                    <h5 style={{ fontWeight: "bold" }}>INFORMACIÓN ADICIONAL</h5>
                    {c.descripcion.split('\n').map((i, key) => (
                      <p key={key}>{i}</p>
                    ))}
                  </div>

                  <div className='imgWrapperFibraCalcetin'>
                    {this.state.variante &&
                    this.state.variante.sku.charAt(0).toUpperCase() ===
                      'B' ? (
                      <img
                        src={imgBambu}
                        alt='venetajas de la fibra de bambú'
                        className='imgFibraCalcetin'
                      />
                      ) : this.state.variante &&
                        this.state.variante.sku.charAt(0).toUpperCase() ===
                          'A' ? (
                        <img
                          src={imgAlgodon}
                          alt='venetajas de la fibra de algodón'
                          className='imgFibraCalcetin'
                        />
                      ) : null}
                  </div> 
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
