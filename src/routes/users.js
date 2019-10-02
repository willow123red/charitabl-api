const router = require("express").Router();

module.exports = queries => {
  router.get("/users", (request, response) => {
    queries.getDonationsByUser().then(users => {
      response.json(users);
    });
  });

  return router;
};