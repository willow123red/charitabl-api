const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = queries => {
  router.post("/payment", async (request, response) => {
    console.log(request.body, "request.body in payments.js")
    console.log(request.params, "request.params in payments.js")
    try {
      let strp = await stripe.charges.create({
        amount: request.body.amount,
        currency: "cad",
        description: request.body.charity.name,
        source: request.body.token.id
      });
      console.log(strp, "strp in payments.js")

      response.json({
        status: strp.status
      });
    } catch (error) {
      console.log(error);
      response.status(500).end();
    }
  });
  
  return router;
};
