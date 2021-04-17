import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Openpay from '../../components/Openpay/Openpay';
import Stripe from '../../components/Stripe/Stripe';
import Loader from '../../components/Loader/Loader';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

import { PayPalButton } from 'react-paypal-button-v2';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';

import { Redirect } from 'react-router-dom';

import './Payment.css';

import Webapi from '../../api/Webapi';
import Shipping from '../../components/Shipping/Shipping';

import Swal from 'sweetalert2';

import ReactPixel from 'react-facebook-pixel';

import paypalLogo from '../../shared/image/paypal.png';
import cardIcon from '../../shared/image/credit-card.png';
import openPayLogo from '../../components/Openpay/img/openpay.png';
import stripeLogo from '../../components/Stripe/img/stripe.png';
import mercadoPagoLogo from '../../components/MercadoPago/img/mercado_pago.png';
import shopIconPaynet from '../../shared/image/shop.png';
import arrowDownIcon from './assets/arrow.png';
import Paynet from '../../components/Payment/Paynet/Paynet';
import ContactDetails from '../../components/Payment/ContactDetails/ContactDetails';
import OrderTotalDetails from '../../components/Payment/OrderTotalDetails/OrderTotalDetails';
import DiscountCode from '../../components/DiscountCode';


export default class Payment extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.orderDetailsComponent = React.createRef();
    this.api = new Webapi();

    this.state = {
      loading: false,
      validated: false,
      redirect: false,
      tokenId: '',
      deviceId: '',
      shippingMethodId: undefined,
      form: {
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        estado: '',
        municipio: '',
        codigoPostal: '',
        colonia: '',
        calle: '',
        noExterno: '',
        referencia: '',
      },
      termsAccepted: false,
      buttonDisabled: false,
      orderAmount: 0,
      discount: 0,
      shippingOptions: [],
      shippingCost: 0,
      totalPaypalFee: 0,
      totalPayPal: 0,
      totalStripe:0,
      carrito: {},
      outOfStock: false,
    };
  }

  initFacebookPixel() {
    ReactPixel.pageView();
  }

  requestShippingOptions = async () => {
    try {
      const cartId = this.props.match.params.carritoid;

      const shippingOptions = await this.api.getShippingByCart(cartId);

      this.setState({
        shippingOptions: shippingOptions,
      });
      this.handleShippingOptions(shippingOptions);
    } catch (err) {
      console.log(`There was an error ${err}`);
    }
  };

  getShoppingCart = async () => {
    let carrito = await this.api.obtenerCarrito(
      this.props.match.params.carritoid
    );
    let outOfStock = false;
    carrito.calcetines.forEach((el) => {
      if (el.cantidad > el.stock) outOfStock = true;
    });

    this.setState({
      carrito,
      outOfStock,
      buttonDisabled: outOfStock,
    });

    this.orderDetailsComponent.current.updateCart();
    return carrito;
  };

  async initCartAndGTM() {
    let carrito = await this.getShoppingCart();
    this.pushCheckoutEventToGTM(carrito);
  }

  componentDidMount() {
    this.initFacebookPixel();
    this.changeFooterBottomMargin(43);
    this.requestShippingOptions();

    this.initCartAndGTM();
  }

  componentWillUnmount() {
    this.changeFooterBottomMargin(64);
  }

  pushCheckoutEventToGTM = (carrito) => {
    let GTMProducts = carrito.calcetines.map((c) => {
      return {
        name: c.nombre,
        id: c.calcetinId,
        price: c.precio,
        brand: 'Tu Calcetin',
        category: c.coleccion,
        variant: c.talla,
        quantity: c.cantidad,
      };
    });

    window.dataLayer.push({
      event: 'checkout',
      ecommerce: {
        checkout: {
          actionField: { step: 1, option: '' },
          products: GTMProducts,
        },
      },
    });
  };

  changeFooterBottomMargin = (pixels) => {
    document.querySelector('footer').style.marginBottom = `${pixels}px`;
  };

  handleChangeRadio = (e) => {
    let shippingMethodId = parseInt(e.target.value);

    let shippingMethodData = this.state.shippingOptions.find(
      (el) => el.id === shippingMethodId
    );

    let shippingCost = shippingMethodData ? shippingMethodData.precio : 0;

    let subtotal = this.state.orderAmount + shippingCost;

    // 0.0395 = 3.9% fee from paypal + $4MXN
    let feedWithoutTaxes = subtotal / (1 - 0.0395) + 4 - subtotal;
    //Add taxes 16%
    let PaypalFeeWholeNumer = feedWithoutTaxes / (1 - 0.16);
    //Fix to two decimal values
    let PaypalFee = parseFloat(PaypalFeeWholeNumer.toFixed(2));

    let totalPayPal = subtotal + PaypalFee;

    this.setState({
      shippingMethodId,
      shippingCost,
      PaypalFee,
      totalPayPal,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      buttonDisabled: true,
    });
    const form = event.currentTarget;

    if (form.checkValidity() === false || !this.form.current.validateForm()) {
      event.stopPropagation();
      this.setState({
        loading: false,
        buttonDisabled: false,
      });
    } else {
      this.form.current
        .getToken()
        .then((data) => {
          this.crearPedido({
            ...this.state.form,
            token: data.token,
            device: data.device,
          });
          this.setState({
            tokenId: data.token,
            deviceId: data.device,
          });
        })
        .catch((err) => {
          this.setState({
            loading: false,
            buttonDisabled: false,
          });
          this.showSwalError();
          console.error(`Error handleSubit: ${err}`);
        });
    }
  };

  handleCheck = (e) => {
    this.setState({
      termsAccepted: e.target.checked,
    });
  };

  crearPedido = async (formData) => {
    try {
      let pedido = await this.api.crearPedido(
        this.props.match.params.carritoid,
        formData,
        this.state.shippingMethodId
      );
      ReactPixel.track('InitiateCheckout');
      if (pedido.status === 201) {
        if (pedido.data.url3d) {
          window.location.href = pedido.data.url3d;
        } else {
          ReactPixel.track('AddPaymentInfo', { data: { paymentMethod: "Other" }});
          ReactPixel.track('Purchase', {
            value: this.state.orderAmount + this.state.shippingCost,
            currency: 'MXN',
          });
          this.props.history.push('/tienda/pedido/SuccessfulPurchase');
          this.submitGTMEvent(pedido.data);
          this.setState({
            loading: false,
          });
          localStorage.removeItem('carritoId');
        }
      } else if (pedido.status !== 201) {
        this.setState({
          loading: false,
          buttonDisabled: false,
        });
        this.showSwalError();
      }
    } catch (err) {
      if (err.response.status === 400) {
        this.setState({
          loading: false,
          buttonDisabled: false,
        });
        this.showValidationError();
      } else {
        this.setState({
          loading: false,
          buttonDisabled: false,
        });
        this.showSwalError();
      }
    }
  };

  showSwalError = () => {
    Swal.fire({
      title: 'Oops...',
      text: 'Algo salió mal, vuelve a intentarlo',
      icon: 'error',
    });
  };

  showValidationError = () => {
    Swal.fire({
      title: 'Revisa tus datos de envío',
      html:
        'Debes seleecionar una opción de envío y completar <u>todos</u> tus datos de envío.',
      icon: 'error',
    });
  };

  handleChange = (e) => {
    if (e.target.name === 'telefono') {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value.substr(0, 10),
        },
      });
    } else if (e.target.name === 'codigoPostal') {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value.substr(0, 5),
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  redirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) return <Redirect to='/tienda' />;
  };

  handleUpdateTotalAndDiscount = (total, discount) => {
    let totalPlusShipping = total + this.state.shippingCost;
    // 0.0395 = 3.9% fee from paypal + $4MXN
    let feedWithoutTaxes =
      totalPlusShipping / (1 - 0.0395) + 4 - totalPlusShipping;
    //Add taxes 16%
    let PaypalFeeWholeNumer = feedWithoutTaxes / (1 - 0.16);
    //Fix to two decimal values
    let PaypalFee = parseFloat(PaypalFeeWholeNumer.toFixed(2));
    this.setState({
      orderAmount: total,
      discount: discount,
      PaypalFee: PaypalFee,
      totalPayPal: totalPlusShipping + PaypalFee,
    });
  };

  handlePaypalclick = (data, actions) => {
    let inputs = document.querySelectorAll('.form-control');
    Object.values(inputs)
      .slice(inputs.length - 5)
      .forEach((el) => el.removeAttribute('required'));

    let form = document.querySelector('#payment-form');
    if (form.checkValidity() === false) {
      this.showValidationError();
      return actions.reject();
    } else {
      ReactPixel.track('InitiateCheckout');
      return actions.resolve();
    }
  };

  crearPedidoPaypal = async (formData, pagoId) => {
    this.setState({
      loading: true,
    });
    try {
      let pedido = await this.api.crearPedidoPaypal(
        this.props.match.params.carritoid,
        formData,
        this.state.shippingMethodId,
        pagoId
      );
      if (pedido.status === 201) {
        this.props.history.push('/tienda/pedido/SuccessfulPurchase');
        localStorage.removeItem('carritoId');

        this.submitGTMEvent(pedido.data);
      } else if (pedido.status !== 201) {
        Swal.fire({
          title: 'Oops...',
          html:
            'Algo salió mal al enviar los datos de tu pedido, por favor, <a href="whatsapp://send?text=Hola,%20tuve%20un%20problema%20con%20mi%20pedido,%20vengo%20de%20tucalcetin.com.mx&amp;phone=+523122309242&amp;abid=+523122309242">contáctanos</a></strong>',
          icon: 'error',
        });
        this.setState({
          loading: false,
        });
      }
    } catch (err) {
      console.error(err);
      this.setState({
        loading: false,
      });
      Swal.fire({
        title: 'Oops...',
        html:
          'Algo salió mal al enviar los datos de tu pedido, por favor, <a href="whatsapp://send?text=Hola,%20tuve%20un%20problema%20con%20mi%20pedido,%20vengo%20de%20tucalcetin.com.mx&amp;phone=+523122309242&amp;abid=+523122309242">contáctanos</a></strong>',
        icon: 'error',
      });
    }
  };

  handleStripeClick = () => {
    let inputs = document.querySelectorAll('.form-control');
    Object.values(inputs)
      .slice(inputs.length - 5)
      .forEach((el) => el.setAttribute('required', true));
  };

  handleOpenpayClick = () => {
    let inputs = document.querySelectorAll('.form-control');
    Object.values(inputs)
      .slice(inputs.length - 5)
      .forEach((el) => el.setAttribute('required', true));
  };

  handlePaynetClick = (e) => {
    let inputs = document.querySelectorAll('.form-control');
    Object.values(inputs)
      .slice(inputs.length - 5)
      .forEach((el) => el.removeAttribute('required'));

    let form = document.querySelector('#payment-form');
    if (form.checkValidity() === true) this.crearPedidoPaynet(this.state.form);
  };

  crearPedidoPaynet = async (formData) => {
    try {
      let pedido = await this.api.crearPedidoPaynet(
        this.props.match.params.carritoid,
        formData,
        this.state.shippingMethodId
      );
      ReactPixel.track('InitiateCheckout');

      if (pedido.status === 201) {
        ReactPixel.track('AddPaymentInfo', { data: { paymentMethod: "Paynet" }});
        ReactPixel.track('Purchase', {
          value: this.state.orderAmount + this.state.shippingCost,
          currency: 'MXN',
        });
        this.setState({
          loading: false,
        });
        localStorage.removeItem('carritoId');

        this.submitGTMEvent(pedido.data);
        this.props.history.push('/tienda/pedido/SuccessfulPurchase');
      } else if (pedido.status !== 201) {
        this.setState({
          loading: false,
          buttonDisabled: false,
        });
        this.showSwalError();
      }
    } catch (err) {
      if (err.response.status === 400) {
        this.setState({
          loading: false,
          buttonDisabled: false,
        });
        this.showValidationError();
      } else {
        this.setState({
          loading: false,
          buttonDisabled: false,
        });
        this.showSwalError();
      }
    }
  };

  submitGTMEvent = (pedido) => {
    let GTMProducts = pedido.calcetines.map((c) => {
      return {
        name: c.nombre,
        id: c.calcetinOriginalId,
        price: c.precioUnitario,
        brand: 'Tu Calcetin',
        category: c.coleccion,
        variant: c.talla,
        quantity: c.cantidad,
      };
    });

    window.dataLayer.push({
      ecommerce: {
        purchase: {
          actionField: {
            id: pedido.id, //Transaction ID
            affiliation: 'Tienda en línea',
            paymentMethod: pedido.tipoPedido
              ? pedido.tipoPedido
              : 'tarjeta de débito o crédito',
            subtotal: pedido.subtotal,
            revenue: pedido.total, //Total value
            totalDiscount: pedido.descuentoTotal,
            shipping: pedido.envio,
            coupon: pedido.codigoDescuento || '',
          },
          products: GTMProducts,
        },
      },
    });
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <Header title='Datos de envío y pago' />
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <h5 className='headerPhrase'>
              Estás a un paso más cerca de darle a tus pies lo que se merecen
            </h5>
            <Container className='formContainer'>
              <h2>Detalles del pedido</h2>

              <DiscountCode
                carritoId={this.props.match.params.carritoid}
                carrito={this.state.carrito}
                getShoppingCart={this.getShoppingCart}
                requestShippingOptions={this.requestShippingOptions}
              />

              <OrderDetails
                handleUpdateTotalAndDiscount={this.handleUpdateTotalAndDiscount}
                carritoId={this.props.match.params.carritoid}
                ref={this.orderDetailsComponent}
              />

              <Form
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
                action='#'
                method='POST'
                id='payment-form'
              >
                <Form.Row>
                  <Col xs={12}>
                    <h2>Selecciona tu forma de envío</h2>
                  </Col>
                  <Shipping
                    handleChangeRadio={this.handleChangeRadio}
                    carritoId={this.props.match.params}
                    handleShippingOptions={this.handleShippingOptions}
                    shippingOptions={this.state.shippingOptions}
                  />
                  <Col xs={12}>
                    <h2>Datos de envío</h2>
                  </Col>
                  <Form.Group as={Col} md='4' controlId='validationCustom01'>
                    <Form.Label>Nombre(s)</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.nombre}
                      name='nombre'
                      required
                      type='text'
                      placeholder='Ej. “Juan”'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor, ingresa tu(s) nombre(s)
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='4' controlId='validationCustom02'>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.apellidos}
                      name='apellidos'
                      required
                      type='text'
                      placeholder='Ej. "Pérez Hernández"'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor, ingresa tus apellidos
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='4'
                    xs='6'
                    controlId='validationCustomUsername'
                  >
                    <Form.Label>Celular</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id='inputGroupPrepend'>
                          +52
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        onChange={this.handleChange}
                        value={this.state.form.telefono}
                        name='telefono'
                        type='number'
                        placeholder='Ej. "111-222-3344"'
                        aria-describedby='inputGroupPrepend'
                        required
                      />
                      <Form.Control.Feedback type='invalid'>
                        Por favor, ingresa tu celular
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='6'
                    xs='6'
                    controlId='validationCustom03'
                  >
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.email}
                      name='email'
                      type='email'
                      placeholder='ejemplo@gmail.com'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa un correo electrónico válido
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='3'
                    xs='6'
                    controlId='validationCustom04'
                  >
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.estado}
                      name='estado'
                      type='text'
                      placeholder='Ej. "Colima"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa un estado
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='3'
                    xs='6'
                    controlId='validationCustom05'
                  >
                    <Form.Label>Código Postal</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.codigoPostal}
                      name='codigoPostal'
                      type='number'
                      placeholder='Ej. "28475"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa un código postal
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md='3'
                    xs='6'
                    controlId='validationCustom06'
                  >
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.municipio}
                      name='municipio'
                      type='text'
                      placeholder='Ej. "Colima"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa un municipio
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='3'
                    xs='6'
                    controlId='validationCustom07'
                  >
                    <Form.Label>Colonia</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.colonia}
                      name='colonia'
                      type='text'
                      placeholder='Ej. "Lindavista"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa una colonia
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='3'
                    xs='6'
                    controlId='validationCustom08'
                  >
                    <Form.Label>Calle</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.calle}
                      name='calle'
                      type='text'
                      placeholder='Ej . "Girasoles"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa una calle
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='3'
                    xs='6'
                    controlId='validationCustom09'
                  >
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.noExterno}
                      name='noExterno'
                      type='number'
                      placeholder='Ej. "1562"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa un número
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId='validationCustom10'>
                    <Form.Label>Referencia</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.form.referencia}
                      name='referencia'
                      type='text'
                      placeholder='Ej. No. Interior, Entre calles, "casa color verde, portón negro"'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Por favor ingresa una referencia
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <a
                    href='/terminosyaviso'
                    target='_blank'
                    className='terminos'
                  >
                    <Form.Check
                      required
                      name='termsAccepted'
                      onChange={this.handleCheck}
                      checked={this.state.termsAccepted}
                      label='Acepto los Términos, Condiciones y el Aviso de Privacidad'
                    />
                  </a>
                </Form.Group>
                <h2 className='headerDatosPago'>Selecciona tu forma pago</h2>


                <div className="videoPayment">
                <h4>En caso de tener problemas con tu pago aqui tenemos la solución!!!</h4>
                <iframe class="video" src="https://player.vimeo.com/video/536998090?badge=0&amp;autopause=0&amp;app_id=58479" width="80%" height="" frameborder="0" autoplay="1" allow="autoplay; fullscreen;" allowfullscreen></iframe>
                </div>

                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='0'>
                      <h4>
                        <img
                          className='mr-2'
                          src={shopIconPaynet}
                          alt='icono de tienda'
                        />
                        Tiendas de convenencia (Kiosko, Waltmart, Sam's,
                        7-Eleven,etc.)
                        <img
                          src={arrowDownIcon}
                          alt='flecha apuntando hacia abajo'
                          className='arrowDownIcon'
                        />
                      </h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='0' key={1}>
                      <Card.Body>
                        <Paynet
                          orderAmount={this.state.orderAmount}
                          discount={this.state.discount}
                          shippingCost={this.state.shippingCost}
                          buttonDisabled={this.state.buttonDisabled}
                          handlePaynetClick={this.handlePaynetClick}
                          outOfStock={this.state.outOfStock}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='1'>
                      <h4>
                        {' '}
                        <img
                          className='mr-2'
                          src={stripeLogo}
                          alt='icono de tarjeta'
                        />{' '}
                        Tarjeta de crédito o débito
                        <img
                          src={arrowDownIcon}
                          alt='flecha apuntando hacia abajo'
                          className='arrowDownIcon'
                        />
                      </h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='1' key={1}>
                      <Card.Body>
                      <div className='pagoTarjeta'>

                          {this.state.outOfStock || (
                          <Stripe
                          ref={this.form}
                          total={
                              this.state.orderAmount + this.state.shippingCost
                            }
                            shippingMethodId={this.state.shippingMethodId}
                            form={this.state.form}
                          />
                         )}
                          <OrderTotalDetails
                            orderAmount={this.state.orderAmount}
                            discount={this.state.discount}
                            shippingCost={this.state.shippingCost}
                            totalStripe={
                              this.state.orderAmount + this.state.shippingCost
                            }
                            total={
                              this.state.orderAmount + this.state.shippingCost
                            }
                          />
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='2'>
                      <h4>
                        {' '}
                        <img
                          className='mr-2'
                          src={openPayLogo}
                          alt='icono de tarjeta'
                        />{' '}
                        Tarjeta de crédito o débito
                        <img
                          src={arrowDownIcon}
                          alt='flecha apuntando hacia abajo'
                          className='arrowDownIcon'
                        />
                      </h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='2' key={2}>
                      <Card.Body>
                        <div className='pagoTarjeta'>
                          <Openpay
                            merchantID='mjpqsmpkhjgabedvg6u7'
                            publicKey='pk_ebeff3ede53244d69ec9847e0eab651f'
                            isSandbox={false}
                            ref={this.form}
                          />
                          <OrderTotalDetails
                            orderAmount={this.state.orderAmount}
                            discount={this.state.discount}
                            shippingCost={this.state.shippingCost}
                            total={
                              this.state.orderAmount + this.state.shippingCost
                            }
                          />

                          <Button
                            type='submit'
                            className='btnPay'
                            id='tarjetaButton'
                            disabled={this.state.buttonDisabled}
                            onClick={this.handleOpenpayClick}
                          >
                            Pagar
                          </Button>
                          {this.state.outOfStock && (
                            <h6 style={{ color: 'red' }}>
                              Alguno(s) de los productos en el carrito están
                              fuera de stock, eliminalos de tu carrito para
                              poder continuar tu compra
                            </h6>
                          )}
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='3'>
                      <h4>
                        {' '}
                        <img
                          className='mr-2'
                          src={mercadoPagoLogo}
                          alt='icono de tarjeta'
                        />{' '}
                        Tarjeta de crédito o débito
                        <img
                          src={arrowDownIcon}
                          alt='flecha apuntando hacia abajo'
                          className='arrowDownIcon'
                        />
                      </h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='3' key={3}>
                      <Card.Body>
                        
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='4'>
                      <h4>
                        <img
                          className='mr-2'
                          src={paypalLogo}
                          alt='logo paypal'
                        />{' '}
                        Paypal
                        <img
                          src={arrowDownIcon}
                          alt='flecha apuntando hacia abajo'
                          className='arrowDownIcon'
                        />
                      </h4>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='4' key={4}>
                      <Card.Body>
                        {this.state.outOfStock && (
                          <h6 style={{ color: 'red' }}>
                            Alguno(s) de los productos en el carrito están fuera
                            de stock, eliminalos de tu carrito para poder
                            continuar tu compra
                          </h6>
                        )}
                        {this.state.outOfStock || (
                          <PayPalButton
                            onClick={this.handlePaypalclick}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      currency_code: 'MXN',
                                      value: this.state.totalPayPal,
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order
                                .capture()
                                .then((details) => {
                                  // Show a success message to your buyer
                                  this.crearPedidoPaypal(
                                    this.state.form,
                                    data.orderID
                                  );
                                  ReactPixel.track('AddPaymentInfo', { data: { paymentMethod: "Paypal" }});
                                  ReactPixel.track('Purchase', {
                                    value:
                                      this.state.orderAmount +
                                      this.state.shippingCost,
                                    currency: 'MXN',
                                  });
                                })
                                .catch((err) => {
                                  this.showSwalError();
                                });
                            }}
                            options={{
                              clientId:
                                'AeZo3a7S15wEx3vMXVlxflAloydJk7SYSEnwsP2Ke6zcBoFhihUbR-QQp4r52XBpJjAQhX_eMW0gvs7p',
                              currency: 'MXN',
                            }}
                          />
                        )}

                        <OrderTotalDetails
                          orderAmount={this.state.orderAmount}
                          discount={this.state.discount}
                          shippingCost={this.state.shippingCost}
                          hasComision={true}
                          PaypalFee={this.state.PaypalFee}
                          total={this.state.totalPayPal}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Form>
            </Container>

            <ContactDetails />
          </>
        )}
      </>
    );
  }
}
