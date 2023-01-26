import { handlerError, handlerSuccess } from "./handler.js";

export function getFile(pool, file_uuid = "", other_uuid = "") {
  let conn;
  let parameters = [];
  let query_from = ["File"];
  let query = `SELECT HEX(File.uuid) as uuid, 
                 File.filename as filename, 
                 File.description as description, 
                 File.option as option, 
                 File.data as data
                 From {0}  
                 WHERE 1=1 `;
  if (file_uuid) {
    query += ` AND File.uuid = UNHEX(?) `;
    parameters.push(file_uuid);
  }
  if (other_uuid) {
    query_from.push(
      "ObjectFile",
      "Object",
      "PlaceFile",
      "Place",
      "MapFile",
      "Map",
      "RoomFile",
      "Room"
    );
    const sub_query = `
        (ObjectFile.FileId = File.id AND Object.id = ObjectFile.ObjectId AND Object.uuid = UNHEX(?) ) OR 
        (PlaceFile.FileId = File.id AND Place.id = PlaceFile.PlaceId AND Place.uuid = UNHEX(?) ) OR 
        (MapFile.FileId = File.id AND Map.id = MapFile.MapId AND Map.uuid = UNHEX(?) ) OR 
        (RoomFile.FileId = File.id AND Room.id = RoomFile.RoomId AND Room.uuid = UNHEX(?) ) 
    `;
    query += `AND (${sub_query})`;
    for (let i = 0; i < 4; i++) {
      parameters.push(other_uuid);
    }
  }
  query = query.replace("{0}", query_from.join(", "));
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => {
      return result;
    })
    .finally(() => {
      if (conn) conn.end();
    });
}

export const File = (app, pool) => {
  app.get("/api/file", async function (req, res, next) {
    getFile(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/file/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getFile(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/file/element/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getFile(pool, "", uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
