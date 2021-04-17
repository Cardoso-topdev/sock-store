import React, { Component } from 'react';
import Webapi from '../../api/Webapi';
import * as queryString from 'query-string';
import Swal from 'sweetalert2';
import ReactPixel from 'react-facebook-pixel';
export default class Success extends Component {
  api = new Webapi();

  initFacebookPixel() {
    ReactPixel.pageView();
  }

  componentDidMount() {
    this.initFacebookPixel();
    const parsed = queryString.parse(window.location.search);

    const id = this.props.match.params.id;
    this.api.obtenerPedido(id, parsed.token).then((response) => {
      ReactPixel.track('Purchase', {
        value: response.total,
        currency: 'MXN',
      });
      if (response) {
        Swal.fire({
          title: 'Compra Exitosa',
          html:
            'Gracias!, en breve te llegará un correo con el detalle de tu pedido. Te contactaremos si es necesario.<br/><strong>Revisa tu bandeja de spam, en caso de no recibir ningún correo por favor, contáctanos</strong>',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
        localStorage.removeItem('carritoId');
      } else {
        Swal.fire('Oops...', 'Algo salió mal, vuelve a intentarlo', 'error');
      }
    });
  }

  render() {
    return <></>;
  }
}
