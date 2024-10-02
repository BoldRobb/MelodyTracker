-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: melodytracker
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id_album` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `id_artist` bigint NOT NULL,
  `photo` blob,
  `released` date NOT NULL,
  `language` varchar(255) NOT NULL,
  PRIMARY KEY (`id_album`),
  KEY `album_id_artist_fk` (`id_artist`),
  CONSTRAINT `album_id_artist_fk` FOREIGN KEY (`id_artist`) REFERENCES `artist` (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Purpose',5,NULL,'2015-11-13','English'),(2,'Believe',5,NULL,'2012-06-15','English'),(3,'My World 2.0',5,NULL,'2010-03-19','English'),(4,'Justice',5,NULL,'2021-03-19','English'),(5,'Changes',5,NULL,'2020-02-14','English'),(7,'After Hours',4,NULL,'2020-03-20','English'),(8,'Starboy',4,NULL,'2016-11-25','English'),(9,'Beauty Behind the Madness',4,NULL,'2015-08-28','English'),(10,'Kiss Land',4,NULL,'2013-09-10','English'),(11,'Dawn FM',4,NULL,'2022-01-07','English'),(12,'Dale Play',7,NULL,'2020-03-27','Spanish'),(13,'El Último Romántico',7,NULL,'2021-06-11','Spanish'),(14,'TPZK',7,NULL,'2021-12-10','Spanish'),(15,'Tiempos',7,NULL,'2023-06-23','Spanish'),(16,'Música de la Calle',7,NULL,'2023-08-25','Spanish');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `id_artist` bigint NOT NULL AUTO_INCREMENT,
  `bio` text NOT NULL,
  `photo` blob NOT NULL,
  `spotify` text,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_artist`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Carlos Vives es un cantante, compositor y actor colombiano, conocido por su música de vallenato y su fusión con otros géneros.',_binary 'url_de_la_foto_carlos_vives.jpg','https://open.spotify.com/artist/carlosvives','Carlos Vives'),(2,'Luis Fonsi es un cantante y compositor puertorriqueño, famoso por su éxito \"Despacito\".',_binary 'url_de_la_foto_luis_fonsi.jpg','https://open.spotify.com/artist/luisfonsi','Luis Fonsi'),(3,'Ed Sheeran es un cantante y compositor británico, conocido por sus baladas emotivas y su estilo único.',_binary 'url_de_la_foto_ed_sheeran.jpg','https://open.spotify.com/artist/edsheeran','Ed Sheeran'),(4,'The Weeknd es un cantante y productor canadiense, famoso por su estilo innovador y su música R&B.',_binary 'url_de_la_foto_the_weeknd.jpg','https://open.spotify.com/artist/theweeknd','The Weeknd'),(5,'Justin Bieber es un cantante canadiense que ha sido una sensación mundial desde su adolescencia.',_binary 'url_de_la_foto_justin_bieber.jpg','https://open.spotify.com/artist/justinbieber','Justin Bieber'),(7,'Tiago PZK es un cantante y rapero argentino, conocido por su música que mezcla géneros como el trap, reggaetón y pop.','','https://open.spotify.com/artist/6opBkyWwqkGa2ZgB1swh9a','Tiago PZK');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_reviewed_albums`
--

DROP TABLE IF EXISTS `comment_reviewed_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_reviewed_albums` (
  `id_reviewed_album` bigint NOT NULL,
  `id_user` bigint NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` date NOT NULL,
  KEY `id_reviewed_album_idx` (`id_reviewed_album`),
  KEY `id_user_fk5_idx` (`id_user`),
  CONSTRAINT `id_reviewed_album_fk5` FOREIGN KEY (`id_reviewed_album`) REFERENCES `reviewed_albums` (`id_reviewed_albums`),
  CONSTRAINT `id_user_fk5` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_reviewed_albums`
--

LOCK TABLES `comment_reviewed_albums` WRITE;
/*!40000 ALTER TABLE `comment_reviewed_albums` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_reviewed_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_reviewed_song`
--

DROP TABLE IF EXISTS `comment_reviewed_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_reviewed_song` (
  `id_reviewed_song` bigint NOT NULL,
  `id_user` bigint NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` date NOT NULL,
  KEY `id_reviewed_song_idx` (`id_reviewed_song`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_reviewed_song_fk` FOREIGN KEY (`id_reviewed_song`) REFERENCES `reviewed_songs` (`id_reviewed_songs`),
  CONSTRAINT `id_user_fk2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_reviewed_song`
--

LOCK TABLES `comment_reviewed_song` WRITE;
/*!40000 ALTER TABLE `comment_reviewed_song` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_reviewed_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_albums_of_user`
--

DROP TABLE IF EXISTS `favorite_albums_of_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_albums_of_user` (
  `id_user` bigint NOT NULL,
  `id_album` bigint NOT NULL,
  KEY `favorite_albums_id_user_fk` (`id_user`),
  KEY `favorite_albums_id_album_fk_idx` (`id_album`),
  CONSTRAINT `favorite_albums_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `favorite_albums_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_albums_of_user`
--

LOCK TABLES `favorite_albums_of_user` WRITE;
/*!40000 ALTER TABLE `favorite_albums_of_user` DISABLE KEYS */;
INSERT INTO `favorite_albums_of_user` VALUES (7,5),(7,7),(7,8),(7,9);
/*!40000 ALTER TABLE `favorite_albums_of_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_songs_of_user`
--

DROP TABLE IF EXISTS `favorite_songs_of_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_songs_of_user` (
  `id_user` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  KEY `favorite_songs_id_user_fk` (`id_user`),
  KEY `favorite_songs_id_song_fk_idx` (`id_song`),
  CONSTRAINT `favorite_songs_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `favorite_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_songs_of_user`
--

LOCK TABLES `favorite_songs_of_user` WRITE;
/*!40000 ALTER TABLE `favorite_songs_of_user` DISABLE KEYS */;
INSERT INTO `favorite_songs_of_user` VALUES (1,14),(1,15),(1,16),(1,7),(1,8),(7,8),(7,9),(7,12);
/*!40000 ALTER TABLE `favorite_songs_of_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featured_artists`
--

DROP TABLE IF EXISTS `featured_artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `featured_artists` (
  `id_artist` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  KEY `featured_artists_id_artist_fk` (`id_artist`),
  KEY `featured_artists_id_user_fk_idx` (`id_song`),
  CONSTRAINT `featured_artists_id_artist_fk` FOREIGN KEY (`id_artist`) REFERENCES `artist` (`id_artist`),
  CONSTRAINT `featured_artists_id_user_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featured_artists`
--

LOCK TABLES `featured_artists` WRITE;
/*!40000 ALTER TABLE `featured_artists` DISABLE KEYS */;
/*!40000 ALTER TABLE `featured_artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id_user` bigint NOT NULL,
  `id_follower` bigint NOT NULL,
  KEY `followers_id_follower_fk` (`id_follower`),
  KEY `followers_id_user_fk` (`id_user`),
  CONSTRAINT `followers_id_follower_fk` FOREIGN KEY (`id_follower`) REFERENCES `users` (`id_user`),
  CONSTRAINT `followers_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,2),(1,3),(1,5),(3,1),(3,2),(3,5),(3,6),(3,7);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_albums`
--

DROP TABLE IF EXISTS `liked_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_albums` (
  `id_user` bigint NOT NULL,
  `id_album` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `liked_albums_id_album_fk` (`id_album`),
  KEY `liked_albums_id_user_fk` (`id_user`),
  CONSTRAINT `liked_albums_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `liked_albums_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_albums`
--

LOCK TABLES `liked_albums` WRITE;
/*!40000 ALTER TABLE `liked_albums` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_lists`
--

DROP TABLE IF EXISTS `liked_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_lists` (
  `id_user` bigint NOT NULL,
  `id_list` bigint NOT NULL,
  `date` date DEFAULT NULL,
  KEY `liked_lists_id_list_fk` (`id_list`),
  KEY `liked_lists_id_user_fk` (`id_user`),
  CONSTRAINT `liked_lists_id_list_fk` FOREIGN KEY (`id_list`) REFERENCES `list` (`id_list`),
  CONSTRAINT `liked_lists_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_lists`
--

LOCK TABLES `liked_lists` WRITE;
/*!40000 ALTER TABLE `liked_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_reviewed_album`
--

DROP TABLE IF EXISTS `liked_reviewed_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_reviewed_album` (
  `id_user` bigint NOT NULL,
  `id_reviewed_album` bigint NOT NULL,
  KEY `id_reviewed_album_idx` (`id_reviewed_album`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_reviewed_album_fk` FOREIGN KEY (`id_reviewed_album`) REFERENCES `reviewed_albums` (`id_reviewed_albums`),
  CONSTRAINT `id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_reviewed_album`
--

LOCK TABLES `liked_reviewed_album` WRITE;
/*!40000 ALTER TABLE `liked_reviewed_album` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_reviewed_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_reviewed_songs`
--

DROP TABLE IF EXISTS `liked_reviewed_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_reviewed_songs` (
  `id_user` bigint NOT NULL,
  `id_reviewed_album` bigint NOT NULL,
  PRIMARY KEY (`id_user`,`id_reviewed_album`),
  KEY `id_reviewed_album` (`id_reviewed_album`),
  CONSTRAINT `liked_reviewed_songs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `liked_reviewed_songs_ibfk_2` FOREIGN KEY (`id_reviewed_album`) REFERENCES `reviewed_songs` (`id_reviewed_songs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_reviewed_songs`
--

LOCK TABLES `liked_reviewed_songs` WRITE;
/*!40000 ALTER TABLE `liked_reviewed_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_reviewed_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_reviews_songs`
--

DROP TABLE IF EXISTS `liked_reviews_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_reviews_songs` (
  `id_user` bigint NOT NULL,
  `id_reviewed_song` bigint NOT NULL,
  KEY `likeds_idx` (`id_user`),
  KEY `id_reviewed_song_idx` (`id_reviewed_song`),
  CONSTRAINT `id_reviewed_song` FOREIGN KEY (`id_reviewed_song`) REFERENCES `reviewed_songs` (`id_reviewed_songs`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_reviews_songs`
--

LOCK TABLES `liked_reviews_songs` WRITE;
/*!40000 ALTER TABLE `liked_reviews_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_reviews_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_songs`
--

DROP TABLE IF EXISTS `liked_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_songs` (
  `id_user` bigint NOT NULL,
  `id_songs` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `liked_songs_id_songs_fk` (`id_songs`),
  KEY `liked_songs_id_user_fk` (`id_user`),
  CONSTRAINT `liked_songs_id_songs_fk` FOREIGN KEY (`id_songs`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `liked_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_songs`
--

LOCK TABLES `liked_songs` WRITE;
/*!40000 ALTER TABLE `liked_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `id_list` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id_list`),
  KEY `list_user_fk_idx` (`id_user`),
  CONSTRAINT `list_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listened_albums`
--

DROP TABLE IF EXISTS `listened_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listened_albums` (
  `id_user` bigint NOT NULL,
  `id_album` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `listened_albums_id_album_fk` (`id_album`),
  KEY `listened_albums_id_user_fk` (`id_user`),
  CONSTRAINT `listened_albums_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `listened_albums_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listened_albums`
--

LOCK TABLES `listened_albums` WRITE;
/*!40000 ALTER TABLE `listened_albums` DISABLE KEYS */;
INSERT INTO `listened_albums` VALUES (3,1,'2024-10-01'),(3,7,'2024-10-01'),(3,12,'2024-10-01');
/*!40000 ALTER TABLE `listened_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listened_songs`
--

DROP TABLE IF EXISTS `listened_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listened_songs` (
  `id_user` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `listened_songs_id_song_fk` (`id_song`),
  KEY `listened_songs_id_user_fk` (`id_user`),
  CONSTRAINT `listened_songs_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `listened_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listened_songs`
--

LOCK TABLES `listened_songs` WRITE;
/*!40000 ALTER TABLE `listened_songs` DISABLE KEYS */;
INSERT INTO `listened_songs` VALUES (7,7,'2024-10-01'),(7,8,'2024-10-01'),(7,9,'2024-10-01'),(1,12,'2024-10-01'),(1,9,'2024-10-01'),(1,8,'2024-10-01'),(1,7,'2024-10-01');
/*!40000 ALTER TABLE `listened_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id_user` bigint NOT NULL,
  `bio` text,
  `photo` blob,
  KEY `id_user_profile_idx` (`id_user`),
  CONSTRAINT `id_user_profile` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (6,'Soy un Chavito Bien que le gusta programar Pero Tiene Mucho que aprender',NULL),(7,'ඞඞඞඞඞඞ','');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranked_albums`
--

DROP TABLE IF EXISTS `ranked_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranked_albums` (
  `id_user` bigint NOT NULL,
  `id_album` bigint NOT NULL,
  `score` double NOT NULL,
  `date` date NOT NULL,
  KEY `ranked_albums_id_album_fk` (`id_album`),
  KEY `ranked_albums_id_user_fk` (`id_user`),
  CONSTRAINT `ranked_albums_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `ranked_albums_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranked_albums`
--

LOCK TABLES `ranked_albums` WRITE;
/*!40000 ALTER TABLE `ranked_albums` DISABLE KEYS */;
INSERT INTO `ranked_albums` VALUES (2,14,4.5,'2024-10-09'),(7,14,5,'2024-10-01'),(6,14,5,'2024-10-01'),(5,14,5,'2024-10-01'),(3,14,5,'2024-10-01'),(6,15,2,'2024-10-01'),(5,15,2,'2024-10-01'),(3,15,2,'2024-10-01'),(2,15,2,'2024-10-01'),(6,1,2,'2024-10-01'),(5,1,2,'2024-10-01'),(3,1,2,'2024-10-01'),(2,1,2,'2024-10-01'),(7,1,2,'2024-10-01'),(7,2,2,'2024-10-01'),(7,3,2,'2024-10-01'),(7,4,2,'2024-10-01'),(7,5,4.5,'2024-10-01'),(7,7,4.5,'2024-10-01'),(7,8,4.5,'2024-10-01'),(7,9,3.5,'2024-10-01'),(7,10,3.5,'2024-10-01'),(7,11,3.5,'2024-10-01'),(7,12,3.5,'2024-10-01'),(7,13,3.5,'2024-10-01'),(7,15,3.5,'2024-10-01'),(7,16,1.5,'2024-10-01');
/*!40000 ALTER TABLE `ranked_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranked_lists`
--

DROP TABLE IF EXISTS `ranked_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranked_lists` (
  `id_user` bigint NOT NULL,
  `id_list` bigint NOT NULL,
  `score` double NOT NULL,
  `date` date NOT NULL,
  KEY `ranked_lists_id_list_fk` (`id_list`),
  KEY `ranked_lists_id_user_fk` (`id_user`),
  CONSTRAINT `ranked_lists_id_list_fk` FOREIGN KEY (`id_list`) REFERENCES `list` (`id_list`),
  CONSTRAINT `ranked_lists_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranked_lists`
--

LOCK TABLES `ranked_lists` WRITE;
/*!40000 ALTER TABLE `ranked_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranked_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranked_reviewed_album`
--

DROP TABLE IF EXISTS `ranked_reviewed_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranked_reviewed_album` (
  `id_reviewed_album` bigint NOT NULL,
  `id_user` bigint NOT NULL,
  `score` double NOT NULL,
  `date` date NOT NULL,
  KEY `id_reviewed_album_fk6_idx` (`id_reviewed_album`),
  KEY `id_user_fk6_idx` (`id_user`),
  CONSTRAINT `id_reviewed_album_fk6` FOREIGN KEY (`id_reviewed_album`) REFERENCES `reviewed_albums` (`id_reviewed_albums`),
  CONSTRAINT `id_user_fk6` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranked_reviewed_album`
--

LOCK TABLES `ranked_reviewed_album` WRITE;
/*!40000 ALTER TABLE `ranked_reviewed_album` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranked_reviewed_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranked_reviewed_song`
--

DROP TABLE IF EXISTS `ranked_reviewed_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranked_reviewed_song` (
  `id_reviewed_song` bigint NOT NULL,
  `id_user` bigint NOT NULL,
  `score` double NOT NULL,
  `date` date NOT NULL,
  KEY `id_reviewed_song_fk44_idx` (`id_reviewed_song`),
  KEY `id_user_fk44_idx` (`id_user`),
  CONSTRAINT `id_reviewed_song_fk44` FOREIGN KEY (`id_reviewed_song`) REFERENCES `reviewed_songs` (`id_reviewed_songs`),
  CONSTRAINT `id_user_fk44` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranked_reviewed_song`
--

LOCK TABLES `ranked_reviewed_song` WRITE;
/*!40000 ALTER TABLE `ranked_reviewed_song` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranked_reviewed_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranked_songs`
--

DROP TABLE IF EXISTS `ranked_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranked_songs` (
  `id_user` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  `score` double NOT NULL,
  `date` date NOT NULL,
  KEY `ranked_songs_id_song_fk` (`id_song`),
  KEY `ranked_songs_id_user_fk` (`id_user`),
  CONSTRAINT `ranked_songs_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `ranked_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranked_songs`
--

LOCK TABLES `ranked_songs` WRITE;
/*!40000 ALTER TABLE `ranked_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranked_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewed_albums`
--

DROP TABLE IF EXISTS `reviewed_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewed_albums` (
  `id_reviewed_albums` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `id_album` bigint NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_reviewed_albums`),
  KEY `reviewed_albums_id_album_fk` (`id_album`),
  KEY `reviewed_albums_id_user_fk` (`id_user`),
  CONSTRAINT `reviewed_albums_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `reviewed_albums_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewed_albums`
--

LOCK TABLES `reviewed_albums` WRITE;
/*!40000 ALTER TABLE `reviewed_albums` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviewed_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewed_lists`
--

DROP TABLE IF EXISTS `reviewed_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewed_lists` (
  `id_user` bigint NOT NULL,
  `id_list` bigint NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL,
  KEY `reviewed_lists_id_list_fk` (`id_list`),
  KEY `reviewed_lists_id_user_fk` (`id_user`),
  CONSTRAINT `reviewed_lists_id_list_fk` FOREIGN KEY (`id_list`) REFERENCES `list` (`id_list`),
  CONSTRAINT `reviewed_lists_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewed_lists`
--

LOCK TABLES `reviewed_lists` WRITE;
/*!40000 ALTER TABLE `reviewed_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviewed_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewed_songs`
--

DROP TABLE IF EXISTS `reviewed_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewed_songs` (
  `id_reviewed_songs` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_reviewed_songs`),
  KEY `reviewed_songs_id_song_fk` (`id_song`),
  KEY `reviewed_songs_id_user_fk` (`id_user`),
  CONSTRAINT `reviewed_songs_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `reviewed_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewed_songs`
--

LOCK TABLES `reviewed_songs` WRITE;
/*!40000 ALTER TABLE `reviewed_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviewed_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id_song` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` blob,
  `id_artist` bigint NOT NULL,
  `released` date NOT NULL,
  `language` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_song`),
  KEY `songs_id_artist_fk` (`id_artist`),
  CONSTRAINT `songs_id_artist_fk` FOREIGN KEY (`id_artist`) REFERENCES `artist` (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (7,'Despacito',NULL,2,'2017-01-13','Español','Reggaetón'),(8,'Shape of You',NULL,3,'2017-01-06','Inglés','Pop'),(9,'Blinding Lights',NULL,4,'2019-11-29','Inglés','Synthwave'),(12,'Vivir Mi Vida',NULL,3,'2013-04-19','Español','Salsa'),(13,'Échame la Culpa',NULL,2,'2017-11-17','Español','Pop Latino'),(14,'Aquí Estoy Yo',NULL,2,'2008-08-25','Español','Balada'),(15,'No Me Doy Por Vencido',NULL,2,'2008-07-04','Español','Pop Latino'),(16,'Nada Es Para Siempre',NULL,2,'2005-09-26','Español','Balada');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs_on_album`
--

DROP TABLE IF EXISTS `songs_on_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs_on_album` (
  `id_album` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  KEY `songs_on_album_id_album_fk` (`id_album`),
  KEY `songs_on_album_id_song_fk` (`id_song`),
  CONSTRAINT `songs_on_album_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `songs_on_album_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs_on_album`
--

LOCK TABLES `songs_on_album` WRITE;
/*!40000 ALTER TABLE `songs_on_album` DISABLE KEYS */;
/*!40000 ALTER TABLE `songs_on_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs_on_list`
--

DROP TABLE IF EXISTS `songs_on_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs_on_list` (
  `id_list` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  `date` datetime NOT NULL,
  KEY `songs_on_list_id_list_fk` (`id_list`),
  KEY `songs_on_list_id_song_fk` (`id_song`),
  CONSTRAINT `songs_on_list_id_list_fk` FOREIGN KEY (`id_list`) REFERENCES `list` (`id_list`),
  CONSTRAINT `songs_on_list_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs_on_list`
--

LOCK TABLES `songs_on_list` WRITE;
/*!40000 ALTER TABLE `songs_on_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `songs_on_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jexbii','jazielheredia123@gmail.com','$2b$12$.MFviGsynF1yix8KWksHUuRuMxkZn/DcrMBigy2vw5RT04.k2qb7.','user'),(2,'Elderdius','elderdius123@gmail.com','$2b$12$.MFviGsynF1yix8KWksHUuRuMxkZn/DcrMBigy2vw5RT04.k2qb7.','admin'),(3,'Aniquilador','aniquilador123@gmail.com','$2b$12$zTCqe/5ayNGuoNYkipR8ze4UWso805GUACTE3czxVi0MIsm1jB4Da','user'),(5,'Aniquiladorsin','aniquilador1234@gmail.com','$2b$12$UiDgFwhxkFMIKq/gS7YnjebxPN3O0LGUCxq.KTOQ806MQ.ZSEd1Jy','user'),(6,'Aniquiladorsito','aniquilador12345@gmail.com','$2b$12$eGgbfdgmO7XszS5Aii1Lheb4o95B.EXtPpUfQQJys9zTTPjASI5Y2','user'),(7,'LecheDePiedra','jazielheredia12345@gmail.com','$2b$12$qZS/.XO5KAPAvheiL8gMqeQdYqOTAxpxOVpa/M6SZOVMWz7zfiyFC','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist_albums`
--

DROP TABLE IF EXISTS `watchlist_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist_albums` (
  `id_user` bigint NOT NULL,
  `id_album` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `watchlist_albums_id_album_fk` (`id_album`),
  KEY `watchlist_albums_id_user_fk` (`id_user`),
  CONSTRAINT `watchlist_albums_id_album_fk` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`),
  CONSTRAINT `watchlist_albums_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist_albums`
--

LOCK TABLES `watchlist_albums` WRITE;
/*!40000 ALTER TABLE `watchlist_albums` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist_songs`
--

DROP TABLE IF EXISTS `watchlist_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist_songs` (
  `id_user` bigint NOT NULL,
  `id_song` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `watchlist_songs_id_song_fk` (`id_song`),
  KEY `watchlist_songs_id_user_fk` (`id_user`),
  CONSTRAINT `watchlist_songs_id_song_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `watchlist_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist_songs`
--

LOCK TABLES `watchlist_songs` WRITE;
/*!40000 ALTER TABLE `watchlist_songs` DISABLE KEYS */;
INSERT INTO `watchlist_songs` VALUES (1,8,'2024-09-27'),(5,12,'2024-10-01'),(5,13,'2024-10-01'),(5,14,'2024-10-01'),(2,16,'2024-10-01'),(2,7,'2024-10-01'),(2,8,'2024-10-01');
/*!40000 ALTER TABLE `watchlist_songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 11:23:23
