const express = require("express"); // import express library
const bodyParser = require("body-parser");

var cors = require("cors");

// ROUTES TO USE
const recipe_routes = require("./routes/recipe.js"); // import the recipe routes

const ingredient_routes = require("./routes/ingredient.js"); // import the ingredient routes

const auth_routes = require("./routes/auth.js"); // import the authentication routes

const basket_routes = require("./routes/basket.js"); // import the basket routes

const cuisine_routes = require("./routes/cuisine.js"); // import the cuisine routes

// create an instance of our application
const app = express();

// this will parse json coming into your application
app.use(express.json());

//use body parser for parsing inputs from HTML only endpoint post methods

app.use(bodyParser.urlencoded({ extended: false }));

//html page to display in browser
app.use(express.static("./public"));

// Fixes CORS permissions issue
app.use(cors({ origin: "null" }));

// ROUTE ENDPOINTS
app.use("/recipe", recipe_routes);

app.use("/ingredient", ingredient_routes);

app.use("/auth", auth_routes);

app.use("/basket", basket_routes);

app.use("/cuisine", cuisine_routes);

// the server is up and listening on port 3001
app.listen("3001", () => {
  console.log("server running on port 3001");
});
