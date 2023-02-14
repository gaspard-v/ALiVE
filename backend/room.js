import { handlerError, handlerSuccess } from "./handler.js";
import { getObject } from "./object.js";
import { getDoor } from "./door.js";

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
    .then((result) => {
      if (!full || !place_uuid) return result;
      return result.map((element) => {
        return getDoor(pool, "", place_uuid, element.uuid, true).then(
          (result_door) => {
            element["doors"] = result_door;
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

export function postRoom(pool, { uuid, name }) {
  let conn;
  let parameters = [];
  let query = "";
  query = `INSERT INTO Room SET `;
  if (uuid) query = `UPDATE Room SET `;
  if (name) {
    query += ` Room.name = ? `;
    parameters = [name];
  }
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => {
      const search_uuid = uuid ? uuid : 0;
      return conn.query(
        `SELECT HEX(uuid) as uuid FROM Room WHERE id = ? OR uuid = UNHEX(?)`,
        [result.insertId, search_uuid]
      );
    })
    .then((result) => result)
    .finally(() => {
      if (conn) conn.end();
    });
}

export const Room = (app, pool) => {
  app.get("/api/room", async function (req, res, next) {
    const ask_full = req.query.full !== undefined;
    getRoom(pool, "", "", ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/room/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    const ask_full = req.query.full !== undefined;
    getRoom(pool, uuid, "", ask_full)
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
      const place_uuid = req.params.place_uuid;
      const room_uuid = req.params.room_uuid;
      const ask_full = req.query.full !== undefined;
      getRoom(pool, room_uuid, place_uuid, ask_full)
        .then((result) => {
          handlerSuccess(result, req, res, next);
        })
        .catch((err) => {
          handlerError(err, req, res, next);
        });
    }
  );
  app.post("/api/room", async function (req, res, next) {
    const data = { ...req.body };
    postRoom(pool, data)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.post("/api/room/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    const data = { ...req.body, uuid: uuid };
    postRoom(pool, data)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
