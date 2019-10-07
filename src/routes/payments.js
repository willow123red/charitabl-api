const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = () => {
  router.post("/payment", async (request, response) => {
    try {
      let {
        status
      } = await stripe.charges.create({
        amount: 2000,
        currency: "cad",
        description: "An example charge",
        source: request.body
      });

      response.json({
        status
      });
    } catch (error) {
      console.log(error);
      response.status(500).end();
    }
  });
  
  return router;
};