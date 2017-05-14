-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: testdb2.cilqftni5rud.us-west-2.rds.amazonaws.com    Database: MainDB
-- ------------------------------------------------------
-- Server version	5.6.27-log

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
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `EmployeeNumber` bigint(20) NOT NULL,
  `EmployeeType` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EmployeeNumber` (`EmployeeNumber`),
  KEY `FK_Employees_EmployeeType` (`EmployeeType`),
  CONSTRAINT `FK_Employees_EmployeeType` FOREIGN KEY (`EmployeeType`) REFERENCES `TypeConstants` (`Value`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Items` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Price` decimal(15,2) DEFAULT NULL,
  `Type` varchar(100) DEFAULT NULL,
  `SKU` varchar(100) DEFAULT NULL,
  `BarCode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Items_Type` (`Type`),
  CONSTRAINT `FK_Items_Type` FOREIGN KEY (`Type`) REFERENCES `TypeConstants` (`Value`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LineItems`
--

DROP TABLE IF EXISTS `LineItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LineItems` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ItemID` bigint(20) DEFAULT NULL,
  `OrderID` bigint(20) DEFAULT NULL,
  `Price` decimal(15,2) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Discount` bit(1) DEFAULT NULL,
  `DiscountAmount` decimal(15,2) DEFAULT NULL,
  `Subtotal` decimal(15,2) DEFAULT NULL,
  `TaxRate` float DEFAULT NULL,
  `TaxAmount` decimal(15,2) DEFAULT NULL,
  `TotalAmount` decimal(15,2) DEFAULT NULL,
  `TransactionType` varchar(100) DEFAULT NULL,
  `PaymentType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_LineItems_ItemID` (`ItemID`),
  KEY `FK_LineItems_TransactionType` (`TransactionType`),
  KEY `FK_LineItems_PaymentType` (`PaymentType`),
  CONSTRAINT `FK_LineItems_ItemID` FOREIGN KEY (`ItemID`) REFERENCES `Items` (`ID`),
  CONSTRAINT `FK_LineItems_PaymentType` FOREIGN KEY (`PaymentType`) REFERENCES `TypeConstants` (`Value`),
  CONSTRAINT `FK_LineItems_TransactionType` FOREIGN KEY (`TransactionType`) REFERENCES `TypeConstants` (`Value`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LineItems`
--

LOCK TABLES `LineItems` WRITE;
/*!40000 ALTER TABLE `LineItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `LineItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Date` datetime NOT NULL,
  `EmployeeID` bigint(20) NOT NULL,
  `OrderNumber` bigint(20) NOT NULL,
  `Paid` bit(1) NOT NULL,
  `Closed` bit(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Orders_EmployeeID` (`EmployeeID`),
  CONSTRAINT `FK_Orders_EmployeeID` FOREIGN KEY (`EmployeeID`) REFERENCES `Employees` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TypeConstants`
--

DROP TABLE IF EXISTS `TypeConstants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TypeConstants` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Class` varchar(100) NOT NULL,
  `Value` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Value` (`Value`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TypeConstants`
--

LOCK TABLES `TypeConstants` WRITE;
/*!40000 ALTER TABLE `TypeConstants` DISABLE KEYS */;
/*!40000 ALTER TABLE `TypeConstants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `EmployeeID` bigint(20) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UserName` (`UserName`),
  KEY `FK_Users_EmployeeID` (`EmployeeID`),
  CONSTRAINT `FK_Users_EmployeeID` FOREIGN KEY (`EmployeeID`) REFERENCES `Employees` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-05 22:15:17
