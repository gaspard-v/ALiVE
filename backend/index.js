const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("ALiVE api is running.");
});

app.get("/api/object/:id", function (req, res, next) {
  res.json({ output: req.params.id });
});

app.post("/api/object/create", function (req, res) {
  console.log("receiving data ...");
  console.log("body is ", req.body);
  res.send(req.body);
});

app.listen(8080, () =>
  console.log("ALiVE app server is listening on port 8080.")
);
