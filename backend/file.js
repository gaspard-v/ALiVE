import { handlerError, handlerSuccess } from "./handler.js";

export function getFile(pool, file_uuid = "", other_join = ["", ""]) {
  let conn;
  let parameters = [];
  const [join_table, join_uuid] = other_join;
  let query = `SELECT HEX(File.uuid) as uuid, 
                      File.filename as filename, 
                      File.description as description, 
                      File.option as option, 
                      File.data as data
                FROM File `;
  if (file_uuid) {
    query += " WHERE File.uuid = UNHEX(?) ";
    parameters.push(file_uuid);
  }
  if (join_table && join_uuid) {
    const formatted_join_table = join_table.toLocaleLowerCase();
    switch (formatted_join_table) {
      case "object":
        query += ` INNER JOIN ObjectFile ON File.id = ObjectFile.FileId `;
        query += ` INNER JOIN Object ON Object.id = ObjectFile.ObjectId AND Object.uuid = UNHEX(?) `;
        parameters.push(join_uuid);
        break;
      case "place":
        query += ` INNER JOIN PlaceFile ON File.id = PlaceFile.FileId `;
        query += ` INNER JOIN Place ON Place.id = PlaceFile.PlaceId AND Place.uuid = UNHEX(?) `;
        parameters.push(join_uuid);
        break;
      case "room":
        query += ` INNER JOIN RoomFile ON File.id = RoomFile.FileId `;
        query += ` INNER JOIN Room ON Room.id = RoomFile.RoomId AND Room.uuid = UNHEX(?) `;
        parameters.push(join_uuid);
        break;
      case "map":
        query += ` INNER JOIN MapFile ON File.id = MapFile.FileId `;
        query += ` INNER JOIN Map ON Map.id = MapFile.MapId AND Map.uuid = UNHEX(?) `;
        parameters.push(join_uuid);
        break;
      default:
        return Promise.reject(
          new Error(`Table '${join_table}' doesn't exist !`)
        );
    }
  }
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

export async function createFile(pool, filename, data) {
  const createFileQuery =
    "INSERT INTO File (filename, data) VALUES (?, ?) RETURNING id, HEX(uuid) as uuid, filename;";
  const conn = await pool.getConnection();
  const response = await conn.query(createFileQuery, [filename, data]);
  if (conn) conn.end();
  return objectBigIntToInt(result[0]);
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
  app.get("/api/file/:element/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    const element = req.params.element;
    getFile(pool, "", [element, uuid])
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
