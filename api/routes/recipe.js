const express = require("express"); //import express
const router = express.Router(); // get the router

// CONTROLLER THAT'S USED
const recipe_controller = require("../controllers/recipe.js"); // get the controller for recipe requests

// ROUTES FOR RECIPES

// getting all recipes
router.get("/all", recipe_controller.getAllRecipes);

// get recipe by ID
router.get("/:id", recipe_controller.getRecipe);

// get recipe by name
router.get("/search/:name", recipe_controller.getRecipeByName);

// get recipe by ingredient
router.get("/search/ingredient/:name", recipe_controller.getRecipeByIngredient);

// insert a new recipe
router.post("/new", recipe_controller.newRecipe);

// add an ingredient to a recipe
router.post("/ingredient", recipe_controller.recipeIngredient);

// deleting a recipe
router.delete("/delete/:id", recipe_controller.deleteRecipe);

// updating a recipe description
router.put("/edit/description", recipe_controller.updateDescription);

// get favorites
router.get("/favorites/:id", recipe_controller.getFavorites);

// save recipe as favorite
router.post("/favorites/save", recipe_controller.saveFavorite);

// get all reviews of a recipe
router.get("/reviews/:id", recipe_controller.getAllReviews);

// post review on a recipe
router.post("/review/new", recipe_controller.postReview);

// delete review
router.delete("/review/delete/:id", recipe_controller.deleteReview);

// update review
router.put("/review/update", recipe_controller.updateReview);

// get reviews of user
router.get("/review/byuser/:id", recipe_controller.getUserReviews);

// get recipes of user
router.get("/byuser/:id", recipe_controller.getUserRecipes);

module.exports = router; // export to use in app.js
