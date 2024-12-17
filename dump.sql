-- MySQL dump 10.13  Distrib 5.7.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: librarydb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `idbooks` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `isAvailable` tinyint(1) DEFAULT 1,
  `borrowedByid` varchar(255) DEFAULT NULL,
  `borrowedByName` varchar(255) DEFAULT NULL,
  `borroweddate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `bookscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idbooks`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (0,'คนรวยทำงานเร็ว','โกะดด โทคิโอะ','9786161857530',1,NULL,NULL,NULL,NULL,NULL),(1,'manifest','roxie nafousi','9786161859541',1,NULL,NULL,NULL,NULL,NULL),(2,'ปลดหนี้เลิกจน บริหารเงินให้มั่งคั่ง คุณก็ทำได้ ถ้าตั้งใจและจัดการเงินเป็น','กวิน สุวรรณตระกูล','9786164875845',1,NULL,NULL,NULL,NULL,NULL),(3,'วิเคราะห์ข้อมูลสถิติ และทำงานวิจัยด้วย Excel','ปรีดาภรณ์ กาญจนสำราญวงศ์','9786162009570',1,NULL,NULL,NULL,NULL,NULL),(4,'100 best design offices & workspaces','สำนักพิมพ์บ้านและสวน','9786161840297',1,NULL,NULL,NULL,NULL,NULL),(5,'วิธีเปลี่ยนนิสัยผัดวันประกันพรุ่งให้กลายเป็นคนทำอะไรก็สำเร็จเสร็จตามเวลา','hayden finch, Phd','9786164440593.',1,NULL,NULL,NULL,NULL,NULL),(6,'วิชาคนตัวเล็ก small rules','พูนลาภ อุทัยเลิศอรุณ','9786162876929',1,NULL,NULL,NULL,NULL,NULL),(7,'ภาระที่อมไว้คายออกมาเถอะนะ','ไนโต โยะชิฮิโตะ','9786160455560',1,NULL,NULL,NULL,NULL,NULL),(8,'ความลับเรื่องเงินที่แม่อยากบอกลูกก่อนตาย','park so yeon','9786168109533',1,NULL,NULL,NULL,NULL,NULL),(9,'บ้านในเมืองอยู่สบาย','สำนักพิมพ์บ้านและสวน','9786169454748',1,NULL,NULL,NULL,NULL,NULL),(10,'basic coding สำหรับweb deverloper ด้วย html ,css3 และ javascript','ศุกชัย สมพานิช','9786164873278',1,NULL,NULL,NULL,NULL,NULL),(11,'offices english คล่องภาษาอังกฤษแบบมนุษย์ออฟฟิศรุ่นใหม่','Baek Seon Yeob, Ph.D., Stanford University, USA','9786160839599',1,NULL,NULL,NULL,NULL,NULL),(12,'เก่ง พูดจีน 80 สถานกาณ์','อรพินท์ อัจฉริยกาญจ์','9786163813251',1,NULL,NULL,NULL,NULL,NULL),(13,'9ใน10ของชีวิตพิชิตด้วยการพูด','นางามัตสึ ชิเงฮิสะ','9786161404000',1,NULL,NULL,NULL,NULL,NULL),(14,'เล่นหุ้นออนไลน์ไม่ยาก','วีรวัฒน์ วีรวรรณ','9786164492448',1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(10) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,472087,'ทองศุกร์'),(2,413350,'ครรชิต'),(3,422422,'นพพร'),(4,420535,'กุลพรรณ'),(5,293221,'วิจิตร'),(6,462074,'พิศิษฐ์'),(7,504653,'รัตนพล'),(8,413481,'วิชุดา'),(9,501542,'กุลิสรา'),(10,499982,'ฉัตรพิชชาร์'),(11,504382,'ศศิวิมล'),(12,505072,'ฉันทนา'),(13,496863,'ประภาพร'),(14,499789,'ธิดารัตน์ '),(15,503205,'นวรัตน์ '),(16,505192,'ขนิษฐา'),(17,497947,'อัครเดช'),(18,497921,'รัฐมนูญ'),(19,498759,'พรศักดิ์'),(20,503137,'อำนาจ'),(21,514297,'ทศพล'),(22,453025,'อนุรักษ์'),(23,499021,'วิตต์ธาดา'),(24,501135,'อภิวัฒน์'),(25,501730,'กิตติพล'),(26,505337,'ปารณ'),(27,505569,'ธนยศ '),(28,505586,'ภมรทิพย์'),(29,423533,'ขจรศักดิ์ '),(30,497467,'อัศวิน'),(31,501737,'อมรเทพ'),(32,502864,'กีรฉัตร'),(33,509567,'อินสอน'),(34,490027,'เสกสรรค์ '),(35,462252,'จีรพัฒน์'),(36,502373,'จักรพงค์ '),(37,502371,'อนุชา'),(39,508569,'ปวาริศ'),(40,502378,'พันธ์ศักดิ์'),(41,505660,'อรรคเดช'),(42,503348,'ชนะชัย'),(43,495017,'ดนุพงศ์ '),(44,505057,'วรโชติ'),(45,506740,'ศตวรรษ'),(46,506750,'ไมตรี'),(47,506782,'ปกรณ์'),(48,507714,'ณัฐเศรษฐ์ '),(49,499562,'วรรธนัย'),(50,502377,'วชิราวุธ'),(51,507267,'วินัย'),(52,508831,'ประพัฒน์'),(53,502374,'พิชญ์'),(54,502376,'กิตติพงษ์'),(55,503855,'ธนกร'),(56,503874,'พงศกร '),(57,508805,'อมรเทพ'),(58,513986,'ธนภัทร'),(59,9010948,'พงศธร'),(60,9005071,'สุรินันท์'),(61,9006173,'ศุภลักษณ์ '),(62,9005069,'เกษมสันต์'),(63,9005074,'พรศักดิ์'),(64,9003456,'สุพจน์'),(65,9005066,'เกรียงศักดิ์'),(66,9005168,'เกรียงไกร'),(67,9007497,'วีระพงษ์'),(68,9003449,'สุพรรณ '),(69,9003454,'ภาคภูมิ'),(70,9011430,'ณัฐพงศ์ '),(71,9011435,'วิฑูรย์'),(72,9011436,'สรนันท์ '),(73,9011539,'เจนณรง'),(74,9011786,'จีรยุทธ'),(75,9011902,'ภูมิรินทร์'),(76,9012072,'ธีรพงศ์'),(77,9012516,'อมรณ์เทพ'),(78,9012517,'ณัฐพงศ์ '),(79,9012525,'วรรณดนัย');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-17 17:10:42
