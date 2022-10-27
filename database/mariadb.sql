CREATE DATABASE alive CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alive;

CREATE TABLE File (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    filename VARCHAR(100) NOT NULL UNIQUE CHECK(filename LIKE "%.%"),
    description LONGTEXT,
    option LONGTEXT,
    data LONGBLOB NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Object (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description LONGTEXT,
    isTool tinyint(1),
    INDEX ix_name_object(name),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE RoomObject (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    Xcoord INT,
    Ycoord INT,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Room (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    INDEX ix_name_room(name),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE PlaceRoom (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Place (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    Xcoord INT,
    Ycoord INT,
    INDEX ix_name_place(name),
    PRIMARY KEY(id) 
) ENGINE=InnoDB;

CREATE TABLE Map (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    INDEX ix_name_map(name),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Day (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description LONGTEXT,
    INDEX ix_name_day(name),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Dialogue (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    description LONGTEXT,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Sentence (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    Content LONGTEXT,
    Color VARCHAR(20),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Characters (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(20),
    INDEX ix_name_characters(name),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Administrator (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(300),
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE Door (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    Xcoord INT,
    Ycoord INT,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE ObjectFile (
    ObjectId BIGINT UNSIGNED NOT NULL,
    FileId BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_Object_ObjectFile FOREIGN KEY (ObjectId) REFERENCES Object (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_File_ObjectFile FOREIGN KEY (FileId) REFERENCES File (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY(ObjectId, FileId)
) ENGINE=InnoDB;

CREATE TABLE RoomFile (
    RoomId BIGINT UNSIGNED NOT NULL,
    FileId BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_Room_RoomFile FOREIGN KEY (RoomId) REFERENCES Room (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_File_RoomFile FOREIGN KEY (FileId) REFERENCES File (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY(RoomId, FileId)
) ENGINE=InnoDB;

CREATE TABLE MapFile (
    MapId BIGINT UNSIGNED NOT NULL,
    FileId BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_Map_MapFile FOREIGN KEY (MapId) REFERENCES Map (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_File_MapFile FOREIGN KEY (FileId) REFERENCES File (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY(MapId, FileId)
) ENGINE=InnoDB;

ALTER TABLE RoomObject
    ADD COLUMN (
        ObjectId BIGINT UNSIGNED NOT NULL,
        PlaceRoomId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_Object_RoomObject FOREIGN KEY (ObjectId) REFERENCES Object(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_PlaceRoom_RoomObject FOREIGN KEY (PlaceRoomId) REFERENCES PlaceRoom(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD UNIQUE INDEX ux_Object_PlaceRoom_RoomObject (ObjectId, PlaceRoomId);

ALTER TABLE PlaceRoom
    ADD COLUMN (
        PlaceId BIGINT UNSIGNED NOT NULL,
        RoomId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_Place_PlaceRoom FOREIGN KEY (PlaceId) REFERENCES Place(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_Room_PlaceRoom FOREIGN KEY (RoomId) REFERENCES Room(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD UNIQUE INDEX ux_Place_Room_PlaceRoom (PlaceId, RoomId);

ALTER TABLE Place
    ADD COLUMN (
        MapId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_Map_Place FOREIGN KEY (MapId) REFERENCES Map(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD UNIQUE INDEX ux_Map_Place (MapId);

ALTER TABLE Door
    ADD COLUMN (
        StartingPlaceRoomId BIGINT UNSIGNED NOT NULL,
        DestinationPlaceRoomId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_starting_room_Door FOREIGN KEY (StartingPlaceRoomId) REFERENCES Room(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_destination_room_Door FOREIGN KEY(DestinationPlaceRoomId) REFERENCES Room(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD UNIQUE INDEX ux_room_Door (StartingPlaceRoomId, DestinationPlaceRoomId);

ALTER TABLE Day
    ADD COLUMN (
        DialogueId BIGINT UNSIGNED,
        MapId BIGINT UNSIGNED NOT NULL UNIQUE
    ),
    ADD CONSTRAINT fk_dialogue_Day FOREIGN KEY (DialogueId) REFERENCES Dialogue(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT  fk_map_Day FOREIGN KEY (MapId) REFERENCES Map(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Sentence
    ADD COLUMN (
        DialogueId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_dialogue_Sentence FOREIGN KEY (DialogueId) REFERENCES Dialogue(id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE USER 'alive'@'%' IDENTIFIED BY '5e6c&6iP&m6p6aQd$A&f';
GRANT ALL ON alive TO 'alive'@'%';
FLUSH PRIVILEGES;

DELIMITER //

-- Pour ne pas définir de valeur dans les paramètre:
-- dans le cas ou le parametre est un VARCHAR, CHAR, BLOB, TEXT
--  valeur par default = '' (empty string)
-- dans le cas ou INT, BITINT, etc
--  valeur par default = -1

-- Créer un administrateur OU modifier son mot de passe
CREATE PROCEDURE changeAdministrator(IN login VARCHAR(50), IN password VARCHAR(50))
BEGIN
    INSERT INTO Administrator(login, password) VALUES (login, password)
    ON DUPLICATE KEY UPDATE password=password;
END; //

CREATE PROCEDURE getObjects(IN object_name VARCHAR(100), 
                            IN object_id BIGINT, 
                            IN room_id BIGINT
                            )
BEGIN
    DECLARE var_query TEXT;
    SET var_query = "SELECT id, name, description, isTool FROM Object ";
    IF room_id != -1 THEN
    	SET var_query = CONCAT(var_query," INNER JOIN RoomObject ON Object.id = RoomObject.ObjectId
                                          INNER JOIN PlaceRoom ON RoomObject.PlaceRoomId = PlaceRoom.id
                                          INNER JOIN Room ON PlaceRoom.RoomId = Room.id AND Room.id = ", room_id, " ");
    END IF;
    SET var_query = CONCAT(var_query, " WHERE TRUE ");
    IF object_name != '' THEN
    	SET var_query = CONCAT(var_query, " AND Object.name LIKE '%", object_name, "%' ");
    END IF;
    IF object_id != -1 THEN
    	SET var_query = CONCAT(var_query, " AND Object.id = ", object_id, " ");
    END IF;
    EXECUTE IMMEDIATE var_query;
END; //
DELIMITER ;