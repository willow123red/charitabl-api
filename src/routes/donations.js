const router = require("express").Router();

module.exports = queries => {
  
  router.get("/donations", (request, response) => {
    queries.getAllDonations().then(donations => {
      response.json(donations);
    });
  });
  
  return router;
};