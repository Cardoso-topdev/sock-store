import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Header from './Header/Header';
import Loader from './Loader/Loader';

import DragNDropv3 from './DragNDropv3';

import imgX from './assets/X.png';

import * as Numeral from 'numeral';

import Webapi from '../api/Webapi';

export default function CustomBox({
  c,
  handleClickAgregarCarrito,
  outOfStock,
  handleClickComprarAhora,
  customBoxProducts,
  loading,
}) {
  let api = new Webapi();
  return (
    <>
      <div className='upperWrapper'>
        <Header title='Tienda' />
        <div
          className='container containerItemDetails'
          style={{ padding: '1em' }}
        >
          <div className='btnX'>
            <Link to='/tienda'>
              <img src={imgX} alt='X' />
            </Link>
          </div>

          {!c || loading ? (
            <Loader />
          ) : (
            <>
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
              <Container>
                <Row>
                  <Col xs={12} md={8} className='m-auto'>
                    <div className='cartControllersContainer box'>
                      <div>
                        <div className='itemDescription'>
                          {c.descripcion.split('\n').map((i, key) => (
                            <p key={key}>{i}</p>
                          ))}
                        </div>
                      </div>

                      <DragNDropv3
                        customBoxProducts={customBoxProducts}
                        handleClickAgregarCarrito={handleClickAgregarCarrito}
                        handleClickComprarAhora={handleClickComprarAhora}
                        outOfStock={outOfStock}
                        c={c}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </div>
      </div>
    </>
  );
}
