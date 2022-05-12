const express = require("express"); //import express
const router = express.Router(); // get the router

// CONTROLLER THATS USED
const basket_controller = require("../controllers/basket.js"); // get the controller for basket requests

// ROUTES FOR BASKET

// get basket and list of ingredients in it
router.get("/getbasketingredients", basket_controller.getBasketIngredients);

// post ingredient into a basket
router.post("/addbasketingredient", basket_controller.addBasketIngredient);

// delete ingredient from a basket
router.delete(
  "/deletebasketingredient",
  basket_controller.deleteBasketIngredient
);

// delete basket via basketID
router.delete("/deletewholebasket", basket_controller.deleteBasket);

module.exports = router; // export to use in app.js
