const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeChargeCallback = res => (stripeError, stripeResponse) => {
  if (stripeError) {
    response.status(500).send({
      error: stripeError
    });
  } else {
    response.status(200).send({
      success: stripeResponse
    });
  }
};

const paymentApi = app => {
  router.get("/payment", (request, response) => {
    response.send({
      message: "Hello Stripe checkout server!",
      timestamp: new Date().toISOString()
    });
  });
  router.post("/payment", (request, response) => {
    const body = {
      source: request.body.token.id,
      amount: request.body.amount,
      currency: "cad"
    };
    stripe.charges.create(body, stripeChargeCallback(response));
  });
  return app;
};

module.exports = { paymentApi };
