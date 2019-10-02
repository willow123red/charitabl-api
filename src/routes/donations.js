const router = require("express").Router();


module.exports = db => {
  router.get("/donations", (request, response) => {
    db.query(
      `
      SELECT * FROM donations
      `
    ).then(({ rows: donations }) => {
      response.json(donations);
    });
  });

  return router;
};