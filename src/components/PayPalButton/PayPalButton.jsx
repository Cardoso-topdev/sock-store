import React, { Component } from 'react';

export default class PayPalButton extends Component {
  componentDidMount() {
    this.loadedOpenpay = false;

    this.loadPayPal();
  }

  loadPayPal = () => {
    const PayPalScript = document.createElement('script');
    PayPalScript.src =
      'https://www.paypal.com/sdk/js?client-id=AfbLRhAilRfAiK4x_Oy8oMY9yf-Xzxpig5rR5ELPY4UYCnaqJgVJbrk-qUk6wpkSk5fglvnqJk4wJx7p&currency=MXN';
    PayPalScript.defer = true;
    PayPalScript.id = 'PayPalScript';
    document.body.appendChild(PayPalScript);

    PayPalScript.onload = () => {
      this.renderPayPalButton(this.props.amount);
      this.loadedOpenpay = true;
    };
  };

  updateAmount = (amount) => {
    this.forceUpdate();

    document.querySelector('#paypal-button-container').innerHTML = '';
    if (this.loadedOpenpay) {
      this.renderPayPalButton(amount);
    } else {
      setTimeout(() => this.updateAmount(amount), 500);
    }
  };

  renderPayPalButton(amount) {
    window.paypal
      .Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'pay',
        },
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            this.props.history.push('/tienda/pedido/SuccessfulPurchase');
          });
        },
      })
      .render('#paypal-button-container');
  }

  componentWillUnmount() {
    const PayPalScript = document.getElementById('PayPalScript');
    if (PayPalScript) PayPalScript.remove();
  }

  render() {
    return (
      <>
        <div id='paypal-button-container'></div>
      </>
    );
  }
}
