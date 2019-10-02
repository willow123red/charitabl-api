//require('dotenv').config()
const express = require('express')
const app = express()
const client = require('./db/index');

app.get('/', function (req, res) {
  res.send(client)
})

app.listen(process.env.PORT || 8080, '0.0.0.0', function() {
  console.log(`Listening on ${process.env.PORT}`);
});