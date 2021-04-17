import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Loader from '../../components/Loader/Loader';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';

import Swal from 'sweetalert2';

import './Contact.css';

import logoWhatsapp from '../../shared/image/whatsapp_logo.png';

import Webapi from '../../api/Webapi';

import ReactPixel from 'react-facebook-pixel';

export default class Contact extends Component {
  state = {};
  constructor(props) {
    super(props);

    this.api = new Webapi();

    this.state = {
      captcha: null,
      loading: false,
      validated: false,
      validatonError: false,
      form: {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
      },
    };
  }

  initFacebookPixel() {
    ReactPixel.pageView();
  }

  componentDidMount() {
    this.initFacebookPixel();
    loadReCaptcha('6LfQqcEUAAAAAIjajvJit-cEtcoTSnlk1Ea23GA1');
  }

  verifyCallback = (recaptchaToken) => {
    this.setState({
      captcha: recaptchaToken,
    });
  };

  componentWillUnmount() {
    if (document.querySelector('.grecaptcha-badge'))
      document.querySelector('.grecaptcha-badge').remove();
  }

  handleChange = (e) => {
    if (e.target.name === 'telefono') {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value.substr(0, 10),
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

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({
        loading: true,
      });

      this.sendMessageRequest();
    }

    this.setState({
      validated: true,
    });
  };

  sendMessageRequest = async () => {
    const prospect = {
      name: this.state.form.nombre,
      email: this.state.form.email,
      phone: this.state.form.telefono
    }
    try {
      let response = await this.api.sendMessage(
        this.state.form.nombre,
        this.state.form.email,
        this.state.form.telefono,
        this.state.form.mensaje,
        this.state.captcha
      );

      if (response.status === 201) {
        this.setState({
          loading: false,
          validated: false,
          form: {
            nombre: '',
            email: '',
            telefono: '',
            mensaje: '',
          },
        });

        ReactPixel.track('Lead', { data: prospect } );
        Swal.fire({
          title: 'Mensaje enviado correctamente',
          html:
            'Gracias por contactarnos, en breve un asesor se pondrá en contacto contigo a través del correo que proporcionaste',
          icon: 'success',
          confirmButtonColor: '#00cc80',
          confirmButtonText: 'Ok',
        });
      }
    } catch (err) {
      console.error(err);
      this.setState({
        loading: false,
      });
      if (err.response.status === 403) {
        Swal.fire({
          title: 'Falló la autenticación de reCAPTCHA',
          html:
            'Parce que nuestro sistema detectó que eras un robot, por favor, pídele a un humano que haga este proceso',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <Header title='Contáctanos'></Header>
            <Container className='contactContainer mt-3 mb-3'>
              <Row>
                <Col>
                  <h3>Déjanos tu mensaje</h3>
                </Col>
              </Row>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
                action='#'
                method='POST'
                id='form'
                className='mb-1'
              >
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId='validationCustom21'>
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
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId='validationCustom22'>
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
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group as={Col} controlId='validationCustom23'>
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
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId='validationCustom24'>
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        value={this.state.form.mensaje}
                        name='mensaje'
                        type='text'
                        placeholder='Escribe tu mensaje aquí'
                        as='textarea'
                        rows='3'
                        required
                      />
                      <Form.Control.Feedback type='invalid'>
                        Por favor ingresa un mensaje
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button className='btnAddToCart btn-rounded pl-5 pr-5'>
                      Enviar mensaje
                    </button>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Col>
                  <hr className='hr_row float-left' />
                  <span className='m-auto'>O</span>
                  <hr className='hr_row float-right' />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className='mb-0 mt-2 text-center'>
                    Manda un mensaje directo
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <a
                    onClick={() => ReactPixel.track('Lead', { title: "whatsapp message redirect" } )}
                    href="https://api.whatsapp.com/send?phone=523122256192&text=Hola,%20me%20%20interesan%20sus%20productos,%20vengo%20de%20tucalcetin.com.mx" target="_blank"
                  >
                    <img
                      src={logoWhatsapp}
                      alt='Whatsapp Icon'
                      className='logoWhatsapp'
                    />
                  </a>
                </Col>
              </Row>
              <ReCaptcha
                sitekey='6LfQqcEUAAAAAIjajvJit-cEtcoTSnlk1Ea23GA1'
                action='homepage'
                verifyCallback={this.verifyCallback}
              />
            </Container>
          </>
        )}
      </>
    );
  }
}
