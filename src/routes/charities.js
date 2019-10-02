const router = require("express").Router();

module.exports = db => {
  router.get("/charities", (request, response) => {
    db.query(
      `
      SELECT * FROM charities
      `
    ).then(({ rows: charities }) => {
      response.json(charities);
    });
  });

  return router;
};