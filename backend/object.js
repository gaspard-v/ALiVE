import { handlerError, handlerSuccess } from "./handler.js";
import { objectBigIntToInt } from "./utils.js";
import { createFile, addFileRelation } from "./file.js";

export function getObject(
  pool,
  object_uuid = "",
  place_uuid = "",
  room_uuid = "",
  full = false
) {
  let conn;
  let columns = [
    "HEX(Object.uuid) as uuid",
    "Object.name as name",
    "Object.description as description",
    "Object.isTool as isTool",
  ];
  let query = "SELECT {0} FROM Object ";
  let parameters = [];
  if (object_uuid) {
    query += " WHERE Object.uuid = UNHEX(?) ";
    parameters.push(object_uuid);
  }
  if (place_uuid && room_uuid) {
    query += `INNER JOIN PlaceRoomObject ON Object.id = PlaceRoomObject.ObjectId 
    INNER JOIN PlaceRoom ON PlaceRoomObject.PlaceRoomId = PlaceRoom.id 
    INNER JOIN Place ON PlaceRoom.PlaceId = Place.id AND Place.uuid = UNHEX(?) 
    INNER JOIN Room ON PlaceRoom.RoomId = Room.id AND Room.uuid = UNHEX(?) `;
    parameters.push(room_uuid);
    parameters.push(place_uuid);
    columns.push("PlaceRoomObject.Xcoord as x");
    columns.push("PlaceRoomObject.Ycoord as y");
  }
  query = query.replace("{0}", columns.join(", "));
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => result)
    .finally(() => {
      if (conn) conn.end();
    });
}

/*
étape 1: écrire la requete dans phpmyadmin
étape 2: copier la requete dans la fonction correspondante
étape 3: remplacer les les paramètres par des ? (pour éviter les injections sql)
étape 4: exécuter la requete avec la fonction pool.
 */

export function createObject(pool, name, description, isTool) {
  let conn;
  const createObjectQuery =
    "INSERT INTO Object (description, isTool, name) VALUES (?, ?, ?) RETURNING HEX(uuid) as uuid, description, isTool, name";
  return pool
    .getConnection()
    .then((conn) => {
      return conn.query(createObjectQuery, [description, isTool, name]);
    })
    .then((result) => {
      let formatedResult = objectBigIntToInt(result[0]);
      return formatedResult;
    })
    .finally(() => {
      if (conn) conn.end();
    });
}

export const Object = (app, pool) => {
  app.get("/api/object", async function (req, res, next) {
    getObject(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/object/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getObject(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.post("/api/object", async function (req, res, next) {
    try {
      const { name, description, isTool, image_name, image_data } = req.body;
      const result_object = await createObject(pool, name, description, isTool);
      const result_create_file = await createFile(pool, image_name, image_data);
      const result_join_file = await addFileRelation(
        pool,
        result_create_file["uuid"],
        ["object", result_object["uuid"]]
      );
      handlerSuccess(result_object, req, res, next);
    } catch (err) {
      handlerError(err, req, res, next);
    }
  });
};
