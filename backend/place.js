import { handlerError, handlerSuccess } from "./handler.js";

export function getPlace(pool, place_uuid = "", map_uuid = "", full = false) {
  let parameters = [];
  let conn;
  let query =
    "SELECT HEX(Place.uuid) as uuid, Place.name as name, Place.Xcoord as x, Place.Ycoord as y FROM Place ";
  if (place_uuid) {
    query += " WHERE Place.uuid = UNHEX(?) ";
    parameters.push(place_uuid);
  }
  if (map_uuid) {
    query += " INNER JOIN Map ON Map.id = Place.MapId AND Map.uuid = UNHEX(?) ";
    parameters.push(map_uuid);
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

export const Place = (app, pool) => {
  app.get("/api/place", async function (req, res, next) {
    getPlace(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/place/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getPlace(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
