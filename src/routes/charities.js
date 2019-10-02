const router = require("express").Router();

module.exports = queries => {
  router.get("/charities", (request, response) => {
    queries.getAllCharities().then(charities => {
      response.json(charities);
    });
  });

  return router;
};