import { handlerError, handlerSuccess } from "./handler.js";

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
  HEX(Door.uuid) AS UUID,
  Door.Xcoord AS X,
  Door.Ycoord AS Y,
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

export const Object = (app, pool) => {
  app.get("/api/object", async function (req, res, next) {
    getDoor(pool)
      .then((result) => {
        handlerSuccess(result, req, res, next);
      })
      .catch((err) => {
        handlerError(err, req, res, next);
      });
  });
};
