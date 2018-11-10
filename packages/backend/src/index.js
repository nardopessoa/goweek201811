const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

mongoose.connect(
  "mongodb://goweek:goweek1230@ds117422.mlab.com:17422/goweek201811",
  { useNewUrlParser: true }
);

app.use(routes);

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
