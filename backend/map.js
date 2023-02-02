import { handlerError, handlerSuccess } from "./handler.js";
import { getPlace } from "./place.js";

export function getMap(pool, map_uuid = "", full = false) {
  let query = "SELECT name, HEX(uuid) as uuid FROM Map";
  let parameters = [];
  let conn;
  if (map_uuid) {
    query = "SELECT name, HEX(uuid) as uuid FROM Map WHERE uuid = UNHEX(?)";
    parameters = [map_uuid];
  }
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => {
      if (!full) return result;
      return result.map((element) => {
        return getPlace(pool, "", element.uuid, true).then((result_place) => {
          element["places"] = result_place;
          return element;
        });
      });
    })
    .then((promises) => Promise.all(promises))
    .finally(() => {
      if (conn) conn.end();
    });
}

export const Map = (app, pool) => {
  app.get("/api/map", async function (req, res, next) {
    const ask_full = req.query.full !== undefined;
    getMap(pool, "", ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/map/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    const ask_full = req.query.full !== undefined;
    getMap(pool, uuid, ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
