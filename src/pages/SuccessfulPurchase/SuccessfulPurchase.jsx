import React, { Component } from 'react';
import Swal from 'sweetalert2';
import initFacebookPixel from '../../components/FacebookPixel';

export default class SuccessfulPurchase extends Component {
  componentDidMount() {
    Swal.fire({
      title: 'Compra Exitosa',
      html:
        'Gracias!, en breve te llegará un correo con el detalle de tu pedido. Te contactaremos si es necesario.<br/><strong>Revisa tu bandeja de spam, en caso de no recibir ningún correo por favor, <a href="whatsapp://send?text=Hola,%20tuve%20un%20problema%20con%20mi%20pedido,%20vengo%20de%20tucalcetin.com.mx&amp;phone=+523122309242&amp;abid=+523122309242">contáctanos</a></strong>',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        this.props.history.push('/');
      }
    });
    initFacebookPixel();
  }
  render() {
    return <></>;
  }
}
