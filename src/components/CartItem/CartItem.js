import React, { Component } from 'react';
import './CartItem.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { InputNumber } from 'antd';

import AnimateOnChange from 'react-animate-on-change';

import * as Numeral from 'numeral';

export default class CartItem extends Component {
  state = {
    quantity: this.props.quantity,
  };
  disableDelete = this.props.disableDelete;
  disableQuantity = this.props.disableQuantity;

  handleChange = async (value) => {
    this.setState({
      quantity: value,
      total: value * this.props.price * (1 - this.props.discount / 100),
      animate: true,
    });
    this.props.handleChange(value);
    setTimeout(() => {
      this.setState({
        animate: false,
      });
    }, 300);
  };

  handleDelete = () => {
    if (this.props.onDeletePress) {
      this.props.onDeletePress();
    }
  };

  render() {
    return (
      <Container
        className='itemContainer'
        style={{
          marginLeft:
            this.props.customboxid && this.props.customboxid !== this.props.id
              ? '1rem'
              : '0.3rem',
          paddingLeft: '11px',
        }}
      >
        {this.props.outOfStock && (
          <p style={{ color: 'red' }}>
            No hay suficiente stock de este producto, reduce la cantidad o
            eliminalo de tu carrito para continuar. Disponible(s):{' '}
            {this.props.stock}
          </p>
        )}
        <Row>
          <Col xs={7} sm={7} className='itemNameAndImageContainer'>
            <div
              className='itemImage'
              style={{ background: `url(${this.props.img})` }}
            ></div>
            <div className='nameAndSKU'>
              <h6>{this.props.name}</h6>
              <p>{this.props.SKU}</p>
              <p>Talla: {this.props.talla}</p>
              <p>
                {this.props.is2x1 === 1 && (
                  <span className='discount_percentaje pl-0 font-size-09'>
                    2x1
                  </span>
                )}
                {this.props.is3x2 === 1 && (
                  <span className='discount_percentaje pl-0 font-size-09'>
                    3x2
                  </span>
                )}
                {this.props.is4x3 === 1 && (
                  <span className='discount_percentaje pl-0 font-size-09'>
                    4x3
                  </span>
                )}
              </p>
            </div>
          </Col>
          <Col>
            {this.disableQuantity || this.props.customboxid ? (
              <span>{this.state.quantity}</span>
            ) : (
              <InputNumber
                min={1}
                max={this.props.stock}
                defaultValue={this.state.quantity}
                type='number'
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            )}
          </Col>
          <Col className='subtotalEliminar'>
            {this.disableDelete ? null : this.props.customboxid &&
              this.props.customboxid !== this.props.id ? null : (
              <button className='x' onClick={this.handleDelete}>
                X
              </button>
            )}
            <AnimateOnChange
              baseClassName='itemTotal'
              animationClassName='onChange'
              animate={this.state.animate}
            >
              <p className='itemTotal d-flex flex-column'>
                {this.props.customboxid ? (
                  <>
                    <span className='d-inline-block font-size-1'>
                      {Numeral(this.props.total).format('$0,0.00')}
                    </span>
                    {this.props.customboxid !== this.props.id && (
                      <span style={{ color: 'green' }} className='font-size-09'>
                        Paquete
                      </span>
                    )}
                  </>
                ) : (
                  <span className='d-inline-block font-size-1'>
                    {Numeral(
                      this.props.price *
                        this.props.quantity *
                        (1 - this.props.discount / 100)
                    ).format('$0,0.00')}
                  </span>
                )}
                {this.props.discount > 0 && (
                  <span className='discount_price_line'>
                    <span className='discount_price text-gray-black font-size-09'>
                      {Numeral(this.state.quantity * this.props.price).format(
                        '$0,0.00'
                      )}
                    </span>
                  </span>
                )}
              </p>
            </AnimateOnChange>
          </Col>
        </Row>
      </Container>
    );
  }
}
