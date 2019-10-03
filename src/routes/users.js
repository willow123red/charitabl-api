const router = require("express").Router();

module.exports = queries => {
  router.get("/users", (request, response) => {
    queries.getAllUsers().then(users => {
      response.json(users);
    })
    .catch(error => console.log(error));
  });

  router.get("/users/:id", (request, response) => {
    queries.getDonationsByUser(request.user.id).then(users => {
      response.json(users);
    })
    .catch(error => console.log(error));
  });

  return router;
};