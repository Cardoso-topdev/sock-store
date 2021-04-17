import React from 'react';

import LocationIcon from './assets/locationIcon';
import ShopIcon from './assets/ShopIcon';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default function Paynet(props) {
  const {
    orderAmount,
    discount,
    shippingCost,
    buttonDisabled,
    handlePaynetClick,
    outOfStock,
  } = props;
  return (
    <>
      <p className='lead'>
        Te damos un documento con los detalles de pago y puedes acudir a
        cualquier tienda de convenencia afiliada a realizar el pago.
      </p>

      <p>Algunas tiendas en las que pueden realizar el pago</p>

      <Image
        src='https://s3.amazonaws.com/images.openpay/vertical.gif'
        fluid
        className='paynetShopsVerticalal'
      />

      <Image
        src='https://s3.amazonaws.com/images.openpay/Horizontal_1.gif'
        fluid
        className='paynetShopsHorizontal'
      />
      <div className='paynetWrapperButton'>
        <a
          href='https://www.paynet.com.mx/mapa-tiendas/index.html'
          target='_blank'
          rel='noopener noreferrer'
          className='text-center'
        >
          <Button variant='outline-info' className='paynetLocationButton'>
            <LocationIcon className='paynetLocationIcon' />
            Consulta tiendas cercas de ti
          </Button>
        </a>
        <a
          href='https://www.openpay.mx/tiendas/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-center'
        >
          <Button variant='outline-dark' className='paynetTiendasButton'>
            <ShopIcon className='paynetShopIcon' />
            Consulta todas las tiendas afiliadas
          </Button>
        </a>
      </div>

      <div className='amountTotalContainer'>
        <span>
          Subtotal: <strong>${orderAmount + discount}</strong>
        </span>
        {discount > 0 && (
          <span className='discount_color'>
            Descuento: <strong>${discount}</strong>
          </span>
        )}
        <span>
          Envío: <strong>${shippingCost}</strong>
        </span>
        <span>
          Total:
          <strong>${orderAmount + shippingCost}</strong>
        </span>
      </div>

      <Button
        type='submit'
        className='btnPay'
        id='paynetButton'
        disabled={buttonDisabled}
        onClick={handlePaynetClick}
      >
        Pagar
      </Button>
      {outOfStock && (
        <h6 style={{ color: 'red' }} className='mt-2'>
          Alguno(s) de los productos en el carrito están fuera de stock,
          eliminalos de tu carrito para poder continuar tu compra
        </h6>
      )}
      <b>Tendrás 3 días naturales para realizar tu pago</b>
    </>
  );
}
