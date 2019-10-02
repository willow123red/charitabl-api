require('dotenv').config()
const pg = require("pg");
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client
  .connect(console.log('Connected! You are awesome!'))
  .catch(error => console.log(`Error connecting to Heroku Postgres server:\n${error}`));

module.exports = client;