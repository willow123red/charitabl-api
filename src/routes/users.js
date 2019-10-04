const router = require("express").Router();

module.exports = queries => {
  
  router.get("/users", (request, response) => {
    queries.getAllUsers().then(users => {
      response.json(users);
    })
    .catch(error => console.log(error));
  });

  router.put("/signup", (request, response) => {
    console.log("request.body", request.body)
    queries.createNewUser(request.body).then((user) => {
        response.status(200).json(user);
    })
    .catch(error => console.log("EEEError", error));
  });

  router.get("/users/:id", (request, response) => {
    queries.getDonationsByUser(request.user.id).then(donations => {
      response.json(donations);
    })
    .catch(error => console.log(error));
  });

  router.put("/users/:id/charities/:id/:donation_amount", (request, response) => {
    queries.makeUserDonation(request.body.donation).then(() => {
      setTimeout(() => {
        response.status(204).json({});
      }, 1000);
    })
    .catch(error => console.log(error));
  });

  return router;
};