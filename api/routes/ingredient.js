const express = require("express"); //import express
const router = express.Router(); // get the router

// CONTROLLER THATS USED
const ingredient_controller = require("../controllers/ingredient.js"); // get the controller for recipe requests

// ROUTES FOR INGREDIENTS

// get all brands that provide a certain ingredient
router.get("/brands/:name", ingredient_controller.getIngredientBrands);

// get full purchasing info for a given ingredient name
router.get("/stockinfo/:name", ingredient_controller.getIngredientStocks);

module.exports = router; // export to use in app.js
