const express = require("express"); //import express
const router = express.Router(); // get the router

// CONTROLLER THATS USED
const auth_controller = require("../controllers/auth.js"); // get the controller for recipe requests

// ROUTES FOR AUTHENTICATION

// signup a new user (if usename not taken)
router.post("/newuser", auth_controller.newUser);

// authenticate a user
router.post("/authuser", auth_controller.authUser);

// get the userID of a given user
router.get("/:username", auth_controller.getId);

module.exports = router; // export to use in app.js
