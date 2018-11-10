const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const routes = require("./routes");

mongoose.connect(
  "mongodb://goweek:goweek1230@ds117422.mlab.com:17422/goweek201811",
  { useNewUrlParser: true }
);

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3000, () => {
  console.log("Server started on port 3000!");
});
