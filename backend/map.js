import { handlerError, handlerSuccess } from "./handler.js";

export const Map = (app, pool) => {
  app.get("/api/map", async function (req, res, next) {
    let conn;
    pool
      .getConnection()
      .then((connexion) => {
        conn = connexion;
        return conn.query(`
        SELECT 
        Map.name as map_name, 
        Map.uuid as map_uuid, 
        Place.uuid as place_uuid,
        Place.name as place_name,
        Place.Xcoord as place_x,
        Place.Ycoord as place_y,
        Room.uuid as room_uuid,
        Room.name as room_name
        FROM Map 
        LEFT JOIN Place ON Map.id = Place.MapId
        LEFT JOIN PlaceRoom ON Place.id = PlaceRoom.PlaceId
        LEFT JOIN Room ON Room.id = PlaceRoom.RoomId
        `);
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
