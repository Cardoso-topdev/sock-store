import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import CartItem from '../../components/NewCartItem/CartItem';
import Webapi from '../../api/Webapi';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Carrito.css';

import imgBorreguitos from './images/borreguitos.jpg';

import * as Numeral from 'numeral';

import Swal from 'sweetalert2';
import initFacebookPixel from '../../components/FacebookPixel';

export default class Carrito extends Component {
  api = new Webapi();

  state = {
    cargando: true,
    items: [],
    subtotal: 0,
    total: 0,
    descuento: 0,
    deleteConfirmation: false,
    confirm: false,
    itemId: undefined,
  };
  componentDidMount() {
    this.updateCart();
    initFacebookPixel();
  }

  

  updateCart = async () => {
    this.carrito = await this.api.obtenerCarrito();

    if (this.carrito) {
      const items = this.carrito.calcetines;

      const total = this.recalcularTotal(items);
      const subtotal = this.recalcularSubtotal(items);
      const descuento = this.recalcularDescuento(items);
      this.setState({
        items,
        total,
        subtotal,
        descuento,
        cargando: false,
      });
    } else {
      this.setState({
        cargando: false,
      });
    }
  };

  recalcularTotal = (items) => {
    const total = items.reduce((acc, i) => {
      if (i.customboxid && i.customboxid !== i.id) {
        return acc + 0;
      } else {
        return (
          acc +
          i.cantidad *
            ((1 - (i.customboxid ? 0 : i.descuento) / 100) * i.precio)
        );
      }
    }, 0);

    return total;
  };

  recalcularSubtotal = (items) => {
    const subtotal = items.reduce((acc, i) => {
      return acc + i.cantidad * i.precio;
    }, 0);

    return subtotal;
  };

  recalcularDescuento = (items) => {
    const descento = items.reduce((acc, i) => {
      return (
        acc + i.cantidad * ((i.customboxid ? 0 : i.descuento / 100) * i.precio)
      );
    }, 0);

    return descento;
  };

  handleChange = async (calcetinId, varianteId, cantidad) => {
    this.api.establecerElementoCarrito(calcetinId, varianteId, cantidad);
    const items = [...this.state.items];
    const index = items.findIndex(
      (i) => i.calcetinId === calcetinId && i.varianteId === varianteId
    );
    if (index >= 0) {
      items[index].cantidad = cantidad;
      const total = this.recalcularTotal(items);
      const subtotal = this.recalcularSubtotal(items);
      const descuento = this.recalcularDescuento(items);

      this.setState({
        items,
        total,
        subtotal,
        descuento,
      });
    }
  };

  handleOnDeletePress = (id) => {
    Swal.fire({
      title: 'Estás segur@ de eliminar el elemento del carrito?',
      text: 'Esta acción es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.deleteCartItem(id);
        Swal.fire(
          'Eliminado!',
          'El prodcuto fue eliminado del carrito.',
          'success'
        );
      }
    });
  };

  deleteCartItem = async (id) => {
    this.api.eliminarElementoCarrito(id);
    const items = [...this.state.items];
    let product = items.find((el) => el.id === id);

    if (product.customboxid) {
      let newItems = items.filter((el) => el.customboxid !== id);
      const total = this.recalcularTotal(newItems);

      this.setState({
        items: newItems,
        total,
      });
    } else {
      const index = items.findIndex((i) => i.id === id);
      if (index >= 0) {
        items.splice(index, 1);
        const total = this.recalcularTotal(items);
        this.setState({
          items,
          total,
        });
      }
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: '#eee', paddingBottom: '40px' }}>
        <Header title='Carrito' />
        <Container className='cartContainer'>
        {this.state.cargando ? (
            <Loader />
          ) : this.state.items.length ? (
            <div className='cartCard'>
              <Row>
                <Col className="cartItemContainer">
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
                      total={i.total}
                      discount={i.descuento}
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
                      onDeletePress={() => this.handleOnDeletePress(i.id)}
                      is2x1={i.is2x1}
                      is3x2={i.is3x2}
                      is4x3={i.is4x3}
                      customboxid={i.customboxid}
                    />
                  ))}
                </Col>
              </Row>
             
              <div className='total-container'>
                 <div class="grid-container">
                <div class="grid-item">
                  <p className='totalAndPrice'>Subtotal:</p>
                </div>
                <div class="grid-item">
                  <p className='totalAndPrice'>
                    {Numeral(this.state.subtotal).format('$0,0.00')}
                  </p>
                </div>
                { this.carrito && this.carrito.descuento > 0 && (
                  <>
                    <div class="grid-item">
                    <p className='totalAndPrice discount'>Descuento: </p>
                  </div>
                  <div class="grid-item">
                  <p className='totalAndPrice discount'>
                      {Numeral(this.state.descuento).format('$0,0.00')}
                    </p>
                  </div>
                  </>
                )}
                {this.carrito && this.carrito.descuento2x1 > 0 && ( 
                      <>
                        <div class="grid-item">
                          <p className='totalAndPrice discount'>Descuento 2x1: </p>
                        </div>
                        <div class="grid-item">
                          <p className='totalAndPrice discount'>
                            {Numeral(this.carrito.descuento2x1).format('$0,0.00')}
                          </p>
                        </div>
                      </>
                  )}
              {this.carrito && this.carrito.descuento3x2 > 0 && (
                <>
                  <div class="grid-item">
                    <p className='totalAndPrice discount'>Descuento 3x2: </p>
                  </div>
                  <div class="grid-item">
                    <p className='totalAndPrice discount'>
                    {Numeral(this.carrito.descuento3x2).format('$0,0.00')}
                   </p>
                   </div>
                 </>
               )}
               {this.carrito && this.carrito.descuento4x3 > 0 && (
                <>
                  <div class="grid-item">
                    <p className='totalAndPrice discount'>Descuento 4x3: </p>
                  </div>
                  <div class="grid-item">
                    <p className='totalAndPrice discount'>
                    {Numeral(this.carrito.descuento4x3).format('$0,0.00')}
                    </p>
                  </div>
                  </>  
                )}
                <div class="grid-item">
                  <p className='totalAndPrice'>Total:</p>
                </div>  
                <div class="grid-item">
                  <p className='totalAndPrice'>
                      {Numeral(
                        this.state.total -
                          this.carrito.descuento2x1 -
                          this.carrito.descuento3x2 -
                          this.carrito.descuento4x3
                      ).format('$0,0.00')}
                    </p>
                </div> 
              </div>
            </div>
              <Row className='btnContainer'>
                <Col>
                  <Link to={`/carrito/${this.carrito.id}/pedido`}>
                    <button>Proceder al pago</button>
                  </Link>
                </Col>
              </Row>
          </div>
            
          ) : (
            <React.Fragment>
              <h5 className='carritoVacio mt-4'>
                No hay calcetines en tu carrito.
              </h5>
              <h5 className='carritoVacio'>
                Pudes agregar calcetines directamente de la
                <Link to='/tienda'> Tienda</Link>
              </h5>
            </React.Fragment>
          )}
        </Container>
      </div>
    );
  }
}
