-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: localhost    Database: livestock-marketplace-db
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `selectedCategory` varchar(255) NOT NULL,
  `selectedSubcategory` varchar(255) NOT NULL,
  `formData` json NOT NULL,
  `createdTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (6,2,'Livestock','Eggs','{\"media\": [\"/listingMedia/1734983606954-image-0.webp\"], \"title\": \"Test\", \"harvest\": \"First Harvest\", \"pwPrice\": \"100PHP\", \"category\": \"Eggs\", \"location\": \"Test\", \"minOrder\": \"Test\", \"description\": \"Test\", \"salesStatus\": \"For Sale\", \"uploadedFiles\": [{\"url\": \"blob:http://localhost:3000/fec8317d-7a36-4f38-88c0-e4c326927a56\", \"type\": \"image\"}], \"paymentMethods\": [\"cash\", \"gcash\"]}','2024-12-23 19:53:26'),(7,2,'Services / Jobs','Plumber','{\"media\": [\"/listingMedia/1734983606954-image-0.webp\"], \"title\": \"Test\", \"jobType\": \"Offering\", \"category\": \"Plumber\", \"location\": \"Test\", \"position\": \"Mechanic\", \"hourlyRate\": \"75\", \"companyLogo\": \"blob:http://localhost:3000/c6f460be-22a6-4d23-a27c-46d700a7c90f\", \"salesStatus\": \"Active\", \"jobDescription\": \"Teset\"}','2024-12-23 20:01:51'),(8,2,'Services / Jobs','Mechanic','{\"media\": [\"/listingMedia/1734984557655-companyLogo.jpeg\"], \"title\": \"TEst\", \"jobType\": \"Offering\", \"category\": \"Mechanic\", \"location\": \"Test\", \"position\": \"Mechanic\", \"hourlyRate\": \"75\", \"companyLogo\": {\"url\": \"blob:http://localhost:3000/afce0af5-afe8-4b28-b2e2-35f5934be07f\", \"type\": \"image\"}, \"salesStatus\": \"Active\", \"jobDescription\": \"Test\"}','2024-12-23 20:09:17');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshTokens`
--

DROP TABLE IF EXISTS `refreshTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `token` text NOT NULL,
  `expiresAt` datetime NOT NULL,
  `isValid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshTokens`
--

LOCK TABLES `refreshTokens` WRITE;
/*!40000 ALTER TABLE `refreshTokens` DISABLE KEYS */;
INSERT INTO `refreshTokens` VALUES (1,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzM0OTgyNzU3LCJleHAiOjE3Mzc1NzQ3NTd9.tDTKb9RHvBH4hT1yNtMaAEKpjupBllXtPYWfbXI0EKc','2025-01-22 19:39:17',1);
/*!40000 ALTER TABLE `refreshTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text,
  `address` text,
  `isEmailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `isSignUpFromGoogle` tinyint(1) NOT NULL DEFAULT '0',
  `isSignUpFromFacebook` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Huzaifah','Tariq','huzaifahtariq08@gmail.com','huzaifahtariq08@gmail.com',NULL,NULL,1,0,1,1,'2024-11-14 14:18:21','2024-11-14 14:18:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'livestock-marketplace-db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-24  2:03:21
