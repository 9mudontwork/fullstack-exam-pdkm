-- MySQL Script generated by MySQL Workbench
-- Thu Aug 19 19:52:15 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema minimart_services
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema minimart_services
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `minimart_services` DEFAULT CHARACTER SET utf8 ;
USE `minimart_services` ;

-- -----------------------------------------------------
-- Table `minimart_services`.`stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minimart_services`.`stores` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL COMMENT 'ชื่อร้านค้า',
  `description` TEXT NULL COMMENT 'คำอธิบายร้านค้า',
  `phone_number` VARCHAR(20) NULL COMMENT 'เบอร์ติดต่อร้านค้า',
  `address` TEXT NULL COMMENT 'ที่อยู่',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minimart_services`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minimart_services`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL COMMENT 'ชื่อหมวดหมู่',
  `description` TEXT NULL COMMENT 'คำอธิบายหมวดหมู่สินค้า',
  `create_at` DATETIME NULL,
  `update_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minimart_services`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minimart_services`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL COMMENT 'ชื่อสินค้า',
  `description` TEXT NULL COMMENT 'รายละเอียดสินค้า',
  `price` DECIMAL(10,2) NULL COMMENT 'ราคาสินค้า',
  `unit_type` VARCHAR(255) NULL COMMENT 'หน่วยสินค้า',
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minimart_services`.`products_has_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minimart_services`.`products_has_categories` (
  `products_id` INT(11) NOT NULL,
  `categories_id` INT(11) NOT NULL,
  PRIMARY KEY (`products_id`, `categories_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minimart_services`.`stores_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minimart_services`.`stores_has_products` (
  `stores_id` INT(11) NOT NULL,
  `products_id` INT(11) NOT NULL,
  PRIMARY KEY (`stores_id`, `products_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;