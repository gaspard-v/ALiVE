import { handlerError, handlerSuccess } from "./handler.js";

export function getCharacters(
  pool,
  characters_uuid = "",
  sentence_uuid = "",
  full = false
) {
  let conn;
  let parameters = [];
  let query =
    "SELECT HEX(Characters.uuid) as uuid, Characters.name as name, Characters.color as color FROM Characters ";
  if (characters_uuid) {
    query += " WHERE Characters.uuid = UNHEX(?) ";
    parameters.push(characters_uuid);
  }
  if (sentence_uuid) {
    query += ` INNER JOIN Sentence ON Sentence.CharacterId = Characters.id
              AND Sentence.uuid = UNHEX(?) `;
    parameters.push(sentence_uuid);
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

export const Characters = (app, pool) => {
  app.get("/api/characters", async function (req, res, next) {
    getCharacters(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/characters/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getCharacters(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
