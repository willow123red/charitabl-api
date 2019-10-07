const router = require("express").Router();

module.exports = queries => {
  
  router.get("/users", (request, response) => {
    queries.getAllUsers().then(users => {
      response.json(users);
    })
    .catch(error => console.log(error));
  });

  router.put("/signup", (request, response) => {
    queries.createNewUser(request.body).then((user) => {
      response.status(200).json(user);
    })
    .catch(error => console.log(error));
  });

  router.put("/login", (request, response) => {
    queries.loginUser(request.body).then((user) => {
      response.status(200).json(user);
    })
    .catch(error => console.log(error));
  });

  router.get("/users/:id/donations", (request, response) => {
    queries.getDonationsByUser(request.params.id).then(donations => {
      response.json(donations);
    })
    .catch(error => console.log(error));
  });

  return router;
};