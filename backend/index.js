const express = require("express");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "alive",
  password: "5e6c&6iP&m6p6aQd$A&f",
  database: "alive",
  connectionLimit: 5,
});

const app = express();
app.use(express.json());

app.get("/api", async (req, res) => {
  res.send("ALiVE api is running.");
});

app.get("/api/object/:id", async function (req, res, next) {
  res.json({ output: req.params.id });
});

app.post("/api/object/create", async function (req, res) {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("receiving data ...");
    console.log("body is ", req.body);
    ({ name, description, isTool, imagename, image } = req.body);
    await conn.query(
      "INSERT INTO Object(name, description, isTool) VALUES (?, ?, ?)",
      [name, description, isTool]
    );
    await conn.query("INSERT INTO File(filename, data) VALUE (?, ?)", [
      imagename,
      image,
    ]);
  } catch (err) {
    res.send(err);
  } finally {
    if (conn) conn.end();
  }
});

app.listen(8080, async () =>
  console.log("ALiVE app server is listening on port 8080.")
);
