import React, { Component } from 'react';

import CartItem from '../../components/CartItem/CartItem';
import Webapi from '../../api/Webapi';
import Loader from '../../components/Loader/Loader';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './OrderDetails.css';

import imgBorreguitos from './images/borreguitos.jpg';
import * as Numeral from 'numeral';

export default class OrderDetails extends Component {
  api = new Webapi();

  state = {
    cargando: true,
    items: [],
    total: 0,
    subtotal: 0,
    descuento3x2: false,
    descuento: 0,
  };
  componentDidMount() {
    this.updateCart();
  }

  updateCart = async () => {
    const { carritoId } = this.props;
    this.carrito = await this.api.obtenerCarrito(carritoId);

    if (this.carrito) {
      const items = this.carrito.calcetines;
      const total = this.carrito.total;
      const subtotal = this.carrito.subtotal;
      const discount = this.carrito.descuento;
      let descuento3x2 = this.carrito.descuentos3x2 >= 1 ? true : false;
      this.setState({
        items,
        total,
        subtotal,
        cargando: false,
        descuento3x2,
        descuento: this.carrito.descuento,
      });
      this.props.handleUpdateTotalAndDiscount(total, discount);
    } else {
      this.setState({
        cargando: false,
      });
    }
  };

  render() {
    return (
      <Container className='cartContainer'>
        {this.state.cargando ? (
          <Loader />
        ) : (
          <div className='cartCard'>
            <Row className='cartHeader'>
              <Col xs={7} sm={7}>
                <h6>Producto</h6>
              </Col>
              <Col>
                <h6>Cantidad</h6>
              </Col>
              <Col>
                <h6>Total</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr className='line' />
              </Col>
            </Row>
            <Row>
              <Col className='cartItemContainer'>
                {this.state.items.map((i) => (
                  <CartItem
                    key={i.id}
                    id={i.id}
                    calcetinId={i.calcetinId}
                    varianteId={i.varianteId}
                    name={i.nombre}
                    SKU={i.sku}
                    quantity={i.cantidad}
                    price={i.precio}
                    discount={i.descuento}
                    disableQuantity={true}
                    disableDelete={true}
                    stock={i.stock}
                    img={
                      i.imagen
                        ? this.api.resolverUrlImagen(i.imagen)
                        : imgBorreguitos
                    }
                    handleChange={(cantidad) =>
                      this.handleChange(i.calcetinId, i.varianteId, cantidad)
                    }
                    talla={i.talla}
                    is2x1={i.is2x1}
                    is3x2={i.is3x2}
                    is4x3={i.is4x3}
                    total={i.total}
                    outOfStock={i.cantidad > i.stock}
                    customboxid={i.customboxid}
                    // onDeletePress={() => this.handleOnDeletePress(i.id)}
                  />
                ))}
              </Col>
            </Row>

            <Row className='totalRow'>
              <Col xs={{ offset: 3 }} sm={{ offset: 6 }}>
                <p className='totalAndPrice'>Subtotal:</p>
              </Col>
              <Col>
                <p className='totalAndPrice'>
                  {Numeral(this.state.subtotal).format('$0,0.00')}
                </p>
              </Col>
            </Row>
            {this.state.descuento3x2 && (
              <Row className='totalRow'>
                <Col xs={{ offset: 5 }} md={{ offset: 7 }}>
                  <p
                    className='totalAndPrice text-right'
                    style={{ color: 'green' }}
                  >
                    Descuento 3x2
                  </p>
                </Col>
                <Col>
                  <p className='totalAndPrice' style={{ color: 'green' }}>
                    -{Numeral(this.state.descuento).format('$0,0.00')}
                  </p>
                </Col>
              </Row>
            )}
            {this.state.descuento > 0 && (
              <Row className='totalRow discount_color'>
                <Col
                  xs={{ offset: 3 }}
                  sm={{ offset: 6 }}
                  className='col_descuento'
                >
                  <p className='totalAndPrice'>Descuento</p>
                </Col>
                <Col>
                  <p className='totalAndPrice'>
                    {Numeral(this.state.descuento).format('$0,0.00')}
                  </p>
                </Col>
              </Row>
            )}

            {this.carrito && this.carrito.descuento2x1 > 0 && (
              <Row className='totalRow discount_color'>
                <Col xs={{ offset: 3 }} sm={{ offset: 6 }}>
                  <p className='totalAndPrice'>Descuento 2x1:</p>
                </Col>
                <Col>
                  <p className='totalAndPrice'>
                    {Numeral(this.carrito.descuento2x1).format('$0,0.00')}
                  </p>
                </Col>
              </Row>
            )}
            {this.carrito && this.carrito.descuento3x2 > 0 && (
              <Row className='totalRow discount_color'>
                <Col xs={{ offset: 3 }} sm={{ offset: 6 }}>
                  <p className='totalAndPrice'>Descuento 3x2:</p>
                </Col>
                <Col>
                  <p className='totalAndPrice'>
                    {Numeral(this.carrito.descuento3x2).format('$0,0.00')}
                  </p>
                </Col>
              </Row>
            )}
            {this.carrito && this.carrito.descuento4x3 > 0 && (
              <Row className='totalRow discount_color'>
                <Col xs={{ offset: 3 }} sm={{ offset: 6 }}>
                  <p className='totalAndPrice'>Descuento 4x3:</p>
                </Col>
                <Col>
                  <p className='totalAndPrice'>
                    {Numeral(this.carrito.descuento4x3).format('$0,0.00')}
                  </p>
                </Col>
              </Row>
            )}

            <Row className='totalRow'>
              <Col
                xs={{ offset: 3 }}
                sm={{ offset: 6 }}
                className='col_descuento'
              >
                <p className='totalAndPrice'>Total</p>
              </Col>
              <Col>
                <p className='totalAndPrice'>
                  {Numeral(this.state.total).format('$0,0.00')}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    );
  }
}
