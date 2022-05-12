// getting the database connection
const connection = require("../database.js");

// GET; search for cuisine of recipe
// takes as input (in body) the name
// of a recipe/"notable dish"
// {
//   "recipeName": string
// }
const searchRecipeCuisine = (req, res) => {
  const recipeName = req.body;

  connection.query(
    "SELECT * FROM cuisine WHERE notableDIshes = ?;",
    [recipeName],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// GET; search for a type of cuisine
// takes as input (in body) its type
// {
//   "type": string
// }
const searchTypeCuisine = (req, res) => {
  const cuisineType = req.body;

  connection.query(
    "SELECT * FROM cuisine WHERE type = ?;",
    [cuisineType],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// GET; search for cuisine of regional
// takes as input (in body) region info
// {
//   "regionalInfo": string
// }
const searchRegionalInfoCuisine = (req, res) => {
  const regionalInfo = req.body;

  connection.query(
    "SELECT * FROM cuisine WHERE regionalInfo = ?;",
    [regionalInfo],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// ENSURE THAT ENDPOINT NAMES ARE INCLUDED IN HERE
module.exports = { searchRecipeCuisine, searchTypeCuisine, searchRegionalInfoCuisine,};
