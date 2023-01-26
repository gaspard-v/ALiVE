import { handlerError, handlerSuccess } from "./handler.js";

export function getDay(pool, day_uuid = "", full = false) {
  let conn;
  let query = `SELECT HEX(Day.uuid) as uuid, Day.name as name, Day.description as description, HEX(Map.uuid) as map_uuid 
               FROM Day, Map
               WHERE
               Map.id = Day.id `;
  let parameters = [];
  if (day_uuid) {
    query += ` AND Day.uuid = UNHEX(?) `;
    parameters.append(day_uuid);
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

export const Day = (app, pool) => {
  app.get("/api/day", async function (req, res, next) {
    getDay(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/day/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getDay(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
