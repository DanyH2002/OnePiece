-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-containerIA
-- Tiempo de generación: 08-12-2024 a las 05:00:06
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `OnePiece`
--
CREATE DATABASE IF NOT EXISTS `OnePiece` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `OnePiece`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tomo`
--

CREATE TABLE IF NOT EXISTS `tomo` (
  `idtomo` int NOT NULL AUTO_INCREMENT,
  `numero_tomo` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `capitulos_incluidos` text NOT NULL COMMENT 'Capítulos de la version animada ',
  `fecha_publicacion` date NOT NULL,
  `portada` text NOT NULL COMMENT 'Url de la imagen',
  `sinopsis` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'creacion del registro',
  PRIMARY KEY (`idtomo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tomo`
--

INSERT INTO `tomo` (`idtomo`, `numero_tomo`, `titulo`, `capitulos_incluidos`, `fecha_publicacion`, `portada`, `sinopsis`, `created_at`) VALUES
(1, 1, 'El amanecer de una aventura', '1. ROMANCE DAWN \n2. Ese chico es, «Luffy Sombrero de Paja»\n3. Aparece «el Cazador de Piratas Zoro»\n4. Capitán de la Marina «Mano de Hacha Morgan»\n5. El Rey de los Piratas y el Maestro Espadachín\n6. La primera persona\n7. Amigos\n 8. Introduciendo a Nami', '1997-12-24', 'https://static.wikia.nocookie.net/onepiece/images/3/3a/Volumen_1.png/revision/latest?cb=20211112115214&path-prefix=es', 'Sigue las aventuras de Monkey D. Luffy, un chico muy especial y elástico, que sueña con ser el rey de los piratas y encontrar una gran tesoro: el One Piece. Para ello, se hace a la mar en un bote con el que buscará la tripulación que le pueda ayudar en su misión.', '2024-12-08 04:53:42');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
