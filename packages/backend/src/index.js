const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb://goweek:goweek1230@ds117422.mlab.com:17422/goweek201811",
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  return res.send("Hello World!!!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
