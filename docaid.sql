-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 19 avr. 2020 à 14:18
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `docaid`
--

-- --------------------------------------------------------

--
-- Structure de la table `body_zone`
--

CREATE TABLE `body_zone` (
  `bz_id` int(5) NOT NULL,
  `bz_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `body_zone`
--

INSERT INTO `body_zone` (`bz_id`, `bz_name`) VALUES
(1, 'Head'),
(2, 'Thorax'),
(3, 'Abdomen'),
(4, 'Arms'),
(5, 'Hands'),
(6, 'Legs'),
(7, 'Feet');

-- --------------------------------------------------------

--
-- Structure de la table `discipline`
--

CREATE TABLE `discipline` (
  `discipline_id` int(5) NOT NULL,
  `discipline_name` varchar(50) NOT NULL,
  `bz_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `discipline`
--

INSERT INTO `discipline` (`discipline_id`, `discipline_name`, `bz_id`) VALUES
(1, 'ORL', 1),
(2, 'Neurologie', 1),
(3, 'Pneumologie', 2),
(4, 'Cardiologie', 2),
(5, 'Gastro-enterologie', 3),
(6, 'Traumatologie', 4),
(7, 'Micro-chirurgie', 5),
(8, 'Médecine du sport', 6),
(9, 'Traumatologie', 7);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `notes_id` int(5) NOT NULL,
  `notes_description` text NOT NULL,
  `bz_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`notes_id`, `notes_description`, `bz_id`) VALUES
(1, 'g', 1),
(38, 'j', 1),
(39, 'll', 1),
(42, 'i', 6),
(43, 'gg', 1),
(44, 'undefined', 0),
(45, 'undefined', 0),
(46, 'pojpo', 1),
(47, 'rdrr', 0),
(48, 'o', 0),
(49, 'o', 0),
(50, 'tg', 0),
(51, 'tg', 0),
(52, 'tg', 0),
(53, 'olala', 1),
(54, 'j²', 0),
(55, 'i', 0),
(56, 'iiiii', 1),
(57, 'iiii', 0),
(58, 'i', 0),
(59, 'i', 0),
(60, 'oo', 1),
(61, 'Et alors Alex', 1),
(62, 'tito', 1),
(63, 'tito', 1),
(64, 'Prout1234', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `body_zone`
--
ALTER TABLE `body_zone`
  ADD PRIMARY KEY (`bz_id`);

--
-- Index pour la table `discipline`
--
ALTER TABLE `discipline`
  ADD PRIMARY KEY (`discipline_id`),
  ADD KEY `bz_id` (`bz_id`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`notes_id`),
  ADD KEY `bz_id` (`bz_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `notes_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
