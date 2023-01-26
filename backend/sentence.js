import { handlerError, handlerSuccess } from "./handler.js";
import { getCharacters } from "./characters.js";

export function getSentence(
  pool,
  sentence_uuid = "",
  dialogue_uuid = "",
  full = false
) {
  let conn;
  let parameters = [];
  let query = `SELECT HEX(Sentence.uuid) as uuid, Sentence.ordre as ordre, Sentence.content as content, Sentence.color as color 
               FROM (Sentence, Dialogue) 
               WHERE 1=1 `;
  if (sentence_uuid) {
    query += ` AND Sentence.uuid = UNHEX(?) `;
    parameters.push(sentence_uuid);
  }
  if (dialogue_uuid) {
    query += ` AND Dialogue.id = Sentence.DialogueId 
               AND Dialogue.uuid = UNHEX(?) `;
    parameters.push(dialogue_uuid);
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
        return getCharacters(pool, "", element.uuid, true).then(
          (result_characters) => {
            element["character"] = result_characters;
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

export const Sentence = (app, pool) => {
  app.get("/api/sentence", async function (req, res, next) {
    getSentence(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/sentence/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    getSentence(pool, uuid)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
