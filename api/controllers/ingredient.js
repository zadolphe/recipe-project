// getting the database connection
const connection = require("../database.js");

// function for sanitizing sql inputs
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

// get all brands that provide an ingredient (name provided in params)
const getIngredientBrands = (req, res) => {
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

  const ingrName = req.params.name;

  connection.query(
    "SELECT brand FROM ingredient WHERE name = ?;",
    [ingrName],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

// from a given ingredient name, get basically full row grocery-stocks-ingredient + grocery store name
const getIngredientStocks = (req, res) => {
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

  const ingredientName = req.params.name;

  var theQuery =
    "SELECT ingredientNameref, ingredientBrandref, name, groceryAddressref, price, quantity FROM grocery_stocks_ingredient INNER JOIN grocery_store ON grocery_stocks_ingredient.groceryAddressref = grocery_store.address AND grocery_stocks_ingredient.ingredientNameref LIKE ?;";

  connection.query(theQuery, ["%" + ingredientName + "%"], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

module.exports = { getIngredientBrands, getIngredientStocks };
