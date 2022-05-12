// getting the database connection
const connection = require("../database.js");

// function for sanitizing inputs against SQL injections
function sanitizeInput(str) {
  for (i = 0; i < str.length; i++) {
    if (str[i] == "-" || str[i] == ";") {
      const newStr =
        str.substring(0, i) + "—" + str.substring(i + 1, str.length);
      //&#8212 for em (long) dash
      //console.log(newStr);
      return sanitizeInput(newStr);
    }
    if (str[i] == '"' || str[i] == "'") {
      const newStr =
        str.substring(0, i) + "*" + str.substring(i + 1, str.length);
      //can change above to whatever other character
      //console.log(newStr);
      return sanitizeInput(newStr);
    }
    if (str[i] == "=") {
      const newStr =
        str.substring(0, i) + " be " + str.substring(i + 1, str.length);
      //&#61, or &equals;
      //console.log(newStr);
      return sanitizeInput(newStr);
    }
  }

  for (i = 0; i < str.length - 5; i++) {
    const checking = str.substring(i, i + 5);
    //console.log(checking);
    if (checking.length > 4) {
      if (
        (checking[0] == "u" || checking[0] == "U") &&
        (checking[1] == "n" || checking[1] == "N") &&
        (checking[2] == "i" || checking[2] == "I") &&
        (checking[3] == "o" || checking[3] == "O") &&
        (checking[4] == "n" || checking[4] == "N")
      ) {
        // UNION!!! Boo...
        const newStr =
          str.substring(0, i) + "o" + str.substring(i + 1, str.length);
        //console.log(newStr);
        return sanitizeInput(newStr);
      }
    }
    //console.log(checking);
  }
  return str;
}

// GET request to return all recipe ids and names
const getAllRecipes = (req, res) => {
  connection.query("SELECT idRecipe, name FROM recipe;", (err, result) => {
    // check if an error occured
    if (err) {
      res.status(400).json(err);
    }
    // return the result from the db to the client as json data
    // status 200 means succesful
    res.status(200).json(result);
  });
};

// GET request to return a recipe (and recipe description) by id (param)
const getRecipe = (req, res) => {
  const recipeid = req.params.id;

  connection.query(
    "SELECT * FROM recipe INNER JOIN recipe_description ON recipe.idRecipe = recipe_description.recipeIDref AND recipe.idRecipe = ?;",
    [recipeid],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// GET request to return a recipe (and recipe description) by pattern matching the name from PARAMETER
const getRecipeByName = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  const recipeName = req.params.name;

  var theQuery =
    "SELECT * FROM recipe INNER JOIN recipe_description ON recipe.idRecipe = recipe_description.recipeIDref AND recipe.name LIKE ?;";

  connection.query(theQuery, ["%" + recipeName + "%"], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// GET request to return a recipe (and recipe description) by pattern matching an ingredient name by parameter
const getRecipeByIngredient = (req, res) => {
  const ingredientName = req.params.name;

  var theQuery =
    "SELECT * FROM recipe INNER JOIN recipe_description ON recipe.idRecipe = recipe_description.recipeIDref AND recipe.name LIKE ?;";

  connection.query(theQuery, ["%" + ingredientName + "%"], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// Endpoint for creating a new recipe
const newRecipe = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  var recipeID;

  const {
    name,
    difficulty,
    servingSize,
    prepTime,
    cookTime,
    userIDref,
    wordCount,
    textBody,
  } = req.body;

  var recipe =
    "INSERT INTO recipe (name, difficulty, servingSize, prepTime, cookTime, userIDref) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    recipe,
    [name, difficulty, servingSize, prepTime, cookTime, userIDref],
    (err, result) => {
      recipeID = result.insertId; // get the recipe id to reference in the recipe description

      var recipeDescription = `INSERT INTO recipe_description (recipeIDref, wordCount, textBody) VALUES (?, ?, ?)`;

      // inserting the attendent
      connection.query(
        recipeDescription,
        [recipeID, wordCount, textBody],
        (err, result) => {
          if (err) {
            res.status(400).json(err);
          }
          res.status(200).json(result);
        }
      );
    }
  );
};

// adding an ingredient to a recipe - user should list all ingredients used after initial recipe upload
// body of the form:
// {
//     "ingredientNameref": "",
//     "ingredientBrandref":"",
//     "recipeIDref": int,
// }
const recipeIngredient = (req, res) => {
  const { ingredientNameref, ingredientBrandref, recipeIDref } = req.body;

  var recipeIngredients =
    "INSERT INTO recipe_uses_ingredient (ingredientNameref, ingredientBrandref, recipeIDref) VALUES (?, ?, ?)";

  connection.query(
    recipeIngredients,
    [ingredientName, ingredientBrand, recipeID],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// delete recipe by ID in params
const deleteRecipe = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  var toDelete = req.params.id;

  var deletion = "DELETE FROM recipe WHERE idRecipe = ?";

  connection.query(deletion, [toDelete], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// update a recipe description (info in body) (ingredient adding/deletion occuring seperatly)
// body of the form:
// {
//     "wordCount": "",
//     "description":"",
//     "recipeIDref": int,
// }
const updateDescription = (req, res) => {
  const { wordCount, textBody, recipeIDref } = req.body;

  var updation =
    "UPDATE recipe_description SET wordCount = ?, textBody = ? WHERE recipeIDref = ?";

  connection.query(
    updation,
    [wordCount, textBody, recipeIDref],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// GET; request (for an input user) all recipe ids and names
// input ID as path param {id}
const getFavorites = (req, res) => {
  var userID = req.params.id;

  // JOIN WITH recipes TO OBTAIN name (WHERE recipeIDref = idRecipe)
  var favorites =
    "SELECT recipeIDref FROM user_favorites_recipe WHERE userIDref = ?";

  connection.query(favorites, [userID], (err, result) => {
    // check if an error occured
    if (err) {
      res.status(400).json(err);
    }
    // return the result from the db to the client as json data
    // status 200 means succesful
    res.status(200).json(result);
  });
};

// POST; save recipe by userIDref, recipeIDref
//  inputs as JSON body, of form:
//  {
//      "userIDref": int,
//      "recipeIDref": int
//  }
const saveFavorite = (req, res) => {
  const { userIDref, recipeIDref } = req.body;

  // TEST INPUT HERE?
  // is userID = loggedInUser? (or do we just pulled from who is currently logged in?)

  var recipe =
    "INSERT INTO user_favorites_recipe (userIDref, recipeIDref) VALUES (?, ?)";

  connection.query(recipe, [recipeIDref, userIDref], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// RECIPT REVIEWS SECTION

// GET request to return all reviews for a recipe, given a recipe ID in the params
const getAllReviews = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  var recipeID = req.params.id;

  var theQuery =
    "SELECT reviewText, rating FROM review INNER JOIN recipe ON review.recipeIDref = recipe.idRecipe AND recipe.idRecipe = ?;";

  connection.query(theQuery, [recipeID], (err, result) => {
    // check if an error occured
    if (err) {
      res.status(400).json(err);
    }
    // return the result from the db to the client as json data
    // status 200 means succesful

    res.status(200).json(result);
  });
};

//  POST; post review of recipe
//  by userIDref, recipeIDref,
//  reviewText, rating
//
//  inputs as JSON body, of form:
//  {
//      "userIDref": int,
//      "recipeIDref": int,
//      "reviewText": string,
//      "rating": int
//  }
//
//  NOTE: would BOTH dateUploaded
//  and idReview be automatic????
//
const postReview = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  const { userIDref, recipeIDref, reviewText, rating } = req.body;

  var theQuery =
    "INSERT INTO review (userIDref, recipeIDref, reviewText, rating) VALUES (?, ?, ?, ?)";

  connection.query(
    theQuery,
    [userIDref, recipeIDref, reviewText, rating],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// DELETE; delete a review
// by userID within params
const deleteReview = (req, res) => {
  var toDelete = req.params.id;

  var deletion = "DELETE FROM review WHERE userIDref = ?";

  connection.query(deletion, [toDelete], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// PUT; update a review (info in body)
// body of the form:
// {
//     "idReview": int,
//     "reviewText": string,
//     "rating": int
// }
const updateReview = (req, res) => {
  const { idReview, reviewText, rating } = req.body;

  var updation =
    "UPDATE review SET rating = ?, reviewText = ? WHERE idReview = ?";

  connection.query(updation, [rating, reviewText, idReview], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// GET; all reviews by userID (input as param)
//
// returns JSON, with body:
// {
//   "idReview": int,
//   "reviewText": string,
//   "rating": int
// }
const getUserReviews = (req, res) => {
  var reviewer = req.params.id;

  var userReviews =
    "SELECT idReview, reviewText, rating FROM review WHERE userIDref = ?";

  connection.query(userReviews, [reviewer], (err, result) => {
    // check if an error occured
    if (err) {
      res.status(400).json(err);
    }
    // return the result from the db to the client as json data
    // status 200 means succesful
    res.status(200).json(result);
  });
};

// GET; all recipes by userID (input as param)
//
// returns JSON, with body:
// {
//   "idRecipe": int,
//   "name": string
// }
const getUserRecipes = (req, res) => {
  var author = req.params.id;

  var userRecipes = "SELECT idRecipe, name FROM review WHERE userIDref = ?";

  connection.query(userRecipes, [author], (err, result) => {
    // check if an error occured
    if (err) {
      res.status(400).json(err);
    }
    // return the result from the db to the client as json data
    // status 200 means succesful
    res.status(200).json(result);
  });
};

// endpoints to be used by routes
module.exports = {
  getAllRecipes,
  getRecipe,
  newRecipe,
  recipeIngredient,
  deleteRecipe,
  updateDescription,
  getFavorites,
  saveFavorite,
  postReview,
  deleteReview,
  updateReview,
  getUserReviews,
  getUserRecipes,
  getAllReviews,
  getRecipeByName,
  getRecipeByIngredient,
};
