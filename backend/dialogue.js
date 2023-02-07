import { handlerError, handlerSuccess } from "./handler.js";
import { getSentence } from "./sentence.js";

export function getDialogue(
  pool,
  dialogue_uuid = "",
  day_uuid = "",
  full = false
) {
  let conn;
  let parameters = [];
  let query = `SELECT HEX(Dialogue.uuid) as uuid, Dialogue.description as description FROM Dialogue `;
  if (dialogue_uuid) {
    query += " WHERE Dialogue.uuid = UNHEX(?) ";
    parameters.push(dialogue_uuid);
  }
  if (day_uuid) {
    query += ` INNER JOIN Day ON Dialogue.id = Day.DialogueId 
               AND Day.uuid = UNHEX(?) `;
    parameters.push(day_uuid);
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
        return getSentence(pool, "", element.uuid, true).then(
          (result_place) => {
            element["places"] = result_place;
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

export const Dialogue = (app, pool) => {
  app.get("/api/dialogue", async function (req, res, next) {
    const ask_full = req.query.full !== undefined;
    getDialogue(pool, "", "", ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/dialogue/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    const ask_full = req.query.full !== undefined;
    getDialogue(pool, uuid, "", ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
