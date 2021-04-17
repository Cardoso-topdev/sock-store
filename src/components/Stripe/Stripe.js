import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISTHlKyaVT85oTKRLlmmB0YyaUse7WoCnxyTPLVk6F2JRjDG4slES0q07smzQgk5Huov7JJ79FXlXJxiPvLfus0001Id4D66x");

export default function Stripe({total, shippingMethodId, form}) {

  return (
    <div className="Stripe">
      <Elements stripe={promise}
      >
        <CheckoutForm
        total={total}
        shippingMethodId={shippingMethodId}
        form={form}
       />
      </Elements>
    </div>
  );
}
