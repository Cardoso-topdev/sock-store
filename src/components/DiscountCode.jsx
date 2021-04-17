import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

import Webapi from '../api/Webapi';
import Swal from 'sweetalert2';

export default function DiscountCode({
  carrito,
  carritoId,
  getShoppingCart,
  requestShippingOptions,
}) {
  const [isDiscountCodeValid, setIsDiscountCodeValid] = useState(false);
  const [isDiscountCodeInvalid, setIsDiscountCodeInvalid] = useState(false);
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  const api = new Webapi();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (carrito && carrito.descuentoTotal)
      confirmApplyCuponWhenAlreadyHasDiscount();
    else applyDiscountCode(discountCodeInput);
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCodeInput(e.target.value);
  };

  const applyDiscountCode = async (discountCode) => {
    setLoading(true);
    try {
      let response = await api.applyDiscountCode(discountCode, carritoId);

      if (response && response.status === 200) {
        requestShippingOptions();
        getShoppingCart();

        setLoading(false);

        setIsDiscountCodeValid(true);
        setIsDiscountCodeInvalid(false);
      } else {
        setLoading(false);
        setIsDiscountCodeValid(false);
        setIsDiscountCodeInvalid(true);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setIsDiscountCodeValid(false);
      setIsDiscountCodeInvalid(true);
    }
  };

  useEffect(() => {
    if (carrito.codigoDescuento) setIsDiscountCodeValid(true);
  }, [carrito]);

  const removeDiscountCode = async () => {
    try {
      let response = await api.removeDiscountCode(carritoId);

      if (response && response.status === 204) {
        Swal.fire({
          icon: 'success',
          title: 'Codigo de descuento removido',
          text: '',
        });

        requestShippingOptions();
        getShoppingCart();

        setIsDiscountCodeValid(false);
        setIsDiscountCodeInvalid(false);
        setDiscountCodeInput('');
      } else {
        showSwalError();
      }
    } catch (err) {
      console.error(err);
      showSwalError();
    }
  };

  const showSwalError = () => {
    Swal.fire({
      title: 'Oops...',
      text: 'No se pudo elminar el cupón, por favor, vuelve a intentarlo',
      icon: 'error',
    });
  };

  const confirmApplyCuponWhenAlreadyHasDiscount = () => {
    Swal.fire({
      title: 'Estás segur@ de aplicar este cupón?',
      text:
        'Al aplicarse este cupón se removerá cualquier tipo de oferta que se tenía y se aplicarán los beneficios del cupón',
      icon: 'warning',
      showCancelButton: true,
      footer:
        'No te preocupes, puedes aplicarlo y si al final decides que prefieres quedarte con las ofertas anteriores, lo puedes eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aplicar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        applyDiscountCode(discountCodeInput);
      }
    });
  };

  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit}
        className='d-flex justify-content-center'
      >
        <Form.Row className='discountCodeContainer'>
          <Form.Group as={Col} xs={8} controlId='validationCustom01'>
            <Form.Label>
              <b>Código de descuento</b>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Introduce aquí tu código'
              className='font-size-small'
              isValid={isDiscountCodeValid}
              isInvalid={isDiscountCodeInvalid}
              onChange={handleDiscountCodeChange}
              value={discountCodeInput}
              disabled={carrito && carrito.codigoDescuento}
            />
            <Form.Control.Feedback>
              <div>
                Código de descuento aplicado{' '}
                <Toast onClose={removeDiscountCode}>
                  <Toast.Header>
                    <strong className='mr-auto'>
                      {carrito &&
                        carrito.codigoDescuento &&
                        carrito.codigoDescuento.codigoDescuento}
                    </strong>
                  </Toast.Header>
                </Toast>
              </div>
              <div>
                Ahora tienes{': '}
                <ul>
                  {carrito &&
                    carrito.codigoDescuento &&
                    !!carrito.codigoDescuento.porcentajeDescuento && (
                      <li>{`${carrito.codigoDescuento.porcentajeDescuento}
                     % de descuento.`}</li>
                    )}
                  {carrito &&
                    carrito.codigoDescuento &&
                    !!carrito.codigoDescuento.is2x1 && (
                      <li>2x1 en todos los productos.*</li>
                    )}
                  {carrito &&
                    carrito.codigoDescuento &&
                    !!carrito.codigoDescuento.is3x2 && (
                      <li>3x2 en todos los productos.*</li>
                    )}
                  {carrito &&
                    carrito.codigoDescuento &&
                    !!carrito.codigoDescuento.is4x3 && (
                      <li>4x3 en todos los productos.*</li>
                    )}
                  {carrito &&
                    carrito.codigoDescuento &&
                    !!carrito.codigoDescuento.envioGratisEstandar && (
                      <li>Envio gratis estandar.</li>
                    )}
                  {carrito &&
                    carrito.codigoDescuento &&
                    !!carrito.codigoDescuento.envioGratisEconomico && (
                      <li>Envio gratis economico.</li>
                    )}
                </ul>
              </div>

              {carrito &&
                !!carrito.codigoDescuento &&
                (!!carrito.codigoDescuento.is2x1 ||
                  !!carrito.codigoDescuento.is3x2 ||
                  !!carrito.codigoDescuento.is4x3) && (
                  <p style={{ color: 'black' }}>
                    <span style={{ fontSize: '90%' }}>
                      *Excepto los productos de la colección denominada
                      "Paquetes".
                    </span>
                  </p>
                )}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Introduce un código de descuento válido
            </Form.Control.Feedback>
          </Form.Group>
          <Col xs={4}>
            <Button
              type='submit'
              className='btnDiscountCode'
              disabled={isLoading || (carrito && carrito.codigoDescuento)}
            >
              {isLoading ? 'Cargando...' : 'Aplicar'}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
}
