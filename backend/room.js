import { handlerError, handlerSuccess } from "./handler.js";

const roomObject = {
  name: "",
};

export const Room = (app, pool) => {
  app.get("/api/room", async function (req, res, next) {
    let conn;
    pool
      .getConnection()
      .then((connexion) => {
        conn = connexion;
        return conn.query("SELECT name FROM Room");
      })
      .then((result) => {
        const retour = { ...roomObject, ...result[0] };
        handlerSuccess(retour, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      })
      .finally(() => {
        if (conn) conn.end();
      });
  });
  app.get("/api/room/:uuid", async function (req, res, next) {
    let conn;
    pool
      .getConnection()
      .then((connexion) => {
        conn = connexion;
        return conn.query("SELECT name FROM Room");
      })
      .then((result) => {
        const retour = { ...roomObject, ...result[0] };
        handlerSuccess(retour, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      })
      .finally(() => {
        if (conn) conn.end();
      });
  });
};
