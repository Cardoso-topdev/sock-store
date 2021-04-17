const express = require("express");
const app = express();
const cors = require("cors");
const Stripe = require("stripe");
const mercadopago = require("mercadopago");

const stripe = new Stripe(
  "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"
);

app.use(cors());
app.use(express.static("."));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let op = 0;

//Metodo post para recibir id Stripe desde front end
app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "MXN",
      description: "Id producto",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);
    op = 205;
    console.log("Este es el status" + op);
    res.json({ status: op });
  } catch (error) {
    res.json({ message: error.raw.message });
  }
});

//Integrando MercadoPago
// Agrega credenciales
mercadopago.configure({
  access_token: "PROD_ACCESS_TOKEN",
});

/* Crea un objeto de preferencia*/
let preferences = {
  items: [
    {
      title: "Mi producto",
      unit_price: 100,
      quantity: 1,
    },
  ],
};

app.post("/api/checkout/mercadopago", async (req, res) => {
  //const { items} = JSON.parse(req.body);
  const preference = await mercadopago.preferences
    .create(preferences)
    .then((response) => {
      res.json({
        preferenceId: response.body.init_point.split("pref_id=")[1],
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).send(error);
    });
});

/*
mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});*/

app.listen(4242, () => console.log("Node server listening on port 4242!"));
