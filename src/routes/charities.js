const router = require("express").Router();

module.exports = queries => {
  
  router.get("/charities/all", (request, response) => {
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

  router.get("/charities", (request, response) => {
    queries.getAllCharitiesSpecificInfo(request.params.id).then(charities => {
      response.json(charities);
    })
    .catch(error => console.log(error));
  });

  router.get("/charities/:id", (request, response) => {
    queries.getCharityById(request.params.id).then(charities => {
      response.json(charities);
    })
    .catch(error => console.log(error));
  });

  return router;
};