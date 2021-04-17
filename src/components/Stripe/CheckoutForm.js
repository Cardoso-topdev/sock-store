import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import OrderDetails from "../Payment/OrderTotalDetails/OrderTotalDetails";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import axios from 'axios';
import clienteAxios from '../../config/clienteAxios'
import MessageError from "./MessageError";

export default function CheckoutForm({ total, shippingMethodId, form }) {
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  //Conexion a stripe
  const stripe = useStripe();

  //Habilitando elements
  const elements = useElements();
  const history = useHistory();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const cartId = localStorage.getItem("carritoId");

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    const amount = total * 100;
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "https://asit-backend.herokuapp.com/api/checkout",
          {
            id,
            amount,
          }
        );

        let inputs = document.querySelectorAll(".form-control");
        Object.values(inputs)
          .slice(inputs.length - 5)
          .forEach((el) => el.setAttribute("required", true));
        console.log(data);
        if (data.status === 205) {
          await clienteAxios.post("/carrito", {
            cartId,
          });

          await clienteAxios.put(`/carrito/${cartId}/envios`, {
            tipoEnvioId: shippingMethodId,
          });
          await clienteAxios.post(`/carrito/${cartId}/pedidoPaypal`, {
            nombre: form.nombre,
            apellidos: form.apellidos,
            email: form.email,
            telefono: form.telefono,
            estado: form.estado,
            municipio: form.municipio,
            codigoPostal: form.codigoPostal,
            colonia: form.colonia,
            calle: form.calle,
            noExterno: form.noExterno,
            referencia: form.referencia,
            pagoId: id,
            tipoPedido: "Stripe"
          });

          setShowMessage(false);
          localStorage.removeItem("carritoId");
          history.push("/tienda/pedido/SuccessfulPurchase");
        } else {
          elements.getElement(CardElement).clear();
          setLoading(false);
          setShowMessage(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Router>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="btnPay"
          id="stripeButton"
          disabled={disabled}
          //onClick={handleStripeClick}
        >
          {loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            "Pagar"
          )}
        </Button>

        {showMessage ? <MessageError /> : console.log("Pago exitoso")}
      </form>
    </Router>
  );
}
