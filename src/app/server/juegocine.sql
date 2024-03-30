-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: juegocine
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `canciones`
--

DROP TABLE IF EXISTS `canciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `canciones` (
  `id` int(11) NOT NULL,
  `musica` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `compositor` varchar(50) NOT NULL,
  `mclave` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canciones`
--

LOCK TABLES `canciones` WRITE;
/*!40000 ALTER TABLE `canciones` DISABLE KEYS */;
INSERT INTO `canciones` VALUES (1,'AlwaysACatchBatman2.mp3','Always A Catch Batman','Hans zimmer','0:20'),(2,'AVirusMatrix.mp3','A Virus','Don Davis','0:30'),(3,'BeautifulLieBatmanSuperman.mp3','Beautiful Lie','Hans Zimmer y Junkie XL','2:20'),(4,'E.T..mp3','Flying Theme','John Williams','0:13'),(5,'ElTangodeRoxanneMoulin.mp3','El Tango de Roxanne','Sting','0:30'),(6,'EntryOfNoblesCid.mp3','Entry Of Nobles','Miklós Rózsa','0:13'),(8,'FuneralMarchofQueenMaryMecanica.mp3','Funeral March of Queen Mary','Henry Purcell','0:00'),(9,'IceDanceEduardo.mp3','Ice Dance','Danny Elfman','0:40'),(10,'LongTimeTimeAgoFauno.mp3','Long, Long Time Ago','Javier Navarrete','0:00'),(11,'MainTitleAddams.mp3','Main Title','Vic Mizzy','0:23'),(12,'MainTitlesAttacks.mp3','Main Titles','Danny Elfman','0:30'),(13,'MainTitlesspiderman.mp3','Main Titles','Danny Elfman','0:00'),(15,'MolossusBatman.mp3','Molossus','Hans zimmer','0:00'),(16,'MumiaAttackMomia.mp3','Mumia Attack','Jerry Goldsmith','0:10 y 1:15'),(17,'MyFriendsSweeney.mp3','My Friends','Stephen Sondheim','0:15'),(18,'NoahVistsBosque.mp3','Noah Visits','James Newton Howard','1:30'),(19,'NoEscapeSimios.mp3','No Escape','Jerry Goldsmith','2:20'),(20,'PortalsEngame.mp3','Portals','Alan Silvestri','1:35'),(21,'SafeReturnBallena.mp3','Safe Return','Rob Simonsen','1:35'),(22,'SandrasThemeBig.mp3','Sandra\'s Theme','Danny Elfman','0:30'),(23,'TheBeastisontheMoveMultiple.mp3','The Beast is on the Move','Dylan Thordson','1:00'),(24,'TheGreatJediPurgeStarWars3.mp3','The Great Jedi Purge','John Williams','0:00'),(25,'TheMagnificentSeven.mp3','The Magnificent Seven',' Elmer Bernstein','0:10'),(26,'Themechucky1.mp3','Theme','Joe Renzetti','0:10'),(27,'ThemeFuturo.mp3','Theme','Alan Silvestri','0:30 y 0:50'),(28,'TheQuidditchWorldCupHarry4.mp3','The Quidditch World Cup','Patrick Doyle','0:45'),(29,'TheTamingofSmeagolAnillos2.mp3','The Taming of Smeagol','Howard Shore','0:00 y 1:45'),(30,'VitoAndAbbandandoPadrino2.mp3','Vito And Abbandando','Nino Rota','0:45'),(31,'WhatsThisPesadillas.mp3','What is','Danny Elfman','0:45'),(32,'Stampede.mp3','Stampede','James Horner','0:35'),(33,'Mrs.Doubtfire.mp3','Mrs. Doubtfire','Howard Shore','0:00'),(34,'TheMachineAge.mp3','The Machine Age','James Horner','1:00'),(35,'TheGremlinRag.mp3','The Gremlin Rag','Jerry Goldsmith','0:00'),(36,'YouArethePan.mp3','You Are the Pan','John Williams','0:20'),(38,'TheBlackRidercomunidad.mp3','The Black Rider','Howard Shore','1:30'),(40,'mainTitleschucky2.mp3','main Titles','Graeme Revell','0:00'),(41,'MainTitleschucky3.mp3','Main Titles','Cory Lerios y John D\'Andrea ','0:20'),(42,'MyFatherfuturo2.mp3','My father','Alan Silvestri','0:40'),(43,'PointOfNoReturnfuturo3.mp3','Point Of No Return','Alan Silvestri','3:10'),(44,'LoveThemepadrino.mp3','Love Theme','Nino Rota','0:00'),(45,'MinasMorgulretorno.mp3','Minas Morgul','Howard Shore','0:00'),(46,'MoaningMyrtlepotter2.mp3','Moaning Myrtle','John Williams','1:35'),(47,'LeavingHogwartspotter1.mp3','Leaving Hogwarts','John Williams','0:20'),(48,'BuckbeaksFlightpotter3.mp3','Buckbeaks Flight','John Williams','1:05'),(49,'ProfessorUmbridgepotter5.mp3','Professor Umbridge','Nicholas Hopper','0:20'),(50,'DumbledoresFarewellpotter6.mp3','Dumbledores Farewell','Nicholas Hooper','0:20'),(51,'MinistryofMagicpotter7.mp3','Ministry of Magic','Nicholas Hopper','0:15'),(52,'Statuespotter72.mp3','Statues','Alexandre Desplat','0:20'),(53,'Hellozeppsaw1.mp3','Hello, zepp','Charlie Clouser','0:00'),(54,'WakeUpsaw2.mp3','Wake Up','Charlie Couser','0:20'),(56,'MainTitlesMal.mp3','Main Titles','Charlie Couser','0:00'),(57,'DueloftheFates.mp3','Duel of the Fates','John Williams','0:10'),(58,'AcrossTheStarsLove.mp3','Across The Stars Love','John Williams','0:30'),(59,'Annabelleopening.mp3','Annabelle opening','Joseph Bishara','1:44'),(60,'ThemefromCarrie.mp3','Theme From Carrie','Pino Donaggio','0:00'),(61,'TubularBells.mp3','Tubular Bells','Mike Oldfield','0:00'),(62,'theInsidiousplane.mp3','the Insidious plane','Joseph Bishara','1:15'),(63,'HalloweenTheme.mp3','Halloween:Theme','John Carpenter','0:00'),(64,'Every27Year.mp3','Every 27 Year','Benjamin Wallfisch','0:35'),(66,'Alice\'sTheme.mp3','Alice\'s Theme','Danny Elfman','0:20'),(67,'BekAndZaya.mp3','Bek And Zaya','Marco Beltrami','0:25'),(69,'Medusa.mp3','Medusa','María Garzón Hernández','2:00'),(70,'Lahistoriainterminable.mp3','Never Ending','Limahl','0:00'),(71,'StoryoftheGiants.mp3','Story of the Giants','John Ottman','0:45'),(72,'TheMagisterium.mp3','The Magisterium','Alexandre Desplat','1:00'),(73,'OnceUponATimeStorybookLove.mp3','Once Upon A Time Story book Love','Mark Knopfler','1:00'),(74,'OzRevealed.mp3','Oz Revealed','Danny Elfman','0:30'),(75,'theyveeatenthebaby.mp3','They’ve Eaten the Baby!','Patrick Doyle','0:00'),(76,'Willow\'sTheme.mp3','Willow\'s Theme','James Horner','0:00'),(80,'TerabithiaMainTitle.mp3','Main Title','Aaron Zigman','0:10'),(81,'AugustusGloop.mp3','Augustus Gloop','Danny Elfman','0:00'),(82,'WritingtheChronicles.mp3','Writing the Chronicles','James Horner','1:50'),(83,'JasonGoesAfterFreddy.mp3','Jason Goes After Freddy','Graeme Revell','0:00'),(84,'TheChildrensTheme.mp3','The Children\'s Theme','Dave Davies y John Carpenter','0:30'),(85,'TheConjuring.mp3','The Conjuring','Joseph bishara','0:00'),(86,'SignoftheHitchHiker.mp3','Sign of the Hitch Hiker','Desconocido','1:18'),(87,'TeaForThreePlusOne.mp3','Tea For Three Plus One','Marco Beltrami','0:20'),(88,'Tentacles.mp3','Tentacles','Mark Isham','1:00'),(89,'AveSataniOmen.mp3','Ave Satani','Jerry Goldsmith','0:00'),(90,'Maiz.mp3','Children of the Corn','Jonathan Elias','0:00'),(91,'Ring4Days.mp3','4 Days','Hans Zimmer','0:40'),(92,'Viernes13EndTheme.mp3','EndTheme','Harry Manfredini','0:40'),(93,'Saw3Surprised.mp3','Surprised','Charlie Couser','0:30'),(94,'PesadillaDreamAttack.mp3','Dream Attack','Charles Bernstein','0:00'),(95,'ShuttingdownGraceslab.mp3','Shutting down Grace\'s lab','James Horner','1:10'),(96,'TheLostWorld.mp3','The Lost World','John Williams','0:35'),(97,'ThemeFromJurassicPark.mp3','Theme From Jurassic Park','John Williams','0:00'),(98,'thesonofflynn.mp3','the son of flynn','Daft Punk','0:10'),(99,'WeveGotCompany.mp3','We\'ve Got Company','Wendy Carlos','0:50'),(100,'TheDigSite.mp3','The Dig Site','Don Davis','0:45'),(101,'MainTitles.mp3','Main Titles','John Debney','0:20'),(102,'TheOasis.mp3','The Oasis','Alan Silvestri','0:00'),(103,'Chicago2035.mp3','Chicago 2035','Marco Beltrami','1:10');
/*!40000 ALTER TABLE `canciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `correos`
--

DROP TABLE IF EXISTS `correos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `correos` (
  `correo` varchar(40) NOT NULL,
  `NombreUsuario` varchar(20) NOT NULL,
  PRIMARY KEY (`correo`),
  KEY `NombreUsuario` (`NombreUsuario`),
  CONSTRAINT `correos_ibfk_1` FOREIGN KEY (`NombreUsuario`) REFERENCES `usuarios` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `correos`
--

LOCK TABLES `correos` WRITE;
/*!40000 ALTER TABLE `correos` DISABLE KEYS */;
INSERT INTO `correos` VALUES ('carlos23@gmail.com','carlos'),('juanmaEV@gmail.com','juanmaEV'),('manolo@gmail.com','manolo'),('prueba@gmail.com','prueba'),('prueba2@gmail.com','prueba2'),('rocio@gmail.com','rocio'),('ruben@gmail.com','ruben');
/*!40000 ALTER TABLE `correos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dosjugadores`
--

DROP TABLE IF EXISTS `dosjugadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dosjugadores` (
  `NombreUsuario1` varchar(20) NOT NULL,
  `NombreUsuario2` varchar(20) NOT NULL,
  PRIMARY KEY (`NombreUsuario1`,`NombreUsuario2`),
  KEY `fk_dosjugadores_usuario2` (`NombreUsuario2`),
  CONSTRAINT `dosjugadores_ibfk_1` FOREIGN KEY (`NombreUsuario1`) REFERENCES `usuarios` (`Nombre`),
  CONSTRAINT `fk_dosjugadores_usuario1` FOREIGN KEY (`NombreUsuario1`) REFERENCES `usuarios` (`Nombre`),
  CONSTRAINT `fk_dosjugadores_usuario2` FOREIGN KEY (`NombreUsuario2`) REFERENCES `usuarios` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dosjugadores`
--

LOCK TABLES `dosjugadores` WRITE;
/*!40000 ALTER TABLE `dosjugadores` DISABLE KEYS */;
INSERT INTO `dosjugadores` VALUES ('carlos','manolo'),('juanmaEV','manolo'),('manolo','carlos'),('manolo','rocio'),('manolo','ruben'),('prueba','prueba2'),('prueba','ruben'),('rocio','carlos'),('ruben','carlos'),('ruben','juanmaEV'),('ruben','manolo'),('ruben','prueba');
/*!40000 ALTER TABLE `dosjugadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encuesta` (
  `CodigoEncuesta` int(40) NOT NULL,
  `R1` varchar(20) NOT NULL,
  `R2` varchar(20) NOT NULL,
  `R3` varchar(20) NOT NULL,
  `R4` varchar(90) NOT NULL,
  `NombreUsuario` varchar(20) NOT NULL,
  PRIMARY KEY (`CodigoEncuesta`),
  KEY `fk_encuesta_usuario` (`NombreUsuario`),
  CONSTRAINT `fk_encuesta_usuario` FOREIGN KEY (`NombreUsuario`) REFERENCES `usuarios` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuesta`
--

LOCK TABLES `encuesta` WRITE;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` VALUES (1,'si','juegoImagen','3','mas generos','prueba'),(2,'si','juegoMusica','5','Arregla lo de las pistas','ruben'),(3,'no','juegoPregunta','1','Hay muchas paginas del tipo. Añadid algo nuevo.','manolo');
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `genero` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Acción'),(2,'Terror'),(3,'Ciencia Ficcion'),(4,'Infantil'),(5,'Comedia'),(6,'Musical'),(7,'Drama'),(8,'Misterio'),(9,'Hechos Reales'),(10,'Fantasia'),(11,'western');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generospeliculas`
--

DROP TABLE IF EXISTS `generospeliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generospeliculas` (
  `idgenero` int(11) NOT NULL,
  `NombrePelicula` varchar(50) NOT NULL,
  PRIMARY KEY (`idgenero`,`NombrePelicula`),
  KEY `fk_pelicula` (`NombrePelicula`),
  CONSTRAINT `fk_genero` FOREIGN KEY (`idgenero`) REFERENCES `generos` (`id`),
  CONSTRAINT `fk_pelicula` FOREIGN KEY (`NombrePelicula`) REFERENCES `peliculas` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generospeliculas`
--

LOCK TABLES `generospeliculas` WRITE;
/*!40000 ALTER TABLE `generospeliculas` DISABLE KEYS */;
INSERT INTO `generospeliculas` VALUES (1,'El padrino'),(1,'El padrino 2'),(1,'La momia'),(2,'Anabelle'),(2,'Carrie'),(2,'El exorcista'),(2,'El pueblo de los malditos'),(2,'Expediente warren: The conjuring'),(2,'Freddy vs Jason'),(2,'Gremlins'),(2,'Halloween'),(2,'Insidious'),(2,'It'),(2,'La matanza de texas'),(2,'La mujer de negro'),(2,'La niebla'),(2,'La profecia'),(2,'La señal'),(2,'Los chicos del maiz'),(2,'Muñeco diabólico'),(2,'Muñeco diabólico 2'),(2,'Muñeco diabólico 3'),(2,'Pesadillas en elm street'),(2,'Saw'),(2,'Saw 2'),(2,'Saw 3'),(2,'Silencio desde el mal'),(2,'Viernes 13'),(3,'Avatar'),(3,'Batman Begins'),(3,'Batman vs Superman: El amanecer de la justicia'),(3,'E.T., el extraterrestre'),(3,'El caballero oscuro'),(3,'El mundo perdido: Jurassic Park'),(3,'El planeta de los simios'),(3,'Jumanji'),(3,'Jurassic Park'),(3,'Jurassic Park 3'),(3,'Mars Attacks!'),(3,'Matrix'),(3,'Ready Player One'),(3,'Regreso al futuro'),(3,'Regreso al futuro 2'),(3,'Regreso al futuro 3'),(3,'Spider-Man'),(3,'Star Wars: Episodio I - La amenaza fantasma'),(3,'Star Wars: Episodio II - El ataque de los clones'),(3,'Star Wars: Episodio III - La venganza de los Sith'),(3,'Tron'),(3,'Tron: Legacy'),(3,'Vengadores: EndGame'),(3,'Yo, Robot'),(3,'Zathura'),(5,'La familia addams'),(5,'Mrs. Doubtfire'),(6,'Moulin Rouge!'),(6,'Pesadillas Antes de Navidad'),(6,'Sweeney Todd'),(7,'Big Fish'),(7,'Eduardo Manostijeras'),(7,'El hombre bicentenario'),(7,'El laberinto del fauno'),(7,'La ballena'),(8,'El bosque'),(8,'Múltiple'),(9,'El cid'),(10,'Alicia en el pais de las maravillas'),(10,'Charlie y la fabrica de chocolate'),(10,'Dioses de egipto'),(10,'El señor de los anillos: El retorno del rey'),(10,'El señor de los anillos: La comunidad del anillo'),(10,'El señor de los Anillos: Las dos torres'),(10,'Furia de titanes'),(10,'Harry Potter y el cáliz de fuego'),(10,'Harry Potter y el misterio del príncipe'),(10,'Harry Potter y el prisionero de Azkaban'),(10,'Harry Potter y la cámara secreta'),(10,'Harry Potter y la orden del fenix'),(10,'Harry Potter y la piedra filosofal'),(10,'Harry Potter y las reliquias de la muerte: Parte 1'),(10,'Harry Potter y las reliquias de la muerte: Parte 2'),(10,'Hook'),(10,'Jack, el cazagigantes'),(10,'La brújula dorada'),(10,'La historia interminable'),(10,'La ñiñera magica'),(10,'La princesa prometida'),(10,'Las cronicas de Spiderwick'),(10,'Oz, un mundo de fantasia'),(10,'Un puente hacia terabithia'),(10,'Willow'),(11,'Los siete magníficos');
/*!40000 ALTER TABLE `generospeliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `imagen` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'7magnificos.PNG'),(2,'anillos.PNG'),(3,'ballena.PNG'),(4,'batmansuperman.PNG'),(5,'big fish.PNG'),(6,'chucky.PNG'),(7,'cid.PNG'),(8,'Eduardo.PNG'),(9,'elbosque.PNG'),(10,'endgame.PNG'),(11,'HarryPotter4.PNG'),(13,'mecanica.PNG'),(14,'multiple.PNG'),(15,'padrino2.PNG'),(16,'pesadillas.PNG'),(17,'rouge.PNG'),(18,'spiderman.PNG'),(19,'starwars3.PNG'),(20,'todd.PNG'),(21,'simios68.PNG'),(22,'addams.PNG'),(23,'regresofuturo.PNG'),(24,'fauno.PNG'),(25,'momia.PNG'),(26,'attack.PNG'),(27,'shrek.PNG'),(28,'matrix.PNG'),(29,'ET.PNG'),(30,'begins.PNG'),(31,'oscuro.PNG'),(32,'bicentenario.PNG'),(33,'doubtfire.PNG'),(34,'gremlins.PNG'),(35,'hook.PNG'),(36,'jumanji.PNG'),(38,'comunidad.PNG'),(40,'diabolico2.PNG'),(41,'diabolico3.PNG'),(42,'futuro2.PNG'),(43,'futuro3.PNG'),(44,'padrino.PNG'),(45,'retorno.PNG'),(46,'harrypotter1.PNG'),(47,'harrypotter2.PNG'),(48,'harrypotter3.PNG'),(49,'harrypotter5.PNG'),(50,'harrypotter6.PNG'),(51,'harrypotter7.PNG'),(52,'harrypotter72.PNG'),(53,'saw1.PNG'),(54,'saw2.PNG'),(56,'mal.PNG'),(57,'starwars1.PNG'),(58,'starwars2.PNG'),(59,'alicia.PNG'),(63,'interminable.PNG'),(64,'magica.PNG'),(67,'Oz.PNG'),(68,'prometida.PNG'),(69,'Willow.PNG'),(70,'ring.PNG'),(71,'freddyjason.PNG'),(72,'insidious.PNG'),(73,'pesadilla1.PNG'),(75,'texas1.PNG'),(76,'viernes13.PNG'),(77,'brujula.PNG'),(78,'diosesegipto.PNG'),(80,'furia.PNG'),(81,'jackgigante.PNG'),(83,'anabelle.PNG'),(84,'chicosmaiz.PNG'),(86,'mujernegro.PNG'),(87,'niebla.PNG'),(91,'saw3.PNG'),(92,'warren1.PNG'),(93,'carrie.PNG'),(94,'exorcista.PNG'),(95,'halloween.PNG'),(96,'it.PNG'),(98,'profecia.PNG'),(99,'pueblomaldito.PNG'),(100,'terabithia.PNG'),(101,'spiderwick.PNG'),(102,'chocolate.PNG'),(103,'Avatar.PNG'),(104,'JurassicPark.PNG'),(105,'JurassicPark2.PNG'),(106,'JurassicPark3.PNG'),(107,'ReadyPlayerOne.PNG'),(108,'TronLegacy.PNG'),(109,'Tron.PNG'),(110,'Zathura.PNG'),(111,'YoRobot.PNG');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `numjugadas`
--

DROP TABLE IF EXISTS `numjugadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `numjugadas` (
  `Codigojugadas` int(40) NOT NULL,
  `JugadasImagenFantasia` int(40) NOT NULL,
  `JugadasImagenTerror` int(40) NOT NULL,
  `JugadasImagenFiccion` int(40) NOT NULL,
  `JugadasPreguntasFantasia` int(40) NOT NULL,
  `JugadasPreguntasTerror` int(40) NOT NULL,
  `JugadasPreguntasFiccion` int(40) NOT NULL,
  `JugadasMusicaFantasia` int(40) NOT NULL,
  `JugadasMusicaTerror` int(40) NOT NULL,
  `JugadasMusicaFiccion` int(40) NOT NULL,
  PRIMARY KEY (`Codigojugadas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numjugadas`
--

LOCK TABLES `numjugadas` WRITE;
/*!40000 ALTER TABLE `numjugadas` DISABLE KEYS */;
INSERT INTO `numjugadas` VALUES (2,8,10,0,15,20,0,9,5,0),(3,4,7,0,6,9,0,11,13,0),(4,5,8,0,1,3,0,12,5,0),(5,6,7,0,8,12,0,4,3,0),(6,7,6,0,7,8,0,27,13,0),(7,6,2,5,4,9,5,51,82,6),(8,1,0,5,1,2,3,5,3,2);
/*!40000 ALTER TABLE `numjugadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peliculas` (
  `Nombre` varchar(50) NOT NULL,
  `Director` varchar(30) NOT NULL,
  `Anio` int(20) NOT NULL,
  `Productora` varchar(30) NOT NULL,
  `Distribuidora` varchar(30) NOT NULL,
  `Presupuesto` varchar(30) NOT NULL,
  `Recaudacion` varchar(30) NOT NULL,
  PRIMARY KEY (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES ('Alicia en el pais de las maravillas','Tim Burton',2010,'Walt Disney Pictures','Walt Disney Studios',' 205 millones','1 billon'),('Anabelle','John R. Leonetti',2014,'New Line Cinema','Warner Bros. Pictures','6 millones','257 millones'),('Avatar','James Cameron',2009,'20th Century Fox','20th Century Fox','237 millones','3 billones'),('Batman Begins','Christopher Nolan',2005,'Legendary Pictures','Warner Bros. Pictures','150 millones','374 millones'),('Batman vs Superman: El amanecer de la justicia','Zack Snyder',2016,'DC Entertainment','Warner Bros. Pictures','250 millones','872 millones'),('Big Fish','Tim Burton',2003,'Tim Burton Productions','Columbia Pictures','70 millones','122 millones'),('Carrie','Brian De Palma',1976,'Two Pines entertainment','United Artists','2 millones','34 millones'),('Charlie y la fabrica de chocolate','Tim Burton',2005,'Village Roadshow Pictures','Warner Bros. Pictures','150 millones','475 millones'),('Dioses de egipto','Alex Proyas',2016,'Summit Entertainment','Lionsgate','140 millones','150 millones'),('E.T., el extraterrestre','Steven Spielberg',1982,'Amblin Entertainment','Universal Pictures','10 millones','793 millones'),('Eduardo Manostijeras','Tim Burton',1990,'20th Century Studios','20th Century Fox','20 millones','86 millones'),('El bosque','M. Night Shyamalan',2004,'Touchstone Pictures','Buena Vista Pictures','60 millones','256 millones'),('El caballero oscuro','Christopher Nolan',2008,'Legendary Pictures','Warner Bros. Pictures','185 millones','1 billón'),('El cid','Anthony Mann',1982,'Monogram Pictures','Monogram Pictures','7 millones','27 millones'),('El exorcista','William Friedkin',1973,'Warner Bros. Pictures','Warner Bros. Pictures','12 millones','441 millones'),('El hombre bicentenario','Chris Columbus',1999,'Columbia Pictures','Buena Vista Pictures','100 millones','87 millones'),('El laberinto del fauno','Guillermo del Toro',2006,'Esperanto Filmoj','Warner Bros. Pictures','13 millones','87 millones'),('El mundo perdido: Jurassic Park','Steven Spielberg',1997,'Amblin Entertainment','Universal Pictures','73 millones','618 millones'),('El padrino','Francis Ford Coppola',1972,'Paramount Pictures','Paramount Pictures','6 millones','248 millones'),('El padrino 2','Francis Ford Coppola',1974,'Paramount Pictures','Paramount Pictures','13 millones','93 millones'),('El planeta de los simios','Franklin J. Schaffner',1968,'APJAC Productions','20th Century Fox','5 millones','33 millones'),('El pueblo de los malditos','John Carpenter',1995,'Universal Pictures','Universal Pictures','22 millones','9 millones'),('El señor de los anillos: El retorno del rey','Peter Jackson',2003,'WingNut Films','New Line Cinema','94 millones','1147 millones'),('El señor de los anillos: La comunidad del anillo','Peter Jackson',2001,'New Line Cinema','New Line Cinema','93 millones','898 millones'),('El señor de los Anillos: Las dos torres','Peter Jackson',2002,'WingNut Films','New Line Cinema','94 millones','925 millones'),('Expediente warren: The conjuring','James Wan',2013,'New Line Cinema','Warner Bros. Pictures','20 millones','319 millones'),('Freddy vs Jason','Ronny Yu',2003,'New Line Cinema','New Line Cinema','30 millones','114 millones'),('Furia de titanes','Louis Leterrier',2010,'Legendary Pictures','Warner Bros. Pictures','125 millones','493 millones'),('Gremlins','Joe Dante',1984,'Amblin Entertainment','Warner Bros. Pictures','11 millones','153 millones'),('Halloween','John Carpenter',1978,'Compass International Pictures','Universal Pictures','300 mil','70 millones'),('Harry Potter y el cáliz de fuego','Mike Newell',2005,'Heyday Films','Warner Bros. Pictures','150 millones','900 millones'),('Harry Potter y el misterio del príncipe','David Yates',2009,'Heyday Films','Warner Bros. Pictures','250 millones','934 millones'),('Harry Potter y el prisionero de Azkaban','Alfonso Cuarón',2004,'Heyday Films','Warner Bros. Pictures','130 millones','795 millones'),('Harry Potter y la cámara secreta','Chris Columbus',2002,'Heyday Films','Warner Bros. Pictures','100 millones','878 millones'),('Harry Potter y la orden del fenix','David Yates',2007,'Heyday Films','Warner Bros. Pictures','150 millones','939 millones'),('Harry Potter y la piedra filosofal','Chris Columbus',2001,'Heyday Films','Warner Bros. Pictures','125 millones','974 millones'),('Harry Potter y las reliquias de la muerte: Parte 1','David Yates',2010,'Heyday Films','Warner Bros. Pictures','250 millones','976 millones'),('Harry Potter y las reliquias de la muerte: Parte 2','David Yates',2011,'Heyday Films','Warner Bros. Pictures','250 millones','1342 millones'),('Hook','Steven Spielberg',1991,'Amblin Entertainment','TriStar Pictures','70 millones','300 millones'),('Insidious','James Wan',2010,'Blumhouse Productions','FilmDistrict','1,5 millones','97 millones'),('It','Andrés Muschietti',2017,'New Line Cinema','Warner Bros. Pictures','35 millones','700 millones'),('Jack, el cazagigantes','Bryan Singer',2013,'New Line Cinema','Warner Bros. Pictures','195 millones','197 millones'),('Jumanji','Joe Johnston',1995,'Teitler Film','TriStar Pictures','65 millones','263 millones'),('Jurassic Park','Steven Spielberg',1993,'Amblin Entertainment','Universal Pictures','63 millones','1 billon'),('Jurassic Park 3','Joe Johnston',2001,'Amblin Entertainment','Universal Pictures','93 millones','368 millones'),('La ballena','Darren Aronofsky',2022,'Protozoa Pictures','A24','3 millones','20 millones'),('La brújula dorada','Chris Weitz',2007,'New Line Cinema','New Line Cinema','180 millones','372 millones'),('La familia addams','Barry Sonnenfeld',1991,'Orion Pictures','Paramount Pictures','30 millones','191 millones'),('La historia interminable','Wolfgang Petersen',1984,'Warner Bros. Pictures','Warner Bros. Pictures','27 millones','20 millones'),('La matanza de texas','Tobe Hooper',1974,'Vortex','Bryanston Distributing Picture','140 mil','30 millones'),('La momia','Stephen Sommers',1999,'Alphaville','Universal Pictures','80 millones','415 millones'),('La mujer de negro','James Watkins',2012,'Hammer Film Productions','Momentum Pictures','15 millones','281 millones'),('La naranja mecánica','Stanley Kubrick',1971,'Hawk Films','Warner Bros.','2 millones','26 millones'),('La niebla','Frank Darabont',2007,'Dimension Films','The Weinstein Company','18 millones','57 millones'),('La ñiñera magica','Kirk Jones',2005,'Working Title Films','Universal Pictures','25 millones','129 millones'),('La princesa prometida','Rob Reiner',1987,'Act III Communications','20th Century Fox','16 millones','31 millones'),('La profecia','Richard Donner',1976,'20th Century Fox','20th Century Fox','3 millones','61 millones'),('La señal','Gore Verbinski',2002,'DreamWorks Pictures','DreamWorks Pictures','48 millones','249 millones'),('Las cronicas de Spiderwick','Mark Waters',2008,'Nickelodeon Movies','Paramount Pictures','90 millones','162 millones'),('Los chicos del maiz','Fritz Kiersch',1984,'New World Pictures','New World Pictures','800 mil','14 millones'),('Los siete magníficos','Antoine Fuqua',2016,'Village Roadshow Pictures','Columbia Pictures','90 millones','160 millones'),('Mars Attacks!','Tim Burton',1996,'Warner Bros.','Warner Bros. Pictures','70 millones','101 millones'),('Matrix','Lilly y Lana Wachowski',1999,'Village Roadshow Pictures','Warner Bros. Pictures','363 millones','1 billón 632 millones'),('Moulin Rouge!','Baz Luhrmann',2001,'Angel Studios','20th Century Fox','52 millones','179 millones'),('Mrs. Doubtfire','Chris Columbus',1993,'Blue Wolf Productions','20th Century Fox','25 millones','441 millones'),('Múltiple','M. Night Shyamalan',2016,'Blumhouse Productions','Universal Pictures','9 millones','278 millones'),('Muñeco diabólico','Tom Holland',1988,'United Artists','Metro-Goldwyn-Mayer','9 millones','44.2 millones'),('Muñeco diabólico 2','John Lafia',1990,'Living Doll Productions','Universal Pictures','13 millones','36 millones'),('Muñeco diabólico 3','Jack Bender',1991,'Universal Studios','Universal Studios','13 millones','20 millones'),('Oz, un mundo de fantasia','Sam Raimi',2013,'Walt Disney Pictures','Walt Disney Studios','215 millones','495 millones'),('Pesadillas Antes de Navidad','Henry Selick',1993,'Walt Disney Pictures','Walt Disney Studios','18 millones','91 millones'),('Pesadillas en elm street','Wes Craven',1984,'New Line Cinema','New Line Cinema','1 millon','57 millones'),('Ready Player One','Steven Spielberg',2018,'Amblin Entertainment','Warner Bros. Pictures','175 millones','583 millones'),('Regreso al futuro','Robert Zemeckis',1985,'Universal Pictures','Universal Pictures','19 millones','389 millones'),('Regreso al futuro 2','Robert Zemeckis',1989,'Amblin Entertainment','Universal Pictures','40 millones','332 millones'),('Regreso al futuro 3','Robert Zemeckis',1990,'Amblin Entertainment','Universal Pictures','40 millones','244 millones'),('Saw','James Wan',2004,'Lions Gate Entertainment','Lionsgate Films','1 millón 200 mil','130 millones'),('Saw 2','Darren Lynn Bousman',2005,'Lions Gate Entertainment','Lionsgate Films','4 millones','175 millones'),('Saw 3','Darren Lynn Bousman',2006,'Twisted Pictures','Lionsgate Films','10 millones','164 millones'),('Silencio desde el mal','James Wan',2007,'Twisted Pictures','Universal Pictures','20 millones','22 millones'),('Spider-Man','Sam Raimi',2002,'Columbia Pictures','Sony Pictures Releasing','139 millones','825 millones'),('Star Wars: Episodio I - La amenaza fantasma','George Lucas',1999,'Lucasfilm','20th Century Fox','115 millones','1 billón'),('Star Wars: Episodio II - El ataque de los clones','George Lucas',2002,'Lucasfilm','20th Century Fox','115 millones','649 millones'),('Star Wars: Episodio III - La venganza de los Sith','George Lucas',2005,'Lucasfilm','20th Century Fox','113 millones','848 millones'),('Sweeney Todd','Tim Burton',2007,'DreamWorks Pictures','Warner Bros. Pictures','50 millones','152 millones'),('Tron','Steven Lisberger',1982,'Walt Disney Productions','Buena Vista Distribution','17 millones ','33 millones'),('Tron: Legacy','Joseph Kosinski',2010,'Sean Bailey Productions','Walt Disney Pictures','170 millones','400 millones'),('Un puente hacia terabithia','Gábor Csupó',2007,'Walt Disney Pictures','Buena Vista Pictures','25 millones','137 millones'),('Vengadores: EndGame','Anthony y Joe Russo',2019,'Marvel Studios','Walt Disney Studios','356 millones','2800 millones'),('Viernes 13','Sean S. Cunningham',1980,'Paramount Pictures','Paramount Pictures','550 mil','59 millones'),('Willow','Ron Howard',1988,'Lucasfilm','Metro-Goldwyn-Mayer','35 millones','137 millones'),('Yo, Robot','Alex Proyas',2004,'Davis Entertainment','20th Century Fox','120 millones','347 millones'),('Zathura','Jon Favreau',2005,'Columbia Pictures','Columbia Pictures','65 millones','65 millones');
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculascanciones`
--

DROP TABLE IF EXISTS `peliculascanciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peliculascanciones` (
  `NombrePelicula` varchar(50) NOT NULL,
  `idmusica` int(11) NOT NULL,
  PRIMARY KEY (`NombrePelicula`,`idmusica`),
  KEY `idmusica` (`idmusica`),
  CONSTRAINT `peliculascanciones_ibfk_1` FOREIGN KEY (`idmusica`) REFERENCES `canciones` (`id`),
  CONSTRAINT `peliculascanciones_ibfk_2` FOREIGN KEY (`NombrePelicula`) REFERENCES `peliculas` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculascanciones`
--

LOCK TABLES `peliculascanciones` WRITE;
/*!40000 ALTER TABLE `peliculascanciones` DISABLE KEYS */;
INSERT INTO `peliculascanciones` VALUES ('Alicia en el pais de las maravillas',66),('Anabelle',59),('Avatar',95),('Batman Begins',15),('Batman vs Superman: El amanecer de la justicia',3),('Big Fish',22),('Carrie',60),('Charlie y la fabrica de chocolate',81),('Dioses de egipto',67),('E.T., el extraterrestre',4),('Eduardo Manostijeras',9),('El bosque',18),('El caballero oscuro',1),('El cid',6),('El exorcista',61),('El hombre bicentenario',34),('El laberinto del fauno',10),('El mundo perdido: Jurassic Park',96),('El padrino',44),('El padrino 2',30),('El planeta de los simios',19),('El pueblo de los malditos',84),('El señor de los anillos: El retorno del rey',45),('El señor de los anillos: La comunidad del anillo',38),('El señor de los Anillos: Las dos torres',29),('Expediente warren: The conjuring',85),('Freddy vs Jason',83),('Furia de titanes',69),('Gremlins',35),('Halloween',63),('Harry Potter y el cáliz de fuego',28),('Harry Potter y el misterio del príncipe',50),('Harry Potter y el prisionero de Azkaban',48),('Harry Potter y la cámara secreta',46),('Harry Potter y la orden del fenix',49),('Harry Potter y la piedra filosofal',47),('Harry Potter y las reliquias de la muerte: Parte 1',51),('Harry Potter y las reliquias de la muerte: Parte 2',52),('Hook',36),('Insidious',62),('It',64),('Jack, el cazagigantes',71),('Jumanji',32),('Jurassic Park',97),('Jurassic Park 3',100),('La ballena',21),('La brújula dorada',72),('La familia addams',11),('La historia interminable',70),('La matanza de texas',86),('La momia',16),('La mujer de negro',87),('La naranja mecánica',8),('La niebla',88),('La ñiñera magica',75),('La princesa prometida',73),('La profecia',89),('La señal',91),('Las cronicas de Spiderwick',82),('Los chicos del maiz',90),('Los siete magníficos',25),('Mars Attacks!',12),('Matrix',2),('Moulin Rouge!',5),('Mrs. Doubtfire',33),('Múltiple',23),('Muñeco diabólico',26),('Muñeco diabólico 2',40),('Muñeco diabólico 3',41),('Oz, un mundo de fantasia',74),('Pesadillas Antes de Navidad',31),('Pesadillas en elm street',94),('Ready Player One',102),('Regreso al futuro',27),('Regreso al futuro 2',42),('Regreso al futuro 3',43),('Saw',53),('Saw 2',54),('Saw 3',93),('Silencio desde el mal',56),('Spider-Man',13),('Star Wars: Episodio I - La amenaza fantasma',57),('Star Wars: Episodio II - El ataque de los clones',58),('Star Wars: Episodio III - La venganza de los Sith',24),('Sweeney Todd',17),('Tron',99),('Tron: Legacy',98),('Un puente hacia terabithia',80),('Vengadores: EndGame',20),('Viernes 13',92),('Willow',76),('Yo, Robot',103),('Zathura',101);
/*!40000 ALTER TABLE `peliculascanciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculasimagenes`
--

DROP TABLE IF EXISTS `peliculasimagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peliculasimagenes` (
  `NombrePelicula` varchar(50) NOT NULL,
  `idimagen` int(11) NOT NULL,
  PRIMARY KEY (`NombrePelicula`,`idimagen`),
  KEY `Restriccion2` (`idimagen`),
  CONSTRAINT `Restriccion1` FOREIGN KEY (`NombrePelicula`) REFERENCES `peliculas` (`Nombre`),
  CONSTRAINT `Restriccion2` FOREIGN KEY (`idimagen`) REFERENCES `imagenes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculasimagenes`
--

LOCK TABLES `peliculasimagenes` WRITE;
/*!40000 ALTER TABLE `peliculasimagenes` DISABLE KEYS */;
INSERT INTO `peliculasimagenes` VALUES ('Alicia en el pais de las maravillas',59),('Anabelle',83),('Avatar',103),('Batman Begins',30),('Batman vs Superman: El amanecer de la justicia',4),('Big Fish',5),('Carrie',93),('Charlie y la fabrica de chocolate',102),('Dioses de egipto',78),('E.T., el extraterrestre',29),('Eduardo Manostijeras',8),('El bosque',9),('El caballero oscuro',31),('El cid',7),('El exorcista',94),('El hombre bicentenario',32),('El laberinto del fauno',24),('El mundo perdido: Jurassic Park',105),('El padrino',44),('El padrino 2',15),('El planeta de los simios',21),('El pueblo de los malditos',99),('El señor de los anillos: El retorno del rey',45),('El señor de los anillos: La comunidad del anillo',38),('El señor de los Anillos: Las dos torres',2),('Expediente warren: The conjuring',92),('Freddy vs Jason',71),('Furia de titanes',80),('Gremlins',34),('Halloween',95),('Harry Potter y el cáliz de fuego',11),('Harry Potter y el misterio del príncipe',50),('Harry Potter y el prisionero de Azkaban',48),('Harry Potter y la cámara secreta',47),('Harry Potter y la orden del fenix',49),('Harry Potter y la piedra filosofal',46),('Harry Potter y las reliquias de la muerte: Parte 1',51),('Harry Potter y las reliquias de la muerte: Parte 2',52),('Hook',35),('Insidious',72),('It',96),('Jack, el cazagigantes',81),('Jumanji',36),('Jurassic Park',104),('Jurassic Park 3',106),('La ballena',3),('La brújula dorada',77),('La familia addams',22),('La historia interminable',63),('La matanza de texas',75),('La momia',25),('La mujer de negro',86),('La naranja mecánica',13),('La niebla',87),('La ñiñera magica',64),('La princesa prometida',68),('La profecia',98),('La señal',70),('Las cronicas de Spiderwick',101),('Los chicos del maiz',84),('Los siete magníficos',1),('Mars Attacks!',26),('Matrix',28),('Moulin Rouge!',17),('Mrs. Doubtfire',33),('Múltiple',14),('Muñeco diabólico',6),('Muñeco diabólico 2',40),('Muñeco diabólico 3',41),('Oz, un mundo de fantasia',67),('Pesadillas Antes de Navidad',16),('Pesadillas en elm street',73),('Ready Player One',107),('Regreso al futuro',23),('Regreso al futuro 2',42),('Regreso al futuro 3',43),('Saw',53),('Saw 2',54),('Saw 3',91),('Silencio desde el mal',56),('Spider-Man',18),('Star Wars: Episodio I - La amenaza fantasma',57),('Star Wars: Episodio II - El ataque de los clones',58),('Star Wars: Episodio III - La venganza de los Sith',19),('Sweeney Todd',20),('Tron',109),('Tron: Legacy',108),('Un puente hacia terabithia',100),('Vengadores: EndGame',10),('Viernes 13',76),('Willow',69),('Yo, Robot',111),('Zathura',110);
/*!40000 ALTER TABLE `peliculasimagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculaspreguntas`
--

DROP TABLE IF EXISTS `peliculaspreguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peliculaspreguntas` (
  `NombrePelicula` varchar(50) NOT NULL,
  `idpregunta` int(11) NOT NULL,
  `Respuesta` varchar(50) NOT NULL,
  PRIMARY KEY (`NombrePelicula`,`idpregunta`),
  KEY `peliculaspreguntas2` (`idpregunta`),
  CONSTRAINT `peliculaspreguntas` FOREIGN KEY (`NombrePelicula`) REFERENCES `peliculas` (`Nombre`),
  CONSTRAINT `peliculaspreguntas2` FOREIGN KEY (`idpregunta`) REFERENCES `preguntas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculaspreguntas`
--

LOCK TABLES `peliculaspreguntas` WRITE;
/*!40000 ALTER TABLE `peliculaspreguntas` DISABLE KEYS */;
INSERT INTO `peliculaspreguntas` VALUES ('Anabelle',64,'New Line Cinema'),('Avatar',95,'James Cameron'),('Batman vs Superman: El amanecer de la justicia',1,'Zack Snyder'),('Big Fish',2,'Tim Burton'),('Carrie',65,'Carrie'),('Charlie y la fabrica de chocolate',78,'Tim Burton'),('Dioses de egipto',60,'Alex Proyas'),('E.T., el extraterrestre',28,'Steven Spielberg'),('Eduardo Manostijeras',3,'20th Century Fox'),('El bosque',4,'2004'),('El caballero oscuro',31,'El caballero oscuro'),('El cid',5,'El cid'),('El exorcista',66,'1973'),('El hombre bicentenario',36,'Columbia Pictures'),('El laberinto del fauno',24,'Guillermo del Toro'),('El padrino',44,'1972'),('El padrino 2',7,'Paramount Pictures'),('El planeta de los simios',25,'1968'),('El pueblo de los malditos',86,'El pueblo de los malditos'),('El señor de los anillos: El retorno del rey',45,'1147 millones'),('El señor de los anillos: La comunidad del anillo',38,'2001'),('El señor de los Anillos: Las dos torres',8,'925 millones'),('Expediente warren: The conjuring',87,'2013'),('Freddy vs Jason',67,'Freddy vs Jason'),('Furia de titanes',61,'2010'),('Gremlins',33,'1984'),('Halloween',88,'John Carpenter'),('Harry Potter y el cáliz de fuego',9,'Warner Bros Pictures'),('Harry Potter y el misterio del príncipe',50,'Harry Potter y el misterio del príncipe'),('Harry Potter y el prisionero de Azkaban',48,'Alfonso Cuarón'),('Harry Potter y la cámara secreta',46,'Harry Potter y la cámara secreta'),('Harry Potter y la orden del fenix',49,'942 millones'),('Harry Potter y la piedra filosofal',47,'2001'),('Harry Potter y las reliquias de la muerte: Parte 1',81,'David Yates'),('Harry Potter y las reliquias de la muerte: Parte 2',82,'Harry Potter y las reliquias de la muerte: Parte 2'),('Hook',32,'Steven Spielberg'),('Insidious',89,'James Wan'),('It',68,'It'),('Jack, el cazagigantes',83,'Jack, el cazagigantes'),('Jumanji',35,'Jumanji'),('La ballena',10,'La ballena'),('La familia addams',22,'La familia addams'),('La historia interminable',62,'La historia interminable'),('La matanza de texas',90,'1974'),('La momia',21,'La momia'),('La mujer de negro',91,'2012'),('La naranja mecánica',11,'1975'),('La niebla',69,'18 millones'),('La ñiñera magica',76,'La niñera mágica'),('La princesa prometida',63,'1987'),('La profecia',73,'20th Century Fox'),('La señal',72,'La señal'),('Los chicos del maiz',92,'Los chicos del maíz'),('Los siete magníficos',12,'2016'),('Mars Attacks!',26,'1996'),('Matrix',27,'Lilly y Lana Wachowski'),('Moulin Rouge!',13,'Moulin Rouge!'),('Mrs. Doubtfire',34,'Chris Columbus'),('Múltiple',14,'M. Night Shyamalan'),('Muñeco diabólico',15,'Tom Holland'),('Muñeco diabólico 2',40,'Universal Pictures'),('Muñeco diabólico 3',41,'Muñeco diabólico 3'),('Oz, un mundo de fantasia',84,'Oz, un mundo de fantasia'),('Pesadillas Antes de Navidad',20,'Henry Selick'),('Pesadillas en elm street',71,'Wes Craven'),('Ready Player One',96,'Ready Player One'),('Regreso al futuro',23,'Robert Zemeckis'),('Regreso al futuro 2',42,'Regreso al futuro 2'),('Regreso al futuro 3',43,'1990'),('Saw',53,'Saw'),('Spider-Man',16,'Spider-Man'),('Star Wars: Episodio I - La amenaza fantasma',57,'1999'),('Star Wars: Episodio II - El ataque de los clones',58,'Star Wars: Episodio II - El ataque de los clones'),('Star Wars: Episodio III - La venganza de los Sith',17,'Georges Lucas'),('Sweeney Todd',18,'Sweeney Todd'),('Tron',93,'1982'),('Tron: Legacy',94,'2010'),('Vengadores: EndGame',19,'2800 millones'),('Willow',80,'Ron Howard'),('Zathura',97,'Zathura');
/*!40000 ALTER TABLE `peliculaspreguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(90) NOT NULL,
  `Pista` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (1,'¿Quién fue el director de \"Batman vs Superman\"?','Zack....'),(2,'¿Quién fue el director de la película \"Big Fish\"?','También dirigió \"Eduardo Manostijeras\"'),(3,'¿Qué empresa distribuyo \"Eduardo Manostijeras\"?','20th Century...'),(4,'¿En que año fue hecha la película de \"El bosque\"?','Fue hecha por el año 2000'),(5,'Película histórica protagonizada por \"Charlon Heston\"','El protagonista es un mercenario'),(7,'Productora de la trilogía de \"El padrino\"','El logo de esta productora es una montaña'),(8,'¿Cuál fue la recaudación de \"El señor de los anillos: Las dos torres\"?','Ronda los 900 millones'),(9,'¿Cuál fue la distribuidora de \"Harry Potter y el cáliz de fuego\"?','Warner Bros...'),(10,'¿Cuál ha sido la película con la que \"Brendan Fraser\" ha ganado su primer óscar?','La b....'),(11,'¿En que año se estreno \"La naranja Mecánica\" en España?','La película salió en 1971, pero se estreno años mas tarde debido al régimen franquista'),(12,'¿En que año salió el remake de \"Los siete Magníficos\"?','Fue mas o menos por el 2013'),(13,'¿Qué película tiene el nombre de un cabaret parisino?','....Rouge'),(14,'¿Quién dirigió la película de \"Múltiple\"?','M. Night....'),(15,'¿Quién dirigió la película de \"Muñeco Diabólico\"?','Se llama igual que el actor que da vida al Spider-Man de Marvel Studios'),(16,'¿Cuál es la película mas popular que protagonizo \"Tobey Maguire\"?','Al personaje que da nombre a la pelicula se le conoce como \"El trepa muros\"'),(17,'¿Quién dirigió la saga de \"Star Wars\"?','Georges...'),(18,'¿En que película \"Johnny Deep\" dio vida a un barbero? ','Sweeney T...'),(19,'¿Cuánto dinero recaudo la película de \"EndGame\"?','La cifra ronda los 2000 mil millones'),(20,'¿Quién fue el director de \"Pesadillas antes de Navidad\"?','No fue Tim Burton.'),(21,'¿Qué película del actor \"Brendan Fraser\" ocurre en Egipto?','Hay una momia de por medio.'),(22,'Es una de las familias mas raras del cine','Su hija se llama \"Miércoles\"'),(23,'¿Quién fue el director de \"Regreso al futuro\"?','Robert...'),(24,'¿Quién fue el director de \"El laberinto del fauno\"?','Es muy popular debido a los monstruos que crea para algunas de sus películas'),(25,'¿En que año salió \"El planeta de los simios\"?','Salió sobre 1960'),(26,'¿En que año salió la película de \"Mars Attack!\"?','Salió a mediados de los 90.'),(27,'¿Quiénes dirigieron la película de \"Matrix\"?','Su apellido es \"Wachowski\"'),(28,'¿Quién fue el director de la película E.T., el extraterrestre?','Se le conoce también por haber dirigido \"Jurassic Park\"'),(31,'¿Cuál fue la ultima película en la que salió \"Heath Ledger\" antes de morir?','Su personaje es conocido como \"El príncipe payaso del crimen\".'),(32,'¿Quién fue el director de la película de \"Hook\"?','Steven...'),(33,'¿En que año salió la película \"Gremlins\"?','Salió a mediados de los 80'),(34,'¿Quién dirigió la película \"Mrs. Doubtfire\"?','Dirigió la primera película de \"Harry Potter\"'),(35,'¿Cuál es el titulo de la película que trata de un juego de mesa?','En la jungla vas a esperar hasta un 5 o un 8 sacar.'),(36,'¿Cuál es la productora de \"El hombre bicentenario\"?','El logo de esta productora es una mujer alzando una antorcha'),(38,'¿En que año salió la primera película del \"Señor de los anillos\"?','Salió sobre el año 2000'),(40,'¿Cuál es la distribuidora de \"Muñeco Diabólico 2\"?','Tiene un globo terráqueo como logo'),(41,'¿Cuál es la película en la que \"Andy Barclay\" va a una escuela militar?','Es la tercera película del muñeco asesino'),(42,'¿Cuál es la película en la que se viaja a un futuro 2015 en el que hay coches voladores?','Es la segunda de una trilogía'),(43,'¿En que año salió \"Regreso al futuro 3\"?','Salió muy a principios de los 90'),(44,'¿En que año salió la primera película de \"El padrino\"?','Salió a principios de los 70'),(45,'¿Cuál fue la recaudación de \"El señor de los anillos: El retorno del rey?','Supero los 1000 millones'),(46,'¿Cuál es la película de Harry Potter en la que aparece un basilisco?','El basilisco vive en una cámara secreta.'),(47,'¿En que año salió la primera película de Harry Potter?','Salió a principios de los 2000.'),(48,'¿Quién fue el director de \"Harry Potter y el prisionero de Azkaban\"?','Es mexicano.'),(49,'¿Cuánto recaudo la película de \"Harry Potter y la orden del fénix\"?','Recaudo mas de 900 millones de dolares.'),(50,'¿Cuál es el titulo de la sexta entrega de Harry Potter?','Harry Potter y el....'),(53,'¿Cuál es el titulo de la película que transcurre en unos baños abandonados?','El villano de la película solo quiere jugar a un juego'),(57,'¿En que año salió la primera precuela de \"Star Wars\"?','Salió a finales de los 90.'),(58,'¿Cuál es el titulo de la película en la que \"Anakin Skywalker\" pierde el brazo derecho?','Star Wars...'),(60,'¿Quién fue el director de \"Dioses de Egipto?','Dirigió también la película de \"Yo, robot\"'),(61,'¿En que año salió la nueva versión de \"Furia de titanes\"?','Salió entre el 2008 y el 2012'),(62,'¿Cuál es el titulo de una película popular de fantasía que salió en 1984?','Es una historia interminable.'),(63,'¿En que año salió la princesa prometida?','Salió en la década de los ochenta.'),(64,'¿Cuál es la productora de la película de \"Annabelle\"?','Distribuyo el señor de los anillos antes de ser comprada por Warner Bros.'),(65,'¿Cuál es el nombre de la chica con poderes telequinéticos?','Su nombre es el titulo de la película y el de la novela de Stephen King.'),(66,'¿En que año salió \"El exorcista\"?','Salió en los años 70'),(67,'¿En  que película dos asesinos en serie se enfrentan entre si?','Una mata a través de los sueños, y el otro tiene una mascara de hockey.'),(68,'¿Cuál es el nombre de la película de un payaso asesino?','\"Eso\" en ingles'),(69,'¿Cuál fue el presupuesto de la película \"La niebla\"?','Ronda casi los 20 millones.'),(71,'¿Quién es el director de \"Pesadillas en elm Street\"?','Es el mismo que dirigió la película de \"Scream\".'),(72,'¿Cómo se llama la película en la que sale una niña del televisor?','Cuando ves su cinta, te quedan 7 días de vida.'),(73,'¿Quién distribuyo la película de \"La profecía\"?','...Century Fox'),(76,'¿Cuál es el nombre de la película en la que la protagonista es una niñera?','No es Mary Poppins. En este película, la niñera tiene que hacerse cargo de siete niños.'),(78,'¿Quién fue el director de \"Charlie y la fabrica de chocolate\" de 2005?','Suele hacer películas extrañas que giran en torno a la muerte'),(80,'¿Quien fue el director de la película de \"Willow\"?','Dirigió la película de \"El grinch\"'),(81,'¿Quién es el director de \"Harry Potter y las reliquias de la muerte: Parte 1\"?','David...'),(82,'¿Cómo se llama la ultima película de Harry Potter?','Las reliquias de la muerte...'),(83,'¿Cuál es la película en la que el protagonista escala por una judía mágica?','La judía mágica lo lleva al reino de los gigantes'),(84,'¿Cómo se titulo la precuela del mago de oz?','Oz...'),(86,'¿Cómo se titula la película de terror protagonizada por nueve extraños niños?','Los niños tienen el pelo blanco'),(87,'¿En que año salio la primera película de expediente Warren?','Salio pasado el 2010.'),(88,'¿Quién es el director de la película original de \"Halloween\"?','John...'),(89,'¿Quién es el director de la película de \"Insidious\"?','Es el mismo que dirigió la película de \"Saw\".'),(90,'¿En que año salio la primera película de \"La matanza de texas\"?','Salio en los años 70.'),(91,'¿En que año salio \"La mujer de negro\"?','Salio sobre el 2010.'),(92,'¿Cómo se titula la película en la que unos niños le rezan a un maizal?','Esta basado en un relato de Stephen King.'),(93,'¿En que año salio la primera película de \"Tron\"?','Salio sobre los años 80.'),(94,'¿En que año salio la secuela de \"Tron\"?','Se lleva una diferencia de casi 30 años.'),(95,'¿Quién fue el director de \"Avatar\"?','Fue el mismo que dirigió \"Terminator\".'),(96,'¿Cuál es la película de Steven Spielberg que gira en torno a la realidad virtual?','Ready...'),(97,'¿Cuál es el titulo de la película que se parece mucho a \"Jumanji\"?','Es un juego que gira en torno al espacio.');
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ranking` (
  `CodigoRanking` int(40) NOT NULL,
  `PuntosImagenFantasia` int(40) NOT NULL,
  `PuntosImagenTerror` int(40) NOT NULL,
  `PuntosImagenFiccion` int(40) NOT NULL,
  `PuntosPreguntasFantasia` int(40) NOT NULL,
  `PuntosPreguntasTerror` int(40) NOT NULL,
  `PuntosPreguntasFiccion` int(40) NOT NULL,
  `PuntosMusicaFantasia` int(40) NOT NULL,
  `PuntosMusicaTerror` int(40) NOT NULL,
  `PuntosMusicaFiccion` int(40) NOT NULL,
  PRIMARY KEY (`CodigoRanking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` VALUES (2,6,7,0,8,4,0,3,1,0),(3,3,5,0,6,1,0,3,4,0),(4,3,6,0,7,8,0,1,2,0),(5,6,13,0,4,9,0,8,7,0),(6,16,17,0,1,2,0,4,7,0),(7,4,0,8,0,6,4,4,4,4),(8,0,0,6,0,3,5,0,0,2);
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `Nombre` varchar(20) NOT NULL,
  `Passwrd` varchar(20) NOT NULL,
  `CodigoRanking` int(40) NOT NULL,
  `Codigojugadas` int(40) NOT NULL,
  PRIMARY KEY (`Nombre`),
  KEY `fk_usuarioRanking` (`CodigoRanking`),
  KEY `FK_usuario_numjugadas` (`Codigojugadas`),
  CONSTRAINT `FK_usuario_numjugadas` FOREIGN KEY (`Codigojugadas`) REFERENCES `numjugadas` (`Codigojugadas`),
  CONSTRAINT `fk_usuarioRanking` FOREIGN KEY (`CodigoRanking`) REFERENCES `ranking` (`CodigoRanking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('carlos','carlos*1234',2,2),('juanmaEV','juanmaEV*123',4,4),('manolo','manolo*1234',5,5),('prueba','prueba*123',7,7),('prueba2','prueba2*123',8,8),('rocio','rocio*123',3,3),('ruben','ruben*123',6,6);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-30 17:07:31
