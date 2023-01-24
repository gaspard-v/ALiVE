import { handlerError, handlerSuccess } from "./handler.js";

export function getMap(pool, map_uuid = "", complexe = false) {
  let query = "SELECT name, HEX(uuid) as uuid FROM Map";
  let parameters = [];
  let conn;
  let retour;
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
    .then((result) => result)
    .finally(() => {
      if (conn) conn.end();
    });
}

export const Map = (app, pool) => {
  app.get("/api/map", async function (req, res, next) {
    getMap(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/map/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getMap(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
