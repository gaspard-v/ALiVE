import { handlerError, handlerSuccess } from "./handler.js";
import { objectBigIntToInt } from "./utils.js";

export function getDoor(
  pool,
  door_uuid = "",
  place_uuid = "",
  room_uuid = "",
  full = false
) {
  let conn;
  let query = `
SELECT
  HEX(Door.uuid) AS uuid,
  Door.Xcoord AS x,
  Door.Ycoord AS y,
  HEX(DestinationPlace.uuid) AS destination_place_uuid,
  HEX(DestinationRoom.uuid) AS destination_room_uuid,
  HEX(StartingPlace.uuid) AS starting_place_uuid,
  HEX(StartingRoom.uuid) AS starting_room_uuid
FROM
  Door,
  Place AS DestinationPlace,
  Room AS DestinationRoom,
  Place AS StartingPlace,
  Room AS StartingRoom,
  PlaceRoom AS DestinationPlaceRoom,
  PlaceRoom AS StartingPlaceRoom
WHERE
  Door.DestinationPlaceRoomId = DestinationPlaceRoom.id 
  AND DestinationPlaceRoom.PlaceId = DestinationPlace.id  
  AND DestinationPlaceRoom.RoomId = DestinationRoom.id  
  AND Door.StartingPlaceRoomId = StartingPlaceRoom.id  
  AND StartingPlaceRoom.PlaceId = StartingPlace.id 
  AND StartingPlaceRoom.RoomId = StartingRoom.id `;
  let parameters = [];
  if (door_uuid) {
    query += " AND Door.uuid = UNHEX(?) ";
    parameters.push(door_uuid);
  }
  if (place_uuid && room_uuid) {
    query += `AND StartingPlace.uuid = UNHEX(?)
              AND StartingRoom.uuid = UNHEX(?) `;
    parameters.push(place_uuid);
    parameters.push(room_uuid);
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

export function postDoor(
  pool,
  {
    uuid,
    starting_place_uuid,
    starting_room_uuid,
    destination_place_uuid,
    destination_room_uuid,
    x,
    y,
  }
) {
  let conn;
  let parameters = [];
  let query = "";
  query = `INSERT INTO Door SET `;
  if (uuid) query = `UPDATE Door SET `;
  if (starting_place_uuid && starting_room_uuid) {
    query += ` StartingPlaceRoomId = 
                (
                  SELECT id FROM PlaceRoom 
                    WHERE PlaceRoom.RoomId = 
                      ( 
                        SELECT id FROM Room WHERE uuid = UNHEX(?) 
                      )
                    AND PlaceRoom.PlaceId = 
                      (
                        SELECT id FROM Place WHERE uuid = UNHEX(?) 
                      )
                ), `;
    parameters.push(starting_room_uuid, starting_place_uuid);
  }
  if (destination_place_uuid && destination_room_uuid) {
    query += ` DestinationPlaceRoomId = 
                  (
                    SELECT id FROM PlaceRoom
                      WHERE PlaceRoom.RoomId = 
                        (
                          SELECT id FROM Room WHERE uuid = UNHEX(?)  
                        )
                      AND PlaceRoom.PlaceId = 
                      (
                        SELECT id FROM Place WHERE uuid = UNHEX(?)
                      )
                  ), `;
    parameters.push(destination_room_uuid, destination_place_uuid);
  }
  if (x) {
    query += ` Xcoord = ? , `;
    parameters.push(x);
  }
  if (y) {
    query += ` Ycoord = ? , `;
    parameters.push(y);
  }
  query = query.slice(0, -2);
  query += ` RETURNING
  HEX(Door.uuid) AS uuid,
  Door.Xcoord AS x,
  Door.Ycoord AS y `;
  return pool
    .getConnection()
    .then((connexion) => {
      conn = connexion;
      return conn.query(query, parameters);
    })
    .then((result) => objectBigIntToInt(result[0]))
    .finally(() => {
      if (conn) conn.end();
    });
}

export const Door = (app, pool) => {
  app.get("/api/door", async function (req, res, next) {
    getDoor(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.post("/api/door", async function (req, res, next) {
    postDoor(pool, { ...req.body })
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
  app.post("/api/door/:uuid", async function (req, res, next) {
    const uuid = req.params.uuid;
    postDoor(pool, { ...req.body, uuid: uuid })
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
