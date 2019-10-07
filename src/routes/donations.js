const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports = queries => {

  router.post("/donation", async (request, response) => {
    await stripe.charges.create({
        amount: request.body.amount,
        currency: "cad",
        description: request.body.charity.name,
        source: request.body.token.id
      })
      .then(({ status }) => {
        queries.makeUserDonation(request.body).then((donation) => {
          response.status(200).json({ status, donation });
        }).catch(error => {
          console.log(error)
          response.status(500).end("DB error");
        })
      })
      .catch(error => {
        console.log(error)
        response.status(500).end("Stripe Error");
      });
  });

  // router.put("donations/users/:id/charities/:id/:donationAmount", (request, response) => {
  //   queries.makeUserDonation(request.body).then(() => {
  //       response.status(200).json(donation);
  //     })
  //     .catch(error => console.log(error));
  // });

  router.get("/donations", (request, response) => {
    queries.getAllDonations().then(donations => {
        response.json(donations);
      })
      .catch(error => console.log(error));
  });

  return router;
};