import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import './Openpay.css';

export default class Openpay extends Component {
  state = {
    holder_name: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv2: '',
    deviceId: '',
    token: '',
    ready: false,
    isCardNumberValid: undefined,
    isExpValid: undefined,
    isCvvValid: undefined,
    isCardNumberInvalid: undefined,
    isExpInvalid: undefined,
    isCvvInvalid: undefined,
  };
  intervalId = null;

  componentDidMount() {
    this.loadOpenPayV1();
  }

  loadOpenPayV1 = () => {
    const openpayV1 = document.createElement('script');
    openpayV1.src = 'https://openpay.s3.amazonaws.com/openpay.v1.min.js';
    openpayV1.defer = true;
    document.body.appendChild(openpayV1);

    openpayV1.onload = () => {
      this.loadOpenPayData();
    };
  };

  loadOpenPayData = () => {
    const openpayData = document.createElement('script');
    openpayData.src = 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js';
    openpayData.defer = true;
    document.body.appendChild(openpayData);

    openpayData.onload = () => {
      this.initOpenPay();
    };
  };

  initOpenPay = () => {
    try {
      this.intervalId = setInterval(() => {
        if (window.OpenPay && window.OpenPay.deviceData) {
          clearInterval(this.intervalId);
          window.OpenPay.setId(this.props.merchantID);
          window.OpenPay.setApiKey(this.props.publicKey);
          window.OpenPay.setSandboxMode(this.props.isSandbox);

          var deviceSessionId = window.OpenPay.deviceData.setup(
            'payment-form',
            'deviceIdHiddenFieldName'
          );
          this.setState({
            deviceId: deviceSessionId,
            ready: true,
          });
        }
      }, 1000);
    } catch (err) {
      //console.log(`ERROR: ${err}`);
    }
  };

  handleChange = (e) => {
    switch (e.target.name) {
      case 'card_number':
        this.setState({
          [e.target.name]: e.target.value.substr(0, 16),
        });
        break;
      case 'cvv2':
        this.setState({
          [e.target.name]: e.target.value.substr(0, 4),
        });
        break;
      case 'expiration_month':
        this.setState({
          [e.target.name]: e.target.value.substr(0, 2),
        });
        break;
      case 'expiration_year':
        this.setState({
          [e.target.name]: e.target.value.substr(0, 2),
        });
        break;
      default:
        this.setState({
          [e.target.name]: e.target.value,
        });
    }
  };

  getToken = () => {
    return new Promise((res, rej) => {
      window.OpenPay.token.extractFormAndCreate(
        'payment-form',
        (data) => {
          res({
            token: data.data.id,
            device: this.state.deviceId,
          });
        },
        (data) => {
          //console.log("Error al tokenizar");
          rej(data);
        }
      );
    });
  };

  componentWillUnmount() {
    const openpayV1 = document.getElementById('openpayV1');
    if (openpayV1) openpayV1.remove();
    const openpayData = document.getElementById('openpayData');
    if (openpayData) openpayData.remove();
    // const iframes = document.querySelectorAll('iframe');
    // iframes.forEach((el) => el.remove());
    delete window.OpenPay;
  }

  validateForm = () => {
    let errors = false;
    if (window.OpenPay) {
      if (window.OpenPay.card.validateCardNumber(this.state.card_number)) {
        this.setState({
          isCardNumberValid: true,
        });
      } else {
        errors = true;
        this.setState({
          isCardNumberValid: false,
          isCardNumberInvalid: true,
        });
      }

      if (window.OpenPay.card.validateCVC(this.state.cvv2)) {
        this.setState({
          isCvvValid: true,
        });
      } else {
        errors = true;
        this.setState({
          isCvvValid: false,
          isCvvInvalid: true,
        });
      }

      if (
        window.OpenPay.card.validateExpiry(
          this.state.expiration_month,
          `20${this.state.expiration_year}`
        )
      ) {
        this.setState({
          isExpValid: true,
        });
      } else {
        errors = true;
        this.setState({
          isExpValid: false,
          isExpInvalid: true,
        });
      }
    }
    return errors ? false : true;
  };

  render() {
    return (
      <>
        <Container fluid={true} className='openpay-container'>
          <input type='hidden' name='token_id' id='token_id' />
          <Container fluid={true}>
            <Row>
              <Col>
                <h2 className='form-header'>Tarjeta de crédito o débito</h2>
              </Col>
            </Row>
            <Row className='aviableCardsContainer'>
              <Col xs={12} className='credit'>
                <h4>Tarjetas de crédito</h4>
              </Col>
              <Col xs={12} className='debit'>
                <h4>Tarjetas de débito</h4>
              </Col>
            </Row>
          </Container>
          <Container fluid={true} className='openpayFormContainer'>
            <Form.Row>
              <Form.Group
                as={Col}
                md='6'
                xs='12'
                controlId='validationCustom11'
              >
                <Form.Label>Nombre del titular</Form.Label>
                <Form.Control
                  name='holder_name'
                  onChange={this.handleChange}
                  value={this.state.holder_name}
                  type='text'
                  placeholder='Como aparece en la tarjeta'
                  autoComplete='off'
                  data-openpay-card='holder_name'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Por favor ingresa el nombre del titular
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md='6'
                xs='12'
                controlId='validationCustom12'
              >
                <Form.Label>Número de tarjeta</Form.Label>
                <Form.Control
                  name='card_number'
                  onChange={this.handleChange}
                  value={this.state.card_number}
                  type='number'
                  placeholder='16 digitos'
                  autoComplete='cc-number'
                  data-openpay-card='card_number'
                  required
                  isValid={this.state.isCardNumberValid}
                  isInvalid={this.state.isCardNumberInvalid}
                />
                <Form.Control.Feedback type='invalid'>
                  Número de tarjeta invalido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md='3' xs='6' controlId='validationCustom13'>
                <Form.Label>Fecha de expiración</Form.Label>
                <Form.Control
                  name='expiration_month'
                  onChange={this.handleChange}
                  value={this.state.expiration_month}
                  type='number'
                  placeholder='Mes'
                  autoComplete='cc-exp-month'
                  data-openpay-card='expiration_month'
                  isValid={this.state.isExpValid}
                  isInvalid={this.state.isExpInvalid}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Mes de expiración invalido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='3' xs='6' controlId='validationCustom14'>
                <Form.Label className='labelExpirationYear'></Form.Label>
                <Form.Control
                  name='expiration_year'
                  onChange={this.handleChange}
                  value={this.state.expiration_year}
                  type='number'
                  placeholder='Año'
                  autoComplete='cc-exp-year'
                  data-openpay-card='expiration_year'
                  isValid={this.state.isExpValid}
                  isInvalid={this.state.isExpInvalid}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Año de expiración invalido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md='3' xs='6' controlId='validationCustom15'>
                <Form.Label>Código de seguridad</Form.Label>
                <Form.Control
                  name='cvv2'
                  onChange={this.handleChange}
                  value={this.state.cvv2}
                  type='number'
                  placeholder='3 dígitos'
                  autoComplete='cc-csc'
                  data-openpay-card='cvv2'
                  isValid={this.state.isCvvValid}
                  isInvalid={this.state.isCvvInvalid}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Código de seguridad invalido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row className='openpayLogosContainer'>
              <Col className='logo' xs={5}>
                <p>Transacciones realizadas vía:</p>
              </Col>
              <Col className='shield' xs={7}>
                <p>
                  Tus pagos se realizan de forma segura con encriptación de 256
                  bits
                </p>
              </Col>
            </Form.Row>
          </Container>
        </Container>
      </>
    );
  }
}
