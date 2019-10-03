const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const db = require("./db")
const queries = require("./db/queries")(db);

const charities = require("./routes/charities")(queries);
const users = require("./routes/users")(queries);
const donations = require("./routes/donations")(queries);

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

const setLoggedInUser = (request, response, next) => {
  request.user = {
    id: 1,
    email: 'test@test.com'
  }
  next();
}

module.exports = function application(
  ENV,
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use(setLoggedInUser)

  app.use("/api", charities);
  app.use("/api", users);
  app.use("/api", donations);

  if (ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/db_schema.sql`)),
      read(path.resolve(__dirname, `db/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function() {
    return db.end();
  };

  return app;
};
