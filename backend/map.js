import { handlerError, handlerSuccess } from "./handler.js";
import { getPlace } from "./place.js";
import {objectBigIntToInt} from "./utils.js";
import {createFile} from "./file.js";
import {createRoom} from "./room.js";

export function getMap(pool, map_uuid = "", full = false) {
  let query = "SELECT name, HEX(uuid) as uuid FROM Map";
  let parameters = [];
  let conn;
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
    .then((result) => {
      if (!full) return result;
      return result.map((element) => {
        return getPlace(pool, "", element.uuid, true).then((result_place) => {
          element["places"] = result_place;
          return element;
        });
      });
    })
    .then((promises) => Promise.all(promises))
    .finally(() => {
      if (conn) conn.end();
    });
}

/*
INSERT INTO `Map`(`id`, `uuid`, `name`) VALUES ('[value-1]','[value-2]','[value-3]')
 */

export function createMap(
    pool,
    name
){
  let conn;
  const createMapQuery = "INSERT INTO Object (name) VALUES (?) RETURNING id, HEX(uuid) as uuid, name;";
  return pool.getConnection()
      .then(conn => {
        return conn.query(createMapQuery, [name])
      }).then(result => {
        let formatedResult = objectBigIntToInt(result[0]);
        console.log("id :", formatedResult.id);
        console.log("uuid :", formatedResult.uuid);
        return formatedResult;
      }).finally(() => {
        if (conn) conn.end();
      }).catch(err => {
        console.error('An exception has occurred while creating object', err)
      });
}

export const Map = (app, pool) => {
  app.get("/api/map", async function (req, res, next) {
    const ask_full = req.query.full !== undefined;
    getMap(pool, "", ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.get("/api/map/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    const ask_full = req.query.full !== undefined;
    getMap(pool, uuid, ask_full)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.post("/api/map", function(req, res) {
    let result, resultBis;
    const { name, fileName, fileData } = req.body;
    createMap(pool, name)
        .then((result) => {
          console.log("sa marche clap clap")
          createFile(pool, fileName, fileData).then((resultBis) => {
            console.log("file creation...");
            console.log("objectId : ", result.id);
            console.log("fileId : ", resultBis.id);
            createMapFile(pool, result.id, resultBis.id).then((resultThird) => {
              console.log("Just before handlerSuccess.");
              handlerSuccess(objectBigIntToInt(resultThird), req, res);
              console.log("file created MOTHAFUCKA");
            })
          })
        })
        .catch((err) => {
          handlerError(err, req, res);
        });
  });
};
