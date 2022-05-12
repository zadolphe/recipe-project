-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema recipe_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema recipe_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `recipe_database` DEFAULT CHARACTER SET utf8 ;
USE `recipe_database` ;

-- -----------------------------------------------------
-- Table `recipe_database`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(200) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`administrator` (
  `userIDref` INT NOT NULL,
  `adminLevel` INT NULL DEFAULT NULL,
  PRIMARY KEY (`userIDref`),
  CONSTRAINT `fk22`
    FOREIGN KEY (`userIDref`)
    REFERENCES `recipe_database`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`general_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`general_user` (
  `userIDref` INT NOT NULL,
  `numReviews` INT NULL DEFAULT NULL,
  `numRecipies` INT NULL DEFAULT NULL,
  PRIMARY KEY (`userIDref`),
  CONSTRAINT `fk4`
    FOREIGN KEY (`userIDref`)
    REFERENCES `recipe_database`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`administrator_manages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`administrator_manages` (
  `adminIDref` INT NOT NULL,
  `generalUserref` INT NOT NULL,
  PRIMARY KEY (`adminIDref`, `generalUserref`),
  INDEX `fk24_idx` (`generalUserref` ASC) VISIBLE,
  CONSTRAINT `fk23`
    FOREIGN KEY (`adminIDref`)
    REFERENCES `recipe_database`.`administrator` (`userIDref`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk24`
    FOREIGN KEY (`generalUserref`)
    REFERENCES `recipe_database`.`general_user` (`userIDref`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`basket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`basket` (
  `idbasket` INT NOT NULL AUTO_INCREMENT,
  `totalPrice` DECIMAL(10,2) NULL DEFAULT NULL,
  `numIngredients` INT NULL DEFAULT NULL,
  `userIDref` INT NOT NULL,
  PRIMARY KEY (`idbasket`),
  INDEX `userIDref_idx` (`userIDref` ASC) VISIBLE,
  CONSTRAINT `fk1`
    FOREIGN KEY (`userIDref`)
    REFERENCES `recipe_database`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`ingredient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`ingredient` (
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `weight` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`name`, `brand`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`basket_filled_with_ingredient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`basket_filled_with_ingredient` (
  `basketIDref` INT NOT NULL,
  `ingredientNameref` VARCHAR(45) NOT NULL,
  `ingredientBrandred` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`basketIDref`, `ingredientNameref`, `ingredientBrandred`),
  INDEX `fk3_idx` (`ingredientNameref` ASC, `ingredientBrandred` ASC) VISIBLE,
  CONSTRAINT `fk2`
    FOREIGN KEY (`basketIDref`)
    REFERENCES `recipe_database`.`basket` (`idbasket`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk3`
    FOREIGN KEY (`ingredientNameref` , `ingredientBrandred`)
    REFERENCES `recipe_database`.`ingredient` (`name` , `brand`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`cuisine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`cuisine` (
  `type` VARCHAR(45) NOT NULL,
  `regionalInfo` VARCHAR(45) NULL DEFAULT NULL,
  `notableDIshes` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`type`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`grocery_store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`grocery_store` (
  `address` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `generalManager` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`address`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`grocery_features_cuisine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`grocery_features_cuisine` (
  `groceryAddressref` VARCHAR(45) NOT NULL,
  `cuisineTyperef` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`groceryAddressref`, `cuisineTyperef`),
  INDEX `cuisineTyperef_idx` (`cuisineTyperef` ASC) VISIBLE,
  CONSTRAINT `fk5`
    FOREIGN KEY (`groceryAddressref`)
    REFERENCES `recipe_database`.`grocery_store` (`address`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk6`
    FOREIGN KEY (`cuisineTyperef`)
    REFERENCES `recipe_database`.`cuisine` (`type`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`grocery_stocks_ingredient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`grocery_stocks_ingredient` (
  `ingredientNameref` VARCHAR(45) NOT NULL,
  `ingredientBrandref` VARCHAR(45) NOT NULL,
  `groceryAddressref` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`ingredientNameref`, `ingredientBrandref`, `groceryAddressref`),
  INDEX `groceryAddressref_idx` (`groceryAddressref` ASC) VISIBLE,
  CONSTRAINT `fk7`
    FOREIGN KEY (`ingredientNameref` , `ingredientBrandref`)
    REFERENCES `recipe_database`.`ingredient` (`name` , `brand`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk8`
    FOREIGN KEY (`groceryAddressref`)
    REFERENCES `recipe_database`.`grocery_store` (`address`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`ingredient_used_in_cuisine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`ingredient_used_in_cuisine` (
  `cuisineTyperef` VARCHAR(45) NOT NULL,
  `ingredientNameref` VARCHAR(45) NOT NULL,
  `ingredientBrandref` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cuisineTyperef`, `ingredientNameref`, `ingredientBrandref`),
  INDEX `ingredientNameref_idx` (`ingredientNameref` ASC, `ingredientBrandref` ASC) VISIBLE,
  CONSTRAINT `fk10`
    FOREIGN KEY (`ingredientNameref` , `ingredientBrandref`)
    REFERENCES `recipe_database`.`ingredient` (`name` , `brand`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk9`
    FOREIGN KEY (`cuisineTyperef`)
    REFERENCES `recipe_database`.`cuisine` (`type`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`recipe` (
  `idRecipe` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `difficulty` INT NULL DEFAULT NULL,
  `dateCreated` DATE NULL DEFAULT NULL,
  `servingSize` INT NULL DEFAULT NULL,
  `prepTime` DECIMAL(10,2) NULL DEFAULT NULL,
  `cookTime` DECIMAL(10,2) NULL DEFAULT NULL,
  `userIDref` INT NOT NULL,
  PRIMARY KEY (`idRecipe`),
  INDEX `userIDref_idx` (`userIDref` ASC) VISIBLE,
  CONSTRAINT `fk12`
    FOREIGN KEY (`userIDref`)
    REFERENCES `recipe_database`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`photo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`photo` (
  `idPhoto` INT NOT NULL AUTO_INCREMENT,
  `creator` VARCHAR(45) NULL DEFAULT NULL,
  `hyperlink` VARCHAR(45) NULL DEFAULT NULL,
  `size` DECIMAL(10,2) NULL DEFAULT NULL,
  `recipeIDref` INT NOT NULL,
  `cuisineTyperef` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPhoto`),
  INDEX `recipeIDref_idx` (`recipeIDref` ASC) VISIBLE,
  INDEX `cuisineTyperef_idx` (`cuisineTyperef` ASC) VISIBLE,
  CONSTRAINT `fk11`
    FOREIGN KEY (`recipeIDref`)
    REFERENCES `recipe_database`.`recipe` (`idRecipe`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk32`
    FOREIGN KEY (`cuisineTyperef`)
    REFERENCES `recipe_database`.`cuisine` (`type`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`recipe_description`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`recipe_description` (
  `recipeIDref` INT NOT NULL,
  `wordCount` INT NULL DEFAULT NULL,
  `textBody` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`recipeIDref`),
  CONSTRAINT `fk13`
    FOREIGN KEY (`recipeIDref`)
    REFERENCES `recipe_database`.`recipe` (`idRecipe`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`recipe_inspiredby_cuisine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`recipe_inspiredby_cuisine` (
  `recipeIDref` INT NOT NULL,
  `cuisineTyperef` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`recipeIDref`, `cuisineTyperef`),
  INDEX `cuisineTyperef_idx` (`cuisineTyperef` ASC) VISIBLE,
  CONSTRAINT `fk14`
    FOREIGN KEY (`recipeIDref`)
    REFERENCES `recipe_database`.`recipe` (`idRecipe`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk15`
    FOREIGN KEY (`cuisineTyperef`)
    REFERENCES `recipe_database`.`cuisine` (`type`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`recipe_uses_ingredient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`recipe_uses_ingredient` (
  `ingredientNameref` VARCHAR(45) NOT NULL,
  `ingredientBrandref` VARCHAR(45) NOT NULL,
  `recipeIDref` INT NOT NULL,
  PRIMARY KEY (`ingredientNameref`, `ingredientBrandref`, `recipeIDref`),
  INDEX `recipeIDref_idx` (`recipeIDref` ASC) VISIBLE,
  CONSTRAINT `fk16`
    FOREIGN KEY (`ingredientNameref` , `ingredientBrandref`)
    REFERENCES `recipe_database`.`ingredient` (`name` , `brand`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk17`
    FOREIGN KEY (`recipeIDref`)
    REFERENCES `recipe_database`.`recipe` (`idRecipe`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`review` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `userIDref` INT NOT NULL,
  `recipeIDref` INT NOT NULL,
  `reviewText` TEXT NULL DEFAULT NULL,
  `dateUploaded` DATETIME NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idReview`, `userIDref`, `recipeIDref`),
  INDEX `userIDref_idx` (`userIDref` ASC) VISIBLE,
  INDEX `recipeIDref_idx` (`recipeIDref` ASC) VISIBLE,
  CONSTRAINT `fk18`
    FOREIGN KEY (`userIDref`)
    REFERENCES `recipe_database`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk19`
    FOREIGN KEY (`recipeIDref`)
    REFERENCES `recipe_database`.`recipe` (`idRecipe`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `recipe_database`.`user_favorites_recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_database`.`user_favorites_recipe` (
  `userIDref` INT NOT NULL,
  `recipeIDref` INT NOT NULL,
  PRIMARY KEY (`userIDref`, `recipeIDref`),
  INDEX `recipeIDref_idx` (`recipeIDref` ASC) VISIBLE,
  CONSTRAINT `fk20`
    FOREIGN KEY (`userIDref`)
    REFERENCES `recipe_database`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk21`
    FOREIGN KEY (`recipeIDref`)
    REFERENCES `recipe_database`.`recipe` (`idRecipe`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
