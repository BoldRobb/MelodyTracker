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
  `photo` varchar(255) DEFAULT NULL,
  `released` date NOT NULL,
  `language` varchar(255) NOT NULL,
  PRIMARY KEY (`id_album`),
  KEY `album_id_artist_fk` (`id_artist`),
  CONSTRAINT `album_id_artist_fk` FOREIGN KEY (`id_artist`) REFERENCES `artist` (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Purpose',5,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fpurpose.jpg?alt=media&token=c7e2ed31-747b-49ca-9921-1808f95b9a42','2015-11-13','English'),(2,'Believe',5,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fbelieve.jpg?alt=media&token=a3fe987b-1267-4ed1-8ca7-d6c4f3367dbd','2012-06-15','English'),(3,'My World 2.0',5,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fmyworld20.jpg?alt=media&token=d894932a-61ab-48dc-83cd-86d59cefd09f','2010-03-19','English'),(4,'Justice',5,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fjustice.jpg?alt=media&token=8b6a6d9b-b2e4-4d6a-8246-6e805ee6bcf9','2021-03-19','English'),(5,'Changes',5,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fchanges.jpg?alt=media&token=04ca3a34-02c5-4700-89d6-168120e13380','2020-02-14','English'),(7,'After Hours',4,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fafterhours.jpg?alt=media&token=c279a280-06eb-4fed-aaa2-0e7f5a1168c1','2020-03-20','English'),(8,'Starboy',4,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88','2016-11-25','English'),(9,'Beauty Behind the Madness',4,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2FBeautyBehindtheMadness.jpg?alt=media&token=4b10c8ca-ad82-418a-b777-910c4ccb77fc','2015-08-28','English'),(10,'Kiss Land',4,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fkissland.jpg?alt=media&token=35073b34-223d-4f73-80fc-71b1a632655d','2013-09-10','English'),(11,'Dawn FM',4,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fdawnfm.jpg?alt=media&token=da7b6c40-1894-41a1-a555-596df872c4d4','2022-01-07','English'),(12,'Portales',7,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fportales.jpg?alt=media&token=c1be0f28-d412-41df-a18e-bc126c8a58b8','2020-03-27','Spanish'),(13,'GOTTI A',7,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2FGOTTIA.jpg?alt=media&token=57e99274-053b-4763-9207-f8fdf209764b','2021-06-11','Spanish'),(14,'TPZK',7,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2FGOTTIA.jpg?alt=media&token=57e99274-053b-4763-9207-f8fdf209764b','2021-12-10','Spanish'),(15,'Cato Soundtrack',7,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fcato.jpg?alt=media&token=6f6cb010-59d0-46b3-9b87-f679f8f9704a','2023-06-23','Spanish'),(16,'Valor de la Calle',7,'https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fvalordelacalle.jpg?alt=media&token=6ed737b5-d6f4-4221-aba3-6d424da6af86','2023-08-25','Spanish'),(17,'Red',68,'https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.jpg','2021-08-08','English'),(18,'1989',68,'https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png','2024-03-03','English'),(19,'Lover',68,'https://lastfm.freetls.fastly.net/i/u/174s/d3f083370c371a3ba1cddafaf193c27d.jpg','2022-10-10','English'),(20,'evermore',68,'https://lastfm.freetls.fastly.net/i/u/174s/3fc71aa25ab1242571c841c75f764d10.jpg','2023-03-03','English'),(21,'Taylor Swift',68,'https://lastfm.freetls.fastly.net/i/u/174s/d60d9367bceb0ee1eb97a11033fa37ed.png','2022-02-02','English'),(22,'Fearless',68,'https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.jpg','2021-08-08','English'),(23,'Midnights',68,'https://lastfm.freetls.fastly.net/i/u/174s/8914bab2a0e4e454c6892f151d57208f.png','2022-12-12','English'),(24,'folklore',68,'https://lastfm.freetls.fastly.net/i/u/174s/b8da93ab6d8aa00384998fdae7451d92.jpg','2022-12-12','English'),(25,'Damn',69,'https://lastfm.freetls.fastly.net/i/u/174s/6936da5298bec1224c30ff5ef9966155.png','2018-11-11','English'),(26,'To Pimp a Butterfly',69,'https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png','2023-12-12','English'),(27,'GNX',69,'https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png','2024-11-11','English'),(28,'good kid, m.A.A.d city',69,'https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.jpg','2024-08-08','English'),(29,'GÉNESIS',70,'https://lastfm.freetls.fastly.net/i/u/174s/ed88f13e40be72725f22b5480bd729c1.jpg','2023-10-10','English'),(30,'Éxodo',70,'https://lastfm.freetls.fastly.net/i/u/174s/1b0ecd4900c7f0a311413f8992e1a0bb.jpg','2024-06-06','English'),(31,'Soy Como Quiero Ser',80,'https://lastfm.freetls.fastly.net/i/u/174s/ec45377db49f2f0685fa0b9890765629.jpg','2023-05-05','English'),(32,'Romance',80,'https://lastfm.freetls.fastly.net/i/u/174s/4653499cf52060662857899e51d33909.jpg','2023-08-08','English'),(33,'Romances',80,'https://lastfm.freetls.fastly.net/i/u/174s/15cc71218d6e9898e49d75435eb9d133.jpg','2011-11-11','English'),(34,'Segundo Romance',80,'https://lastfm.freetls.fastly.net/i/u/174s/1c5442f8cf395220230912d66097981d.jpg','2011-11-11','English'),(35,'The Life of Pablo',84,'https://lastfm.freetls.fastly.net/i/u/174s/8c6af1315c66631bad022085c7992b34.jpg','2022-10-10','English'),(36,'Donda',84,'https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png','2022-10-10','English'),(37,'Graduation',84,'https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png','2024-12-12','English'),(38,'My Beautiful Dark Twisted Fantasy',84,'https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png','2022-11-11','English'),(39,'Late Registration',84,'https://lastfm.freetls.fastly.net/i/u/174s/9c0e7886d750a519c9ec63c30434b483.png','2022-11-11','English'),(40,'ye',84,'https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.jpg','2021-05-05','English'),(41,'Yeezus',84,'https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png','2023-05-05','English'),(42,'College Dropout',84,'https://lastfm.freetls.fastly.net/i/u/174s/14cdcd1c048f47af9643fa9d223ea500.png','2022-08-08','English');
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
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `photo` varchar(255) NOT NULL,
  `spotify` text,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_artist`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (2,'Luis Fonsi es un cantante y compositor puertorriqueño, famoso por su éxito \"Despacito\".','url_de_la_foto_luis_fonsi.jpg','https://open.spotify.com/artist/luisfonsi','Luis Fonsi'),(3,'Ed Sheeran es un cantante y compositor británico, conocido por sus baladas emotivas y su estilo único.','url_de_la_foto_ed_sheeran.jpg','https://open.spotify.com/artist/edsheeran','Ed Sheeran'),(4,'The Weeknd es un cantante y productor canadiense, famoso por su estilo innovador y su música R&B.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Ftheweekendprofile.jpg?alt=media&token=35effd7c-ebcf-4d1a-8790-35123cac7aa9','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Ftheweekendprofile.jpg?alt=media&token=35effd7c-ebcf-4d1a-8790-35123cac7aa9','The Weeknd'),(5,'Justin Bieber es un cantante canadiense que ha sido una sensación mundial desde su adolescencia.','url_de_la_foto_justin_bieber.jpg','https://open.spotify.com/artist/justinbieber','Justin Bieber'),(7,'Tiago PZK es un cantante y rapero argentino, conocido por su música que mezcla géneros como el trap, reggaetón y pop.','','https://open.spotify.com/artist/6opBkyWwqkGa2ZgB1swh9a','Tiago PZK'),(8,'HOLAAA','url_de_la_foto_justin_bieber.jpg','https://open.spotify.com/artist/luisfonsi','Luis Enrique'),(66,'Cher (born Cherilyn Sarkisian; May 20, 1946) is an American singer, actress and television personality. Often referred to by the media as the \"Goddess of Pop\", she has been described as embodying female autonomy in a male-dominated industry. Cher is known for her distinctive contralto singing voice and for having worked in numerous areas of entertainment, as well as adopting a variety of styles and appearances throughout her six-decade-long career. <a href=\"https://www.last.fm/music/Cher\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Cher','Cher'),(67,'Aubrey \"Drake\" Graham (born October 24, 1986) is an Canadian rapper, singer, songwriter, record producer, actor, and businessman. Drake was an actor on the teen drama television series Degrassi: The Next Generation in the early 2000s. Intent on pursuing a career in music, he left the series in 2007 after releasing his debut mixtape, Room for Improvement. He released two further independent projects, Comeback Season and So Far Gone, before signing to Lil Wayne\'s Young Money Entertainment in June 2009. <a href=\"https://www.last.fm/music/Drake\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Drake','Drake'),(68,'Taylor Alison Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting, which is often inspired by her personal life, has received widespread media coverage and critical praise.\n\nSwift rose to mainstream prominence with her sophomore studio album, Fearless (2008), a country pop record with crossover appeal. Aided by the top-five singles “Love Story” and “You Belong with Me”, Fearless was certified Diamond by the Recording Industry Recording Industry Association of America (RIAA). <a href=\"https://www.last.fm/music/Taylor+Swift\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Taylor+Swift','Taylor Swift'),(69,'Kendrick Lamar Duckworth (born June 17, 1987), professionally known as Kendrick Lamar, is an American rapper and songwriter from Compton, California. He is also a member of the hip-hop supergroup Black Hippy along with members Jay Rock, Ab-Soul, and Schoolboy Q. His music is largely influenced by the works of 2Pac, Eminem, Lil’ Wayne, DJ Quik, E-40, Suga Free, André 3000, Mos Def, DMX, Nas, Kurupt, Snoop Dogg and N.W.A.\n\nHe began to gain major recognition in 2010 after his first retail release, Overly Dedicated. <a href=\"https://www.last.fm/music/Kendrick+Lamar\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Kendrick+Lamar','Kendrick Lamar'),(70,'Hassan Emilio Kabande Laija, known as Peso Pluma, is a Mexican singer-songwriter of regional Mexican music. Born on June 15th 1999, in Zapopan, Jalisco Mexico.\nHe gained great popularity internationally in 2022, after his collaborations with Natanael Cano and Luis R. Conriquez, currently Peso Pluma  is one of the great promises of Mexican artists. <a href=\"https://www.last.fm/music/Peso+Pluma\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Peso+Pluma','Peso Pluma'),(71,'Queen is an English rock band originally consisting of four members: vocalist and pianist Freddie Mercury, guitarist Brian May, bass guitarist John Deacon, and drummer Roger Taylor.\n\nThe band formed in London in 1970 after May and Taylor\'s former band Smile split after having released an album and single. Freddie replaced lead vocalist Tim Staffell, after the latter\'s departure from the original trio. \n\nThere was much deliberation as to what the band\'s name would be. <a href=\"https://www.last.fm/music/Queen\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Queen','Queen'),(72,'Pink Floyd is an English rock band formed in London in 1965. Gaining an early following as one of the first British psychedelic groups, they were distinguished by their extended compositions, sonic experimentation, philosophical lyrics and elaborate live shows. They became a leading band of the progressive rock genre, cited by some as the greatest progressive rock band of all time.\n\nPink Floyd were founded in 1965 by Syd Barrett (guitar, lead vocals) <a href=\"https://www.last.fm/music/Pink+Floyd\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Pink+Floyd','Pink Floyd'),(73,'There are at least two artists with the name Mora, one being a Puerto Rican singer and the other being a Slovenian metal band.\n\n1) Mora is a Puerto Rican singer and producer.\n\n2) MORA had their first appearance in the metal world on November 23rd 2007, when they introduced themselves for the first time to their home crowd after just a few weeks of practice. Then with Jupoll (Vocals, Guitar), Nazgul (Guitar), Scavenger (Bass, Back Vocals) and Zli (Drums). <a href=\"https://www.last.fm/music/Mora\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Mora','Mora'),(74,'Duki, cuyo nombre real es Mauro Ezequiel Lombardo Quiroga, es uno de los artistas más influyentes y populares en la escena del trap y la música urbana en Argentina y América Latina. Nació el 24 de junio de 1996 en Almagro, Buenos Aires, y desde muy joven mostró interés por la música y el rap, pero fue a mediados de la década de 2010 cuando su carrera comenzó a despegar, convirtiéndose en un referente del género.\n\n### Inicios en la música <a href=\"https://www.last.fm/music/Duki\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Duki','Duki'),(75,'\nValentín Oliva, (Buenos Aires, Argentina; 23 de enero de 1998) conocido artísticamente como Wos, es un rapero, freestyler argentino. Es conocido por ser el actual campeón en el torneo internacional de Red Bull Batalla de los Gallos.\n\nCarrera\n\nWos arrancó desde muy pequeño rapeando en las plazas y participando en competencias como El Quinto Escalón, donde ya demostraba un gran potencial y sobre todo mucho coraje. Pero fue en 2016 cuando demostró que su nivel estaba para mucho más que una plaza <a href=\"https://www.last.fm/music/Wos\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Wos','Wos'),(76,'Alejo Nahuel Acosta Migliarini, conocido artísticamente como Ysy A, es un traper y ex-freestyler argentino nacido en Buenos Aires, Argentina (12 de Julio en 1998).\n\nCreador del que fue el mayor evento de freestyle urbano en Latinoamérica llamado El Quinto Escalón junto con Muphasa, otro gran rapero de la escena que aún sigue en el freestyle.\n\nDesde finales de 2017 y principios de 2018, Alejo forma parte del trío músical #ModoDiablo junto a los también traperos Duki y Neo Pistéa. <a href=\"https://www.last.fm/music/Ysy+A\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Ysy+A','Ysy A'),(77,'Sebastián Ezequiel Chinellato, conocido artísticamente como Neo Pistéa, es un cantautor argentino nacido el 5 de octubre de 1994 en Buenos Aires, Argentina.\n\nEl cantante comenzó a relacionarse con el ambiente del Hip-Hop a temprana edad, con solo 16 años empezó a rapear junto a King Team y Vasuras Crew.\n\nEn 2016, la carrera del artista dio un gran salto debido a grandes hits que lanzo en dicho año, como “Elvira”, “Oro Y Perfume”, “Tumbando El Club”, entre otros. <a href=\"https://www.last.fm/music/Neo+Pistea\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Neo+Pistea','Neo Pistea'),(78,' <a href=\"https://www.last.fm/music/Gabito+Ballesteros\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Gabito+Ballesteros','Gabito Ballesteros'),(79,'Guns N\' Roses is an American hard rock band founded in Los Angeles, California in 1985. \n\nThe band has released six studio albums: Appetite For Destruction in 1987, G N\' R Lies in 1988, Use Your Illusion I and Use Your Illusion II in 1991, \"The Spaghetti Incident?\" in 1993 and, after 15 years and with frontman Axl Rose and keyboardist Dizzy Reed being the only members left from the previous lineup, Chinese Democracy in 2008. They also released three EP\'s in 1986, 1988, and 1993 and two live albums, in 1999 and 2014. <a href=\"https://www.last.fm/music/Guns+N%27+Roses\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Guns+N%27+Roses','Guns N\' Roses'),(80,'Luis Miguel Gallego Basteri (born 19 April 1970) is a Mexican singer and icon in Latin America, often referred to as El Sol de México (The Sun of Mexico), which is the nickname his mother gave him as a child- \"mi sol\". He is widely regarded as the most successful artist in Latin American history, having successfully performed in a wide range of musical styles, including pop, ballads, boleros, tangos, jazz, big band and mariachi. Luis Miguel is also <a href=\"https://www.last.fm/music/Luis+Miguel\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Luis+Miguel','Luis Miguel'),(81,'Cristian Castro (born Cristian Sáenz Castro on December 8th, 1974 in Mexico City) is a Grammy Award-nominated Mexican pop singer, songwriter and actor. He is sometimes simply known as Cristian or \"el Gallito Feliz\" (Spanish: \"The Happy Little Rooster\"). He is also the lead singer of Mexican heavy metal band La Esfinge (under the pseudonym \"Lügh Draculea\"), formed in 2014 along with ex-Maná and ex-Jaguares guitarist César \"Vampiro\" López.\n\nCastro added the \"h\" to his first name for the release of his successful album <a href=\"https://www.last.fm/music/Cristian+Castro\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Cristian+Castro','Cristian Castro'),(83,'Tyler Gregory Okonma (born March 6, 1991) also known as Tyler, The Creator, is a Grammy award-winning American rapper, singer, record producer, director, fashion designer, and the head of his independent record label, Odd Future Records. He was the leader of the now-defunct Los Angeles, California, USA hip-hop collective Odd Future Wolf Gang Kill Them All (OFWGKTA). Since his first recordings had debuted on The Odd Future Tape in 2007, he had rapped on, and produced for, nearly every OFWGKTA release.  <a href=\"https://www.last.fm/music/Tyler,+the+Creator\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Tyler,+the+Creator','Tyler, the Creator'),(84,'Ye, born Kanye Omari West on June 8, 1977, is an American rapper, singer, songwriter, record producer, and fashion designer. He is one of the most prominent figures in hip hop, known for his diverse musical style and polarizing cultural and political commentary. After dropping out of college to pursue a career in music, West began producing for regional artists in the Chicago area. As an in-house producer for Roc-A-Fella Records, he co-produced albums including Jay-Z\'s The Blueprint (2001) before signing with the label as a recording artist. <a href=\"https://www.last.fm/music/Kanye+West\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Kanye+West','Kanye West'),(85,'Rakim Athelaston Mayers, known professionally as A$AP Rocky, is an American rapper, record producer and record executive. Born and raised in Harlem, he embarked on his musical career as a member of the hip hop collective A$AP Mob, from which he adopted his moniker. In August 2011, Rocky\'s single \"Peso\" was leaked online and within weeks began receiving radio airplay. Rocky released his debut mixtape Live.Love.A$AP, later that year to widespread critical acclaim. <a href=\"https://www.last.fm/music/A$AP+Rocky\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/A$AP+Rocky','A$AP Rocky'),(86,'Jacques Webster (born April 30, 1992), better known by his stage name Travis Scott (stylized as Travi$ Scott), is an American hip hop recording artist and record producer from Houston, Texas. He is currently signed to Epic Records and T.I.\'s Grand Hustle imprint, while signed to Kanye West\'s Very GOOD Beats as a producer. He first became widely known for his production and verse on GOOD Music\'s \"Sin City\". His debut EP Owl Pharaoh, was released on May 21, 2013. <a href=\"https://www.last.fm/music/+noredirect/Travis+Scott\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/+noredirect/Travis+Scott','Travis Scott'),(87,'This is an incorrect tag for Beyoncé. If you have Last.fm Autocorrection on, it will automatically redirect your scrobbles to the correct tag. However, it is recommended that you change your ID3 tags to the correct artist name. <a href=\"https://www.last.fm/music/+noredirect/Beyonce\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/+noredirect/Beyonce','Beyonce'),(88,'Robyn Rihanna Fenty (born February 20, 1988), professionally known mononymously as Rihanna, is a Barbadian singer, songwriter, actress, businesswoman, entrepreneur and fashion designer.\n\nShe has attained fourteen Billboard Hot 100 number ones thus far and is the second Barbadian artist to win a Grammy Award. She is also a cultural ambassador for Barbados. In 2021 Rihanna was named a \"National Hero\" in her home country, earning her the title \"The Right Excellent.\"  <a href=\"https://www.last.fm/music/Rihanna\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Rihanna','Rihanna'),(89,'Sabrina Annlynn Carpenter (born May 11, 1999) is an American singer, songwriter, and actress. She first gained recognition starring on the Disney Channel series Girl Meets World (2014-2017) and signed with Hollywood Records. She released her debut single, \"Can\'t Blame a Girl for Trying\", in 2014, followed by four studio albums: Eyes Wide Open (2015), EVOLution (2016), Singular Act I (2018) and Singular Act II (2019); three of her singles — \"Alien\",  \"Almost Love\" and \"Sue Me\" — topped the US Dance Club Songs. <a href=\"https://www.last.fm/music/Sabrina+Carpenter\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Sabrina+Carpenter','Sabrina Carpenter'),(90,'Charlotte Emma Aitchison, known professionally as Charli xcx, is an English singer and songwriter. Born in Cambridge and raised in Start Hill, Essex, she began posting songs on MySpace in 2008, which led to her discovery by a promoter who invited her to perform at warehouse raves and parties. In 2010, she signed a recording contract with Asylum Records, releasing a series of singles and mixtapes throughout 2011 and 2012.\n\nIn 2012, Charli xcx rose to prominence with the Icona Pop collaboration \"I Love It\" <a href=\"https://www.last.fm/music/Charli+XCX\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Charli+XCX','Charli XCX'),(92,'Prince Rogers Nelson (June 7, 1958 – April 21, 2016), more commonly known mononymously as Prince, was an American singer-songwriter, musician, and record producer. The recipient of numerous awards and nominations, he is widely regarded as one of the greatest musicians of his generation. He was known for his flamboyant, androgynous persona; his wide vocal range, which included a far-reaching falsetto and high-pitched screams; and his skill as a multi-instrumentalist, often preferring to play all or most of the instruments on his recordings. <a href=\"https://www.last.fm/music/Prince\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Prince','Prince'),(93,'Billie Eilish Pirate Baird O\'Connell (born December 18, 2001), known professionally as Billie Eilish, is a Grammy and Academy Award-winning American singer and songwriter signed to Darkroom/Interscope Records. Born and raised in Los Angeles, Eilish grew up in a household of actors and musicians and was homeschooled along with her brother Finneas O\'Connell. At the age of eight, she joined the Los Angeles Children\'s Choir, developing the soulful vocals that would later appear on her early singles. <a href=\"https://www.last.fm/music/Billie+Eilish\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Billie+Eilish','Billie Eilish'),(94,'Kenia Guadalupe Flores Osuna, better known in the digital world as Kenia Os (born in Mazatlán, Sinaloa, Mexico on July 15, 1999) is a mexican singer, songwriter, influencer and a female entrepeneur.\n\nIn 2018 she emerged as a singer by opening her channel \"K Os\" and releasing her first singles titled \"Por Siempre\" and \"Bonita\" which have more than 138 million streams. Throughout 2019 she continues with solo releases, thus adding more than 165 million reproductions in different digital media. <a href=\"https://www.last.fm/music/Kenia+os\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Kenia+os','Kenia os'),(95,'Norma Monserrat Bustamante Laferte (born 2 May 1983) better known as Mon Laferte, is a Chilean-Mexican musician, singer, composer, and painter. Her musical style is diverse, spanning different genres such as pop, rock, bolero, cumbia, and salsa, showcasing her versatility and creativity. Throughout the 2010s, she gained widespread recognition for her melodramatic style and \"captivating stage persona\".\n\nWith over 1.5 million digital records sold in Latin America between albums and singles <a href=\"https://www.last.fm/music/Mon+Laferte\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Mon+Laferte','Mon Laferte'),(96,'María Natalia Lafourcade Silva (born 26 February 1984) is a Mexican pop and folk singer-songwriter who since her debut in 2003 has been one of the most successful singers in Latin America. Lafourcade\'s voice has been categorized as a lyric soprano.\n\nLafourcade was born in Mexico City, Mexico, surrounded by music and art. Her father is the Chilean musician Gastón Lafourcade who had French parents and her mother is the pianist María del Carmen Silva Contreras. <a href=\"https://www.last.fm/music/Natalia+Lafourcade\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Natalia+Lafourcade','Natalia Lafourcade'),(97,'\nFrancis Albert Sinatra (December 12, 1915 – May 14, 1998) was an American singer, actor, and producer who was one of the most popular and influential musical artists of the 20th century. He is one of the best-selling music artists of all time, having sold more than 150 million records worldwide. \n\nBorn in Hoboken, New Jersey, to Italian immigrants, Sinatra began his musical career in the swing era with bandleaders Harry James and Tommy Dorsey. Sinatra found success as a solo artist after he signed with Columbia Records in 1943 <a href=\"https://www.last.fm/music/Frank+Sinatra\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Frank+Sinatra','Frank Sinatra'),(98,'Daft Punk was a multi Grammy Award-winning electronic music duo formed in 1993 in Paris, France, and separated in early 2021, consisting of French musicians Thomas Bangalter (born 3 January 1975) and Guy-Manuel de Homem-Christo (born 8 February 1974). The band is considered one of the most successful electronic music collaborations of all time, both in album sales and in critical acclaim. \n\nDaft Punk reached significant popularity in the late 90s house movement in France, along with other artists such as Air, Cassius, and Dimitri From Paris. <a href=\"https://www.last.fm/music/Daft+Punk\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Daft+Punk','Daft Punk'),(99,'U2 are an Irish  alternative rock band from Dublin formed in 1976. The group consists of Bono (lead vocals and rhythm guitar), the Edge (lead guitar, keyboards, and backing vocals), Adam Clayton (bass guitar), and Larry Mullen Jr. (drums and percussion). Initially rooted in post-punk, U2\'s musical style evolved throughout their career, yet has maintained an anthemic sound built on Bono\'s expressive vocals and the Edge\'s effects-based guitar textures. <a href=\"https://www.last.fm/music/U2\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/U2','U2'),(100,'En 1996, los hermanos Luis Humberto y Rafael Navejas, junto a Ángel Sánchez, comienzan un trío rocanrolero llamado “Los Cuatro Fantásticos” en la ciudad de Fresnillo Zacatecas México. Dentro de su música, yacen chispazos de punk, rock, grunge, mezclados con baladas y melodías estilo pop de los sesentas y setentas. En el año de 1998, los hermanos Navejas se mudan a Santa Ana California EEUU, donde deciden continuar con el grupo ahora con el nombre de “Enjambre”. <a href=\"https://www.last.fm/music/Enjambre\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/Enjambre','Enjambre'),(101,'Antón Álvarez Alfaro (born July 16, 1990), known professionally as C. Tangana, is a Spanish rapper and songwriter.He began his musical career while in high school, rapping under the pseudonym Crema and releasing a seven-track EP titled Él Es Crema (2006). He gained recognition in Spain as a member of the band Agorazein. In 2016, Tangana began performing as a solo act under the stage name C. Tangana.\n\nAfter releasing a number of singles in 2016 <a href=\"https://www.last.fm/music/C.+Tangana\">Read more on Last.fm</a>','https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png','https://www.last.fm/music/C.+Tangana','C. Tangana');
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
INSERT INTO `followers` VALUES (1,2),(1,3),(1,5),(3,1),(3,2),(3,5),(3,6),(3,7),(9,3),(7,3),(6,3),(5,3),(8,1),(6,8),(2,8),(5,8),(9,8),(3,8),(7,10),(8,22),(22,23),(7,8),(23,8);
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
INSERT INTO `liked_albums` VALUES (2,13,'2024-11-14'),(8,1,'2024-11-19'),(10,14,'2024-11-22'),(10,8,'2024-11-22'),(22,14,'2024-11-25'),(8,15,'2024-11-27'),(23,5,'2024-12-03'),(8,3,'2024-12-03'),(8,7,'2024-12-05'),(8,14,'2024-12-06'),(23,12,'2024-12-09'),(8,37,'2024-12-09');
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
INSERT INTO `liked_lists` VALUES (23,8,'2024-12-05'),(8,7,'2024-12-05'),(11,4,'2024-12-06'),(11,8,'2024-12-06'),(11,7,'2024-12-06'),(8,8,'2024-12-06'),(8,12,'2024-12-08');
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
INSERT INTO `liked_reviewed_album` VALUES (8,24),(8,4),(8,28),(23,4),(23,28),(23,5),(8,23),(8,5),(23,30),(23,12),(23,47);
/*!40000 ALTER TABLE `liked_reviewed_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_reviewed_list`
--

DROP TABLE IF EXISTS `liked_reviewed_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_reviewed_list` (
  `id_user` bigint NOT NULL,
  `id_reviewed_list` bigint NOT NULL,
  KEY `id_reviewed_list_idxdx` (`id_reviewed_list`),
  KEY `id_user_idxdx` (`id_user`),
  CONSTRAINT `id_reviewed_list_fk` FOREIGN KEY (`id_reviewed_list`) REFERENCES `reviewed_lists` (`id_reviewed_lists`),
  CONSTRAINT `id_user_fkfl` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_reviewed_list`
--

LOCK TABLES `liked_reviewed_list` WRITE;
/*!40000 ALTER TABLE `liked_reviewed_list` DISABLE KEYS */;
INSERT INTO `liked_reviewed_list` VALUES (23,17),(23,16),(23,15),(8,16),(8,17),(8,15),(8,19),(8,6),(8,8);
/*!40000 ALTER TABLE `liked_reviewed_list` ENABLE KEYS */;
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
INSERT INTO `liked_reviews_songs` VALUES (8,12),(8,13),(8,26),(23,16),(23,17),(23,14),(8,22),(8,14),(8,15),(8,37),(8,38),(8,39),(8,16);
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
  `id_song` bigint NOT NULL,
  `date` date NOT NULL,
  KEY `liked_songs_id_songs_fk` (`id_song`),
  KEY `liked_songs_id_user_fk` (`id_user`),
  CONSTRAINT `liked_songs_id_songs_fk` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  CONSTRAINT `liked_songs_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_songs`
--

LOCK TABLES `liked_songs` WRITE;
/*!40000 ALTER TABLE `liked_songs` DISABLE KEYS */;
INSERT INTO `liked_songs` VALUES (5,7,'2024-11-13'),(1,7,'2024-11-13'),(2,7,'2024-11-13'),(3,7,'2024-11-13'),(8,7,'2024-11-14'),(8,14,'2024-11-19'),(10,8,'2024-11-22'),(10,9,'2024-11-22'),(22,8,'2024-11-25'),(8,12,'2024-11-27'),(8,15,'2024-11-27'),(8,33,'2024-11-27'),(8,20,'2024-12-03'),(23,21,'2024-12-03'),(23,8,'2024-12-03'),(23,18,'2024-12-03'),(23,29,'2024-12-03'),(8,21,'2024-12-05'),(23,33,'2024-12-06'),(23,32,'2024-12-06'),(8,16,'2024-12-06'),(8,25,'2024-12-07'),(8,13,'2024-12-08'),(8,8,'2024-12-09'),(8,9,'2024-12-09');
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
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id_list`),
  KEY `list_user_fk_idx` (`id_user`),
  CONSTRAINT `list_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,8,'Mi Primera Lista','Esta es una lista de prueba Numero 1.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fportales.jpg?alt=media&token=c1be0f28-d412-41df-a18e-bc126c8a58b8'),(2,8,'Mi Segunda Lista','Esta es una lista de prueba Numero 2.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fportales.jpg?alt=media&token=c1be0f28-d412-41df-a18e-bc126c8a58b8'),(3,8,'asdasd','asdasdasd','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Faudifonos%20(1).png?alt=media&token=5db0f39a-d88f-48e4-b08a-655e66c2c33e'),(4,8,'Creacion desde Modal','UAUAUAUAUA','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fheart.png?alt=media&token=4c1a8ac2-3277-476b-9103-15bb472639bf'),(5,8,'Para Probar Webp','JEJEJEJEJE','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fteemowebp.webp?alt=media&token=9c707911-d44a-4250-bbe9-f9de1891226a'),(6,8,'asdasd','Jejeje','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fteemowebp.webp?alt=media&token=b85f1990-6f10-4471-941a-4d0a68e2e8ff'),(7,8,'sdfgsdfg','sdfgsdfg','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FCredencial%20Jaziel.webp?alt=media&token=aedefbf9-00a1-487b-86fb-09fdd375f073'),(8,8,'Para Probar Lists Of User','Si programas en angular esta es sin duda tu mejor opción para concentrate. Disfruta de la Musica \nMientras Tiras codigo','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fperro.webp?alt=media&token=59ba614a-218d-4581-8c49-e66623c697b9'),(9,8,'Funciona Por Favor','asdasasfasdfsdfasdfasvsdfvsdfbsdfasdasasfasdfsdfasdfasvsdfvsdfbsdfasdasasfasdfsdfasdfasvsdfvsdfbsdfasdasasfasdfsdfasdfasvsdfvsdfbsdfasdasasfasdfsdfasdfasvsdfvsdfbsdf','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fperro.webp?alt=media&token=f4dce852-1606-4762-a5ed-b4dab0a3bfe3'),(10,23,'Lista Numero 1 Tiempo Real','asdñkluasdklñasndñklsad','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fperro.webp?alt=media&token=ef78c36e-82e9-45f7-8630-8a82966919dc'),(11,23,'Lista Prueba Uaua','Ojala Funcione Jeje','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fperro.webp?alt=media&token=6656e0c6-1e1d-47c9-9621-99c6d75c867b'),(12,23,'Prueba Numero 2','Funciona Por Favor','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fperro.webp?alt=media&token=8b7cbca5-76a0-471a-8d32-465650d7cbd3'),(13,23,'Lista Para Programar','Mi nueva lista para programar el herman proyect','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FWhatsApp%20Image%202024-12-08%20at%2011.34.01%20PM.webp?alt=media&token=31c96726-e78c-4708-a29f-13cd85cde9a3'),(14,23,'Nueva Lista Perrona','JALATE JALATE JALATE','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FWhatsApp%20Image%202024-12-08%20at%2011.34.01%20PM.webp?alt=media&token=c0716a40-37e4-4e8b-9008-ba4bcbd4d8f4'),(15,23,'Nueva Lista','Holaa','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FWhatsApp%20Image%202024-12-08%20at%2011.34.01%20PM.webp?alt=media&token=c9ad9e12-af1c-4d4b-a9e1-24e47be1a0e5'),(16,23,'Musica pa viajar','Hola a todos','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FWhatsApp%20Image%202024-12-08%20at%2011.34.01%20PM.webp?alt=media&token=a7e86802-6306-41d9-8f13-9d1664a6d5b3'),(17,23,'Mejores canciones del 2015','las Mejores canciones del 2015','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FWhatsApp%20Image%202024-12-08%20at%2011.34.01%20PM.webp?alt=media&token=47f9d694-ceff-4f40-a84e-ff936a72abd0'),(18,8,'Mi ultima lista','Mi ultima lista Adios','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FWhatsApp%20Image%202024-12-08%20at%2011.34.01%20PM.webp?alt=media&token=1a6e5153-76fc-4b8d-85c2-06f403789e00');
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
INSERT INTO `listened_albums` VALUES (3,1,'2024-10-01'),(3,7,'2024-10-01'),(3,12,'2024-10-01'),(8,1,'2024-11-19'),(10,14,'2024-11-22'),(10,8,'2024-11-22'),(10,10,'2024-11-22'),(22,14,'2024-11-25'),(22,5,'2024-11-25'),(22,7,'2024-11-25'),(22,8,'2024-11-25'),(22,9,'2024-11-25'),(22,10,'2024-11-25'),(8,5,'2024-11-25'),(8,10,'2024-11-25'),(8,9,'2024-11-25'),(8,15,'2024-11-27'),(8,16,'2024-12-03'),(23,8,'2024-12-03'),(23,14,'2024-12-03'),(23,5,'2024-12-03'),(8,8,'2024-12-05'),(23,10,'2024-12-06'),(23,7,'2024-12-06'),(23,11,'2024-12-06'),(8,14,'2024-12-06'),(23,9,'2024-12-09'),(23,12,'2024-12-09');
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
INSERT INTO `listened_songs` VALUES (7,7,'2024-10-01'),(7,8,'2024-10-01'),(7,9,'2024-10-01'),(1,12,'2024-10-01'),(1,9,'2024-10-01'),(1,8,'2024-10-01'),(1,7,'2024-10-01'),(9,7,'2024-11-13'),(6,7,'2024-11-13'),(5,7,'2024-11-13'),(3,7,'2024-11-13'),(2,7,'2024-11-13'),(10,8,'2024-11-22'),(10,9,'2024-11-22'),(22,8,'2024-11-25'),(8,12,'2024-11-26'),(8,21,'2024-11-29'),(8,9,'2024-12-03'),(8,25,'2024-12-03'),(23,34,'2024-12-06'),(23,33,'2024-12-06'),(23,31,'2024-12-06'),(23,30,'2024-12-06'),(23,24,'2024-12-06'),(23,8,'2024-12-06'),(23,9,'2024-12-06'),(23,16,'2024-12-06'),(8,16,'2024-12-06'),(8,33,'2024-12-07'),(8,8,'2024-12-09');
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
  `photo` varchar(255) DEFAULT NULL,
  KEY `id_user_profile_idx` (`id_user`),
  CONSTRAINT `id_user_profile` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (6,'Soy un Chavito Bien que le gusta programar Pero Tiene Mucho que aprender','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(7,'ඞඞඞඞඞඞ','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(9,'Sin biografía disponible.eee','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(8,'Biografia Perrona','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fteemo2.jpeg?alt=media&token=fac20b12-71ba-4e32-9f36-57f02800307c'),(3,'Holis','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fteemo2.jpeg?alt=media&token=fac20b12-71ba-4e32-9f36-57f02800307c'),(10,'Que tranza chavalosaaaaa','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fteemo2.jpeg?alt=media&token=fac20b12-71ba-4e32-9f36-57f02800307c'),(11,'Dios te escucheeeeee','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2Fteemo2.jpeg?alt=media&token=fac20b12-71ba-4e32-9f36-57f02800307c'),(22,'Prototipo de user Numero 4','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(1,'Sin Biografía disponible.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(2,'Sin Biografía disponible.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(3,'Sin Biografía disponible.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(5,'Sin Biografía disponible.','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4'),(23,'Que Royo que Royooooo','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4');
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
INSERT INTO `ranked_albums` VALUES (2,14,4.5,'2024-10-09'),(7,14,5,'2024-10-01'),(6,14,5,'2024-10-01'),(5,14,5,'2024-10-01'),(3,14,5,'2024-10-01'),(6,15,2,'2024-10-01'),(5,15,2,'2024-10-01'),(3,15,2,'2024-10-01'),(2,15,2,'2024-10-01'),(6,1,2,'2024-10-01'),(5,1,2,'2024-10-01'),(3,1,2,'2024-10-01'),(2,1,2,'2024-10-01'),(7,1,2,'2024-10-01'),(7,2,2,'2024-10-01'),(7,3,2,'2024-10-01'),(7,4,2,'2024-10-01'),(7,5,4.5,'2024-10-01'),(7,7,4.5,'2024-10-01'),(7,8,4.5,'2024-10-01'),(7,9,3.5,'2024-10-01'),(7,10,3.5,'2024-10-01'),(7,11,3.5,'2024-10-01'),(7,12,3.5,'2024-10-01'),(7,13,3.5,'2024-10-01'),(7,15,3.5,'2024-10-01'),(7,16,1.5,'2024-10-01'),(8,9,3,'2024-12-03'),(8,15,3.5,'2024-11-27'),(8,14,2.5,'2024-12-05'),(8,7,2.5,'2024-12-05'),(23,8,3,'2024-12-03'),(23,14,3.5,'2024-12-03'),(23,5,3,'2024-12-03'),(8,8,3.5,'2024-12-08'),(23,10,3.5,'2024-12-09');
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
INSERT INTO `ranked_lists` VALUES (7,4,5,'2024-10-09'),(9,4,3.5,'2024-10-09'),(10,4,2,'2024-10-09'),(11,4,3.5,'2024-10-09'),(8,3,3.5,'2024-11-28'),(8,3,3.5,'2024-11-28'),(8,5,2.5,'2024-12-05'),(23,8,3.5,'2024-12-05'),(8,7,3,'2024-12-05'),(8,6,3.5,'2024-12-06'),(3,8,4.5,'2024-12-07'),(8,4,4.5,'2024-12-07'),(23,4,5,'2024-12-07'),(8,8,2,'2024-12-08');
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
INSERT INTO `ranked_songs` VALUES (1,8,4,'2024-11-17'),(2,8,4,'2024-11-17'),(8,7,1,'2024-11-26'),(8,15,3.5,'2024-11-27'),(8,21,4.5,'2024-12-09'),(8,28,4.5,'2024-12-03'),(8,9,3.5,'2024-12-09'),(8,20,2,'2024-12-03'),(8,25,1.5,'2024-12-03'),(23,21,2.5,'2024-12-03'),(23,25,2.5,'2024-12-03'),(23,18,3,'2024-12-03'),(23,29,4.5,'2024-12-03'),(23,28,4.5,'2024-12-03'),(8,31,0.5,'2024-12-05'),(23,34,4,'2024-12-06'),(23,31,2.5,'2024-12-06'),(23,23,1.5,'2024-12-06'),(3,13,2.5,'2024-12-07'),(23,8,4,'2024-12-07'),(8,8,4,'2024-12-09'),(8,172,3.5,'2024-12-09');
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewed_albums`
--

LOCK TABLES `reviewed_albums` WRITE;
/*!40000 ALTER TABLE `reviewed_albums` DISABLE KEYS */;
INSERT INTO `reviewed_albums` VALUES (1,8,8,'Nice Song Bro','2024-11-13'),(2,2,8,'Nice Song Brooooo','2024-11-14'),(3,9,16,'WOOOOW','2024-11-26'),(4,7,8,'WOOOOW','2024-11-26'),(5,2,8,'WOOOOW Nice Bro','2024-11-26'),(6,1,8,'WOOOOW Nice Bro','2024-11-26'),(7,5,8,'WOOOOW Nice Bro','2024-11-26'),(8,5,7,'WOOOOW Nice Bro','2024-11-26'),(10,10,7,'WOOOOW Nice Bro','2024-11-26'),(11,2,7,'WOOOOW Nice Bro','2024-11-26'),(12,22,10,'Este álbum tiene una gran producción y una variedad impresionante de sonidos.','2024-11-27'),(13,8,15,'Buena Rola','2024-11-27'),(14,8,15,'Buenisimaaaaa','2024-11-27'),(15,8,14,'Muy Buena Canción','2024-12-03'),(16,8,14,'Jejeje','2024-12-03'),(17,8,14,'Prueba','2024-12-03'),(18,8,14,'Buenisima','2024-12-03'),(19,8,14,'Prueba 2','2024-12-03'),(20,8,15,'Pruebaaa','2024-12-03'),(21,8,15,'Uauauaua','2024-12-03'),(22,8,15,'Holaaa','2024-12-03'),(23,8,16,'Holaaa','2024-12-03'),(24,23,8,'Holaa','2024-12-03'),(25,23,14,'Me gusta muchooo','2024-12-03'),(26,8,8,'ooooohhhhh','2024-12-05'),(27,23,8,'Me gusta Gusta','2024-12-05'),(28,23,8,'OOOOOOOHHHHHHHHHH','2024-12-05'),(29,8,14,'FASFASDFASDF','2024-12-06'),(30,23,10,'sdfgsdgsdfg','2024-12-06'),(31,8,8,'JEJEJEEEEEEEEEEE','2024-12-08'),(32,23,8,'De los Mejores Albums','2024-12-08'),(33,23,8,'Jejeje','2024-12-08'),(34,23,9,'Uauaua','2024-12-09'),(35,23,9,'jejeje','2024-12-09'),(36,23,9,'Jijiji','2024-12-09'),(37,23,11,'Buen album','2024-12-09'),(38,23,11,'Me guta','2024-12-09'),(39,23,11,'Jejeje','2024-12-09'),(40,23,11,'Muy Buenooo','2024-12-09'),(41,23,11,'Jijijij','2024-12-09'),(42,23,5,'Muy Buen album 10/10','2024-12-09'),(43,23,5,'Me gusta','2024-12-09'),(44,23,5,'Buen album','2024-12-09'),(45,23,12,'Buen album','2024-12-09'),(46,23,12,'Buenaaa','2024-12-09'),(47,23,10,'Holaa','2024-12-09'),(48,23,8,'Desde luego el mejor album','2024-12-09');
/*!40000 ALTER TABLE `reviewed_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewed_lists`
--

DROP TABLE IF EXISTS `reviewed_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewed_lists` (
  `id_reviewed_lists` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `id_list` bigint NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_reviewed_lists`),
  KEY `reviewed_lists_id_list_fk` (`id_list`),
  KEY `reviewed_lists_id_user_fk` (`id_user`),
  CONSTRAINT `reviewed_lists_id_list_fk` FOREIGN KEY (`id_list`) REFERENCES `list` (`id_list`),
  CONSTRAINT `reviewed_lists_id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewed_lists`
--

LOCK TABLES `reviewed_lists` WRITE;
/*!40000 ALTER TABLE `reviewed_lists` DISABLE KEYS */;
INSERT INTO `reviewed_lists` VALUES (1,23,8,'Buenas Rolitas','2024-12-05'),(2,23,8,'Me gustan Mucho','2024-12-05'),(3,23,8,'Uauaua','2024-12-05'),(4,8,8,'A mi tambieeen Jeje','2024-12-05'),(5,8,8,'asasd','2024-12-05'),(6,8,4,'Buena Lista','2024-12-05'),(7,8,5,'Me gusta Mucho esa rolita','2024-12-05'),(8,8,4,'Jejej','2024-12-05'),(9,8,8,'Le gusta mucho que le lleven serenata','2024-12-05'),(10,8,7,'Le gusta mucho que le lleven serenata','2024-12-05'),(11,8,7,'Hola chavalos','2024-12-05'),(12,8,4,'Holaaa','2024-12-05'),(13,8,3,'Que roio que orio','2024-12-05'),(14,8,4,'Gracias Distinc','2024-12-05'),(15,8,8,'Que ROIO QUE ROIOOO','2024-12-06'),(16,8,8,'UAUAUAUA','2024-12-06'),(17,8,8,'ASDASDAD','2024-12-06'),(18,8,8,'ASDFASDF','2024-12-06'),(19,8,4,'asdfasfasfsfd','2024-12-06'),(20,8,6,'Me gusta Jeje','2024-12-06'),(21,8,6,'fghjfghj','2024-12-06'),(22,23,2,'asdfasdfasdf','2024-12-06');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewed_songs`
--

LOCK TABLES `reviewed_songs` WRITE;
/*!40000 ALTER TABLE `reviewed_songs` DISABLE KEYS */;
INSERT INTO `reviewed_songs` VALUES (12,8,20,'Buena Rola Me gusta Mucho false Alarm','2024-11-29'),(13,8,21,'Buena Rola Me gusta Mucho Reminder','2024-11-29'),(14,8,8,'At first I didn\'t like the song so much but then I started to feel like my butt started to dance by itself, I got scared but I let myself go, DURO.','2024-11-29'),(15,8,12,'Me la Pongo cuando ando Comiendo xD','2024-11-30'),(16,8,8,'Funcionará? :o','2024-12-03'),(17,8,8,'Hola Buelna','2024-12-03'),(18,8,9,'Gran canción','2024-12-03'),(19,8,20,'Buena Rolita','2024-12-03'),(20,8,20,'Me gusta los sabados','2024-12-03'),(21,8,20,'Niceeeee','2024-12-03'),(22,8,25,'Me gusta los domingos escucharla','2024-12-03'),(23,23,21,'asdasdasad','2024-12-03'),(24,23,18,'hdfhdfgdf','2024-12-03'),(25,8,21,'Uauaua','2024-12-05'),(26,8,9,'Buena Rolita Mi Pavo','2024-12-05'),(27,23,34,'asdfasdf','2024-12-06'),(28,23,34,'GHJFGHGFH','2024-12-06'),(29,23,33,'DFGSDFGSDFG','2024-12-06'),(30,23,31,'FGHJFGHJFGH','2024-12-06'),(31,23,30,'FHJFGHJFGHJ','2024-12-06'),(32,23,24,'UAUAUA','2024-12-06'),(33,23,24,'ASDFASFASF','2024-12-06'),(34,8,13,'Uauaua','2024-12-08'),(35,23,8,'Está bien','2024-12-09'),(36,23,8,'Me gusta','2024-12-09'),(37,23,8,'Buena Rola','2024-12-09'),(38,23,8,'La verdad esta canción me parece muy mala','2024-12-09'),(39,23,8,'Buena cancion me gusta','2024-12-09');
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
  `id_artist` bigint NOT NULL,
  `released` date NOT NULL,
  `language` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id_song`),
  KEY `songs_id_artist_fk` (`id_artist`),
  CONSTRAINT `songs_id_artist_fk` FOREIGN KEY (`id_artist`) REFERENCES `artist` (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (7,'Despacito',2,'2017-01-13','Español','Reggaetón','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fdespacito.jpg?alt=media&token=1fe7ae2a-7947-4dd0-be46-4fff282e8da2'),(8,'Shape of You',3,'2017-01-06','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fshapeofyou.jpg?alt=media&token=9c055b0f-d0b7-4fc2-8743-e64d7bd1a7cc'),(9,'Blinding Lights',4,'2019-11-29','Inglés','Synthwave','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fblindinglights.png?alt=media&token=0500c257-fc74-459c-a746-40f0357d4cfa'),(12,'Vivir Mi Vida',3,'2013-04-19','Español','Salsa','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fvivirmivida.jpeg?alt=media&token=3281358e-21df-47d4-bc89-c8f133d3ed4c'),(13,'Échame la Culpa',2,'2017-11-17','Español','Pop Latino','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fechamelaculpa.jpg?alt=media&token=a3bd4e3b-ad7e-4af9-a125-03a661b140a3'),(14,'Aquí Estoy Yo',2,'2008-08-25','Español','Balada','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Faquiestoyyo.jpg?alt=media&token=6224e05a-e655-40d0-bc38-0e9e9de848c9'),(15,'No Me Doy Por Vencido',2,'2008-07-04','Español','Pop Latino','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fnomedoyporvencido.jpeg?alt=media&token=c79e68d3-01d2-4f88-b9ae-d308b793f70a'),(16,'Nada Es Para Siempre',2,'2005-09-26','Español','Balada','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fnadaesparasiempre.jpeg?alt=media&token=0813b07e-b260-4ba2-83a3-70cf4508966b'),(17,'Dive',3,'2017-03-03','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/songs%2Fdive.jpg?alt=media&token=eb1ebb89-f7c8-4bf8-884e-ae324210ca3b'),(18,'Starboy',4,'2016-09-21','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(19,'Party Monster',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(20,'False Alarm',4,'2016-09-29','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(21,'Reminder',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(22,'Rockin',4,'2016-11-25','Inglés','Dance','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(23,'Secrets',4,'2016-11-25','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(24,'True Colors',4,'2016-11-25','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(25,'Stargirl Interlude',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(26,'Sidewalks',4,'2016-11-25','Inglés','Hip-Hop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(27,'Six Feet Under',4,'2016-11-25','Inglés','Trap','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(28,'Love to Lay',4,'2016-11-25','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(29,'A Lonely Night',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(30,'Attention',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(31,'Ordinary Life',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(32,'Nothing Without You',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(33,'All I Know',4,'2016-11-25','Inglés','Trap','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(34,'Die for You',4,'2016-11-25','Inglés','R&B','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(35,'I Feel It Coming',4,'2016-11-25','Inglés','Pop','https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/albums%2Fstarboy.jpg?alt=media&token=b00869cc-a96b-4f70-bc9c-5ef173464b88'),(36,'Donda Chant',84,'2021-11-15','English','spoken word','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(37,'Donda Chant',84,'2021-11-15','English','spoken word','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(38,'Jail',84,'2022-02-25','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(39,'God Breathed',84,'2022-02-19','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(40,'Off the Grid',84,'2022-02-19','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(41,'Hurricane',84,'2021-09-13','English','trap','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(42,'Praise God',84,'2021-09-10','English','trap','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(43,'Jonah',84,'2022-02-19','English','Kanye West','https://lastfm.freetls.fastly.net/i/u/174s/32f2b94ebebb2742709006790b9209b9.png'),(44,'Ultralight Beam',84,'2016-07-13','English','gospel','https://lastfm.freetls.fastly.net/i/u/174s/c6922ef00ed61c2af58f351b56e771e1.png'),(45,'Father Stretch My Hands Pt. 1',84,'2021-05-06','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/8c6af1315c66631bad022085c7992b34.png'),(46,'Pt. 2',84,'2016-07-21','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/c6922ef00ed61c2af58f351b56e771e1.png'),(47,'Famous',84,'2016-04-30','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/549375aec2053050dea494a17498cd44.png'),(48,'Feedback',84,'2021-05-06','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8c6af1315c66631bad022085c7992b34.png'),(49,'Low Lights',84,'2016-07-06','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/8c6af1315c66631bad022085c7992b34.png'),(50,'Highlights',84,'2016-07-06','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/c6922ef00ed61c2af58f351b56e771e1.png'),(51,'Freestyle 4',84,'2017-09-18','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/c6922ef00ed61c2af58f351b56e771e1.png'),(52,'Good Morning',84,'2016-07-06','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(53,'Champion',84,'2021-05-06','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(54,'Stronger',84,'2008-10-24','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(55,'I Wonder',84,'2021-01-22','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(56,'Good Life',84,'2010-11-03','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(57,'Can\'t Tell Me Nothing',84,'2021-05-06','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(58,'Barry Bonds',84,'2021-05-07','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8ddd1959a2bef460a5149b3e0cf5e18a.png'),(59,'Dark Fantasy',84,'2012-11-11','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(60,'Gorgeous',84,'2021-05-06','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(61,'POWER',84,'2010-06-07','English','Hip-Hop',''),(62,'All of the Lights (Interlude)',84,'2021-05-06','English','instrumental','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(63,'All of the Lights',84,'2010-12-14','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(64,'Monster',84,'2010-08-28','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(65,'So Appalled',84,'2021-05-09','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(66,'Devil in a New Dress',84,'2010-09-04','English','hip hop',''),(67,'Runaway',84,'2010-12-14','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(68,'Hell of a Life',84,'2021-05-06','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(69,'Blame Game',84,'2021-05-09','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/8a071c4b073625018de5f0ac58727511.png'),(70,'Wake Up Mr. West',84,'2024-02-13','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/9c0e7886d750a519c9ec63c30434b483.png'),(71,'Heard \'Em Say',84,'2021-05-06','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/9c0e7886d750a519c9ec63c30434b483.png'),(72,'Touch the Sky',84,'2021-05-06','English','Hip-Hop',''),(73,'Gold Digger',84,'2009-12-13','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/9c0e7886d750a519c9ec63c30434b483.png'),(74,'I Thought About Killing You',84,'2018-10-02','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(75,'Yikes',84,'2021-05-07','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(76,'All Mine',84,'2021-05-06','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(77,'Wouldn\'t Leave',84,'2021-05-07','English','pop rap','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(78,'No Mistakes',84,'2021-05-06','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(79,'Ghost Town',84,'2018-06-08','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(80,'Violent Crimes',84,'2021-05-06','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/51e9b77a991331b154d61d5749842fa1.png'),(81,'On Sight',84,'2013-06-25','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(82,'Black Skinhead',84,'2013-07-19','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(83,'I Am a God',84,'2016-05-13','English','croissantcore','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(84,'New Slaves',84,'2021-05-06','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(85,'Hold My Liquor',84,'2021-05-26','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(86,'I\'m in It',84,'2015-02-14','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(87,'Blood on the Leaves',84,'2021-05-26','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(88,'Guilt Trip',84,'2021-06-13','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(89,'Send It Up',84,'2021-05-06','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(90,'Bound 2',84,'2014-02-01','English','uh huh honey','https://lastfm.freetls.fastly.net/i/u/174s/617da94739994953c9dead5f00a6972c.png'),(91,'State of Grace',68,'2021-07-15','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(92,'Red',68,'2014-03-20','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(93,'Treacherous',68,'2021-07-15','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(94,'I Knew You Were Trouble',68,'2013-01-29','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(95,'All Too Well',68,'2013-03-31','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(96,'22',68,'2013-02-03','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(97,'I Almost Do',68,'2024-05-24','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(98,'We Are Never Ever Getting Back Together',68,'2012-08-16','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(99,'Stay Stay Stay',68,'2013-03-31','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(100,'The Last Time',68,'2022-09-05','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(101,'Holy Ground',68,'2022-09-05','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(102,'Sad Beautiful Tragic',68,'2022-09-05','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(103,'The Lucky One',68,'2022-09-05','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(104,'Everything Has Changed',68,'2013-12-12','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(105,'Starlight',68,'2022-09-05','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(106,'Begin Again',68,'2012-10-25','English','country','https://lastfm.freetls.fastly.net/i/u/174s/ad99371a89ed925f63ee3737b4bf9908.png'),(107,'Welcome to New York',68,'2022-03-21','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(108,'Blank Space',68,'2014-12-27','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(109,'Style',68,'2020-08-18','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(110,'Out of the Woods',68,'2014-10-31','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(111,'All You Had to Do Was Stay',68,'2015-04-19','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(112,'Shake It Off',68,'2014-08-19','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(113,'I Wish You Would',68,'2022-08-21','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(114,'Bad Blood',68,'2015-07-21','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(115,'Wildest Dreams',68,'2016-07-03','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(116,'How You Get the Girl',68,'2021-08-23','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(117,'This Love',68,'2021-01-27','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(118,'I Know Places',68,'2022-04-13','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(119,'Clean',68,'2021-06-11','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/b71ba6cf5881d8cf143e0ad0b4f28d9f.png'),(120,'I Forgot That You Existed',68,'2022-01-07','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/41e946737b157ea0e88b7c0551acc604.png'),(121,'Cruel Summer',68,'2019-11-19','English','electropop','https://lastfm.freetls.fastly.net/i/u/174s/d3f083370c371a3ba1cddafaf193c27d.png'),(122,'Lover',68,'2019-08-16','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/8ff069cf7424e275fcfef0608d2c9812.png'),(123,'The Man',68,'2020-02-01','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/41e946737b157ea0e88b7c0551acc604.png'),(124,'willow',68,'2020-12-10','English','folk','https://lastfm.freetls.fastly.net/i/u/174s/544bb59a95ef31ca87e03576a9bfe1eb.png'),(125,'champagne problems',68,'2021-03-03','English','Ballad','https://lastfm.freetls.fastly.net/i/u/174s/3fc71aa25ab1242571c841c75f764d10.png'),(126,'gold rush',68,'2020-12-19','English','chamber pop','https://lastfm.freetls.fastly.net/i/u/174s/2b1ed6bdaba7aa57d94c1bdfb805e972.png'),(127,'\'tis the damn season',68,'2022-11-02','English','folk','https://lastfm.freetls.fastly.net/i/u/174s/3fc71aa25ab1242571c841c75f764d10.png'),(128,'tolerate it',68,'2021-01-27','English','Ballad','https://lastfm.freetls.fastly.net/i/u/174s/3fc71aa25ab1242571c841c75f764d10.png'),(129,'Tim McGraw',68,'2009-06-30','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d60d9367bceb0ee1eb97a11033fa37ed.png'),(130,'Picture to Burn',68,'2009-06-30','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d60d9367bceb0ee1eb97a11033fa37ed.png'),(131,'Fearless',68,'2009-05-21','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(132,'Fifteen',68,'2009-11-23','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(133,'Love Story',68,'2009-02-24','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(134,'Hey Stephen',68,'2009-06-29','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(135,'White Horse',68,'2009-04-09','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(136,'You Belong with Me',68,'2009-07-13','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(137,'Breathe (feat. Colbie Caillat)',68,'2008-11-16','English','country','https://lastfm.freetls.fastly.net/i/u/174s/a7742916ba7f05db0caf8f715757ded5.png'),(138,'Tell Me Why',68,'2024-11-23','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(139,'You\'re Not Sorry',68,'2010-03-10','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(140,'The Way I Loved You',68,'2009-11-23','English','country','https://lastfm.freetls.fastly.net/i/u/174s/d8888f990ce044e4c856550a7041c83e.png'),(141,'Lavender Haze',68,'2022-10-21','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/8914bab2a0e4e454c6892f151d57208f.png'),(142,'Maroon',68,'2022-10-24','English','jackson mahomes','https://lastfm.freetls.fastly.net/i/u/174s/8914bab2a0e4e454c6892f151d57208f.png'),(143,'Anti-Hero',68,'2022-10-21','English','pop','https://lastfm.freetls.fastly.net/i/u/174s/cbfa0b1b932a94bb930302e3b2d18b75.png'),(144,'For Free? (interlude)',69,'2015-03-19','English','jazz rap','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(145,'King Kunta',69,'2015-03-19','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(146,'Institutionalized',69,'2022-10-19','English','jazz rap','https://lastfm.freetls.fastly.net/i/u/174s/abc746090c949caec74255cce4427883.png'),(147,'These Walls',69,'2016-05-15','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/089fadff1430cb01ce85bad4a785bb0d.png'),(148,'u',69,'2015-03-19','English','jazz rap','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(149,'Alright',69,'2015-03-19','English','Conscious Hip Hop','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(150,'For Sale? - Interlude',69,'2023-11-24','English','kendrick lamar','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(151,'Momma',69,'2015-03-19','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(152,'Hood Politics',69,'2015-03-19','English','boo boo','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(153,'Complexion (A Zulu Love)',69,'2015-03-19','English','Conscious Hip Hop','https://lastfm.freetls.fastly.net/i/u/174s/c19c397f52fb8baa0f29414a11701868.png'),(154,'The Blacker the Berry',69,'2015-12-12','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(155,'You Ain\'t Gotta Lie (Momma Said)',69,'2022-03-15','English','Conscious Hip Hop','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(156,'i',69,'2015-04-29','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(157,'Mortal Man',69,'2015-07-18','English','jazz rap','https://lastfm.freetls.fastly.net/i/u/174s/86b35c4eb3c479da49c915d8771bbd1a.png'),(158,'HUMBLE.',69,'2017-03-31','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/8a59ed3a9c71cb5113325e2026889e4a.png'),(159,'HUMBLE.',69,'2017-03-31','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/8a59ed3a9c71cb5113325e2026889e4a.png'),(160,'wacced out murals',69,'2024-11-28','English','trap','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(161,'squabble up',69,'2024-11-27','English','hyphy','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(162,'luther',69,'2024-11-24','English','sza','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(163,'man at the garden',69,'2024-11-27','English','cloud rap','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(164,'hey now',69,'2024-11-30','English','kendrick lamar','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(165,'tv off',69,'2024-11-24','English','mustard','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(166,'dodger blue',69,'2024-12-01','English','kendrick lamar','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(167,'peekaboo',69,'2024-11-22','English','kendrick lamar','https://lastfm.freetls.fastly.net/i/u/174s/a79564a9768d05272682b252deb02079.png'),(168,'Backseat Freestyle',69,'2013-06-28','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(169,'The Art of Peer Pressure',69,'2022-01-18','English','hip hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(170,'Money Trees',69,'2012-12-26','English','MySpotigramBot','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(171,'Poetic Justice',69,'2013-03-10','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(172,'good kid',69,'2022-01-18','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(173,'m.A.A.d city',69,'2013-07-30','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(174,'Swimming Pools (Drank) (extended version)',69,'2022-09-09','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(175,'Sing About Me, I\'m Dying of Thirst',69,'2013-11-20','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(176,'Real',69,'2022-02-18','English','Hip-Hop','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png'),(177,'Compton',69,'2022-02-18','English','rap','https://lastfm.freetls.fastly.net/i/u/174s/48628c6af67db437b0b9ff156b2c1085.png');
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
INSERT INTO `songs_on_album` VALUES (8,18),(8,19),(8,20),(8,21),(8,22),(8,23),(8,24),(8,25),(8,26),(8,27),(8,28),(8,29),(8,30),(8,31),(8,32),(8,33),(8,34),(8,35),(36,37),(36,38),(36,39),(36,40),(36,41),(36,42),(36,43),(35,44),(35,45),(35,46),(35,47),(35,48),(35,49),(35,50),(35,51),(37,52),(37,53),(37,54),(37,55),(37,56),(37,57),(37,58),(38,59),(38,60),(38,61),(38,62),(38,63),(38,64),(38,65),(38,66),(38,67),(38,68),(38,69),(39,70),(39,71),(39,72),(39,73),(40,74),(40,75),(40,76),(40,77),(40,78),(40,79),(40,80),(41,81),(41,82),(41,83),(41,84),(41,85),(41,86),(41,87),(41,88),(41,89),(41,90),(17,91),(17,92),(17,93),(17,94),(17,95),(17,96),(17,97),(17,98),(17,99),(17,100),(17,101),(17,102),(17,103),(17,104),(17,105),(17,106),(18,107),(18,108),(18,109),(18,110),(18,111),(18,112),(18,113),(18,114),(18,115),(18,116),(18,117),(18,118),(18,119),(19,120),(19,121),(19,122),(19,123),(20,124),(20,125),(20,126),(20,127),(20,128),(21,129),(21,130),(22,131),(22,132),(22,133),(22,134),(22,135),(22,136),(22,137),(22,138),(22,139),(22,140),(23,141),(23,142),(23,143),(26,144),(26,145),(26,146),(26,147),(26,148),(26,149),(26,150),(26,151),(26,152),(26,153),(26,154),(26,155),(26,156),(26,157),(25,158),(25,159),(27,160),(27,161),(27,162),(27,163),(27,164),(27,165),(27,166),(27,167),(28,168),(28,169),(28,170),(28,171),(28,172),(28,173),(28,174),(28,175),(28,176),(28,177);
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
  `date` date NOT NULL,
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
INSERT INTO `songs_on_list` VALUES (4,8,'2024-11-26'),(4,9,'2024-11-26'),(1,8,'2024-11-26'),(2,8,'2024-11-26'),(5,8,'2024-11-26'),(6,8,'2024-11-26'),(3,12,'2024-11-27'),(6,15,'2024-11-27'),(4,33,'2024-11-28'),(6,20,'2024-12-03'),(4,20,'2024-12-03'),(1,20,'2024-12-03'),(5,20,'2024-12-03'),(3,20,'2024-12-03'),(1,25,'2024-12-03'),(6,25,'2024-12-03'),(12,18,'2024-12-03'),(4,35,'2024-12-05'),(12,8,'2024-12-07'),(8,8,'2024-12-07'),(4,30,'2024-12-08'),(10,8,'2024-12-09'),(16,8,'2024-12-09'),(14,8,'2024-12-09'),(9,8,'2024-12-09'),(18,8,'2024-12-09');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jexbii','jazielheredia123@gmail.com','$2b$12$.MFviGsynF1yix8KWksHUuRuMxkZn/DcrMBigy2vw5RT04.k2qb7.','user'),(2,'Elderdius','elderdius123@gmail.com','$2b$12$.MFviGsynF1yix8KWksHUuRuMxkZn/DcrMBigy2vw5RT04.k2qb7.','admin'),(3,'Aniquilador','aniquilador123@gmail.com','$2b$12$zTCqe/5ayNGuoNYkipR8ze4UWso805GUACTE3czxVi0MIsm1jB4Da','user'),(5,'Aniquiladorsin','aniquilador1234@gmail.com','$2b$12$UiDgFwhxkFMIKq/gS7YnjebxPN3O0LGUCxq.KTOQ806MQ.ZSEd1Jy','user'),(6,'Aniquiladorsito','aniquilador12345@gmail.com','$2b$12$eGgbfdgmO7XszS5Aii1Lheb4o95B.EXtPpUfQQJys9zTTPjASI5Y2','user'),(7,'LecheDePiedra','jazielheredia12345@gmail.com','$2b$12$qZS/.XO5KAPAvheiL8gMqeQdYqOTAxpxOVpa/M6SZOVMWz7zfiyFC','admin'),(8,'testUser','test@gmail.com','$2b$12$TZyPx9jHAllKlr67nbu3XOrU/9uKWyw0aHtfWKgUCDgOn4sOMHtqG','user'),(9,'PepitoGrilloo','pepito123@gmail.com','$2b$12$XoPgbl3EpIuuHKILJUzBn.4tRUa6d6gnPLetfHYLM3hmu97ungqKW','user'),(10,'testUser2','testUser2@gmail.com','$2b$12$rJpJCFAF6f2Uc5/np5y9RO2a6MvryODwO1MU9AhbS2iNS4k505yma','user'),(11,'testUser3','testUser3@gmail.com','$2b$12$wwOHf./YfcMH2UFuBbDex.cz3Tpt5pJFVA1LX2xZZ16OPqSfbbZeS','user'),(22,'testuser4','testuser123123@gmail.com','$2b$12$mfntUOsLLS7BmNoJnc4MAuPknuz3cpaAztx6/.ulez23fl/7lhEU6','user'),(23,'steve','steve123@gmail.com','$2b$12$wk5041M3ljdfXPSIUxash.NecS9pVaDH/rcwXkLTi/9DpQrlfcTA6','user');
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
INSERT INTO `watchlist_albums` VALUES (8,13,'2024-11-19'),(8,5,'2024-11-19'),(8,15,'2024-11-19'),(8,16,'2024-11-19'),(1,5,'2024-11-19'),(1,14,'2024-11-19'),(1,15,'2024-11-19'),(10,14,'2024-11-22'),(8,14,'2024-12-03'),(23,5,'2024-12-03'),(8,8,'2024-12-03'),(8,7,'2024-12-05');
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
INSERT INTO `watchlist_songs` VALUES (1,8,'2024-09-27'),(5,12,'2024-10-01'),(5,13,'2024-10-01'),(5,14,'2024-10-01'),(2,16,'2024-10-01'),(2,7,'2024-10-01'),(2,8,'2024-10-01'),(8,13,'2024-11-15'),(8,14,'2024-11-15'),(10,8,'2024-11-22'),(8,33,'2024-11-27'),(23,33,'2024-12-06'),(23,32,'2024-12-06'),(23,8,'2024-12-06'),(8,8,'2024-12-09');
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

-- Dump completed on 2024-12-09 16:05:06
