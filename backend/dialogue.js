import { handlerError, handlerSuccess } from "./handler.js";

export function getDialogue(
  pool,
  dialogue_uuid = "",
  day_uuid = "",
  full = false
) {
  let conn;
  let parameters = [];
  let query = `SELECT HEX(Dialogue.uuid) as uuid, Dialogue.description as description `;
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
    .then((result) => result)
    .finally(() => {
      if (conn) conn.end();
    });
}
