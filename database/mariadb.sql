DROP DATABASE IF EXISTS alive;

CREATE DATABASE alive CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alive;

CREATE TABLE Object (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    picture BLOB,
    isTool tinyint(1),
    PRIMARY KEY(id)
);

CREATE TABLE RoomObject (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    Xcoord INT,
    Ycoord INT,
    PRIMARY KEY(id)
);

CREATE TABLE Room (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    picture BLOB,
    PRIMARY KEY(id)
);

CREATE TABLE PlaceRoom (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    PRIMARY KEY(id)
);

CREATE TABLE Place (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    Xcoord INT,
    Ycoord INT,
    PRIMARY KEY(id) 
);

CREATE TABLE Map (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    picture BLOB,
    PRIMARY KEY(id)
);

CREATE TABLE Day (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE Dialogue (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE Sentence (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    Content TEXT,
    Color VARCHAR(20),
    PRIMARY KEY(id)
);

CREATE TABLE Character (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(20),
    PRIMARY KEY(id)
);

CREATE TABLE Administrator (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    login VARCHAR(50),
    password VARCHAR(300),
    PRIMARY KEY(id)
);

ALTER TABLE RoomObject
    ADD COLUMN (
        ObjectId BIGINT UNSIGNED NOT NULL,
        PlaceRoomId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_Object FOREIGN KEY (ObjectId) REFERENCES Object(id),
    ADD CONSTRAINT fk_PlaceRoom FOREIGN KEY (PlaceRoomId) REFERENCES PlaceRoom(id),
    ADD UNIQUE INDEX ux_Object_PlaceRoom (ObjectId, PlaceRoomId);

ALTER TABLE PlaceRoom
    ADD COLUMN (
        PlaceId BIGINT UNSIGNED NOT NULL,
        RoomId BIGINT UNSIGNED NOT NULL
    ),
    ADD CONSTRAINT fk_Place FOREIGN KEY (PlaceId) REFERENCES Place(id),
    ADD CONSTRAINT fk_Room FOREIGN KEY (RoomId) REFERENCES Room(id),
    ADD UNIQUE INDEX ux_Place_Room (PlaceId, RoomId);

ALTER TABLE Place
    ADD COLUMN (
        MapId BIGINT UNSIGNED NOT NULL,
    ),
    ADD CONSTRAINT fk_map FOREIGN KEY (MapId) REFERENCES Map(id)
    ADD UNIQUE INDEX ux_map (MapId);

ALTER TABLE Door
    ADD COLUMN (
        StartingPlaceRoomId BIGINT UNSIGNED NOT NULL,
        DestinationPlaceRoomId BIGINT UNSIGNED NOT NULL,
    ),
    ADD CONSTRAINT fk_starting_room FOREIGN KEY (StartingPlaceRoomId) REFERENCES Room(id),
    ADD CONSTRAINT fk_destination_room FOREIGN KEY(DestinationPlaceRoomId) REFERENCES Room(id),
    ADD UNIQUE INDEX ux_room (StartingPlaceRoomId, DestinationPlaceRoomId);

ALTER TABLE Day
    ADD COLUMN (
        DialogueId BIGINT UNSIGNED,
        MapId BIGINT UNSIGNED NOT NULL UNIQUE
    ),
    ADD CONSTRAINT fk_dialogue FOREIGN KEY (DialogueId) REFERENCES Dialogue(id),
    ADD CONSTRAINT  fk_map FOREIGN KEY (MapId) REFERENCES Map(id);

ALTER TABLE Sentence
    ADD COLUMN (
        DialogueId BIGINT UNSIGNED NOT NULL UNIQUE
    ),
    ADD CONSTRAINT fk_dialogue FOREIGN KEY (DialogueId) REFERENCES Dialogue(id);