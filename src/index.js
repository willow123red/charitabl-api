const PORT = process.env.PORT || 8080;
const ENV = require("./environment");

const app = require("./application")(ENV);
const server = require("http").Server(app);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT} in ${ENV} mode.`);
});
