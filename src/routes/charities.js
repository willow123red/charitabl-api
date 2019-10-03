const router = require("express").Router();

module.exports = queries => {
  router.get("/charities", (request, response) => {
    queries.getAllCharities().then(charities => {
      response.json(charities);
    })
    .catch(error => console.log(error));
  });

  router.get("/charities/:id/donations", (request, response) => {
    queries.getDonationsByCharity(request.params.id).then(donations => {
      response.json(donations);
    })
    .catch(error => console.log(error));
  });
  
  return router;
};