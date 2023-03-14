import express, { json } from "express";
import * as dotenv from "dotenv";
import { createPool } from "mariadb";
import { Room } from "./room.js";
import { Map } from "./map.js";
import { Place } from "./place.js";
import { Object } from "./object.js";
import { Characters } from "./characters.js";
import { Day } from "./day.js";
import { Dialogue } from "./dialogue.js";
import { Sentence } from "./sentence.js";
import { File } from "./file.js";
import { room_place } from "./room_place.js";
import { Door } from "./door.js";

dotenv.config();

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 100,
});

const app = express();
app.use(json());

app.use((req, res, next) => {
  if (process.env.DEV) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
  }
  next();
});

app.get("/api", async (req, res) => {
  res.send("ALiVE api is running.");
});

Room(app, pool);
Map(app, pool);
Place(app, pool);
Object(app, pool);
Characters(app, pool);
Day(app, pool);
Dialogue(app, pool);
Sentence(app, pool);
File(app, pool);
Door(app, pool);
room_place(app, pool);

app.listen(8080, async () =>
  console.log("ALiVE app server is listening on port 8080.")
);
