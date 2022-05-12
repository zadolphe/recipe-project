// getting the database connection
const connection = require("../database.js");

// GET; search for a basket and ingredients
// in it, taking as input (in body) its id
// {
//   "basketID": int
// }
const getBasketIngredients = (req, res) => {
  const basketID = req.body;

  connection.query(
    "SELECT * FROM basket WHERE idbasket = ?;",
    [basketID],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

//  POST; post ingredient into
//  basket, by name, brand,
//  basketid
//
//  inputs as JSON body, of form:
//  {
//      "idbasket": int,
//      "name": string,
//      "brand": string
//  }
//
const addBasketIngredient = (req, res) => {
  const { basketIDref, ingredientNameref, ingredientBrandred } = req.body;

  var addIngr =
    "INSERT INTO basket_filled_with_ingredient (basketIDref, ingredientNameref, ingredientBrandred) VALUES (?, ?, ?)";

  connection.query(
    addIngr,
    [basketIDref, ingredientNameref, ingredientBrandred],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// DELETE; delete an inngredient
// by name, brand, basketID
// within (body):
// inputs as JSON body, of form:
//  {
//      "idbasket": int,
//      "name": string,
//      "brand": string
//  }
const deleteBasketIngredient = (req, res) => {
  var { bID, iName, iBrand } = req.body;
  //console.log(toDelete);

  var deleteIngr =
    "DELETE FROM basket_filled_with_ingredient WHERE basketIDref = ?, ingredientNameref = ?, ingredientBrandred = ?";

  connection.query(deleteIngr, [bID, iName, iBrand], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);

  });
};

// delete Basket by basketID (in params)
const deleteBasket = (req, res) => {
  var toDelete = req.params.id;
  //console.log(toDelete);

  var deletion = "DELETE FROM basket WHERE idbasket = ?";

  connection.query(deletion, [toDelete], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);

  });
};

// ENSURE THAT ENDPOINT NAMES ARE INCLUDED IN HERE
module.exports = {
  getBasketIngredients,
  addBasketIngredient,
  deleteBasketIngredient,
  deleteBasket,
};
