import express, { json } from "express";
import { createPool } from "mariadb";
import { objectBigIntToInt } from "./utils.js";
import { handlerError, handlerSuccess } from "./handler.js";

const pool = createPool({
  host: "localhost",
  user: "alive",
  password: "5e6c&6iP&m6p6aQd$A&f",
  database: "alive",
  connectionLimit: 5,
});

const app = express();
app.use(json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api", async (req, res) => {
  res.send("ALiVE api is running.");
});

app.get("/api/object", async (req, res, next) => {
  let conn;
  pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query("CALL getObjects(?,?,?)", ["", -1, -1]);
    })
    .then((result) => {
      result = result[0].map((element) => {
        return objectBigIntToInt(element);
      });
      handlerSuccess(result, req, res, next);
    })
    .catch((err) => {
      handlerError(err, req, res, next);
    })
    .finally(() => {
      if (conn) conn.end();
    });
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
    const object_query_response = await conn.query(
      "INSERT INTO Object(name, description, isTool) VALUES (?, ?, ?)",
      [name, description, isTool]
    );
    if (imagename && image) {
      const file_query_response = await conn.query(
        "INSERT INTO File(filename, data) VALUES (?, ?)",
        [imagename, image]
      );
      await conn.query(
        "INSERT INTO ObjectFile(ObjectId, FileId) VALUES (?, ?)",
        [
          parseInt(object_query_response.insertId),
          parseInt(file_query_response.insertId),
        ]
      );
    }
    await conn.commit();
    res.send({ status: "success" });
  } catch (err) {
    res.send(err);
  } finally {
    if (conn) conn.end();
  }
});

app.listen(8080, async () =>
  console.log("ALiVE app server is listening on port 8080.")
);
