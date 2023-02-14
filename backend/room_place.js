import { handlerError, handlerSuccess } from "./handler.js";
import { objectBigIntToInt } from "./utils.js";

export function addRoomPlaceRelation(pool, { room_uuid, place_uuid }) {
  let conn;
  let parameters = [];
  let query = "";
  query = `INSERT INTO PlaceRoom SET 
      RoomId = (SELECT id FROM Room WHERE Room.uuid = UNHEX(?) ),  
      PlaceId = (SELECT id FROM Place WHERE Place.uuid = UNHEX(?) ) `;
  parameters = [room_uuid, place_uuid];
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => objectBigIntToInt(result))
    .finally(() => {
      if (conn) conn.end();
    });
}

export function removeRoomPlaceRelation(pool, { room_uuid, place_uuid }) {
  let conn;
  let parameters = [];
  let query = "";
  query = `DELETE FROM PlaceRoom WHERE 
           PlaceRoom.RoomId = (SELECT id FROM Room WHERE uuid = UNHEX(?) ) AND
           PlaceRoom.PlaceId = (SELECT id FROM Place WHERE uuid = UNHEX(?) )`;
  parameters = [room_uuid, place_uuid];
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => objectBigIntToInt(result))
    .finally(() => {
      if (conn) conn.end();
    });
}

export const room_place = (app, pool) => {
  app.post("/api/add_room_place_relation", async function (req, res, next) {
    const data = { ...req.body };
    addRoomPlaceRelation(pool, data)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.post("/api/remove_room_place_relation", async function (req, res, next) {
    const data = { ...req.body };
    removeRoomPlaceRelation(pool, data)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
