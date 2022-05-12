const express = require("express"); //import express
const router = express.Router(); // get the router

// CONTROLLER THATS USED
const cuisine_controller = require("../controllers/cuisine.js"); // get the controller for cuisine requests

// ROUTES FOR CUISINES

// search cuisines by recipe name (possible notable dish of some cuisine)
router.get("/searchrecipe", cuisine_controller.searchRecipeCuisine);

// search cuisines by type
router.get("/searchtype", cuisine_controller.searchTypeCuisine);

// search cuisines by regional info
router.get("/searchregionalinfo", cuisine_controller.searchRegionalInfoCuisine);

// note that selecting a cuisine is analagous to "search cuisines by type"

module.exports = router; // export to use in app.js
