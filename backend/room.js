import { handlerError, handlerSuccess } from "./handler.js";
import { getObject } from "./object.js";

export function getRoom(pool, room_uuid = "", place_uuid = "", full = false) {
  let query = "SELECT Room.name as name, HEX(Room.uuid) as uuid FROM Room ";
  let parameters = [];
  let conn;
  if (room_uuid) {
    query += " WHERE Room.uuid = UNHEX(?) ";
    parameters.push(room_uuid);
  }
  if (place_uuid) {
    query +=
      " INNER JOIN PlaceRoom ON PlaceRoom.RoomId = Room.id \
               INNER JOIN Place ON PlaceRoom.PlaceId = Place.id AND Place.uuid = UNHEX(?) ";
    parameters.push(place_uuid);
  }
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => {
      if (!full || !place_uuid) return result;
      return result.map((element) => {
        return getObject(pool, "", element.uuid, place_uuid, true).then(
          (result_object) => {
            element["objects"] = result_object;
            return element;
          }
        );
      });
    })
    .then((promises) => Promise.all(promises))
    .finally(() => {
      if (conn) conn.end();
    });
}

export const Room = (app, pool) => {
  app.get("/api/room", async function (req, res, next) {
    getRoom(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/room/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getRoom(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get(
    "/api/place/:place_uuid/room/:room_uuid",
    async function (req, res, next) {
      const uuid = req.params.uuid;
      getRoom(pool, uuid)
        .then((result) => {
          handlerSuccess(result, req, res, next);
        })
        .catch((err) => {
          handlerError(err, req, res, next);
        });
    }
  );
};
