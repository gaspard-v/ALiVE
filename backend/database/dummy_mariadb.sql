-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb-database
-- Généré le : mar. 17 jan. 2023 à 14:38
-- Version du serveur : 10.9.3-MariaDB-1:10.9.3+maria~ubu2204
-- Version de PHP : 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
USE alive;
--
-- Base de données : `alive`
--

-- --------------------------------------------------------

--
-- Déchargement des données de la table `Characters`
--

INSERT INTO `Characters` (`id`, `uuid`, `name`, `color`) VALUES
(1, 0x8d142ec8967311edaa340242ac1b0003, 'Thibaut', ''),
(2, 0x962034fc967311edaa340242ac1b0003, 'Marie', '');


-- --------------------------------------------------------

--
-- Déchargement des données de la table `Dialogue`
--

INSERT INTO `Dialogue` (`id`, `uuid`, `description`) VALUES
(1, 0x78a8ddff967311edaa340242ac1b0003, 'Dialogue du début de partie');


-- --------------------------------------------------------

--
-- Déchargement des données de la table `Map`
--

INSERT INTO `Map` (`id`, `uuid`, `name`) VALUES
(1, 0x78a73e66967311edaa340242ac1b0003, 'Loos'),
(2, 0x78a740da967311edaa340242ac1b0003, 'Anciens port industriel de Dunkerque');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `Object`
--

INSERT INTO `Object` (`id`, `uuid`, `name`, `description`, `isTool`) VALUES
(9, 0x78a7e89c967311edaa340242ac1b0003, 'Arrosoir', 'Cette arrosoir permet de fournir de l\'eau à vos plantes\r\n\r\nC\'est bien plus efficace qu\'un autre récipient, l\'arrosoir permet de donner une quantité très précise d\'eau', 1),
(10, 0x78a7e9e5967311edaa340242ac1b0003, 'Pelle', 'La pelle permet de creuser des troues', 1),
(11, 0x78a7ea78967311edaa340242ac1b0003, 'Sac de terreau', 'Le terreau permet la culture de certaines plantes et champignons particulier ', 1),
(12, 0x78a7eb29967311edaa340242ac1b0003, 'Cultiver ses champignons sois meme !', 'Pour pouvoir cultiver vos champignons, il faut:\r\n\r\nun endroit humide et sombre\r\nde la paille\r\nun entonnoir ', 0);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `Room`
--

INSERT INTO `Room` (`id`, `uuid`, `name`) VALUES
(1, 0x78aa0798967311edaa340242ac1b0003, 'salle de classe'),
(2, 0x78aa08ee967311edaa340242ac1b0003, 'anciens champs');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `Day`
--

INSERT INTO `Day` (`id`, `uuid`, `name`, `description`, `DialogueId`, `MapId`) VALUES
(1, 0x3675359b967411edaa340242ac1b0003, 'premiere', 'première journée', 1, 2);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `Place`
--

INSERT INTO `Place` (`id`, `uuid`, `name`, `Xcoord`, `Ycoord`, `MapId`) VALUES
(1, 0x78a99aa4967311edaa340242ac1b0003, 'Ancienne usine de bois', 327, 347, 1),
(2, 0x78a99cc6967311edaa340242ac1b0003, 'Magasin de botaniste ', 875, 128, 1),
(3, 0x78a99d7c967311edaa340242ac1b0003, 'Usine', 12, 52, 2),
(4, 0x78a99e0d967311edaa340242ac1b0003, 'Bord de mer', 678, 507, 2);

-- --------------------------------------------------------
--
-- Déchargement des données de la table `PlaceRoom`
--

INSERT INTO `PlaceRoom` (`id`, `PlaceId`, `RoomId`) VALUES
(1, 2, 1),
(3, 3, 2),
(2, 4, 1);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `PlaceRoomObject`
--

INSERT INTO `PlaceRoomObject` (`id`, `Xcoord`, `Ycoord`, `ObjectId`, `PlaceRoomId`) VALUES
(1, 416, 98, 10, 1),
(2, 318, 12, 11, 2),
(3, 735, 368, 11, 3),
(4, 636, 35, 12, 1);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `Door`
--

INSERT INTO `Door` (`id`, `uuid`, `Xcoord`, `Ycoord`, `StartingPlaceRoomId`, `DestinationPlaceRoomId`) VALUES
(1, 0x558e8400967411edaa340242ac1b0003, 236, 73, 1, 2);


-- --------------------------------------------------------

--
-- Déchargement des données de la table `Sentence`
--

INSERT INTO `Sentence` (`id`, `uuid`, `ordre`, `content`, `color`, `DialogueId`, `CharacterId`) VALUES
(1, 0x082410a0967411edaa340242ac1b0003, 1, 'C\'est la fin du monde...', NULL, 1, 1),
(2, 0x08242d88967411edaa340242ac1b0003, 2, 'Non...', NULL, 1, 2);

INSERT INTO RoomFile (RoomId, FileId) VALUES
(1, 13),
(2, 14);

INSERT INTO ObjectFile (ObjectId, FileId) VALUES
(9, 11),
(10, 12);

INSERT INTO MapFile (MapId, FileId) VALUES
(1, 3);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
