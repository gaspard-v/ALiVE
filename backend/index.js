const express = require("express");
const bodyParser = require("body-parser");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "alive",
  password: "5e6c&6iP&m6p6aQd$A&f",
  connectionLimit: 5,
});

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("ALiVE api is running.");
});

app.get("/api/object/:id", function (req, res, next) {
  res.json({ output: req.params.id });
});

app.post("/api/object/create", function (req, res) {
  let conn;
  try {
    conn = pool.getConnection();
    console.log("receiving data ...");
    console.log("body is ", req.body);
    res.send(req.body);
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) conn.end();
  }
});

app.listen(8080, () =>
  console.log("ALiVE app server is listening on port 8080.")
);
