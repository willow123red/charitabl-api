//require('dotenv').config()
const express = require('express')
const app = express()

 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(process.env.PORT || 8080, '0.0.0.0', function() {
  console.log(`Listening on ${process.env.PORT}`);
});