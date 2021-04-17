import React, { useState } from 'react';

export default function OrderDetails(props) {
  const {
    orderAmount,
    discount,
    shippingCost,
    hasComision,
    PaypalFee,
    total
  } = props;
  


  return (
    <>
      <div className='amountTotalContainer amountTotalContainerPaypal'>
        <span>
          Subtotal:
          <strong>${orderAmount + discount}</strong>
        </span>
        {discount > 0 && (
          <span className='discount_color'>
            Descuento: <strong>${discount}</strong>
          </span>
        )}
        <span>
          Envío: <strong>${shippingCost}</strong>
        </span>
        {hasComision && (
          <span>
            Comisión:
            <strong>${PaypalFee || 0}</strong>
          </span>
        )}
        <span>
          Total:
          <strong>${total}</strong>
        </span>
      </div>
    </>
  );
}
